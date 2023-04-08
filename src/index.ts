import "./style.scss";
import {App} from './App';
import Block from './block/block';

function renderBlock(query:string, block:Block<unknown>) {
    const root = document.querySelector(query);
    root!.textContent = (block.getContent() as Node).textContent; //todo handle null
    block.dispatchComponentDidMount();//todo move somewhere?
    return root;
  }

//const root = document.querySelector('#content');
//let block:Block<any> = App();
//root!.appendChild(block.getContent() as Node);
//block.dispatchComponentDidMount();//todo move somewhere?

App("#content");
