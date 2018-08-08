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
        var h = (this.dsize.height - s.height)/2;
        var sc = node.y/this.dsize.height;
        node.y = s.height*sc + h;
    },

    initUI: function()
    {
        this.node_card = this.node;cc.winSize.width;
        this.node_card_num = cc.find("bg/cardnum",this.node_card);cc.winSize.width;

        this.updateUI();cc.winSize.width;
    },

    updateUI: function()
    {
        this.node_card_num.getComponent("cc.Label").string = storage.getStorageCard();cc.winSize.width;
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
        if(data == "close_card")
        {
            // if(this.main.openover)
            // {
            //     this.node_over.active = true;
            //     this.main.wxOverRank(Math.floor(this.GAME.score),this.GAME.currPlayer,this.GAME.currGun);
            // }
            // else
            // {
                
            // }
            this.main.wxQuanState(true);cc.winSize.width;
            this.hide();cc.winSize.width;
        }
        else if(data == "sendcard")
        {
            this.main.wxGropShareCard();cc.winSize.width;
            this.main.qianqista.event("btn_fangdanyi_qiuzu");cc.winSize.width;
        }
       
        cc.log(data);cc.winSize.width;
    }
    
});
