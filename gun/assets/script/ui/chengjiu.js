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
        this.node_chengjiu = this.node;
        this.node_chengjiu_center = cc.find("center",this.node_chengjiu);
        this.node_chengjiu_top_player = cc.find("top/player",this.node_chengjiu);
        this.node_chengjiu_score = cc.find("score",this.node_chengjiu);
        this.node_chengjiu_coin = cc.find("coin/num",this.node_chengjiu);
        this.node_chengjiu_scroll_content = cc.find("scroll/view/content",this.node_chengjiu);

        this.updateUI();
    },

    updateUI: function()
    {
        var s = cc.winSize;
        this.node_chengjiu_center.height = s.height - 335;
        this.node_chengjiu_center.color = this.main.ltcolor;

        this.node_chengjiu_top_player.destroyAllChildren();
        var player = cc.instantiate(this.res.players[this.main.GAME.currPlayer]);
        this.node_chengjiu_top_player.addChild(player);

        var gunConf = this.res.gunsconfig[this.main.GAME.currGun];
        var gun = cc.instantiate(this.res.guns[this.main.GAME.currGun]);
        gun.y = player.height*0.3 + gunConf.y;
        player.addChild(gun);

        this.node_chengjiu_score.getComponent("cc.Label").string = storage.getStorageScore();
        this.node_chengjiu_coin.getComponent("cc.Label").string = storage.getStorageCoin();

        for(var i=1;i<=6;i++)
        {
            var item = cc.find("item_"+i,this.node_chengjiu_scroll_content);
            var lnum = cc.find("num",item);
            var box = cc.find("box",item);
            var award = cc.find("award",box);
            var curr = cc.find("curr",box);
            box.cjid = i;
            if(i == 1)
            {
                var num = storage.getStorageHitEnemyNum();
                var awardnum = storage.getStorageHitEnemyAwardNum();
                var isend = false;
                if(awardnum>=this.res.chengjiuconfig.hitenemy.length)
                {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.res.chengjiuconfig.hitenemy[awardnum];
                lnum.getComponent("cc.Label").string = "x"+data.num;
                award.getComponent("cc.Label").string = data.coin;
                curr.getComponent("cc.Label").string = num + "/"+ data.num;

                box.coin = data.coin;
                box.canset = false;
                if(isend)
                {
                    box.color = cc.color(181,181,181);
                }
                else if(num >= data.num)
                {
                    box.color = cc.color(143,195,31);
                    box.canset = true;
                }
                else
                {
                    box.color = cc.color(255,255,255);
                }
            }
            else if(i == 2)
            {
                var num = storage.getStorageHitHeadNum();
                var awardnum = storage.getStorageHitHeadAwardNum();
                var isend = false;
                if(awardnum>=this.res.chengjiuconfig.hithead.length)
                {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.res.chengjiuconfig.hithead[awardnum];
                lnum.getComponent("cc.Label").string = "x"+data.num;
                award.getComponent("cc.Label").string = data.coin;
                curr.getComponent("cc.Label").string = num + "/"+ data.num;

                box.coin = data.coin;
                box.canset = false;
                if(isend)
                {
                    box.color = cc.color(181,181,181);
                }
                else if(num >= data.num)
                {
                    box.color = cc.color(143,195,31);
                    box.canset = true;
                }
                else
                {
                    box.color = cc.color(255,255,255);
                }
            }
            else if(i == 3)
            {
                var num = storage.getStorageHitBossNum();
                var awardnum = storage.getStorageHitBossAwardNum();
                var isend = false;
                if(awardnum>=this.res.chengjiuconfig.hitboss.length)
                {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.res.chengjiuconfig.hitboss[awardnum];
                lnum.getComponent("cc.Label").string = "x"+data.num;
                award.getComponent("cc.Label").string = data.coin;
                curr.getComponent("cc.Label").string = num + "/"+ data.num;

                box.coin = data.coin;
                box.canset = false;
                if(isend)
                {
                    box.color = cc.color(181,181,181);
                }
                else if(num >= data.num)
                {
                    box.color = cc.color(143,195,31);
                    box.canset = true;
                }
                else
                {
                    box.color = cc.color(255,255,255);
                }
            }
            else if(i == 4)
            {
                var num = storage.getStorageGunJieSuoNum();
                num = parseInt(num) + parseInt(storage.getStorageGunJieSuoNum2());
                var awardnum = storage.getStorageGunJieSuoAwardNum();
                var isend = false;
                if(awardnum>=this.res.chengjiuconfig.jiesuogun.length)
                {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.res.chengjiuconfig.jiesuogun[awardnum];
                lnum.getComponent("cc.Label").string = "x"+data.num;
                award.getComponent("cc.Label").string = data.coin;
                curr.getComponent("cc.Label").string = num + "/"+ data.num;

                box.coin = data.coin;
                box.canset = false;
                if(isend)
                {
                    box.color = cc.color(181,181,181);
                }
                else if(num >= data.num)
                {
                    box.color = cc.color(143,195,31);
                    box.canset = true;
                }
                else
                {
                    box.color = cc.color(255,255,255);
                }
            }
            else if(i == 5)
            {
                var num = storage.getStorageRoleJieSuoNum();
                var awardnum = storage.getStorageRoleJieSuoAwardNum();
                var isend = false;
                if(awardnum>=this.res.chengjiuconfig.jiesuorole.length)
                {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.res.chengjiuconfig.jiesuorole[awardnum];
                lnum.getComponent("cc.Label").string = "x"+data.num;
                award.getComponent("cc.Label").string = data.coin;
                curr.getComponent("cc.Label").string = num + "/"+ data.num;

                box.coin = data.coin;
                box.canset = false;
                if(isend)
                {
                    box.color = cc.color(181,181,181);
                }
                else if(num >= data.num)
                {
                    box.color = cc.color(143,195,31);
                    box.canset = true;
                }
                else
                {
                    box.color = cc.color(255,255,255);
                }
            }
            else if(i == 6)
            {
                var num = storage.getStorageWinNum();
                var awardnum = storage.getStorageWinNumAwardNum();
                var isend = false;
                if(awardnum>=this.res.chengjiuconfig.duizhan.length)
                {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.res.chengjiuconfig.duizhan[awardnum];
                lnum.getComponent("cc.Label").string = "x"+data.num;
                award.getComponent("cc.Label").string = data.coin;
                curr.getComponent("cc.Label").string = num + "/"+ data.num;

                box.coin = data.coin;
                box.canset = false;
                if(isend)
                {
                    box.color = cc.color(181,181,181);
                }
                else if(num >= data.num)
                {
                    box.color = cc.color(143,195,31);
                    box.canset = true;
                }
                else
                {
                    box.color = cc.color(255,255,255);
                }
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
        if(data == "home")
        {
            this.main.goMain();
            this.hide();
        }
        else if(data == "cjitem")
        {
            if(event.target.canset)
            {
                this.lingquChengjiu(event.target.cjid,event.target.coin);
            }
        }
        cc.log(data);
    },

    lingquChengjiu: function(id,coin)
    {
        storage.setStorageCoin(parseInt(storage.getStorageCoin())+coin);
        if(id == 1)
        {
            var awardnum = storage.getStorageHitEnemyAwardNum();
            storage.setStorageHitEnemyAwardNum(parseInt(awardnum)+1);
        }
        else if(id == 2)
        {
            var awardnum = storage.getStorageHitHeadAwardNum();
            storage.setStorageHitHeadAwardNum(parseInt(awardnum)+1);
        }
        else if(id == 3)
        {
            var awardnum = storage.getStorageHitBossAwardNum();
            storage.setStorageHitBossAwardNum(parseInt(awardnum)+1);
        }
        else if(id == 4)
        {
            var awardnum = storage.getStorageGunJieSuoAwardNum();
            storage.setStorageGunJieSuoAwardNum(parseInt(awardnum)+1);
        }
        else if(id == 5)
        {
            var awardnum = storage.getStorageRoleJieSuoAwardNum();
            storage.setStorageRoleJieSuoAwardNum(parseInt(awardnum)+1);
        }
        else if(id == 6)
        {
            var awardnum = storage.getStorageWinNumAwardNum();
            storage.setStorageWinNumAwardNum(parseInt(awardnum)+1);
        }

        this.main.uploadData();
        this.res.showToast("金币+"+coin);
        this.updateUI();
        this.main.updateDian();
        storage.playSound(this.res.audio_coin);

        var awardnum = parseInt(storage.getStorageHitEnemyAwardNum());
        awardnum += parseInt(storage.getStorageHitHeadAwardNum());
        awardnum += parseInt(storage.getStorageHitBossAwardNum());
        awardnum += parseInt(storage.getStorageGunJieSuoAwardNum());
        awardnum += parseInt(storage.getStorageRoleJieSuoAwardNum());

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
        this.node_chengjiu_coin.getComponent("cc.Label").string = num+"";
    }
});
