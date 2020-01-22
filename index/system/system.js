// index/system/system.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: getApp().globalData.baseUrl,
    systemListBeans: [],//体系列表bean
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getWanAndroidSystemInfos()

  },

  //请求轮播图
  getWanAndroidSystemInfos() {
    var that = this;//注意this指向性问题
    var urlStr = that.data.host + "/tree/json"; //请求连接注意替换（我用本地服务器模拟）
    console.log("请求体系：" + urlStr);
    wx.request({
      url: urlStr,
      data: {//这里放请求参数，如果传入参数值不是String，会被转换成String 
        // x: '',
        // y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("轮播图返回值：");
        console.log(res.data.errorCode);
        var resultArr = res.data.data;
        that.setData({
          systemListBeans: resultArr
        })
      }
    })
  },

  /**
   * 跳转到体系详情
   */
  skipToSystemDetail:function(e){
    var systemName = e.currentTarget.dataset.systemname;
    var systemChildren = e.currentTarget.dataset.children;
    var categoryList = [];
    systemChildren.forEach(element => {
      categoryList.push({
        id:element.id,
        name:element.name
      })
      
    });

    wx.navigateTo({
      url: '/index/system/systemdetail/systemdetail?categoryList='+encodeURIComponent(JSON.stringify(categoryList))+"&categoryName="+systemName,
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