import { expect } from 'chai';
import sinon from 'sinon';
import { HTTP, METHODS } from './http';

describe('HTTP class', () => {

    const XHR = sinon.useFakeXMLHttpRequest();
    const requests:sinon.SinonFakeXMLHttpRequest[] = [];

    // @ts-ignore
    global.XMLHttpRequest = XHR;

    XHR.onCreate = function (xhr){

        requests.push(xhr);

    };

    afterEach(() => {

        requests.length = 0;

    });

    it('should call xhr with GET method if get called', () => {

        const http = new HTTP('/auth');
        http.get('/', {});
        expect(requests[0].method).to.eq(METHODS.GET);

    });

    it('should call xhr with POST method if post called', () => {

        const http = new HTTP('/auth');
        http.post('/login', { a: 'a' });
        expect(requests[0].method).to.eq(METHODS.POST);

    });

    /*
    check if params were passed right
    check if url is auth/login

    it('should call xhr with POST method if post called',()=>{
        const http = new HTTP("/auth");
        http.post("/login",{a:'a'});
        expect(requests[0].method).to.eq(METHODS.POST);
    }); */

});
