import { wxRequest } from "../utils/wxRequest";
import Mock from "mockjs";

const DEBUG = true;
const basicUrl = "localhost:8080";

//===============================卖家===================================

/**
 * @SessionRequire
 * 注册登陆
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

const registAccount = params => payload => {
  return wxRequest(
    {
      query: payload,
      method: "POST"
    },
    basicUrl + "/user"
  );
};

/**
 * @SessionRequire
 * 得到用户信息
 * TODO:storeid
 */
const getUserDetailMock = () =>
  JSON.stringify(
    Mock.mock({
      openid: () => "openid" + Mock.Random.string(15),
      contact: () => "contact" + Mock.Random.string(30),
      store_name: () => "store_name" + Mock.Random.string(7),
      graduation: () => Mock.Random.date("yyyy-MM-dd"),
      "grade|1-4": 1,
      major: () => "major" + Mock.Random.string(4),
      name: () => Mock.Random.cname(),
      introduction: () => Mock.Random.sentence()
    })
  );

const getUserDetail = () => {
  return wxRequest(
    {
      method: "GET"
    },
    basicUrl + "/user"
  );
};

/**
 * 登陆
 * @param {res.code} code
 */
const loginMock = () => {
  openid: "openid";
};

const login = code => {
  return wxRequest(
    {
      method: "GET"
    },
    basicUrl + `/onLogin?code=${code}`
  );
};

/**
 * @SessionRequire
 * 上传
 */
const uploadCommodityMock = () => {};

const uploadCommodity = payload => {
  return wxRequest(
    {
      query: payload,
      method: "POST"
    },
    basicUrl + `/commodity`
  );
};

/**
 * 查看商品
 * @param {*} param0
 */
const getCommodityListMock = () => JSON.stringify({});
const getCommodityList = ({ storeid, name, first_rate, label }) =>
  wxRequest(
    {
      method: "GET"
    },
    basicUrl +
      `/commodityList?storeid=${storeid}&name=${name}&first_rate=${first_rate}&label=${label}`
  );


/**
 * 查看商品详情
 * @param {*} commodityid 
 */
const getCommodityDetailMock=()=>JSON.stringify({
    "images|5":[()=>Mock.Random.image('720x500')],
    "name":()=>Mock.Random.cname(),
    "description":()=>"description"+Mock.Random.string(30),
    "image_number":5,
    "label":()=>"label"+Mock.Random.string(3),
    "id":()=>Mock.Random.string(8),
    "price|1-500":1,
    
    "contact":()=>"contact"+Mock.Random.string(30),
    "store_name":()=>"store_name"+Mock.Random.string(3),
    "storeid":()=>Mock.Random.string(10),
    "introduction":Mock.Random.string(30),
    "avatar":()=>Mock.Random.image("100x100","blue")
})
const getCommodityDetail=commodityid=>{
    return wxRequest(
        {
          method: "GET"
        },
        basicUrl+`/commodity?commodityid=${commodityid}`
    )
}