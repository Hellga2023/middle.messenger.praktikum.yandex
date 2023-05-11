class EventBus {

    private _listeners:{ [key: string]: ((...args:unknown[])=>void)[] } = {};

    constructor(){
    }

    public on(event:string, callback:()=>void){

        if (!this._listeners[event]){

            this._listeners[event] = [];

        }

        this._listeners[event].push(callback);

    }

    public off(event:string, callback:()=>void){

        this._checkEvent(event);

        this._listeners[event] = this._listeners[event].filter(
            (listener) => listener !== callback,
        );

    }

    public emit(event:string, ...args:any[]){

        this._checkEvent(event);

        this._listeners[event].forEach((listener) => {

            listener(...args);

        });

    }

    private _checkEvent(event:string){

        if (!this._listeners[event]){

            throw new Error(`No such event: ${event}`);

        }

    }

}

export default EventBus;
