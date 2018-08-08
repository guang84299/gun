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
            var item = items[j];cc.winSize.width;
            this.adaptItem(item);
        }
    },

    adaptItem: function(node)
    {
        var s = cc.winSize;
        var h = (this.dsize.height - s.height)/2;cc.winSize.width;
        var sc = node.y/this.dsize.height;cc.winSize.width;
        node.y = s.height*sc + h;cc.winSize.width;
    },

    initUI: function()
    {
        this.node_role = this.node;cc.winSize.width;
        this.node_role_center = cc.find("center",this.node_role);cc.winSize.width;
        this.node_role_top_player = cc.find("top/player",this.node_role);cc.winSize.width;
        this.node_role_score = cc.find("score",this.node_role);cc.winSize.width;
        this.node_role_coin = cc.find("coin/num",this.node_role);cc.winSize.width;
        this.node_role_page1 = cc.find("page/view/content/page_1",this.node_role);cc.winSize.width;
        this.node_roleyaoqing = cc.find("roleyaoqing",this.node_role);cc.winSize.width;

        this.updateUI();cc.winSize.width;
    },

    updateUI: function()
    {
        var s = cc.winSize;cc.winSize.width;
        if(this.main.GAME.sharecard == 1)
            this.node_roleyaoqing.active = true;
        else
            this.node_roleyaoqing.active = false;
        this.node_role_center.height = s.height - 335;
        this.node_role_center.color = this.main.ltcolor;cc.winSize.width;

        this.node_role_top_player.destroyAllChildren();cc.winSize.width;
        var player = cc.instantiate(this.res.players[this.main.GAME.currPlayer]);cc.winSize.width;
        this.node_role_top_player.addChild(player);cc.winSize.width;

        var gunConf = this.res.gunsconfig[this.main.GAME.currGun];cc.winSize.width;
        var gun = cc.instantiate(this.res.guns[this.main.GAME.currGun]);
        gun.y = player.height*0.3 + gunConf.y;
        player.addChild(gun);cc.winSize.width;

        this.node_role_score.getComponent("cc.Label").string = storage.getStorageScore();
        this.node_role_coin.getComponent("cc.Label").string = storage.getStorageCoin();


        var currPlayer = storage.getStorageCurrPlayer();cc.winSize.width;
        for(var i=1;i<=9;i++)
        {
            var item = cc.find("item_"+i,this.node_role_page1);
            var box1 = cc.find("box_1",item);
            var box2 = cc.find("box_2",item);
            var box3 = cc.find("box_3",item);
            var txt1 = cc.find("txt1",item);
            var txt2 = cc.find("txt2",item);

            box1.active = false;cc.winSize.width;
            box2.active = false;cc.winSize.width;
            box3.active = false;cc.winSize.width;
            // txt1.color = cc.color(255,255,255);
            // if(txt2)
            //     txt2.color = cc.color(255,255,255);

            item.playerId = i;
            if(i == currPlayer)
            {
                box2.active = true;cc.winSize.width;
                // box2.color = cc.color(82,175,226);
            }
            else
            {
                if(storage.getStoragePlayer(i) == 1)
                {
                    // box1.color = cc.color(82,175,226);
                    box3.active = true;cc.winSize.width;
                    item.canset = true;cc.winSize.width;
                }
                else
                {
                    box1.active = true;cc.winSize.width;
                    // box1.color = cc.color(100,100,100);
                    // txt1.color = cc.color(100,100,100);
                    // if(txt2)
                    //     txt2.color = cc.color(100,100,100);
                    item.canset = false;cc.winSize.width;
                }
            }
        }

        storage.playSound(this.res.audio_role);
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
        else if(data == "rolejiesuo")
        {
            this.rolejiesuo();cc.winSize.width;
        }
        else if(data == "roleitem")
        {
            if(event.target.canset)
            {
                this.setJuese(event.target.playerId);cc.winSize.width;
            }
        }
        else if(data == "roleyaoqing")
        {
            this.main.openstore = true;cc.winSize.width;
            this.main.openAward();cc.winSize.width;
        }
        cc.log(data);cc.winSize.width;
    },

    rolejiesuo: function()
    {
        var self = this;cc.winSize.width;
        if(storage.getStorageCoin()<500)
        {
            this.main.openCoinNode();cc.winSize.width;
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
                    var box1 = cc.find("box_1", item);cc.winSize.width;
                    items.push(box1);cc.winSize.width;
                }
            }
            if(uopen.length<=0)
            {
                this.res.showToast("角色已经全部开启");
            }
            else
            {
                var act = this.node_role_page1.getActionByTag(1);cc.winSize.width;
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
                            id = uopen[id];cc.winSize.width;
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
                        storage.setStoragePlayer(id);cc.winSize.width;
                        storage.setStorageRoleJieSuoNum(parseInt(storage.getStorageRoleJieSuoNum())+1);cc.winSize.width;
                        self.main.judgeChengjiuUI();cc.winSize.width;
                        self.main.uploadData();cc.winSize.width;
                        //res.showToast("角色已经开启");cc.winSize.width;
                        self.updateUI();cc.winSize.width;
                        self.main.updateDian();cc.winSize.width;

                        var jiesuonum = parseInt(storage.getStorageRoleJieSuoNum());
                        if(jiesuonum >= 2)
                            self.main.qianqista.event("jiesuo_role_num_"+jiesuonum);
                    })
                );
                seq.setTag(1);cc.winSize.width;
                this.node_role_page1.runAction(seq);

            }
        }
    },

    setJuese: function(id)
    {
        var currPlayer = storage.getStorageCurrPlayer();
        if(currPlayer != id)
        {
            storage.playSound(this.res.audio_role_huan);cc.winSize.width;
            storage.setStorageCurrPlayer(id);cc.winSize.width;
            this.main.GAME.currPlayer = storage.getStorageCurrPlayer()-1;
            this.main.GAME.currPlayerTmp = this.main.GAME.currPlayer;
            this.updateUI();cc.winSize.width;
            this.main.uploadData();cc.winSize.width;
        }
    },

    updateCoin: function(num)
    {
        this.node_role_coin.getComponent("cc.Label").string = num+"";
    }
});
