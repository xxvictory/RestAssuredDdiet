// pages/about/about.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    nickName: '', //昵称
    avatarUrl: '', //头像

  },
  onLoad: function(options) {
    //进入页面先获取全局的变量是否有用户信息 
    console.log(app.globalData);
    if (app.globalData.userInfo) {
      console.log('全局变量用户信息存在');

      this.setData({
        nickName: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        isShow: false
      })

    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log('userInfoReadyCallback 获取数据')
        this.setData({
          isShow: false,
          nickName: res.nickName, //昵称
          avatarUrl: res.avatarUrl, //头像
        })
      }      


    }
  },
  //1.点击授权信息-------------------------
  getUserInfo: function(e) {
    console.log(e.detail.userInfo);
    //获取后存储本地数据---但是不好--更新数据了获取本地还是之前的内容----
    this.setData({
      isShow: false,
      nickName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl
    })

    //登录------

  },
  //2.---授权-登录--小程序点击登录-------------------------------------
  login:function(e){
    //1.获取用户的头像和昵称
    this.setData({
      isShow: false,
      nickName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl
    })
    //2.登录------
    wx.login({
      success:res=>{
        //获取登录的凭证
        console.log(res.code);
        //获取登录凭证后 网络请求--访问后台服务器接口 换成openid  session_key
        wx.request({
          url: 'http://localhost:3000/getSession',
          data:{
            codeId:res.code
          },
          success:result=>{
            console.log(result.data);
            var loginInfo=result.data;
            console.log('openid', result.data.openid);
            //存储
            wx.setStorageSync('openid', result.data.openid);


            //获取openid session_key 获取后 发送给后台登录业务
            //登录------------------------
              // wx.request({
              //   url: '/login',
              //   data:{
              //     openid: result.data.openid,
              //   },
              //   success:data=>{
              //     console.log('成功的登录的后台结果');
              //   }
              // })
            //---------------------------------------

          }
        })

      }
    })


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})