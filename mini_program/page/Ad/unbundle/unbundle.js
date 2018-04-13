
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // identifyCode_btn: true,
    button_reqIdentifyCode: '获取验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
     
  },
  bindcode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  bindphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  login: function () {
    if (!this.data.code) {
      wx.showToast({
        title: '请填写验证码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!this.data.phone) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none',
        duration: 2000
      })
      return false
    }
          wx.showToast({
            title: "成功",
            icon: 'success',
            duration: 2000
          })
          wx.navigateTo({
            url: '../My_coll/My_coll'
          })
     
  },
  reqIdentifyCode: function () {
    var that = this
    console.log("----")
    that.setData({
      button_reqIdentifyCode: "获取中"
    });
  var res={data:{data:"99999"}}
        that.setData({
          code: res.data.data
        });
        var countdown = 60;
        if (countdown > 0) {
          var interval = setInterval(function () {
            that.setData({
              button_reqIdentifyCode: '再次发送' + countdown + 's'
            });
            countdown--;
            if (countdown <= 0) {
              countdown = -1
              that.setData({
                button_reqIdentifyCode: '获取验证码'
              });
              clearInterval(interval)
            }
          }, 1000)
        } else {
          that.setData({
            button_reqIdentifyCode: '获取验证码'
          });
        }
    
  }
})