var storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad: function()
    {
        this.dsize = cc.view.getDesignResolutionSize();
        this.main = cc.find("Canvas").getComponent("main");
        this.res = cc.find("Canvas").getComponent("res");
        
        this.initUI();

        var items = this.node.children;
        for(var j=0;j<items.length;j++)
        {
            var item = items[j];
            this.adaptItem(item);
        }
    },

    adaptItem: function(node)
    {
        var s = cc.winSize;
        var h = (this.dsize.height - s.height)/2;
        var sc = node.y/this.dsize.height;
        node.y = s.height*sc + h;
    },

    initUI: function()
    {
        this.node_over = this.node;
        this.node_over_coin = cc.find("coin/num",this.node_over);
        this.node_over_score = cc.find("bg/score",this.node_over);
        this.node_over_chaoyue = cc.find("bg/chaoyue",this.node_over);
        this.node_over_more = cc.find("more",this.node_over);
        this.node_over_more2 = cc.find("more2",this.node_over);

        this.node_over_bgcoin = cc.find("bg/coin/num",this.node_over);
        this.node_over_iconme = cc.find("bg/iconme",this.node_over);

        this.node_over_icon = cc.find("bg/icon",this.node_over);
        this.node_over_nick = cc.find("bg/nick",this.node_over);
        this.node_over_no = cc.find("bg/no",this.node_over);

        this.node_over_libao = cc.find("libao",this.node_over);
        this.node_over_libao.active = this.main.node_main_libao.active;

        this.node_over_shouyix2 = cc.find("shouyix2",this.node_over);
        this.node_over_shouyix2_bg = cc.find("bg",this.node_over_shouyix2);
        this.node_over_shouyix2_x2 = cc.find("bg/x2",this.node_over_shouyix2);
        this.node_over_shouyix2_coin = cc.find("bg/shouyix2coin",this.node_over_shouyix2);
        this.node_over_shouyix2_str = cc.find("bg/str",this.node_over_shouyix2);
        this.node_over_shouyix2_str_time = this.node_over_shouyix2_str.getComponent("cc.Label");
        this.node_over_shouyix2.active = this.main.node_main_shouyix2.active;
        if(this.node_over_shouyix2.active)
            this.updateShouYi();

        this.updateControl();
        // this.updateUI();
    },

    updateUI: function()
    {
        if(parseInt(this.main.GAME.score) > storage.getStorageScore())
            storage.setStorageScore(parseInt(this.main.GAME.score));
        storage.setStorageCoin(parseInt(storage.getStorageCoin()) + parseInt(this.main.GAME.coin));
        if(this.main.GAME.isShouYix2)
            storage.setStorageCoin(parseInt(storage.getStorageCoin()) + parseInt(this.main.GAME.coin));
        //this.initGmae();
        this.main.node_game_ui.active = false;
        this.main.openover = true;
        this.node_over_coin.getComponent("cc.Label").string = storage.getStorageCoin();
        this.node_over_bgcoin.getComponent("cc.Label").string = parseInt(this.main.GAME.coin);
        this.node_over_score.getComponent("cc.Label").string = parseInt(this.main.GAME.score);
        //this.node_over_chaoyue.getComponent("cc.Label").string = "超过全国"+ this.main.getChaoyue2() +"的用户";
        cc.find("change/sp",this.node_over).color = this.main.ltcolor;
        cc.find("change/txt",this.node_over).color = this.main.ltcolor;

        this.main.loadPic(this.node_over_iconme,this.main.qianqista.avatarUrl);
        //cc.find("bg/playerbg/title",this.node_over).getComponent("cc.Label").string = this.main.getChaoyue3();
        //cc.find("bg/playerbg/lv",this.node_over).getComponent("cc.Label").string = "LV-"+this.main.getChaoyue();
        //cc.find("bg/playerbg/player",this.node_over).getComponent("cc.Sprite").spriteFrame = this.main.getChaoyue4();
        this.main.wxOverRank(Math.floor(this.main.GAME.score),this.main.GAME.currPlayer,this.main.GAME.currGun);
        this.wxOverRank(Math.floor(this.main.GAME.score));

        if(this.main.GAME.useZhanShi)
        {
            if(storage.getStorageHasZhanShi() == 0)
            {
                this.main.GAME.useZhanShi = false;
                this.main.GAME.currPlayer = this.main.GAME.currPlayerTmp;
                storage.setStorageHasZhanShi(-1);
            }
        }

        if(this.main.GAME.useLiBao)
        {
            if(storage.getStorageLiBaoNum() == 0)
            {
                this.main.GAME.useLiBao = false;
                this.main.GAME.currPlayer = this.main.GAME.currPlayerTmp;
                this.main.GAME.currGun = this.main.GAME.currGunTmp;
                storage.setStorageLiBaoNum(-1);
                this.main.node_main_libao.active = false;
            }
        }

        this.main.uploadData();
        this.main.updateDian();
        this.main.wxBannerHide();
        this.main.qianqista.event("ui_jiesuan");

        //结算弹出收益双倍框
        var boxnum = cc.sys.localStorage.getItem("shouyix2box");
        boxnum = boxnum ? boxnum : 0;
        if(boxnum == 0)
        {
            cc.sys.localStorage.setItem("shouyix2box",1);
            this.main.openShouYix2();
        }


        if(cc.sys.isIOS)
        {
            cc.find("change",this.node_over).active = false;
            cc.find("juese",this.node_over).x = cc.winSize.width/2-100;
            cc.find("junhuo",this.node_over).x = cc.winSize.width/2+100;
        }
    },

    wxOverRank: function(score)
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            this.main.wxUploadScore(score);

            var attr = "score";//使用哪一种上报数据做排行，可传入score，a1，a2等
            var order = 2;     //排序的方法：[ 1: 从大到小(单局)，2: 从小到大(单局)，3: 由大到小(累积)]
            var rankType = 0; //要查询的排行榜类型，0: 好友排行榜，1: 群排行榜，2: 讨论组排行榜，3: C2C二人转 (手Q 7.6.0以上支持)
            // 必须配置好周期规则后，才能使用数据上报和排行榜功能
            BK.QQ.getRankListWithoutRoom(attr, order, rankType, function(errCode, cmd, data) {
                BK.Script.log(1,1,"-------wxOverRank callback  cmd" + cmd + " errCode:" + errCode + "  data:" + JSON.stringify(data));
                // 返回错误码信息
                if (errCode !== 0) {
                    BK.Script.log(1,1,'------获取排行榜数据失败!错误码：' + errCode);
                    return;
                }
                // 解析数据
                if (data) {
                    var chaoyue = null;
                    for(var i=0; i < data.data.ranking_list.length; ++i) {
                        var rd = data.data.ranking_list[i];
                        // rd 的字段如下:
                        //var rd = {
                        //    url: '',            // 头像的 url
                        //    nick: '',           // 昵称
                        //    score: 1,           // 分数
                        //    selfFlag: false,    // 是否是自己
                        //};
                        if(!rd.selfFlag)
                        {
                            if(score < rd.score)
                            {
                                chaoyue = rd;
                                break;
                            }
                        }
                    }
                    if(!cc.isValid(self))
                    {
                        return;
                    }
                    if(chaoyue)
                    {
                        self.node_over_icon.active = true;
                        self.node_over_nick.active = true;
                        self.node_over_no.active = false;


                        self.main.loadPic(self.node_over_icon,chaoyue.url);
                        self.node_over_nick.getComponent("cc.Label").string = storage.getLabelStr(chaoyue.nick,18);
                    }
                    else
                    {
                        self.node_over_icon.active = false;
                        self.node_over_nick.active = false;
                        self.node_over_no.active = true;
                    }

                }
            });
        }
    },

    updateDian: function(visible)
    {
        var chengjiu_dian2 = cc.find("home/dian",this.node_over);
        chengjiu_dian2.active = visible;
    },

    updateControl: function()
    {
        if(this.main.GAME.more)
        {
            var pic = this.main.GAME.more.split("--")[0];
            this.node_over_more.active = true;
            this.main.loadPic(this.node_over_more,pic);
        }
        if(this.main.GAME.more2)
        {
            var pic = this.main.GAME.more2.split("--")[0];
            this.node_over_more2.active = true;
            this.main.loadPic(this.node_over_more2,pic);
        }
    },

    show: function()
    {
        this.node.active = true;
        this.updateUI();
        this.main.wxBannerShow();
    },

    hide: function()
    {
        this.main.wxBannerHide();
        this.node.destroy();
    },

    click: function(event,data)
    {
        if(data == "home")
        {
            if(this.main.GAME.useZhanShi)
            {
                this.main.GAME.useZhanShi = false;
                this.main.GAME.currPlayer = this.main.GAME.currPlayerTmp;
            }

            if(this.main.GAME.useLiBao)
            {
                this.main.GAME.useLiBao = false;
                this.main.GAME.currPlayer = this.main.GAME.currPlayerTmp;
                this.main.GAME.currGun = this.main.GAME.currGunTmp;
            }
            this.main.goMain();
        }
        else if(data == "over_rank")
        {
            this.main.openRank();
            this.main.wxCloseOver();
        }
        else if(data == "change")
        {
            this.wxGropShareChange();
            this.main.qianqista.event("btn_pk");
        }
        else if(data == "again")
        {
            this.main.wxCloseOver();
            if(storage.getStorageHasZhanShi() == -1)
            {
                storage.setStorageHasZhanShi(0);
                this.main.goMain();
                this.main.openTryzhanshi();
            }
            else
            this.main.again();
        }
        else if(data == "junhuo")
        {
            this.main.openGun();
        }
        else if(data == "juese")
        {
            this.main.openJuese();
        }
        else if(data == "more")
        {
            this.main.wxMore();
            this.main.qianqista.event("btn_more");
        }
        else if(data == "more2")
        {
            this.main.wxMore2();
            this.main.qianqista.event("btn_more_over");
        }
        else if(data == "libao")
        {
            this.main.openLiBao();
        }
        else if(data == "shouyix2")
        {
            this.main.wxVideoShow(10);
        }

        cc.log(data);
    },

    updateShouYi: function()
    {
        this.node_over_shouyix2.active = true;
        var time = storage.getStorageShouYiDt();
        if(time > 24*60*60*1000)
        {
            this.node_over_shouyix2.getComponent("cc.Button").interactable = true;
            this.node_over_shouyix2_bg.color = cc.color(255,255,255);
            this.node_over_shouyix2_x2.color = cc.color(255,255,255);
            this.node_over_shouyix2_coin.active = true;
            this.node_over_shouyix2_str.active = false;
        }
        else if(time <= 24*60*60*1000 && time >= 2*60*60*1000)
        {
            this.node_over_shouyix2.getComponent("cc.Button").interactable = false;
            this.node_over_shouyix2_bg.color = cc.color(160,160,160);
            this.node_over_shouyix2_x2.color = cc.color(160,160,160);
            this.node_over_shouyix2_coin.active = false;
            this.node_over_shouyix2_str.active = true;
            this.node_over_shouyix2_str_time.string = "明天再来";
        }
        else if(time < 2*60*60*1000 && time >= 0)
        {
            this.node_over_shouyix2.getComponent("cc.Button").interactable = false;
            this.node_over_shouyix2_bg.color = cc.color(160,160,160);
            this.node_over_shouyix2_x2.color = cc.color(160,160,160);
            this.node_over_shouyix2_coin.active = false;
            this.node_over_shouyix2_str.active = true;
            this.node_over_shouyix2_str_time.string = "2:00:00";
        }
    },

    updateShouyix2Time: function(time)
    {
        this.node_over_shouyix2_str_time.string = time;
    },

    wxGropShareChange: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var info = {};
            info.channel = "sharechangemenu";
            var query = JSON.stringify(info);
            var title = "5W悬赏金，助你成为最牛神枪手！";
            var imageUrl = "http://www.qiqiup.com/gun.gif";
            var shareInfo = {
                summary:title,          //QQ聊天消息标题
                picUrl:imageUrl,               //QQ聊天消息图片
                extendInfo:query,    //QQ聊天消息扩展字段
            };

            //BK.QQ.share(shareInfo, function (retCode, shareDest, isFirstShare) {
            //    BK.Script.log(1, 1, "retCode:" + retCode + " shareDest:" + shareDest + " isFirstShare:" + isFirstShare);
            //    if (retCode == 0) {
            //        BK.Script.log(1, 1, "分享成功：" + retCode);
            //        self.main.qianqista.share(true);
            //    }
            //    else {
            //        BK.Script.log(1, 1, "分享失败" + retCode);
            //        self.main.qianqista.share(false);
            //    }
            //});

            BK.Share.share({
                qqImgUrl: imageUrl,
                summary: title,
                extendInfo: query,
                success: function(succObj){
                    BK.Console.log('Waaaah! share success', succObj.code, JSON.stringify(succObj.data));

                    self.main.qianqista.share(true);
                },
                fail: function(failObj){
                    BK.Console.log('Waaaah! share fail', failObj.code, JSON.stringify(failObj.msg));

                    self.main.qianqista.share(false);
                },
                complete: function(){
                    BK.Console.log('Waaaah! share complete');
                }
            });



            //var query = "channel=sharechangemenu";
            //var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            //var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            //if(this.main.GAME.shares.changemenu_txt1 && this.main.GAME.shares.changemenu_pic1)
            //{
            //    if(Math.random()>0.5)
            //    {
            //        query = "channel=sharechangemenu_1";
            //        title = this.main.GAME.shares.changemenu_txt1;
            //        imageUrl = this.main.GAME.shares.changemenu_pic1;
            //    }
            //    else
            //    {
            //        query = "channel=sharechangemenu_2";
            //        title = this.main.GAME.shares.changemenu_txt2;
            //        imageUrl = this.main.GAME.shares.changemenu_pic2;
            //    }
            //}
            //
            //wx.shareAppMessage({
            //    query:query,
            //    title: title,
            //    imageUrl: imageUrl,
            //    success: function(res)
            //    {
            //        this.main.qianqista.share(true);
            //        cc.log(res);
            //    },
            //    fail: function()
            //    {
            //        this.main.qianqista.share(false);
            //    }
            //});
        }

    },

    wxtoTempFilePath: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var self = this;

            var bg = cc.find("bg",this.node_over);
            var more = cc.find("more",this.node_over);
            var savepic = cc.find("savepic",bg);
            var ma = cc.find("ma",bg);
            savepic.active = false;
            ma.active = true;
            more.active = false;
            this.main.node_game_ui.active = false;



            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.callFunc(function(){
                    self.wxtoTempFilePath2();
                })
            ));


        }
    },

    wxtoTempFilePath2: function()
    {
        var self = this;

        var canvas = cc.game.canvas;

        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        var sc = canvas.width/this.dsize.width;

        var bg = cc.find("bg",this.node_over);
        var more = cc.find("more",this.node_over);
        var savepic = cc.find("savepic",bg);
        var ma = cc.find("ma",bg);

        var w = bg.width;
        var h = bg.height;

        var pos = cc.v2((bg.x-w/2)*sc,(sharedCanvas.height-(bg.y-this.main.node_main_bottom.y)*sc) - h*sc/2);

        canvas.toTempFilePath({
            x: pos.x,
            y: pos.y,
            width: w*sc,
            height: h*sc,
            destWidth: w*1.5,
            destHeight: h*1.5,
            fileType: "png",
            success: function(res){
                savepic.active = true;
                ma.active = false;
                more.active = true;
                self.main.node_game_ui.active = true;
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function(){
                        self.res.showToast("保存成功");
                    }
                });
                //wx.shareAppMessage({
                //    title: "自从玩了这个游戏，每把吃鸡都能拿98K",
                //    imageUrl: res.tempFilePath
                //})
            }
        });
    }
    
});
