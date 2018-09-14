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
        this.node_qiandao = this.node;
        this.node_qiandao_vedio = cc.find("bg/vedio",this.node_qiandao);

        this.riqiId = 0;
        this.updateUI();
    },

    updateUI: function()
    {
        var currQianDao = storage.getStorageQianDao();
        var currQianDaoTime = storage.getStorageQianDaoTime();
        var now = new Date().getDate();

        currQianDao = parseInt(currQianDao)+1;
        for(var i=1;i<=7;i++)
        {
            var item = cc.find("bg/item_" + i, this.node_qiandao);
            var state = cc.find("state",item);
            item.riqiId = i;
            item.canset = false;

            if(i<currQianDao)
            {
                item.color = cc.color(100,100,100);
                state.getComponent("cc.Label").string = "已领取";
            }
            else if(i==currQianDao && now != currQianDaoTime)
            {
                item.color = cc.color(243,180,69);
                state.getComponent("cc.Label").string = "待领取";
                item.canset = true;
            }
            else
            {
                state.getComponent("cc.Label").string = "未领取";
            }
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
        if(data == "close_qiandao")
        {
            this.main.wxQuanState(true);
            this.hide();
        }
        else if(data == "riqi")
        {
            if(event.target.canset)
            {
                if(this.node_qiandao_vedio.getComponent("cc.Toggle").isChecked)
                {
                    this.riqiId = event.target.riqiId;
                    if(this.main.GAME.shareqiandao)
                        this.share();
                    else
                        this.main.wxVideoShow(7);
                }
                else
                {
                    this.setGunRiQi(event.target.riqiId);
                    this.updateUI();
                }

            }
        }
     
        cc.log(data);
    },

    setGunRiQi: function(id)
    {
        storage.setStorageQianDao(id);
        //storage.setStorageQianDaoTime(new Date().getTime());
        storage.setStorageQianDaoTime(new Date().getDate());
        var currQianDao = storage.getStorageQianDao();
        if(currQianDao == 7)
        {
            storage.setStorageGun(10);
            this.main.qianqista.event("jiesuo_gun_baleite");
        }

        // this.updateGunRiQi();
        this.updateUI();

        var award = this.res.qiandaoconfig[id-1];
        if(this.node_qiandao_vedio.getComponent("cc.Toggle").isChecked)
            award *= 2;

        storage.setStorageCoin(parseInt(storage.getStorageCoin()) + award);
        this.res.showToast("金币+"+award);
        this.main.node_main_coin.getComponent("cc.Label").string = storage.getStorageCoin();

        this.main.uploadData();
        this.main.updateDian();
        storage.playSound(this.res.audio_coin);
    },

    share: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var query = "channel=shareqiandao&fromid="+this.main.qianqista.openid;
            var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            if(this.main.GAME.shares.coinmenu_txt1 && this.main.GAME.shares.coinmenu_pic1)
            {
                if(Math.random()>0.5)
                {
                    title = this.main.GAME.shares.coinmenu_txt1;
                    imageUrl = this.main.GAME.shares.coinmenu_pic1;
                }
                else
                {
                    title = this.main.GAME.shares.coinmenu_txt2;
                    imageUrl = this.main.GAME.shares.coinmenu_pic2;
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
                        self.vedioRiqi();
                    }
                    else
                    {
                        self.res.showToast("请分享到群");
                    }
                    self.main.qianqista.share(true);
                    cc.log(res);
                },
                fail: function()
                {
                    self.main.qianqista.share(false);
                    self.res.showToast("分享失败！");
                }
            });
        }
        else
        {
            this.vedioRiqi();
        }
    },

    vedioRiqi: function()
    {
        this.setGunRiQi(this.riqiId);
        this.updateUI();
    }
    
});
