var storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {
        icon1: {
            type: cc.SpriteFrame,
            default: null
        },
        icon2: {
            type: cc.SpriteFrame,
            default: null
        },
        icon3: {
            type: cc.SpriteFrame,
            default: null
        },
        icon4: {
            type: cc.SpriteFrame,
            default: null
        },
        icon5: {
            type: cc.SpriteFrame,
            default: null
        },
        icon6: {
            type: cc.SpriteFrame,
            default: null
        },
        icon7: {
            type: cc.SpriteFrame,
            default: null
        }

    },

    onLoad: function()
    {
        this.dsize = cc.view.getDesignResolutionSize();
        this.main = cc.find("Canvas").getComponent("main");
        this.res = cc.find("Canvas").getComponent("res");
        this.lv = 0;

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
        this.node_tiaozhan_coin = cc.find("coin/num",this.node).getComponent("cc.Label");
        this.node_tiaozhan_title = cc.find("title",this.node).getComponent("cc.Label");
        this.node_tiaozhan_desc1 = cc.find("bg/desc1",this.node);
        this.node_tiaozhan_desc1_str = this.node_tiaozhan_desc1.getComponent("cc.Label");
        this.node_tiaozhan_desc1_icon = cc.find("bg/desc1/icon",this.node);
        this.node_tiaozhan_desc2 = cc.find("bg/desc2",this.node);
        this.node_tiaozhan_desc2_str = this.node_tiaozhan_desc2.getComponent("cc.Label");
        this.node_tiaozhan_desc2_icon = cc.find("bg/desc2/icon",this.node);


    },

    updateUI: function(lv)
    {
        this.lv = lv;
        //var currLevel = storage.getStorageLevel();

        this.node_tiaozhan_coin.string = storage.getStorageCoin();
        this.node_tiaozhan_title.string = "第"+(lv+1)+"关";

        this.node_tiaozhan_desc2.active = false;
        var lvdata = this.res.levels[lv][0];
        this.node_tiaozhan_desc1_str.string = lvdata.desc;

        if(lvdata.type == 3 || lvdata.type == 4 || lvdata.type == 6)
        {
            this.node_tiaozhan_desc2.active = true;
            this.node_tiaozhan_desc2_str.string = lvdata.desc2;
        }

        if(lvdata.type == 1)
        {
            this.node_tiaozhan_desc1_icon.getComponent("cc.Sprite").spriteFrame = this.icon1;
        }
        else if(lvdata.type == 2)
        {
            this.node_tiaozhan_desc1_icon.getComponent("cc.Sprite").spriteFrame = this.icon3;
        }
        else if(lvdata.type == 3)
        {
            this.node_tiaozhan_desc1_icon.getComponent("cc.Sprite").spriteFrame = this.icon7;
            this.node_tiaozhan_desc2_icon.getComponent("cc.Sprite").spriteFrame = this.icon1;
        }
        else if(lvdata.type == 4)
        {
            this.node_tiaozhan_desc1_icon.getComponent("cc.Sprite").spriteFrame = this.icon2;
            this.node_tiaozhan_desc2_icon.getComponent("cc.Sprite").spriteFrame = this.icon6;
        }
        else if(lvdata.type == 5)
        {
            this.node_tiaozhan_desc1_icon.getComponent("cc.Sprite").spriteFrame = this.icon2;
        }
        else if(lvdata.type == 6)
        {
            this.node_tiaozhan_desc1_icon.getComponent("cc.Sprite").spriteFrame = this.icon1;
            this.node_tiaozhan_desc2_icon.getComponent("cc.Sprite").spriteFrame = this.icon5;
        }

    },

    show: function(lv)
    {
        this.node.active = true;
        this.updateUI(lv);

    },

    hide: function()
    {
        this.node.destroy();
    },

    click: function(event,data)
    {
        if(data == "home")
        {
            this.main.goMain();
            if(this.main.opentiaozhan)
                this.main.openTiaoZhan();
            this.hide();
        }
        else if(data == "start")
        {
            this.startGame(this.lv);
        }
        cc.log(data);
    },

    startGame: function(level)
    {
        this.hide();
        this.main.tiaozhanlv = level;
        this.main.again();
        this.main.startTiaoZhan();

        this.main.qianqista.event("tiaozhan_start");
    }
});
