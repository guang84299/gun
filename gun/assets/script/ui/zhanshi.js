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
        this.node_zhanshi = this.node;
        this.node_zhanshi_guang = cc.find("bg/guang",this.node_zhanshi);
        this.node_zhanshi_zhanshivedio = cc.find("bg/zhanshivedio",this.node_zhanshi);
        this.node_zhanshi_vediostart = cc.find("bg/vediostart",this.node_zhanshi);
        this.node_zhanshi_vediostart_num = cc.find("num",this.node_zhanshi_vediostart);
        this.node_zhanshi_buy = cc.find("bg/buy",this.node_zhanshi);
        this.updateUI();
    },

    updateUI: function()
    {
        this.node_zhanshi_guang.stopAllActions();
        this.node_zhanshi_guang.runAction(cc.repeatForever(
            cc.rotateBy(1,180)
        ));

        if(storage.getStoragePlayer(10) == 1)
        {
            this.node_zhanshi_zhanshivedio.active = false;
            this.node_zhanshi_vediostart.active = false;
            this.node_zhanshi_buy.active = true;
        }
        else
        {
            if(storage.getStorageHasZhanShi() > 0)
            {
                this.node_zhanshi_zhanshivedio.active = false;
                this.node_zhanshi_vediostart.active = true;
                this.node_zhanshi_vediostart_num.getComponent("cc.Label").string = "剩余使用次数:"+storage.getStorageHasZhanShi();
            }
            else
            {
                this.node_zhanshi_zhanshivedio.active = true;
                this.node_zhanshi_vediostart.active = false;
            }
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
        if(data == "close_zhanshi")
        {
            if(!this.main.openfuhuo)
                this.main.wxQuanState(true);
            this.hide();
        }
        else if(data == "vediostart")
        {
            this.useZhanshiStart();
        }
        else if(data == "zhanshivedio")
        {
            this.main.wxVideoShow(3);
        }
        cc.log(data);
    },

    useZhanshiStart: function()
    {
         if(parseInt(this.main.GAME.score) > storage.getStorageScore())
            storage.setStorageScore(parseInt(this.main.GAME.score));
        storage.setStorageCoin(parseInt(storage.getStorageCoin()) + parseInt(this.main.GAME.coin));

        if(cc.isValid(this.main.node_fuhuo))
            this.main.node_fuhuo.hide();

        this.main.wxCloseFuhuo();

        this.main.GAME.currPlayerTmp = this.main.GAME.currPlayer;
        this.main.GAME.currPlayer = 9;
        this.main.GAME.useZhanShi = true;

        //storage.setStorageHasZhanShi(storage.getStorageHasZhanShi()-1);

        this.main.wxQuanState(false);
        this.main.again();
        this.hide();
    }
    
});
