// index/system/systemdetail/systemdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     categoryList:[],
    tabs: [],
    activeTab: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.categoryName,
    })
    var transCategoryList =JSON.parse(decodeURIComponent(options.categoryList))
    this.data.categoryList = transCategoryList

    const tabs = transCategoryList.map(item => ({
        title:item.name,
          id:item.id
    }))

    // const titles = ['首页', '外卖', '商超生鲜', '购物', '美食饮品', '生活服务', '休闲娱乐', '出行']
    // const tabs = titles.map(item => ({ title: item }))
    this.setData({ tabs })
    console.log("onLoad" + this.data.categoryList[index].name)

  },
  onTabCLick(e) {
    const index = e.detail.index
    this.setData({ activeTab: index })
    console.log("ontabclick"+this.data.categoryList[index].name)
  },
  onChange(e) {
    const index = e.detail.index
    this.setData({ activeTab: index })
    console.log("onchange"+this.data.categoryList[index].name)
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