import "./style.scss";
import {App} from './App';
import Block from './block/block';

const root = document.querySelector('#content');
let block:Block<any> = App();
root!.appendChild(block.getContent() as Node);
block.dispatchComponentDidMount();//todo move somewhere?
