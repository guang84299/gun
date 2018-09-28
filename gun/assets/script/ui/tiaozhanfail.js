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
        this.jumpnum = 0;

        this.node_tiaozhan_coin = cc.find("coin/num",this.node).getComponent("cc.Label");
        this.node_tiaozhan_desc1 = cc.find("bg/desc1",this.node);
        this.node_tiaozhan_desc1_str = this.node_tiaozhan_desc1.getComponent("cc.Label");
        this.node_tiaozhan_desc1_icon = cc.find("bg/desc1/icon",this.node);
        this.node_tiaozhan_desc1_sus = cc.find("bg/desc1/sus",this.node);
        this.node_tiaozhan_desc1_fail = cc.find("bg/desc1/fail",this.node);
        this.node_tiaozhan_desc2 = cc.find("bg/desc2",this.node);
        this.node_tiaozhan_desc2_str = this.node_tiaozhan_desc2.getComponent("cc.Label");
        this.node_tiaozhan_desc2_icon = cc.find("bg/desc2/icon",this.node);
        this.node_tiaozhan_desc2_sus = cc.find("bg/desc2/sus",this.node);
        this.node_tiaozhan_desc2_fail = cc.find("bg/desc2/fail",this.node);

        this.node_tiaozhan_jump = cc.find("jump",this.node);
        this.node_tiaozhan_again = cc.find("again",this.node);
        this.node_tiaozhan_jump_num = cc.find("jump/num",this.node).getComponent("cc.Label");
    },

    updateUI: function(a,b)
    {
        //var currLevel = storage.getStorageLevel();
        if(this.main.tiaozhanlv >= this.res.levels.length-1)
        {
            this.node_tiaozhan_jump.active = false;
            this.node_tiaozhan_again.x = cc.winSize.width/2;
        }

        this.node_tiaozhan_coin.string = storage.getStorageCoin();

        this.node_tiaozhan_desc2.active = false;
        var lvdata = this.res.levels[this.main.tiaozhanlv][0];
        this.node_tiaozhan_desc1_str.string = lvdata.desc;
        this.node_tiaozhan_desc1_sus.active = a;
        this.node_tiaozhan_desc1_fail.active = !a;


        if(lvdata.type == 3 || lvdata.type == 4 || lvdata.type == 6)
        {
            this.node_tiaozhan_desc2.active = true;
            this.node_tiaozhan_desc2_str.string = lvdata.desc2;

            this.node_tiaozhan_desc2_sus.active = b;
            this.node_tiaozhan_desc2_fail.active = !b;
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

    updateJumpNum: function()
    {
        this.jumpnum += 1;
        this.node_tiaozhan_jump_num.string = "(" + this.jumpnum +"/2)";

        if(this.jumpnum >= 2)
        {
            var currLevel = storage.getStorageLevel();
            this.award = 10;
            if(this.main.tiaozhanlv == currLevel)
            {
                this.award = 10+this.main.tiaozhanlv*2;
                storage.setStorageLevel(this.main.tiaozhanlv+1);
            }

            if(this.main.tiaozhanlv+1 < this.res.levels.length)
            {
                storage.setStorageCoin(storage.getStorageCoin()+this.award);
                this.res.showToast("金币+"+this.award);
                this.main.tiaozhanlv = this.main.tiaozhanlv + 1;
                this.main.openTiaoZhandesc(this.main.tiaozhanlv);
                this.hide();
            }
        }
        else
        {
            this.res.showToast("在看一次就能跳过本关啦");
        }
    },

    show: function(a,b)
    {
        this.node.active = true;
        this.updateUI(a,b);
        this.main.wxBannerHide();
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
        else if(data == "jump")
        {
            this.jump();
        }
        else if(data == "again")
        {
            this.startGame(this.main.tiaozhanlv);
        }
        cc.log(data);
    },

    jump: function()
    {
        this.main.wxVideoShow(5);
    },

    startGame: function(level)
    {
        this.main.tiaozhanlv = level;
        this.main.again();
        this.main.startTiaoZhan();
        this.hide();
    }
});
