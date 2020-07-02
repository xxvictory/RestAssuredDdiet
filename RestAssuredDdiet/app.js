//app.js
App({
 
  onLaunch:function(){

    //1.获取本地的存储openid ---
    var openid = wx.getStorageSync('openid');
    if (openid) {
        //存在标识---说明之前已经登录 
        //直接请求登录业务逻辑-----------
        // wx.request({
        //   url: '',
        // })
    }else{
      console.log('之前没有登录');
      //建议给用户指引 做授权登录
      // wx.login({
      //   success:res=>{
      //     console.lg(res);
      //     //发送-- 
      // 

      //   }
      // })
    }






    //1.获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
    //1.获取之前是否授权过----
    wx.getSetting({
      success:res=>{
        console.log(res.authSetting);
        if (res.authSetting['scope.userInfo']){
          console.log('之前已经授权了小程序--获取小程序信息');
            //2.获取用户信息
            wx.getUserInfo({
              success:data=>{
                console.log(data.userInfo);
                //存储到全局变量上---
                this.globalData.userInfo = data.userInfo;

                // // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  console.log('进入函数userInfoReadyCallback')
                  this.userInfoReadyCallback(data.userInfo)
                }
                
              }
            })

        }else{
          console.log('之前没有授权登录过---引导用户进入授权界面')
        }
      }
    })
  },
  // userInfoReadyCallback:function(){},
  globalData: {
    cityName:'',//切换的城市的变量
    userInfo:'',//用户信息
  }
})