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
        this.node_coinx2 = this.node;
        this.node_coinx2_vedio = cc.find("bg/vediocoin",this.node_coinx2);
        this.node_coinx2_share = cc.find("bg/sharecoin",this.node_coinx2);
        this.node_coinx2_currcoin = cc.find("bg/currcoin",this.node_coinx2).getComponent("cc.Label");

        this.awardCoin = 0;
        this.updateUI();
    },

    updateUI: function()
    {
        this.node_coinx2_currcoin.string = "已获得"+this.awardCoin+"金币";
       if(this.main.GAME.sharecoinx2)
       {
           this.node_coinx2_vedio.active = false;
           this.node_coinx2_share.active = true;
           cc.find("num",this.node_coinx2_share).getComponent("cc.Label").string = "+"+this.awardCoin;
       }
       else
       {
           this.node_coinx2_vedio.active = true;
           this.node_coinx2_share.active = false;
           cc.find("num",this.node_coinx2_vedio).getComponent("cc.Label").string = "+"+this.awardCoin;
       }
    },

    show: function(coin)
    {
        this.node.active = true;
        this.awardCoin = coin;
        this.updateUI(coin);
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
            this.main.wxVideoShow(8);
        }
        else if(data == "sharecoin")
        {
            this.share();
        }
        cc.log(data);
    },

    share: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var info = {};
            info.channel = "sharecoinx2";
            var query = JSON.stringify(info);
            var title = "5W悬赏金，助你成为最牛神枪手！";
            var imageUrl = "http://www.qiqiup.com/gun.gif";
            var shareInfo = {
                summary:title,          //QQ聊天消息标题
                picUrl:imageUrl,               //QQ聊天消息图片
                extendInfo:query,    //QQ聊天消息扩展字段
            };

            //BK.QQ.share(shareInfo, function (retCode, shareDest, isFirstShare) {
            //    BK.Script.log(1, 1, "retCode:" + retCode + " shareDest:" + shareDest + " isFirstShare:" + isFirstShare);
            //    if (retCode == 0) {
            //        BK.Script.log(1, 1, "分享成功：" + retCode);
            //        self.lingquSuc();
            //        self.main.qianqista.share(true);
            //    }
            //    else {
            //        BK.Script.log(1, 1, "分享失败" + retCode);
            //        self.main.qianqista.share(false);
            //        self.res.showToast("分享失败！");
            //    }
            //});

            BK.Share.share({
                qqImgUrl: imageUrl,
                summary: title,
                extendInfo: query,
                success: function(succObj){
                    BK.Console.log('Waaaah! share success', succObj.code, JSON.stringify(succObj.data));

                    self.lingquSuc();
                    self.main.qianqista.share(true);
                },
                fail: function(failObj){
                    BK.Console.log('Waaaah! share fail', failObj.code, JSON.stringify(failObj.msg));

                    self.main.qianqista.share(false);
                    self.res.showToast("分享失败！");
                },
                complete: function(){
                    BK.Console.log('Waaaah! share complete');
                }
            });



            //var query = "channel=sharecoinx2&fromid="+this.main.qianqista.openid;
            //var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            //var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            //if(this.main.GAME.shares.coinmenu_txt1 && this.main.GAME.shares.coinmenu_pic1)
            //{
            //    if(Math.random()>0.5)
            //    {
            //        title = this.main.GAME.shares.coinmenu_txt1;
            //        imageUrl = this.main.GAME.shares.coinmenu_pic1;
            //    }
            //    else
            //    {
            //        title = this.main.GAME.shares.coinmenu_txt2;
            //        imageUrl = this.main.GAME.shares.coinmenu_pic2;
            //    }
            //}
            //wx.shareAppMessage({
            //    query:query,
            //    title: title,
            //    imageUrl: imageUrl,
            //    success: function(res)
            //    {
            //
            //        if(res.shareTickets && res.shareTickets.length>0)
            //        {
            //            self.lingquSuc();
            //        }
            //        else
            //        {
            //            self.res.showToast("请分享到群");
            //        }
            //        self.main.qianqista.share(true);
            //        cc.log(res);
            //    },
            //    fail: function()
            //    {
            //        self.main.qianqista.share(false);
            //        self.res.showToast("分享失败！");
            //    }
            //});
        }
        else
        {
            this.lingquSuc();
        }
    },

    lingquSuc: function()
    {
        storage.setStorageCoin(storage.getStorageCoin()+this.awardCoin);
        this.res.showToast("金币+"+this.awardCoin);
        this.hide();
    }
    
});
