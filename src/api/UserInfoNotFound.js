class UserInfoNotFound extends Error{
    constructor(message){
      super(message);
      this.message=message;
      this.name='UserInfoNotFound';
    }
    getMessage=()=>{
      return this.message;
    }
}

module.exports=UserInfoNotFound;
