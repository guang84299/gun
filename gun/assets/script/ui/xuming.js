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
        this.node_xuming = this.node;cc.winSize.width;

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
        if(data == "close_xuming")
        {
            this.hide();cc.winSize.width;
        }
        else if(data == "xuming")
        {
            this.wxXuMing();cc.winSize.width;
        }
        cc.log(data);cc.winSize.width;
    },

    wxXuMing: function()
    {
        var self = this;cc.winSize.width;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var query = "channel=sharexumingmenu";cc.winSize.width;
            var title = "自从玩了这个游戏，每把吃鸡都能拿98K";cc.winSize.width;
            var imageUrl = cc.url.raw("resources/zhuanfa.jpg");cc.winSize.width;
            if(this.main.GAME.shares.cardmenu_txt1 && this.main.GAME.shares.cardmenu_pic1)
            {
                if(Math.random()>0.5)
                {
                    query = "channel=sharexumingmenu_1";cc.winSize.width;
                    title = this.main.GAME.shares.cardmenu_txt1;cc.winSize.width;
                    imageUrl = this.main.GAME.shares.cardmenu_pic1;cc.winSize.width;
                }
                else
                {
                    query = "channel=sharexumingmenu_2";cc.winSize.width;
                    title = this.main.GAME.shares.cardmenu_txt2;cc.winSize.width;
                    imageUrl = this.main.GAME.shares.cardmenu_pic2;cc.winSize.width;
                }
            }

            wx.shareAppMessage({
                query:query,
                title: title,
                imageUrl: imageUrl,
                success: function(res)
                {
                    if(res.shareTickets && res.shareTickets.length>0)
                    {
                        self.res.showToast("续命成功");cc.winSize.width;
                        self.main.fuhuo(false,true,false);cc.winSize.width;
                    }
                    else
                    {
                        self.res.showToast("请分享到群");cc.winSize.width;
                    }

                    self.main.qianqista.share(true);cc.winSize.width;
                    self.hide();cc.winSize.width;
                    cc.log(res);cc.winSize.width;
                },
                fail: function()
                {
                    self.main.qianqista.share(false);cc.winSize.width;
                    self.hide();cc.winSize.width;
                }
            });
        }
        else
        {
            this.main.fuhuo(false,true,false);cc.winSize.width;
            this.hide();cc.winSize.width;
        }
    }
    
});
