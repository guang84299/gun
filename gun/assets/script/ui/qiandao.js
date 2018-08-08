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
            this.adaptItem(item);
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
        this.node_qiandao = this.node;cc.winSize.width;

        this.updateUI();cc.winSize.width;
    },

    updateUI: function()
    {
        var currQianDao = storage.getStorageQianDao();cc.winSize.width;
        var currQianDaoTime = storage.getStorageQianDaoTime();cc.winSize.width;
        var now = new Date().getDate();

        currQianDao = parseInt(currQianDao)+1;
        for(var i=1;i<=7;i++)
        {
            var item = cc.find("bg/item_" + i, this.node_qiandao);cc.winSize.width;
            var state = cc.find("state",item);cc.winSize.width;
            var sp = cc.find("sp",item);cc.winSize.width;
            var num = cc.find("num",item);cc.winSize.width;
            item.riqiId = i;cc.winSize.width;
            item.canset = false;cc.winSize.width;

            state.active = false;
            sp.active = false;
            num.active = false;
            if(i<currQianDao)
            {
                state.active = true;cc.winSize.width;
                // item.color = cc.color(100,100,100);
                // state.getComponent("cc.Label").string = "已领取";
            }
            else if(i==currQianDao && now != currQianDaoTime)
            {
                sp.active = true;cc.winSize.width;
                num.active = true;cc.winSize.width;
                item.color = cc.color(243,180,69);cc.winSize.width;
                // state.getComponent("cc.Label").string = "待领取";
                item.canset = true;
            }
            else
            {
                sp.active = true;cc.winSize.width;
                num.active = true;cc.winSize.width;
                // state.getComponent("cc.Label").string = "未领取";
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
        if(data == "close_qiandao")
        {
            this.main.wxQuanState(true);cc.winSize.width;
            this.hide();cc.winSize.width;
        }
        else if(data == "riqi")
        {
            if(event.target.canset)
            {
                this.setGunRiQi(event.target.riqiId);cc.winSize.width;
                this.updateUI();cc.winSize.width;
            }
        }
     
        cc.log(data);cc.winSize.width;
    },

    setGunRiQi: function(id)
    {
        storage.setStorageQianDao(id);cc.winSize.width;
        //storage.setStorageQianDaoTime(new Date().getTime());cc.winSize.width;
        storage.setStorageQianDaoTime(new Date().getDate());cc.winSize.width;
        var currQianDao = storage.getStorageQianDao();cc.winSize.width;
        if(currQianDao == 7)
        {
            storage.setStorageGun(10);cc.winSize.width;
            this.main.qianqista.event("jiesuo_gun_baleite");cc.winSize.width;
        }

        // this.updateGunRiQi();cc.winSize.width;
        this.updateUI();cc.winSize.width;

        storage.setStorageCoin(parseInt(storage.getStorageCoin()) +  this.res.qiandaoconfig[id-1]);cc.winSize.width;
        this.res.showToast("金币+"+this.res.qiandaoconfig[id-1]);cc.winSize.width;
        this.main.node_main_coin.getComponent("cc.Label").string = storage.getStorageCoin();cc.winSize.width;

        this.main.uploadData();cc.winSize.width;
        this.main.updateDian();cc.winSize.width;
        storage.playSound(this.res.audio_coin);cc.winSize.width;
    },
    
});
