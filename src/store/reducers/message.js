import { MESSAGE_REFRESH,SOCKET_LOADING } from "../types/message";
import { MESSAGE_DATA } from "../../utils/constant";

export default (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_REFRESH:
      console.log(action);
      return { ...action.payload,socketLoading: state.loading };
    case SOCKET_LOADING:
      return {...state,socketLoading:action.payload}
    default:
      console.log(action);
      const initData = wx.getStorageSync(MESSAGE_DATA);
      return (
        initData || {
          message_count: 0,
          user_list: [],
          socketLoading: true
        }
      );
    // {
    //   message_count: 1, //消息数量
    //   user_list: [
    //     {
    //       openid: "ourp_4kzqNdQ7yFBie1jnQMarT9c",
    //       name: "小白大人的商铺",
    //       avatar:
    //         "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK2QVa1yomApFqLK8nDmIChsan2Ar3Sef8nf8YNiaN9icPwJC3ic25MgGziafhnyCtVLo9yJkbTC7TuWg/132",
    //       latest_mes: "零食零食零食在卖啦啦啦",
    //       latest_time:"yyyy-MM-dd HH:mm:ss",
    //       message_list: [
    //         {
    //           type: "TEXT",
    //           from: "FROM_LEFT",
    //           content: "零食零食零食在卖啦啦啦",
    //           time: "yyyy-MM-dd HH:mm:ss"
    //         }
    //       ],
    //       unread: 1
    //     }
    //   ]
    // };
  }
};
