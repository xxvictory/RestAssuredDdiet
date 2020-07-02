// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,//选中的下标
    bannerArr:[],//轮播图数据
    list:[],//首页的列表信息
  },
  //1.轮播自动播放修改的时候触发
  swiperChange:function(e){
    // console.log(e,'轮播触发');
    //e.detail.current swiper改变的时候 获取当前选中的下标
    this.setData({
      currentIndex: e.detail.current
    })
  },
  //2.页面列表跳转------------------
  indexDetail:function(e){
    //1.获取当前的点击的元素的值 点击的谁-标识id 
    console.log(e.currentTarget.dataset.id);
    //2.api跳转页面
    wx.navigateTo({
      url: '../indexDetail/indexDetail?itemId=' + e.currentTarget.dataset.id,
    })

  },
  onLoad: function (options) {
    
    //1.进入页面--请求轮播数据---获取小程序api-网络---------------------
    wx.request({
      url: 'http://iwenwiki.com:3002/api/banner',
      success:res=>{
        if (res.data.status == 200) {
          console.log(res.data.data);
          this.setData({
            bannerArr: res.data.data
          })
        }
      }
    })
    //2.进入页面获取下面的推荐信息----列表信息---------------------------
    wx.showLoading({
      title: '数据拼命加载中',
    })
    wx.request({
      url: 'http://iwenwiki.com:3002/api/indexlist',
      success:res=>{
        wx.hideLoading();
        wx.showToast({
          title: '数据加载完毕',
        })
        if(res.data.status==200){
          console.log(res.data);
          this.setData({
            list: res.data.data
          })
        }
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