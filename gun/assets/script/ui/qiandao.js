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

    vedioRiqi: function()
    {
        this.setGunRiQi(this.riqiId);
        this.updateUI();
    }
    
});
