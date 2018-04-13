var app = getApp()
function getsiteSuccessList(that) {
      var info = [
        { name: "第一体育馆篮球场-01场", datetime: [{ date: "2018-5-4", week: "周一", time: ["9:00-10:00", "11:00-12:00"] }, { date: "2018-5-7", week: "周三", time: ["9:00-10:00", "11:00-12:00"] }] ,id:1},
        { name: "第一体育馆篮球场-02场", datetime: [{ date: "2018-5-10", week: "周一", time: ["9:00-10:00", "11:00-12:00"] }, { date: "2018-5-2", week: "周三", time: ["9:00-10:00", "11:00-12:00"] }], id: 3 }
       ]
      that.setData({
        showloading: true,
      })
      that.setData({
        Ad_list:info
      })
  
}
function getsiteCheckList(that) {
      var info = [
        { name: "第一体育馆篮球场-01场", datetime: [{ date: "2018-5-4", week: "周一", time: ["9:00-10:00", "11:00-12:00"] }, { date: "2018-5-7", week: "周三", time: ["9:00-10:00", "11:00-12:00"] }], id: 1 },
        { name: "第一体育馆篮球场-02场", datetime: [{ date: "2018-5-10", week: "周一", time: ["9:00-10:00", "11:00-12:00"] }, { date: "2018-5-2", week: "周三", time: ["9:00-10:00", "11:00-12:00"] }], id: 3 }
      ]
      that.setData({
        showloading: true,
      })
      that.setData({
        checkList: info
      })
}
function getsiteFailList(that) {
      var info = [
        { name: "第一体育馆篮球场-01场", datetime: [{ date: "2018-5-4", week: "周一", time: ["9:00-10:00", "11:00-12:00"] }, { date: "2018-5-7", week: "周三", time: ["9:00-10:00", "11:00-12:00"] }], id: 1 },
        { name: "第一体育馆篮球场-02场", datetime: [{ date: "2018-5-10", week: "周一", time: ["9:00-10:00", "11:00-12:00"] }, { date: "2018-5-2", week: "周三", time: ["9:00-10:00", "11:00-12:00"] }], id: 3 }
      ]
      that.setData({
        showloading: true,
      })
      that.setData({
        failList: info
      })
}
Page({
  data: {
    orderInfo: [],
    modalHidden:true,
    modalHidden1: true,
    closedSuc:false,
    showloading:false
  },
  Confirm: function () {
    this.setData({
      modalHidden: true
    })
  },
  Confirm1: function () {
    this.setData({
      modalHidden1: true
    })
    wx.navigateTo({
      url: '../Adlist/Adlist'
    })
  },
  // onPullDownRefresh: function () {
  //   //下拉  
  //   console.log("下拉");
  //   var that = this
  //   this.onLoad();
  // }, 
  onLoad: function (e) {
    var that=this
    // 获取用户信息
    wx.login({
      success: function (res) {
      
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.setData({
                user: res.userInfo
              })
            }
            })
         
              getsiteSuccessList(that)
              getsiteCheckList(that)
              getsiteFailList(that)
            },
            fail: function () {
              console.log("fail")
            }
    })
  },
  intoDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../Adlist/AdDetail/AdDetail?id=' + id
    })
  },
  tap:function(e){
    var closed = e.currentTarget.dataset.status;
    if(closed===true){
      this.setData({
        closedSuc:false
      })
    }else{
      this.setData({
        closedSuc: true
      })
    }
  }
  ,
  tap2: function (e) {
    var closed = e.currentTarget.dataset.status;
    if (closed === true) {
      this.setData({
        closedCheck: false
      })
    } else {
      this.setData({
        closedCheck: true
      })
    }
  },
  tap3: function (e) {
    var closed = e.currentTarget.dataset.status;
    if (closed === true) {
      this.setData({
        closedFail: false
      })
    } else {
      this.setData({
        closedFail: true
      })
    }
  },
  amend: function (e) {
    wx.navigateTo({
      url: '../unbundle/unbundle'
    })
  },
  watchAppay: function (e) {
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '../apply/apply?id=' + e.currentTarget.dataset.id
    })
  }
})