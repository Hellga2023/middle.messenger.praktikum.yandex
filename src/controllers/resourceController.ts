import defaultImg from '../../static/defaultAvatar.png';

class ResourceController {

public getAvatarUrl(path:string|null){
    if(path){
      return "https://ya-praktikum.tech/api/v2/resources" + path;
    }else{
      return defaultImg;
    }      
  }
}

export default new ResourceController();
