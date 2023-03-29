import Handlebars from 'handlebars';
import EventBus from "./eventbus"; 
import {v4 as makeUUID} from 'uuid';

abstract class Block<T extends Record<string,any>> {

    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render"
    } as const;
  
    private _element?:HTMLElement;
    private _meta? : {
      tagName: string, 
      propsEndChildren: any //todo
      };
    private _id?:string; //todo check? 
    public children?: any;//todo
    private eventBus: Function;
    props: T;
  
    constructor(tagName:string = "div", propsAndChildren:T) {
      const eventBus = new EventBus();
      this._meta = {
        tagName,
        propsAndChildren
      };
      this._id = makeUUID();
      
      let props,
      children;
      if(typeof this.children == "undefined"){
        let temp = this._getChildren(propsAndChildren);
        children = temp.children;
        props = temp.props;
        this.children = children;
      }
      else{
         props = propsAndChildren;
      }
      
      this.props = this._makePropsProxy(props);//props;

      //const withInternalID = props.withInternalID; todo
  
      this.eventBus = () => eventBus;
      
  
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

    private _getChildren(propsAndChildren:T){
      const children = {};
        const props = {};

        Object.entries(propsAndChildren as object).forEach(([key, value]) => {       
          if (value instanceof Block || value instanceof Array<Block>) { //todo if array of blocks

                children[key] = value;
          } else {
                props[key] = value;
          }
        });

        return { children, props };
    }
    

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

  private _generateChildrenStubs(propsAndStubs){
    Object.entries(this.children).forEach(([key, child]) => {        
      if(child instanceof Block){
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`
      }
      else if(child instanceof Array<Block>){  
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
        if(stub){ stub.replaceWith(child.getContent());}
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

    private _init(){
      this._createResources();  
      if(this.props.class){this._element!.classList.add(this.props.class);}
      this.init();
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
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
      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
      //dispatch children?
    }
  
    private _componentDidUpdate(oldProps:any, newProps:any) {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (!response) {
        return;
      }
      this._render();
    }
  
    componentDidUpdate(oldProps, newProps) {
      return true;
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
  
    protected render():DocumentFragment { return null;}//todo

    _addEvents() {
      const {events = {}} = this.props;  
      Object.keys(events).forEach(eventName => {
        this._element!.addEventListener(eventName, events[eventName]);//.bind(this)
      });
    }

    _removeEvents(){
      const {events = {}} = this.props;  
      Object.keys(events).forEach(eventName => {
        this._element!.removeEventListener(eventName, events[eventName]);
      });      
    }

    getContent() {
      return this.element;
    }

    setProps = nextProps => {
      if (!nextProps) {
        return;
      }
  
      Object.assign(this.props, nextProps);
      
      this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    }

    _makePropsProxy(props:T) {
      
        const self = this;
  
      return new Proxy(props, {
        get(target, prop) {
          //_checkAccess(prop);
          const value = target[prop];
          return typeof value === "function" ? value.bind(target) : value;
        },
        set(target, prop, value) {
          //_checkAccess(prop);
          const oldTarget = {...target};
          target[prop] = value;
          
          // Запускаем обновление компоненты
          // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
          //self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
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
      this.getContent()!.style.display = "block";
    }
  
    hide() {
      this.getContent()!.style.display = "none";
    }
  }

  export default Block;
