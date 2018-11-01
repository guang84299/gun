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
        this.node_baoxiang = this.node;
        this.node_baoxiang_guang = cc.find("bg/guang",this.node_baoxiang);
        this.node_baoxiang_coin = cc.find("bg/node_coin",this.node_baoxiang);
        this.node_baoxiang_card = cc.find("bg/node_card",this.node_baoxiang);
        this.node_baoxiang_aim = cc.find("bg/node_aim",this.node_baoxiang);
        this.node_baoxiang_gun = cc.find("bg/node_gun",this.node_baoxiang);

        this.node_baoxiang_gun_title = cc.find("bg/node_gun/title",this.node_baoxiang);
        this.node_baoxiang_gun_gun = cc.find("bg/node_gun/gun",this.node_baoxiang);
        this.node_baoxiang_gun_desc = cc.find("bg/node_gun/desc",this.node_baoxiang);


        this.node_baoxiang_guang.runAction(cc.repeatForever(
            cc.rotateBy(1,180)
        ));

        this.type = "coin";
        this.gunId = 0;
    },

    updateUI: function()
    {
        if(this.type == "coin")
        {
            this.node_baoxiang_coin.active = true;
        }
        else if(this.type == "card")
        {
            this.node_baoxiang_card.active = true;
        }
        else if(this.type == "aim")
        {
            this.node_baoxiang_aim.active = true;
        }
        else if(this.type == "gun")
        {
            this.node_baoxiang_gun.active = true;

            this.node_baoxiang_gun_title.getComponent("cc.Label").string = "获得"+this.res.gunsconfig[this.gunId-1].name;
            this.node_baoxiang_gun_desc.getComponent("cc.Label").string = "获得"+this.res.gunsconfig[this.gunId-1].name+"可在本局中使用";
            var gun = cc.instantiate(this.res.guns[this.gunId-1]);
            gun.scale = 2;
            this.node_baoxiang_gun_gun.addChild(gun);
        }
        //this.node_card_num.getComponent("cc.Label").string = storage.getStorageCard();
    },

    show: function(type,gunId)
    {
        this.type = type;
        this.gunId = gunId ? gunId : 0;

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
        if(data == "close")
        {
            //this.main.wxQuanState(true);
            this.hide();
        }
        else if(data == "sendcard")
        {
            var self = this;
            this.main.qianqista.event("btn_baoxiang_open");
            this.main.wxVideoShow(12,function(res){
                if(res)
                {
                    if(self.type == "coin")
                    {
                        self.main.updateBaoXiangCoin();
                    }
                    else if(self.type == "card")
                    {
                        self.main.updateBaoXiangFangDanyi();
                    }
                    else if(self.type == "aim")
                    {
                        self.main.updateBaoXiangAim();
                    }
                    else if(self.type == "gun")
                    {
                        self.main.updateBaoXiangGun();
                    }

                    self.hide();
                }
                else{
                    self.res.showToast("获取失败");
                }
            });
        }
       
        cc.log(data);
    }
    
});
