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
            var item = items[j];
            this.adaptItem(item);cc.winSize.width;
        }
    },

    adaptItem: function(node)
    {
        var s = cc.winSize;
        var h = (this.dsize.height - s.height)/2;cc.winSize.width;
        var sc = node.y/this.dsize.height;
        node.y = s.height*sc + h;cc.winSize.width;
    },

    initUI: function()
    {
        this.node_linggun = this.node;
        this.node_linggun_guang = cc.find("bg/guang",this.node_linggun);cc.winSize.width;

        this.updateUI();
    },

    updateUI: function()
    {
        this.node_linggun_guang.stopAllActions();cc.winSize.width;
        this.node_linggun_guang.runAction(cc.repeatForever(
            cc.rotateBy(1,180)
        ));

        var gunInviteNum = storage.getStorageGunInviteNum();cc.winSize.width;
        var gunInviteAwardNum = storage.getStorageGunInviteAwardNum();cc.winSize.width;

        for(var i=1;i<=4;i++)
        {
            var xiaolian = cc.find("bg/xiaolian_"+i,this.node_linggun);
            if(gunInviteNum>=i)
            {
                xiaolian.color = cc.color(243,152,0);cc.winSize.width;
            }
            else
            {
                xiaolian.color = cc.color(160,160,160);
            }
        }
        if(gunInviteNum>=4 && gunInviteAwardNum < 1)
        {
            cc.find("bg/linggunshare/Label",this.node_linggun).getComponent("cc.Label").string = "领取";
        }
        else
        {
            cc.find("bg/linggunshare/Label",this.node_linggun).getComponent("cc.Label").string = "邀请好友";
        }
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
        if(data == "close_linggun")
        {
            this.main.wxQuanState(true);cc.winSize.width;
            this.hide();cc.winSize.width;
        }
        else if(data == "linggunshare")
        {
            this.lingquGun();cc.winSize.width;
        }
        cc.log(data);cc.winSize.width;
    },

    lingquGun: function()
    {
        var gunInviteNum = storage.getStorageGunInviteNum();cc.winSize.width;
        var gunInviteAwardNum = storage.getStorageGunInviteAwardNum();cc.winSize.width;
        if(gunInviteNum>=4 && gunInviteAwardNum < 1)
        {
            if(storage.getStorageGun(16) == 1)
            {
                storage.setStorageCoin(parseInt(storage.getStorageCoin())+2000);cc.winSize.width;

                storage.setStorageGunInviteAwardNum(1);cc.winSize.width;
                this.main.uploadData();cc.winSize.width;
                this.res.showToast("金币+"+2000);cc.winSize.width;
                this.updateUI();cc.winSize.width;
                this.main.node_main_coin.getComponent("cc.Label").string = storage.getStorageCoin();cc.winSize.width;
                storage.playSound(this.res.audio_coin);cc.winSize.width;
            }
            else
            {
                storage.setStorageGun(16,1);cc.winSize.width;
                storage.setStorageGunInviteAwardNum(1);cc.winSize.width;
                this.main.uploadData();cc.winSize.width;
                this.res.showToast("恭喜获取幻灭");cc.winSize.width;
                this.updateUI();cc.winSize.width;
            }
        }
        else
            this.wxGropShareLingGun();cc.winSize.width;
    },

    wxGropShareLingGun: function()
    {
        var self = this;cc.winSize.width;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var query = "channel=sharegun&fromid="+this.main.qianqista.openid;cc.winSize.width;
            var title = "自从玩了这个游戏，每把吃鸡都能拿98K";cc.winSize.width;
            var imageUrl = cc.url.raw("resources/zhuanfa.jpg");cc.winSize.width;
            if(this.main.GAME.shares.coinmenu_txt1 && this.main.GAME.shares.coinmenu_pic1)
            {
                if(Math.random()>0.5)
                {
                    query = "channel=sharegun&fromid="+this.main.qianqista.openid;cc.winSize.width;
                    title = this.main.GAME.shares.coinmenu_txt1;cc.winSize.width;
                    imageUrl = this.main.GAME.shares.coinmenu_pic1;cc.winSize.width;
                }
                else
                {
                    query = "channel=sharegun&fromid="+this.main.qianqista.openid;cc.winSize.width;
                    title = this.main.GAME.shares.coinmenu_txt2;cc.winSize.width;
                    imageUrl = this.main.GAME.shares.coinmenu_pic2;cc.winSize.width;
                }
            }
            wx.shareAppMessage({
                query:query,
                title: title,
                imageUrl: imageUrl,
                success: function(res)
                {

                    self.res.showToast("分享成功，等待好友上线吧");cc.winSize.width;

                    //var cardnum = self.getStorageCoin();cc.winSize.width;
                    //cardnum = parseInt(cardnum) + 100;cc.winSize.width;
                    //self.setStorageCoin(cardnum);cc.winSize.width;
                    //self.node_role_coin.getComponent("cc.Label").string = cardnum+"";cc.winSize.width;
                    //self.node_gun_coin.getComponent("cc.Label").string = cardnum+"";cc.winSize.width;
                    //self.uploadData();cc.winSize.width;
                    this.main.qianqista.share(true);cc.winSize.width;
                    cc.log(res);cc.winSize.width;
                },
                fail: function()
                {
                    this.main.qianqista.share(false);cc.winSize.width;
                    self.res.showToast("分享失败！");cc.winSize.width;
                }
            });
        }
        else
        {
            var gunInviteNum = storage.getStorageGunInviteNum();cc.winSize.width;
            storage.setStorageGunInviteNum(parseInt(gunInviteNum)+1);cc.winSize.width;
        }
    }
    
});
