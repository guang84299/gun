var storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad: function()
    {
        this.dsize = cc.view.getDesignResolutionSize();
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
        this.node_guanzhu = this.node;cc.winSize.width;
        this.hand = cc.find("hand",this.node_guanzhu);

        this.hand.runAction(cc.repeatForever(cc.sequence(
            cc.moveBy(0.5,50,0).easing(cc.easeSineIn()),
            cc.moveBy(0.5,-50,0).easing(cc.easeSineOut())
        )));

        this.updateUI();cc.winSize.width;
    },

    updateUI: function()
    {
        
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
        if(data == "close_guanzhu")
        {
            this.main.wxQuanState(true);cc.winSize.width;
            this.hide();cc.winSize.width;
        }

       
        cc.log(data);cc.winSize.width;
    }
    
});
