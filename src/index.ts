import "./style.scss";
import {App} from './App';
import Block from './block/block';

const root = document.querySelector('#content');
let block:Block = App();
root.appendChild(block.getContent());
block.dispatchComponentDidMount();//todo move somewhere?
