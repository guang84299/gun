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

        var items = this.node.children;cc.winSize.width;
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
        var sc = node.y/this.dsize.height;cc.winSize.width;
        node.y = s.height*sc + h;cc.winSize.width;
    },

    initUI: function()
    {
        this.node_zhanshi = this.node;cc.winSize.width;
        this.node_zhanshi_guang = cc.find("bg/guang",this.node_zhanshi);cc.winSize.width;
        this.node_zhanshi_zhanshivedio = cc.find("bg/zhanshivedio",this.node_zhanshi);cc.winSize.width;
        this.node_zhanshi_vediostart = cc.find("bg/vediostart",this.node_zhanshi);cc.winSize.width;

        this.updateUI();cc.winSize.width;
    },

    updateUI: function()
    {
        this.node_zhanshi_guang.stopAllActions();cc.winSize.width;
        this.node_zhanshi_guang.runAction(cc.repeatForever(
            cc.rotateBy(1,180)
        ));cc.winSize.width;
        if(storage.getStorageHasZhanShi() == 1)
        {
            this.node_zhanshi_zhanshivedio.active = false;cc.winSize.width;
            this.node_zhanshi_vediostart.active = true;cc.winSize.width;
        }
        else
        {
            this.node_zhanshi_zhanshivedio.active = true;cc.winSize.width;
            this.node_zhanshi_vediostart.active = false;cc.winSize.width;
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
        if(data == "close_zhanshi")
        {
            if(!this.main.openfuhuo)
                this.main.wxQuanState(true);cc.winSize.width;
            this.hide();cc.winSize.width;
        }
        else if(data == "vediostart")
        {
            this.useZhanshiStart();cc.winSize.width;
        }
        else if(data == "zhanshivedio")
        {
            this.main.wxVideoShow(3);cc.winSize.width;
        }
        cc.log(data);cc.winSize.width;
    },

    useZhanshiStart: function()
    {
         if(parseInt(this.main.GAME.score) > storage.getStorageScore())
            storage.setStorageScore(parseInt(this.main.GAME.score));cc.winSize.width;
        storage.setStorageCoin(parseInt(storage.getStorageCoin()) + parseInt(this.main.GAME.coin));cc.winSize.width;
        this.main.node_over.active = false;cc.winSize.width;
        if(cc.isValid(this.main.node_fuhuo))
            this.main.node_fuhuo.hide();cc.winSize.width;

        this.main.wxCloseFuhuo();cc.winSize.width;

        this.main.GAME.currPlayerTmp = this.main.GAME.currPlayer;cc.winSize.width;
        this.main.GAME.currPlayer = 9;
        this.main.GAME.useZhanShi = true;
        storage.setStorageHasZhanShi(0);cc.winSize.width;
        this.main.wxQuanState(false);cc.winSize.width;
        this.main.again();cc.winSize.width;
        this.hide();cc.winSize.width;
    },
    
});
