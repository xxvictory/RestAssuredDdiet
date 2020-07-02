// pages/myCart/myCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // selected: false, //列表的选项
    startX:0,
    startY:0,//开始的坐标
    selectAllStatus:false,//全选
    selectButton:false,//结算
    totalPrice:'0.00',//总价格
    num:0,//选中的选择框
    list: [],//购物车数据
  },
  //1.开始触发的事件----获取当前的位置坐标点-------
  //说明:移动list容器view出现删除或者是隐藏删除按钮  获取第一次触发的坐标点和移动后的坐标点
  //比较大小 判断左滑动 还是右侧滑动
  touchstart:function(e){
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    })
  },
  //2.手指按下后 移动move事件------------------、
  touchmove:function(e){
    // console.log('移动move的坐标',e);
    //获取滑动的坐标点
    var list = this.data.list,//操作的元素list容器【】
    index=e.currentTarget.dataset.index,//当前的元素index
    startX=this.data.startX,
    startY=this.data.startY,//开始的坐标
    
    moveX = e.changedTouches[0].clientX,//滑动的坐标
    moveY = e.changedTouches[0].clientY;//滑动的坐标

    //判断moveX startX值的大小 左滑 右滑
    // for(var i=0;i<list.length;i++){//滑动之前把之前的删除都隐藏了 只显示当前的滑块的删除
    //   list[i].isTouchMove=false;
    // }  
    if(moveX < startX){//左滑
      list[index].isTouchMove=true;
    }else{
      list[index].isTouchMove=false;
    }
    //更新数据list---
    this.setData({
      list:list
    })

  },
  //3.获取购物车数据---------------
  getShop:function(){
    wx.request({
      url: 'http://iwenwiki.com:3002/api/cart/list',
      success:res=>{
        console.log(res.data);
        if(res.data.status==200){    
          var list = res.data.data.result;
          var num=0;
        //  this.setData({
        //    list:
        //  })
         //获取数据-------
         //判断全选按钮的状态 如果选中的状态 ok？ 所有的list选中
          var selectAllStatus=this.data.selectAllStatus;
          if (selectAllStatus){
             for(var i=0;i<list.length;i++){
               list[i].selected=true
             } 
             //选中num 
            num=list.length;

          }
          //渲染list
          this.setData({
            list:list,
            num:num
          })
          //价格
          this.goTotalPrice();
        }
      }
    })
  },
  //4.删除购物车--------------------
  remove:function(e){
    var id=e.currentTarget.dataset.id;
    wx.request({
      url: 'http://iwenwiki.com:3002/api/cart/delete',
      data:{
        id:id
      },
      success:res=>{
        console.log(res.data);
        if(res.data.status==200){
          wx.showToast({
            title: '删除成功',
            icon:'none'
          })
          //删除后--购物车数据刷新 
          this.getShop();//网络请求---异步---重新购物车数据，渲染list那么list里面选中属性selected不存在
          //删除里面 全选的时候做删除？---1.删除后 全部都不选中   2.删除后 全部都选中 
          //全选的时候？删除元素--- 所有的元素继续是全选状态

        }
      }
    })
  },
  //5.-总价格----每一个选中后计算 总价格=当前的list.price*list.num--------
  goTotalPrice:function(){
    //1.获取所有的元素list  2.查看遍历所有的数据 选中的元素  3.计算 
    var list=this.data.list;
    var total=0;//总价格
    for(var i=0;i<list.length;i++){
      if (list[i].selected){
          total+=list[i].price*list[i].num
      }
    }
    //更改价格
    this.setData({
      totalPrice: total.toFixed(2)
    })

  },
  //6.点击选择元素-------
  //1.点击选中 再点击取消  就是修改当前的元素的selected状态 2.当前的当前的元素下标 
  selectedList:function(e){
    var index=e.currentTarget.dataset.index;
    var list=this.data.list;
    var num=this.data.num;//选中的数量
    //获取原来的selected状态 
    var selected=list[index].selected;
    //获取后 取反 取反后赋值给当前的元素
    list[index].selected=!selected;
    
    //3.选中框 点击选中 num++   
    if (list[index].selected){  num++; }else{ num--;}
    //4.更新list数据---选中状态和选中的个数--
    this.setData({
      list: list,
      num:num
    })
    console.log('选中的个数',num);
    //5.结算变高亮---至少有一个选中
    if(num>0){
      this.setData({
        selectButton:true
      })
    }else{
      this.setData({
        selectButton: false
      })
    }
    //6.全选-------
    if (num == list.length) {//selectAllStatus
      this.setData({  selectAllStatus: true })
    }else{
      this.setData({   selectAllStatus: false })
    }
    //7.计算价格
    this.goTotalPrice();
  },

  //7.全选------
  //selectAllStatus 点击全选按钮时候---控制selectAllStatus变量状态 所有的数据list一样的状态
  selectedAll:function(){
    //1.获取之前的全选的状态
    var selectAllStatus = !this.data.selectAllStatus;//点击对之前的全选取反
    var list=this.data.list;
    var num=this.data.num;
    var selectButton = this.data.selectButton;

    //2.控制所有的list选中框
    for(var i=0;i<list.length;i++){
      list[i].selected = selectAllStatus;
    }
    //3.如果选中--处理num 结算高亮
    if (selectAllStatus){
      num=list.length;
      selectButton=true
    }else{
      num=0;
      selectButton=false
    }
    //4.更新数据
    this.setData({
      list: list, 
      selectAllStatus: selectAllStatus,
      num:num,
      selectButton: selectButton
    })

  //价格
    this.goTotalPrice();
  },
  //8.增加购物车数据----
  addShop:function(e){
    //1.点击按钮 增加数据  获取当前的元素index  获取当前num++
    var list = this.data.list;
    var index=e.currentTarget.dataset.index;
    var num=e.currentTarget.dataset.num;

    num++;
    //增加后--页面数据更改--添加当前的元素  
    list[index].num=num;

    //数据更新
    this.setData({
      list:list
    })
    //--网络请求---修改数据库数据
    wx.request({
      url: 'http://iwenwiki.com:3002/api/cart/update',
      data:{
        id: e.currentTarget.dataset.id,
        num:num
      },
      success:res=>{
        console.log('增加数据库数量:',res.data);
      }
    })
    //更改价格
    this.goTotalPrice();

  },

  //9.减功能---
  reduce:function(e){
    var list = this.data.list;
    var index = e.currentTarget.dataset.index;
    var num = e.currentTarget.dataset.num;

    num--;
    if(num<1){
      wx.showToast({
        title: '数量最少为1',
        icon:'none'
      })
      return;
    }
    //增加后--页面数据更改--添加当前的元素  
    list[index].num = num;
    //数据更新
    this.setData({
      list: list
    })
    
    wx.request({
      url: 'http://iwenwiki.com:3002/api/cart/update',
      data: {
        id: e.currentTarget.dataset.id,
        num: num
      },
      success: res => {
        console.log('减少数据库数量:', res.data);
      }
    })
    //更改价格
    this.goTotalPrice();
  },
  //10:支付
  balance:function(e){
    //用户信息   传递总计价 总的其他信息
    wx.redirectTo({
      url: '../complete/complete',
    })
  },

  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {

    //调用购物车函数--数据获取
    // this.getShop();
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
    this.getShop();
    //全选------
    this.setData({
      selectAllStatus: false,//全选
      selectButton: false,//结算
      totalPrice: '0.00',//总价格
      num: 0,//选中的选择框
    })
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