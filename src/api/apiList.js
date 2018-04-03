import { wxRequest } from "../utils/wxRequest";
import { UserInfoNotFound } from "./UserInfoNotFound";

var Mock = require("mockjs");

const DEBUG = true;
const basicUrl = "localhost:8080";

const getUserKeys = () => {
  try {
    var openid = wx.getStorageSync("openid");
    var signature = wx.getStorageSync("signature");
    var rawData = wx.getStorageSync("rawData");

    return `openid=${openid}&signature=${signature}&rawData=${rawData}`;
  } catch (e) {
    throw new UserInfoNotFound(e);
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
const registAccountMock = () => {};

const registAccount = payload => {
  let userKeys = "";
  try {
    userKeys = getUserKeys();
  } catch (e) {
    throw e;
  }

  return wxRequest(
    {
      query: payload,
      method: "POST"
    },
    basicUrl + "/user?" + userKeys
  );
};

/**
 * @SessionRequire
 * 1.1.# 得到用户信息
 */
const getUserDetailMock = () =>
  Mock.mock({
    openid: () => "openid" + Mock.Random.string(15),
    contact: () => "contact" + Mock.Random.string(30),
    store_name: () => "store_name" + Mock.Random.string(7),
    graduation: () => Mock.Random.date("yyyy-MM-dd"),
    "grade|1-4": 1,
    major: () => "major" + Mock.Random.string(4),
    name: () => Mock.Random.cname(),
    introduction: () => Mock.Random.sentence(),
    status: 200
  });

const getUserDetail = () => {
  let userKeys = "";
  try {
    userKeys = getUserKeys();
  } catch (e) {
    throw e;
  }

  return wxRequest(
    {
      method: "GET"
    },
    basicUrl + "/user?" + userKeys
  );
};

/**
 * 1.2 登陆
 * @param {res.code} code
 */
const loginMock = () => {
  return "12343312324221";
};

const login = code => {
  const data = wxRequest(
    {
      method: "GET"
    },
    basicUrl + `/onLogin?code=${code}`
  );
  try {
    wx.setStorageSync("openid", data.openid);
  } catch (e) {
    console.log("setStorageSync error");
  }
};

/**
 * @SessionRequire
 * 上传
 */
const uploadCommodityMock = () => {};

const uploadCommodity = payload => {
  let userKeys = "";
  try {
    userKeys = getUserKeys();
  } catch (e) {
    throw e;
  }

  return wxRequest(
    {
      query: payload,
      method: "POST"
    },
    basicUrl + `/commodity?` + userKeys
  );
};

/**
 * 查看商品
 * @param {*} param0
 */
const getCommodityListMock = () =>
  Mock.mock({
    "content|12": [
      {
        commodityid: () => Mock.Random.string(10),
        price: 8888.0,
        label: "2(String)标签, 分类",
        name: "2(String)商品名(不超过12字)",
        openid: "admin",
        thumbnail: () => Mock.Random.image("250x250")
      }
    ],
    pageable: {
      sort: { sorted: true, unsorted: false },
      offset: 0,
      pageNumber: 0,
      pageSize: 2,
      paged: true,
      unpaged: false
    },
    totalPages: 10,
    totalElements: 2,
    last: true,
    number: 0,
    size: 2,
    sort: { sorted: true, unsorted: false },
    numberOfElements: 2,
    first: true
  });
const getCommodityList = ({ size, page, openid, name, first_rate, label }) =>
  wxRequest(
    {
      method: "GET"
    },
    basicUrl +
      `/commodityList?size=${size}&page=${page}&openid=${openid}&name=${name}&first_rate=${first_rate}&label=${label}`
  );

/**
 * 查看商品详情
 * @param {*} commodityid
 */
const getCommodityDetailMock = () =>
  Mock.mock({
    "images|5": [() => Mock.Random.image("720x500")],
    name: () => Mock.Random.cname(),
    description: () => "description" + Mock.Random.string(30),
    image_number: 5,
    label: () => "label" + Mock.Random.string(3),
    commodityid: () => Mock.Random.string(8),
    "price|1-500": 1,

    contact: () => "contact" + Mock.Random.string(30),
    store_name: () => "store_name" + Mock.Random.string(3),
    openid: () => Mock.Random.string(10),
    introduction: () => Mock.Random.string(30),
    avatar: () => Mock.Random.image("100x100", "blue")
  });
const getCommodityDetail = commodityid => {
  return wxRequest(
    {
      method: "GET"
    },
    basicUrl + `/commodity?commodityid=${commodityid}`
  );
};

const getStoreDetailMock = () =>
  Mock.mock({
    "level|1-5": "⭐",
    contact: () => "contact" + Mock.Random.string(30),
    store_name: () => "store_name" + Mock.Random.string(3),
    introduction: () => Mock.Random.string(30),
    avatar: () => Mock.Random.image("100x100", "blue")
  });

const getStoreDetail = openid => {
  return wxRequest(
    {
      method: "GET"
    },
    basicUrl + `/store?openid=${openid}`
  );
};

const getCategory = () =>
  Mock.mock([{
    name: () => Mock.Random.cname(),
    categoryid: () => "categoryid" + Mock.Random.string(30),
    description:()=> Mock.Random.string(30),
    "children|15":[{
      cover: () => Mock.Random.image("100x100"),
      name: () => Mock.Random.cname(),
      categoryid: () => "categoryid" + Mock.Random.string(30),
      description:()=> Mock.Random.string(30),
    }]
  },{
    cover: [() => Mock.Random.image("100x100")],
    name: () => Mock.Random.cname(),
    categoryid: () => "categoryid" + Mock.Random.string(30),
    description:()=> Mock.Random.string(30),
    "children|15":[{
      cover: [() => Mock.Random.image("100x100")],
      name: () => Mock.Random.cname(),
      categoryid: () => "categoryid" + Mock.Random.string(30),
      description:()=> Mock.Random.string(30),
    }]
  },{
    cover: [() => Mock.Random.image("100x100")],
    name: () => Mock.Random.cname(),
    categoryid: () => "categoryid" + Mock.Random.string(30),
    description:()=> Mock.Random.string(30),
    "children|15":[{
      cover: [() => Mock.Random.image("100x100")],
      name: () => Mock.Random.cname(),
      categoryid: () => "categoryid" + Mock.Random.string(30),
      description:()=> Mock.Random.string(30),
    }]
  },]);

module.exports = {
  getCommodityDetail: getCommodityDetailMock,
  getCommodityList: getCommodityListMock,
  uploadCommodity: uploadCommodityMock,
  login: loginMock,
  getUserDetail: getUserDetailMock,
  registAccount: registAccountMock,
  getStoreDetail: getStoreDetailMock,
  getCategory
};
