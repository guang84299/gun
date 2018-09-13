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
        this.node_card = this.node;
        this.node_card_num = cc.find("bg/cardnum",this.node_card);

        this.updateUI();
    },

    updateUI: function()
    {
        this.node_card_num.getComponent("cc.Label").string = storage.getStorageCard();
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
            this.main.wxQuanState(true);
            this.hide();
        }
        else if(data == "sendcard")
        {
            //this.main.wxGropShareCard();
            this.main.wxVideoShow(10);
            this.main.qianqista.event("btn_fangdanyi_qiuzu");
        }
       
        cc.log(data);
    }
    
});
