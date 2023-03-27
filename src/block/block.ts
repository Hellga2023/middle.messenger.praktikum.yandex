import Handlebars from 'handlebars';
import EventBus from "./eventbus"; 
import {v4 as makeUUID} from 'uuid';

class Block<T> {

    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render"
    };
  
    private _element:DocumentFragment|null = null;
    private _meta : {
      tagName: string, 
      propsEndChildren: any //todo
      }|null = null;
    private _id:string|null = null; //todo check? 
    children: any = null;//todo
    eventBus: Function|null = null;
    props: any = null;
  
    constructor(tagName:string = "div", propsAndChildren:any = {}) {
      const eventBus = new EventBus();
      this._meta = {
        tagName,
        propsAndChildren
      };
      this._id = makeUUID();
      
      const { children, props } = this._getChildren(propsAndChildren);

      this.children = children;
      
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
      //eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));      
      this.registerEvents();
    }

    protected registerEvents(){}

    private _getChildren(propsAndChildren){
      const children = {};
        const props = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
          if (value instanceof Block || value instanceof Array<Block>) {
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
      
      const fragment = this._createDocumentElement('template');
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

  private _replaceStubWithChildren(fragment){
    Object.values(this.children).forEach(child => {
      if(child instanceof Block){
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        if(stub){ stub.replaceWith(child.getContent());}
      }else if(child instanceof Array<Block>){  
        child.forEach(element => {
          const stub = fragment.content.querySelector(`[data-id="${element._id}"]`);
          if(stub){ stub.replaceWith(element.getContent());}
        });
      }
      
    });
  }
  
    private _createResources() : void {
      const { tagName } = this._meta;
      if(this._meta.element){
        this._element = this._meta.element;
      }else{
        this._element = this._createDocumentElement(tagName);
      }      
    }

    private _init(){
      this._createResources();  
      if(this.props.class){this._element.classList.add(this.props.class);}
      this.init();
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  
    init() {}/*
      this._createResources();  
      this._element.classList.add(this.props.class);

      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }*/
  
    private _componentDidMount() : void {
      this.componentDidMount();
      
      
      Object.values(this.children).forEach(child => {
        console.log(child);
        console.log(child.componentDidMount);
          child.dispatchComponentDidMount();
      });/**/
    }
  
    componentDidMount() {  
      console.log("mounted");
      console.log("this");
     }
  
    public dispatchComponentDidMount() {
      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
      //dispatch children?
    }
  
    private _componentDidUpdate(oldProps, newProps) {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (!response) {
        return;
      }
      this._render();
    }
  
    componentDidUpdate(oldProps, newProps) {
      return true;
    }
  
    setProps = nextProps => {
      if (!nextProps) {
        return;
      }
  
      Object.assign(this.props, nextProps);
      
      //this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    };
  
    get element() {
      return this._element;
    }
  
    _render(): void {
      
      const block:DocumentFragment = this.render();
      // //should be document fragment
      // Этот небезопасный метод для упрощения логики
      // Используйте шаблонизатор из npm или напишите свой безопасный
      // Нужно не в строку компилировать (или делать это правильно),
      // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    

       this._removeEvents(); 
        //this._element = block;  
       //this._element.setAttribute('data-id', this._id);

      this._element.innerHTML = ''; // удаляем предыдущее содержимое
      

      this._element.appendChild(block);

      this._addEvents();
    }
  
    protected render():DocumentFragment { return null;}//todo

    _addEvents() {
      const {events = {}} = this.props;
  
      Object.keys(events).forEach(eventName => {
        this._element.addEventListener(eventName, events[eventName].bind(this));//.bind(this)
      });
    }

    _removeEvents(){
      const {events = {}} = this.props;
  
      Object.keys(events).forEach(eventName => {
        this._element.removeEventListener(eventName, events[eventName]);
      });      
    }

    getContent() {
      return this.element;
    }

    _checkAccess(prop){
        //if (prop.indexOf('_') === 0) {
        //    throw new Error('Access denied');
        //}
    }
  
    _makePropsProxy(props) {
      
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
        },
        deleteProperty():boolean {
          return false;//todo
          //throw new Error("Access denied");
        }
      });
    }
  
    _createDocumentElement(tagName:string):HTMLElement {
      // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков

      //fragment.content.firstElementChild
      const element = document.createElement(tagName);
      element.setAttribute('data-id', this._id);
      return element;
    }
  
    show() {
      this.getContent().style.display = "block";
    }
  
    hide() {
      this.getContent().style.display = "none";
    }
  }

  export default Block;
