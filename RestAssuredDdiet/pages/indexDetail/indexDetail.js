// pages/indexDetail/indexDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexDetail:'',//页面数据存储
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //onLoad函数参数 options接受其他页面跳转进入这个页面 传递的url参数
    console.log('url传递的参数',options);
    //网络请求---对应的详情信息数据
    wx.showLoading({
      title: '数据加载中',
    })
    wx.showNavigationBarLoading();
    wx.request({
      url: 'http://iwenwiki.com:3002/api/indexlist/detail',
      data:{
        id: options.itemId
      },
      success:res=>{
        console.log(res.data);
        this.setData({
          indexDetail:res.data[0]
        })
        //修改当前的页面的导航栏内容 动态设置当前页面的标题
        wx.setNavigationBarTitle({
          title: res.data[0].title,
        })

      },
      complete:function(){
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})