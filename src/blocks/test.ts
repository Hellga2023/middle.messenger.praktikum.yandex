import Handlebars from 'handlebars';
import Block from './block';

const profileTemplate = `
    <div>
    {{ userName }}
        {{ button }}
    </div>
`;

class UserProfileTest extends Block {
  render() {
    return Handlebars.compile(profileTemplate, {
            userName: this.props.userName,
            button: this.props.button,
        });
  }
} 

export default UserProfileTest;
