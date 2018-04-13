// import data from './data'
const app = getApp()
// const App = getApp()
var util = require('../../../util/util.js');
function getsitesname(that,id) {
  console.log(id)
  // 获取所有场地
  // wx.request({
  //   url: app.globalData.domainName + '/api/sites/list/app?openid=' + that.data.openid,
  //   header: {
  //     'content-type': 'application/json'
  //   },
  //   success: function (res) {    
      var sites = [{ id: '1', name: '1号场' }, { id: '2', name: '2号场' }, { id: '3', name: '3号场' }, { id: '4', name: '4号场' }]
      for(var i=0;i<sites.length;i++){
        if (id ===sites[i].id){
          sites[i].choose=true
        }else{
          sites[i].choose = false
        }
      }
      console.log(sites)
      that.setData({ sites: sites })
  //   }
  // })
}
function geteachSite(that, id) {
  console.log(id)
  // 获取所有场地
  // wx.request({
  //   url: app.globalData.domainName + '/api/sites/list/app?openid=' + that.data.openid,
  //   header: {
  //     'content-type': 'application/json'
  //   },
  //   success: function (res) {
      var data =  {
      "code": 200,
        "msg": {
        "seatingPlan": {
          "ajaxSeatBeanList":
        {
            name: "羽毛球1号场", id: 1, start: "6:00", end: "21:00", unBookable: [{ date: "2018-04-18", time: "9:00-12:00" }, { date: "2018-04-12", time: "16:00-18:00" }, { date: "2018-04-12", time: "19:00-20:00" }], finish: [{ date: "2018-04-14", time: "9:00-12:00" }, { date: "2018-04-15", time: "16:00-18:00" }, { date: "2018-04-18", time: "19:00-20:00" }], proceed: [{ date: "2018-04-16", time: "9:00-12:00" }, { date: "2018-04-17", time: "16:00-18:00" }, { date: "2018-04-18", time: "19:00-20:00" }], order: [{ date: "2018-04-15", time: "9:00-12:00" }, { date: "2018-04-13", time: "16:00-18:00" }, { date: "2018-04-16", time: "19:00-20:00" }], pastdue: [{ date: "2018-04-18", time: "17:00-18:00" }, { date: "2018-04-12", time: "12:00-13:00" }, { date: "2018-04-15", time: "20:00-21:00" }], want: [{ date: "2018-04-13", time: "8:00-9:00", num: 2, users: [{ name: "aaa" }, { name: "me" }] }, { date: "2018-04-18", time: "6:00-7:00", num: 4, users: [{ name: "aaa" }, { name: "aaa" }, { name: "aaa" }, { name: "aaa" }] }]
             }
        }
      }
    }
      that.setData({data: data })
      // console.log(options)
      var time=[]
      var startsort;
      var endsort;
      startsort = parseFloat(that.data.data.msg.seatingPlan.ajaxSeatBeanList.start.split(":")[0])
      endsort = parseFloat(that.data.data.msg.seatingPlan.ajaxSeatBeanList.end.split(":")[0])
      var i=0
      for (var j = startsort; j <=endsort; j++) {
             i++
        time.push(j + ":00")
        that.data.data.msg.seatingPlan.maxRowIndex = i-2
      }
      console.log(i)
      that.setData({ time: time })
      console.log(that.data.time)
      var ajaxSeatBeannew = [];
      console.log(new Date().toLocaleDateString())
      var allTimearray = [];
      for (var g = 0; g < 7; g++) {
        var weektemp = {
          "0": "周日",
          "1": "周一",
          "2": "周二",
          "3": "周三",
          "4": "周四",
          "5": "周五",
          "6": "周六",
        }
        var dateobj = {};
        console.log(util.getweek(Date.parse(new Date()) + 1000 * 60 * 60 * 24 * g))
        dateobj.date = util.numformatTime(Date.parse(new Date()) + 1000 * 60 * 60 * 24 * g)
        dateobj.week = weektemp[util.getweek(Date.parse(new Date()) + 1000 * 60 * 60 * 24 * g)]
        // dateobj.choose=false
        // console.log(util.numformatTime(parseFloat(options.date)))
        console.log(util.numformatTime(Date.parse(new Date()) + 1000 * 60 * 60 * 24 * g))
        allTimearray.push(dateobj)
      }
      that.setData({allTimearray:allTimearray})
      var alltime=[]
      for (var s = 0; s < that.data.allTimearray.length; s++) {
        for (var a = 0; a < that.data.time.length-1;a++){
          alltime.push(new Date().getFullYear()+"-"+that.data.allTimearray[s].date+" "+that.data.time[a])
        }
      }
      // 所有时间段
      console.log(alltime)
      // 不可用的时间段
      var unBookableArray=[];
      // 锁定
      for (var q = 0; q < that.data.data.msg.seatingPlan.ajaxSeatBeanList.unBookable.length;q++){
        unBookableArray.push(that.data.data.msg.seatingPlan.ajaxSeatBeanList.unBookable[q].date + " " + that.data.data.msg.seatingPlan.ajaxSeatBeanList.unBookable[q].time)
      }
      // 完成
      for (var e = 0; e < that.data.data.msg.seatingPlan.ajaxSeatBeanList.finish.length; e++) {
        unBookableArray.push(that.data.data.msg.seatingPlan.ajaxSeatBeanList.finish[e].date + " " + that.data.data.msg.seatingPlan.ajaxSeatBeanList.finish[e].time)
      }
      // 预约过
      for (var r = 0; r < that.data.data.msg.seatingPlan.ajaxSeatBeanList.order.length; r++) {
        unBookableArray.push(that.data.data.msg.seatingPlan.ajaxSeatBeanList.order[r].date + " " + that.data.data.msg.seatingPlan.ajaxSeatBeanList.order[r].time)
      }
      // 过期了
      for (var t = 0; t < that.data.data.msg.seatingPlan.ajaxSeatBeanList.pastdue.length; t++) {
        unBookableArray.push(that.data.data.msg.seatingPlan.ajaxSeatBeanList.pastdue[t].date + " " + that.data.data.msg.seatingPlan.ajaxSeatBeanList.pastdue[t].time)
      }
      // 进行的
      for (var y = 0; y < that.data.data.msg.seatingPlan.ajaxSeatBeanList.proceed.length; y++) {
        unBookableArray.push(that.data.data.msg.seatingPlan.ajaxSeatBeanList.proceed[y].date + " " + that.data.data.msg.seatingPlan.ajaxSeatBeanList.proceed[y].time)
      }
      console.log(unBookableArray)
      // 拆分不可用时间段每一个整点对应格子
      var eachHourUnable=[]
      for (var v = 0; v < unBookableArray.length; v++) {
        console.log(unBookableArray[v].split(" ")[1].split("-")[0].split(":")[0])
        console.log(unBookableArray[v].split(" ")[1].split("-")[1].split(":")[0])
        var eachstart = parseFloat(unBookableArray[v].split(" ")[1].split("-")[0].split(":")[0])
        var eachend = parseFloat(unBookableArray[v].split(" ")[1].split("-")[1].split(":")[0])
        for (var d = eachstart; d < eachend;d++){
          console.log(d)
          eachHourUnable.push(unBookableArray[v].split(" ")[0]+" "+d+":00")
        }
      }
      console.log(eachHourUnable)
      var wantarry=[];
      // 进行的
      for (var n = 0; n < that.data.data.msg.seatingPlan.ajaxSeatBeanList.want.length; n++) {
        var obj={}
        var eachstart = parseFloat(that.data.data.msg.seatingPlan.ajaxSeatBeanList.want[n].time.split("-")[0].split(":")[0])
        var eachend = parseFloat(that.data.data.msg.seatingPlan.ajaxSeatBeanList.want[n].time.split("-")[1].split(":")[0])
        console.log(eachstart)
        console.log(eachend)
        for (var d = eachstart; d < eachend; d++) {
          var obj={}
          obj.time = that.data.data.msg.seatingPlan.ajaxSeatBeanList.want[n].date + " " + d+":00";
          obj.num = that.data.data.msg.seatingPlan.ajaxSeatBeanList.want[n].num
          obj.users = that.data.data.msg.seatingPlan.ajaxSeatBeanList.want[n].users
          wantarry.push(obj)
        }
      }
      console.log(wantarry)
      // 两个数组去重复，所有可用时间段取出来
      var temp1=[]
      var eachHourable=[]
      for (var f=0;f < eachHourUnable.length;f++){
        temp1[eachHourUnable[f]]=true
      }
      for(var g=0;g<alltime.length;g++){
        if(!temp1[alltime[g]]){
          eachHourable.push(alltime[g])
        }
      }
      console.log(eachHourable)
      // 把横纵坐标取出来
      for(var c=0;c<eachHourable.length;c++){
        var eachHourableObj={}
        // eachHourableObj.disabled = false,
        console.log(eachHourable[c].split(" ")[0])
        for (var u = 0; u < wantarry.length;u++){
          if (wantarry[u].time === eachHourable[c]){
            for (var p = 0; p < wantarry[u].users.length; p++) {
              console.log(wantarry[u].users[p].name)
              if (wantarry[u].users[p].name === "me") {
                eachHourableObj.disabled = true
              } else {
                eachHourableObj.disabled = false
                eachHourableObj.loveFlag = wantarry[u].num
              }
            }
           
          }
         
        }
        console.log(eachHourableObj)
        var weektemp = {
          "0": "周日",
          "1": "周一",
          "2": "周二",
          "3": "周三",
          "4": "周四",
          "5": "周五",
          "6": "周六",
        }
      
          var week = weektemp[util.getweek((new Date(Date.parse(eachHourable[c].split(" ")[0].replace(/-/g, "/")))).getTime())]
        console.log(week)
        eachHourableObj.label = eachHourable[c].split(" ")[0].split("-")[1] + "-" + eachHourable[c].split(" ")[0].split("-")[2] + " " + week +" "+eachHourable[c].split(" ")[1].split(":")[0] + ":00" + "~" + (parseFloat(eachHourable[c].split(" ")[1].split(":")[0])+1)+":00"
        eachHourableObj.id = eachHourable[c]
        eachHourableObj.rowIndex = parseFloat(eachHourable[c].split(" ")[1].split(":")[0]) - startsort+1
        util.numformatTime(Date.parse(new Date()))
        console.log(parseFloat(eachHourable[c].split(" ")[0].split("-")[2]))
        console.log(parseFloat((util.numformatTime(Date.parse(new Date()))).split("-")[1]))
        eachHourableObj.columnIndex = parseFloat(eachHourable[c].split(" ")[0].split("-")[2])-parseFloat((util.numformatTime(Date.parse(new Date()))).split("-")[1])+1
        console.log(eachHourableObj)
        ajaxSeatBeannew.push(eachHourableObj)
      }
      console.log(ajaxSeatBeannew)
      that.data.data.msg.seatingPlan.ajaxSeatBeanList = [];
      that.data.data.msg.seatingPlan.ajaxSeatBeanList = ajaxSeatBeannew
      console.log(that.data.data.msg.seatingPlan.ajaxSeatBeanList)
      that.initSeats()
    // console.log(this.data)
  //   }
  // })
}
Page({
  data: {
    scrollTop:0
    },
  onLoad(options) {
    getsitesname(this, options.siteId)
    geteachSite(this, options.siteId)
  },
  initSeats() {
    const seatingPlan = this.data.data.msg.seatingPlan
    const maps = seatingPlan.ajaxSeatBeanList
    const maxRowIndex = seatingPlan.maxRowIndex
    const maxColumnIndex = 7
    console.log(maps)
    this.$wuxSeats = app.Wux().$wuxSeats.init('movie', {
      maps: maps,
      maxRowIndex: maxRowIndex+1,
      maxColumnIndex: maxColumnIndex,
      max: 8,
      onSelect(items) {
        this.page.setData({
          scrollTop: this.page.data.scrollTop + 100
        })
        console.log(items)
        var num=0
        for (var d = 0; d < items.length;d++){
          num += items[d].money
        }
        console.log(num)
        this.page.setData({
          items,
          total: (num).toFixed(2)
        })
      },
    })
    this.$wuxSeats.disabled([`4520200`])
  },
  intothisDay:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(this.data.data)
    console.log(id)
    for (var i = 0; i < this.data.sites.length;i++){
      if (this.data.sites[i].choose===true){
        this.data.sites[i].choose = false
      }
      if (this.data.sites[i].id===id){
        this.data.sites[i].choose=true
         }else{
        this.data.sites[i].choose =false
         }
    }
    this.setData({ sites: this.data.sites })
    console.log(this.data.sites)

    // 重新请求数据
    this.setData({ data: this.data.data })
  },
  Iwant:function(e){
    console.log(e.currentTarget.dataset.apply)
    console.log(JSON.stringify(e.currentTarget.dataset.apply))
    // if (!e.currentTarget.dataset.apply){
    //   wx.showToast({
    //     title: '请选择后预定',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return false
    // }
    var verify=true
    if (verify){
      wx.navigateTo({
        url: '../verify/verify?applyJson=' + JSON.stringify(e.currentTarget.dataset.apply)
      })
    }else{
      wx.navigateTo({
        url: '../submit/submit?applyJson=' + JSON.stringify(e.currentTarget.dataset.apply)
      })
    }
  }
})