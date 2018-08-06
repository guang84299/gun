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
        this.node_over_coin.getComponent("cc.Label").string = parseInt(this.main.GAME.coin);
        this.node_over_score.getComponent("cc.Label").string = parseInt(this.main.GAME.score);
        this.node_over_chaoyue.getComponent("cc.Label").string = "超过全国"+ this.main.getChaoyue2() +"的用户";
        cc.find("change/sp",this.node_over).color = this.main.ltcolor;
        cc.find("change/txt",this.node_over).color = this.main.ltcolor;
        cc.find("bg/playerbg/title",this.node_over).getComponent("cc.Label").string = this.main.getChaoyue3();
        cc.find("bg/playerbg/lv",this.node_over).getComponent("cc.Label").string = "LV-"+this.main.getChaoyue();
        cc.find("bg/playerbg/player",this.node_over).getComponent("cc.Sprite").spriteFrame = this.main.getChaoyue4();
        this.main.wxOverRank(Math.floor(this.main.GAME.score),this.main.GAME.currPlayer,this.main.GAME.currGun);


        if(this.main.GAME.useZhanShi)
        {
            this.main.GAME.useZhanShi = false;
            this.main.GAME.currPlayer = this.main.GAME.currPlayerTmp;
        }
        this.main.uploadData();
        this.main.updateDian();
        this.main.wxBannerHide();
        this.main.qianqista.event("ui_jiesuan");
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
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var query = "channel=sharechangemenu";
            var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            if(this.main.GAME.shares.changemenu_txt1 && this.main.GAME.shares.changemenu_pic1)
            {
                if(Math.random()>0.5)
                {
                    query = "channel=sharechangemenu_1";
                    title = this.main.GAME.shares.changemenu_txt1;
                    imageUrl = this.main.GAME.shares.changemenu_pic1;
                }
                else
                {
                    query = "channel=sharechangemenu_2";
                    title = this.main.GAME.shares.changemenu_txt2;
                    imageUrl = this.main.GAME.shares.changemenu_pic2;
                }
            }

            wx.shareAppMessage({
                query:query,
                title: title,
                imageUrl: imageUrl,
                success: function(res)
                {
                    this.main.qianqista.share(true);
                    cc.log(res);
                },
                fail: function()
                {
                    this.main.qianqista.share(false);
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

        var pos = cc.v2((bg.x-w/2)*sc,(sharedCanvas.height-(bg.y-this.node_main_bottom.y)*sc) - h*sc/2);

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
