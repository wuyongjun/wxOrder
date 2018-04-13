var coordtransform = require('../../../coordtransform/index.js');
var app = getApp()
function getsiteList(that, x, y,distance) {
  console.log('begin------')
  console.log(x+'--'+y)
      console.log("---------------------")
      var Ad_list = [{ poster:"../../../image/poster.png",title:"人民大學体育场"}]
      that.setData({
        showloading:true,
        Ad_list: Ad_list
      })
      console.log(that.data.Ad_list);
}
Page({
data:{
  array:[5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,'所有'],
  modalHidden1: true,
  modalHidden:true,
  distance:10,
  index:1,
  binded:true,
  showloading:false
},
bindPickerChange: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    index: e.detail.value
  })
  if (this.data.array[this.data.index]=="所有"){
    this.data.array[this.data.index]=100000
  }
  console.log(this.data.array[this.data.index]);
  getsiteList(this, this.data.x, this.data.y, this.data.array[this.data.index])
 
},
Confirm:function(){
    this.setData({
      modalHidden: true
    })
  },
Confirm1: function () {
    this.setData({
      modalHidden1: true
    })
},
onPullDownRefresh: function () {
  //下拉  
  console.log("下拉");
  // var that = this;
  getsiteList(this, this.data.x, this.data.y, this.data.distance)
  // this.onLoad();
  // 刷新
}, 
getPhoneNumber: function (e) {
  console.log(e.detail.errMsg)
  console.log(e.detail.iv)
  console.log(e.detail.encryptedData)
  var encrydata = e.detail.encryptedData;
  var json={}
  json.openid = this.data.openid;
  json.session_key = this.data.session_key;
  json.iv = e.detail.iv;
  json.encryptedData = encrydata;
  json.user_id = parseFloat(this.data.id);
  wx.request({
    url: app.globalData.domainName + '/api/sites/user/phone',
    header: {
      'content-type': 'application/json'
    },
    data:json,
    method:'POST',
    success: function (res) {
      // var phone="18004050529"
      console.log(res.data)
      if(res.data.data){
         wx.navigateTo({
           url: '../login/login?phone=' + res.data.data
        })
      }else{
        wx.navigateTo({
          url: '../login/login'
        }) 
      }
    }
    })
} ,
  onShow: function () {
   if(this.data.tel!==" "){
     this.setData({
       binded: false
     })
   }
  },
onLoad:function(options){
  var that=this
  wx.login({
  success:function(data){
        _getUserInfo()

  }
  });
  function _getUserInfo() {
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
              wx.getLocation({
                 type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                  success:function(res){
                   console.log(res)
                   var x = res.longitude;
                   var y = res.latitude; 
                   console.log(x+"+"+y)
                   var gcj02tobd09 = coordtransform.gcj02tobd09(x, y);
                   console.log(gcj02tobd09)
                   that.setData({
                     x: gcj02tobd09[0],
                     y: gcj02tobd09[1]
                   })
                   getsiteList(that, that.data.x, that.data.y,10)
                  } 
                  })
      }
    })
  }
  var that = this;
},
search:function(e){
  // 搜索
  var distance = this.data.distance;
  getsiteList(this, this.data.x,this.data.y,distance)
},
intoDetail:function(e){
  // 跳转进入详情页
  var id = e.currentTarget.dataset.id;
  console.log(id)
  wx.navigateTo({
    url: '../AdDetail/AdDetail?id='+id
  })
},
getvalue:function(e){
  // 获取picker里value；
    console.log(e.detail.value)
    this.setData({
      distance: e.detail.value
    })
  },
})
