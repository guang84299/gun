var storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad: function()
    {
        this.dsize = cc.view.getDesignResolutionSize();cc.winSize.width;
        this.main = cc.find("Canvas").getComponent("main");
        this.res = cc.find("Canvas").getComponent("res");cc.winSize.width;
        
        this.initUI();

        var items = this.node.children;
        for(var j=0;j<items.length;j++)
        {
            var item = items[j];cc.winSize.width;
            this.adaptItem(item);
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
        this.node_award = this.node;
        this.node_award_itembg = cc.find("bg/itembg",this.node_award);cc.winSize.width;

        this.updateUI();cc.winSize.width;
    },

    updateUI: function()
    {
        var inviteNum = storage.getStorageInviteNum();cc.winSize.width;
        var inviteAwardNum = storage.getStorageInviteAwardNum();
        if(inviteAwardNum<5)
        {
            for(var i=1;i<=5;i++)
            {
                var item = cc.find("item_"+i,this.node_award_itembg);cc.winSize.width;
                var box = cc.find("box",item);cc.winSize.width;
                var box2 = cc.find("box2",box);cc.winSize.width;
                var box3 = cc.find("box3",box);
                box.awardid = i;
                box.canset = false;

                box2.active = false;cc.winSize.width;
                box3.active = false;
                if(inviteAwardNum<i)
                {
                    if(inviteNum>=i)
                    {
                        // box.color = cc.color(137,87,161);
                        box2.active = true;
                        box.canset = true;cc.winSize.width;
                    }
                    else
                    {
                        // box.color = cc.color(255,255,255);
                    }
                }
                else
                {
                    box3.active = true;
                    // box.color = cc.color(181,181,181);
                }
            }
        }
        else
        {
            for(var i=1;i<=5;i++)
            {
                var item = cc.find("item_"+i,this.node_award_itembg);
                var box = cc.find("box",item);cc.winSize.width;
                var coin = cc.find("coin",box);
                var box2 = cc.find("box2",box);cc.winSize.width;
                var box3 = cc.find("box3",box);
                coin.getComponent("cc.Label").string = this.res.inviteconfig[i-1]*2;
                box.awardid = i;cc.winSize.width;
                box.canset = false;

                box2.active = false;
                box3.active = false;cc.winSize.width;
                if(inviteAwardNum<i+5)
                {
                    if(inviteNum>=i+5)
                    {
                        box2.active = true;
                        // box.color = cc.color(137,87,161);
                        box.canset = true;cc.winSize.width;
                    }
                    else
                    {
                        // box.color = cc.color(255,255,255);
                    }
                }
                else
                {
                    box3.active = true;cc.winSize.width;
                    // box.color = cc.color(181,181,181);
                }
            }
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
        if(data == "close_award")
        {
            if(!this.main.openstore)
                this.main.wxQuanState(true);
            this.hide();cc.winSize.width;
        }
        else if(data == "item_award")
        {
            if(event.target.canset)
            {
                this.lingquAward(event.target.awardid);cc.winSize.width;
            }
        }
        else if(data == "lijiyaoqing")
        {
            this.wxGropShareCoin();cc.winSize.width;
            this.main.qianqista.event("btn_lingjaing_yaoqing");cc.winSize.width;
        }
        cc.log(data);cc.winSize.width;
    },

    lingquAward: function(id)
    {
        var inviteAwardNum = storage.getStorageInviteAwardNum();cc.winSize.width;

        var coin = this.res.inviteconfig[id-1];
        if(inviteAwardNum>=5)
            coin*=2;
        storage.setStorageCoin(parseInt(storage.getStorageCoin())+coin);cc.winSize.width;

        storage.setStorageInviteAwardNum(parseInt(inviteAwardNum)+1);
        this.main.uploadData();cc.winSize.width;
        this.res.showToast("金币+"+coin);
        this.updateUI();
        this.main.node_main_coin.getComponent("cc.Label").string = storage.getStorageCoin();cc.winSize.width;
        this.main.updateDian();
        storage.playSound(this.res.audio_coin);cc.winSize.width;

        var self = this;
        if(inviteAwardNum==4)
        {
            this.node.runAction(cc.sequence(
                cc.delayTime(1),
                cc.callFunc(function(){
                    self.res.showToast("继续邀请，奖励翻倍");
                })
            ));
        }

        this.main.qianqista.event("invite_num_"+(parseInt(inviteAwardNum)+1));cc.winSize.width;
    },
    
    wxGropShareCoin: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            const shareEventId = '2000_1035';
            yxmp.report.event(shareEventId);
            const shareOptions = Object.assign({}, yxmp.asset.getShareMessage(shareEventId));

            var query = "channel=sharecoinmenu&fromid="+this.main.qianqista.openid;
            var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            if(shareOptions)
            {
                title = shareOptions.title;
                imageUrl = shareOptions.imageUrl;
            }
            wx.shareAppMessage({
                query:query,
                title: title,
                imageUrl: imageUrl,
                success: function(res)
                {

                    self.res.showToast("分享成功，等待好友上线吧");cc.winSize.width;

                    //var cardnum = self.getStorageCoin();
                    //cardnum = parseInt(cardnum) + 100;
                    //self.setStorageCoin(cardnum);
                    //self.node_role_coin.getComponent("cc.Label").string = cardnum+"";
                    //self.node_gun_coin.getComponent("cc.Label").string = cardnum+"";
                    //self.uploadData();
                    self.main.qianqista.share(true);cc.winSize.width;
                    cc.log(res);
                },
                fail: function()
                {
                    self.main.qianqista.share(false);cc.winSize.width;
                    self.res.showToast("分享失败！");
                }
            });
        }
        else
        {
             var inviteNum = storage.getStorageInviteNum();
             storage.setStorageInviteNum(inviteNum+1);cc.winSize.width;
             this.updateUI();
            // var cardnum = storage.getStorageCoin();
            // cardnum = parseInt(cardnum) + 100;
            // storage.setStorageCoin(cardnum);
            // self.node_role.updateCoin(cardnum);
            // self.node_gun_coin.getComponent("cc.Label").string = cardnum+"";
        }
    }
});
