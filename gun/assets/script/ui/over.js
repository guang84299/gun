var storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad: function()
    {
        this.dsize = new cc.size(720, 1584);
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

        this.node_over_icon = cc.find("icon",this.node_over);
        this.node_over_nick = cc.find("nick",this.node_over);
        this.node_over_no = cc.find("no",this.node_over);

        this.updateControl();
        // this.updateUI();
    },

    updateUI: function()
    {
        if(parseInt(this.main.GAME.score) > storage.getStorageScore())
            storage.setStorageScore(parseInt(this.main.GAME.score));
        storage.setStorageCoin(parseInt(storage.getStorageCoin()) + parseInt(this.main.GAME.coin));
        //this.initGmae();
        this.main.node_game_ui.active = false;
        this.main.openover = true;
        this.node_over_coin.getComponent("cc.Label").string = parseInt(storage.getStorageCoin());
        this.node_over_score.getComponent("cc.Label").string = parseInt(this.main.GAME.score);
        this.node_over_chaoyue.getComponent("cc.Label").string = "More than "+ this.main.getChaoyue2() +" of users nationwide";
        cc.find("change/sp",this.node_over).color = this.main.ltcolor;
        cc.find("change/txt",this.node_over).color = this.main.ltcolor;
        cc.find("bg/playerbg/title",this.node_over).getComponent("cc.Label").string = this.main.getChaoyue3();
        cc.find("bg/playerbg/lv",this.node_over).getComponent("cc.Label").string = "LV-"+this.main.getChaoyue();
        cc.find("bg/playerbg/player",this.node_over).getComponent("cc.Sprite").spriteFrame = this.main.getChaoyue4();
        cc.find("bg/coin/num",this.node_over).getComponent("cc.Label").string =  parseInt(this.main.GAME.coin);
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
        this.main.uploadData();
        this.main.updateDian();
        this.main.wxBannerHide();
        this.main.qianqista.event("ui_jiesuan");
    },

    wxOverRank: function(score)
    {
        //var self = this;
        //if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS || cc.sys.myweb)
        //{
        //    this.main.wxUploadScore(score);
        //
        //    FBInstant.getLeaderboardAsync('wscore')
        //        .then(function(leaderboard) {
        //            return leaderboard.getConnectedPlayerEntriesAsync();
        //        })
        //        .then(function(entries) {
        //            var chaoyue = null;
        //            for(var i=0; i < entries.length; ++i) {
        //                var rd = entries[i];
        //
        //                if(rd.getPlayer().getID() != FBInstant.player.getID())
        //                {
        //                    if(score < rd.getScore())
        //                    {
        //                        chaoyue = rd;
        //                        break;
        //                    }
        //                }
        //            }
        //
        //            if(chaoyue)
        //            {
        //                self.node_over_icon.active = true;
        //                self.node_over_nick.active = true;
        //                self.node_over_no.active = false;
        //
        //
        //                self.main.loadPic(self.node_over_icon,chaoyue.getPlayer().getPhoto());
        //                self.node_over_nick.getComponent("cc.Label").string = chaoyue.getPlayer().getName();
        //            }
        //            else
        //            {
        //                self.node_over_icon.active = false;
        //                self.node_over_nick.active = false;
        //                self.node_over_no.active = true;
        //            }
        //        });
        //}
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
    },

    hide: function()
    {
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
        else if(data == "savepic")
        {
            this.wxtoTempFilePath();
        }
        cc.log(data);
    },

    wxGropShareChange: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS || cc.sys.myweb)
        {
            this.main.share(function(res){
                if(res)
                {
                    self.res.showToast("share success!");
                }
                else{
                    self.res.showToast("share fail！");
                }
            });

            //FBInstant.shareAsync({
            //    intent: 'REQUEST',
            //    image: this.res.getBase64SharePic(),
            //    text: 'I am a sharpshooter! I see，I shot，I win.',
            //    data: { channel: 'sharechangemenu',fromid:''+FBInstant.player.getID() }
            //}).then(function() {
            //    // continue with the game.
            //    self.res.showToast("share success!");
            //
            //    self.main.qianqista.share(true);
            //}).catch(function (error) {
            //    self.main.qianqista.share(false);
            //    self.res.showToast("share fail！");
            //});



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
