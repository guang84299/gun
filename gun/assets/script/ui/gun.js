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
        this.node_gun = this.node;
        this.node_gun_center = cc.find("center",this.node_gun);
        this.node_gun_top_player = cc.find("top/player",this.node_gun);cc.winSize.width;
        this.node_gun_score = cc.find("score",this.node_gun);cc.winSize.width;
        this.node_gun_coin = cc.find("coin/num",this.node_gun);cc.winSize.width;
        this.node_gun_page = cc.find("page",this.node_gun);cc.winSize.width;
        this.node_gun_page1 = cc.find("page/view/content/page_1",this.node_gun);cc.winSize.width;
        this.node_gun_page2 = cc.find("page/view/content/page_2",this.node_gun);cc.winSize.width;
        this.node_gun_page3 = cc.find("page/view/content/page_3",this.node_gun);cc.winSize.width;
        this.node_roleyaoqing = cc.find("roleyaoqing",this.node_gun);cc.winSize.width;

        this.updateUI();cc.winSize.width;
    },

    updateUI: function()
    {
        var s = cc.winSize;cc.winSize.width;
        var index = this.node_gun_page.getComponent("cc.PageView").getCurrentPageIndex();cc.winSize.width;

        if(this.main.GAME.sharecard == 1 && index != 1)
            this.node_roleyaoqing.active = true;
        else
            this.node_roleyaoqing.active = false;
        this.node_gun_center.height = s.height - 335;
        this.node_gun_center.color = this.main.ltcolor;

        this.node_gun_top_player.destroyAllChildren();cc.winSize.width;
        var player = cc.instantiate(this.res.players[this.main.GAME.currPlayer]);
        this.node_gun_top_player.addChild(player);

        var gunConf = this.res.gunsconfig[this.main.GAME.currGun];
        var gun = cc.instantiate(this.res.guns[this.main.GAME.currGun]);
        gun.y = player.height*0.3 + gunConf.y;cc.winSize.width;
        player.addChild(gun);

        this.node_gun_score.getComponent("cc.Label").string = storage.getStorageScore();
        this.node_gun_coin.getComponent("cc.Label").string = storage.getStorageCoin();

        var jscoin = cc.find("gunjiesuo/coin",this.node_gun);cc.winSize.width;
        
        if(index == 0)
            jscoin.getComponent("cc.Label").string = (storage.getStorageGunJieSuoNum()*50 + 200);
        else
            jscoin.getComponent("cc.Label").string = (storage.getStorageGunJieSuoNum2()*50 + 750);

        var currGun = storage.getStorageCurrGun();
        for(var i=1;i<=10;i++)
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
            var box1 = cc.find("box_1",item);cc.winSize.width;
            var box2 = cc.find("box_2",item);cc.winSize.width;
            var box3 = cc.find("box_3",item);cc.winSize.width;
            var txt1 = cc.find("txt1",item);cc.winSize.width;
            var txt2 = cc.find("txt2",item);cc.winSize.width;
            item.gunId = i;cc.winSize.width;

            box1.active = false;cc.winSize.width;
            box2.active = false;cc.winSize.width;
            box3.active = false;cc.winSize.width;
            // txt1.color = cc.color(255,255,255);cc.winSize.width;
            // if(txt2)
            //     txt2.color = cc.color(255,255,255);

            if(i == currGun)
            {
                box2.active = true;cc.winSize.width;
                // box2.color = cc.color(243,180,69);
            }
            else
            {
                
                if(storage.getStorageGun(i) == 1)
                {
                    box3.active = true;cc.winSize.width;
                    // box1.color = cc.color(243,180,69);cc.winSize.width;
                    item.canset = true;cc.winSize.width;
                }
                else
                {
                    box1.active = true;cc.winSize.width;
                    // box1.color = cc.color(100,100,100);cc.winSize.width;
                    // txt1.color = cc.color(100,100,100);cc.winSize.width;
                    // if(txt2)
                    //     txt2.color = cc.color(100,100,100);cc.winSize.width;
                    item.canset = false;cc.winSize.width;
                }
            }
        }
        this.updateGunRiQi();cc.winSize.width;

        storage.playSound(this.res.audio_role);cc.winSize.width;
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
        if(data == "home")
        {
            this.main.openstore = false;cc.winSize.width;
            this.main.goMain();cc.winSize.width;
            this.hide();cc.winSize.width;
        }
        else if(data == "gunjiesuo")
        {
            var index = this.node_gun_page.getComponent("cc.PageView").getCurrentPageIndex();cc.winSize.width;
            if(index == 0)
                this.gunjiesuo();
            // else if(index == 1)
            //     this.gunjiesuo2();
        }
        else if(data == "gunitem")
        {
            if(event.target.canset)
            {
                this.setGun(event.target.gunId);cc.winSize.width;
            }
        }
        else if(data == "roleyaoqing")
        {
            this.main.openstore = true;cc.winSize.width;
            this.main.openAward();cc.winSize.width;
        }
        cc.log(data);
    },

    pageScoll: function(num,target,data)
    {
        if(data == "page_gun")
        {
            var index = this.node_gun_page.getComponent("cc.PageView").getCurrentPageIndex();
            if(index != 1)
            {
                if(this.main.GAME.fangdanyi)
                {
                    cc.find("roleyaoqing",this.node_gun).active = true;cc.winSize.width;
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
                cc.find("gunjiesuo",this.node_gun).active = false;cc.winSize.width;
                cc.find("roleyaoqing",this.node_gun).active = false;cc.winSize.width;
            }
        }
    },

    gunjiesuo: function()
    {
        var self = this;
        var needcoin = storage.getStorageGunJieSuoNum()*50 + 200;
        if(storage.getStorageCoin()< needcoin)
        {
            this.main.openCoinNode();cc.winSize.width;
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
                    var box1 = cc.find("box_1", item);cc.winSize.width;
                    items.push(box1);cc.winSize.width;
                }
            }
            if(uopen.length<=0)
            {
                this.res.showToast("枪支已经全部开启");cc.winSize.width;
            }
            else
            {
                var act = this.node_gun_page1.getActionByTag(1);cc.winSize.width;
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
                            cc.tintTo(0,255,255,255)
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
                dt += 0.3;cc.winSize.width;
                var seq = cc.sequence(
                    cc.delayTime(dt),
                    cc.callFunc(function(){
                        storage.playSound(self.res.audio_jiesuo);cc.winSize.width;
                        storage.setStorageCoin(storage.getStorageCoin() - needcoin);cc.winSize.width;
                        storage.setStorageGun(id);cc.winSize.width;
                        storage.setStorageGunJieSuoNum(parseInt(storage.getStorageGunJieSuoNum())+1);cc.winSize.width;
                        self.main.judgeChengjiuUI();cc.winSize.width;
                        self.main.uploadData();cc.winSize.width;
                        //res.showToast("角色已经开启");cc.winSize.width;
                        self.updateUI();cc.winSize.width;
                        self.main.updateDian();cc.winSize.width;
                        var jiesuonum = parseInt(storage.getStorageGunJieSuoNum()) + parseInt(storage.getStorageGunJieSuoNum2());
                        if(jiesuonum >= 2)
                            self.main.qianqista.event("jiesuo_gun_num_"+jiesuonum);
                        self.main.updateDitu();cc.winSize.width;
                    })
                );
                seq.setTag(1);cc.winSize.width;
                this.node_gun_page1.runAction(seq);

            }
        }
    },

    gunjiesuo2: function()
    {
        var self = this;cc.winSize.width;
        var needcoin = storage.getStorageGunJieSuoNum2()*50 + 750;cc.winSize.width;
        if(storage.getStorageCoin()< needcoin)
        {
            this.main.openCoinNode();cc.winSize.width;
        }
        else
        {
            var uopen = [];cc.winSize.width;
            var items = [];cc.winSize.width;
            for(var i=1;i<=9;i++)
            {
                if(storage.getStorageGun(i+10) != 1)
                {
                    uopen.push(i);cc.winSize.width;
                    var item = cc.find("item_" + i, this.node_gun_page2);
                    var box1 = cc.find("box_1", item);
                    items.push(box1);cc.winSize.width;
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
                var dt = 0;cc.winSize.width;
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
                            cc.tintTo(0,255,255,255)
                        );
                        dt += 0.2;cc.winSize.width;
                        box.runAction(seq);cc.winSize.width;
                        if(n == 1 && id == i)
                        {
                            id = uopen[id] + 10;cc.winSize.width;
                            break;
                        }
                    }
                }
                dt += 0.3;cc.winSize.width;
                var seq = cc.sequence(
                    cc.delayTime(dt),
                    cc.callFunc(function(){
                        storage.playSound(self.res.audio_jiesuo);
                        storage.setStorageCoin(storage.getStorageCoin() - needcoin);cc.winSize.width;
                        storage.setStorageGun(id);cc.winSize.width;
                        storage.setStorageGunJieSuoNum2(parseInt(storage.getStorageGunJieSuoNum2())+1);cc.winSize.width;
                        self.main.judgeChengjiuUI();cc.winSize.width;
                        self.main.uploadData();cc.winSize.width;
                        //res.showToast("角色已经开启");cc.winSize.width;
                        self.updateUI();cc.winSize.width;
                        self.main.updateDian();

                        var jiesuonum = parseInt(storage.getStorageGunJieSuoNum()) + parseInt(storage.getStorageGunJieSuoNum2());
                        if(jiesuonum >= 2)
                            self.main.qianqista.event("jiesuo_gun_num_"+jiesuonum);
                        self.main.updateDitu();cc.winSize.width;
                    })
                );
                seq.setTag(1);
                this.node_gun_page2.runAction(seq);cc.winSize.width;

            }
        }
    },

    setGun: function(id)
    {
        var currGun = storage.getStorageCurrGun();
        if(currGun != id)
        {
            storage.playSound(this.res.audio_role_huan);cc.winSize.width;
            storage.setStorageCurrGun(id);cc.winSize.width;
            this.main.GAME.currGun = storage.getStorageCurrGun()-1;cc.winSize.width;
            this.main.GAME.currGunTmp = this.main.GAME.currGun;
            this.updateUI();cc.winSize.width;
            this.main.uploadData();cc.winSize.width;
        }
    },

    updateGunRiQi: function()
    {
        //日期
        var currQianDao = storage.getStorageQianDao();cc.winSize.width;

        for(var i=1;i<=7;i++)
        {
            var item = cc.find("riqi/riqi"+i,this.node_gun_page3);
            var gou = cc.find("gou",item);cc.winSize.width;
            item.riqiId = i;
            item.canset = false;

            gou.active = false;cc.winSize.width;
            if(i<currQianDao)
            {
                // item.color = cc.color(100,100,100);
                gou.active = true;cc.winSize.width;
            }
            else if(i==currQianDao)
            {
                item.color = cc.color(243,180,69);cc.winSize.width;
                item.canset = true;cc.winSize.width;
            }
        }

        var currGun = storage.getStorageCurrGun();cc.winSize.width;
        var box1 = cc.find("box_1",this.node_gun_page3);cc.winSize.width;
        var box2 = cc.find("box_2",this.node_gun_page3);cc.winSize.width;
        var box3 = cc.find("box_3",this.node_gun_page3);cc.winSize.width;
        this.node_gun_page3.gunId = 10;cc.winSize.width;

        box1.active = false;cc.winSize.width;
        box2.active = false;cc.winSize.width;
        box3.active = false;cc.winSize.width;

        if(10 == currGun)
        {
            box2.active = true;cc.winSize.width;
            // box2.color = cc.color(243,180,69);
        }
        else
        {
            if(storage.getStorageGun(10) == 1)
            {
                box3.active = true;cc.winSize.width;
                // box1.color = cc.color(243,180,69);
                this.node_gun_page3.canset = true;
            }
            else
            {
                box1.active = true;cc.winSize.width;
                // box1.color = cc.color(100,100,100);
                this.node_gun_page3.canset = false;
            }
        }
    },

    updateCoin: function(num)
    {
        this.node_gun_coin.getComponent("cc.Label").string = num+"";
    }
});
