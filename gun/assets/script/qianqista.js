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
    unionId: null,
    userName: "",
    session_key: "",
    encryptedData: null,
    iv: null,
    power: 0,//授权状态
    url: "https://77qqup.com:442/sta/",
    url2: "https://www.e26f.cn/gun/",

    url3: "https://www.e26f.cn/gun/",
    url4: "https://www.0a8ce26f.com/gun/",

    avatarUrl: "",//头像
    state: 0, //0 未初始化 1已经初始化
    updatePower: false,
    initcallback: null,
    logincallback: null,
    showcallback: null,
    hidecallback: null,
    fromid:"",
    pkfromid:"",
    pkroomtype: 0,
    isupdateunionid: true,
    init: function(gameId,secret,gameName,initcallback,showcallback)
    {
        this.gameId = gameId;
        this.secret = secret;
        this.gameName = gameName;
        this.initcallback = initcallback;
        this.showcallback = showcallback;
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var opts = wx.getLaunchOptionsSync();
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
                    this.fromid = query.fromid;
                    this.pkfromid = query.fromid;
                    console.log('fromid:', query.fromid);
                }
                if(query && query.roomType)
                {
                    this.pkroomtype = query.roomType;
                }
                var sto_channel = cc.sys.localStorage.getItem("channel");
                if(!sto_channel)
                    cc.sys.localStorage.setItem("channel",this.channel);
            }

            console.log('opts:', opts);
            console.log('channel:', this.channel);

            wx.onShow(function(res){
                self.open();

                console.log('onShow:', res);
                console.log('power:', self.power);

                var query = res.query;
                if(query && query.fromid && query.fromid.length > 0)
                {
                    self.pkfromid = query.fromid;
                }
                if(query && query.roomType)
                {
                    self.pkroomtype = query.roomType;
                }
                if(self.power == 1 && query && query.channel && query.channel == "shareonline" && self.pkfromid && self.pkroomtype>0)
                {
                    if(self.showcallback)
                        self.showcallback();
                }

            });

            wx.onHide(function(){
                if(self.hidecallback)
                    self.hidecallback();
            });
        }
        else
        {
            if(cc.sys.browserType == "chrome")
            {
                this.openid = "test001";
                this.userName = "test001";
                this.avatarUrl = "https://77qqup.com:442/img/wxgame/49234a872c294891aa98877d51679180.png";
                this.fromid = "test002";
                this.pkfromid = "test002";
            }
            else
            {
                this.openid = "test002";
                this.userName = "test002";
                this.avatarUrl = "https://77qqup.com:442/img/wxgame/1b6474f6563845c4a5afd5b9a797c017.png";
                this.fromid = "test001";
            }
            this.state = 1;
            if(self.initcallback)
                self.initcallback();
        }
    },

    setHideCallback: function(hidecallback)
    {
        this.hidecallback = hidecallback;
    },

    login: function(isSuccess, userInfo,callback)
    {
        this.logincallback = callback;
        if(isSuccess)
        {
            if(!userInfo)
                console.error("--------","userInfo is null");
            this.userName = userInfo.userInfo.nickName;
            this.power = 1;
            this.avatarUrl = userInfo.userInfo.avatarUrl;
            this.encryptedData = userInfo.encryptedData;
            this.iv = userInfo.iv;
            console.log('userInfo:', userInfo);
        }
        else
        {
            this.updatePower = true;
        }

        var self = this;
        this.getOpenId(function(){
            self.state = 1;
            self.initdata();
            console.log('----init end ----');
        });
    },

    initdata: function()
    {
        if(this.state == 1)
        {
            var self = this;
            this.sendRequest("init",{gameId:this.gameId,gameName:this.gameName,
                channel:this.channel,openid:this.openid,userName:this.userName,power:this.power},function(res){
                console.log("init:",res);
                if(self.initcallback)
                    self.initcallback();

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
                        console.log("upload invitelist:",res);
                    });
                }

            });
            if(this.updatePower && this.power == 1)
            {
                this.updatePower = false;
                this.sendRequest("power",{gameId:this.gameId,
                    channel:this.channel,openid:this.openid,power:this.power},function(res){
                    console.log("power:",res);
                });
            }

            if(this.power == 1 && self.channel == "shareonline")
            {
                if(this.logincallback)
                    this.logincallback();
            }
        }
    },

    open: function()
    {
        if(this.state == 1)
        {
            this.sendRequest("open",{gameId:this.gameId,channel:this.channel},function(res){
                console.log("open:",res);
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
                console.log("pay:",res);
            });
        }
    },

    //分享统计
    share: function(isSuccess)
    {
        if(this.state == 1)
        {
            var shareNum = 0;
            if(isSuccess)
                shareNum = 1;
            this.sendRequest("share",{gameId:this.gameId,channel:this.channel,
                openid:this.openid,share:shareNum},function(res){
                console.log("share:",res);
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
                console.log("event:",res);
            });
        }
    },

    //获取控制数据
    control: function(callback)
    {
        this.sendRequest("control",{gameId:this.gameId},function(res){
            console.log("control:",res);
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
                console.log("datas:",res);
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
                console.log("uploaddatas:",res);
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
                    console.log('login:', res);
                    self.sendRequest("jscode2session",{gameId:self.gameId,gameSecret:self.secret,jsCode:res.code},function(r){
                        if(r.state == 200)
                        {
                            var msg = JSON.parse(r.msg);
                            self.session_key = msg.session_key;
                            self.openid = msg.openid;

                            console.log('openid:', self.openid);
                            if(callback)
                                callback();

                            self.getUnionId(self.encryptedData,self.iv);
                        }
                        console.log('jscode2session:', r);
                    });
                }
            });
        }

    },

    getUnionId: function(encryptedData,iv,callback)
    {
        if(this.state == 1)
        {
            var self = this;
            if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
            {
                self.httpPost("groupid",{encryptedData:encryptedData,sessionkey:self.session_key,iv:iv},function(r){
                    if(r.state == 200)
                    {
                        var msg = r.data;
                        console.log('unionId:', msg.unionId);
                        self.unionId = msg.unionId;
                        if(callback)
                        {
                            callback();
                        }

                        if(self.isupdateunionid)
                        {
                            self.updateUnionId();
                        }
                    }
                    console.log('unionId:', r);
                });
            }
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
                self.httpPost("groupid",{encryptedData:encryptedData,sessionkey:self.session_key,iv:iv},function(r){
                    if(r.state == 200)
                    {
                        var msg = r.data;
                        var b = (msg == null || msg == "null") ? false : true;
                        console.log('groupid:', msg.openGId);
                        if(callback)
                        {
                            if(b == true)
                            {
                                callback(b,msg.openGId,msg.watermark.timestamp*1000);
                            }
                            else
                            {
                                callback(b);
                            }
                        }

                    }
                    console.log('groupid:', r);
                });
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
        console.log("RequestURL:" + requestURL);

        xhr.open("GET", requestURL, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                try {
                    var ret = JSON.parse(xhr.responseText);
                    if (handler !== null) {
                        handler(ret);
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
        xhr.setRequestHeader("Authorization", "Basic " + btoa);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
        }
        xhr.send();
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
                        handler(ret);
                    }
                } catch (e) {
                    console.log("sendRequest Err:" + e);
                } finally {}
            }
        };
        xhr.open("POST", requestURL, true);
        //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000;// 5 seconds for timeout

        //var datas = "";
        //var i = 0;
        //for (var k in params) {
        //    if (i != 0) {
        //        datas += "&";
        //    }
        //    datas += k + "=" + params[k];
        //    i++;
        //}
        //
        //xhr.send(datas);
        xhr.send(params);
    },



    pdatas: function(callback)
    {
        if(this.state == 1)
        {
            this.sendRequest2("datas",{openid:this.openid},function(res){
                console.log("pdatas:",res);
                if(callback)
                    callback(res);
            });
        }
    },

    paddUser: function(callback,score)
    {
        if(this.state == 1)
        {
            this.httpPost2("addUser",{openid:this.openid,nick:this.userName,avatarUrl:this.avatarUrl,score:score},function(res){
                console.log("addUser:",res);
                if(callback)
                    callback(res);
            });
        }
    },

    uploadScore: function(score)
    {
        if(this.state == 1)
        {
            this.sendRequest2("uploadScore",{openid:this.openid,score:score},function(res){
                console.log("uploadScore:",res);
            });
        }
    },

    updateJScore: function(jscore)
    {
        if(this.state == 1)
        {
            this.sendRequest2("updateJScore",{openid:this.openid,jscore:jscore},function(res){
                console.log("updateJScore:",res);
            });
        }
    },

    rankScore: function(callback)
    {
        if(this.state == 1)
        {
            this.sendRequest2("rankScore",{openid:this.openid,rows:50},function(res){
                console.log("rankScore:",res);
                if(callback)
                    callback(res);
            });
        }
    },

    rankJScore: function(callback)
    {
        if(this.state == 1)
        {
            this.sendRequest2("rankJScore",{openid:this.openid,rows:50},function(res){
                console.log("rankJScore:",res);
                if(callback)
                    callback(res);
            });
        }
    },

    rankStar: function(callback)
    {
        if(this.state == 1)
        {
            this.sendRequest2("rankStar",{openid:this.openid,rows:50},function(res){
                console.log("rankStar:",res);
                if(callback)
                    callback(res);
            });
        }
    },

    rankStarLast: function(callback)
    {
        if(this.state == 1)
        {
            this.sendRequest2("rankStarLast",{openid:this.openid},function(res){
                console.log("rankStarLast:",res);
                if(callback)
                    callback(res);
            });
        }
    },

    subTime: function(callback)
    {
        if(this.state == 1)
        {
            this.sendRequest2("subTime",{},function(res){
                console.log("subTime:",res);
                if(callback)
                    callback(res);
            });
        }
    },

    updateUnionId: function(callback)
    {
        if(this.state == 1)
        {
            this.sendRequest2("updateUnionId",{openid:this.openid,unionId:this.unionId},function(res){
                console.log("updateUnionId:",res);
                if(callback)
                    callback(res);
            });
        }
    },

    myMony: function(callback)
    {
        if(this.state == 1)
        {
            this.sendRequest2("myMony",{openid:this.openid},function(res){
                console.log("myMony:",res);
                if(callback)
                    callback(res);
            });
        }
    },

    updateUrl2: function(type)
    {
        if(type == 0)
            this.url2 = this.url3;
        else
            this.url2 = this.url4;
    },


    sendRequest2: function(path, data, handler){
        var xhr = cc.loader.getXMLHttpRequest();
        var params = "?";
        for (var k in data) {
            if (params != "?") {
                params += "&";
            }
            params += k + "=" + data[k];
        }
        var requestURL = this.url2 + path + encodeURI(params);
        console.log("RequestURL:" + requestURL);

        xhr.open("GET", requestURL, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                try {
                    var ret = JSON.parse(xhr.responseText);
                    if (handler !== null) {
                        handler(ret);
                    }
                } catch (e) {
                    console.log("sendRequest Err:" + e,requestURL);
                } finally {}
            }
        };
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000; // 5 seconds for timeout
        // var btoa = btoa("test:test");
        var btoa = require('buffer').Buffer.from('test:test').toString('base64');
        xhr.setRequestHeader("Authorization", "Basic " + btoa);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
        }
        xhr.send();
        return xhr;
    },

    httpPost2: function (url, params, handler) {
        var xhr = cc.loader.getXMLHttpRequest();
        var requestURL = this.url2 + url;
        console.log("RequestURL:" + requestURL);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                try {
                    var ret = JSON.parse(xhr.responseText);
                    if (handler !== null) {
                        handler(ret);
                    }
                } catch (e) {
                    console.log("sendRequest Err:" + e);
                } finally {}
            }
        };
        xhr.open("POST", requestURL, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000;// 5 seconds for timeout
        //
        var datas = "";
        var i = 0;
        for (var k in params) {
            if (i != 0) {
                datas += "&";
            }
            datas += k + "=" + params[k];
            i++;
        }
        xhr.send(datas);
        //xhr.send(params);
    }


};