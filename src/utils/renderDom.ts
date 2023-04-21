import Block, { IProps } from "../components/block/block";

export const renderBlock = function (query:string, block:Block<IProps>) {
    const root = document.querySelector(query);
    if(root){
        root!.appendChild(block.getContent() as Node);
        block.dispatchComponentDidMount();//todo move somewhere?
        return root;
    }else{
        throw Error("root query is invalid");
    }    
};
