# API

`@SessionRequire`
| 参数名 | 参数 |
| ---- | -------- |
| openid | 登陆时服务器返还 |
| signature | 登陆时从微信用户信息中获取 |
| rawData | 登陆时从微信用户信息中获取 |

## 卖家

---

## 1.注册登陆

### 1.1 注册

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
  "store_name":(String)店铺名,
  "graduation":(String yyyy-MM-dd)毕业时间,
  "grade":年级,
  "major":院系,
  "name":姓名,
  "introduction":店铺介绍,
  "avatar":(url)
}
```

#### 2. 返回值

```Json
{
  "error":(String)错误
}
```

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

## 2. 上传商品

### 2.1 上传

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
        "openid":(String)商店id,
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

### 2.2 查看

#### 1. 接口名

GET commodityList？

##### PathParameter

| 参数名     | 参数                      |
| ---------- | ------------------------- |
| openid     | (String) 店铺 openid      |
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
      "openid": "admin",
      "thumbnail":
        "http://cseiii-image-hosting.oss-cn-shenzhen.aliyuncs.com/xiaoluotuo/idtest1995365.jpg?x-oss-process=style/xiaoluotuo-thumbnail"
    },
    {
      "commodityid": "testid123456",
      "price": 8888.0,
      "label": "(String)标签, 分类",
      "name": "(String)商品名(不超过12字)",
      "openid": "admin",
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

### 2.2.1 查看商品详情

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

  "contact":(String)联系方式,
  "store_name":(String)店铺名,
  "openid":(String)店铺id,
  "introduction":店铺介绍,
  "avatar":(url)
}
```


### 2.3 下架商品

#### 1. 接口名

DELETE commodity?

##### PathParameter

`@SessionRequire`
| 参数名 | 参数 |
| ---- | ------------- |
| commodityid | (String) 商品 ID |

#### 2. 返回值

```json
{
  "error":(String)错误
}
```

## 3. 店家

#### 3.1 店家详情

#### 1. 接口名

GET store?

##### PathParameter

| 参数名 | 参数           |
| ------ | -------------- |
| openid | (String) 店 ID |

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


## 4. 分类

#### 4.1 得到分类

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

<!-- #### 3.1 新开店铺

#### 1. 接口名


POST	 store?
##### PathParameter
`@SessionRequire`
| 参数名  | 参数            |
| ---- | ------------- |

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
``` -->
