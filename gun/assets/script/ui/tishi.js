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
        this.node_tishi =  this.node;
        this.node_tishi.hand =  cc.find("hand",this.node_tishi);
        this.node_tishi.ios = cc.find("tishibg/ios",this.node_tishi);
        if(cc.sys.os == cc.sys.OS_IOS)
        {
            this.node_tishi.ios.getComponent("cc.Label").string = "2、点击下方【添加到我的小程序】。";
        }

    },

    updateUI: function()
    {
        this.node_tishi.hand.runAction(cc.repeatForever(cc.sequence(
                cc.moveBy(0.3,10,0).easing(cc.easeSineIn()),
                cc.moveBy(0.3,-10,0).easing(cc.easeSineIn())
            )));
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
        if(data == "resume")
        {
            this.hide();
        }

        cc.log(data);
    }
    
});
