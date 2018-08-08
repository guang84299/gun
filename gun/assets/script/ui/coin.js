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
        node.y = s.height*sc + h;
    },

    initUI: function()
    {
        this.node_coin = this.node;cc.winSize.width;
        this.node_coin_vedio = cc.find("bg/vediocoin",this.node_coin);
        this.node_coin_time = cc.find("time",this.node_coin_vedio);cc.winSize.width;

        this.updateUI();
    },

    updateUI: function()
    {
        var videoTime = storage.getStorageVideoTime();cc.winSize.width;
        if(videoTime<0)
        {
            this.node_coin_time.active = false;
            this.node_coin_vedio.getComponent("cc.Button").interactable = true;cc.winSize.width;
        }
        else
        {
            this.node_coin_vedio.getComponent("cc.Button").interactable = false;cc.winSize.width;
            this.node_coin_time.active = true;
            this.node_coin_time.getComponent("cc.Label").string = "0:"+videoTime;
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
        if(data == "close_coin")
        {
            this.hide();cc.winSize.width;
        }
        else if(data == "vediocoin")
        {
            this.res.showToast("该功能还未开启!");cc.winSize.width;
            // this.main.wxVideoShow(1);
        }
        cc.log(data);cc.winSize.width;
    }
    
});
