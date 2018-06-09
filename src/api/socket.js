import { MESSAGE_DATA, FROM_LEFT, FROM_RIGHT } from "../utils/constant";
import { getStore } from "wepy-redux";
import { refreshMessage, setSocketLoading } from "../store/actions";

import jsonToUrl from "../utils/jsonToUrl";
import moment from "moment";

const DEBUG = true;
const basicUrl = "https://www.xiaoluotuozahuopu.com/api";
// const basicUrl = "http://172.26.69.135:8080/api";
// const basicUrl = "http://192.168.2.167:8080/api";

let isSocketOpen = false;

const setLoading = loading => {
  const store = getStore();

  console.log(store);

  store.dispatch(setSocketLoading(loading));
};

const fakeSocketResponse = () => {
  return {
    message_count: 1,
    message_list: [
      {
        from: {
          openid: "ourp_4o5b6_DVQ-tF0brr-ZPtNzk",
          name: "SHEEN的小店",
          avatar:
            "https://wx.qlogo.cn/mmopen/vi_32/peIVGp87nFzKqZesz1slBkEINR1NWcvKz2lNic0yoHic3wodqxl50xlor6H0HQB35yRFvegg87bxFN6vqH23Y3vw/132"
        },
        to: {
          openid: "ourp_4kzqNdQ7yFBie1jnQMarT9c",
          name: "小白大人的商铺",
          avatar:
            "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK2QVa1yomApFqLK8nDmIChsan2Ar3Sef8nf8YNiaN9icPwJC3ic25MgGziafhnyCtVLo9yJkbTC7TuWg/132"
        },
        message: {
          type: "TEXT",
          content: "小白大王最帅最帅"
        },
        time: moment().format("YYYY-MM-DD HH:mm:ss")
      }
    ]
  };
};

const initSocket = () => {
  if (isSocketOpen) {
    return;
  }
  let userKeys = "";
  userKeys = wx.getStorageSync("openid");
  if (!userKeys) {
    return false;
  }
  const SocketTask = wx.connectSocket({
    url: `wss://www.xiaoluotuozahuopu.com/websocket`,
    data: {},
    header: {
      "content-type": "application/json",
      openid: userKeys
    },
    success: () => {
      console.log("socket init success");
      isSocketOpen = true;
      setLoading(false);
    },
    fail: () => {
      isSocketOpen = false;
      setLoading(true);
    }
  });

  // wx.onSocketMessage(function(res) {
  //   console.log('收到服务器内容：' + res.data)
  // });
  const initMessageStorage = {
    message_count: 0, //消息数量
    user_list: []
  };
  const initUser = {
    openid: "ourp_4kzqNdQ7yFBie1jnQMarT9c",
    name: "小白大人的商铺",
    avatar:
      "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK2QVa1yomApFqLK8nDmIChsan2Ar3Sef8nf8YNiaN9icPwJC3ic25MgGziafhnyCtVLo9yJkbTC7TuWg/132",
    latest_mes: "零食零食零食在卖啦啦啦",
    message_list: [
      {
        type: "TEXT",
        content: "零食零食零食在卖啦啦啦",
        time: "yyyy-MM-dd HH:mm:ss"
      }
    ],
    unread: 1
  };

  const mylog = async res => {
    const store = getStore();

    const response = JSON.parse(res.data);
    const localStorage =
      (await wx.getStorageSync(MESSAGE_DATA)) || initMessageStorage;

    const nextLocalStorage = initMessageStorage;
    console.log(response);
    nextLocalStorage.message_count =
      response.message_count + localStorage.message_count;

    const nextUserList = localStorage.user_list.slice(0);
    const messageList = response.message_list.slice(0).sort((a, b) => {
      return Number(moment(a.time).format("x")) - Number(moment(b.time).format("x"));
    });
    messageList.forEach(item => {
      const userIndex = nextUserList.findIndex(
        value => value.openid === item.from.openid
      );
      if (userIndex !== -1) {
        nextUserList[userIndex].message_list.push({
          ...item.message,
          time: item.time,
          from: FROM_LEFT
        });
        nextUserList[userIndex].latest_mes = item.message.content;
        nextUserList[userIndex].latest_time = item.time;
        nextUserList[userIndex].unread += 1;
      } else {
        nextUserList.push({
          openid: item.from.openid,
          name: item.from.name,
          avatar: item.from.avatar,
          latest_mes: item.message.content,
          latest_time: item.time,
          message_list: [
            {
              ...item.message,
              time: item.time,
              from: FROM_LEFT
            }
          ],
          unread: 1
        });
      }
    });
    nextLocalStorage.user_list = nextUserList.sort((a, b) => {
      return Number(moment(b.time).format("x")) - Number(moment(a.time).format("x"));
    });
    await wx.setStorageSync(MESSAGE_DATA, nextLocalStorage);
    await console.log(wx.getStorageSync(MESSAGE_DATA));
    store.dispatch(refreshMessage(nextLocalStorage));
  };
  SocketTask.onMessage(res => mylog(res));
  SocketTask.onError(() => {
    console.log("socket error");
    isSocketOpen = false;
    setLoading(true);
  });
  SocketTask.onOpen(() => {
    console.log("socket open");
    setLoading(false);
  });
  SocketTask.onClose(() => {
    console.log("socket close");
    isSocketOpen = false;
    setLoading(true);
  });
  return true;
};

module.exports = {
  initSocket
};
