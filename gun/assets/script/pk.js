var websocket = require("websocket");
var storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {
        gray_sprite: {
            type: cc.SpriteFrame,
            default: null
        }
    },

    onLoad: function()
    {
        this.dsize = cc.view.getDesignResolutionSize();
        this.main = cc.find("Canvas").getComponent("main");
        this.res = cc.find("Canvas").getComponent("res");

        this.qianqista = this.main.qianqista;

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        
        var nodes = this.node.children;
        for(var i=0;i<nodes.length;i++)
        {
            var items = nodes[i].children;
            for(var j=0;j<items.length;j++)
            {
                var item = items[j];
                this.adaptItem(item);
            } 
        }
        
        this.initData();
        this.initUI();
        this.addListener();
    },

    adaptItem: function(node)
    {
        var s = cc.winSize;
        var h = (this.dsize.height - s.height)/2;
        var sc = node.y/this.dsize.height;
        node.y = s.height*sc + h;
    },

    initData: function()
    {
        this.heartDt = 0;
        this.state = "stop";
        this.GAME = {};
        this.GAME.coin = 0;
        this.GAME.isWin = false;
        this.isBgScroll = false;
        this.lastroomType = 1;
        this.isHide = false;
        this.isShare = false;
        var self = this;

        websocket.init(this,function(){
            websocket.login(self.qianqista.openid,self.qianqista.userName,self.qianqista.avatarUrl);
         });
    },

    initUI: function()
    {
        this.node_game = cc.find("node_game",this.node);
        this.bg_1_1 = cc.find("bg_1_1",this.node_game);
        this.bg_1_2 = cc.find("bg_1_2",this.node_game);
        this.bg_1_3 = cc.find("bg_1_3",this.node_game);
        this.bg_1_4 = cc.find("bg_1_4",this.node_game);
        this.bg_2_1 = cc.find("bg_2_1",this.node_game);
        this.bg_2_2 = cc.find("bg_2_2",this.node_game);
        this.bg_2_3 = cc.find("bg_2_3",this.node_game);
        this.bg_2_4 = cc.find("bg_2_4",this.node_game);
        this.taizi_a = cc.find("taizi_a",this.node_game);
        this.taizi_b = cc.find("taizi_b",this.node_game);
        this.taizi_a_player = cc.find("taizi_a/player",this.node_game);
        this.taizi_b_player = cc.find("taizi_b/player",this.node_game);

        this.node_game_ui = cc.find("node_game_ui",this.node);
        this.coin = cc.find("coin",this.node_game_ui);
        this.coin_num = cc.find("coin/num",this.node_game_ui).getComponent("cc.Label");
        this.time = cc.find("timebg/time",this.node_game_ui).getComponent("cc.Label");

        this.left_icon = cc.find("left/icon",this.node_game_ui);
        this.left_name = cc.find("left/name",this.node_game_ui).getComponent("cc.Label");
        this.left_pro = cc.find("left/pro",this.node_game_ui).getComponent("cc.ProgressBar");
        this.left_pro_bar = cc.find("left/pro/bar",this.node_game_ui);

        this.right_icon = cc.find("right/icon",this.node_game_ui);
        this.right_name = cc.find("right/name",this.node_game_ui).getComponent("cc.Label");
        this.right_pro = cc.find("right/pro",this.node_game_ui).getComponent("cc.ProgressBar");
        this.right_pro_bar = cc.find("right/pro/bar",this.node_game_ui);

        this.fire = cc.find("fire",this.node_game_ui);
        this.fire_pro = cc.find("fire",this.node_game_ui).getComponent("cc.ProgressBar");
        this.hitbg = cc.find("hitbg",this.node_game_ui);


        this.node_sel = cc.find("node_sel",this.node);
        this.node_sel_title = cc.find("bg/title",this.node_sel).getComponent("cc.Label");
        this.node_sel_box_1 = cc.find("bg/box_1",this.node_sel);
        this.node_sel_box_2 = cc.find("bg/box_2",this.node_sel);
        this.node_sel_box_2_wenhao = cc.find("bg/box_2/wenhao",this.node_sel);
        this.node_sel_box_1_name = cc.find("bg/box_1/name",this.node_sel).getComponent("cc.Label");
        this.node_sel_box_2_name = cc.find("bg/box_2/name",this.node_sel).getComponent("cc.Label");
        this.node_sel_suiji = cc.find("suiji",this.node_sel);
        this.node_sel_duizhan = cc.find("duizhan",this.node_sel);
        this.node_sel_home = cc.find("home",this.node_sel);
        this.node_sel_willstart = cc.find("bg/willstart",this.node_sel).getComponent("cc.Label");
        this.node_sel_coin = cc.find("coin",this.node_sel);
        this.node_sel_coin_num = cc.find("coin/num",this.node_sel).getComponent("cc.Label");



        this.node_over = cc.find("node_over",this.node);
        this.node_over_title = cc.find("bg/title",this.node_over).getComponent("cc.Label");
        this.node_over_box_1 = cc.find("bg/box_1",this.node_over);
        this.node_over_box_2 = cc.find("bg/box_2",this.node_over);
        this.node_over_box_1_name = cc.find("bg/box_1/name",this.node_over).getComponent("cc.Label");
        this.node_over_box_2_name = cc.find("bg/box_2/name",this.node_over).getComponent("cc.Label");
        this.node_over_guang = cc.find("bg/guang",this.node_over);
        this.node_over_bili = cc.find("bg/bili",this.node_over).getComponent("cc.Label");
        this.node_over_fanhui = cc.find("fanhui",this.node_over);
        this.node_over_fanhui_str = cc.find("fanhui/str",this.node_over).getComponent("cc.Label");
        this.node_over_again = cc.find("again",this.node_over);
        this.node_over_again_str = cc.find("again/str",this.node_over).getComponent("cc.Label");
        this.node_over_home = cc.find("home",this.node_over);
        this.node_over_coin = cc.find("coin",this.node_over);
        this.node_over_coin_num = cc.find("coin/num",this.node_over).getComponent("cc.Label");

        this.getCoin(storage.getStorageCoin());

        var self = this;
        this.qianqista.setHideCallback(function(){
            if(self.isShare)
            {
                self.isShare = false;
            }
            else
            {
                self.isHide = true;
                websocket.close();
            }
        });
    },

    updateUI: function()
    {
        this.loadPic(this.node_sel_box_1,this.qianqista.avatarUrl+"?"+Math.random());
        this.node_sel_box_1_name.string = this.qianqista.userName;

        this.node_game_ui.active = false;
        this.taizi_a.active = false;
        this.taizi_b.active = false;
    },

    getCoin: function(coin)
    {
        this.GAME.coin += coin;
        this.coin_num.string = Math.floor(this.GAME.coin)+"";
        this.node_over_coin_num.string = Math.floor(this.GAME.coin)+"";
        this.node_sel_coin_num.string = Math.floor(this.GAME.coin)+"";
    },


    show: function()
    {
        this.node.active = true;
        this.updateUI();
    },

    hide: function()
    {
        this.main.openduizhan = false;
        this.node.destroy();
    },

    goHome: function()
    {
        this.node.stopAllActions();
        this.main.wxQuanState(true);
        websocket.close();
        this.main.goMain();
        this.hide();
    },

    click: function(event,data)
    {
        if(data == "suiji")
        {
            var coin = storage.getStorageCoin();
            if(coin < 20)
            {
                //this.res.showToast("金币不足");
                var coin = cc.instantiate(this.res.node_coin);
                coin.position = cc.v2(0,0);
                this.node.addChild(coin);
                this.node_coin = coin.getComponent("coin");
                this.node_coin.show();
                return;
            }
            if(websocket.state == 1)
            {
                websocket.enterRoom(1,1,this.main.GAME.currPlayer,this.main.GAME.currGun,"0");
            }
            else
            {
                this.res.showToast("服务器登录失败！重新登录中...");
                var self = this;
                websocket.close();
                websocket.init(this,function(){
                    websocket.login(self.qianqista.openid,self.qianqista.userName,self.qianqista.avatarUrl);
                });
            }
        }
        else if(data == "duizhan")
        {
            this.wxGropSharePk();
            if(websocket.state != 1)
            {
                var self = this;
                this.res.showToast("服务器登录失败！重新登录中...");
                websocket.close();
                websocket.init(this,function(){
                    websocket.login(self.qianqista.openid,self.qianqista.userName,self.qianqista.avatarUrl);
                });
            }
        }
        else if(data == "home")
        {
            if(this.state == "willagain")
            {
                this.selfPlayer.leave = true;
                this.state = "stop";
                websocket.again(2,1,this.selfPlayer.skinId,this.selfPlayer.gunId,"0","0",2);
                this.node.stopAllActions();
            }

            this.node.stopAllActions();
            this.main.wxQuanState(true);
            websocket.close();
            this.main.goMain();
            this.hide();
        }
        else if(data == "fire")
        {
            this.toFire();
        }
        else if(data == "fanhui")
        {
            this.fanhui();
        }
        else if(data == "again")
        {
            this.again();
        }
        cc.log(data);
    },

    sharePk: function()
    {
        if(websocket.state == 1)
        {
            websocket.enterRoom(2,1,this.main.GAME.currPlayer,this.main.GAME.currGun,this.qianqista.pkfromid);
        }
        else
        {
            var self = this;
            websocket.close();
            websocket.init(this,function(){
                websocket.login(self.qianqista.openid,self.qianqista.userName,self.qianqista.avatarUrl,function(){
                    websocket.enterRoom(2,1,self.main.GAME.currPlayer,self.main.GAME.currGun,self.qianqista.pkfromid);
                });
            });
        }
    },

    wxGropSharePk: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            self.isShare = true;

            var query = "channel=shareonline&fromid="+this.qianqista.openid;
            var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            if(this.main.GAME.shares.duizhan_txt1 && this.main.GAME.shares.duizhan_pic1)
            {
                title = this.main.GAME.shares.duizhan_txt1;
                imageUrl = this.main.GAME.shares.duizhan_pic1;
            }
            wx.shareAppMessage({
                query:query,
                title: title,
                imageUrl: imageUrl,
                success: function(res)
                {
                    //self.res.showToast("分享成功，等待好友上线吧");
                    if(websocket.state == 1)
                    {
                        websocket.enterRoom(2,1,self.main.GAME.currPlayer,self.main.GAME.currGun,"0");
                    }

                    cc.log(res);
                },
                fail: function()
                {
                    self.main.qianqista.share(false);
                    self.res.showToast("分享失败！");
                }
            });
        }
        else
        {
            if(websocket.state == 1)
            {
                websocket.enterRoom(2,1,this.main.GAME.currPlayer,this.main.GAME.currGun,"0");
            }
        }
    },

    enterRoom: function(data)
    {
        if(data.result)
        {
            this.playerData = data;
            this.selfPlayer = data.player;

            this.node_sel_suiji.getComponent("cc.Button").interactable = false;
            this.node_sel_duizhan.getComponent("cc.Button").interactable = false;
            //this.node_sel_home.getComponent("cc.Button").interactable = false;
            //this.node_sel_home.color = cc.color(161,161,161);
            this.node_sel_title.string = "匹配中";
            this.node_sel_box_2_name.string = "(30)";
            var pipeiTime = 30;
            var num = 31;
            if(data.roomType == 2)
            {
                this.node_sel_box_2_name.string = "(60)";
                pipeiTime = 60;
                num = 61;
            }


            this.state = "pipei";

            if(data.player2)
            {
                this.joinRoom(data);
            }
            else
            {
                var self = this;

                this.node.runAction(cc.repeat(cc.sequence(
                    cc.delayTime(1),
                    cc.callFunc(function(){
                        pipeiTime -= 1;
                        var p = pipeiTime;
                        if(p<0)
                            p = 0;
                        self.node_sel_box_2_name.string = "("+Math.floor(p)+")";
                        if(Math.floor(pipeiTime) == 0)
                        {
                            websocket.questLeaveRoom(self.qianqista.openid);
                        }
                    })
                ),num));
            }
        }
        else
        {
            this.res.showToast("对方已离线！");
        }
    },

    joinRoom: function(data)
    {
        this.enemyData = data;
        this.enemyPlayer = data.player2;
        this.enemyPlayer.leave = false;
        cc.log(this.enemyPlayer);
        this.loadPic(this.node_sel_box_2,this.enemyPlayer.avatarUrl+"?"+Math.random());
        this.node_sel_box_2_name.string = this.enemyPlayer.name;
        this.node_sel_box_2_wenhao.active = false;
        this.node_sel_title.string = "匹配成功";
        this.node_sel_willstart.string = "即将开始游戏...3";

        this.state = "willstart";
        var self = this;
        var willStartTime = 3;
        this.node.stopAllActions();
        this.node.runAction(cc.repeat(cc.sequence(
            cc.delayTime(1),
            cc.callFunc(function(){
                willStartTime -= 1;
                self.node_sel_willstart.string = "即将开始游戏..."+Math.floor(willStartTime);
                if(Math.floor(willStartTime) == 0)
                {

                    if(self.state == "willstart")
                    {
                        cc.log("start game");
                        websocket.startGame();
                    }

                }
            })
        ),3));

        if(this.playerData.roomType == 1)
        {
            storage.setStorageCoin(storage.getStorageCoin()-20);
            this.getCoin(-20);
        }
        this.lastroomType = this.playerData.roomType;
    },

    pipeiFail: function()
    {
        this.res.showToast("连接超时，请重试");
        this.node_sel_suiji.getComponent("cc.Button").interactable = true;
        this.node_sel_duizhan.getComponent("cc.Button").interactable = true;
        //this.node_sel_home.getComponent("cc.Button").interactable = true;
        //this.node_sel_home.color = cc.color(255,255,255);
        this.node_sel_title.string = "等待开战";
        this.node_sel_box_2_name.string = "等待加入";
        this.node_sel_willstart.string = "";
        this.node_sel_box_2.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;

        this.state = "stop";
    },

    fanhui: function()
    {
        if(this.state == "willagain")
        {
            this.selfPlayer.leave = true;
            this.state = "stop";
            websocket.again(2,1,this.selfPlayer.skinId,this.selfPlayer.gunId,"0","0",2);
            this.node.stopAllActions();
        }
        else
        {
            this.state = "stop";
            this.node.stopAllActions();

            this.node_over.active = false;
            this.node_sel.active = true;

            this.node_sel_suiji.getComponent("cc.Button").interactable = true;
            this.node_sel_duizhan.getComponent("cc.Button").interactable = true;
            //this.node_sel_home.getComponent("cc.Button").interactable = true;
            //this.node_sel_home.color = cc.color(255,255,255);
            this.node_sel_title.string = "等待开战";
            this.node_sel_box_2_name.string = "等待加入";
            this.node_sel_willstart.string = "";
            this.node_sel_box_2.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;
        }
    },

    again: function()
    {

        this.node_over_fanhui.getComponent("cc.Button").interactable = false;
        this.node_over_again.getComponent("cc.Button").interactable = false;
        //this.node_over_home.getComponent("cc.Button").interactable = false;
        //this.node_over_home.color = cc.color(161,161,161);

        if(this.state == "willagain")
        {
            websocket.again(2,1,this.selfPlayer.skinId,this.selfPlayer.gunId,"0","0",3);
        }
        else
        {
            if(this.GAME.isWin)
            {
                this.node_over_again_str.string = "再来一局(8)";
            }
            else
            {
                this.node_over_again_str.string = "不服再来(8)";
            }
            websocket.again(2,1,this.selfPlayer.skinId,this.selfPlayer.gunId,"0",this.enemyPlayer.uid,1);

            var self = this;
            this.node.runAction(cc.sequence(
                cc.delayTime(2),
                cc.callFunc(function(){
                    if(self.state != "willagain")
                    {
                        self.enemyPlayer.leave = true;
                        websocket.again(2,1,self.selfPlayer.skinId,self.selfPlayer.gunId,"0","0",2);
                    }
                })
            ));
        }
    },

    toAgain: function(data)
    {
        if(data.againType == 1)
        {
            this.playerData = data;
            this.selfPlayer = data.player;
            this.selfPlayer.leave = false;
        }
        else if(data.againType == 2)
        {
            websocket.again(2,1,this.selfPlayer.skinId,this.selfPlayer.gunId,this.enemyPlayer.uid,"0",1);
        }
        else if(data.againType == 3)
        {
            if(data.player)
            {
                this.playerData = data;
                this.selfPlayer = data.player;
                this.selfPlayer.leave = false;
                this.node_over_fanhui_str.string = "赶紧溜";
            }
            this.enemyData = data;
            this.enemyPlayer = data.player2;
            this.enemyPlayer.leave = false;

            if(this.GAME.isWin)
            {
                var str = "再来一局";
                if(data.player)
                    str = "来就来";
                this.state = "willagain";
                var self = this;
                var willStartTime = 8;
                this.node.stopAllActions();
                this.node.runAction(cc.repeat(cc.sequence(
                    cc.delayTime(1),
                    cc.callFunc(function(){
                        willStartTime -= 1;
                        self.node_over_again_str.string = str + "("+Math.floor(willStartTime) + ")";
                        if(Math.floor(willStartTime) == 0)
                        {

                            if(self.state == "willagain")
                            {
                                cc.log("start game");
                                websocket.startGame();

                                if(self.lastroomType == 1)
                                {
                                    storage.setStorageCoin(storage.getStorageCoin()-20);
                                    self.getCoin(-20);
                                }
                            }

                        }
                    })
                ),8));
            }
            else
            {
                var str = "不服再来";
                if(data.player)
                    str = "来就来";
                this.state = "willagain";
                var self = this;
                var willStartTime = 8;
                this.node.stopAllActions();
                this.node.runAction(cc.repeat(cc.sequence(
                    cc.delayTime(1),
                    cc.callFunc(function(){
                        willStartTime -= 1;
                        self.node_over_again_str.string = str+"("+Math.floor(willStartTime) + ")";
                        if(Math.floor(willStartTime) == 0)
                        {

                            if(self.state == "willagain")
                            {
                                cc.log("start game");
                                websocket.startGame();
                            }

                        }
                    })
                ),8));
            }

            if(this.lastroomType == 1 && storage.getStorageCoin() < 20)
            {
                this.selfPlayer.leave = true;
                this.state = "stop";
                websocket.again(2,1,this.selfPlayer.skinId,this.selfPlayer.gunId,"0","0",2);
                this.node.stopAllActions();
            }
        }
        else if(data.againType == 4)//溜了
        {
            if(this.enemyPlayer.leave || !this.selfPlayer.leave)
                this.res.showToast("对方离开");
            this.node.stopAllActions();
            this.state = "stop";
            this.fanhui();
        }
        else if(data.againType == 5)//立即开始
        {
            this.node.stopAllActions();
            this.state = "stop";
            websocket.startGame();

            if(this.lastroomType == 1)
            {
                storage.setStorageCoin(storage.getStorageCoin()-20);
                this.getCoin(-20);
            }
        }
    },

    questLeave: function(data)
    {
        if(data.uid == this.qianqista.openid)
        {
            if(this.state == "start" || this.state == "willstart")
            {
                if(this.enemyPlayer.leave)
                {
                    this.enemyPlayer.hp = -1;
                    this.res.showToast("对方掉线！");
                    this.gameOver();
                }
            }
            else
            {
                this.pipeiFail();
            }
        }

    },

    leaveRoom: function(data)
    {
        if(data.uid == this.qianqista.openid)
        {
            websocket.close();
            this.main.goMain();
            this.hide();
            this.res.showToast("服务器连接失败！");
        }
        else
        {
            this.enemyPlayer.leave = true;
            if(this.state == "willagain")
            {
                this.selfPlayer.leave = true;
                this.state = "stop";
                websocket.again(2,1,this.selfPlayer.skinId,this.selfPlayer.gunId,"0","0",2);
                this.node.stopAllActions();
            }
            websocket.questLeaveRoom(this.qianqista.openid);
        }
    },

    startGame: function()
    {
        this.state = "start";
        this.isBgScroll = false;
        this.node_sel.active = false;
        this.node_over.active = false;

        this.node_game_ui.active = true;
        this.taizi_a.active = true;
        this.taizi_b.active = true;
        this.fire_pro.progress = 1;
        this.fire.stopAllActions();

        if(this.selfPlayer.dirX == 1)
        {
            this.loadPic(this.left_icon,this.selfPlayer.avatarUrl+"?"+Math.random());
            this.left_name.string = this.selfPlayer.name;
            this.left_pro.progress = 50/this.selfPlayer.hp;
            //this.left_pro_bar.color = cc.color();

            this.loadPic(this.right_icon,this.enemyPlayer.avatarUrl+"?"+Math.random());
            this.right_name.string = this.enemyPlayer.name;
            this.right_pro.progress = 50/this.enemyPlayer.hp;


        }
        else
        {
            this.loadPic(this.left_icon,this.enemyPlayer.avatarUrl+"?"+Math.random());
            this.left_name.string = this.enemyPlayer.name;
            this.left_pro.progress = 50/this.enemyPlayer.hp;

            this.loadPic(this.right_icon,this.selfPlayer.avatarUrl+"?"+Math.random());
            this.right_name.string = this.selfPlayer.name;
            this.right_pro.progress = 50/this.selfPlayer.hp;
        }
        this.left_pro_bar.color = cc.color(0,160,233);
        this.right_pro_bar.color = cc.color(0,160,233);
        this.initPlayer();
        this.initEnemy();

        var h = this.dsize.height/5;
        this.taizi_a.y = h*3;
        this.taizi_b.y = h*2;

        var jishibg = new cc.Node();
        var jishi = jishibg.addComponent("cc.Label");
        jishi.string = "3";
        jishi.fontSize = 60;
        jishi.lineHeight = 70;
        jishibg.position = cc.v2(this.dsize.width/2,this.dsize.height/2);
        this.node_game.addChild(jishibg,100);
        jishibg.scale = 0;

        var self = this;

        jishibg.runAction(cc.sequence(
            cc.scaleTo(0.4,1.3).easing(cc.easeSineOut()),
            cc.scaleTo(0.3,1).easing(cc.easeSineOut()),
            cc.fadeOut(0.5),
            cc.callFunc(function(){
                jishi.string = "2";
            }),
            cc.fadeIn(0),
            cc.scaleTo(0.4,1.3).easing(cc.easeSineOut()),
            cc.scaleTo(0.3,1).easing(cc.easeSineOut()),
            cc.fadeOut(0.5),
            cc.callFunc(function(){
                jishi.string = "1";
            }),
            cc.fadeIn(0),
            cc.scaleTo(0.4,1.3).easing(cc.easeSineOut()),
            cc.scaleTo(0.3,1).easing(cc.easeSineOut()),
            cc.fadeOut(0.5),
            cc.callFunc(function(){
                self.bgscroll();
            }),
            cc.removeSelf()
        ));

        //this.bgscroll();
    },

    initPlayer: function()
    {
        var playerbg = null;
        if(this.selfPlayer.dirX == 1)
            playerbg = this.taizi_a_player;
        else
            playerbg = this.taizi_b_player;

        playerbg.destroyAllChildren();

        this.player = cc.instantiate(this.res.players[this.selfPlayer.skinId]);
        playerbg.addChild(this.player);

        var playerConf = this.res.playersconfig[this.selfPlayer.skinId];
        var gunConf = this.res.gunsconfig[this.selfPlayer.gunId];

        this.player.gun = cc.instantiate(this.res.guns[this.selfPlayer.gunId]);
        this.player.gun.y = this.player.height*0.3 + gunConf.y;
        this.player.addChild(this.player.gun,1);
        if(this.selfPlayer.dirX == 2)
            this.player.scaleX = -1;

        this.player.aim = cc.instantiate(this.res.aim_1);
        this.player.aim.y = this.player.gun.y;
        this.player.aim.active = false;
        this.player.aim.line = cc.find("line",this.player.aim);
        this.player.aim.scale = (gunConf.aimLen+playerConf.aimLen)/2;
        this.player.addChild(this.player.aim,0);

        this.player.aim.line.rotation = 0;
        this.player.aim.getComponent("cc.ProgressBar").progress = 0;

        this.player.gun_fire = cc.instantiate(this.res.gun_fire);
        this.player.gun_fire.y = gunConf.y;
        this.player.gun_fire.x = this.player.gun.width*(1-this.player.gun.anchorX);
        this.player.gun_fire.active = false;
        this.player.gun.addChild(this.player.gun_fire,0);
    },

    initEnemy: function()
    {
        var playerbg = null;
        if(this.enemyPlayer.dirX == 1)
            playerbg = this.taizi_a_player;
        else
            playerbg = this.taizi_b_player;

        playerbg.destroyAllChildren();

        this.enemy = cc.instantiate(this.res.players[this.enemyPlayer.skinId]);
        playerbg.addChild(this.enemy);

        var playerConf = this.res.playersconfig[this.enemyPlayer.skinId];
        var gunConf = this.res.gunsconfig[this.enemyPlayer.gunId];

        this.enemy.gun = cc.instantiate(this.res.guns[this.enemyPlayer.gunId]);
        this.enemy.gun.y = this.enemy.height*0.3 + gunConf.y;
        this.enemy.addChild(this.enemy.gun,1);
        if(this.enemyPlayer.dirX == 2)
            this.enemy.scaleX = -1;

        this.enemy.aim = cc.instantiate(this.res.aim_1);
        this.enemy.aim.y = this.enemy.gun.y;
        this.enemy.aim.active = false;
        this.enemy.aim.line = cc.find("line",this.enemy.aim);
        this.enemy.aim.scale = (gunConf.aimLen+playerConf.aimLen)/2;
        this.enemy.addChild(this.enemy.aim,0);
        this.enemy.aim.opacity = 0;

        this.enemy.aim.line.rotation = 0;
        this.enemy.aim.getComponent("cc.ProgressBar").progress = 0;

        this.enemy.gun_fire = cc.instantiate(this.res.gun_fire);
        this.enemy.gun_fire.y = gunConf.y;
        this.enemy.gun_fire.x = this.enemy.gun.width*(1-this.enemy.gun.anchorX);
        this.enemy.gun_fire.active = false;
        this.enemy.gun.addChild(this.enemy.gun_fire,0);
    },

    bgscroll: function()
    {
        this.isBgScroll = true;
        this.bg_1_1.runAction(cc.repeatForever(cc.moveBy(8,0,-1920)));
        this.bg_1_2.runAction(cc.repeatForever(cc.moveBy(16,0,-1920*2)));
        this.bg_1_3.runAction(cc.repeatForever(cc.moveBy(8,0,-1920)));
        this.bg_1_4.runAction(cc.repeatForever(cc.moveBy(16,0,-1920*2)));

        this.bg_2_1.runAction(cc.repeatForever(cc.moveBy(5,0,-1920)));
        this.bg_2_2.runAction(cc.repeatForever(cc.moveBy(10,0,-1920*2)));
        this.bg_2_3.runAction(cc.repeatForever(cc.moveBy(5,0,-1920)));
        this.bg_2_4.runAction(cc.repeatForever(cc.moveBy(10,0,-1920*2)));

        var h = this.dsize.height/5;
        this.taizi_a.y = h*3;
        this.taizi_b.y = h*2;

        var self = this;
        if(this.selfPlayer.dirX == 1)
        {
            this.taizi_a.runAction(cc.repeatForever(cc.sequence(
                cc.callFunc(function(){
                    websocket.move(self.taizi_a.y);
                }),
                cc.moveBy(4,0,-h),
                cc.moveBy(4,0,h)
            )));
        }
        else
        {
            this.taizi_b.runAction(cc.repeatForever(cc.sequence(
                cc.callFunc(function(){
                    websocket.move(self.taizi_b.y);
                }),
                cc.moveBy(4,0,h),
                cc.moveBy(4,0,-h)
            )));
        }

       this.playerRotate();
    },

    playerRotate: function()
    {
        var self = this;

        this.player.gun.stopAllActions();
        this.player.aim.active = true;
        this.player.gun.rotation = 0;
        var playerConf = this.res.playersconfig[this.selfPlayer.skinId];

        var ac = cc.repeatForever(cc.sequence(
            cc.callFunc(function(){
                websocket.rotate(self.player.gun.rotation);
                self.player.gun.rotationDir = 1;
            }),
            cc.rotateTo(1.1*playerConf.aimSpeed,-60).easing(cc.easeIn(1.5)),
            cc.callFunc(function(){
                self.player.gun.rotationDir = 2;
            }),
            cc.rotateTo(1.1*playerConf.aimSpeed,0).easing(cc.easeOut(1.5))
        ));
        ac.setTag(1);
        this.player.gun.runAction(ac);
    },

    stopScroll: function()
    {
        this.bg_1_1.stopAllActions();
        this.bg_1_2.stopAllActions();
        this.bg_1_3.stopAllActions();
        this.bg_1_4.stopAllActions();

        this.bg_2_1.stopAllActions();
        this.bg_2_2.stopAllActions();
        this.bg_2_3.stopAllActions();
        this.bg_2_4.stopAllActions();

        this.taizi_a.stopAllActions();
        this.taizi_b.stopAllActions();

        var h = this.dsize.height/5;
        this.taizi_a.y = h*3;
        this.taizi_b.y = h*2;
    },

    updateScroll: function(dt)
    {
        var h = 1920;
        if(this.bg_1_1.y < -h)
            this.bg_1_1.y = this.bg_1_2.y+h-15;
        if(this.bg_1_2.y < -h)
            this.bg_1_2.y = this.bg_1_1.y+h-15;
        if(this.bg_1_3.y < -h)
            this.bg_1_3.y = this.bg_1_4.y+h-15;
        if(this.bg_1_4.y < -h)
            this.bg_1_4.y = this.bg_1_3.y+h-15;

        if(this.bg_2_1.y < -h)
            this.bg_2_1.y = this.bg_2_2.y+h-15;
        if(this.bg_2_2.y < -h)
            this.bg_2_2.y = this.bg_2_1.y+h-15;
        if(this.bg_2_3.y < -h)
            this.bg_2_3.y = this.bg_2_4.y+h-15;
        if(this.bg_2_4.y < -h)
            this.bg_2_4.y = this.bg_2_3.y+h-15;

        this.updateAim();
    },

    enemyMove: function(data)
    {
        var h = this.dsize.height/5;
        if(this.enemyPlayer.dirX == 1)
        {
            this.taizi_a.y = data.y;
            this.taizi_a.stopAllActions();
            this.taizi_a.runAction(cc.sequence(
                cc.moveBy(4,0,-h),
                cc.moveBy(4,0,h)
            ));
        }
        else
        {
            this.taizi_b.y = data.y;
            this.taizi_b.stopAllActions();
            this.taizi_b.runAction(cc.sequence(
                cc.moveBy(4,0,h),
                cc.moveBy(4,0,-h)
            ));
        }
    },

    enemyRotate: function(data)
    {
        this.enemy.gun.stopAllActions();
        this.enemy.aim.active = true;
        this.enemy.gun.rotation = data.rotate;
        var playerConf = this.res.playersconfig[this.enemyPlayer.skinId];

        var self = this;
        var ac = cc.sequence(
            cc.callFunc(function(){
                self.enemy.gun.rotationDir = 1;
            }),
            cc.rotateTo(1.1*playerConf.aimSpeed,-60).easing(cc.easeIn(1.5)),
            cc.callFunc(function(){
                self.enemy.gun.rotationDir = 2;
            }),
            cc.rotateTo(1.1*playerConf.aimSpeed,0).easing(cc.easeOut(1.5))
        );
        ac.setTag(1);
        this.enemy.gun.runAction(ac);
    },

    updateAim: function()
    {
        if(this.player.aim.active)
        {
            var ang = -this.player.gun.rotation;
            var zpro = 60/360;
            var pro = ang/60*zpro;
            this.player.aim.line.rotation = -ang;
            this.player.aim.getComponent("cc.ProgressBar").progress = pro;
        }

        if(this.enemy.aim.active)
        {
            var ang = -this.enemy.gun.rotation;
            var zpro = 60/360;
            var pro = ang/60*zpro;
            this.enemy.aim.line.rotation = -ang;
            this.enemy.aim.getComponent("cc.ProgressBar").progress = pro;
        }
    },

    toFire: function()
    {
        if(this.fire_pro.progress >= 1 && this.state == "start" && this.isBgScroll)
        {
            this.fire_pro.progress = 0;
            var gunConf = this.res.gunsconfig[this.selfPlayer.gunId];
            var self = this;

            var cd = 0;
            var time = gunConf.num*gunConf.fire*0.5-0.5;
            var num = Math.floor(time/0.1)+2;
            this.fire.stopAllActions();
            this.fire.runAction(cc.repeat(cc.sequence(
                cc.delayTime(0.1),
                cc.callFunc(function(){
                    cd += 0.1;
                    self.fire_pro.progress = cd/time;
                    if(self.fire_pro.progress > 1)
                        self.fire_pro.progress = 1;
                })
            ),num));

            websocket.attack(self.selfPlayer.uid);
        }
    },

    attack: function(data)
    {
        var rands = [];
        rands.push(data.r1);
        rands.push(data.r2);
        rands.push(data.r3);
        rands.push(data.r4);
        if(data.uid == this.selfPlayer.uid)
        {
            this.playerFire(true,rands);
        }
        else
        {
            this.playerFire(false,rands);
        }
    },

    playerFire: function(isSelf,rands)
    {
        var player = null;
        var gunId = 0;
        if(isSelf)
        {
            player = this.player;
            gunId = this.selfPlayer.gunId;
        }
        else
        {
            player = this.enemy;
            gunId = this.enemyPlayer.gunId;
        }
        if(player.aim.active)
        {
            var self = this;
            player.aim.active = false;

            var rota = -player.gun.rotation;
            var v = cc.v2(1,0);

            if(player.scaleX < 1)
            {
                rota = -rota;
                v = cc.v2(-1,0);
            }
            var rad = cc.degreesToRadians(rota);
            //player.xuac = player.gun.getActionByTag(1);
            player.gun.stopAllActions();
            var gunConf = this.res.gunsconfig[gunId];
            var dis = 1584;
            var bulletspeed = 1200;
            if(gunConf.type == 1)
            {
                var dir = cc.pRotateByAngle(v,cc.v2(0,0),rad);
                var pos = cc.pMult(dir,1584);

                var gw = player.gun.width*(1-player.gun.anchorX) + 10;
                var playerpos = cc.pAdd(player.parent.parent.position,player.parent.position);

                var ac = cc.sequence(
                    cc.callFunc(function(){
                        storage.playSound(self.res.gunaudios[gunId]);
                        var smoke = null;
                        if (self.main.poolsmokes.size() > 0) {
                            smoke = self.main.poolsmokes.get();
                            smoke.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            smoke = cc.instantiate(self.res.smoke);
                        }
                        smoke.position = cc.pAdd(playerpos,player.aim.position);
                        smoke.position = cc.pAdd(cc.pMult(dir,gw),smoke.position);
                        smoke.scaleX = -player.scaleX;
                        self.node_game.addChild(smoke,1000001);
                        smoke.runAction(cc.sequence(
                            cc.delayTime(1),
                            cc.callFunc(function(){
                                self.main.poolsmokes.put(smoke);
                            })
                        ));

                        var shell = null;
                        if (self.main.poolshells.size() > 0) {
                            shell = self.main.poolshells.get();
                            shell.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            shell = cc.instantiate(self.res.shell);
                        }
                        shell.position = cc.pAdd(playerpos,player.aim.position);
                        shell.scaleX = -player.scaleX;
                        self.node_game.addChild(shell,1000001);
                        shell.runAction(cc.sequence(
                            cc.delayTime(1),
                            cc.callFunc(function(){
                                self.main.poolshells.put(shell);
                            })
                        ));

                        player.gun_fire.active = true;
                    }),
                    cc.moveBy(0.1,-10,-3),
                    cc.moveBy(0.1,10,3),
                    cc.delayTime(0.2),
                    cc.callFunc(function(){
                        self.playerFireEnd(isSelf);
                    })
                );
                player.gun.runAction(cc.sequence(cc.delayTime(0.05),
                    cc.callFunc(function(){
                        player.gun_fire.active = false;
                    })));
                player.gun.runAction(ac);


                var bullet = null;
                if (this.main.poolebullets.size() > 0) {
                    bullet = this.main.poolebullets.get();
                    bullet.collnum = 0;
                    bullet.stopAllActions();
                } else {
                    bullet = cc.instantiate(this.res.ebullet_1);
                }

                bullet.position = cc.pAdd(playerpos,player.aim.position);
                bullet.position = cc.pAdd(cc.pMult(dir,gw),bullet.position);
                bullet.opacity = 255;
                this.node_game.addChild(bullet,1000001);
                bullet.diedir = dir;
                bullet.isSelf = isSelf;
                pos = cc.pAdd(pos,bullet.position);

                var seq = cc.sequence(
                    cc.moveTo(dis/bulletspeed,pos),
                    cc.removeSelf()
                );
                bullet.runAction(seq);
            }
            else if(gunConf.type == 2)
            {
                var gw = player.gun.width*(1-player.gun.anchorX) + 10;

                var dir = cc.pRotateByAngle(v,cc.v2(0,0),rad);

                var ac = cc.sequence(
                    cc.callFunc(function(){
                        storage.playSound(self.res.gunaudios[gunId]);
                        var playerpos = cc.pAdd(player.parent.parent.position,player.parent.position);

                        var smoke = null;
                        if (self.main.poolsmokes.size() > 0) {
                            smoke = self.main.poolsmokes.get();
                            smoke.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            smoke = cc.instantiate(self.res.smoke);
                        }
                        smoke.position = cc.pAdd(playerpos,player.aim.position);
                        smoke.position = cc.pAdd(cc.pMult(dir,gw),smoke.position);
                        smoke.scaleX = -player.scaleX;
                        self.node_game.addChild(smoke,1000001);
                        smoke.runAction(cc.sequence(
                            cc.delayTime(1),
                            cc.callFunc(function(){
                                self.main.poolsmokes.put(smoke);
                            })
                        ));

                        var shell = null;
                        if (self.main.poolshells.size() > 0) {
                            shell = self.main.poolshells.get();
                            shell.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            shell = cc.instantiate(self.res.shell);
                        }
                        shell.position = cc.pAdd(playerpos,player.aim.position);
                        shell.scaleX = -player.scaleX;
                        self.node_game.addChild(shell,1000001);
                        shell.runAction(cc.sequence(
                            cc.delayTime(1),
                            cc.callFunc(function(){
                                self.main.poolshells.put(shell);
                            })
                        ));

                        player.gun_fire.active = true;
                    }),
                    cc.spawn(
                        cc.sequence(
                            cc.moveBy(gunConf.speed/2,-10,-3),
                            cc.moveBy(gunConf.speed/2,10,3)),
                        cc.sequence(cc.delayTime(0.05),
                            cc.callFunc(function(){
                                player.gun_fire.active = false;
                            }))
                    )
                );
                var ac2 = cc.sequence(
                    cc.repeat(ac,gunConf.num),
                    cc.delayTime(0.2),
                    cc.callFunc(function(){
                        self.playerFireEnd(isSelf);
                    })
                );
                player.gun.runAction(ac2);

                for(var i=0;i<gunConf.num;i++)
                {
                    var r = 0;
                    if(i == 1)
                        r = rands[i-1]*gunConf.angle;
                    else if(i == 2)
                        r = -rands[i-1]*gunConf.angle;
                    else if(i > 2)
                        r = rands[i-1]*gunConf.angle;

                    var dir2 = cc.pRotateByAngle(dir,cc.v2(0,0),cc.degreesToRadians(r));
                    var pos = cc.pMult(dir2,1584);

                    var bullet = null;
                    if (this.main.poolebullets.size() > 0) {
                        bullet = this.main.poolebullets.get();
                        bullet.collnum = 0;
                        bullet.stopAllActions();
                    } else {
                        bullet = cc.instantiate(this.res.ebullet_1);
                    }
                    var playerpos = cc.pAdd(player.parent.parent.position,player.parent.position);
                    bullet.position = cc.pAdd(playerpos,player.aim.position);
                    bullet.position = cc.pAdd(cc.pMult(dir2,gw),bullet.position);
                    bullet.opacity = 0;
                    this.node_game.addChild(bullet,1000001);
                    bullet.diedir = dir2;
                    bullet.isSelf = isSelf;

                    pos = cc.pAdd(pos,bullet.position);

                    var seq = cc.sequence(
                        cc.delayTime(gunConf.speed*(i+1)),
                        cc.fadeIn(0),
                        cc.moveTo(dis/bulletspeed,pos),
                        cc.removeSelf()
                    );
                    bullet.runAction(seq);
                }
            }
            else if(gunConf.type == 3)
            {
                var gw = player.gun.width*(1-player.gun.anchorX) + 10;
                var dir = cc.pRotateByAngle(v,cc.v2(0,0),rad);

                var ac = cc.sequence(
                    cc.callFunc(function(){
                        storage.playSound(self.res.gunaudios[gunId]);
                        var playerpos = cc.pAdd(player.parent.parent.position,player.parent.position);
                        var smoke = null;
                        if (self.main.poolsmokes.size() > 0) {
                            smoke = self.main.poolsmokes.get();
                            smoke.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            smoke = cc.instantiate(self.res.smoke);
                        }
                        smoke.position = cc.pAdd(playerpos,player.aim.position);
                        smoke.position = cc.pAdd(cc.pMult(dir,gw),smoke.position);
                        smoke.scaleX = -player.scaleX;
                        self.node_game.addChild(smoke,1000001);
                        smoke.runAction(cc.sequence(
                            cc.delayTime(1),
                            cc.callFunc(function(){
                                self.main.poolsmokes.put(smoke);
                            })
                        ));

                        var shell = null;
                        if (self.main.poolshells.size() > 0) {
                            shell = self.main.poolshells.get();
                            shell.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            shell = cc.instantiate(self.res.shell);
                        }
                        shell.position = cc.pAdd(playerpos,player.aim.position);
                        shell.scaleX = -player.scaleX;
                        self.node_game.addChild(shell,1000001);
                        shell.runAction(cc.sequence(
                            cc.delayTime(1),
                            cc.callFunc(function(){
                                self.main.poolshells.put(shell);
                            })
                        ));

                        player.gun_fire.active = true;
                    }),
                    cc.moveBy(0.1,-10,-3),
                    cc.moveBy(0.1,10,3),
                    cc.delayTime(0.2),
                    cc.callFunc(function(){
                        self.playerFireEnd(isSelf);
                    })
                );
                player.gun.runAction(cc.sequence(cc.delayTime(0.05),
                    cc.callFunc(function(){
                        player.gun_fire.active = false;
                    })));
                player.gun.runAction(ac);

                for(var i=0;i<gunConf.num;i++)
                {
                    var r = 0;
                    if(i == 1)
                        r = rands[i-1]*gunConf.angle;
                    else if(i == 2)
                        r = -rands[i-1]*gunConf.angle;
                    else if(i > 2)
                        r = rands[i-1]*gunConf.angle;

                    var dir2 = cc.pRotateByAngle(dir,cc.v2(0,0),cc.degreesToRadians(r));
                    var pos = cc.pMult(dir2,1584);

                    var bullet = null;
                    if (this.main.poolebullets.size() > 0) {
                        bullet = this.main.poolebullets.get();
                        bullet.collnum = 0;
                        bullet.stopAllActions();
                    } else {
                        bullet = cc.instantiate(this.res.ebullet_1);
                    }
                    var playerpos = cc.pAdd(player.parent.parent.position,player.parent.position);
                    bullet.position = cc.pAdd(playerpos,player.aim.position);
                    bullet.position = cc.pAdd(cc.pMult(dir2,gw),bullet.position);
                    //bullet.opacity = 0;
                    this.node_game.addChild(bullet,1000001);
                    bullet.diedir = dir2;
                    bullet.isSelf = isSelf;

                    pos = cc.pAdd(pos,bullet.position);

                    var seq = cc.sequence(
                        cc.moveTo(dis/bulletspeed,pos),
                        cc.removeSelf()
                    );
                    bullet.runAction(seq);
                }
            }
        }
    },

    playerFireEnd: function(isSelf)
    {
        var self = this;
        if(isSelf)
        {
            this.player.aim.active = true;

            this.player.gun.stopAllActions();
            var playerConf = this.res.playersconfig[this.selfPlayer.skinId];
            var ac = null;
            if(this.player.gun.rotationDir == 1)
            {
                var per = Math.abs((this.player.gun.rotation+60)/-60);
                ac = cc.sequence(
                    cc.rotateTo(1.1*playerConf.aimSpeed*per,-60).easing(cc.easeIn(1.5)),
                    cc.callFunc(function(){
                        self.player.gun.rotationDir = 2;
                    }),
                    cc.rotateTo(1.1*playerConf.aimSpeed,0).easing(cc.easeOut(1.5)),
                    cc.callFunc(function(){
                        self.playerRotate();
                    })
                );
            }
            else
            {
                var per = this.player.gun.rotation/-60;
                ac = cc.sequence(
                    cc.rotateTo(1.1*playerConf.aimSpeed*per,0).easing(cc.easeOut(1.5)),
                    cc.callFunc(function(){
                        self.playerRotate();
                    })
                );
            }

            ac.setTag(1);
            this.player.gun.runAction(ac);
        }
        else
        {
            this.enemy.aim.active = true;

            this.enemy.gun.stopAllActions();
            var playerConf = this.res.playersconfig[this.enemyPlayer.skinId];
            var ac = null;
            if(this.enemy.gun.rotationDir == 1)
            {
                var per =  Math.abs((this.enemy.gun.rotation+60)/-60);
                ac = cc.sequence(
                    cc.rotateTo(1.1*playerConf.aimSpeed*per,-60).easing(cc.easeIn(1.5)),
                    cc.callFunc(function(){
                        self.enemy.gun.rotationDir = 2;
                    }),
                    cc.rotateTo(1.1*playerConf.aimSpeed,0).easing(cc.easeOut(1.5))
                );
            }
            else
            {
                var per = this.enemy.gun.rotation/-60;
                ac = cc.rotateTo(1.1*playerConf.aimSpeed*per,0).easing(cc.easeOut(1.5));
            }

            ac.setTag(1);
            this.enemy.gun.runAction(ac);
        }
    },

    enemyHurt: function(isHead,diedir)
    {
        var playerConf = this.res.playersconfig[this.selfPlayer.skinId];
        var gunConf = this.res.gunsconfig[this.selfPlayer.gunId];
        var hhp = (gunConf.fire+playerConf.fire);
        if(isHead)
            hhp *= 2;
        websocket.bulletCollision(this.enemyPlayer.uid,hhp,isHead,diedir.x,diedir.y);
    },

    killEnemy: function(data)
    {
        var self = this;
        var isHead = data.isHead;
        var hurt = data.hurt;
        var hpnum = data.hp;
        var diedir = cc.v2(data.diedirX,data.diedirY);
        var player = null;
        if(data.uid == this.selfPlayer.uid)
        {
            player = this.player;
            this.selfPlayer.hp = hpnum;
        }
        else
        {
            player = this.enemy;
            this.enemyPlayer.hp = hpnum;
        }

        var playerpos = cc.pAdd(player.parent.parent.position,player.parent.position);

        var hit = null;
        if (this.main.poolhits.size() > 0) {
            hit = this.main.poolhits.get();
            hit.stopAllActions();
        } else {
            hit = cc.instantiate(this.res.hit);
        }
        hit.scale = 0;
        hit.color = cc.color(255,0,0);
        hit.position = playerpos;
        hit.y += player.height/2;
        this.node_game.addChild(hit,1000001);
        var sct = 0.5;
        if(isHead)
        {
            sct = 1;
            //if(data.uid == this.enemyPlayer.uid)
            //    this.addCoin();

            this.hitbg.runAction(cc.sequence(
                cc.fadeIn(0.05),
                cc.fadeOut(0.05)
            ));
            this.node_game.runAction(cc.sequence(
                cc.moveBy(0.05,cc.v2(20,10)).easing(cc.easeSineIn()),
                cc.moveBy(0.05,cc.v2(-20,-10)).easing(cc.easeSineOut()),
                cc.moveBy(0.05,cc.v2(0,10)).easing(cc.easeSineIn()),
                cc.moveBy(0.05,cc.v2(0,-10)).easing(cc.easeSineOut())
            ));

            this.main.vibrate();

            var par = null;
            if (this.main.poolbigbloods.size() > 0) {
                par = this.main.poolbigbloods.get();
                par.getComponent("cc.ParticleSystem").resetSystem();
            } else {
                par = cc.instantiate(this.bigblood);
            }
            par.getComponent("cc.ParticleSystem").startColor = cc.color(255,0,0);
            par.getComponent("cc.ParticleSystem").endColor = cc.color(255,0,0);
            par.position = hit.position;
            par.scaleX = -this.enemy.scaleX;
            this.node_game.addChild(par,1000001);
            par.runAction(cc.sequence(
                cc.delayTime(1),
                cc.callFunc(function(){
                    self.main.poolbigbloods.put(par);
                })
            ));
        }
        else
        {
            var par = null;
            if (this.main.poolbloods.size() > 0) {
                par = this.main.poolbloods.get();
                par.getComponent("cc.ParticleSystem").resetSystem();
            } else {
                par = cc.instantiate(this.res.blood);
            }
            par.getComponent("cc.ParticleSystem").startColor = cc.color(255,0,0);
            par.getComponent("cc.ParticleSystem").endColor = cc.color(255,0,0);
            par.position = hit.position;
            par.scaleX = -this.enemy.scaleX;
            this.node_game.addChild(par,1000001);

            par.runAction(cc.sequence(
                cc.delayTime(1),
                cc.callFunc(function(){
                    self.main.poolbloods.put(par);
                })
            ));
        }
        var seq = cc.sequence(
            cc.scaleTo(0.3,sct,sct).easing(cc.easeSineIn()),
            cc.callFunc(function(){
                self.main.poolhits.put(hit);
            })
        );
        hit.runAction(seq);

        var hpbg = new cc.Node();
        var hp = hpbg.addComponent("cc.Label");
        hp.string = "-"+hurt;
        hpbg.position = playerpos;
        hpbg.y += player.height;
        this.node_game.addChild(hpbg,1000000000);

        hpbg.runAction(cc.sequence(
            cc.spawn(
                cc.moveBy(0.5,Math.random()*80,100).easing(cc.easeSineOut()),
                cc.scaleTo(0.5,1.4).easing(cc.easeSineOut()),
                cc.fadeOut(0.7)
            ),
            cc.removeSelf()
        ));

        if(data.uid == this.selfPlayer.uid)
        {
            if(this.selfPlayer.dirX == 1)
            {
                this.left_pro.progress = hpnum/50.0;
                if(this.left_pro.progress>=0.9)
                    this.left_pro_bar.color = cc.color(0,160,233);
                else if(this.left_pro.progress>=0.4 && this.left_pro.progress<0.9)
                    this.left_pro_bar.color = cc.color(0,255,0);
                else if(this.left_pro.progress>=0.1 && this.left_pro.progress<0.4)
                    this.left_pro_bar.color = cc.color(255,183,0);
                else
                    this.left_pro_bar.color = cc.color(255,0,0);
            }
            else
            {
                this.right_pro.progress = hpnum/50.0;

                if(this.right_pro.progress>=0.9)
                    this.right_pro_bar.color = cc.color(0,160,233);
                else if(this.right_pro.progress>=0.4 && this.right_pro.progress<0.9)
                    this.right_pro_bar.color = cc.color(0,255,0);
                else if(this.right_pro.progress>=0.1 && this.right_pro.progress<0.4)
                    this.right_pro_bar.color = cc.color(255,183,0);
                else
                    this.right_pro_bar.color = cc.color(255,0,0);
            }
        }
        else
        {
            if(this.enemyPlayer.dirX == 1)
            {
                this.left_pro.progress = hpnum/50.0;

                if(this.left_pro.progress>=0.9)
                    this.left_pro_bar.color = cc.color(0,160,233);
                else if(this.left_pro.progress>=0.4 && this.left_pro.progress<0.9)
                    this.left_pro_bar.color = cc.color(0,255,0);
                else if(this.left_pro.progress>=0.1 && this.left_pro.progress<0.4)
                    this.left_pro_bar.color = cc.color(255,183,0);
                else
                    this.left_pro_bar.color = cc.color(255,0,0);
            }
            else
            {
                this.right_pro.progress = hpnum/50.0;

                if(this.right_pro.progress>=0.9)
                    this.right_pro_bar.color = cc.color(0,160,233);
                else if(this.right_pro.progress>=0.4 && this.right_pro.progress<0.9)
                    this.right_pro_bar.color = cc.color(0,255,0);
                else if(this.right_pro.progress>=0.1 && this.right_pro.progress<0.4)
                    this.right_pro_bar.color = cc.color(255,183,0);
                else
                    this.right_pro_bar.color = cc.color(255,0,0);
            }
        }

        if(hpnum<=0)
        {
            var roang = 180;
            var dis = 300;
            if(player.scaleX == 1)
            {
                roang = -roang;
            }
            var pos = cc.pAdd(player.position,cc.pMult(diedir, dis));

            var ac = cc.sequence(
                cc.spawn(
                    cc.jumpTo(dis/300,pos,dis/2,1),
                    cc.rotateBy(dis/300,roang)
                ),
                cc.callFunc(function(){
                    self.gameOver();
                }),
                cc.removeSelf()
            );
            player.runAction(ac);
        }
    },

    addCoin: function()
    {
        var self = this;
        var coin = null;
        if (this.main.poolcoins.size() > 0) {
            coin = this.main.poolcoins.get();
            coin.stopAllActions();
        } else {
            coin = cc.instantiate(this.res.coin);
        }
        coin.position = this.node_over_box_1.parent.convertToWorldSpaceAR(this.node_over_box_1.position);
        this.node_over.addChild(coin);

        var coinNum = 1;

        var x = coin.x+Math.random()*100-50;
        var seq = cc.sequence(
            cc.bezierTo(1.5,[cc.v2(coin.x-Math.random()*100,coin.y),
                cc.v2(x+Math.random()*100-50,coin.y+Math.random()*100),this.coin.position]),
            cc.callFunc(function(){
                self.getCoin(coinNum);
                storage.playSound(self.res.audio_coin);
            }),
            cc.removeSelf()
        );
        coin.runAction(seq);
    },


    gameOver: function()
    {
        var self = this;
        this.state == "stop";
        this.stopScroll();
        this.node_over.active = true;

        this.node_game_ui.active = false;
        this.taizi_a.active = false;
        this.taizi_b.active = false;

        this.node_over_fanhui.getComponent("cc.Button").interactable = true;
        this.node_over_again.getComponent("cc.Button").interactable = true;
        this.node_over_home.getComponent("cc.Button").interactable = true;
        this.node_over_home.color = cc.color(255,255,255);

        this.loadPic(this.node_over_box_1,this.selfPlayer.avatarUrl+"?"+Math.random());
        this.loadPic(this.node_over_box_2,this.enemyPlayer.avatarUrl+"?"+Math.random());
        this.node_over_box_1_name.string = this.selfPlayer.name;
        this.node_over_box_2_name.string = this.enemyPlayer.name;
        this.node_over_guang.stopAllActions();
        this.node_over_guang.runAction(cc.repeatForever(cc.rotateBy(2,180)));

        if(this.selfPlayer.hp>this.enemyPlayer.hp)
        {
            this.GAME.isWin = true;
            this.node_over_title.string = "恭喜！获得胜利";
            this.node_over_guang.position = this.node_over_box_1.position;
            this.node_over_bili.string = "1 : 0";
            this.node_over_fanhui_str.string = "改天再战";
            this.node_over_again_str.string = "再来一局";
            storage.setStorageCoin(storage.getStorageCoin()+40);

            this.node.runAction(cc.repeat(cc.sequence(
                cc.delayTime(0.05),
                cc.callFunc(function(){
                    self.addCoin();
                })
            ),41));

            var winNum = storage.getStorageWinNum();
            winNum += 1;
            storage.setStorageWinNum(winNum);

            if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
                wx.postMessage({ message: "updateWinNum",winNum:winNum,playerId:this.selfPlayer.skinId,gunId:this.selfPlayer.gunId });
        }
        else
        {
            this.GAME.isWin = false;
            this.node_over_title.string = "遗憾！失败了";
            this.node_over_guang.position = this.node_over_box_2.position;
            this.node_over_bili.string = "0 : 1";
            this.node_over_fanhui_str.string = "溜了";
            this.node_over_again_str.string = "不服再来";
        }
    },

    roomCountDown: function(data)
    {
        var t = Math.floor(data.time/1000);
        if(t < 0) t = 0;
        this.time.string = t;
    },

    roomTimeOut: function()
    {
        this.gameOver();
    },

    addListener: function()
    {
        var self = this;
        var s = cc.winSize;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {

        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.toFire();
        }, this);
    },

    onCollisionEnter: function (other, self)
    {
        if(!self.node.collnum)
            self.node.collnum = 1;
        else
            self.node.collnum ++;

        if(self.node.collnum==1 && self.node.isSelf)
        {
            if(other.node == this.enemy)
            {
                this.enemyHurt(other.tag,self.node.diedir);
            }
        }
        if((!self.node.isSelf && other.node == this.player) || (self.node.isSelf && other.node == this.enemy))
            this.main.poolebullets.put(self.node);
    },
    
    update: function(dt)
    {
        if(websocket.state == 1)
        {
            //心跳处理
            this.heartDt += dt;
            if(this.heartDt > 10)
            {
                this.heartDt = 0;
                websocket.heartBeat();
            }

            if(this.state == "start")
            {
                this.updateScroll(dt);
            }
        }

        if(this.isHide)
        {
            this.isHide = false;
            this.goHome();
        }
    },

    loadPic: function(sp,url)
    {
        cc.loader.load({url: url, type: 'png'}, function (err, tex) {
            if(err)
            {
                cc.log(err);
            }
            else
            {
                var spriteFrame = new cc.SpriteFrame(tex);
                sp.getComponent("cc.Sprite").spriteFrame = spriteFrame;
            }
        });
    }
});
