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
        this.node_gun = this.node;
        this.node_gun_center = cc.find("center",this.node_gun);
        this.node_gun_top_player = cc.find("top/player",this.node_gun);
        this.node_gun_score = cc.find("score",this.node_gun);
        this.node_gun_coin = cc.find("coin/num",this.node_gun);
        this.node_gun_page = cc.find("page",this.node_gun);
        this.node_gun_page1 = cc.find("page/view/content/page_1",this.node_gun);
        this.node_gun_page2 = cc.find("page/view/content/page_2",this.node_gun);
        this.node_gun_page3 = cc.find("page/view/content/page_3",this.node_gun);
        this.node_roleyaoqing = cc.find("roleyaoqing",this.node_gun);

        this.updateUI();
    },

    updateUI: function()
    {
        var s = cc.winSize;
        this.node_roleyaoqing.active = this.node_roleyaoqing_active;
        this.node_gun_center.height = s.height - 335;
        this.node_gun_center.color = this.main.ltcolor;

        this.node_gun_top_player.destroyAllChildren();
        var player = cc.instantiate(this.res.players[this.main.GAME.currPlayer]);
        this.node_gun_top_player.addChild(player);

        var gunConf = this.res.gunsconfig[this.main.GAME.currGun];
        var gun = cc.instantiate(this.res.guns[this.main.GAME.currGun]);
        gun.y = player.height*0.3 + gunConf.y;
        player.addChild(gun);

        this.node_gun_score.getComponent("cc.Label").string = storage.getStorageScore();
        this.node_gun_coin.getComponent("cc.Label").string = storage.getStorageCoin();

        cc.find("gunjiesuo/coinbg",this.node_gun).color = this.main.ltcolor;
        cc.find("gunjiesuo/txt",this.node_gun).color = this.main.ltcolor;
        var jscoin = cc.find("gunjiesuo/coin",this.node_gun);
        jscoin.color = this.main.ltcolor;
        var index = this.node_gun_page.getComponent("cc.PageView").getCurrentPageIndex();
        if(index == 0)
            jscoin.getComponent("cc.Label").string = (storage.getStorageGunJieSuoNum()*50 + 200);
        else
            jscoin.getComponent("cc.Label").string = (storage.getStorageGunJieSuoNum2()*50 + 750);

        cc.find("roleyaoqing/coinbg",this.node_gun).color = this.main.ltcolor;
        cc.find("roleyaoqing/txt",this.node_gun).color = this.main.ltcolor;
        cc.find("roleyaoqing/txt2",this.node_gun).color = this.main.ltcolor;
        cc.find("roleyaoqing/coin",this.node_gun).color = this.main.ltcolor;

        var currGun = storage.getStorageCurrGun();
        for(var i=1;i<=19;i++)
        {
            if(i == 10)
                continue;
            var item = null;
            if(i<10)
                item = cc.find("item_"+i,this.node_gun_page1);
            else if(i>10)
            {
                item = cc.find("item_"+(i-10),this.node_gun_page2);
            }
            var box1 = cc.find("box_1",item);
            var box2 = cc.find("box_2",item);
            var txt1 = cc.find("txt1",item);
            var txt2 = cc.find("txt2",item);
            item.gunId = i;

            txt1.color = cc.color(255,255,255);
            if(txt2)
                txt2.color = cc.color(255,255,255);

            if(i == currGun)
            {
                box1.active = false;
                box2.active = true;
                box2.color = cc.color(243,180,69);
            }
            else
            {
                box1.active = true;
                box2.active = false;
                if(storage.getStorageGun(i) == 1)
                {
                    box1.color = cc.color(243,180,69);
                    item.canset = true;
                }
                else
                {
                    box1.color = cc.color(100,100,100);
                    txt1.color = cc.color(100,100,100);
                    if(txt2)
                        txt2.color = cc.color(100,100,100);
                    item.canset = false;
                }
            }
        }
        this.updateGunRiQi();

        storage.playSound(this.res.audio_role);
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
        else if(data == "gunjiesuo")
        {
            var index = this.node_gun_page.getComponent("cc.PageView").getCurrentPageIndex();
            if(index == 0)
                this.gunjiesuo();
            else if(index == 1)
                this.gunjiesuo2();
        }
        else if(data == "gunitem")
        {
            if(event.target.canset)
            {
                this.setGun(event.target.gunId);
            }
        }
        else if(data == "yaoqing")
        {
            
        }
        cc.log(data);
    },

    pageScoll: function(num,target,data)
    {
        if(data == "page_gun")
        {
            var index = this.node_gun_page.getComponent("cc.PageView").getCurrentPageIndex();
            if(index != 2)
            {
                if(this.main.GAME.fangdanyi)
                {
                    cc.find("roleyaoqing",this.node_gun).active = true;
                }
                cc.find("gunjiesuo",this.node_gun).active = true;
                if(index == 0)
                {
                    cc.find("gunjiesuo/coin",this.node_gun).getComponent("cc.Label").string = (storage.getStorageGunJieSuoNum()*50 + 200);
                }
                else if(index == 1)
                {
                    cc.find("gunjiesuo/coin",this.node_gun).getComponent("cc.Label").string = (storage.getStorageGunJieSuoNum2()*50 + 750);
                }
            }
            else
            {
                cc.find("gunjiesuo",this.node_gun).active = false;
                cc.find("roleyaoqing",this.node_gun).active = false;
            }
        }
    },

    gunjiesuo: function()
    {
        var self = this;
        var needcoin = storage.getStorageGunJieSuoNum()*50 + 200;
        if(storage.getStorageCoin()< needcoin)
        {
            this.main.openCoinNode();
        }
        else
        {
            var uopen = [];
            var items = [];
            for(var i=1;i<=9;i++)
            {
                if(storage.getStorageGun(i) != 1)
                {
                    uopen.push(i);
                    var item = cc.find("item_" + i, this.node_gun_page1);
                    var box1 = cc.find("box_1", item);
                    items.push(box1);
                }
            }
            if(uopen.length<=0)
            {
                this.res.showToast("枪支已经全部开启");
            }
            else
            {
                var act = this.node_gun_page1.getActionByTag(1);
                if(act && !act.isDone())
                    return;
                var id = Math.floor(Math.random()*uopen.length);
                var dt = 0;
                for(var n=0;n<2;n++)
                {
                    for(var i=0;i<items.length;i++)
                    {
                        var box = items[i];
                        var seq = cc.sequence(
                            cc.delayTime(0.1+dt),
                            cc.tintTo(0,82,175,226),
                            cc.callFunc(function(){
                                storage.playSound(self.res.audio_rand);
                            }),
                            cc.delayTime(0.1),
                            cc.tintTo(0,100,100,100)
                        );
                        dt += 0.2;
                        box.runAction(seq);
                        if(n == 1 && id == i)
                        {
                            id = uopen[id];
                            break;
                        }
                    }
                }
                dt += 0.3;
                var seq = cc.sequence(
                    cc.delayTime(dt),
                    cc.callFunc(function(){
                        storage.playSound(self.res.audio_jiesuo);
                        storage.setStorageCoin(storage.getStorageCoin() - needcoin);
                        storage.setStorageGun(id);
                        storage.setStorageGunJieSuoNum(parseInt(storage.getStorageGunJieSuoNum())+1);
                        self.main.judgeChengjiuUI();
                        self.main.uploadData();
                        //res.showToast("角色已经开启");
                        self.updateUI();
                        self.main.updateDian();
                        var jiesuonum = parseInt(storage.getStorageGunJieSuoNum()) + parseInt(storage.getStorageGunJieSuoNum2());
                        if(jiesuonum >= 2)
                            self.main.qianqista.event("jiesuo_gun_num_"+jiesuonum);
                        self.main.updateDitu();
                    })
                );
                seq.setTag(1);
                this.node_gun_page1.runAction(seq);

            }
        }
    },

    gunjiesuo2: function()
    {
        var self = this;
        var needcoin = storage.getStorageGunJieSuoNum2()*50 + 750;
        if(storage.getStorageCoin()< needcoin)
        {
            this.main.openCoinNode();
        }
        else
        {
            var uopen = [];
            var items = [];
            for(var i=1;i<=9;i++)
            {
                if(storage.getStorageGun(i+10) != 1)
                {
                    uopen.push(i);
                    var item = cc.find("item_" + i, this.node_gun_page2);
                    var box1 = cc.find("box_1", item);
                    items.push(box1);
                }
            }
            if(uopen.length<=0)
            {
                this.res.showToast("枪支已经全部开启");
            }
            else
            {
                var act = this.node_gun_page2.getActionByTag(1);
                if(act && !act.isDone())
                    return;
                var id = Math.floor(Math.random()*uopen.length);
                var dt = 0;
                for(var n=0;n<2;n++)
                {
                    for(var i=0;i<items.length;i++)
                    {
                        var box = items[i];
                        var seq = cc.sequence(
                            cc.delayTime(0.1+dt),
                            cc.tintTo(0,82,175,226),
                            cc.callFunc(function(){
                                storage.playSound(self.res.audio_rand);
                            }),
                            cc.delayTime(0.1),
                            cc.tintTo(0,100,100,100)
                        );
                        dt += 0.2;
                        box.runAction(seq);
                        if(n == 1 && id == i)
                        {
                            id = uopen[id] + 10;
                            break;
                        }
                    }
                }
                dt += 0.3;
                var seq = cc.sequence(
                    cc.delayTime(dt),
                    cc.callFunc(function(){
                        storage.playSound(self.res.audio_jiesuo);
                        storage.setStorageCoin(storage.getStorageCoin() - needcoin);
                        storage.setStorageGun(id);
                        storage.setStorageGunJieSuoNum2(parseInt(storage.getStorageGunJieSuoNum2())+1);
                        self.main.judgeChengjiuUI();
                        self.main.uploadData();
                        //res.showToast("角色已经开启");
                        self.updateUI();
                        self.main.updateDian();

                        var jiesuonum = parseInt(storage.getStorageGunJieSuoNum()) + parseInt(storage.getStorageGunJieSuoNum2());
                        if(jiesuonum >= 2)
                            self.main.qianqista.event("jiesuo_gun_num_"+jiesuonum);
                        self.main.updateDitu();
                    })
                );
                seq.setTag(1);
                this.node_gun_page2.runAction(seq);

            }
        }
    },

    setGun: function(id)
    {
        var currGun = storage.getStorageCurrGun();
        if(currGun != id)
        {
            storage.playSound(this.res.audio_role_huan);
            storage.setStorageCurrGun(id);
            this.main.GAME.currGun = storage.getStorageCurrGun()-1;
            this.main.GAME.currGunTmp = this.main.GAME.currGun;
            this.updateUI();
            this.main.uploadData();
        }
    },

    updateGunRiQi: function()
    {
        //日期
        var currQianDao = storage.getStorageQianDao();

        for(var i=1;i<=7;i++)
        {
            var item = cc.find("riqi/riqi"+i,this.node_gun_page3);
            item.riqiId = i;
            item.canset = false;
            if(i<currQianDao)
            {
                item.color = cc.color(100,100,100);
            }
            else if(i==currQianDao)
            {
                item.color = cc.color(243,180,69);
                item.canset = true;
            }
        }

        var currGun = storage.getStorageCurrGun();
        var box1 = cc.find("box_1",this.node_gun_page3);
        var box2 = cc.find("box_2",this.node_gun_page3);
        this.node_gun_page3.gunId = 10;

        if(10 == currGun)
        {
            box1.active = false;
            box2.active = true;
            box2.color = cc.color(243,180,69);
        }
        else
        {
            box1.active = true;
            box2.active = false;
            if(storage.getStorageGun(10) == 1)
            {
                box1.color = cc.color(243,180,69);
                this.node_gun_page3.canset = true;
            }
            else
            {
                box1.color = cc.color(100,100,100);
                this.node_gun_page3.canset = false;
            }
        }
    },

    roleyaoqing: function(visible)
    {
        this.node_roleyaoqing_active = visible;
    },

    updateCoin: function(num)
    {
        this.node_gun_coin.getComponent("cc.Label").string = num+"";
    }
});
