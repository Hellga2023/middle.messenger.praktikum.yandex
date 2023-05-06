//import Block from "../components/block/block";

export type Indexed<T = any> = {
    [key in string]: T;
  };
  
  export function isEqual():boolean{
    return true;
  }

  export function merge(lhs: Indexed, rhs: Indexed): Indexed {

    for (let p in rhs) {
      if (!rhs.hasOwnProperty(p)) {
        continue;
      }
  
      try {
        if (rhs[p].constructor === Object) {
          rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
        } else {
          lhs[p] = rhs[p];
        }
      } catch (e) {
        lhs[p] = rhs[p];
      }
    }
  
    return lhs;
  }

export function set(object:Indexed|unknown, path:string, value: unknown):Indexed|unknown{

   if(typeof object !== "object" || object === null){
        return object;
    }

    if(typeof path !== "string"){
        throw new Error('path must be a string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({ 
      [key]:acc
    }), value as any);

  return merge(object as Indexed, result);
}

export function cloneDeep<T extends object = object>(obj: T) {
  if (obj === null || typeof (obj) !== 'object')// || 'isActiveClone' in obj)
      return obj;

  if (obj instanceof Date)
      return new Date(obj);
  else if(Array.isArray(obj)){
    let arr:Array<any> = new Array<any>();
   for (const element of obj) {
      arr.push(cloneDeep(element));
    }  
    return arr;    
  }else{
     let temp:any = {};//obj.constructor();
     for (var key in obj) {        
      temp[key] = cloneDeep(obj[key] as any);
     }
    return temp;
  }   
};

/*function renderBlock(query:string, block:Block<unknown>) {
  const root = document.querySelector(query);
  root!.textContent = (block.getContent() as Node).textContent; //todo handle null
  block.dispatchComponentDidMount();//todo move somewhere?
  return root;
}*/

/*function cloneDeep<T extends object = object>(obj: T) {
    return (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
        // Handle:
        // * null
        // * undefined
        // * boolean
        // * number
        // * string
        // * symbol
        // * function
        if (item === null || typeof item !== "object") {
            return item;
        }

        // Handle:
        // * Date
        if (item instanceof Date) {
            return new Date(item.valueOf());
        }

        // Handle:
        // * Array
        if (item instanceof Array) {
            let copy = [];

            item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

            return copy;
        }

        // Handle:
        // * Set
        if (item instanceof Set) {
            let copy = new Set();

            item.forEach(v => copy.add(_cloneDeep(v)));

            return copy;
        }

        // Handle:
        // * Map
        if (item instanceof Map) {
            let copy = new Map();

            item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

            return copy;
        }

        // Handle:
        // * Object
        if (item instanceof Object) {
            let copy: object = {};

            // Handle:
            // * Object.symbol
            Object.getOwnPropertySymbols(item).forEach(s => (copy[s] = _cloneDeep(item[s])));

            // Handle:
            // * Object.name (other)
            Object.keys(item).forEach(k => (copy[k] = _cloneDeep(item[k])));

            return copy;
        }

        throw new Error(`Unable to copy object: ${item}`);
    })(obj);
}

export default cloneDeep */
