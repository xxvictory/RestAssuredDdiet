/**
 * 网络请求封装方法
 *  参数1： method (string) 请求的类型 
 *  参数2： url (string) 请求的url地址
 *  参数3： params (json) 请求携带的参数
 *  参数4： message(string) 【loading=boolean】信息弹框内容
 *  参数5： success 成功函数
 *  参数6： fail失败函数
 */
function http(method,url,params,message,success,fail){
  if (message!=''){
    wx.showLoading({
      title: message,
    })
  }
  //请求
  wx.request({
    //写一个请求的域名 后期修改域名网址 统一修改
    url: 'http://iwenwiki.com:3002'+url,
    method:method,
    data: params,
    success:res=>{
        if(res.data.status==200){
          //成功获取了数据
          success(res.data);
        }else{
          //没有数据
          fail(res.data);
        }
    },
    fail:function(res){
      fail(res.data);
    },
    complete:function(res){
      if (message != '') {
        wx.hideLoading();
      }
    }
  })

 }

 //暴露出去
 module.exports=http;//{http:http}