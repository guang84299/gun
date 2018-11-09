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
        this.node_award = this.node;
        this.node_award_itembg = cc.find("bg/itembg",this.node_award);

        this.updateUI();
    },

    updateUI: function()
    {
        var inviteNum = storage.getStorageInviteNum();
        var inviteAwardNum = storage.getStorageInviteAwardNum();
        if(inviteAwardNum<5)
        {
            for(var i=1;i<=5;i++)
            {
                var item = cc.find("item_"+i,this.node_award_itembg);
                var box = cc.find("box",item);
                box.awardid = i;
                box.canset = false;
                if(inviteAwardNum<i)
                {
                    if(inviteNum>=i)
                    {
                        box.color = cc.color(137,87,161);
                        box.canset = true;
                    }
                    else
                    {
                        box.color = cc.color(255,255,255);
                    }
                }
                else
                {
                    box.color = cc.color(181,181,181);
                }
            }
        }
        else
        {
            for(var i=1;i<=5;i++)
            {
                var item = cc.find("item_"+i,this.node_award_itembg);
                var box = cc.find("box",item);
                var coin = cc.find("coin",box);
                coin.getComponent("cc.Label").string = this.res.inviteconfig[i-1]*2;
                box.awardid = i;
                box.canset = false;
                if(inviteAwardNum<i+5)
                {
                    if(inviteNum>=i+5)
                    {
                        box.color = cc.color(137,87,161);
                        box.canset = true;
                    }
                    else
                    {
                        box.color = cc.color(255,255,255);
                    }
                }
                else
                {
                    box.color = cc.color(181,181,181);
                }
            }
        }
    },

    show: function()
    {
        this.node.active = true;
        this.updateUI();
        this.main.wxBannerShow();
    },

    hide: function()
    {
        this.main.wxBannerHide();
        this.node.destroy();
    },

    click: function(event,data)
    {
        if(data == "close_award")
        {
            if(!this.main.openstore)
                this.main.wxQuanState(true);
            this.hide();
        }
        else if(data == "item_award")
        {
            if(event.target.canset)
            {
                this.lingquAward(event.target.awardid);
            }
        }
        else if(data == "lijiyaoqing")
        {
            this.wxGropShareCoin();
            this.main.qianqista.event("btn_lingjaing_yaoqing");
        }
        cc.log(data);
    },

    lingquAward: function(id)
    {
        var inviteAwardNum = storage.getStorageInviteAwardNum();

        var coin = this.res.inviteconfig[id-1];
        if(inviteAwardNum>=5)
            coin*=2;
        storage.setStorageCoin(parseInt(storage.getStorageCoin())+coin);

        storage.setStorageInviteAwardNum(parseInt(inviteAwardNum)+1);
        this.main.uploadData();
        this.res.showToast("金币+"+coin);
        this.updateUI();
        this.main.node_main_coin.getComponent("cc.Label").string = storage.getStorageCoin();
        this.main.updateDian();
        storage.playSound(this.res.audio_coin);

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

        this.main.qianqista.event("invite_num_"+(parseInt(inviteAwardNum)+1));
    },
    
    wxGropShareCoin: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var info = {};
            info.channel = "sharecoinmenu";
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
            //        self.res.showToast("分享成功，等待好友上线吧");
            //
            //        self.main.qianqista.share(true);
            //    }
            //    else{
            //        BK.Script.log(1, 1, "分享失败" + retCode);
            //        self.main.qianqista.share(false);
            //        self.res.showToast("分享失败！");
            //    }
            //
            //});

            BK.Share.share({
                qqImgUrl: imageUrl,
                summary: title,
                extendInfo: query,
                success: function(succObj){
                    BK.Console.log('Waaaah! share success', succObj.code, JSON.stringify(succObj.data));
                    self.res.showToast("分享成功，等待好友上线吧");
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

            //var query = "channel=sharecoinmenu&fromid="+this.main.qianqista.openid;
            //var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            //var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            //if(this.main.GAME.shares.coinmenu_txt1 && this.main.GAME.shares.coinmenu_pic1)
            //{
            //    if(Math.random()>0.5)
            //    {
            //        query = "channel=sharecoinmenu_1&fromid="+this.main.qianqista.openid;
            //        title = this.main.GAME.shares.coinmenu_txt1;
            //        imageUrl = this.main.GAME.shares.coinmenu_pic1;
            //    }
            //    else
            //    {
            //        query = "channel=sharecoinmenu_2&fromid="+this.main.qianqista.openid;
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
            var cardnum = storage.getStorageCoin();
            cardnum = parseInt(cardnum) + 100;
            storage.setStorageCoin(cardnum);
            // self.node_role.updateCoin(cardnum);
            // self.node_gun_coin.getComponent("cc.Label").string = cardnum+"";
        }
    }
});
