# API

- [API](#api)
  - [卖家](#)
  - [1.注册登陆](#1)
    - [1.1 注册`CHANGE`](#11-change)
      - [1. 接口名](#1)
        - [PathParameter](#pathparameter)
        - [Payload](#payload)
      - [2. 返回值](#2)
    - [1.1.# 得到用户信息](#11)
      - [1. 接口名](#1)
        - [PathParameter](#pathparameter)
        - [Payload](#payload)
      - [2. 返回值](#2)
    - [1.2 登陆](#12)
      - [1. 接口名](#1)
        - [PathParameter](#pathparameter)
        - [Payload](#payload)
      - [2. 返回值](#2)
  - [2. 店铺`NEW`](#2-new)
    - [2.1 新建店铺](#21)
      - [接口名](#)
        - [PathParameter](#pathparameter)
        - [Payload](#payload)
      - [2. 返回值](#2)
    - [2.2 查看店铺`NEW`](#22-new)
      - [1. 接口名](#1)
        - [PathParameter](#pathparameter)
      - [2. 返回值](#2)
    - [2.3 关闭商铺`NEW`](#23-new)
      - [1. 接口名](#1)
        - [PathParameter](#pathparameter)
      - [2. 返回值](#2)
  - [2. 上传商品](#2)
    - [2.1 上传`CHANGE`](#21-change)
      - [1. 接口名](#1)
        - [PathParameter](#pathparameter)
        - [Payload](#payload)
      - [2. 返回值](#2)
    - [2.2 查看 `change`](#22--change)
      - [1. 接口名](#1)
        - [PathParameter](#pathparameter)
      - [2. 返回值](#2)
    - [2.2.1 查看商品详情`CHANGE`](#221-change)
      - [1. 接口名](#1)
      - [2. 返回值](#2)
    - [2.3 下架商品](#23)
      - [1. 接口名](#1)
        - [PathParameter](#pathparameter)
      - [2. 返回值](#2)
  - [3. 店家](#3)
    - [3.1 店家详情`@deprecate`](#31-deprecate)
      - [1. 接口名](#1)
        - [PathParameter](#pathparameter)
      - [2. 返回值](#2)
  - [4. 分类](#4)
    - [4.1 得到分类](#41)
      - [1. 接口名](#1)
      - [2. 返回值](#2)
  - [5. 聊天](#5)
    - [5.1 得到新消息](#51)
      - [1. 接口名](#1)
      - [2. 返回值](#2)

`@SessionRequire`
| 参数名    | 参数                       |
| --------- | -------------------------- |
| openid    | 登陆时服务器返还           |
| signature | 登陆时从微信用户信息中获取 |
| rawData   | 登陆时从微信用户信息中获取 |

----------------------------------------------------------------------
----------------------------------------------------------------------

## 卖家

---

## 1.注册登陆

### 1.1 注册`CHANGE`

#### 1. 接口名 

POST user

##### PathParameter

`@SessionRequire`
POST 参数

##### Payload

```JSON
{
  "openid":(String)登陆时服务器返还,
  "contact":(String)联系方式,
  "graduation":(String yyyy-MM-dd)毕业时间,
  "grade":年级,
  "major":院系,
  "name":姓名,
  "avatar":(url)
  "location":(string)学校名
}
```

#### 2. 返回值

```Json
{
  "error":(String)错误
}
```

----------------------------------------------------------------------

### 1.1.# 得到用户信息

#### 1. 接口名

GET user

##### PathParameter

`@SessionRequire`
GET 参数

##### Payload

```JSON
{

}
```

#### 2. 返回值

```Json
{
  "error":(String)错误,
}or{
  "openid":(String)登陆时服务器返还,
  "contact":(String)联系方式,
  "store_name":(String)店铺名,
  "graduation":(String yyyy-MM-dd)毕业时间,
  "grade":年级,
  "major":院系,
  "name":姓名,
  "introduction":店铺介绍,
  "avatar":(url)
}
```

----------------------------------------------------------------------

### 1.2 登陆

#### 1. 接口名

GET onLogin?

##### PathParameter

| 参数名 | 参数     |
| ------ | -------- |
| code   | res.code |

##### Payload

```javascript
wx.login({
  success: function(res) {
    if (res.code) {
      //发起网络请求
      wx.request({
        url: "http://localhost:8080/onLogin",
        data: {
          code: res.code
        }
      });
    } else {
      console.log("登录失败！" + res.errMsg);
    }
  }
});
```

#### 2. 返回值

```json
{
  "openid":(String)唯一标识符
}
```

----------------------------------------------------------------------
----------------------------------------------------------------------



## 2. 店铺`NEW`

### 2.1 新建店铺

#### 接口名

POST store

##### PathParameter

`@SessionRequire`

##### Payload

POST 参数

```json
wx.chooseImage({
  success: function(res) {
    var tempFilePaths = res.tempFilePaths
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
      filePath: tempFilePaths[0],
      name: 'file',
      formData:{  
         "store_name":(String)店铺名(不超过12字),
         "description":(String)店铺描述(不超过300字),
         "storeid":(String)店铺id,
         "location":店铺所在学校,
      }
      success: function(res){
        var data = res.data
        //do something
      }
    })
  }
})
```
#### 2. 返回值

```json
{
  "error":(String)错误
}
```

### 2.2 查看店铺`NEW`

#### 1. 接口名

GET storeList？

##### PathParameter

| 参数名     | 参数                      |
| ---------- | ------------------------- |
| page       | page 分页查询中的哪一页   |
| size       | size 分页查询中一页的大小 |
| name       | (String) 模糊搜素         |
| first_rate | true                      |
| store_id   | 店铺id                    |
| open_id    | 某用户的全部店铺          |
| location   | (string)                  |


#### 2. 返回值

```json
{
  "content": [
    {
      "storeid": "idtest",
      "description": "(String)店铺描述(不超过300字)",
      "store_name": "2(String)店铺名(不超过12字)",
      "location": "兰州大学",
      "cover":
        "http://cseiii-image-hosting.oss-cn-shenzhen.aliyuncs.com/xiaoluotuo/idtest1995365.jpg?x-oss-process=style/xiaoluotuo-thumbnail" （店铺封面）
    },
  ],
  "pageable": {
    "sort": { "sorted": true, "unsorted": false },
    "offset": 0,
    "pageNumber": 0,
    "pageSize": 2,
    "paged": true,
    "unpaged": false
  },
  "totalPages": 1,
  "totalElements": 2,
  "last": true,
  "number": 0,
  "size": 2,
  "sort": { "sorted": true, "unsorted": false },
  "numberOfElements": 2,
  "first": true
}
```

----------------------------------------------------------------------

### 2.3 关闭商铺`NEW`

#### 1. 接口名

DELETE store?

##### PathParameter

`@SessionRequire`

| 参数名  | 参数             |
| ------- | ---------------- |
| storeid | (String) 商品 ID |

#### 2. 返回值

```json
{
  "error":(String)错误
}
```



## 2. 上传商品

### 2.1 上传`CHANGE`

#### 1. 接口名

POST commodity

##### PathParameter

`@SessionRequire`

##### Payload

POST 参数

```json
wx.chooseImage({
  success: function(res) {
    var tempFilePaths = res.tempFilePaths
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
      filePath: tempFilePaths[0],
      name: 'file',
      formData:{  
        "name":(String)商品名(不超过12字),
  		  "description":(String)描述(不超过300字),
  		  "image_number":(int)图片数量,
  		  "label":(String)标签,分类,
        "commodityid":(String)商品id,
        "price":number,
        "storeid":(String)商店id,
      }
      success: function(res){
        var data = res.data
        //do something
      }
    })
  }
})
```

#### 2. 返回值

```json
{
  "error":(String)错误
}
```

----------------------------------------------------------------------

### 2.2 查看 `change`

#### 1. 接口名

GET commodityList？

##### PathParameter

| 参数名     | 参数                      |
| ---------- | ------------------------- |
| storeid     | (String) 店铺 storeid      |
| page       | page 分页查询中的哪一页   |
| size       | size 分页查询中一页的大小 |
| name       | (String) 模糊搜素         |
| first_rate | true                      |
| label      | (String)类型标签          |




#### 2. 返回值

```json
{
  "content": [
    {
      "commodityid": "idtest",
      "price": 8888.0,
      "label": "2(String)标签, 分类",
      "name": "2(String)商品名(不超过12字)",
      "storeid": "admin",
      "thumbnail":
        "http://cseiii-image-hosting.oss-cn-shenzhen.aliyuncs.com/xiaoluotuo/idtest1995365.jpg?x-oss-process=style/xiaoluotuo-thumbnail"
    },
    {
      "commodityid": "testid123456",
      "price": 8888.0,
      "label": "(String)标签, 分类",
      "name": "(String)商品名(不超过12字)",
      "storeid": "admin",
      "thumbnail":
        "http://cseiii-image-hosting.oss-cn-shenzhen.aliyuncs.com/xiaoluotuo/testid1234561436990.jpg?x-oss-process=style/xiaoluotuo-thumbnail"
    }
  ],
  "pageable": {
    "sort": { "sorted": true, "unsorted": false },
    "offset": 0,
    "pageNumber": 0,
    "pageSize": 2,
    "paged": true,
    "unpaged": false
  },
  "totalPages": 1,
  "totalElements": 2,
  "last": true,
  "number": 0,
  "size": 2,
  "sort": { "sorted": true, "unsorted": false },
  "numberOfElements": 2,
  "first": true
}
```

----------------------------------------------------------------------

### 2.2.1 查看商品详情`CHANGE`

#### 1. 接口名

GET commodity？

| 参数名      | 参数                |
| ----------- | ------------------- |
| commodityid | (String)commodityid |

#### 2. 返回值

```json
{
  "images":[urls,],
  "name":(String)商品名(不超过12字),
  "description":(String)描述(不超过300字),
  "image_number":(int)图片数量,
  "label":(String)标签,分类,
  "commodityid":(String)commodityid,
  "price":number,

  "store_detail":{
    "store_name":(String)店铺名,
    "storeid":(String)店铺id,
    "description":店铺介绍,
    "cover":(url)
  }
}
```

----------------------------------------------------------------------


### 2.3 下架商品

#### 1. 接口名

DELETE commodity?

##### PathParameter

`@SessionRequire`
| 参数名      | 参数             |
| ----------- | ---------------- |
| commodityid | (String) 商品 ID |

#### 2. 返回值

```json
{
  "error":(String)错误
}
```

----------------------------------------------------------------------


## 3. 店家

### 3.1 店家详情`@deprecate`

#### 1. 接口名

GET store?

##### PathParameter

| 参数名  | 参数           |
| ------- | -------------- |
| storeid | (String) 店 ID |

#### 2. 返回值

```json
{
  "contact":(String)联系方式,
  "store_name":(String)店铺名,
  "introduction":店铺介绍,
  "avatar":(url),
  "level":(...)
}
```

----------------------------------------------------------------------
----------------------------------------------------------------------


## 4. 分类

### 4.1 得到分类

#### 1. 接口名

GET category

#### 2. 返回值

```json
[{
    "name": string,
    "categoryid": string
    "children":[{
      "cover": 100X100
      "name": string,
      "categoryid": string
      "description":string,
    }]
  },]
```

## 5. 聊天

### 5.1 得到新消息

#### 1. 接口名

message

```json
{
  "type":(TEXT),
  "content":string,
}
```



#### 2. 返回值

```json
{
  "message_count":(int),//消息数量
  "message_list":[{
    "from":{
      "openid":string,
      "name":string,
      "avatar":url,
    },
    "to":{
      "openid":string,
      "name":string,
      "avatar":url,
    },
    "message":{
      "type":(TEXT),
      "content":string,
    },
    "time":yyyy-MM-dd HH:mm:ss
  }]
}

```



<!-- #### 3.1 新开店铺

#### 1. 接口名


POST	 store?
##### PathParameter
`@SessionRequire`
| 参数名 | 参数 |
| ------ | ---- |

##### Payload 


#### 2. 返回值

```json
{
  "contact":(String)联系方式,
  "store_name":(String)店铺名,
  "introduction":店铺介绍,
  "avatar":(url),
  "level":(...)
}
```

----------------------------------------------------------------------
----------------------------------------------------------------------


## 5. 管理员

### 5.1 管理员登录

#### 1. 接口名
GET admin/login?
##### Header



##### PathParameter

| 参数名   | 参数           |
| -------- | -------------- |
| username | 用户名 |
| password | 密码 |
#### 2. 返回值

200

​```json
{
  "token":(String)令牌
}
```

or 403

​```json
{
  "error":(String)错误
}
```

----------------------------------------------------------------------

### 5.2 查询商品(按条件)

#### 1. 接口名
GET admin/commodity？
##### Header
token : ""
##### PathParameter
| 参数名     | 参数                      |
| ---------- | ------------------------- |
| openid     | (String) 店铺 openid      |
| page       | page 分页查询中的哪一页   |
| size       | size 分页查询中一页的大小 |
| name       | (String) 模糊搜素         |
| first_rate | true/false                      |
| label      | (String)类型标签          |
| state      | (String)当前商品状态<UNDERREVIEW("审核"),INSALE("售卖中"),SOLDOUT("卖完了"),OFFSALE("下架");>          |
##### Payload
#### 2. 返回值
200
```json
[{
  "images":[urls,],
  "name":(String)商品名(不超过12字),
  "description":(String)描述(不超过300字),
  "image_number":(int)图片数量,
  "label":(String)标签,分类,
  "commodityid":(String)commodityid,
  "price":number,
  "state":(String)商品状态,
  "openid":(String)店铺id,
  "firstRate":true/false,
  "thumbnail":(String)url,
}]
```
or 400

```json
{
  "error":(String)错误
}
```

or 401 token无效

----------------------------------------------------------------------

### 5.3.#.1 查询类型标签(label)

#### 1. 接口名
GET admin/label
##### Header
token : ""

#### 2. 返回值
200
```json
[{
    "name": string,
    "description": string,
    "cover": string(url),
    "parentName": string(name)
  },]
```

or 401 token无效

----------------------------------------------------------------------

### 5.3.#.2 修改类型标签(label)

#### 1. 接口名
put admin/label?
##### Header
token : ""
##### Pathvariable
{}:
##### PathParameter
| 参数名     | 参数                      |
| ---------- | ------------------------- |
| name     | 分类名-原有的就为修改,没有的就为新增|

##### Payload
```json
{
    "description": string,
    "cover": string(url),
    "parentName": string(name)
}
```
#### 2. 返回值
200

or 400

```json
{
  "error":(String)错误
}
```
or 401 token无效

----------------------------------------------------------------------
### 5.3 修改商品(first_rate)(label)(state)

#### 1. 接口名
put admin/commodity？
##### Header
token : ""
##### PathParameter
| 参数名     | 参数                      |
| ---------- | ------------------------- |
| commodityid     | 商品id      |

##### Payload
```json
{
  "label":(String)标签,分类,
  "state":(String)商品状态,
  "first_rate":true/false,
}
```
#### 2. 返回值
200

or 400

```json
{
  "error":(String)错误
}
```
or 401 token无效
----------------------------------------------------------------------

### 5.4 查询商家(按条件)
#### 1. 接口名
GET admin/store?
##### Header
token : ""
##### PathParameter
| 参数名     | 参数                      |
| ---------- | ------------------------- |
| storeid     | (String) 店铺 storeid      |
| page       | page 分页查询中的哪一页   |
| size       | size 分页查询中一页的大小 |
| store_name | (String) 模糊搜素         |
| store_state| (String)当前店铺状态<OPEN(营业中),CLOSED(小黑屋)>          |
##### Payload
#### 2. 返回值
200
```json
{
  "storeid":(String)店铺id,
  "contact":(String)联系方式,
  "store_name":(String)店铺名,
  "introduction":店铺介绍,
  "avatar":(url),
  "level":(...),
  "store_state":(String)店铺状态
}
```
or 400

```json
{
  "error":(String)错误
}
```
or 401 token无效

----------------------------------------------------------------------

### 5.5 (小黑屋)(解封)(设置等级=选择为精品)商家
#### 1. 接口名
PUT admin/store?
##### Header
token : ""
##### PathParameter
| 参数名     | 参数                      |
| ---------- | ------------------------- |
| openid     | (String) 店铺 openid      |
##### Payload
```json
{
  "level":(...),
  "store_state":(String)店铺状态
}
```
#### 2. 返回值
200
```json
{
  "openid":(String)店铺id,
  "contact":(String)联系方式,
  "store_name":(String)店铺名,
  "introduction":店铺介绍,
  "avatar":(url),
  "level":(...),
  "store_state":(String)店铺状态
}
```

or 401 token无效

----------------------------------------------------------------------
### 5.6.#.1 查看走马灯
#### 1. 接口名
GET admin/swiper
##### Header
token : ""
#### 2. 返回值
200
```json
[{
  "name":(String)文章名,
  "content":(String)文章,
  "cover":(String)封面url
},]
```

or 401 token无效

----------------------------------------------------------------------
### 5.6.#.2 删除走马灯中的文章
#### 1. 接口名
DELETE admin/swiper?
##### Header
token : ""
##### PathParameter
| 参数名     | 参数                      |
| ---------- | ------------------------- |
| name     | (String) 要删除的文章名      |

#### 2. 返回值
200

or 404 要删除的不存在

or 401 token无效

----------------------------------------------------------------------
### 5.6.#.3 设置走马灯
#### 1. 接口名
PUT admin/swiper?
##### Header
token : ""
##### PathParameter
| 参数名     | 参数                      |
| ---------- | ------------------------- |
| name     | (String) 要删除的文章名      |
##### Payload
```json
{
  "name":(String)文章名,
  "content":(String)文章,
  "cover":(String)封面url
}
```
#### 2. 返回值
200

or 400

```json
{
  "error":(String)错误
}
```
or 401 token无效
----------------------------------------------------------------------
