import { store } from "../modules/store";

class UserController {
    /*public getUser() {
      UserAPI.getUser()
               .then(data => store.set('user.data', data);
    }*/

    public setEditMode(editMode:boolean){
      store.set('profile.editMode', editMode);
    }

    /*public getEditMode(editMode:boolean){
      store.set('profile.editMode', editMode);
    }*/
}

export default new UserController();
