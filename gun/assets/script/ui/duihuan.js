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
        this.node_duihuan = this.node;cc.winSize.width;

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
        if(data == "close_duihuan")
        {
            this.main.wxQuanState(true);cc.winSize.width;
            this.hide();cc.winSize.width;
        }
        else if(data == "kefu")
        {
            this.wxKefu();cc.winSize.width;
            this.main.qianqista.event("btn_linghongbao_kefu");cc.winSize.width;
        }
       
        cc.log(data);cc.winSize.width;
    },

    wxKefu: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            if(this.main.GAME.linghongbao == 1)
            {
                wx.openCustomerServiceConversation({});cc.winSize.width;
            }
            else
            {
                this.res.showToast("今天活动已经结束，请明天再来");cc.winSize.width;
            }
        }
    }
    
});
