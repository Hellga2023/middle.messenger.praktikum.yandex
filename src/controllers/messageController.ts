

class MessageController{

    static MessageTypes = {
       MESSAGE: ""
    } as const;


    constructor(){

    }

    public onGetSocketData(data:any){
        let parsed = JSON.parse(data);
        console.log("socket data");
        console.log(parsed);

        //content id time type user_id
    }
}
