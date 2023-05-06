class EventBus {

    private _listeners:{ [key: string]: Function[] } = {};

    constructor() {
      //this._listeners = {};
    }
  
    public on(event:string, callback:Function) {
      if (!this._listeners[event]) {
        this._listeners[event] = [];
      }
  
      this._listeners[event].push(callback);
    }
  
    public off(event:string, callback:Function) {

        this._checkEvent(event);
  
        this._listeners[event] = this._listeners[event].filter(
            listener => listener !== callback
        );
    }
  
    public emit(event:string, ...args:any[]) {

      this._checkEvent(event);
      
      this._listeners[event].forEach(function(listener) {
        listener(...args);
      });
    }

    private _checkEvent(event:string){
        if (!this._listeners[event]) {
            throw new Error(`No such event: ${event}`);
        }
    }
} 

export default EventBus;
