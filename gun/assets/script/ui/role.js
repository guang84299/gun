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
        this.node_role = this.node;
        this.node_role_center = cc.find("center",this.node_role);
        this.node_role_top_player = cc.find("top/player",this.node_role);
        this.node_role_score = cc.find("score",this.node_role);
        this.node_role_coin = cc.find("coin/num",this.node_role);
        this.node_role_page1 = cc.find("page/view/content/page_1",this.node_role);
        this.node_roleyaoqing = cc.find("roleyaoqing",this.node_role);

        this.updateUI();
    },

    updateUI: function()
    {
        var s = cc.winSize;
        if(this.main.GAME.sharecard == 1)
            this.node_roleyaoqing.active = true;
        else
            his.node_roleyaoqing.active = false;
        this.node_role_center.height = s.height - 335;
        this.node_role_center.color = this.main.ltcolor;

        this.node_role_top_player.destroyAllChildren();
        var player = cc.instantiate(this.res.players[this.main.GAME.currPlayer]);
        this.node_role_top_player.addChild(player);

        var gunConf = this.res.gunsconfig[this.main.GAME.currGun];
        var gun = cc.instantiate(this.res.guns[this.main.GAME.currGun]);
        gun.y = player.height*0.3 + gunConf.y;
        player.addChild(gun);

        this.node_role_score.getComponent("cc.Label").string = storage.getStorageScore();
        this.node_role_coin.getComponent("cc.Label").string = storage.getStorageCoin();
        cc.find("rolejiesuo/coinbg",this.node_role).color = this.main.ltcolor;
        cc.find("rolejiesuo/txt",this.node_role).color = this.main.ltcolor;
        cc.find("rolejiesuo/coin",this.node_role).color = this.main.ltcolor;

        cc.find("roleyaoqing/coinbg",this.node_role).color = this.main.ltcolor;
        cc.find("roleyaoqing/txt",this.node_role).color = this.main.ltcolor;
        cc.find("roleyaoqing/txt2",this.node_role).color = this.main.ltcolor;
        cc.find("roleyaoqing/coin",this.node_role).color = this.main.ltcolor;

        var currPlayer = storage.getStorageCurrPlayer();
        for(var i=1;i<=9;i++)
        {
            var item = cc.find("item_"+i,this.node_role_page1);
            var box1 = cc.find("box_1",item);
            var box2 = cc.find("box_2",item);
            var txt1 = cc.find("txt1",item);
            var txt2 = cc.find("txt2",item);

            txt1.color = cc.color(255,255,255);
            if(txt2)
                txt2.color = cc.color(255,255,255);

            item.playerId = i;
            if(i == currPlayer)
            {
                box1.active = false;
                box2.active = true;
                box2.color = cc.color(82,175,226);
            }
            else
            {
                box1.active = true;
                box2.active = false;
                if(storage.getStoragePlayer(i) == 1)
                {
                    box1.color = cc.color(82,175,226);
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
            this.main.openstore = false;
            this.main.goMain();
            this.hide();
        }
        else if(data == "rolejiesuo")
        {
            this.rolejiesuo();
        }
        else if(data == "roleitem")
        {
            if(event.target.canset)
            {
                this.setJuese(event.target.playerId);
            }
        }
        else if(data == "roleyaoqing")
        {
            this.main.openstore = true;
            this.main.openAward();
        }
        cc.log(data);
    },

    rolejiesuo: function()
    {
        var self = this;
        if(storage.getStorageCoin()<500)
        {
            this.main.openCoinNode();
        }
        else
        {
            var uopen = [];
            var items = [];
            for(var i=1;i<=9;i++)
            {
                if(storage.getStoragePlayer(i) != 1)
                {
                    uopen.push(i);
                    var item = cc.find("item_" + i, this.node_role_page1);
                    var box1 = cc.find("box_1", item);
                    items.push(box1);
                }
            }
            if(uopen.length<=0)
            {
                this.res.showToast("角色已经全部开启");
            }
            else
            {
                var act = this.node_role_page1.getActionByTag(1);
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
                        storage.setStorageCoin(storage.getStorageCoin() - 500);
                        storage.setStoragePlayer(id);
                        storage.setStorageRoleJieSuoNum(parseInt(storage.getStorageRoleJieSuoNum())+1);
                        self.main.judgeChengjiuUI();
                        self.main.uploadData();
                        //res.showToast("角色已经开启");
                        self.updateUI();
                        self.main.updateDian();

                        var jiesuonum = parseInt(storage.getStorageRoleJieSuoNum());
                        if(jiesuonum >= 2)
                            self.main.qianqista.event("jiesuo_role_num_"+jiesuonum);
                    })
                );
                seq.setTag(1);
                this.node_role_page1.runAction(seq);

            }
        }
    },

    setJuese: function(id)
    {
        var currPlayer = storage.getStorageCurrPlayer();
        if(currPlayer != id)
        {
            storage.playSound(this.res.audio_role_huan);
            storage.setStorageCurrPlayer(id);
            this.main.GAME.currPlayer = storage.getStorageCurrPlayer()-1;
            this.main.GAME.currPlayerTmp = this.main.GAME.currPlayer;
            this.updateUI();
            this.main.uploadData();
        }
    },

    updateCoin: function(num)
    {
        this.node_role_coin.getComponent("cc.Label").string = num+"";
    }
});
