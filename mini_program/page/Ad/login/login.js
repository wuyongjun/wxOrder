// page/Ad/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // identifyCode_btn: true,
    button_reqIdentifyCode:'获取验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.login({
      success: function (data) {
        wx.request({
          url: app.globalData.domainName + '/api/sites/user/openid?js_code=' + data.code,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            that.setData({
              id: res.data.data.user.id,
              openid: res.data.data.user.openid,
              session_key: res.data.data.session_key
            })
            console.log(that.data.session_key)
            _getUserInfo()
          },
          fail: function () {
            console.log("获取用户登录态失败！")
          }
        })
      }
    });
    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            userInfo: res.userInfo
          })
          // 弹出登录modal
          that.setData({
            phone: options.phone
          })
          if (that.data.phone) {
            wx.request({
              url: app.globalData.domainName + '/api/users/sendauthcode/' + that.data.phone,
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
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
          }
        }
      })
    }
  },
  bindcode:function(e){
    this.setData({
      code: e.detail.value
    })
  },
  bindphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
login:function(){
  if (!this.data.code){
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
  wx.request({
    url: app.globalData.domainName + '/api/mini/binding/phone',
    data: { phone: this.data.phone, openid: this.data.openid, code: this.data.code, user_id:this.data.id},
    method:"POST",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {

      if(res.data.status==="success"){
        wx.showToast({
          title: "成功",
          icon: 'success',
          duration: 2000
        })
        wx.navigateTo({
          url: '../verify/verify'
        })
      }else{
        if (res.data.message ==="Wrong code!"){
          wx.showToast({
            title: "验证码错误",
            icon: 'none',
            duration: 2000
          })
        }
      }
    }
    })

},
reqIdentifyCode:function(){
    var that=this
  console.log("----")
  that.setData({
    button_reqIdentifyCode: "获取中"
  });
    wx.request({
      url: app.globalData.domainName + '/api/users/sendauthcode/'+this.data.phone,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
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
},
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