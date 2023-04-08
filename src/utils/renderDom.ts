import Block, { IProps } from "../block/block";

export const renderBlock = function (query:string, block:Block<IProps>) {
    const root = document.querySelector(query);
    //root!.textContent = (block.getContent() as Node).textContent; //todo handle null
    root!.appendChild(block.getContent() as Node);
    block.dispatchComponentDidMount();//todo move somewhere?
    return root;
};
