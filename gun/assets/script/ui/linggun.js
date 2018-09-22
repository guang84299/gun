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
        this.node_linggun = this.node;
        this.node_linggun_guang = cc.find("bg/guang",this.node_linggun);

        this.updateUI();
    },

    updateUI: function()
    {
        this.node_linggun_guang.stopAllActions();
        this.node_linggun_guang.runAction(cc.repeatForever(
            cc.rotateBy(1,180)
        ));

        var gunInviteNum = storage.getStorageGunInviteNum();
        var gunInviteAwardNum = storage.getStorageGunInviteAwardNum();

        for(var i=1;i<=4;i++)
        {
            var xiaolian = cc.find("bg/xiaolian_"+i,this.node_linggun);
            if(gunInviteNum>=i)
            {
                xiaolian.color = cc.color(243,152,0);
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
        this.node.active = true;
        this.updateUI();
    },

    hide: function()
    {
        this.node.destroy();
    },

    click: function(event,data)
    {
        if(data == "close_linggun")
        {
            this.main.wxQuanState(true);
            this.hide();
        }
        else if(data == "linggunshare")
        {
            this.lingquGun();
        }
        cc.log(data);
    },

    lingquGun: function()
    {
        var gunInviteNum = storage.getStorageGunInviteNum();
        var gunInviteAwardNum = storage.getStorageGunInviteAwardNum();
        if(gunInviteNum>=4 && gunInviteAwardNum < 1)
        {
            if(storage.getStorageGun(16) == 1)
            {
                storage.setStorageCoin(parseInt(storage.getStorageCoin())+2000);

                storage.setStorageGunInviteAwardNum(1);
                this.main.uploadData();
                this.res.showToast("金币+"+2000);
                this.updateUI();
                this.main.node_main_coin.getComponent("cc.Label").string = storage.getStorageCoin();
                storage.playSound(this.res.audio_coin);
            }
            else
            {
                storage.setStorageGun(16,1);
                storage.setStorageGunInviteAwardNum(1);
                this.main.uploadData();
                this.res.showToast("恭喜获取幻灭");
                this.updateUI();
            }
        }
        else
            this.wxGropShareLingGun();
    },

    wxGropShareLingGun: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var info = {};
            info.channel = "sharegun";
            var query = JSON.stringify(info);
            var title = "请问，这是你掉的98k么？";
            var imageUrl = "http://www.qiqiup.com/gun.gif";
            var shareInfo = {
                summary:title,          //QQ聊天消息标题
                picUrl:imageUrl,               //QQ聊天消息图片
                extendInfo:query,    //QQ聊天消息扩展字段
            };
            BK.QQ.share(shareInfo, function (retCode, shareDest, isFirstShare) {
                BK.Script.log(1, 1, "retCode:" + retCode + " shareDest:" + shareDest + " isFirstShare:" + isFirstShare);
                if (retCode == 0) {
                    BK.Script.log(1, 1, "分享成功：" + retCode);
                    self.res.showToast("分享成功，等待好友上线吧");
                    self.main.qianqista.share(true);
                }
                else{
                    BK.Script.log(1, 1, "分享失败" + retCode);
                    self.main.qianqista.share(false);
                    self.res.showToast("分享失败！");
                }

            });

            //var query = "channel=sharegun&fromid="+this.main.qianqista.openid;
            //var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            //var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            //if(this.main.GAME.shares.coinmenu_txt1 && this.main.GAME.shares.coinmenu_pic1)
            //{
            //    if(Math.random()>0.5)
            //    {
            //        query = "channel=sharegun&fromid="+this.main.qianqista.openid;
            //        title = this.main.GAME.shares.coinmenu_txt1;
            //        imageUrl = this.main.GAME.shares.coinmenu_pic1;
            //    }
            //    else
            //    {
            //        query = "channel=sharegun&fromid="+this.main.qianqista.openid;
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
            //        self.res.showToast("分享成功，等待好友上线吧");
            //
            //        //var cardnum = self.getStorageCoin();
            //        //cardnum = parseInt(cardnum) + 100;
            //        //self.setStorageCoin(cardnum);
            //        //self.node_role_coin.getComponent("cc.Label").string = cardnum+"";
            //        //self.node_gun_coin.getComponent("cc.Label").string = cardnum+"";
            //        //self.uploadData();
            //        this.main.qianqista.share(true);
            //        cc.log(res);
            //    },
            //    fail: function()
            //    {
            //        this.main.qianqista.share(false);
            //        self.res.showToast("分享失败！");
            //    }
            //});
        }
        else
        {
            var gunInviteNum = storage.getStorageGunInviteNum();
            storage.setStorageGunInviteNum(parseInt(gunInviteNum)+1);
        }
    }
    
});
