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

        this.isShouYix2Dt = 0;
        
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
        this.node_shouyix2 = this.node;

        this.node_shouyix2_video = cc.find("bg/video",this.node_shouyix2);
        this.node_shouyix2_timebg = cc.find("bg/timebg",this.node_shouyix2);
        this.node_shouyix2_time = cc.find("bg/timebg/time",this.node_shouyix2).getComponent("cc.Label");

        this.updateUI();
    },

    updateUI: function()
    {
        var time = storage.getStorageShouYiDt();
        if(time > 24*60*60*1000)
        {
            this.node_shouyix2_video.active = true;
            this.node_shouyix2_timebg.active = false;
        }
        else if(time <= 24*60*60*1000 && time >= 2*60*60*1000)
        {
            this.node_shouyix2_video.active = false;
            this.node_shouyix2_timebg.active = true;
            this.node_shouyix2_time.string = "明天再来";
        }
        else if(time < 2*60*60*1000 && time >= 0)
        {
            this.node_shouyix2_video.active = false;
            this.node_shouyix2_timebg.active = true;
            this.node_shouyix2_time.string = "2:00:00";
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
        if(data == "close")
        {
            this.hide();
        }
        else if(data == "video")
        {
            this.main.wxVideoShow(10);
        }
       
        cc.log(data);
    },

    updateShouyix2Time: function(time)
    {
        this.node_shouyix2_time.string = time;
    }
    
});
