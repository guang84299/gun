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
    gameId: 0, //游戏id
    appId: "",//appid
    gameName: "",//游戏名
    channel: "",//渠道
    openid: "",
    userName: "",
    session_key: "",
    power: 1,//授权状态
    url: "http://qqplay.77qqup.com:8082/sta/",
    url2: "http://qqplay.e26f.cn/gun/",
    state: 0, //0 未初始化 1已经初始化
    updatePower: false,
    initcallback: null,
    hidecallback: null,
    showcallback: null,
    fromid:"",
    pkfromid:"",
    pkroomtype: 0,
    avatarUrl: "",//头像
    init: function(appId,gameName,initcallback,showcallback)
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            this.gameId = GameStatusInfo.gameId + "";
            this.openid = GameStatusInfo.openId;
        }
        else
        {
            this.gameId = appId + "001";
            this.openid = "wx00001";
        }

        this.appId = appId;
        this.gameName = gameName;
        this.initcallback = initcallback;
        this.showcallback = showcallback;


        if(this.gameId && this.openid && this.openid.length>0)
        {
            this.state = 1;
            if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
            {
                var query = GameStatusInfo.gameParam;
                if(query && query.length>0)
                {
                    var datas = JSON.parse(query);
                    if(datas.channel)
                        this.channel = datas.channel;
                    if(datas.fromid)
                    {
                        this.fromid = datas.fromid;
                        this.pkfromid = datas.fromid;
                    }
                    if(datas.roomType)
                        this.pkroomtype = datas.roomType;

                    if(this.power == 1 && this.channel && this.channel == "shareonline" && this.pkfromid && this.pkroomtype>0)
                    {
                        if(this.showcallback)
                            this.showcallback();
                    }
                }


                //var query = res.query;
//                if(query && query.fromid && query.fromid.length > 0)
//                {
//                    self.pkfromid = query.fromid;
//                }
//                if(query && query.roomType)
//                {
//                    self.pkroomtype = query.roomType;
//                }
//                if(self.power == 1 && query && query.channel && query.channel == "shareonline" && self.pkfromid && self.pkroomtype>0)
//                {
//                    if(self.showcallback)
//                        self.showcallback();
//                }

                BK.MQQ.Account.getNick(this.openid,function(openID,nick){
                    self.userName = nick;
                    self.getAvatarUrl(function(){
                        self.initdata();
                    });
                });

                new BK.Game({
                    onLoad: function()
                    {
                        BK.Script.log(1,1,"---onLoad----");
                    },
                    onMinmize: function()
                    {
                        BK.Script.log(1,1,"---onMinmize----");
                    },
                    onClose: function()
                    {
                        BK.Script.log(1,1,"---onClose----");
                    },
                    onEnterbackground: function()
                    {
                        BK.Script.log(1,1,"---onEnterbackground----");
                    },
                    onEnterforeground: function()
                    {
                        BK.Script.log(1,1,"---onEnterforeground----");
                    }
                });

                BK.Script.log(1,1,"---1111111----:" + query);
            }
            else{
                self.userName = "测试用户名";
                self.avatarUrl = "http://qqplay.e26f.cn/img/avatar/0.jpg";
                this.initdata();
            }


        }
        // JSON.stringify(data)

    },

    login: function()
    {
        var self = this;

    },

    getAvatarUrl: function(callback)
    {
        var self = this;
        var attr = "score";//使用哪一种上报数据做排行，可传入score，a1，a2等
        var order = 1;     //排序的方法：[ 1: 从大到小(单局)，2: 从小到大(单局)，3: 由大到小(累积)]
        var rankType = 0; //要查询的排行榜类型，0: 好友排行榜，1: 群排行榜，2: 讨论组排行榜，3: C2C二人转 (手Q 7.6.0以上支持)
        // 必须配置好周期规则后，才能使用数据上报和排行榜功能
        BK.QQ.getRankListWithoutRoom(attr, order, rankType, function(errCode, cmd, data) {
            BK.Script.log(1,1,"-------getAvatarUrl callback  cmd" + cmd + " errCode:" + errCode + "  data:" + JSON.stringify(data));
            // 返回错误码信息
            if (errCode !== 0) {
                BK.Script.log(1,1,'------获取排行榜数据失败!错误码：' + errCode);
            }
            // 解析数据
            if (data) {
                for(var i=0; i < data.data.ranking_list.length; ++i) {
                    var rd = data.data.ranking_list[i];
                    if(rd.selfFlag)
                    {
                        self.avatarUrl = rd.url;
                        break;
                    }
                }
            }
            if(callback)
                callback();
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
            // console.log("send datas:"+JSON.stringify(params));
            console.log("suploaddatas:",datas);
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
                        }
                        console.log('jscode2session:', r);
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
        xhr.timeout = 20000; // 5 seconds for timeout
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
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 20000;// 5 seconds for timeout

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
    },

    setHideCallback: function(hidecallback)
    {
        this.hidecallback = hidecallback;
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


///**
// * Created by guang on 18/7/9.
// * 使用说明：
// * `1:初始化
// *  var qianqista = require("qianqista");
// *  qianqista.init(appid,secret,游戏名称,initcallback);
// *
// *  2.登录处理
// *  example：
// *      wx.login({
//                success: function () {
//                    wx.getUserInfo({
//                        openIdList:['selfOpenId'],
//                        lang: 'zh_CN',
//                        fail: function (res) {
//                            // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
//                            if (res.errMsg.indexOf('auth deny') > -1 ||     res.errMsg.indexOf('auth denied') > -1 ) {
//                                // 处理用户拒绝授权的情况
//                                cc.log(res.errMsg);
//                                self.wxOpenSetting();
//                                qianqista.login(false);
//                            }
//                        },
//                        success: function(res)
//                        {
//                            cc.log(res.userInfo);
//                            self.userInfo = res.userInfo;
//                            qianqista.login(true,res.userInfo);
//                            wx.postMessage({ message: "loginSuccess",userInfo:res.userInfo });
//                        }
//                    });
//                }
//            });
// *
// *  3.支付统计
//    qianqista.pay(money)
// *
// *  4.分享统计
// *  qianqista.share(isSuccess)
// *
// *  5.事件统计 eventId 最好写英文
// *  qianqista.event(eventId)
// *
// *  6.获取控制数据 数据从callback中获取
// *  qianqista.control(callback)
// *
// *  7.获取用户数据
// *  qianqista.datas(callback)
// *
// *  8.上传用户游戏数据
// *  qianqista.uploaddatas(datas,callback)
// *
// *  9.//获取群id
// *  qianqista.getGrpupId(encryptedData,iv,callback)
// *  */
//module.exports = {
//    gameId: "", //游戏id
//    secret: "",//密匙
//    gameName: "",//游戏名
//    channel: "",//渠道
//    openid: "",
//    unionId: null,
//    userName: "",
//    session_key: "",
//    encryptedData: null,
//    iv: null,
//    power: 0,//授权状态
//    url: "https://77qqup.com:442/sta/",
//    url2: "https://www.e26f.cn/gun/",
//
//    url3: "https://www.e26f.cn/gun/",
//    url4: "https://www.0a8ce26f.com/gun/",
//
//    avatarUrl: "",//头像
//    state: 0, //0 未初始化 1已经初始化
//    updatePower: false,
//    initcallback: null,
//    logincallback: null,
//    showcallback: null,
//    hidecallback: null,
//    fromid:"",
//    pkfromid:"",
//    pkroomtype: 0,
//    isupdateunionid: true,
//    init: function(gameId,secret,gameName,initcallback,showcallback)
//    {
//        this.gameId = gameId;
//        this.secret = secret;
//        this.gameName = gameName;
//        this.initcallback = initcallback;
//        this.showcallback = showcallback;
//        var self = this;
//        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
//        {
//            var opts = wx.getLaunchOptionsSync();
//            if(opts)
//            {
//                var path = opts.path;
//                var query = opts.query;
//                var scene = opts.scene;
//                if(path && path.indexOf('channel=') != -1)
//                {
//                    this.channel = path.substr(path.indexOf("channel=")+8);
//                    if(this.channel.length>16)
//                    {
//                        this.channel = this.channel.substr(0,15);
//                    }
//                }
//                if(this.channel == "" || this.channel == null)
//                {
//                    if(query && query.channel && query.channel.length > 0)
//                        this.channel = query.channel;
//                }
//                if(this.channel == "" || this.channel == null)
//                {
//                    this.channel = scene+"";
//                }
//
//                if(query && query.fromid && query.fromid.length > 0)
//                {
//                    this.fromid = query.fromid;
//                    this.pkfromid = query.fromid;
//                    console.log('fromid:', query.fromid);
//                }
//                if(query && query.roomType)
//                {
//                    this.pkroomtype = query.roomType;
//                }
//                var sto_channel = cc.sys.localStorage.getItem("channel");
//                if(!sto_channel)
//                    cc.sys.localStorage.setItem("channel",this.channel);
//            }
//
//            console.log('opts:', opts);
//            console.log('channel:', this.channel);
//
//            wx.onShow(function(res){
//                self.open();
//
//                console.log('onShow:', res);
//                console.log('power:', self.power);
//
//                var query = res.query;
//                if(query && query.fromid && query.fromid.length > 0)
//                {
//                    self.pkfromid = query.fromid;
//                }
//                if(query && query.roomType)
//                {
//                    self.pkroomtype = query.roomType;
//                }
//                if(self.power == 1 && query && query.channel && query.channel == "shareonline" && self.pkfromid && self.pkroomtype>0)
//                {
//                    if(self.showcallback)
//                        self.showcallback();
//                }
//
//            });
//
//            wx.onHide(function(){
//                if(self.hidecallback)
//                    self.hidecallback();
//            });
//        }
//        else
//        {
//            if(cc.sys.browserType == "chrome")
//            {
//                this.openid = "test001";
//                this.userName = "test001";
//                this.avatarUrl = "https://77qqup.com:442/img/wxgame/49234a872c294891aa98877d51679180.png";
//                this.fromid = "test002";
//                this.pkfromid = "test002";
//            }
//            else
//            {
//                this.openid = "test002";
//                this.userName = "test002";
//                this.avatarUrl = "https://77qqup.com:442/img/wxgame/1b6474f6563845c4a5afd5b9a797c017.png";
//                this.fromid = "test001";
//            }
//            this.state = 1;
//            if(self.initcallback)
//                self.initcallback();
//        }
//    },
//

//
//    login: function(isSuccess, userInfo,callback)
//    {
//        this.logincallback = callback;
//        if(isSuccess)
//        {
//            if(!userInfo)
//                console.error("--------","userInfo is null");
//            this.userName = userInfo.userInfo.nickName;
//            this.power = 1;
//            this.avatarUrl = userInfo.userInfo.avatarUrl;
//            this.encryptedData = userInfo.encryptedData;
//            this.iv = userInfo.iv;
//            console.log('userInfo:', userInfo);
//        }
//        else
//        {
//            this.updatePower = true;
//        }
//
//        var self = this;
//        this.getOpenId(function(){
//            self.state = 1;
//            self.initdata();
//            console.log('----init end ----');
//        });
//    },
//
//    initdata: function()
//    {
//        if(this.state == 1)
//        {
//            var self = this;
//            this.sendRequest("init",{gameId:this.gameId,gameName:this.gameName,
//                channel:this.channel,openid:this.openid,userName:this.userName,power:this.power},function(res){
//                console.log("init:",res);
//                if(self.initcallback)
//                    self.initcallback();
//
//                //初始化成功上传分享来源获取金币
//                if(self.fromid && self.fromid.length>1)
//                {
//                    var data = {};
//                    if(self.channel == "sharegun")
//                        data.guninvitelist = self.openid;
//                    else
//                        data.invitelist = self.openid;
//
//                    var datas = JSON.stringify(data);
//                    self.sendRequest("uploaddatas",{gameId:self.gameId,openid:self.fromid,datas:datas},function(res){
//                        console.log("upload invitelist:",res);
//                    });
//                }
//
//            });
//            if(this.updatePower && this.power == 1)
//            {
//                this.updatePower = false;
//                this.sendRequest("power",{gameId:this.gameId,
//                    channel:this.channel,openid:this.openid,power:this.power},function(res){
//                    console.log("power:",res);
//                });
//            }
//
//            if(this.power == 1 && self.channel == "shareonline")
//            {
//                if(this.logincallback)
//                    this.logincallback();
//            }
//        }
//    },
//
//    open: function()
//    {
//        if(this.state == 1)
//        {
//            this.sendRequest("open",{gameId:this.gameId,channel:this.channel},function(res){
//                console.log("open:",res);
//            });
//        }
//    },
//    //支付统计
//    pay: function(money)
//    {
//        if(this.state == 1)
//        {
//            this.sendRequest("pay",{gameId:this.gameId,channel:this.channel,
//                openid:this.openid,money:money},function(res){
//                console.log("pay:",res);
//            });
//        }
//    },
//
//    //分享统计
//    share: function(isSuccess)
//    {
//        if(this.state == 1)
//        {
//            var shareNum = 0;
//            if(isSuccess)
//                shareNum = 1;
//            this.sendRequest("share",{gameId:this.gameId,channel:this.channel,
//                openid:this.openid,share:shareNum},function(res){
//                console.log("share:",res);
//            });
//        }
//    },
//
//    //事件统计
//    event: function(eventId)
//    {
//        if(this.state == 1)
//        {
//            this.sendRequest("event",{gameId:this.gameId,channel:this.channel,
//                openid:this.openid,eventId:eventId},function(res){
//                console.log("event:",res);
//            });
//        }
//    },
//
//    //获取控制数据
//    control: function(callback)
//    {
//        this.sendRequest("control",{gameId:this.gameId},function(res){
//            console.log("control:",res);
//            if(callback)
//                callback(res);
//        });
//    },
//
//    //获取用户数据
//    datas: function(callback)
//    {
//        if(this.state == 1)
//        {
//            this.sendRequest("datas",{gameId:this.gameId,openid:this.openid},function(res){
//                console.log("datas:",res);
//                if(callback)
//                    callback(res);
//            });
//        }
//    },
//
//    //上传用户数据  数据格式：json字符串 '{\"score\":100}'
//    uploaddatas: function(datas,callback)
//    {
//        if(this.state == 1)
//        {
//            this.httpPost("uploaddatas",{gameId:this.gameId,openid:this.openid,datas:datas},function(res){
//                console.log("uploaddatas:",res);
//                if(callback)
//                    callback(res);
//            });
//        }
//    },
//
//    getOpenId: function(callback)
//    {
//        var self = this;
//        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
//        {
//            wx.login({
//                success: function(res)
//                {
//                    console.log('login:', res);
//                    self.sendRequest("jscode2session",{gameId:self.gameId,gameSecret:self.secret,jsCode:res.code},function(r){
//                        if(r.state == 200)
//                        {
//                            var msg = JSON.parse(r.msg);
//                            self.session_key = msg.session_key;
//                            self.openid = msg.openid;
//
//                            console.log('openid:', self.openid);
//                            if(callback)
//                                callback();
//
//                            self.getUnionId(self.encryptedData,self.iv);
//                        }
//                        console.log('jscode2session:', r);
//                    });
//                }
//            });
//        }
//
//    },
//
//    getUnionId: function(encryptedData,iv,callback)
//    {
//        if(this.state == 1)
//        {
//            var self = this;
//            if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
//            {
//                self.httpPost("groupid",{encryptedData:encryptedData,sessionkey:self.session_key,iv:iv},function(r){
//                    if(r.state == 200)
//                    {
//                        var msg = r.data;
//                        console.log('unionId:', msg.unionId);
//                        self.unionId = msg.unionId;
//                        if(callback)
//                        {
//                            callback();
//                        }
//
//                        if(self.isupdateunionid)
//                        {
//                            self.updateUnionId();
//                        }
//                    }
//                    console.log('unionId:', r);
//                });
//            }
//        }
//    },
//
//    //获取群id
//    getGrpupId: function(encryptedData,iv,callback)
//    {
//        if(this.state == 1)
//        {
//            var self = this;
//            if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
//            {
//                self.httpPost("groupid",{encryptedData:encryptedData,sessionkey:self.session_key,iv:iv},function(r){
//                    if(r.state == 200)
//                    {
//                        var msg = r.data;
//                        var b = (msg == null || msg == "null") ? false : true;
//                        console.log('groupid:', msg.openGId);
//                        if(callback)
//                        {
//                            if(b == true)
//                            {
//                                callback(b,msg.openGId,msg.watermark.timestamp*1000);
//                            }
//                            else
//                            {
//                                callback(b);
//                            }
//                        }
//
//                    }
//                    console.log('groupid:', r);
//                });
//            }
//        }
//    },
//
//
//    sendRequest: function(path, data, handler){
//        var xhr = cc.loader.getXMLHttpRequest();
//        var params = "?";
//        for (var k in data) {
//            if (params != "?") {
//                params += "&";
//            }
//            params += k + "=" + data[k];
//        }
//        var requestURL = this.url + path + encodeURI(params);
//        console.log("RequestURL:" + requestURL);
//
//        xhr.open("GET", requestURL, true);
//
//        xhr.onreadystatechange = function () {
//            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
//                try {
//                    var ret = JSON.parse(xhr.responseText);
//                    if (handler !== null) {
//                        handler(ret);
//                    }
//                } catch (e) {
//                    console.log("sendRequest Err:" + e);
//                } finally {}
//            }
//        };
//        // note: In Internet Explorer, the timeout property may be set only after calling the open()
//        // method and before calling the send() method.
//        xhr.timeout = 5000; // 5 seconds for timeout
//        // var btoa = btoa("test:test");
//        var btoa = require('buffer').Buffer.from('test:test').toString('base64');
//        xhr.setRequestHeader("Authorization", "Basic " + btoa);
//        if (cc.sys.isNative) {
//            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
//        }
//        xhr.send();
//        return xhr;
//    },
//
//    httpPost: function (url, params, handler) {
//        var xhr = cc.loader.getXMLHttpRequest();
//        var requestURL = this.url + url;
//        console.log("RequestURL:" + requestURL);
//        xhr.onreadystatechange = function () {
//            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
//                try {
//                    var ret = JSON.parse(xhr.responseText);
//                    if (handler !== null) {
//                        handler(ret);
//                    }
//                } catch (e) {
//                    console.log("sendRequest Err:" + e);
//                } finally {}
//            }
//        };
//        xhr.open("POST", requestURL, true);
//        //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//        if (cc.sys.isNative) {
//            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
//        }
//
//        // note: In Internet Explorer, the timeout property may be set only after calling the open()
//        // method and before calling the send() method.
//        xhr.timeout = 5000;// 5 seconds for timeout
//
//        //var datas = "";
//        //var i = 0;
//        //for (var k in params) {
//        //    if (i != 0) {
//        //        datas += "&";
//        //    }
//        //    datas += k + "=" + params[k];
//        //    i++;
//        //}
//        //
//        //xhr.send(datas);
//        xhr.send(params);
//    },
//
//
//
