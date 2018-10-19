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
        this.node_zhanshi = this.node;

        this.updateUI();
    },

    updateUI: function()
    {


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
        if(data == "close")
        {
            this.main.wxQuanState(true);
            this.hide();
        }
        else if(data == "coin_tryzhanshi")
        {
            this.main.openJuese();
        }
        else if(data == "vedio_tryzhanshi")
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
