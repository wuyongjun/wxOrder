// page/Ad/submit/submit.js
const app = getApp()
function getorganization(that) {

      var organization = [{ name: "音乐社", id: 1 }, { name: "魔术社", id: 2 }, { name: "哈哈社", id: 3 }]
      that.setData({
        organization: organization
      })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false,
    tempFilePaths:[],
    orderInfo: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.applyJson)
    console.log(JSON.parse(options.applyJson))
    var orderinfo=[]
    var applyobj={}
    applyobj.name="第一体育馆篮球场-01场"
    applyobj.datetime = []
    var tem={}
    for (var h = 0; h < JSON.parse(options.applyJson).length;h++){
      if (!tem[JSON.parse(options.applyJson)[h].id.split(" ")[0]]){
        var obj1 = {}
        obj1.date = JSON.parse(options.applyJson)[h].id.split(" ")[0]
        obj1.week = JSON.parse(options.applyJson)[h].label.split(" ")[1]
        tem[JSON.parse(options.applyJson)[h].id.split(" ")[0]] = true
        applyobj.datetime.push(obj1)
        obj1.time=[]
      }
      
      console.log(tem)
      obj1.time.push(JSON.parse(options.applyJson)[h].label.split(" ")[2])
    }
    orderinfo.push(applyobj)
    this.setData({
      orderInfo: orderinfo
    })
    // 获取社团
    getorganization(this)
  },
  bindPickerChange: function (e) {
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
  del: function (e) {
    console.log(e)
    for (var i = 0; i < this.data.tempFilePaths.length;i++){
      console.log(e.target.dataset.path)
      console.log(this.data.tempFilePaths[i])
      if (e.target.dataset.path == this.data.tempFilePaths[i]){
        this.data.tempFilePaths.splice(i,1)
        this.setData({
          tempFilePaths: this.data.tempFilePaths
        })
      }
    }
  
  },
  bindinput:function(e){
    console.log(e)
         this.setData({
           use:e.detail.value
         })
  },
  radioChange:function(e){
    console.log(e.currentTarget.dataset)
    if (e.currentTarget.dataset.checked===true){
      this.setData({
        checked:false
      })
    }else{
      this.setData({
        checked: true
      })
    }
  },
  upload: function () {
    var that=this
    wx.chooseImage({
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        for (var i = 0; i < res.tempFilePaths.length;i++){
          that.data.tempFilePaths.push(res.tempFilePaths[i])
        }
        that.setData({
          tempFilePaths: that.data.tempFilePaths
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
  ,
  submit:function(e){
    if (!this.data.use){
      wx.showToast({
        title: '请填写使用用途',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!this.data.organization[this.data.index]) {
      wx.showToast({
        title: '请选择社团名称',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    console.log(this.data.use)
    console.log(this.data.orderInfo)
    console.log(this.data.checked)
    console.log(this.data.tempFilePaths)
    console.log(this.data.organization[this.data.index].id)
          wx.showToast({
          title: '成功!!!',
          icon: 'success',
          duration: 2000
        })
    wx.navigateTo({
      url: '../My_coll/My_coll'
    })
    var data={}
    // wx.request({
    //   url: app.globalData.domainName + ' ' + that.data.openid,
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) { 
    //     wx.showToast({
    //       title: '成功',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //      }
    //   }
    //   )
  }
})