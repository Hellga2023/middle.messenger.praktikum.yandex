import Handlebars from 'handlebars';
import EventBus from "./eventbus"; 
import {v4 as makeUUID} from 'uuid';

class Block {

    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render"
    };
  
    private _element:HTMLElement = null;
    private _meta : {
      tagName: string, 
      propsEndChildren: any //todo
      } = null;
    private _id:string = null; //todo check? 
    children: any = null;//todo
    eventBus: Function = null;
    props: any = null;
  
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName:string = "div", propsAndChildren:any = {}) {
      //console.log("create block");
      const eventBus = new EventBus();
      this._meta = {
        tagName,
        propsAndChildren
      };
      this._id = makeUUID();
      
      const { children, props } = this._getChildren(propsAndChildren);

      this.children = children;
      
      this.props = props;//this._makePropsProxy(props);//props;

      //const withInternalID = props.withInternalID; todo
  
      this.eventBus = () => eventBus;
      
  
     this._registerEvents(eventBus);
      eventBus.emit(Block.EVENTS.INIT);
    }
  
    private _registerEvents(eventBus:EventBus) {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      //eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      //eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
      //eventBus.on(Block.EVENTS.BLUR, this._validate.bind(this));
      //eventBus.on(Block.EVENTS.FOCUS, this._validate.bind(this));
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
      //console.log("has children " + hasChildren);

      if(hasChildren){
        this._generateChildrenStubs(propsAndStubs);
      }
      
      const fragment = this._createDocumentElement('template');
      fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);
      if(hasChildren){
        this._replaceStubWithChildren(fragment);
      }
      return fragment.content;    //todo?
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
  
    init() {
      this._createResources();  
      //console.log("init");
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  
    private _componentDidMount() : void {
      this.componentDidMount();
    }
  
    componentDidMount() {}
  
      dispatchComponentDidMount() {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
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
      //console.log("setProps");
      this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    };
  
    get element() {
      return this._element;
    }
  
    _render(): void {
      //console.log("this"+this.render);
      const block = this.render();
      // //should be document fragment
      // Этот небезопасный метод для упрощения логики
      // Используйте шаблонизатор из npm или напишите свой безопасный
      // Нужно не в строку компилировать (или делать это правильно),
      // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    

       // this._removeEvents(); todo
        this._element.innerHTML = ''; // удаляем предыдущее содержимое
      //console.log("block "+block);
      //console.log("el "+this._element);
      

      this._element.appendChild(block);

      //this._addEvents();
    }
  
    protected render():DocumentFragment { return null;}//todo

    _validate(){
        this._validate();
    }
    
    validate(){}

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
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
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
