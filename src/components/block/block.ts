import Handlebars from "../../utils/handlebarsHelpers";
import EventBus from "../../utils/eventbus"; 
import {v4 as makeUUID} from 'uuid';
import { cloneDeep } from "../../utils/helpers";
import isEqual from "../../utils/isEqual";

export interface IProps extends Record<string,any> {
  class?:string;
  events?:any;
}

abstract class Block<T extends IProps> {

    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render"
    } as const;
  
    private _element?:HTMLElement;
    private _meta? : {
      tagName: string, 
      props: IProps 
      };
    private _id?:string;    
    private _eventBus: Function;

    public children?: any;
    public props: IProps;
  
    constructor(props:T, tagName:string = "div") {

      const eventBus = new EventBus();
      this._meta = {
        tagName,
        props
      };
      this._id = makeUUID();
      this.children = {};
      
      this.props = this._makePropsProxy(props) as IProps;
      //const withInternalID = props.withInternalID; todo
  
      this._eventBus = () => eventBus;
      this._registerEvents(eventBus);
      eventBus.emit(Block.EVENTS.INIT);
    }
  
    private _registerEvents(eventBus:EventBus) {
      eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));      
      this.registerEvents();
    }

    protected registerEvents(){}

    compile(template:string):DocumentFragment {
      const propsAndStubs = this.props,
      hasChildren = Object.keys(this.children).length!==0;

      if(hasChildren){
        this._generateChildrenStubs(propsAndStubs);
      }
      
      const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
      fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);      

      if(hasChildren){
        this._replaceStubWithChildren(fragment);
      }

      return fragment.content;
  }

  private _generateChildrenStubs(propsAndStubs:any){
    Object.entries(this.children).forEach(([key, child]) => {        
      if(child instanceof Block){
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`
      }
      else if(Array.isArray(child)){  
        propsAndStubs[key] = [];  
        child.forEach(element => {
          propsAndStubs[key].push(`<div data-id="${element._id}"></div>`); 
        });
      }
    });
  }

  private _replaceStubWithChildren(fragment:HTMLTemplateElement){
    Object.values(this.children).forEach(child => {
      if(child instanceof Block){
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        if(stub){ stub.replaceWith(child.getContent()!);}
      }else if(Array.isArray(child)){  
        child.forEach(element => {
          const stub = fragment.content.querySelector(`[data-id="${element._id}"]`);
          if(stub){ stub.replaceWith(element.getContent());}
        });
      }
      
    });
  }
  
  private _createResources() : void {
      const { tagName } = this._meta!;
      this._element = this._createDocumentElement(tagName);           
  }

  private _init():void{
      this._createResources();  
      if(this.props.class){this._element!.classList.add(this.props.class);}
      this.init();
      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }
  
    init() {}
  
  private _componentDidMount() : void {
      this.componentDidMount();      
      
      Object.values(this.children).forEach((child:any) => { //todo
        if(typeof child.dispatchComponentDidMount == "function"){

          child.dispatchComponentDidMount();}
      });
  }
  
    componentDidMount() {  
      console.log("mounted");
     }
  
    public dispatchComponentDidMount() {
      this._eventBus().emit(Block.EVENTS.FLOW_CDM);
      //dispatch children?
    }

    componentWillUnmount() {  
      this._removeEvents(); 
      this._element?.remove();
     }
  
    private _componentDidUpdate(oldProps:any, newProps:any):void {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (!response) {
        return;
      }
      this._render();
    }
  
    componentDidUpdate(oldProps:any, newProps:any) {
      return !isEqual(oldProps, newProps);
    }
  
    get element() {
      return this._element;
    }
  
    _render(): void {   
      this._element!.innerHTML = '';  
      const block:DocumentFragment = this.render(); 
      this._removeEvents(); 
      this._element!.appendChild(block);
      this._addEvents();
    }
  
    protected render():DocumentFragment { throw new Error('Not implemented'); }

    _addEvents() {
      const {events = {}} = this.props;  
      Object.keys(events).forEach(eventName => {
        this._element!.addEventListener(eventName, events[eventName]);
      });
    }

    _removeEvents(){
      const {events = {}} = this.props;  
      Object.keys(events).forEach(eventName => {
        this._element!.removeEventListener(eventName, events[eventName]);
      });      
    }

    getContent() {
      return this._element;
    }

    setProps = (nextProps:Partial<IProps>) => {
      //setProps = (nextProps:IProps) => {
      if (!nextProps) {
        return;
      }
      const oldProps = cloneDeep(this.props as object);
      Object.assign(this.props as object, nextProps);
      this._eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
    }

    _makePropsProxy(props:IProps){
      
       // const self = this;
  
      return new Proxy(props, {
        get(target:any, prop:any) {
          const value = target[prop];
          return typeof value === "function" ? value.bind(target) : value;
        },
        set(target:any, prop:any, value:any) {
          //const oldTarget = cloneDeep(target);
          target[prop] = value;
          // Запускаем обновление компоненты
          // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
          //self._eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
          return true;
        }
      });
    }
  
    _createDocumentElement(tagName:string):HTMLElement {
      // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков

      //fragment.content.firstElementChild
      const element = document.createElement(tagName);
      element.setAttribute('data-id', this._id!);
      return element;
    }
  
    show() {
      //this.getContent()!.style.display = "block";
      //todo remove temp fix
      this.getContent()!.style.display = "flex";
    }
  
    hide() {
      this.getContent()!.style.display = "none";
    }
  }

  export default Block;
