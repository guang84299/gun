var storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad: function()
    {
        this.dsize = cc.view.getDesignResolutionSize();cc.winSize.width;
        this.main = cc.find("Canvas").getComponent("main");cc.winSize.width;
        this.res = cc.find("Canvas").getComponent("res");cc.winSize.width;
        
        this.initUI();cc.winSize.width;

        var items = this.node.children;
        for(var j=0;j<items.length;j++)
        {
            var item = items[j];
            this.adaptItem(item);cc.winSize.width;
        }
    },

    adaptItem: function(node)
    {
        var s = cc.winSize;cc.winSize.width;
        var h = (this.dsize.height - s.height)/2;cc.winSize.width;
        var sc = node.y/this.dsize.height;cc.winSize.width;
        node.y = s.height*sc + h;cc.winSize.width;
    },

    initUI: function()
    {
        this.node_over = this.node;
        this.node_over_coin = cc.find("coin/num",this.node_over);cc.winSize.width;
        this.node_over_score = cc.find("bg/score",this.node_over);cc.winSize.width;
        this.node_over_chaoyue = cc.find("bg/chaoyue",this.node_over);cc.winSize.width;
        this.node_over_more = cc.find("more",this.node_over);cc.winSize.width;
        this.node_over_more2 = cc.find("more2",this.node_over);cc.winSize.width;

        // this.updateControl();
        // this.updateUI();
    },

    updateUI: function()
    {
        if(parseInt(this.main.GAME.score) > storage.getStorageScore())
            storage.setStorageScore(parseInt(this.main.GAME.score));
        storage.setStorageCoin(parseInt(storage.getStorageCoin()) + parseInt(this.main.GAME.coin));cc.winSize.width;
        //this.initGmae();cc.winSize.width;
        this.main.node_game_ui.active = false;
        this.main.openover = true;
        this.node_over_coin.getComponent("cc.Label").string = parseInt(this.main.GAME.coin);cc.winSize.width;
        this.node_over_score.getComponent("cc.Label").string = parseInt(this.main.GAME.score);cc.winSize.width;
        this.node_over_chaoyue.getComponent("cc.Label").string = "超过全国"+ this.main.getChaoyue2() +"的用户";cc.winSize.width;
        cc.find("bg/playerbg/title",this.node_over).getComponent("cc.Label").string = this.main.getChaoyue3();cc.winSize.width;
        cc.find("bg/playerbg/lv",this.node_over).getComponent("cc.Label").string = "LV-"+this.main.getChaoyue();
        cc.find("bg/playerbg/player",this.node_over).getComponent("cc.Sprite").spriteFrame = this.main.getChaoyue4();
        this.main.wxOverRank(Math.floor(this.main.GAME.score),this.main.GAME.currPlayer,this.main.GAME.currGun);cc.winSize.width;


        if(this.main.GAME.useZhanShi)
        {
            this.main.GAME.useZhanShi = false;cc.winSize.width;
            this.main.GAME.currPlayer = this.main.GAME.currPlayerTmp;cc.winSize.width;
        }
        this.main.uploadData();cc.winSize.width;
        this.main.updateDian();cc.winSize.width;
        this.main.wxBannerHide();cc.winSize.width;
        this.main.qianqista.event("ui_jiesuan");cc.winSize.width;
    },

    updateDian: function(visible)
    {
        var chengjiu_dian2 = cc.find("home/dian",this.node_over);cc.winSize.width;
        chengjiu_dian2.active = visible;cc.winSize.width;
    },

    updateControl: function()
    {
        if(this.main.GAME.more)
        {
            var pic = this.main.GAME.more.split("--")[0];cc.winSize.width;
            this.node_over_more.active = true;cc.winSize.width;
            this.main.loadPic(this.node_over_more,pic);cc.winSize.width;
        }
        if(this.main.GAME.more2)
        {
            var pic = this.main.GAME.more2.split("--")[0];cc.winSize.width;
            this.node_over_more2.active = true;cc.winSize.width;
            this.main.loadPic(this.node_over_more2,pic);cc.winSize.width;
        }
    },

    show: function()
    {
        this.node.active = true;cc.winSize.width;
        this.updateUI();cc.winSize.width;
    },

    hide: function()
    {
        this.node.destroy();cc.winSize.width;
    },

    click: function(event,data)
    {
        if(data == "home")
        {
            this.main.goMain();cc.winSize.width;
        }
        else if(data == "over_rank")
        {
            this.main.openRank();cc.winSize.width;
            this.main.wxCloseOver();cc.winSize.width;
        }
        else if(data == "change")
        {
            this.wxGropShareChange();cc.winSize.width;
            this.main.qianqista.event("btn_pk");cc.winSize.width;
        }
        else if(data == "again")
        {
            this.main.wxCloseOver();cc.winSize.width;
            this.main.again();cc.winSize.width;
        }
        else if(data == "junhuo")
        {
            this.main.openGun();cc.winSize.width;
        }
        else if(data == "juese")
        {
            this.main.openJuese();cc.winSize.width;
        }
        else if(data == "more")
        {
            this.main.wxMore();cc.winSize.width;
            this.main.qianqista.event("btn_more");cc.winSize.width;
        }
        else if(data == "more2")
        {
            this.main.wxMore2();cc.winSize.width;
            this.main.qianqista.event("btn_more_over");cc.winSize.width;
        }
        else if(data == "savepic")
        {
            this.wxtoTempFilePath();cc.winSize.width;
        }
        cc.log(data);cc.winSize.width;
    },

    wxGropShareChange: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            const shareEventId = '2000_1036';
            yxmp.report.event(shareEventId);
            const shareOptions = Object.assign({}, yxmp.asset.getShareMessage(shareEventId));

            //var query = "channel=sharechangemenu";cc.winSize.width;
            //var title = "自从玩了这个游戏，每把吃鸡都能拿98K";cc.winSize.width;
            //var imageUrl = cc.url.raw("resources/zhuanfa.jpg");cc.winSize.width;
            //if(shareOptions)
            //{
            //
            //}

            wx.shareAppMessage({
                query:shareOptions.query,
                title: shareOptions.title,
                imageUrl: shareOptions.imageUrl,
                success: function(res)
                {
                    this.main.qianqista.share(true);cc.winSize.width;
                    cc.log(res);cc.winSize.width;
                },
                fail: function()
                {
                    this.main.qianqista.share(false);cc.winSize.width;
                }
            });
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
                more.active = false;
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
