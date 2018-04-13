var app = getApp()
var util = require('../../../util/util.js');
var WxParse = require('../../../wxParse/wxParse.js');
var coordtransform = require('../../../coordtransform/index.js');
var QQMapWX = require('../../../libs/qqmap-wx-jssdk1.0/qqmap-wx-jssdk.min.js');
var wxMarkerData = [];
function getSiteDetail(optionsId, that) {
 that.setData({
        showloading: true,
      })
  var res = { data: { data: { site_obj: { poster: "../../../image/poster.png", describe: "000", title: "999", location_y: "39.1932364713366", location_x: "116.10409334842264"}}}}
      wx.setNavigationBarTitle({
        title: res.data.data.site_obj.title
      })
      res.data.data.site_obj.siteArray = [
        { start: "9:00", end: "21:00", name: "羽毛球场01场", image:res.data.data.site_obj.poster,id:1 },
        { start: "9:00", end: "22:00", name: "羽毛球场02场", image: res.data.data.site_obj.poster, id: 2}]
      res.data.data.site_obj.addr ="北京市海淀区中关村南大街1314号"
      // 解析html代码
      WxParse.wxParse('describe', 'html', res.data.data.site_obj.describe, that, 5)
      var latitude = res.data.data.site_obj.location_y;
      var longitude = res.data.data.site_obj.location_x;
      // 百度加密坐标转火星坐标
      var bd09togcj02 = coordtransform.bd09togcj02(res.data.data.site_obj.location_x, res.data.data.site_obj.location_y);
      console.log(bd09togcj02)
      latitude = bd09togcj02[1]
      longitude = bd09togcj02[0]
      that.data.markers[0].latitude = latitude;
      that.data.markers[0].longitude = longitude
      that.setData({
        latitude: latitude,
        longitude: longitude,
        markers: that.data.markers
      })
      that.setData({
        siteinfo: res.data.data
      })
};
Page({
  data: {
    phone: 180,
    markers: [],
    placeData: {},
    markers: [{
      id: 0,
      width: 20,
      height: 20,
    }],
    Ad_list: ["../../../../image/poster.png", "../../../../image/poster.png"],
    showloading: false
  },
  openloction: function () {
    var that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = that.data.latitude
        var longitude = that.data.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },
  onLoad: function (options) {
    // 获取用户信息
    wx.login({
      success: function (res) {
        _getUserInfo()
      }
    })
    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          console.log("---------")
          that.setData({
            userInfo: res.userInfo
          })
          that.setData({
            optionId: options.id
          })
          getSiteDetail(options.id, that)
          console.log(that.data.userInfo);
        }
      })
    }
    var that = this

  },
  reserve: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../seats/index?siteId=' + e.currentTarget.dataset.id
    })
  }
})
