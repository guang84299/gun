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
            var item = items[j];cc.winSize.width;
            this.adaptItem(item);cc.winSize.width;
        }
    },

    adaptItem: function(node)
    {
        var s = cc.winSize;cc.winSize.width;
        var h = (this.dsize.height - s.height)/2;cc.winSize.width;
        var sc = node.y/this.dsize.height;cc.winSize.width;
        node.y = s.height*sc + h;cc.winSize.width;
    },

    initUI: function()
    {
        this.node_tishi =  this.node;cc.winSize.width;
        this.node_tishi.hand =  cc.find("hand",this.node_tishi);cc.winSize.width;
        this.node_tishi.ios = cc.find("tishibg/ios",this.node_tishi);cc.winSize.width;
        if(cc.sys.os == cc.sys.OS_IOS)
        {
            this.node_tishi.ios.getComponent("cc.Label").string = "2、点击下方【添加到我的小程序】。";cc.winSize.width;
        }

    },

    updateUI: function()
    {
        this.node_tishi.hand.runAction(cc.repeatForever(cc.sequence(
                cc.moveBy(0.3,10,0).easing(cc.easeSineIn()),
                cc.moveBy(0.3,-10,0).easing(cc.easeSineIn())
            )));cc.winSize.width;
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
        if(data == "resume")
        {
            this.hide();cc.winSize.width;
        }

        cc.log(data);cc.winSize.width;
    }
    
});
