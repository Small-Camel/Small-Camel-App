function generateUUID() {
  let openid=""
  try{
     openid = wx.getStorageSync("openid");
  }catch(e){
    wx.switchTab('/pages/info');    
  }
  let d = new Date().getTime();
  let uuid = `${openid}-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
};

export default generateUUID;