import { expect } from 'chai';
import { set } from './helpers';

describe('util set', () => {

    it('should return first param if it is non-object', () => {

        const result = set(null, '', '123');
        expect(result).to.eq(null);

    });

    /* it.only('should throw error if second param is not a string', ()=>{
        const func = () => set({}, null, '123');
        expect(func).to.throw(Error);
    }); */

    it('should return the same object as was passed to it', () => {

        const obj = { a: 1, b: 2 };
        const path = 'a';
        const value = 3;

        const result = set(obj, path, value);
        expect(result).to.eq(obj);

    });

});
