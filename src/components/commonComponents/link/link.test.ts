import { expect } from "chai";
import Link from "./link";
import Router from '../../../routing/router';
import sinon from 'sinon';

describe('Link component',()=>{
    /*it('should render', ()=>{
        const link = new Link({
            url: "/login",
            text: "Login",
            router: {} as typeof router
        });
    });*/
    const   text = "Login",
            url = "/login",
            callback = sinon.stub();

    //@ts-ignore
    const router = { go: callback } as typeof Router;    

    const link = new Link({ url, text, router });    

    beforeEach(()=>{
        callback.reset();
    });

    it('should render label from text param', ()=>{
        expect(link.element?.textContent).to.eq(text);
    });

    it('should call router go method after click', ()=>{
        link.element?.click();
        expect(callback.calledOnceWith(url)).to.eq(true);
    });

    it('should call router.go method once after click', ()=>{
        link.element?.click();
        expect(callback.calledOnce).to.eq(true);
    });
});
