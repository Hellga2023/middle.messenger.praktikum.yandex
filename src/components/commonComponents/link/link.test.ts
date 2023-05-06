import { expect } from "chai";
import Link from "./link";
import router from '../../../routing/router';

describe('Link component',()=>{
    /*it('should render', ()=>{
        const link = new Link({
            url: "/login",
            text: "Login",
            router: {} as typeof router
        });
    });*/
    it.only('should render label from url param', ()=>{
        const label = "Login";
        const link = new Link({
            url: "/login",
            text: label,
            router: {} as typeof router
        });
        expect(link.element?.textContent).to.eq(label);
    });
    it('should render', ()=>{
        
    });
});
