// page/Ad/verify/verify.js
const app = getApp()
function getAlltype(that) {
  var that = that

  var gender = [{ name: "男", id: 1 }, { name: "女", id: 2 }]
  var entrance = [{ name: "2007", id: 1 }, { name: "2008", id: 2 }, { name: "2009", id: 3 }, { name: "2010", id: 4 }, { name: "2011", id: 5 }, { name: "2012", id: 6 }, { name: "2013", id: 7 }, { name: "2014", id: 8 }, { name: "2015", id: 9 }, { name: "2017", id: 10 }]
  var department = [{ name: "工程学院", id: 1 }, { name: "工商学院", id: 2 }, { name: "哈哈社", id: 3 }]
  var education = [{ name: "大学专科", id: 1 }, { name: "大学本科", id: 2 }, { name: "硕士研究生", id: 3 }, { name: "博士研究生", id: 4 }]
  that.setData({
    gender: gender,
    entrance: entrance,
    department: department,
    education: education
  })

}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    closed: false,
    array: ['美国', '中国', '巴西', '日本'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.applyJson) {
      that.setData({
        applyJson: options.applyJson
      })
    }

    getAlltype(that)
    //  请求下拉表相关数据

  },
  bindName: function (e) {
    console.log(e)
    this.setData({
      name: e.detail.value
    })
  },
  bindStudent_id: function (e) {
    console.log(e)
    this.setData({
      student_id: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    if (this.data.closed === true) {
      this.setData({
        closed: false
      })
    } else {
      this.setData({
        closed: true
      })
    }
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  tap: function () {
    if (this.data.closed === true) {
      this.setData({
        closed: false
      })
    } else {
      this.setData({
        closed: true
      })
    }
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindPickerChange4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  },
  verify: function () {
    var data = {}
    data.name = this.data.name;
    data.student_id = this.data.student_id;
    if (this.data.index3) {
      data.education = this.data.education[this.data.index3].name;
    }
    if (this.data.index1) {
      data.year = this.data.year[this.data.index1].name;
    }
    if (this.data.index2) {
      data.subject_id = this.data.subject_id[this.data.index2].id;
    }

    if (this.data.index) {
      data.gender = this.data.gender[this.data.index].id;
    }
    data.openid = this.data.openid;
    data.user_id = this.data.id
    if (!data.name) {
      wx.showModal({
        title: '姓名是必不可少哦！',
        confirmText: "知道了",
        showCancel: false,
        confirmColor: "#F58023"
      })
      return false
    }
    if (!data.student_id) {
      wx.showModal({
        title: '学号是必不可少哦！',
        confirmText: "知道了",
        showCancel: false,
        confirmColor: "#F58023"
      })
      return false
    }
    var that = this
    // wx.request({
    //   url: app.globalData.domainName + '/api/mini/verification/student',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   method:"POST",
    //   data:data,
    //   success: function (res) {
    //     if(res.status=="success"){

    //     }
    if (that.data.applyJson) {
      wx.navigateTo({
        url: '../submit/submit?applyJson=' + that.data.applyJson
      })
    } else {
      wx.navigateTo({
        url: '../Adlist/Adlist'
      })
    }

    //   }

    // })
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