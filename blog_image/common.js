// 本机ip
// const app_url = 'http://127.0.0.1/'
//const app_url = 'http://192.168.30.244/'
// const app_url = 'http://222.173.32.145:18080/'
const app_url = 'http://10.2.24.4:18085/'
document.write('<script src="js/xss.js"></script>')
// 公共请求方法
let WareType = localStorage.getItem("WareType")

function requests(parms) {
  let authenticate = JSON.parse(localStorage.getItem('authenticate'))
  if (!authenticate && parms.requestType == null) {
    let msg = "'登录过期或未登录', '提示'"
    popupwindow(msg)
    localStorage.setItem('authenticate', null)
    if (WareType == "1") {
      setTimeout(() => {
        uap.window.close("material")
      }, 2000);
    } else if (WareType == "0") {
      setTimeout(() => {
        uap.window.close("prefession")
      }, 2000);
    }
  }
  let Authorization = parms.requestType ? '' : `Bearer ${authenticate.access_token}`
  let requestParameters = {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': "application/json;charset=utf-8",
      Authorization: Authorization
    },
    contentType: 'application/json',
    type: parms.type,
    data: JSON.stringify(parms.data),
    async: parms.async || true,
    success: res => {
      // 请求成功 | 登陆成功
      if (typeof(res) == "object") {
        if (res.code == 200 || res.access_token) {

          parms.callback(res)
        } else if (parms.requestType) {
          console.log(parms.requestType);
          let msg = "用户名密码或验证码错误"
          popupwindow(msg)
        } else if (res.code == 500) {
          // console.log("success-----500");
          // console.log(res);
          parms.callback(res)
        }  else if (res.code == 10000){
          parms.callback(res)
        }else {
          let msg = `请求错误${res.msg}`
          popupwindow(msg)
        }
      } else {
        parms.callback(res)
      }
      if (res.code == 500 && res.msg == "登录用户无角色权限") {
        if (WareType == "1") {
          setTimeout(() => {
            uap.window.close("material")
          }, 2000);
        } else if (WareType == "0") {
          setTimeout(() => {
            uap.window.close("prefession")
          }, 2000);
        }
      }
    },
    error: res => {
      if (res.status == 401) {
        localStorage.setItem('authenticate', null)
        let msg = "'登录过期或未登录', 'error code:401'"
        popupwindow(msg)
        if (WareType == "1") {
          setTimeout(() => {
            uap.window.close("material")
          }, 2000);
        } else if (WareType == "0") {
          setTimeout(() => {
            uap.window.close("prefession")
          }, 2000);
        }
      } else {
        console.log("error-----500");
        let msg = `error code: ${res.status}, ${res.statusText}`
      
        popupwindow(msg)
      }
    }
  }
  requestParameters['url'] = app_url + parms.url
  $.ajax(requestParameters)
  return
}
//方法二
function requests1(parms) {
  let authenticate = JSON.parse(localStorage.getItem('authenticate'))
  if (!authenticate && parms.requestType == null) {
    let msg = "'登录过期或未登录', '提示'"
    popupwindow(msg)
    localStorage.setItem('authenticate', null)
    if (WareType == "1") {
      setTimeout(() => {
        uap.window.close("material")
      }, 2000);
    } else if (WareType == "0") {
      setTimeout(() => {
        uap.window.close("prefession")
      }, 2000);
    }
  }
  let Authorization = parms.requestType ? '' : `Bearer ${authenticate.access_token}`
  let requestParameters = {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': "application/json;charset=utf-8",
      Authorization: Authorization
    },
    contentType: 'application/json',
    type: parms.type,
    data: parms.data,
    dataType: 'text',
    async: parms.async || true,
    success: res => {
      // 请求成功 | 登陆成功
      if (typeof(res) == "object") {
        if (res.code == 200 || res.access_token) {
          parms.callback(res)
        } else if (parms.requestType) {
          let msg = "用户名密码或验证码错误"
          popupwindow(msg)
          getCode()
        } else {
          let msg = `请求错误${res.msg}`
          popupwindow(msg)
        }
      } else {
        parms.callback(res)
      }
    },
    error: res => {
      if (res.status == 401) {
        localStorage.setItem('authenticate', null)
        let msg = "'登录过期或未登录', 'error code:401'"
        popupwindow(msg)
        if (WareType == "1") {
          setTimeout(() => {
            uap.window.close("material")
          }, 2000);
        } else if (WareType == "0") {
          setTimeout(() => {
            uap.window.close("prefession")
          }, 2000);
        }
      } else {
        let msg = `error code: ${res.status}, ${res.statusText}`
        popupwindow(msg)
      }
    }
  }

  requestParameters['url'] = app_url + parms.url
  $.ajax(requestParameters)
  return
}
// 方法三
function requests2(parms) {
  let authenticate = JSON.parse(localStorage.getItem('authenticate'))
  if (!authenticate && parms.requestType == null) {
    let msg = "'登录过期或未登录', '提示'"
    popupwindow(msg)
    localStorage.setItem('authenticate', null)
    if (WareType == "1") {
      setTimeout(() => {
        uap.window.close("material")
      }, 2000);
    } else if (WareType == "0") {
      setTimeout(() => {
        uap.window.close("prefession")
      }, 2000);
    }
  }
  let Authorization = parms.requestType ? '' : `Bearer ${authenticate.access_token}`
  let requestParameters = {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': "application/json;charset=utf-8",
      Authorization: Authorization
    },
    contentType: 'application/json',
    type: parms.type,
    data: JSON.stringify(parms.data),
    async: parms.async || true,
    success: res => {
      parms.callback(res)
    },
    error: res => {
      if (res.status == 401) {
        localStorage.setItem('authenticate', null)
        let msg = "'登录过期或未登录', 'error code:401'"
        popupwindow(msg)
        if (WareType == "1") {
          setTimeout(() => {
            uap.window.close("material")
          }, 2000);
        } else if (WareType == "0") {
          setTimeout(() => {
            uap.window.close("prefession")
          }, 2000);
        }
      } else {
        let msg = `error code: ${res.status}, ${res.statusText}`
        popupwindow(msg)
      }
    }
  }
  requestParameters['url'] = app_url + parms.url
  $.ajax(requestParameters)
  return
}
// 取出数据
function getObj(name) {
  return JSON.parse(localStorage.getItem(name))
}

// 获取url中的参数
function request(queryName) {
  let reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i")
  let r = window.location.search.substr(1).match(reg)
  return r != null ? decodeURI(r[2]) : null
}

// 切换地址
function newHref(a, b) {
  let array = a.split('/')
  array[array.length - 1] = `${b}`
  location.href = array.join('/')
}
// 获取当日时间
Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[
      k]).substr(("" + o[k]).length)));
  return fmt;
}
// 去掉item中的null
function removeNull(data) {
  Object.keys(data).forEach(i => {
    data[i] = data[i] == null ? '无数据' : data[i]
    data[i] = data[i] == "" ? '无数据' : data[i]
  })
}
// 字典 {单据状态, 单据类型}
function dic(data, type) {
  let result = '-'
  const dictionary = [{
      // 单据类型
      type: 'documentsType',
      data: [{
          key: 10,
          value: '采购订单入库(有计划)'
        },
        {
          key: 11,
          value: '采购订单入库(无计划)'
        },
        {
          key: 21,
          value: '寄存物资入库'
        },
        {
          key: 31,
          value: '电商化代保管入库'
        },
        {
          key: 41,
          value: '废旧物资入库'
        },
        {
          key: 99,
          value: '专业仓入库'
        }
      ]
    },
    {
      // 单据状态
      type: 'documentsStatus',
      data: [{
          key: 0,
          value: '取消'
        },
        {
          key: 1,
          value: '新生成'
        },
        {
          key: 2,
          value: '正在组盘'
        },
        {
          key: 3,
          value: '组盘完成'
        },
        {
          key: 10,
          value: '已完成'
        },
      ]
    },
  ]
  dictionary.forEach(item => {
    if (item.type == type) {
      item.data.forEach(i => {
        if (i.key == data) {
          result = i.value
        }
      })
    }
  })
  return result
}

// 启动加载页面
function openLoding() {
  $(".lodingbox").show()
}
//关闭加载页面
function closeLoding() {
  setTimeout(() => {
    $(".lodingbox").hide()
  }, 500);
}
// 回话超时
function callTimeout() {
  setTimeout(() => {
    let warehouseType = localStorage.getItem("warehouseType")
    if (warehouseType == "1") {
      location.href = "material.html"
    } else if (warehouseType == "0")(
      location.href = "profession.html"
    )
  }, 1800000);
}
// 弹窗问题
function popupwindow(msg) {
  let html = ''
  html = `
	<div id="alert"></div>
	`
  $('body').append(html)
  let text = ''
  text = `
	<div class="alertbox" style="font-size:.2em">${msg}</div>
	`
  $('#alert').empty()
  $('#alert').append(text)
  $("#alert").css({
    "height": "1.5em",
    "position": "fixed",
    "bottom": "1.5em",
    "left": "50%",
    "transform": "translate(-50%)",
    "borderRadius": ".4em",
    "background-color": "rgba(0, 0,0, .8)",
    "padding": "0px .5em",
    "line-height": ".5em",
    "color": "white"
  })
  $('#alertbox').css({
    "font-size": ".3em",
    "height": "1.5em",
  })
  $('#alert').fadeIn()
  setTimeout(() => {
    $('#alert').fadeOut()
  }, 2000);
}
//输入框样式变换
// $('input').on("")
