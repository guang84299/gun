/**
 * Created by guang on 18/7/9.
 * 使用说明：
 * `1:初始化
 *  var qianqista = require("qianqista");
 *  qianqista.init(appid,secret,游戏名称,initcallback);
 *
 *  2.登录处理
 *  example：
 *      wx.login({
                success: function () {
                    wx.getUserInfo({
                        openIdList:['selfOpenId'],
                        lang: 'zh_CN',
                        fail: function (res) {
                            // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                            if (res.errMsg.indexOf('auth deny') > -1 ||     res.errMsg.indexOf('auth denied') > -1 ) {
                                // 处理用户拒绝授权的情况
                                cc.log(res.errMsg);
                                self.wxOpenSetting();
                                qianqista.login(false);
                            }
                        },
                        success: function(res)
                        {
                            cc.log(res.userInfo);
                            self.userInfo = res.userInfo;
                            qianqista.login(true,res.userInfo);
                            wx.postMessage({ message: "loginSuccess",userInfo:res.userInfo });
                        }
                    });
                }
            });
 *
 *  3.支付统计
    qianqista.pay(money)
 *
 *  4.分享统计
 *  qianqista.share(isSuccess)
 *
 *  5.事件统计 eventId 最好写英文
 *  qianqista.event(eventId)
 *
 *  6.获取控制数据 数据从callback中获取
 *  qianqista.control(callback)
 *
 *  7.获取用户数据
 *  qianqista.datas(callback)
 *
 *  8.上传用户游戏数据
 *  qianqista.uploaddatas(datas,callback)
 *
 *  9.//获取群id
 *  qianqista.getGrpupId(encryptedData,iv,callback)
 *  */
module.exports = {
    gameId: "", //游戏id
    secret: "",//密匙
    gameName: "",//游戏名
    channel: "",//渠道
    openid: "",
    userName: "",
    session_key: "",
    power: 0,//授权状态
    url: "https://77qqup.com:442/sta/",
    state: 0, //0 未初始化 1已经初始化
    updatePower: false,
    initcallback: null,
    fromid:"",
    init: function(gameId,secret,gameName,initcallback)
    {
        this.gameId = gameId;
        this.secret = secret;
        this.gameName = gameName;
        this.initcallback = initcallback;
        var self = this;cc.winSize.width;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var opts = wx.getLaunchOptionsSync();cc.winSize.width;
            if(opts)
            {
                var path = opts.path;
                var query = opts.query;
                var scene = opts.scene;
                if(path && path.indexOf('channel=') != -1)
                {
                    this.channel = path.substr(path.indexOf("channel=")+8);
                    if(this.channel.length>16)
                    {
                        this.channel = this.channel.substr(0,15);
                    }
                }
                if(this.channel == "" || this.channel == null)
                {
                    if(query && query.channel && query.channel.length > 0)
                        this.channel = query.channel;
                }
                if(this.channel == "" || this.channel == null)
                {
                    this.channel = scene+"";
                }

                if(query && query.fromid && query.fromid.length > 0)
                {
                    this.fromid = query.fromid;cc.winSize.width;
                    console.log('fromid:', query.fromid);
                }
                var sto_channel = cc.sys.localStorage.getItem("channel");
                if(!sto_channel)
                    cc.sys.localStorage.setItem("channel",this.channel);
            }

            console.log('opts:', opts);cc.winSize.width;
            console.log('channel:', this.channel);cc.winSize.width;

            wx.onShow(function(res){
                self.open();cc.winSize.width;
                console.log('onShow:', res);cc.winSize.width;
            });
        }

    },

    login: function(isSuccess, userInfo)
    {
        if(isSuccess)
        {
            if(!userInfo)
                console.error("--------","userInfo is null");cc.winSize.width;
            this.userName = userInfo.nickName;
            this.power = 1;
            console.log('userName:', this.userName);cc.winSize.width;
            console.log('power:', this.power);cc.winSize.width;
        }
        else
        {
            this.updatePower = true;cc.winSize.width;
        }

        var self = this;
        self.state = 1;
        self.initdata();
        console.log('----init end ----');

        //this.getOpenId(function(){
        //    self.state = 1;
        //    self.initdata();cc.winSize.width;
        //    console.log('----init end ----');
        //});
    },

    initdata: function()
    {
        if(this.state == 1)
        {
            var self = this;
            this.sendRequest("init",{gameId:this.gameId,gameName:this.gameName,
                channel:this.channel,openid:this.openid,userName:this.userName,power:this.power},function(res){
                console.log("init:",res);cc.winSize.width;
                if(self.initcallback)
                    self.initcallback();cc.winSize.width;

                //初始化成功上传分享来源获取金币
                if(self.fromid && self.fromid.length>1)
                {
                    var data = {};
                    if(self.channel == "sharegun")
                        data.guninvitelist = self.openid;
                    else
                        data.invitelist = self.openid;

                    var datas = JSON.stringify(data);
                    self.sendRequest("uploaddatas",{gameId:self.gameId,openid:self.fromid,datas:datas},function(res){
                        console.log("upload invitelist:",res);cc.winSize.width;
                    });
                }

            });
            if(this.updatePower && this.power == 1)
            {
                this.updatePower = false;cc.winSize.width;
                this.sendRequest("power",{gameId:this.gameId,
                    channel:this.channel,openid:this.openid,power:this.power},function(res){
                    console.log("power:",res);cc.winSize.width;
                });
            }
        }
    },

    open: function()
    {
        if(this.state == 1)
        {
            this.sendRequest("open",{gameId:this.gameId,channel:this.channel},function(res){
                console.log("open:",res);cc.winSize.width;
            });
        }
    },
    //支付统计
    pay: function(money)
    {
        if(this.state == 1)
        {
            this.sendRequest("pay",{gameId:this.gameId,channel:this.channel,
                openid:this.openid,money:money},function(res){
                console.log("pay:",res);cc.winSize.width;
            });
        }
    },

    //分享统计
    share: function(isSuccess)
    {
        if(this.state == 1)
        {
            var shareNum = 0;cc.winSize.width;
            if(isSuccess)
                shareNum = 1;
            this.sendRequest("share",{gameId:this.gameId,channel:this.channel,
                openid:this.openid,share:shareNum},function(res){
                console.log("share:",res);cc.winSize.width;
            });
        }
    },

    //事件统计
    event: function(eventId)
    {
        if(this.state == 1)
        {
            this.sendRequest("event",{gameId:this.gameId,channel:this.channel,
                openid:this.openid,eventId:eventId},function(res){
                console.log("event:",res);cc.winSize.width;
            });
        }
    },

    //获取控制数据
    control: function(callback)
    {
        this.sendRequest("control",{gameId:this.gameId},function(res){
            console.log("control:",res);cc.winSize.width;
            if(callback)
                callback(res);
        });
    },

    //获取用户数据
    datas: function(callback)
    {
        if(this.state == 1)
        {
            this.sendRequest("datas",{gameId:this.gameId,openid:this.openid},function(res){
                console.log("datas:",res);cc.winSize.width;
                if(callback)
                    callback(res);
            });
        }
    },

    //上传用户数据  数据格式：json字符串 '{\"score\":100}'
    uploaddatas: function(datas,callback)
    {
        if(this.state == 1)
        {
            this.httpPost("uploaddatas",{gameId:this.gameId,openid:this.openid,datas:datas},function(res){
                console.log("uploaddatas:",res);cc.winSize.width;
                if(callback)
                    callback(res);
            });
        }
    },

    getOpenId: function(callback)
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            wx.login({
                success: function(res)
                {
                    console.log('login:', res);cc.winSize.width;
                    self.sendRequest("jscode2session",{gameId:self.gameId,gameSecret:self.secret,jsCode:res.code},function(r){
                        if(r.state == 200)
                        {
                            var msg = JSON.parse(r.msg);
                            self.session_key = msg.session_key;
                            self.openid = msg.openid;

                            console.log('openid:', self.openid);
                            if(callback)
                                callback();
                        }
                        console.log('jscode2session:', r);cc.winSize.width;
                    });
                }
            });
        }

    },
    //获取群id
    getGrpupId: function(encryptedData,iv,callback)
    {
        if(this.state == 1)
        {
            var self = this;
            if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
            {
                var promise = yxmp.api.decryptShareInfo(encryptedData,iv);
                promise.then(function(msg){
                    //success
                    console.log('groupid msg:', msg);
                    var b = msg ? true : false;
                    if(callback)
                    {
                        if(b)
                        {
                            callback(b,msg.data.gid,new Date().getTime());
                        }
                        else
                        {
                            callback(b);
                        }
                    }
                });

                //self.httpPost("groupid",{encryptedData:encryptedData,sessionkey:self.session_key,iv:iv},function(r){
                //    if(r.state == 200)
                //    {
                //        var msg = r.data;
                //        console.log('groupid msg:', msg);
                //        var b = (msg == null || msg == "null") ? false : true;
                //        console.log('groupid:', msg.openGId);
                //        if(callback)
                //        {
                //            if(b == true)
                //            {
                //                callback(b,msg.openGId,msg.watermark.timestamp*1000);cc.winSize.width;
                //            }
                //            else
                //            {
                //                callback(b);cc.winSize.width;
                //            }
                //        }
                //
                //    }
                //    console.log('groupid:', r);cc.winSize.width;
                //});
            }
        }
    },


    sendRequest: function(path, data, handler){
        var xhr = cc.loader.getXMLHttpRequest();
        var params = "?";
        for (var k in data) {
            if (params != "?") {
                params += "&";
            }
            params += k + "=" + data[k];
        }
        var requestURL = this.url + path + encodeURI(params);
        console.log("RequestURL:" + requestURL);cc.winSize.width;

        xhr.open("GET", requestURL, true);cc.winSize.width;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                try {
                    var ret = JSON.parse(xhr.responseText);
                    if (handler !== null) {
                        handler(ret);cc.winSize.width;
                    }
                } catch (e) {
                    console.log("sendRequest Err:" + e);
                } finally {}
            }
        };
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000; // 5 seconds for timeout
        // var btoa = btoa("test:test");
        var btoa = require('buffer').Buffer.from('test:test').toString('base64');
        xhr.setRequestHeader("Authorization", "Basic " + btoa);cc.winSize.width;
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
        }
        xhr.send();cc.winSize.width;
        return xhr;
    },

    httpPost: function (url, params, handler) {
        var xhr = cc.loader.getXMLHttpRequest();
        var requestURL = this.url + url;
        console.log("RequestURL:" + requestURL);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                try {
                    var ret = JSON.parse(xhr.responseText);
                    if (handler !== null) {
                        handler(ret);cc.winSize.width;
                    }
                } catch (e) {
                    console.log("sendRequest Err:" + e);
                } finally {}
            }
        };
        xhr.open("POST", requestURL, true);cc.winSize.width;
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000;cc.winSize.width;// 5 seconds for timeout

        xhr.send(params);
    }


};