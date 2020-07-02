// pages/food/food.js
//引入模块 
var productData=require('../../utils/productData.js');
var http=require('../../utils/http.js');
var app=getApp();
Page({

  data: {
    location:'上海',
    productType: productData,
    list:[],//列表数据
    num:1,//请求的页面的数据的page页码
    isShow:false,//控制按钮--点击加载更多
    moreInfo:'',//加载更多的提示信息
  },

  onLoad: function (options) {
    console.log('监听页面加载',options)
    // if(options.cityName){
    //   this.setData({
    //     location:options.cityName,
    //     num:1
    //   })
    // }
    //进入页面获取本地存储 查看是否有之前选择的城市区域----
    //如果有本地存储 重新设置 location  没有数据 使用默认上海
    var cityName=wx.getStorageSync('cityName');
    if(cityName){
      this.setData({
        location:cityName
      })
    }
    //1.网络请求
    //method  url  params message success fail
    http('get', '/api/foods/list', {
        city:this.data.location,
        page:this.data.num
      },'数据加载中',(res)=>{//成功函数
        console.log(res.data.result);
        this.setData({
          list: res.data.result
        })
      },function(error){
        console.log(error);
      })

    //1.进入页面获取当前的食疗坊的列表数据
  /*  wx.request({
      url: 'http://iwenwiki.com:3002/api/foods/list',
      data:{
        city:this.data.location,
        page:this.data.num
      },
      success:res=>{
        if(res.data.status==200){
          console.log(res.data.data.result);
          this.setData({
            list: res.data.data.result,
            isShow:true
          })
        }
      }
    })
    */
  },
  //3.点击产品分类---进入对应的产品分类的列表信息展示=======
  productType:function(e){
    wx.navigateTo({
      url: '../productType/productType?itemId='+e.currentTarget.dataset.mark,
    })
  },
  //4.点击列表信息---进入列表的产品详情页
  productDetail:function(e){
    // console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../productDetail/productDetail?itemId=' + e.currentTarget.dataset.id,
    })
  },

  //2.下拉底部--点击按钮触发请求数据==============
  getMore:function(){
    //2.1 点击按钮 请求下一页的数据 num++  2.2请求完毕数据后-老数据+新数据 
    this.data.num++;
    console.log('请求数据页面：',this.data.num);
    wx.request({
      url: 'http://iwenwiki.com:3002/api/foods/list',
      data: {
        city: this.data.location,
        page: this.data.num
      },
      success: res => {
        console.log(res.data); 
        if (res.data.status == 200) {
            this.setData({
              list: this.data.list.concat(res.data.data.result)
            })
        }else{//否则 说明当前的接口没有数据 
          //页面的按钮 隐藏掉    文字提示
          console.log('没有更多数据');
          this.setData({
            isShow:false,//按钮隐藏
            moreInfo:'我是有底线的'
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
    console.log('页面显示');
    console.log(app);
    //重新修改data 
   if(app.globalData.cityName){//全局有值
     this.setData({
       location: app.globalData.cityName,
       num: 1
     })
     //获取全局的变量的切换城市数据
     //再次请求对应的城市的页面数据
     wx.request({
       url: 'http://iwenwiki.com:3002/api/foods/list',
       data: {
         city: app.globalData.cityName,
         page: 1
       },
       success: res => {
         if (res.data.status == 200) {
           console.log(res.data.data.result);
           this.setData({
             list: res.data.data.result,
             isShow: true
           })
         }
       }
     })

   }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('页面隐藏')
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
    console.log('下拉刷新信息---需要配置json文件---开启下拉');
    //1.请求最新的第一页的数据page=1   2.把当前的新数据 替换掉list数据  3.把num=1

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('下拉到底部--加载更多数据');
    //1.下拉加载下一页数据 num++  2.老数据+新数据
    this.data.num++;
    http('get', '/api/foods/list', {
      city: this.data.location,
      page: this.data.num
    }, '数据加载中', (res) => {//成功函数
      console.log(res.data.result);
      this.setData({
        list:this.data.list.concat(res.data.result)
      })
    }, (error)=>{
      console.log(error);
        this.setData({
            moreInfo: '没有更多数据了'
          })
    })
    //==================================
    // wx.request({
    //   url: 'http://iwenwiki.com:3002/api/foods/list',
    //   data: {
    //     city: this.data.location,
    //     page: this.data.num
    //   },
    //   success:res=>{
    //     console.log(res.data);
    //     if(res.data.status==200){
    //         this.setData({
    //           list:this.data.list.concat(res.data.data.result)
    //         })
    //     }else{
    //       this.setData({
    //         moreInfo: '没有更多数据了'
    //       })
    //     }
    //   }
    // })  

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})