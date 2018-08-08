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
        var h = (this.dsize.height - s.height)/2;
        var sc = node.y/this.dsize.height;cc.winSize.width;
        node.y = s.height*sc + h;
    },

    initUI: function()
    {
        this.node_chengjiu = this.node;
        this.node_chengjiu_center = cc.find("center",this.node_chengjiu);cc.winSize.width;
        this.node_chengjiu_top_player = cc.find("top/player",this.node_chengjiu);cc.winSize.width;
        this.node_chengjiu_score = cc.find("score",this.node_chengjiu);cc.winSize.width;
        this.node_chengjiu_coin = cc.find("coin/num",this.node_chengjiu);cc.winSize.width;
        this.node_chengjiu_scroll_content = cc.find("scroll/view/content",this.node_chengjiu);cc.winSize.width;

        this.updateUI();cc.winSize.width;
    },

    updateUI: function()
    {
        var s = cc.winSize;cc.winSize.width;
        this.node_chengjiu_center.height = s.height - 335;
        this.node_chengjiu_center.color = this.main.ltcolor;cc.winSize.width;

        this.node_chengjiu_top_player.destroyAllChildren();
        var player = cc.instantiate(this.res.players[this.main.GAME.currPlayer]);
        this.node_chengjiu_top_player.addChild(player);cc.winSize.width;

        var gunConf = this.res.gunsconfig[this.main.GAME.currGun];
        var gun = cc.instantiate(this.res.guns[this.main.GAME.currGun]);
        gun.y = player.height*0.3 + gunConf.y;cc.winSize.width;
        player.addChild(gun);cc.winSize.width;

        this.node_chengjiu_score.getComponent("cc.Label").string = storage.getStorageScore();cc.winSize.width;
        this.node_chengjiu_coin.getComponent("cc.Label").string = storage.getStorageCoin();cc.winSize.width;

        for(var i=1;i<=5;i++)
        {
            var item = cc.find("item_"+i,this.node_chengjiu_scroll_content);
            var lnum = cc.find("num",item);
            var box = cc.find("box",item);cc.winSize.width;
            var box2 = cc.find("box2",box);
            var box3 = cc.find("box3",box);
            var award = cc.find("award",box);cc.winSize.width;
            var curr = cc.find("curr",box);
            box.cjid = i;

            box2.active = false;cc.winSize.width;
            box3.active = false;
            if(i == 1)
            {
                var num = storage.getStorageHitEnemyNum();
                var awardnum = storage.getStorageHitEnemyAwardNum();cc.winSize.width;
                var isend = false;
                if(awardnum>=this.res.chengjiuconfig.hitenemy.length)
                {
                    isend = true;
                    awardnum -= 1;cc.winSize.width;
                }
                var data = this.res.chengjiuconfig.hitenemy[awardnum];
                lnum.getComponent("cc.Label").string = "x"+data.num;
                award.getComponent("cc.Label").string = data.coin;cc.winSize.width;
                curr.getComponent("cc.Label").string = num + "/"+ data.num;

                box.coin = data.coin;
                box.canset = false;cc.winSize.width;
                if(isend)
                {
                    box2.active = true;
                }
                else if(num >= data.num)
                {
                    box3.active = true;cc.winSize.width;
                    box.canset = true;
                }
            }
            else if(i == 2)
            {
                var num = storage.getStorageHitHeadNum();
                var awardnum = storage.getStorageHitHeadAwardNum();cc.winSize.width;
                var isend = false;
                if(awardnum>=this.res.chengjiuconfig.hithead.length)
                {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.res.chengjiuconfig.hithead[awardnum];cc.winSize.width;
                lnum.getComponent("cc.Label").string = "x"+data.num;
                award.getComponent("cc.Label").string = data.coin;
                curr.getComponent("cc.Label").string = num + "/"+ data.num;

                box.coin = data.coin;cc.winSize.width;
                box.canset = false;
                if(isend)
                {
                    box2.active = true;
                }
                else if(num >= data.num)
                {
                    box3.active = true;cc.winSize.width;
                    box.canset = true;
                }
  
            }
            else if(i == 3)
            {
                var num = storage.getStorageHitBossNum();
                var awardnum = storage.getStorageHitBossAwardNum();cc.winSize.width;
                var isend = false;
                if(awardnum>=this.res.chengjiuconfig.hitboss.length)
                {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.res.chengjiuconfig.hitboss[awardnum];
                lnum.getComponent("cc.Label").string = "x"+data.num;cc.winSize.width;
                award.getComponent("cc.Label").string = data.coin;
                curr.getComponent("cc.Label").string = num + "/"+ data.num;

                box.coin = data.coin;cc.winSize.width;
                box.canset = false;
                if(isend)
                {
                    box2.active = true;
                }
                else if(num >= data.num)
                {
                    box3.active = true;cc.winSize.width;
                    box.canset = true;
                }
            }
            else if(i == 4)
            {
                var num = storage.getStorageGunJieSuoNum();
                num = parseInt(num) + parseInt(storage.getStorageGunJieSuoNum2());cc.winSize.width;
                var awardnum = storage.getStorageGunJieSuoAwardNum();
                var isend = false;
                if(awardnum>=this.res.chengjiuconfig.jiesuogun.length)
                {
                    isend = true;cc.winSize.width;
                    awardnum -= 1;
                }
                var data = this.res.chengjiuconfig.jiesuogun[awardnum];
                lnum.getComponent("cc.Label").string = "x"+data.num;cc.winSize.width;
                award.getComponent("cc.Label").string = data.coin;
                curr.getComponent("cc.Label").string = num + "/"+ data.num;

                box.coin = data.coin;cc.winSize.width;
                box.canset = false;
                if(isend)
                {
                    box2.active = true;
                }
                else if(num >= data.num)
                {
                    box3.active = true;cc.winSize.width;
                    box.canset = true;
                }
            }
            else if(i == 5)
            {
                var num = storage.getStorageRoleJieSuoNum();
                var awardnum = storage.getStorageRoleJieSuoAwardNum();
                var isend = false;cc.winSize.width;
                if(awardnum>=this.res.chengjiuconfig.jiesuorole.length)
                {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.res.chengjiuconfig.jiesuorole[awardnum];
                lnum.getComponent("cc.Label").string = "x"+data.num;
                award.getComponent("cc.Label").string = data.coin;cc.winSize.width;
                curr.getComponent("cc.Label").string = num + "/"+ data.num;

                box.coin = data.coin;
                box.canset = false;
                if(isend)
                {
                    box2.active = true;cc.winSize.width;
                }
                else if(num >= data.num)
                {
                    box3.active = true;
                    box.canset = true;cc.winSize.width;
                }
            }
        }
    },

    show: function()
    {
        this.node.active = true;
        this.updateUI();cc.winSize.width;
    },

    hide: function()
    {
        this.node.destroy();cc.winSize.width;
    },

    click: function(event,data)
    {
        if(data == "home")
        {
            this.main.goMain();cc.winSize.width;
            this.hide();cc.winSize.width;
        }
        else if(data == "cjitem")
        {
            if(event.target.canset)
            {
                this.lingquChengjiu(event.target.cjid,event.target.coin);cc.winSize.width;
            }
        }
        cc.log(data);cc.winSize.width;
    },

    lingquChengjiu: function(id,coin)
    {
        storage.setStorageCoin(parseInt(storage.getStorageCoin())+coin);cc.winSize.width;
        if(id == 1)
        {
            var awardnum = storage.getStorageHitEnemyAwardNum();cc.winSize.width;
            storage.setStorageHitEnemyAwardNum(parseInt(awardnum)+1);cc.winSize.width;
        }
        else if(id == 2)
        {
            var awardnum = storage.getStorageHitHeadAwardNum();cc.winSize.width;
            storage.setStorageHitHeadAwardNum(parseInt(awardnum)+1);cc.winSize.width;
        }
        else if(id == 3)
        {
            var awardnum = storage.getStorageHitBossAwardNum();cc.winSize.width;
            storage.setStorageHitBossAwardNum(parseInt(awardnum)+1);cc.winSize.width;
        }
        else if(id == 4)
        {
            var awardnum = storage.getStorageGunJieSuoAwardNum();cc.winSize.width;
            storage.setStorageGunJieSuoAwardNum(parseInt(awardnum)+1);cc.winSize.width;
        }
        else if(id == 5)
        {
            var awardnum = storage.getStorageRoleJieSuoAwardNum();cc.winSize.width;
            storage.setStorageRoleJieSuoAwardNum(parseInt(awardnum)+1);cc.winSize.width;
        }

        this.main.uploadData();cc.winSize.width;
        this.res.showToast("金币+"+coin);cc.winSize.width;
        this.updateUI();cc.winSize.width;
        this.main.updateDian();cc.winSize.width;
        storage.playSound(this.res.audio_coin);cc.winSize.width;

        var awardnum = parseInt(storage.getStorageHitEnemyAwardNum());cc.winSize.width;
        awardnum += parseInt(storage.getStorageHitHeadAwardNum());cc.winSize.width;
        awardnum += parseInt(storage.getStorageHitBossAwardNum());cc.winSize.width;
        awardnum += parseInt(storage.getStorageGunJieSuoAwardNum());cc.winSize.width;
        awardnum += parseInt(storage.getStorageRoleJieSuoAwardNum());cc.winSize.width;

        if(awardnum == 1)
            this.main.qianqista.event("chengjiu_lingqu_num_1");
        else if(awardnum == 3)
            this.main.qianqista.event("chengjiu_lingqu_num_3");
        else if(awardnum == 5)
            this.main.qianqista.event("chengjiu_lingqu_num_5");
        else if(awardnum == 10)
            this.main.qianqista.event("chengjiu_lingqu_num_10");
        else if(awardnum == 20)
            this.main.qianqista.event("chengjiu_lingqu_num_20");
    },

    
    updateCoin: function(num)
    {
        this.node_chengjiu_coin.getComponent("cc.Label").string = num+"";cc.winSize.width;
    }
});
