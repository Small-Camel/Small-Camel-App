import { wxRequest } from "../utils/wxRequest";
import { UserInfoNotFound } from "./UserInfoNotFound";
import jsonToUrl from "../utils/jsonToUrl";


const DEBUG = true;
const basicUrl = "https://www.xiaoluotuozahuopu.com/api";
// const basicUrl = "http://172.26.69.219:8080/api";
// const basicUrl = "http://192.168.2.167:8080/api";

const getUserKeys = () => {
  try {
    var openid = wx.getStorageSync("openid");
    var signature = wx.getStorageSync("signature");
    // var openid = "admin";
    // var signature = "123456";
    var rawData = wx.getStorageSync("rawData");
    let strRawData = jsonToUrl(rawData, "rawData");
    console.log(strRawData);

    return `openid=${openid}&signature=${signature}` + strRawData;
    // return `openid=${openid}&signature=${signature}`;
  } catch (e) {
    wx.switchTab("/pages/info");
  }
};

//===============================卖家===================================

/**
 * @SessionRequire
 * 1.1 注册
 * POST
 * {
  "openid":(String)登陆时服务器返还,
  "contact":(String)联系方式,
  "store_name":(String)店铺名,
  "graduation":(String yyyy-MM-dd)毕业时间,
  "grade":年级,
  "major":院系,
  "name":姓名,
  "introduction":店铺介绍
}
 */
// const registAccountMock = () => {};

const registAccount = async  (payload) => {
  let userKeys = "";
  try {
    userKeys = await getUserKeys();
  } catch (e) {
    throw e;
  }

  let json = await wxRequest(
    {
      query: payload,
      method: "POST"
    },
    basicUrl + "/user?" + userKeys
  );
  return json.data;
};

/**
 * @SessionRequire
 * 1.1.# 得到用户信息
 */
// const getUserDetailMock = () =>
//   Mock.mock({
//     openid: () => "openid" + Mock.Random.string(15),
//     contact: () => "contact" + Mock.Random.string(30),
//     store_name: () => "store_name" + Mock.Random.string(7),
//     graduation: () => Mock.Random.date("yyyy-MM-dd"),
//     "grade|1-4": 1,
//     major: () => "major" + Mock.Random.string(4),
//     name: () => Mock.Random.cname(),
//     introduction: () => Mock.Random.sentence(),
//     status: 200
//   });

const getUserDetail = async () => {
  let userKeys = "";
  try {
    userKeys = await getUserKeys();
  } catch (e) {
    throw e;
  }

  let json = await wxRequest(
    {
      method: "GET"
    },
    basicUrl + "/user?" + userKeys
  );

  return json;
};

/**
 * 1.2 登陆
 * @param {res.code} code
 */
// const loginMock = () => {
//   return "12343312324221";
// };

const login = async code => {
  console.log("code", code);
  let json = await wxRequest(
    {
      method: "GET"
    },
    basicUrl + `/onLogin?code=${code}`
  );
  const data = json.data;
  try {
    wx.setStorageSync("openid", data.openid);
  } catch (e) {
    console.log("setStorageSync error");
  }
  return data.openid;
};

/**
 * @SessionRequire
 * 上传
 */
// const uploadCommodityMock = () => {
//   setTimeout(2000);
//   return;
// };

const uploadCommodity = async ({ formData, imageList }) => {
  console.log("imageList", imageList);
  console.log("formData", formData);
  let isError = false;
  try {
    let userKeys = getUserKeys();
    console.log("in1formData", formData);

    for (let element in imageList) {
      await wx.uploadFile({
        url: basicUrl + `/commodity?` + userKeys, //仅为示例，非真实的接口地址
        // url: basicUrl + `/commodity?` , //仅为示例，非真实的接口地址
        filePath: imageList[element],
        name: "file",
        // header: {
        // "accept": "multipart/form-data",
        // "content-type": "multipart/form-data"
        // "content-type":"multipart/form-data; charset=UTF-8"
        // },
        formData: formData,
        success: function(res) {
          console.log(res);

          isError = false;
        }
      });
    }
  } catch (e) {
    console.log(e);
  }

  return true;
};

/**
 * 查看商品
 * @param {*} param0
 */
// const getCommodityListMock = () =>
  // Mock.mock({
  //   "content|12": [
  //     {
  //       commodityid: () => Mock.Random.string(10),
  //       price: 8888.0,
  //       label: "2(String)标签, 分类",
  //       name: "2(String)商品名(不超过12字)",
  //       openid: "admin",
  //       thumbnail: () => Mock.Random.image("250x250")
  //     }
  //   ],
  //   pageable: {
  //     sort: { sorted: true, unsorted: false },
  //     offset: 0,
  //     pageNumber: 0,
  //     pageSize: 2,
  //     paged: true,
  //     unpaged: false
  //   },
  //   totalPages: 10,
  //   totalElements: 2,
  //   last: true,
  //   number: 0,
  //   size: 2,
  //   sort: { sorted: true, unsorted: false },
  //   numberOfElements: 2,
  //   first: true
  // });
const getCommodityList = async ({
  size,
  page,
  openid,
  name,
  first_rate,
  label
}) => {
  let json = await wxRequest(
    {
      method: "GET"
    },
    basicUrl +
      `/commodityList?size=${size}&page=${page}&openid=${openid}&name=${name}&first_rate=${first_rate}&label=${label}`
  );
  return json.data;
};
/**
 * 查看商品详情
 * @param {*} commodityid
 */
// const getCommodityDetailMock = () =>
  // Mock.mock({
  //   "images|5": [() => Mock.Random.image("720x500")],
  //   name: () => Mock.Random.cname(),
  //   description: () => "description" + Mock.Random.string(30),
  //   image_number: 5,
  //   label: () => "label" + Mock.Random.string(3),
  //   commodityid: () => Mock.Random.string(8),
  //   "price|1-500": 1,

  //   contact: () => "contact" + Mock.Random.string(30),
  //   store_name: () => "store_name" + Mock.Random.string(3),
  //   openid: () => Mock.Random.string(10),
  //   introduction: () => Mock.Random.string(30),
  //   avatar: () => Mock.Random.image("100x100", "blue")
  // });
const getCommodityDetail = async commodityid => {
  let json = await wxRequest(
    {
      method: "GET"
    },
    basicUrl + `/commodity?commodityid=${commodityid}`
  );
  return json.data;
};

// const getStoreDetailMock = () =>
//   Mock.mock({
//     "level|1-5": "⭐",
//     contact: () => "contact" + Mock.Random.string(30),
//     store_name: () => "store_name" + Mock.Random.string(3),
//     introduction: () => Mock.Random.string(30),
//     avatar: () => Mock.Random.image("100x100", "blue")
//   });

const getStoreDetail = async openid => {
  let json = await wxRequest(
    {
      method: "GET"
    },
    basicUrl + `/store?openid=${openid}`
  );
  return json.data;
};

// const getCategoryMock = () =>
  // Mock.mock([
  //   {
  //     cover: [() => Mock.Random.image("100x100")],
  //     name: () => Mock.Random.cname(),
  //     description: () => Mock.Random.string(30),
  //     "children|15": [
  //       {
  //         cover: () => Mock.Random.image("100x100"),
  //         name: () => Mock.Random.cname(),
  //         description: () => Mock.Random.string(30)
  //       }
  //     ]
  //   },
  //   {
  //     cover: [() => Mock.Random.image("100x100")],
  //     name: () => Mock.Random.cname(),
  //     description: () => Mock.Random.string(30),
  //     "children|15": [
  //       {
  //         cover: [() => Mock.Random.image("100x100")],
  //         name: () => Mock.Random.cname(),
  //         description: () => Mock.Random.string(30)
  //       }
  //     ]
  //   },
  //   {
  //     cover: [() => Mock.Random.image("100x100")],
  //     name: () => Mock.Random.cname(),
  //     description: () => Mock.Random.string(30),
  //     "children|15": [
  //       {
  //         cover: [() => Mock.Random.image("100x100")],
  //         name: () => Mock.Random.cname(),
  //         description: () => Mock.Random.string(30)
  //       }
  //     ]
  //   }
  // ]);

const getCategory = async () =>{
  let json = await wxRequest(
    {
      method: "GET"
    },
    basicUrl + `/category`
  );
  return json.data;
}
  

const deleteCommodity = async commodityList => {
  let userKeys = "";
  try {
    userKeys = getUserKeys();
  } catch (e) {
    throw e;
  }

  await commodityList.forEach(async element => {
    let json = await wxRequest(
      {
        method: "DELETE"
      },
      basicUrl + `/commodity?commodityid=${element}&` + userKeys
    );
    if (json.statusCode > 400) {
      return false;

    }
    return json.data;
  });

  return true;
};

const getArticleList= async ()=>{
  let json = await wxRequest(
    {
      method: "GET"
    },
    basicUrl + `/articlelist`
  );
  return json.data;
}

module.exports = {
  // getCommodityDetail: getCommodityDetailMock,
  // getCommodityList: getCommodityListMock,
  // uploadCommodity,
  // login: loginMock,
  // getUserDetail: getUserDetailMock,
  // registAccount: registAccountMock,
  // getStoreDetail: getStoreDetailMock,
  // getCategory,
  // deleteCommodity

  getCommodityDetail,
  getCommodityList,
  uploadCommodity,
  login,
  getUserDetail,
  registAccount,
  getStoreDetail,
  getCategory,
  deleteCommodity
};
