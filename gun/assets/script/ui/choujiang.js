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
        this.node_choujiang = this.node;
        this.node_choujiang_sendcard = cc.find("bg/sendcard",this.node_choujiang);
        this.node_choujiang_bg = cc.find("bg/bg",this.node_choujiang);

        this.gunId = 0;
    },

    updateUI: function()
    {
        var gunIds = [];
        for(var i=1;i<=9;i++)
        {
            if(storage.getStorageGun(i) == 0)
                gunIds.push(i);
        }
        if(gunIds.length>0)
        {
            this.gunId = gunIds[Math.floor(Math.random()*gunIds.length)];
        }
        if(this.gunId != 0)
        {
            var box4 = cc.find("box4",this.node_choujiang_bg);
            var sel = cc.find("sel",box4);
            var sp = cc.find("sp",box4);
            var gun = cc.find("gun",box4);
            var coin = cc.find("coin",box4);

            box4.color = cc.color(82,175,226);
            sel.color = cc.color(82,175,226);
            sp.active = false;

            var g = cc.instantiate(this.res.guns[this.gunId-1]);
            gun.addChild(g);

            coin.getComponent("cc.Label").string = this.res.gunsconfig[this.gunId-1].name;
            coin.scale = 0.6;
        }

        this.node_choujiang_sendcard.color = cc.color(60,60,60);

        var boxs = this.node_choujiang_bg.children;
        for(var i=0;i<boxs.length;i++)
        {
            var sel = cc.find("sel",boxs[i]);
            sel.selId = i+1;
        }
    },

    choujiang: function()
    {
        var self = this;
        this.isChouJiang = true;
        this.node_choujiang_sendcard.color = cc.color(60,60,60);
        this.node_choujiang_sendcard.stopAllActions();

        var jiangs = [];
        var boxs = this.node_choujiang_bg.children;
        for(var i=0;i<boxs.length;i++)
        {
            var sel = cc.find("sel",boxs[i]);
            if(sel.opacity == 0)
                jiangs.push(sel);
        }

        var index = 0;
        if(jiangs.length == 4 || jiangs.length == 3)
        {
            var r = Math.random();
            if(r<0.5)
                index = 1;
            else if(r<0.8)
                index = 2;
            else
                index = 3;
        }
        else if(jiangs.length == 2)
        {
            var r = Math.random();
            if(r<0.6)
                index = 1;
            else
                index = 2;
        }
        else if(jiangs.length == 1)
        {
            index = 1;
        }

        var dt = 0;
        for(var n=0;n<3;n++)
        {
            for(var i=0;i<jiangs.length;i++)
            {
                var box = jiangs[i];
                var seq = cc.sequence(
                    cc.delayTime(0.1+dt),
                    cc.fadeIn(0),
                    cc.callFunc(function(){
                        storage.playSound(self.res.audio_rand);
                    }),
                    cc.delayTime(0.1),
                    cc.fadeOut()
                );
                dt += 0.2;
                box.runAction(seq);
                if(n == 2 && index == i+1)
                {
                    break;
                }
            }
        }
        dt += 0.3;
        var seq = cc.sequence(
            cc.delayTime(dt),
            cc.callFunc(function(){
                storage.playSound(self.res.audio_jiesuo);
                jiangs[index-1].opacity = 255;
                if(jiangs[index-1].selId == 4 && self.gunId != 0)
                {
                    storage.setStorageGun(self.gunId);
                    storage.setStorageGunJieSuoNum(parseInt(storage.getStorageGunJieSuoNum())+1);
                    self.main.judgeChengjiuUI();
                    self.main.updateDian();
                    var jiesuonum = parseInt(storage.getStorageGunJieSuoNum()) + parseInt(storage.getStorageGunJieSuoNum2());
                    if(jiesuonum >= 2)
                        self.main.qianqista.event("jiesuo_gun_num_"+jiesuonum);
                    self.main.updateDitu();

                    self.res.showToast("获得"+self.res.gunsconfig[self.gunId-1].name);
                }
                else{
                    var coins = [20,50,75,120];
                    var coin = coins[jiangs[index-1].selId-1];
                    storage.setStorageCoin(storage.getStorageCoin() + coin);

                    self.res.showToast("金币+"+coin);
                }
                self.main.uploadData();
                if(jiangs.length > 1)
                {
                    self.isChouJiang = false;
                    self.node_choujiang_sendcard.color = cc.color(255,255,255);
                    self.node_choujiang_sendcard.runAction(cc.repeatForever(
                        cc.sequence(
                            cc.scaleTo(0.5,1.2).easing(cc.easeSineOut()),
                            cc.scaleTo(0.5,1.0).easing(cc.easeSineOut()),
                            cc.delayTime(0.5)
                        )
                    ));
                }
            })
        );
        seq.setTag(1);
        this.node.runAction(seq);
    },

    show: function()
    {
        this.node.active = true;
        this.updateUI();
        this.main.wxBannerShow();

        this.choujiang();
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
            this.hide();
        }
        else if(data == "sendcard")
        {
            if(this.isChouJiang)
                return;
            var self = this;
            this.main.qianqista.event("btn_choujiang_open");
            this.main.wxVideoShow(13,function(res){
                if(res)
                {
                    self.choujiang();
                }
                else{
                    self.res.showToast("获取失败");
                }
            });
        }
       
        cc.log(data);
    }
    
});
