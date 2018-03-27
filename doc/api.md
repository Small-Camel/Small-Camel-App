# API



## 卖家
---
## 1.注册登陆

### 1.1 注册

#### 1. 接口名

POST	account

POST 参数

```JSON
{
  "openid":(String)登陆时服务器返还,
  "contact":(String)联系方式,
  "store_name":(String)店铺名,
  "graduation":(String yyyy-MM-dd)毕业时间,
  "grade":年级,
  "major":院系,
  "name":姓名,
  "introduction":店铺介绍
}
```
#### 2. 返回值

```Json
{
  "error":(String)错误
}
```

### 1.2 登陆

#### 1. 接口名

GET		onLogin?

| 参数名  | 参数       |
| ---- | -------- |
| code | res.code |

```javascript
wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://localhost:8080/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
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

POST	commodity

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

### 2.2 查看

#### 1. 接口名

GET	commodityList？

| 参数名        | 参数                |
| ---------- | ----------------- |
| storeid   | (String) 店铺 storeid |
| name       | (String) 模糊搜素     |
| first_rate | true              |
| label      | (String)id        |

#### 2. 返回值

```json
{
  [
  	"thumbnail":(String)缩略图,
  	"name":(String),
  	"commodityid":(String),
  	"price":(Number)
  ],
}
```

### 2.2.1 查看商品详情

#### 1. 接口名

GET	commodity？

| 参数名  | 参数         |
| ---- | ---------- |
| commodityid   | (String)commodityid |

#### 2. 返回值

```json
{
  "images":[urls,],
  "name":(String)商品名(不超过12字),
  "description":(String)描述(不超过300字),
  "image_number":(int)图片数量,
  "label":(String)标签,分类,
  "id":(String)id,
  "price":number,
  
  "contact":(String)联系方式,
  "store_name":(String)店铺名,
  "storeid":(String)店铺id,
  "introduction":店铺介绍,
  "avatar":(url)
}
```





### 2.3 下架商品

#### 1. 接口名

DELETE commodity?

| 参数名  | 参数            |
| ---- | ------------- |
| commodityid   | (String) 商品ID |


#### 2. 返回值


```json
{
  "error":(String)错误
}
```

## 3. 店家

#### 3.1 店家详情

#### 1. 接口名

GET	 store?

| 参数名  | 参数            |
| ---- | ------------- |
| id   | (String) 店家ID |

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

