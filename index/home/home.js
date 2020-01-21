// index/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: getApp().globalData.baseUrl,
    bannerDataList: [],//轮播图bean
     articalListBeans:[],//首页文章列表bean
     articalPage:0 //文章分页标识
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestbannerDataListData();//请求轮播图
    var that = this;
    this.getMore(that.data.articalPage);
  },
  //请求轮播图
  requestbannerDataListData() {
    var that = this;//注意this指向性问题
    var urlStr = that.data.host + "/banner/json"; //请求连接注意替换（我用本地服务器模拟）
    console.log("请求轮播图：" + urlStr);
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
          bannerDataList: resultArr
        })
      }
    })
  },

  //点击了轮播图
  chomeCarouselClick: function (event) {
    var urlStr = event.currentTarget.dataset.url;
    console.log("点击了轮播图：" + urlStr);
    // wx.navigateTo({
    //   url: 'test?id=1'
    // })
  },

  getMore: function (page) {
    var that = this;
    var urlStr = that.data.host + "/article/list/" + page + "/json"
    if (page == 0) {
      wx.showLoading({
        title: '加载中',
      })
    }

    console.log("请求文章" + urlStr);

    wx.request({
      url: urlStr,
      method: 'GET',
      data: {
        pageNo: page
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.data.over) {
          wx.showToast({
            title: '没有更多了',
          })
        }else if (page == 0) {
          that.setData({
            articalListBeans: res.data.data.datas,
            page: page + 1
          })
        } else {

          var beforeAddArticalList = that.data.articalListBeans;
          that.setData({
            articalListBeans: beforeAddArticalList.concat(res.data.data.datas),
            page: page + 1
          })
        }
      }, fail: function () {
        wx.showToast({
          title: '服务器异常',
          duration: 1500
        })
      },
      complete: function () {
       
          wx.hideLoading()
        
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
    this.data.articalPage = 0
    this.data.articalListBeans = [];
    this.getMore(this.data.articalPage);
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(1);
    wx.showLoading({
      title: '加载更多',
    })
   
    var that = this;
    this.getMore(that.data.page);

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})