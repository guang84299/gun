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
        this.node_coin = this.node;
        this.node_coin_vedio = cc.find("bg/vediocoin",this.node_coin);
        this.node_coin_time = cc.find("time",this.node_coin_vedio);

        this.updateUI();
    },

    updateUI: function()
    {
        var videoTime = storage.getStorageVideoTime();
        if(videoTime<0)
        {
            this.node_coin_time.active = false;
            this.node_coin_vedio.getComponent("cc.Button").interactable = true;
        }
        else
        {
            this.node_coin_vedio.getComponent("cc.Button").interactable = false;
            this.node_coin_time.active = true;
            this.node_coin_time.getComponent("cc.Label").string = "0:"+videoTime;
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
        if(data == "close_coin")
        {
            this.hide();
        }
        else if(data == "vediocoin")
        {
            this.res.showToast("该功能还未开启!");
            // this.main.wxVideoShow(1);
        }
        cc.log(data);
    }
    
});
