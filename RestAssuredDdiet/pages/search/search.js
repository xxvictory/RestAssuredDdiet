// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//数据列表
    city:'',
  },
  //1.搜索的输入框的内容-----
  searchInput:function(e){
    // console.log(e.detail);
    //输入内容 直接查询接口数据---备注:查询名字  城市没有限制
    var inpValue = e.detail.value;

    if (inpValue){
      wx.request({
        url: 'http://iwenwiki.com:3002/api/foods/select',
        data:{
          name: inpValue,
          city:this.data.city
        },
        success:res=>{
          if(res.data.status==200){
            this.setData({
              list: res.data.data
            })
          }else{
            console.log(res.data)
          }
        }
      })

    }else{
      //没有输入值--数据清空
      this.setData({
        list:[]
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

  },
  //点击进入详情
  productDetail: function (e) {
    wx.navigateTo({
      url: '../productDetail/productDetail?itemId=' + e.currentTarget.dataset.id,
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
    //获取城市---获取本地的城市 如果有直接是本地的 如果没有获取默认的
    var cityName = wx.getStorageSync('cityName') || '上海';
    console.log('当前的城市', cityName);
    this.setData({
      city: cityName
    })
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