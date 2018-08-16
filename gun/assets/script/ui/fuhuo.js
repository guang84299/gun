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
        var s = cc.winSize;
        var h = (this.dsize.height - s.height)/2;cc.winSize.width;
        var sc = node.y/this.dsize.height;
        node.y = s.height*sc + h;
    },

    initUI: function()
    {
        this.node_fuhuo = this.node;
        this.node_fuhuo_share = cc.find("fuhuo_share",this.node_fuhuo);cc.winSize.width;
        this.node_fuhuo_coin = cc.find("coin/num",this.node_fuhuo);cc.winSize.width;
        this.node_fuhuo_score = cc.find("score",this.node_fuhuo);cc.winSize.width;
        this.node_fuhuo_fu_coin = cc.find("fuhuo_coin",this.node_fuhuo_share);cc.winSize.width;
        this.node_fuhuo_fu_video = cc.find("fuhuo_video",this.node_fuhuo_share);cc.winSize.width;
        this.node_fuhuo_fu_xuming = cc.find("fuhuo_xuming",this.node_fuhuo_share);cc.winSize.width;
        this.node_fuhuo_guang = cc.find("zhanshibg/guang",this.node_fuhuo);cc.winSize.width;

    },

    updateUI: function()
    {
        this.main.node_game_ui.active = false;
        this.node_fuhuo_guang.stopAllActions();cc.winSize.width;
        this.node_fuhuo_guang.runAction(cc.repeatForever(
            cc.rotateBy(1,180)
        ));
        this.node_fuhuo_coin.getComponent("cc.Label").string = Math.floor(this.main.GAME.coin);cc.winSize.width;
        this.node_fuhuo_score.getComponent("cc.Label").string = parseInt(this.main.GAME.score);cc.winSize.width;
        this.node_fuhuo_fu_coin.getComponent("cc.Button").interactable = this.main.GAME.playerfuhuo;cc.winSize.width;
        this.node_fuhuo_fu_video.getComponent("cc.Button").interactable = this.main.GAME.playerfuhuovideo;cc.winSize.width;
        if(this.main.GAME.playerfuhuo)
        {
            this.node_fuhuo_fu_coin.color = cc.color(255,255,255);
            this.node_fuhuo_fu_xuming.color = cc.color(255,255,255);
        }
        else
        {
            this.node_fuhuo_fu_coin.color = cc.color(161,161,161);cc.winSize.width;
            this.node_fuhuo_fu_xuming.color = cc.color(161,161,161);
        }
        if(this.main.GAME.playerfuhuovideo)
            this.node_fuhuo_fu_video.color = cc.color(255,255,255);
        else
            this.node_fuhuo_fu_video.color = cc.color(161,161,161);cc.winSize.width;

        var date = new Date();
        var stringtime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        var time1 = stringtime + " " + this.main.GAME.xuming.split("-")[0] + ":00";
        var time2 = stringtime + " " + this.main.GAME.xuming.split("-")[1] + ":00";
        var timestamp1 = (new Date(Date.parse(time1.replace(/-/g,"/")))).getTime();
        var timestamp2 = (new Date(Date.parse(time2.replace(/-/g,"/")))).getTime();
        if(date.getTime()>timestamp1 && date.getTime() < timestamp2)
        {
            this.node_fuhuo_fu_xuming.active = true;cc.winSize.width;
            this.node_fuhuo_fu_coin.active = false;cc.winSize.width;
            this.node_fuhuo_fu_xuming.getComponent("cc.Button").interactable = this.main.GAME.playerfuhuo;
        }
        else
        {
            this.node_fuhuo_fu_xuming.active = false;cc.winSize.width;
            this.node_fuhuo_fu_coin.active = true;cc.winSize.width;
        }
        this.main.wxFuhuoRank(Math.floor(this.main.GAME.score),this.main.GAME.currPlayer,this.main.GAME.currGun);
        this.main.wxBannerShow();
    },

    show: function()
    {
        this.node.active = true;
        this.updateUI();cc.winSize.width;
        this.main.openfuhuo = true;
    },

    hide: function()
    {
        this.node.destroy();cc.winSize.width;
        this.main.openfuhuo = false;
    },

    click: function(event,data)
    {
        if(data == "zhanshi")
        {
            this.main.openzhanshi();cc.winSize.width;
        }
        else if(data == "fuhuo_share")
        {
            this.wxGropShareFuhuo();cc.winSize.width;
            this.main.qianqista.event("fuhuo_coin");cc.winSize.width;
            
        }
        else if(data == "fuhuo_video")
        {
            //this.res.showToast("该功能还未开启！");cc.winSize.width;
            this.main.wxVideoShow(2);
            this.main.qianqista.event("fuhuo_video");
        }
        else if(data == "fuhuo_xuming")
        {
            this.main.openXuming();cc.winSize.width;
        }
        else if(data == "skip")
        {
            this.main.skip();cc.winSize.width;
            this.hide();cc.winSize.width;
        }
        cc.log(data);cc.winSize.width;
    },

    wxGropShareFuhuo: function()
    {
        var coinnum = storage.getStorageCoin();cc.winSize.width;
        if(coinnum>=100)
        {
            coinnum = parseInt(coinnum) - 100;cc.winSize.width;
            storage.setStorageCoin(coinnum);
            this.main.fuhuo(false,true,false);cc.winSize.width;
            this.main.uploadData();
            this.hide();cc.winSize.width;
        }
        else
        {
            this.main.openCoinNode();
        }
    },
    
});
