import Block, { IProps } from "../../../block/block";
import OptionsButton from "../optionsButton/optionsButton";
import OptionsModal from "../optionsModal/optionsModal";

const template = `{{{optionsButton}}} {{{optionsModal}}}`;

interface IOptionsContainerProps extends IProps{
    optionsButton?:OptionsButton;
    optionsModal?:OptionsModal;
}
/*

TODO this is temp fix to prevent modal dialog rerendering

Later dialog should be moved to the upper level, so that it would not depend on parent components rerendering!!!

*/

class OptionsContainer extends Block<IOptionsContainerProps>{
    constructor(props:IOptionsContainerProps){
        super(props);
    }

    public init(): void {

        this.children.optionsButton = new OptionsButton({});
        this.children.optionsModal = new OptionsModal({});
    }

    public render():DocumentFragment{
        return this.compile(template);
    }
}

export default OptionsContainer;
