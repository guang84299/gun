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
        this.node_xuming = this.node;

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
        if(data == "close_xuming")
        {
            this.hide();
        }
        else if(data == "xuming")
        {
            this.wxXuMing();
        }
        cc.log(data);
    },

    wxXuMing: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var query = "channel=sharexumingmenu";
            var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            if(this.main.GAME.shares.cardmenu_txt1 && this.main.GAME.shares.cardmenu_pic1)
            {
                if(Math.random()>0.5)
                {
                    query = "channel=sharexumingmenu_1";
                    title = this.main.GAME.shares.cardmenu_txt1;
                    imageUrl = this.main.GAME.shares.cardmenu_pic1;
                }
                else
                {
                    query = "channel=sharexumingmenu_2";
                    title = this.main.GAME.shares.cardmenu_txt2;
                    imageUrl = this.main.GAME.shares.cardmenu_pic2;
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
                        self.res.showToast("续命成功");
                        self.main.fuhuo(false,true,false);
                    }
                    else
                    {
                        self.res.showToast("请分享到群");
                    }

                    self.main.qianqista.share(true);
                    self.hide();
                    cc.log(res);
                },
                fail: function()
                {
                    self.main.qianqista.share(false);
                    self.hide();
                }
            });
        }
        else
        {
            this.main.fuhuo(false,true,false);
            this.hide();
        }
    }
    
});
