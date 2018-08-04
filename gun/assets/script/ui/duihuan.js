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
        this.node_duihuan = this.node;

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
        if(data == "close_duihuan")
        {
            this.main.wxQuanState(true);
            this.hide();
        }
        else if(data == "kefu")
        {
            this.wxKefu();
            this.main.qianqista.event("btn_linghongbao_kefu");
        }
       
        cc.log(data);
    },

    wxKefu: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            if(this.main.GAME.linghongbao == 1)
            {
                wx.openCustomerServiceConversation({});
            }
            else
            {
                this.res.showToast("今天活动已经结束，请明天再来");
            }
        }
    }
    
});
