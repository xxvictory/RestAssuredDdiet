// pages/selectCity/selectCity.js
var http = require('../../utils/http.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotCity: [], //热门城市
    longitude: "113.324520",
    latitude: "23.099994"
  },
  onLoad: function(options) {
    //第一步：获取热门城市
    http('get', '/api/hot/city', {}, '', res => {
      console.log(res);
      this.setData({
        hotCity: res.data
      })
    })
  },
  //第二步:点击定位---1.获取当前的经纬度  2.显示所在的城市  3.返回食疗坊 带着当前城市
  getLocation: function() {
    //1.小程序的api获取当前的位置
    wx.getLocation({
      success: (res) => {
        console.log(res);
        var latitude = res.latitude;
        var longitude = res.longitude;
        //2.显示经纬度位置  城市 
        wx.request({
          url: 'http://iwenwiki.com:3002/api/lbs/location',
          data: {
            latitude: latitude,
            longitude: longitude
          },
          success: result => {
            console.log(result.data.result.ad_info.city);
            var cityName = result.data.result.ad_info.city.slice(0, 2); //2位
            // wx.navigateBack({ })//返回 但是不能传递数据 
            // wx.switchTab() 可以跳转页面tabBar 但是api后面url不能传递参数
            //方法1：存储全局变量 --wx.switchTab()跳转-----------------------
            app.globalData.cityName = cityName;
            //数据存储到本地---存储本地--下次进入可以直接获取本地数据 html5
            wx.setStorageSync('cityName', cityName)
            console.log(app);
            wx.switchTab({
              url: '../food/food',
            })

            //方法2：wx.reLaunch()跳转
            // wx.reLaunch({
            //   url: '../food/food?cityName=' + cityName,
            // })
          
          }
        })

      },
    })
  },
  //第三步：点击人城市按钮--切换当前的城市 1.点击按钮获取当前的点击城市 2.把获取的值存储本地 全局 3.跳转页面
  selectCity:function(e){
    var cityName=e.currentTarget.dataset.name;
    app.globalData.cityName=cityName;
    wx.setStorageSync('cityName', cityName);
    wx.switchTab({
      url: '../food/food',
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