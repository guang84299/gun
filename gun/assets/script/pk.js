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
        this.currPkGun = storage.getStorageCurrGun()-1;//storage.getStorageCurrPkGun()-1;
        this.publish = storage.getStoragePublish();

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
        this.isVedio = false;
        this.isClickSuiji2 = false;
        this.isSuiJiMatch = false;
        this.isFromShare = false;
        var self = this;

        websocket.init(this,function(){
            websocket.login(self.qianqista.openid,self.qianqista.userName,self.qianqista.avatarUrl);
        });

        this.subTime = 0;
        this.subDt =  0;
        var self = this;
        this.main.qianqista.subTime(function(res){
            self.subTime = res.data;
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
        this.taizi_c = cc.find("taizi_c",this.node_game);
        this.taizi_d = cc.find("taizi_d",this.node_game);
        this.taizi_a_player = cc.find("taizi_a/player",this.node_game);
        this.taizi_b_player = cc.find("taizi_b/player",this.node_game);
        this.taizi_c_player = cc.find("taizi_c/player",this.node_game);
        this.taizi_d_player = cc.find("taizi_d/player",this.node_game);

        this.node_game_ui = cc.find("node_game_ui",this.node);
        this.coin = cc.find("coin",this.node_game_ui);
        this.coin_num = cc.find("coin/num",this.node_game_ui).getComponent("cc.Label");
        this.time = cc.find("timebg/time",this.node_game_ui).getComponent("cc.Label");

        this.box_a = cc.find("a",this.node_game_ui);
        this.box_b = cc.find("b",this.node_game_ui);
        this.box_c = cc.find("c",this.node_game_ui);
        this.box_d = cc.find("d",this.node_game_ui);

        this.a_icon = cc.find("a/icon",this.node_game_ui);
        this.a_name = cc.find("a/name",this.node_game_ui).getComponent("cc.Label");
        this.a_pro = cc.find("a/pro",this.node_game_ui).getComponent("cc.ProgressBar");
        this.a_pro_bar = cc.find("a/pro/bar",this.node_game_ui);

        this.b_icon = cc.find("b/icon",this.node_game_ui);
        this.b_name = cc.find("b/name",this.node_game_ui).getComponent("cc.Label");
        this.b_pro = cc.find("b/pro",this.node_game_ui).getComponent("cc.ProgressBar");
        this.b_pro_bar = cc.find("b/pro/bar",this.node_game_ui);

        this.c_icon = cc.find("c/icon",this.node_game_ui);
        this.c_name = cc.find("c/name",this.node_game_ui).getComponent("cc.Label");
        this.c_pro = cc.find("c/pro",this.node_game_ui).getComponent("cc.ProgressBar");
        this.c_pro_bar = cc.find("c/pro/bar",this.node_game_ui);

        this.d_icon = cc.find("d/icon",this.node_game_ui);
        this.d_name = cc.find("d/name",this.node_game_ui).getComponent("cc.Label");
        this.d_pro = cc.find("d/pro",this.node_game_ui).getComponent("cc.ProgressBar");
        this.d_pro_bar = cc.find("d/pro/bar",this.node_game_ui);

        this.fire = cc.find("fire",this.node_game_ui);
        this.fire_pro = cc.find("fire",this.node_game_ui).getComponent("cc.ProgressBar");
        this.hitbg = cc.find("hitbg",this.node_game_ui);

        this.node_sel_mode = cc.find("node_sel_mode",this.node);
        this.node_sel_mode_coin_num = cc.find("coin/num",this.node_sel_mode).getComponent("cc.Label");


        this.node_sel = cc.find("node_sel",this.node);
        this.node_sel_title = cc.find("bg/title",this.node_sel).getComponent("cc.Label");
        this.node_sel_box_1 = cc.find("bg/box_1",this.node_sel);
        this.node_sel_box_2 = cc.find("bg/box_2",this.node_sel);
        this.node_sel_box_2_wenhao = cc.find("bg/box_2/wenhao",this.node_sel);
        this.node_sel_box_1_name = cc.find("bg/box_1/name",this.node_sel).getComponent("cc.Label");
        this.node_sel_box_2_name = cc.find("bg/box_2/name",this.node_sel).getComponent("cc.Label");
        this.node_sel_suiji = cc.find("suiji",this.node_sel);
        this.node_sel_duizhan = cc.find("duizhan",this.node_sel);
        this.node_sel_gun = cc.find("gun",this.node_sel);
        this.node_sel_home = cc.find("home",this.node_sel);
        this.node_sel_willstart = cc.find("bg/willstart",this.node_sel).getComponent("cc.Label");
        this.node_sel_coin = cc.find("coin",this.node_sel);
        this.node_sel_coin_num = cc.find("coin/num",this.node_sel).getComponent("cc.Label");
        this.node_sel_lv = cc.find("bg/lv",this.node_sel).getComponent("cc.Sprite");
        this.node_sel_lv_num = cc.find("bg/lv/num",this.node_sel).getComponent("cc.Label");


        this.node_sel2 = cc.find("node_sel2",this.node);
        this.node_sel2_title = cc.find("bg/title",this.node_sel2).getComponent("cc.Label");
        this.node_sel2_box_1 = cc.find("bg/box_1",this.node_sel2);
        this.node_sel2_box_2 = cc.find("bg/box_2",this.node_sel2);
        this.node_sel2_box_3 = cc.find("bg/box_3",this.node_sel2);
        this.node_sel2_box_4 = cc.find("bg/box_4",this.node_sel2);
        this.node_sel2_box_2_wenhao = cc.find("bg/box_2/wenhao",this.node_sel2);
        this.node_sel2_box_3_wenhao = cc.find("bg/box_3/wenhao",this.node_sel2);
        this.node_sel2_box_4_wenhao = cc.find("bg/box_4/wenhao",this.node_sel2);
        this.node_sel2_box_1_name = cc.find("bg/box_1/name",this.node_sel2).getComponent("cc.Label");
        this.node_sel2_box_2_name = cc.find("bg/box_2/name",this.node_sel2).getComponent("cc.Label");
        this.node_sel2_box_3_name = cc.find("bg/box_3/name",this.node_sel2).getComponent("cc.Label");
        this.node_sel2_box_4_name = cc.find("bg/box_4/name",this.node_sel2).getComponent("cc.Label");
        this.node_sel2_suiji = cc.find("suiji",this.node_sel2);
        this.node_sel2_duizhan = cc.find("duizhan",this.node_sel2);
        this.node_sel2_gun = cc.find("gun",this.node_sel2);
        this.node_sel2_home = cc.find("home",this.node_sel2);
        this.node_sel2_willstart_la = cc.find("bg/willstart",this.node_sel2);
        this.node_sel2_willstart = cc.find("bg/willstart",this.node_sel2).getComponent("cc.Label");
        this.node_sel2_coin = cc.find("coin",this.node_sel2);
        this.node_sel2_coin_num = cc.find("coin/num",this.node_sel2).getComponent("cc.Label");
        this.node_sel2_lv = cc.find("bg/lv",this.node_sel2).getComponent("cc.Sprite");
        this.node_sel2_lv_num = cc.find("bg/lv/num",this.node_sel2).getComponent("cc.Label");


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
        this.node_over_jifenx2 = cc.find("jifenx2",this.node_over);
        this.node_over_home = cc.find("home",this.node_over);
        this.node_over_coin = cc.find("coin",this.node_over);
        this.node_over_coin_num = cc.find("coin/num",this.node_over).getComponent("cc.Label");
        this.node_over_jifen = cc.find("bg/jifen",this.node_over).getComponent("cc.Label");
        this.node_over_star = cc.find("bg/star",this.node_over).getComponent("cc.Label");

        this.node_over2 = cc.find("node_over2",this.node);
        this.node_over2_title = cc.find("bg/title",this.node_over2).getComponent("cc.Label");
        this.node_over2_box_1 = cc.find("bg/box_1",this.node_over2);
        this.node_over2_box_2 = cc.find("bg/box_2",this.node_over2);
        this.node_over2_box_3 = cc.find("bg/box_3",this.node_over2);
        this.node_over2_box_4 = cc.find("bg/box_4",this.node_over2);
        this.node_over2_box_1_name = cc.find("bg/box_1/name",this.node_over2).getComponent("cc.Label");
        this.node_over2_box_2_name = cc.find("bg/box_2/name",this.node_over2).getComponent("cc.Label");
        this.node_over2_box_3_name = cc.find("bg/box_3/name",this.node_over2).getComponent("cc.Label");
        this.node_over2_box_4_name = cc.find("bg/box_4/name",this.node_over2).getComponent("cc.Label");
        this.node_over2_guang = cc.find("bg/guang",this.node_over2);
        this.node_over2_bili = cc.find("bg/bili",this.node_over2).getComponent("cc.Label");
        this.node_over2_fanhui = cc.find("fanhui",this.node_over2);
        this.node_over2_fanhui_str = cc.find("fanhui/str",this.node_over2).getComponent("cc.Label");
        this.node_over2_again = cc.find("again",this.node_over2);
        this.node_over2_again_str = cc.find("again/str",this.node_over2).getComponent("cc.Label");
        this.node_over2_jifenx2 = cc.find("jifenx2",this.node_over2);
        this.node_over2_home = cc.find("home",this.node_over2);
        this.node_over2_coin = cc.find("coin",this.node_over2);
        this.node_over2_coin_num = cc.find("coin/num",this.node_over2).getComponent("cc.Label");
        this.node_over2_jifen = cc.find("bg/jifen",this.node_over2).getComponent("cc.Label");
        this.node_over2_star = cc.find("bg/star",this.node_over2).getComponent("cc.Label");

        this.getCoin(storage.getStorageCoin());

        var self = this;
        this.qianqista.setHideCallback(function(){
            if(self.isShare)
            {
                self.isShare = false;
            }
            else if(self.isVedio)
            {
                self.isVedio = false;
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
        if(this.main.isConec)
        {
            this.loadPic(this.node_sel_box_1,this.qianqista.avatarUrl+"?"+Math.random());
            this.loadPic(this.node_sel2_box_1,this.qianqista.avatarUrl+"?"+Math.random());
        }

        this.node_sel_box_1_name.string = storage.getLabelStr(this.qianqista.userName,12);
        this.node_sel2_box_1_name.string = storage.getLabelStr(this.qianqista.userName,12);

        var rank = 1000;
        var pk = this.main.worldrank.pk;
        if(pk.length > 0)
            rank = pk[pk.length-1].id;
        if(rank == 0)
            rank = 1000;
        this.node_sel_lv.spriteFrame = this.res.getPkLvSp(storage.getStorageMaxJScore(),rank);
        this.node_sel_lv_num.string = storage.getStorageMaxJScore();

        this.node_sel2_lv.spriteFrame = this.res.getPkLvSp(storage.getStorageMaxJScore(),rank);
        this.node_sel2_lv_num.string = storage.getStorageMaxJScore();

        this.node_game_ui.active = false;
        this.taizi_a.active = false;
        this.taizi_b.active = false;
        this.taizi_c.active = false;
        this.taizi_d.active = false;

        this.publish = storage.getStoragePublish();

        if(cc.sys.isIOS)
        {
            this.node_sel_duizhan.active = false;
            this.node_sel_suiji.x = cc.winSize.width/2+130;
            this.node_sel_gun.x = cc.winSize.width/2-130;
        }
    },

    updateCurrPkGun: function()
    {
        this.currPkGun = storage.getStorageCurrGun();//storage.getStorageCurrPkGun()-1;
    },

    showGunUI: function(active)
    {
        if(active)
        {
            this.main.node_game.active = true;
            this.node.active = false;
        }
        else
        {
            this.main.node_game.active = false;
            this.node.active = true;
        }
    },

    getCoin: function(coin)
    {
        this.GAME.coin += coin;
        this.coin_num.string = Math.floor(this.GAME.coin)+"";
        this.node_sel_mode_coin_num.string = Math.floor(this.GAME.coin)+"";
        this.node_over_coin_num.string = Math.floor(this.GAME.coin)+"";
        this.node_sel_coin_num.string = Math.floor(this.GAME.coin)+"";
        this.node_over2_coin_num.string = Math.floor(this.GAME.coin)+"";
        this.node_sel2_coin_num.string = Math.floor(this.GAME.coin)+"";
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
        if(data == "danren")
        {
            if(this.judgeJiesuan())
            {
                return;
            }
            this.node_sel_mode.active = false;
            this.node_sel.active = true;

            this.main.wxBannerShow();
        }
        else if(data == "shuangren")
        {
            if(this.judgeJiesuan())
            {
                return;
            }
            this.isClickSuiji2 = false;
            this.node_sel_mode.active = false;
            this.node_sel2.active = true;

            this.main.wxBannerShow();
        }
        else if(data == "suiji")
        {
            if(this.judgeJiesuan())
            {
                return;
            }
            this.qianqista.event("pvp_1v1_suiji");

            var self = this;

            //var coin = storage.getStorageCoin();
            //if(coin < 30)
            //{
            //    //this.res.showToast("金币不足");
            //    var coin = cc.instantiate(this.res.node_coin);
            //    coin.position = cc.v2(0,0);
            //    this.node.addChild(coin);
            //    this.node_coin = coin.getComponent("coin");
            //    this.node_coin.show();
            //    return;
            //}
            if(websocket.state == 1)
            {
                this.main.wxVideoShow(11,function(res){
                    if(res)
                    {
                        websocket.match(1,self.main.GAME.currPlayer,self.currPkGun,0);
                    }
                    else
                    {
                        self.res.showToast("进入房间失败！");
                    }
                });
            }
            else
            {
                //this.res.showToast("服务器登录失败！重新登录中...");
                websocket.close();
                websocket.init(this,function(){
                    websocket.login(self.qianqista.openid,self.qianqista.userName,self.qianqista.avatarUrl);
                });
            }
        }
        else if(data == "duizhan")
        {
            if(this.judgeJiesuan())
            {
                return;
            }
            if(websocket.state != 1)
            {
                var self = this;
                //this.res.showToast("服务器登录失败！重新登录中...");
                websocket.close();
                websocket.init(this,function(){
                    websocket.login(self.qianqista.openid,self.qianqista.userName,self.qianqista.avatarUrl);
                });
            }
            else
            {
                websocket.match(2,this.main.GAME.currPlayer,this.currPkGun,0);
            }
        }
        else if(data == "sel_fanhui")
        {
            this.main.wxBannerHide();
            this.isSuiJiMatch = false;
            if(this.state == "willagain")
            {
                this.state = "stop";
                websocket.questLeaveRoom(this.qianqista.openid);
                this.node.stopAllActions();
            }

            this.node.stopAllActions();
            this.main.wxQuanState(true);
            websocket.close();
            this.main.goMain();
            this.hide();

            //if(this.state == "willstart" || this.state == "pipei")
            //{
            //    this.state = "stop";
            //    websocket.questLeaveRoom(this.qianqista.openid);
            //    this.node.stopAllActions();
            //}
            //this.node_sel.active = false;
            //this.node_sel_mode.active = true;
        }
        else if(data == "suiji2")
        {
            if(this.judgeJiesuan())
            {
                return;
            }
            this.qianqista.event("pvp_2v2_suiji");
            this.isFromShare = false;
            if(this.state == "pipei")
            {
                this.isSuiJiMatch = true;
                websocket.matchRoom();
                this.node_sel2_suiji.getComponent("cc.Button").interactable = false;
                this.node_sel2_duizhan.getComponent("cc.Button").interactable = false;
                this.node_sel2_willstart_la.active = true;
            }
            else
            {
                var coin = storage.getStorageCoin();
                if(coin < 30)
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
                    this.isClickSuiji2 = true;
                    websocket.match(3,this.main.GAME.currPlayer,this.currPkGun,0);
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
        }
        else if(data == "duizhan2")
        {
            if(this.judgeJiesuan())
            {
                return;
            }
            this.isFromShare = false;
            if(websocket.state != 1)
            {
                var self = this;
                this.res.showToast("服务器登录失败！重新登录中...");
                websocket.close();
                websocket.init(this,function(){
                    websocket.login(self.qianqista.openid,self.qianqista.userName,self.qianqista.avatarUrl);
                });
            }
            else
            {
                if(this.state == "pipei")
                {
                    this.wxGropSharePk();
                }
                else
                {
                    websocket.match(3,this.main.GAME.currPlayer,this.currPkGun,0);
                }
            }
        }
        else if(data == "sel2_fanhui")
        {
            this.isSuiJiMatch = false;
            this.sel2_fanhui();
        }
        else if(data == "home")
        {
            this.main.wxBannerHide();
            this.isSuiJiMatch = false;
            if(this.state == "willagain")
            {
                this.state = "stop";
                websocket.questLeaveRoom(this.qianqista.openid);
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
        else if(data == "over_fanhui")
        {
            this.fanhui();
        }
        else if(data == "again")
        {
            if(this.judgeJiesuan())
            {
                return;
            }
            //if(this.playerData && this.playerData.roomType == 1)
            //{
            //    var coin = storage.getStorageCoin();
            //    if(coin < 30)
            //    {
            //        //this.res.showToast("金币不足");
            //        var coin = cc.instantiate(this.res.node_coin);
            //        coin.position = cc.v2(0,0);
            //        this.node.addChild(coin);
            //        this.node_coin = coin.getComponent("coin");
            //        this.node_coin.show();
            //        return;
            //    }
            //}


            this.again();
        }
        else if(data == "over2_fanhui")
        {
            this.isSuiJiMatch = false;
            this.over2_fanhui();
        }
        else if(data == "gun")
        {
            this.main.wxBannerHide();
            this.main.openGun();
            this.showGunUI(true);
        }
        else if(data == "jifenx2")
        {
            this.state = "stop";
            websocket.questLeaveRoom(this.qianqista.openid);
            this.node.stopAllActions();

            this.isVedio = true;
            this.main.wxVideoShow(6);
            if(this.node_over.active)
                this.node_over_jifenx2.getComponent("cc.Button").interactable = false;
            else
                this.node_over2_jifenx2.getComponent("cc.Button").interactable = false;
        }
        cc.log(data);
    },

    judgeJiesuan: function()
    {
        //if(this.subTime > -2*60*1000 && this.subTime < 5*60*1000)
        //{
        //    var t = 1;
        //    if(this.subTime>=0)
        //        t = Math.floor(this.subTime/60/1000)+2;
        //    else
        //        t = Math.floor((this.subTime + 2*60*1000)/60/1000);
        //    if(t<=0)
        //        t = 1;
        //    this.res.showToast("奖励结算中，请稍等"+t+"分钟.");
        //
        //    websocket.close();
        //
        //    return true;
        //}

        return false;
    },

    sharePk: function()
    {
        if(this.judgeJiesuan())
        {
            return;
        }
        this.qianqista.event("pvp_yaoqing");
        this.node_sel_mode.active = false;
        if(this.qianqista.pkroomtype == 2)
            this.node_sel.active = true;
        else
            this.node_sel2.active = true;

        if(this.qianqista.pkroomtype == 3)
        {
            var coin = storage.getStorageCoin();
            if(coin < 30)
            {
                //this.res.showToast("金币不足");
                var coin = cc.instantiate(this.res.node_coin);
                coin.position = cc.v2(0,0);
                this.node.addChild(coin);
                this.node_coin = coin.getComponent("coin");
                this.node_coin.show();
                return;
            }
        }

        if(websocket.state == 1)
        {
            websocket.match(this.qianqista.pkroomtype,this.main.GAME.currPlayer,this.currPkGun,this.qianqista.pkfromid);
        }
        else
        {
            var self = this;
            websocket.close();
            websocket.init(this,function(){
                websocket.login(self.qianqista.openid,self.qianqista.userName,self.qianqista.avatarUrl,function(){
                    websocket.match(self.qianqista.pkroomtype,self.main.GAME.currPlayer,self.currPkGun,self.qianqista.pkfromid);
                });
            });
        }

        if(this.qianqista.pkroomtype == 3)
        {
            this.node_sel2_suiji.getComponent("cc.Button").interactable = false;
            this.node_sel2_duizhan.getComponent("cc.Button").interactable = false;
            this.isFromShare = true;
        }
    },

    wxGropSharePk: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            self.isShare = true;

            var info = {};
            info.channel = "shareonline";
            info.fromid = this.playerData.playerA.roomId;
            info.roomType = this.playerData.roomType;
            var query = JSON.stringify(info);
            var title = "5W悬赏金，助你成为最牛神枪手！";
            var imageUrl = "http://www.qiqiup.com/gun.gif";
            var shareInfo = {
                summary:title,          //QQ聊天消息标题
                picUrl:imageUrl,               //QQ聊天消息图片
                extendInfo:query   //QQ聊天消息扩展字段
            };

            //BK.QQ.share(shareInfo, function (retCode, shareDest, isFirstShare) {
            //    BK.Script.log(1, 1, "retCode:" + retCode + " shareDest:" + shareDest + " isFirstShare:" + isFirstShare);
            //    if (retCode == 0) {
            //        BK.Script.log(1, 1, "分享成功：" + retCode);
            //
            //    }
            //    else {
            //        BK.Script.log(1, 1, "分享失败" + retCode);
            //        self.main.qianqista.share(false);
            //        self.res.showToast("分享失败！");
            //    }
            //});

            BK.Share.share({
                qqImgUrl: imageUrl,
                summary: title,
                extendInfo: query,
                success: function(succObj){
                    BK.Console.log('Waaaah! share success', succObj.code, JSON.stringify(succObj.data));

                },
                fail: function(failObj){
                    BK.Console.log('Waaaah! share fail', failObj.code, JSON.stringify(failObj.msg));

                    self.main.qianqista.share(false);
                    self.res.showToast("分享失败！");
                },
                complete: function(){
                    BK.Console.log('Waaaah! share complete');
                }
            });


            //var query = "channel=shareonline&fromid="+this.playerData.playerA.roomId +"&roomType="+this.playerData.roomType;
            //var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            //var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            //if(this.main.GAME.shares.duizhan_txt1 && this.main.GAME.shares.duizhan_pic1)
            //{
            //    title = this.main.GAME.shares.duizhan_txt1;
            //    imageUrl = this.main.GAME.shares.duizhan_pic1;
            //}
            //wx.shareAppMessage({
            //    query:query,
            //    title: title,
            //    imageUrl: imageUrl,
            //    success: function(res)
            //    {
            //        //self.res.showToast("分享成功，等待好友上线吧");
            //        cc.log(res);
            //    },
            //    fail: function()
            //    {
            //        self.main.qianqista.share(false);
            //        self.res.showToast("分享失败！");
            //    }
            //});
        }
        else
        {
            cc.log("房间id:"+this.playerData.playerA.roomId);
        }
    },

    match: function(data)
    {
        var self = this;

        if(this.node_sel.active)
        {
            this.node_sel_suiji.getComponent("cc.Button").interactable = false;
            this.node_sel_duizhan.getComponent("cc.Button").interactable = false;
            this.node_sel_gun.getComponent("cc.Button").interactable = false;
            this.node_sel_title.string = "匹配中";
            this.node_sel_box_2_name.string = "(30)";
            var pipeiTime = 30;
            var num = 31;
            if(data.type == 2)
            {
                this.node_sel_box_2_name.string = "(60)";
                pipeiTime = 60;
                num = 61;
            }

            this.state = "pipei";
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
        else
        {
            this.node_sel2_willstart_la.active = false;
            if(this.isClickSuiji2)
            {
                this.node_sel2_suiji.getComponent("cc.Button").interactable = false;
                this.node_sel2_duizhan.getComponent("cc.Button").interactable = false;
                this.node_sel2_willstart_la.active = true;
            }
            this.node_sel2_gun.getComponent("cc.Button").interactable = false;
            this.node_sel2_title.string = "匹配中";
            this.node_sel2_willstart.string = "(60)";
            var pipeiTime = 300;
            var num = 301;

            this.state = "pipei";
            this.node.runAction(cc.repeat(cc.sequence(
                cc.delayTime(1),
                cc.callFunc(function(){
                    pipeiTime -= 1;
                    if(self.node_sel2_willstart_la.active)
                    {
                        if(pipeiTime>60)
                        {
                            pipeiTime = 60;
                            num = 61;
                        }
                    }
                    var p = pipeiTime;
                    if(p<0)
                        p = 0;
                    self.node_sel2_willstart.string = "("+Math.floor(p)+")";
                    if(Math.floor(pipeiTime) == 0)
                    {
                        self.node.stopAllActions();
                        websocket.questLeaveRoom(self.qianqista.openid);
                    }
                })
            ),num));
        }

    },

    findSelfPlayerData: function()
    {
        if(this.playerData.playerA && this.playerData.playerA.uid == this.qianqista.openid)
            return this.playerData.playerA;
        if(this.playerData.playerB && this.playerData.playerB.uid == this.qianqista.openid)
            return this.playerData.playerB;
        if(this.playerData.playerC && this.playerData.playerC.uid == this.qianqista.openid)
            return this.playerData.playerC;
        if(this.playerData.playerD && this.playerData.playerD.uid == this.qianqista.openid)
            return this.playerData.playerD;
    },

    findPlayerDataByUid: function(uid)
    {
        if(this.playerData.playerA && this.playerData.playerA.uid == uid)
            return this.playerData.playerA;
        if(this.playerData.playerB && this.playerData.playerB.uid == uid)
            return this.playerData.playerB;
        if(this.playerData.playerC && this.playerData.playerC.uid == uid)
            return this.playerData.playerC;
        if(this.playerData.playerD && this.playerData.playerD.uid == uid)
            return this.playerData.playerD;
    },

    findEnemyPlayerData: function()
    {
        if(this.playerData.playerA && this.playerData.playerA.uid != this.qianqista.openid)
            return this.playerData.playerA;
        if(this.playerData.playerB && this.playerData.playerB.uid != this.qianqista.openid)
            return this.playerData.playerB;
    },

    findPlayerNum: function()
    {
        var num = 0;
        if(this.playerData.playerA)
            num ++;
        if(this.playerData.playerB)
            num ++;
        if(this.playerData.playerC)
            num ++;
        if(this.playerData.playerD)
            num ++;
        return num;
    },

    isControlRobot: function()
    {
        if(this.playerData.playerA && this.playerData.playerA.onLine && this.playerData.playerA.uid == this.qianqista.openid)
            return true;
        else if(!this.playerData.playerA.onLine && this.playerData.playerB && this.playerData.playerB.onLine && this.playerData.playerB.uid == this.qianqista.openid)
            return true;
        else if(!this.playerData.playerA.onLine && this.playerData.playerC && this.playerData.playerC.onLine && this.playerData.playerC.uid == this.qianqista.openid)
            return true;
        return false;
    },

    initRobot: function()
    {
        var robotlv = 1;
        if(this.playerData.playerA)
            robotlv = this.res.judgeRobotLv(this.playerData.playerA.jscore);

        if(this.playerData.playerA && this.playerData.playerA.robot == 1)
        {
            this.playerData.playerA.robotlv = robotlv;
            this.playerData.playerA.nextFireType = 0;
            this.playerData.playerA.firepro = 0;
        }
        if(this.playerData.playerB && this.playerData.playerB.robot == 1)
        {
            this.playerData.playerB.robotlv = robotlv;
            this.playerData.playerB.nextFireType = 0;
            this.playerData.playerB.firepro = 0;
        }
        if(this.playerData.playerC && this.playerData.playerC.robot == 1)
        {
            this.playerData.playerC.robotlv = robotlv;
            this.playerData.playerC.nextFireType = 0;
            this.playerData.playerC.firepro = 0;
        }
        if(this.playerData.playerD && this.playerData.playerD.robot == 1)
        {
            this.playerData.playerD.robotlv = robotlv;
            this.playerData.playerD.nextFireType = 0;
            this.playerData.playerD.firepro = 0;
        }
    },


    joinRoom: function(data)
    {
        var self = this;
        this.playerData = data;

        if(this.playerData.playerA)
        {
            this.playerData.playerA.onLine = true;
        }
        if(this.playerData.playerB)
        {
            this.playerData.playerB.onLine = true;
        }
        if(this.playerData.playerC)
        {
            this.playerData.playerC.onLine = true;
        }
        if(this.playerData.playerD)
        {
            this.playerData.playerD.onLine = true;
        }

        if(data.roomType == 1)
        {
            var enemyPlayer = this.findEnemyPlayerData();

            //匹配完成开始倒计时
            if(this.findPlayerNum() == 2)
            {
                this.initRobot();

                this.loadPic(this.node_sel_box_2,enemyPlayer.avatarUrl+"?"+Math.random());
                this.node_sel_box_2_name.string = storage.getLabelStr(enemyPlayer.name,12);
                this.node_sel_box_2_wenhao.active = false;
                this.node_sel_title.string = "匹配成功";
                this.node_sel_willstart.string = "即将开始游戏...3";

                this.state = "willstart";
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

                //storage.setStorageCoin(storage.getStorageCoin()-30);
                //this.getCoin(-30);
            }
        }
        else if(data.roomType == 2)
        {
            if(this.findPlayerNum() == 1)
            {
                this.wxGropSharePk();
            }
            //匹配完成开始倒计时
            if(this.findPlayerNum() == 2)
            {
                var enemyPlayer = this.findEnemyPlayerData();
                this.loadPic(this.node_sel_box_2,enemyPlayer.avatarUrl+"?"+Math.random());
                this.node_sel_box_2_name.string = storage.getLabelStr(enemyPlayer.name,12);
                this.node_sel_box_2_wenhao.active = false;
                this.node_sel_title.string = "匹配成功";
                this.node_sel_willstart.string = "即将开始游戏...3";

                this.state = "willstart";
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
            }
        }
        else if(data.roomType == 3)
        {
            if(this.isClickSuiji2)
            {
                this.isClickSuiji2 = false;
                this.isSuiJiMatch = true;
                websocket.matchRoom();
            }
            else
            {
                if(this.findPlayerNum() == 1)
                {
                    if(this.isFromShare)
                    {
                        this.node_sel2_suiji.getComponent("cc.Button").interactable = true;
                        this.node_sel2_duizhan.getComponent("cc.Button").interactable = true;
                    }
                    else
                    {
                        this.wxGropSharePk();
                    }
                }
            }
            if(this.playerData.playerA && this.playerData.playerA.uid == this.qianqista.openid && !this.isSuiJiMatch)
            {
                var fnum = this.findPlayerNum();
                if(fnum == 3 || fnum == 4)
                {
                    this.node_sel2_suiji.getComponent("cc.Button").interactable = false;
                }
                else
                {
                    this.node_sel2_suiji.getComponent("cc.Button").interactable = true;
                }

                if(fnum == 4)
                    this.node_sel2_duizhan.getComponent("cc.Button").interactable = false;
                else
                    this.node_sel2_duizhan.getComponent("cc.Button").interactable = true;
            }

            if(this.playerData.playerA)
            {
                this.loadPic(this.node_sel2_box_1,this.playerData.playerA.avatarUrl+"?"+Math.random());
                this.node_sel2_box_1_name.string = storage.getLabelStr(this.playerData.playerA.name,12);
            }
            if(this.playerData.playerB)
            {
                this.loadPic(this.node_sel2_box_2,this.playerData.playerB.avatarUrl+"?"+Math.random());
                this.node_sel2_box_2_name.string = storage.getLabelStr(this.playerData.playerB.name,12);
                this.node_sel2_box_2_wenhao.active = false;
            }
            else
            {
                this.node_sel2_box_2_name.string = "等待加入";
                this.node_sel2_box_2.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;
                this.node_sel2_box_2_wenhao.active = true;
            }
            if(this.playerData.playerC)
            {
                this.loadPic(this.node_sel2_box_3,this.playerData.playerC.avatarUrl+"?"+Math.random());
                this.node_sel2_box_3_name.string = storage.getLabelStr(this.playerData.playerC.name,12);
                this.node_sel2_box_3_wenhao.active = false;
            }
            else
            {
                this.node_sel2_box_3_name.string = "等待加入";
                this.node_sel2_box_3.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;
                this.node_sel2_box_3_wenhao.active = true;
            }
            if(this.playerData.playerD)
            {
                this.loadPic(this.node_sel2_box_4,this.playerData.playerD.avatarUrl+"?"+Math.random());
                this.node_sel2_box_4_name.string = storage.getLabelStr(this.playerData.playerD.name,12);
                this.node_sel2_box_4_wenhao.active = false;
            }
            else
            {
                this.node_sel2_box_4_name.string = "等待加入";
                this.node_sel2_box_4.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;
                this.node_sel2_box_4_wenhao.active = true;
            }
            //匹配完成开始倒计时
            if(this.findPlayerNum() == 4)
            {
                this.initRobot();

                this.node_sel2_willstart_la.active = true;
                this.node_sel2_title.string = "匹配成功";
                this.node_sel2_willstart.string = "即将开始游戏...3";

                this.state = "willstart";
                var willStartTime = 3;
                this.node.stopAllActions();
                this.node.runAction(cc.repeat(cc.sequence(
                    cc.delayTime(1),
                    cc.callFunc(function(){
                        willStartTime -= 1;
                        self.node_sel2_willstart.string = "即将开始游戏..."+Math.floor(willStartTime);
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


                var selfData = this.findSelfPlayerData();
                var num = 0;
                if(this.playerData.playerA.matchRoomId > 0 && this.playerData.playerA.matchRoomId == selfData.roomId)
                    num ++;
                if(this.playerData.playerB.matchRoomId > 0 && this.playerData.playerB.matchRoomId == selfData.roomId)
                    num ++;
                if(this.playerData.playerC.matchRoomId > 0 && this.playerData.playerC.matchRoomId == selfData.roomId)
                    num ++;
                if(this.playerData.playerD.matchRoomId > 0 && this.playerData.playerD.matchRoomId == selfData.roomId)
                    num ++;

                if(num != 3)
                {
                    storage.setStorageCoin(storage.getStorageCoin()-30);
                    this.getCoin(-30);
                }

            }
        }
    },

    pipeiFail: function()
    {
        if(this.node_over.active)
        {
            this.node_over.active = false;
            this.node_sel.active = true;
        }
        else
        {
            this.res.showToast("离开房间");
        }

        this.node_sel_suiji.getComponent("cc.Button").interactable = true;
        this.node_sel_duizhan.getComponent("cc.Button").interactable = true;
        this.node_sel_gun.getComponent("cc.Button").interactable = true;
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
        this.state = "stop";
        websocket.questLeaveRoom(this.qianqista.openid);
        this.node.stopAllActions();

        this.node_over.active = false;
        this.node_sel.active = true;

        this.node_sel_suiji.getComponent("cc.Button").interactable = true;
        this.node_sel_duizhan.getComponent("cc.Button").interactable = true;
        this.node_sel_gun.getComponent("cc.Button").interactable = true;
        //this.node_sel_home.getComponent("cc.Button").interactable = true;
        //this.node_sel_home.color = cc.color(255,255,255);
        this.node_sel_title.string = "等待开战";
        this.node_sel_box_2_name.string = "等待加入";
        this.node_sel_willstart.string = "";
        this.node_sel_box_2.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;

        var rank = 1000;
        var pk = this.main.worldrank.pk;
        if(pk.length > 0)
            rank = pk[pk.length-1].id;
        if(rank == 0)
            rank = 1000;
        this.node_sel_lv.spriteFrame = this.res.getPkLvSp(storage.getStorageMaxJScore(),rank);
        this.node_sel_lv_num.string = storage.getStorageMaxJScore();

        this.main.wxBannerShow();

    },

    sel2_fanhui: function()
    {
        this.state = "stop";
        websocket.questLeaveRoom(this.qianqista.openid);
        this.node.stopAllActions();

        this.node_sel2.active = false;
        this.node_sel_mode.active = true;

        this.node_sel2_suiji.getComponent("cc.Button").interactable = true;
        this.node_sel2_duizhan.getComponent("cc.Button").interactable = true;
        this.node_sel2_gun.getComponent("cc.Button").interactable = true;
        this.node_sel2_title.string = "等待开战";
        this.node_sel2_willstart.string = "";

        this.loadPic(this.node_sel2_box_1,this.qianqista.avatarUrl+"?"+Math.random());
        this.node_sel2_box_1_name.string = storage.getLabelStr(this.qianqista.userName,12);
        this.node_sel2_box_2_name.string = "等待加入";
        this.node_sel2_box_2.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;
        this.node_sel2_box_3_name.string = "等待加入";
        this.node_sel2_box_3.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;
        this.node_sel2_box_4_name.string = "等待加入";
        this.node_sel2_box_4.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;

        this.node_sel2_box_2_wenhao.active = true;
        this.node_sel2_box_3_wenhao.active = true;
        this.node_sel2_box_4_wenhao.active = true;

        this.main.wxBannerShow();
    },

    over2_fanhui: function()
    {
        this.state = "stop";
        websocket.questLeaveRoom(this.qianqista.openid);
        this.node.stopAllActions();

        this.node_over2.active = false;
        this.node_sel2.active = true;

        this.node_sel2_suiji.getComponent("cc.Button").interactable = true;
        this.node_sel2_duizhan.getComponent("cc.Button").interactable = true;
        this.node_sel2_gun.getComponent("cc.Button").interactable = true;
        this.node_sel2_title.string = "等待开战";
        this.node_sel2_willstart.string = "";

        this.loadPic(this.node_sel2_box_1,this.qianqista.avatarUrl+"?"+Math.random());
        this.node_sel2_box_1_name.string = storage.getLabelStr(this.qianqista.userName,12);
        this.node_sel2_box_2_name.string = "等待加入";
        this.node_sel2_box_2.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;
        this.node_sel2_box_3_name.string = "等待加入";
        this.node_sel2_box_3.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;
        this.node_sel2_box_4_name.string = "等待加入";
        this.node_sel2_box_4.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;

        this.node_sel2_box_2_wenhao.active = true;
        this.node_sel2_box_3_wenhao.active = true;
        this.node_sel2_box_4_wenhao.active = true;

        var rank = 1000;
        var pk = this.main.worldrank.pk;
        if(pk.length > 0)
            rank = pk[pk.length-1].id;
        if(rank == 0)
            rank = 1000;
        this.node_sel2_lv.spriteFrame = this.res.getPkLvSp(storage.getStorageMaxJScore(),rank);
        this.node_sel2_lv_num.string = storage.getStorageMaxJScore();

        this.main.wxBannerShow();
    },

    again: function()
    {

        this.node_over_fanhui.getComponent("cc.Button").interactable = false;
        this.node_over_again.getComponent("cc.Button").interactable = false;
        this.node_over_jifenx2.getComponent("cc.Button").interactable = false;

        if(this.state == "willagain")
        {
            websocket.again(1);
        }
        else
        {
            var enemyPlayer = this.findEnemyPlayerData();
            if(enemyPlayer && enemyPlayer.robot == 1)
            {
                if(enemyPlayer.againNum && enemyPlayer.againNum == 1)
                    websocket.again(0);
                else
                    this.res.showToast("对方已离开");
            }
            else
            {
                websocket.again(0);
            }
        }
    },

    toAgain: function(data)
    {
        var self = this;
        if(data.againType == 1)
        {
            this.res.showToast("房间解散");
        }
        else if(data.againType == 2)
        {
            this.res.showToast("对方已离开");
        }
        else if(data.againType == 3)
        {
            if(this.state == "willagain")
                return;

            if(this.node_over.active)
                this.node_over_jifenx2.getComponent("cc.Button").interactable = false;
            else
                this.node_over2_jifenx2.getComponent("cc.Button").interactable = false;

            this.playerData.playerA.hp = 50;
            this.playerData.playerB.hp = 50;

            if(this.playerData.playerA.maxJscore > 180)
                this.playerData.playerA.hp = 75;
            if(this.playerData.playerB.maxJscore > 180)
                this.playerData.playerB.hp = 75;
            if(this.GAME.isWin)
            {
                this.node_over_again_str.string = "再来一局(8)";

                var str = "再来一局";
                this.state = "willagain";
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
                                if(self.playerData.roomType == 1)
                                {
                                    storage.setStorageCoin(storage.getStorageCoin()-30);
                                    self.getCoin(-30);
                                }
                            }

                        }
                    })
                ),8));
            }
            else
            {
                this.node_over_again_str.string = "不服再来(8)";

                var str = "不服再来";
                this.state = "willagain";
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

                                if(self.playerData.roomType == 1)
                                {
                                    storage.setStorageCoin(storage.getStorageCoin()-30);
                                    self.getCoin(-30);
                                }
                            }

                        }
                    })
                ),8));
            }

            this.node_over_fanhui_str.string = "赶紧溜";


        }

        else if(data.againType == 4)//立即开始
        {
            this.playerData.playerA.hp = 50;
            this.playerData.playerB.hp = 50;

            if(this.playerData.playerA.maxJscore > 180)
                this.playerData.playerA.hp = 75;
            if(this.playerData.playerB.maxJscore > 180)
                this.playerData.playerB.hp = 75;

            this.node.stopAllActions();
            this.state = "stop";
            websocket.startGame();

            if(this.playerData.roomType == 1)
            {
                storage.setStorageCoin(storage.getStorageCoin()-30);
                this.getCoin(-30);
            }
        }
    },

    questLeave: function(data)
    {
        if(data.uid == this.qianqista.openid)
        {
            if(this.state == "start" || this.state == "willstart")
            {
                this.state = "stop";
                this.res.showToast("对方掉线！");
                if(this.playerData && this.playerData.roomType != 3)
                {
                    var enemyPlayer = this.findEnemyPlayerData();
                    enemyPlayer.hp = 0;
                }

                this.gameOver();
            }
            else
            {
                if(this.playerData && this.playerData.roomType == 3 && this.state == "pipei")
                {
                    this.state = "stop";
                    this.sel2_fanhui();
                }
                else
                {
                    this.pipeiFail();
                }
            }
        }
        else
        {
            if(this.playerData && this.playerData.roomType == 3 && this.state == "pipei")
            {
                var leaveData = this.findPlayerDataByUid(data.uid);
                if(leaveData && leaveData.onLine)
                {
                    leaveData.onLine = false;
                    this.res.showToast(leaveData.name + " 离开！");

                    if(this.playerData.playerA && this.playerData.playerA.uid == data.uid)
                    {
                        this.node_sel2_box_1_name.string = "等待加入";
                        this.node_sel2_box_1.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;
                    }
                    else if(this.playerData.playerB && this.playerData.playerB.uid == data.uid)
                    {
                        this.node_sel2_box_2_name.string = "等待加入";
                        this.node_sel2_box_2.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;
                        this.node_sel2_box_2_wenhao.active = true;
                    }
                    else if(this.playerData.playerC && this.playerData.playerC.uid == data.uid)
                    {
                        this.node_sel2_box_3_name.string = "等待加入";
                        this.node_sel2_box_3.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;
                        this.node_sel2_box_3_wenhao.active = true;
                    }
                    else if(this.playerData.playerD && this.playerData.playerD.uid == data.uid)
                    {
                        this.node_sel2_box_4_name.string = "等待加入";
                        this.node_sel2_box_4.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;
                        this.node_sel2_box_4_wenhao.active = true;
                    }
                }

            }

            if(this.playerData && this.playerData.roomType != 3)
            {
                websocket.questLeaveRoom(this.qianqista.openid);
                this.node.stopAllActions();
                this.res.showToast("对方离开！");
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
            if(this.playerData && this.playerData.roomType == 3)
            {
                if(this.state == "start" || this.state == "willstart")
                {
                    var leaveData = this.findPlayerDataByUid(data.uid);
                    leaveData.onLine = false;
                    this.res.showToast(leaveData.name + " 掉线！");
                    websocket.bulletCollision(leaveData.uid,leaveData.hp,0,0,0);
                }
                else if(this.state == "pipei")
                {
                    var leaveData = this.findPlayerDataByUid(data.uid);
                    if(leaveData && leaveData.onLine)
                    {
                        leaveData.onLine = false;

                        this.res.showToast(leaveData.name + " 离开！");

                        if(this.playerData.playerA && this.playerData.playerA.uid == data.uid)
                        {
                            this.node_sel2_box_1_name.string = "等待加入";
                            this.node_sel2_box_1.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;
                        }
                        else if(this.playerData.playerB && this.playerData.playerB.uid == data.uid)
                        {
                            this.node_sel2_box_2_name.string = "等待加入";
                            this.node_sel2_box_2.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;
                            this.node_sel2_box_2_wenhao.active = true;
                        }
                        else if(this.playerData.playerC && this.playerData.playerC.uid == data.uid)
                        {
                            this.node_sel2_box_3_name.string = "等待加入";
                            this.node_sel2_box_3.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;
                            this.node_sel2_box_3_wenhao.active = true;
                        }
                        else if(this.playerData.playerD && this.playerData.playerD.uid == data.uid)
                        {
                            this.node_sel2_box_4_name.string = "等待加入";
                            this.node_sel2_box_4.getComponent("cc.Sprite").spriteFrame = this.gray_sprite;
                            this.node_sel2_box_4_wenhao.active = true;
                        }
                    }


                }
            }
            else
            {
                websocket.questLeaveRoom(this.qianqista.openid);
                this.node.stopAllActions();
            }
        }
    },

    startGame: function()
    {
        this.main.wxBannerHide();

        this.state = "start";
        this.isBgScroll = false;
        this.node_sel.active = false;
        this.node_sel2.active = false;
        this.node_over.active = false;
        this.node_over2.active = false;

        this.node_game_ui.active = true;
        this.taizi_a.active = true;
        this.taizi_b.active = true;
        if(this.playerData.roomType == 3)
        {
            this.taizi_c.active = true;
            this.taizi_d.active = true;

            this.box_c.active = true;
            this.box_d.active = true;
        }
        else
        {
            this.box_c.active = false;
            this.box_d.active = false;
        }
        this.fire_pro.progress = 1;
        this.fire.stopAllActions();

        if(this.playerData.playerA)
        {
            this.loadPic(this.a_icon,this.playerData.playerA.avatarUrl+"?"+Math.random());
            this.a_name.string = storage.getLabelStr(this.playerData.playerA.name,12);
            this.a_pro.progress = 1;
            this.a_pro_bar.color = cc.color(0,160,233);
            this.initPlayer(this.playerData.playerA);
        }
        if(this.playerData.playerB)
        {
            this.loadPic(this.b_icon,this.playerData.playerB.avatarUrl+"?"+Math.random());
            this.b_name.string = storage.getLabelStr(this.playerData.playerB.name,12);
            this.b_pro.progress = 1;
            this.b_pro_bar.color = cc.color(0,160,233);
            this.initPlayer(this.playerData.playerB);
        }
        if(this.playerData.playerC)
        {
            this.loadPic(this.c_icon,this.playerData.playerC.avatarUrl+"?"+Math.random());
            this.c_name.string = storage.getLabelStr(this.playerData.playerC.name,12);
            this.c_pro.progress = 1;
            this.c_pro_bar.color = cc.color(0,160,233);
            this.initPlayer(this.playerData.playerC);
        }
        if(this.playerData.playerD)
        {
            this.loadPic(this.d_icon,this.playerData.playerD.avatarUrl+"?"+Math.random());
            this.d_name.string = storage.getLabelStr(this.playerData.playerD.name,12);
            this.d_pro.progress = 1;
            this.d_pro_bar.color = cc.color(0,160,233);
            this.initPlayer(this.playerData.playerD);
        }


        var dh = this.dsize.height/2;
        var h = 50;

        //this.taizi_a.y = dh + h*3;
        //this.taizi_b.y = dh + h*2;
        //this.taizi_c.y = dh + h*2;
        //this.taizi_d.y = dh + h*3;
        this.taizi_a.y = dh + h*3;
        this.taizi_b.y = dh - h*3;
        this.taizi_c.y = dh - h*3;
        this.taizi_d.y = dh + h*3;

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

    initPlayer: function(playerData)
    {
        var playerbg = null;
        if(playerData.pos == 1)
            playerbg = this.taizi_a_player;
        else if(playerData.pos == 2)
            playerbg = this.taizi_b_player;
        else if(playerData.pos == 3)
            playerbg = this.taizi_c_player;
        else if(playerData.pos == 4)
            playerbg = this.taizi_d_player;

        playerbg.destroyAllChildren();

        playerData.player = cc.instantiate(this.res.players[playerData.skinId]);
        playerData.player.pos = playerData.pos;
        playerbg.addChild(playerData.player);

        var playerConf = this.res.playersconfig[playerData.skinId];
        var gunConf = this.res.gunsconfig[playerData.gunId];

        playerData.player.gun = cc.instantiate(this.res.guns[playerData.gunId]);
        playerData.player.gun.y = playerData.player.height*0.3 + gunConf.y;
        playerData.player.addChild(playerData.player.gun,1);
        if(playerData.pos == 2 || playerData.pos == 4)
            playerData.player.scaleX = -1;

        playerData.player.aim = cc.instantiate(this.res.aim_1);
        playerData.player.aim.y = playerData.player.gun.y;
        playerData.player.aim.active = false;
        playerData.player.aim.line = cc.find("line",playerData.player.aim);
        playerData.player.aim.scale = (gunConf.aimLen+playerConf.aimLen)/2;
        playerData.player.addChild(playerData.player.aim,0);

        playerData.player.aim.line.rotation = 0;
        playerData.player.aim.getComponent("cc.ProgressBar").progress = 0;

        playerData.player.gun_fire = cc.instantiate(this.res.gun_fire);
        playerData.player.gun_fire.y = gunConf.y;
        playerData.player.gun_fire.x = playerData.player.gun.width*(1-playerData.player.gun.anchorX);
        playerData.player.gun_fire.active = false;
        playerData.player.gun.addChild(playerData.player.gun_fire,0);

        if(playerData.uid != this.qianqista.openid)
        {
            playerData.player.aim.opacity = 0;
        }
    },


    bgscroll: function()
    {
        if(this.state != "start")
            return;
        this.isBgScroll = true;
        //this.bg_1_1.runAction(cc.repeatForever(cc.moveBy(8,0,-1920)));
        //this.bg_1_2.runAction(cc.repeatForever(cc.moveBy(16,0,-1920*2)));
        //this.bg_1_3.runAction(cc.repeatForever(cc.moveBy(8,0,-1920)));
        //this.bg_1_4.runAction(cc.repeatForever(cc.moveBy(16,0,-1920*2)));
        //
        //this.bg_2_1.runAction(cc.repeatForever(cc.moveBy(5,0,-1920)));
        //this.bg_2_2.runAction(cc.repeatForever(cc.moveBy(10,0,-1920*2)));
        //this.bg_2_3.runAction(cc.repeatForever(cc.moveBy(5,0,-1920)));
        //this.bg_2_4.runAction(cc.repeatForever(cc.moveBy(10,0,-1920*2)));

        var dh = this.dsize.height/2;
        var h = 50;

        this.taizi_a.y = dh + h*3;
        this.taizi_b.y = dh - h*3;
        this.taizi_c.y = dh - h*3;
        this.taizi_d.y = dh + h*3;

        this.playerToMove();
        this.playerToRotate();
    },

    playerToMove: function()
    {
        var selfPlayer = this.findSelfPlayerData();
        if(selfPlayer.pos == 1)
            websocket.move(this.taizi_a.y,selfPlayer.uid);
        else if(selfPlayer.pos == 2)
            websocket.move(this.taizi_b.y,selfPlayer.uid);
        else if(selfPlayer.pos == 3)
            websocket.move(this.taizi_c.y,selfPlayer.uid);
        else if(selfPlayer.pos == 4)
            websocket.move(this.taizi_d.y,selfPlayer.uid);

        if(this.isControlRobot())
        {
            if(this.playerData.playerA && this.playerData.playerA.robot == 1)
            {
                websocket.move(this.taizi_a.y,this.playerData.playerA.uid);
            }
            if(this.playerData.playerB && this.playerData.playerB.robot == 1)
            {
                websocket.move(this.taizi_b.y,this.playerData.playerB.uid);
            }
            if(this.playerData.playerC && this.playerData.playerC.robot == 1)
            {
                websocket.move(this.taizi_c.y,this.playerData.playerC.uid);
            }
            if(this.playerData.playerD && this.playerData.playerD.robot == 1)
            {
                websocket.move(this.taizi_d.y,this.playerData.playerD.uid);
            }
        }
    },

    playerToRotate: function(uid)
    {
        if(uid)
        {
            var control = this.isControlRobot();

            if(this.playerData.playerA && this.playerData.playerA.uid == uid)
            {
                if(this.playerData.playerA.robot == 1)
                {
                    if(control)
                    websocket.rotate(this.playerData.playerA.player.gun.rotation,this.playerData.playerA.uid);
                }
                else{
                    websocket.rotate(this.playerData.playerA.player.gun.rotation,this.playerData.playerA.uid);
                }
            }
            else if(this.playerData.playerB && this.playerData.playerB.uid == uid)
            {
                if(this.playerData.playerB.robot == 1)
                {
                    if(control)
                        websocket.rotate(this.playerData.playerB.player.gun.rotation,this.playerData.playerB.uid);
                }
                else{
                    websocket.rotate(this.playerData.playerB.player.gun.rotation,this.playerData.playerB.uid);
                }
            }
            else if(this.playerData.playerC && this.playerData.playerC.uid == uid)
            {
                if(this.playerData.playerC.robot == 1)
                {
                    if(control)
                        websocket.rotate(this.playerData.playerC.player.gun.rotation,this.playerData.playerC.uid);
                }
                else{
                    websocket.rotate(this.playerData.playerC.player.gun.rotation,this.playerData.playerC.uid);
                }
            }
            else if(this.playerData.playerD && this.playerData.playerD.uid == uid)
            {
                if(this.playerData.playerD.robot == 1)
                {
                    if(control)
                        websocket.rotate(this.playerData.playerD.player.gun.rotation,this.playerData.playerD.uid);
                }
                else{
                    websocket.rotate(this.playerData.playerD.player.gun.rotation,this.playerData.playerD.uid);
                }
            }

        }
        else
        {
            var selfPlayer = this.findSelfPlayerData();
            websocket.rotate(selfPlayer.player.gun.rotation,selfPlayer.uid);
            if(this.isControlRobot())
            {
                if(this.playerData.playerA && this.playerData.playerA.robot == 1)
                {
                    websocket.rotate(this.playerData.playerA.player.gun.rotation,this.playerData.playerA.uid);
                }
                if(this.playerData.playerB && this.playerData.playerB.robot == 1)
                {
                    websocket.rotate(this.playerData.playerB.player.gun.rotation,this.playerData.playerB.uid);
                }
                if(this.playerData.playerC && this.playerData.playerC.robot == 1)
                {
                    websocket.rotate(this.playerData.playerC.player.gun.rotation,this.playerData.playerC.uid);
                }
                if(this.playerData.playerD && this.playerData.playerD.robot == 1)
                {
                    websocket.rotate(this.playerData.playerD.player.gun.rotation,this.playerData.playerD.uid);
                }
            }


        }
    },

    playerMove: function(data)
    {
        var self = this;
        var h = 300;

        var move_time = 3;

        var selfData = this.findSelfPlayerData();

        if(this.playerData.playerA && data.uid == this.playerData.playerA.uid)
        {
            this.taizi_a.stopAllActions();
            this.taizi_a.y = data.y;
            this.taizi_a.runAction(cc.sequence(
                cc.moveBy(move_time,0,-h),
                cc.moveBy(move_time,0,h),
                cc.callFunc(function(){
                    var control = self.isControlRobot();
                    var issend = (data.uid == selfData.uid) || (self.playerData.playerA.robot == 1 && control);
                    if(issend)
                        websocket.move(self.taizi_a.y,self.playerData.playerA.uid);
                })
            ));
        }
        else if(this.playerData.playerB && data.uid == this.playerData.playerB.uid)
        {
            this.taizi_b.stopAllActions();
            this.taizi_b.y = data.y;
            this.taizi_b.runAction(cc.sequence(
                cc.moveBy(move_time,0,h),
                cc.moveBy(move_time,0,-h),
                cc.callFunc(function(){
                    var control = self.isControlRobot();
                    var issend = (data.uid == selfData.uid) || (self.playerData.playerB.robot == 1 && control);
                    if(issend)
                        websocket.move(self.taizi_b.y,self.playerData.playerB.uid);
                })
            ));
        }
        else if(this.playerData.playerC && data.uid == this.playerData.playerC.uid)
        {
            this.taizi_c.stopAllActions();
            this.taizi_c.y = data.y;
            this.taizi_c.runAction(cc.sequence(
                cc.moveBy(move_time,0,h),
                cc.moveBy(move_time,0,-h),
                cc.callFunc(function(){
                    var control = self.isControlRobot();
                    var issend = (data.uid == selfData.uid) || (self.playerData.playerC.robot == 1 && control);
                    if(issend)
                        websocket.move(self.taizi_c.y,self.playerData.playerC.uid);
                })
            ));
        }
        else if(this.playerData.playerD && data.uid == this.playerData.playerD.uid)
        {
            this.taizi_d.stopAllActions();
            this.taizi_d.y = data.y;
            this.taizi_d.runAction(cc.sequence(
                cc.moveBy(move_time,0,-h),
                cc.moveBy(move_time,0,h),
                cc.callFunc(function(){
                    var control = self.isControlRobot();
                    var issend = (data.uid == selfData.uid) || (self.playerData.playerD.robot == 1 && control);
                    if(issend)
                        websocket.move(self.taizi_d.y,self.playerData.playerD.uid);
                })
            ));
        }

    },

    playerRotate: function(data)
    {
        var self = this;

        var selfData = this.findSelfPlayerData();
        var control = this.isControlRobot();
        var issend = false;
        var playerData = null;
        if(this.playerData.playerA && data.uid == this.playerData.playerA.uid)
        {
            issend = (data.uid == selfData.uid) || (this.playerData.playerA.robot == 1 && control);
            playerData = this.playerData.playerA;
        }
        else if(this.playerData.playerB && data.uid == this.playerData.playerB.uid)
        {
            issend = (data.uid == selfData.uid) || (this.playerData.playerB.robot == 1 && control);
            playerData = this.playerData.playerB;
        }
        else if(this.playerData.playerC && data.uid == this.playerData.playerC.uid)
        {
            issend = (data.uid == selfData.uid) || (this.playerData.playerC.robot == 1 && control);
            playerData = this.playerData.playerC;
        }
        else if(this.playerData.playerD && data.uid == this.playerData.playerD.uid)
        {
            issend = (data.uid == selfData.uid) || (this.playerData.playerD.robot == 1 && control);
            playerData = this.playerData.playerD;
        }


        if(playerData)
        {
            playerData.player.aim.active = true;
            playerData.player.gun_fire.active = false;
            playerData.player.gun.stopAllActions();
            playerData.player.gun.rotation = data.rotate;
            var playerConf = this.res.playersconfig[playerData.skinId];
            var ac = null;
            if(playerData.player.gun.rotationDir == 1)
            {
                var per = Math.abs((playerData.player.gun.rotation+60)/-60);
                ac = cc.sequence(
                    cc.callFunc(function(){
                        playerData.player.gun.rotationDir = 1;
                    }),
                    cc.rotateTo(1.1*playerConf.aimSpeed*per,-60).easing(cc.easeIn(1.5)),
                    cc.callFunc(function(){
                        playerData.player.gun.rotationDir = 2;
                    }),
                    cc.rotateTo(1.1*playerConf.aimSpeed,0).easing(cc.easeOut(1.5)),
                    cc.callFunc(function(){
                        if(issend)
                        websocket.rotate(playerData.player.gun.rotation,playerData.uid);
                        playerData.player.gun.rotationDir = 1;
                    })
                );
            }
            else
            {
                var per = playerData.player.gun.rotation/-60;
                ac = cc.sequence(
                    cc.rotateTo(1.1*playerConf.aimSpeed*per,0).easing(cc.easeOut(1.5)),
                    cc.callFunc(function(){
                        if(issend)
                        websocket.rotate(playerData.player.gun.rotation,playerData.uid);
                        playerData.player.gun.rotationDir = 1;
                    })
                );
            }
            ac.setTag(1);
            playerData.player.gun.runAction(ac);
        }
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
        this.taizi_c.stopAllActions();
        this.taizi_d.stopAllActions();

        var dh = this.dsize.height/2;
        var h = 50;

        this.taizi_a.y = dh + h*3;
        this.taizi_b.y = dh - h*3;
        this.taizi_c.y = dh - h*3;
        this.taizi_d.y = dh + h*3;
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


    updateAim: function()
    {
        if(this.playerData.playerA && this.playerData.playerA.player.aim.active)
        {
            var ang = -this.playerData.playerA.player.gun.rotation;
            var zpro = 60/360;
            var pro = ang/60*zpro;
            this.playerData.playerA.player.aim.line.rotation = -ang;
            this.playerData.playerA.player.aim.getComponent("cc.ProgressBar").progress = pro;
        }

        if(this.playerData.playerB && this.playerData.playerB.player.aim.active)
        {
            var ang = -this.playerData.playerB.player.gun.rotation;
            var zpro = 60/360;
            var pro = ang/60*zpro;
            this.playerData.playerB.player.aim.line.rotation = -ang;
            this.playerData.playerB.player.aim.getComponent("cc.ProgressBar").progress = pro;
        }

        if(this.playerData.playerC && this.playerData.playerC.player.aim.active)
        {
            var ang = -this.playerData.playerC.player.gun.rotation;
            var zpro = 60/360;
            var pro = ang/60*zpro;
            this.playerData.playerC.player.aim.line.rotation = -ang;
            this.playerData.playerC.player.aim.getComponent("cc.ProgressBar").progress = pro;
        }

        if(this.playerData.playerD && this.playerData.playerD.player.aim.active)
        {
            var ang = -this.playerData.playerD.player.gun.rotation;
            var zpro = 60/360;
            var pro = ang/60*zpro;
            this.playerData.playerD.player.aim.line.rotation = -ang;
            this.playerData.playerD.player.aim.getComponent("cc.ProgressBar").progress = pro;
        }
    },

    updateRobot: function(dt)
    {
        if(this.isControlRobot())
        {
            var arr = [];
            if(this.playerData.playerA && this.playerData.playerA.robot == 1 && this.playerData.playerA.hp > 0)
                arr.push(this.playerData.playerA);
            if(this.playerData.playerB && this.playerData.playerB.robot == 1 && this.playerData.playerB.hp > 0)
                arr.push(this.playerData.playerB);
            if(this.playerData.playerC && this.playerData.playerC.robot == 1 && this.playerData.playerC.hp > 0)
                arr.push(this.playerData.playerC);
            if(this.playerData.playerD && this.playerData.playerD.robot == 1 && this.playerData.playerD.hp > 0)
                arr.push(this.playerData.playerD);

            for(var i=0;i<arr.length;i++)
            {
                var playerData = arr[i];

                if(playerData.nextFireType == 0)
                {
                    var bobotconf = this.res.robotconfig[playerData.robotlv-1];
                    var r = Math.random();
                    if(r<=bobotconf.baotou)
                        playerData.nextFireType = 1;
                    else if(r >bobotconf.baotou && r<=(bobotconf.hit+bobotconf.baotou))
                        playerData.nextFireType = 2;
                    else if(r > (bobotconf.hit+bobotconf.baotou) && r<=(bobotconf.hit+bobotconf.baotou+bobotconf.willhit))
                        playerData.nextFireType = 3;
                    else
                        playerData.nextFireType = 4;

                    var gunConf = this.res.gunsconfig[playerData.gunId];
                    playerData.firepro = gunConf.num*gunConf.fire*0.5-0.5;

                }

                playerData.firepro -= dt;
                if(playerData.firepro <= 0 && playerData.nextFireType > 0)
                {

                    var pos = cc.v2(playerData.player.parent.parent.x,playerData.player.parent.parent.y+playerData.player.gun.y);
                    var enemy = null;
                    if(playerData.pos == 1 || playerData.pos == 3)
                    {
                        var dis = 1000;
                        if(this.playerData.playerB && this.playerData.playerB.hp > 0)
                        {
                            dis = Math.abs(playerData.player.y - this.playerData.playerB.player.y);
                            enemy = this.playerData.playerB;
                        }
                        if(this.playerData.playerD && this.playerData.playerD.hp > 0)
                        {
                            var dis2 = Math.abs(playerData.player.y - this.playerData.playerD.player.y);
                            if(dis2 < dis)
                            {
                                enemy = this.playerData.playerD;
                            }
                        }
                    }
                    else if(playerData.pos == 2 || playerData.pos == 4)
                    {
                        var dis = 1000;
                        if(this.playerData.playerA && this.playerData.playerA.hp > 0)
                        {
                            dis = Math.abs(playerData.player.y - this.playerData.playerA.player.y);
                            enemy = this.playerData.playerA;
                        }
                        if(this.playerData.playerC && this.playerData.playerC.hp > 0)
                        {
                            var dis2 = Math.abs(playerData.player.y - this.playerData.playerC.player.y);
                            if(dis2 < dis)
                            {
                                enemy = this.playerData.playerC;
                            }
                        }
                    }

                    if(enemy == null || !enemy.player)
                        continue;
                    var pos2 = cc.v2(enemy.player.parent.parent.x,enemy.player.parent.parent.y+enemy.player.height*0.8);
                    var dir = cc.pNormalize(cc.v2(pos2.x-pos.x,pos2.y-pos.y));
                    var ang = cc.pToAngle(dir);
                    ang = cc.radiansToDegrees(ang);
                    if(ang>60)
                        ang = 180 - ang;
                    //爆头
                    if(playerData.nextFireType == 1)
                    {

                        if(ang > 0 && ang + playerData.player.gun.rotation < -4 && ang + playerData.player.gun.rotation > -5)
                        {
                            playerData.nextFireType = 0;
                            websocket.attack(playerData.uid);
                        }
                    }
                    else if(playerData.nextFireType == 2)
                    {

                        if(ang > 0 && ang + playerData.player.gun.rotation < -4 && ang + playerData.player.gun.rotation > -5)
                        {
                            playerData.nextFireType = 0;
                            websocket.attack(playerData.uid);
                        }
                    }
                    else if(playerData.nextFireType == 3)
                    {

                        if(ang > 0 && (ang + playerData.player.gun.rotation < 15 || ang + playerData.player.gun.rotation > -15))
                        {
                            playerData.nextFireType = 0;
                            websocket.attack(playerData.uid);
                        }
                    }
                    else
                    {
                        if(ang + playerData.player.gun.rotation < 15 || ang + playerData.player.gun.rotation > -15)
                        {
                            playerData.nextFireType = 0;
                            websocket.attack(playerData.uid);
                        }
                    }
                }
            }
        }
    },

    toFire: function()
    {
        if(this.fire_pro.progress >= 1 && this.state == "start" && this.isBgScroll)
        {
            var selfData = this.findSelfPlayerData();
            if(selfData.hp <= 0)
                return;
            this.fire_pro.progress = 0;
            var gunConf = this.res.gunsconfig[selfData.gunId];
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

            websocket.attack(selfData.uid);
        }
    },

    attack: function(data)
    {
        var rands = [];
        rands.push(data.r1);
        rands.push(data.r2);
        rands.push(data.r3);
        rands.push(data.r4);
        this.playerFire(this.findPlayerDataByUid(data.uid),rands);
    },

    playerFire: function(playerData,rands)
    {
        var player = playerData.player;
        var gunId = playerData.gunId;
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
                        player.gun_fire.active = false;
                        self.playerFireEnd(playerData.uid);
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
                bullet.pos = playerData.pos;
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
                        player.gun_fire.active = false;
                        self.playerFireEnd(playerData.uid);
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
                    bullet.pos = playerData.pos;

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
                        player.gun_fire.active = false;
                        self.playerFireEnd(playerData.uid);
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
                    bullet.pos = playerData.pos;

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

    playerFireEnd: function(uid)
    {
        this.playerToRotate(uid);
    },

    enemyHurt: function(isHead,diedir,playerData,hurtPlayer)
    {
        if(playerData.uid == this.qianqista.openid || (playerData.robot == 1 && this.isControlRobot()))
        {
            var playerConf = this.res.playersconfig[playerData.skinId];
            var gunConf = this.res.gunsconfig[playerData.gunId];
            var hhp = (gunConf.fire+playerConf.fire);
            if(isHead)
                hhp *= 2;
            websocket.bulletCollision(hurtPlayer.uid,hhp,isHead,diedir.x,diedir.y);
        }
    },

    killEnemy: function(data)
    {
        var self = this;
        var isHead = data.isHead;
        var hurt = data.hurt;
        var hpnum = data.hp;
        var diedir = cc.v2(data.diedirX,data.diedirY);

        var playerData = this.findPlayerDataByUid(data.uid);
        var player = playerData.player;
        playerData.hp = hpnum;

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
                par = cc.instantiate(this.res.bigblood);
            }
            par.getComponent("cc.ParticleSystem").startColor = cc.color(255,0,0);
            par.getComponent("cc.ParticleSystem").endColor = cc.color(255,0,0);
            par.position = hit.position;
            par.scaleX = -player.scaleX;
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
            par.scaleX = -player.scaleX;
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

        var maxHp = 50.0;
        if(playerData.maxJscore > 180)
            maxHp = 75.0;

        if(playerData.pos == 1)
        {
            this.a_pro.progress = hpnum/maxHp;
            if(this.a_pro.progress>=0.9)
                this.a_pro_bar.color = cc.color(0,160,233);
            else if(this.a_pro.progress>=0.4 && this.a_pro.progress<0.9)
                this.a_pro_bar.color = cc.color(0,255,0);
            else if(this.a_pro.progress>=0.1 && this.a_pro.progress<0.4)
                this.a_pro_bar.color = cc.color(255,183,0);
            else
                this.a_pro_bar.color = cc.color(255,0,0);
        }
        else if(playerData.pos == 2)
        {
            this.b_pro.progress = hpnum/maxHp;
            if(this.b_pro.progress>=0.9)
                this.b_pro_bar.color = cc.color(0,160,233);
            else if(this.b_pro.progress>=0.4 && this.b_pro.progress<0.9)
                this.b_pro_bar.color = cc.color(0,255,0);
            else if(this.b_pro.progress>=0.1 && this.b_pro.progress<0.4)
                this.b_pro_bar.color = cc.color(255,183,0);
            else
                this.b_pro_bar.color = cc.color(255,0,0);
        }
        else if(playerData.pos == 3)
        {
            this.c_pro.progress = hpnum/maxHp;
            if(this.c_pro.progress>=0.9)
                this.c_pro_bar.color = cc.color(0,160,233);
            else if(this.c_pro.progress>=0.4 && this.c_pro.progress<0.9)
                this.c_pro_bar.color = cc.color(0,255,0);
            else if(this.c_pro.progress>=0.1 && this.c_pro.progress<0.4)
                this.c_pro_bar.color = cc.color(255,183,0);
            else
                this.c_pro_bar.color = cc.color(255,0,0);
        }
        else if(playerData.pos == 4)
        {
            this.d_pro.progress = hpnum/maxHp;
            if(this.d_pro.progress>=0.9)
                this.d_pro_bar.color = cc.color(0,160,233);
            else if(this.d_pro.progress>=0.4 && this.d_pro.progress<0.9)
                this.d_pro_bar.color = cc.color(0,255,0);
            else if(this.d_pro.progress>=0.1 && this.d_pro.progress<0.4)
                this.d_pro_bar.color = cc.color(255,183,0);
            else
                this.d_pro_bar.color = cc.color(255,0,0);
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
                    if(self.playerData.roomType == 3)
                    {
                        if(playerData.pos == 1 && self.playerData.playerC.hp <= 0)
                        {
                            self.gameOver();
                        }
                        else if(playerData.pos == 2 && self.playerData.playerD.hp <= 0)
                        {
                            self.gameOver();
                        }
                        else if(playerData.pos == 3 && self.playerData.playerA.hp <= 0)
                        {
                            self.gameOver();
                        }
                        else if(playerData.pos == 4 && self.playerData.playerB.hp <= 0)
                        {
                            self.gameOver();
                        }
                    }
                    else
                    {
                        self.gameOver();
                    }
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
        if(this.playerData.roomType == 3)
        {
            coin.position = this.node_over2_guang.parent.convertToWorldSpaceAR(this.node_over2_guang.position);
            this.node_over2.addChild(coin);
        }
        else
        {
            coin.position = this.node_over_box_1.parent.convertToWorldSpaceAR(this.node_over_box_1.position);
            this.node_over.addChild(coin);
        }

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
        this.state = "stop";
        this.stopScroll();

        this.node_sel.active = false;
        this.node_sel2.active = false;

        this.node_game_ui.active = false;
        this.taizi_a.active = false;
        this.taizi_b.active = false;
        this.taizi_c.active = false;
        this.taizi_d.active = false;

        var selfPlayer = this.findSelfPlayerData();

        this.lastjscore = 0;

        if(this.playerData.roomType == 3)
        {
            this.node_over2.active = true;
            this.node_over2_jifenx2.active = true;
            this.node_over2_fanhui.getComponent("cc.Button").interactable = true;
            this.node_over2_again.getComponent("cc.Button").interactable = true;
            this.node_over2_home.getComponent("cc.Button").interactable = true;
            this.node_over2_home.color = cc.color(255,255,255);
            this.node_over2_jifenx2.getComponent("cc.Button").interactable = true;

            this.loadPic(this.node_over2_box_1,this.playerData.playerA.avatarUrl+"?"+Math.random());
            this.loadPic(this.node_over2_box_2,this.playerData.playerB.avatarUrl+"?"+Math.random());
            this.loadPic(this.node_over2_box_3,this.playerData.playerC.avatarUrl+"?"+Math.random());
            this.loadPic(this.node_over2_box_4,this.playerData.playerD.avatarUrl+"?"+Math.random());
            this.node_over2_box_1_name.string = storage.getLabelStr(this.playerData.playerA.name,12);
            this.node_over2_box_2_name.string = storage.getLabelStr(this.playerData.playerB.name,12);
            this.node_over2_box_3_name.string = storage.getLabelStr(this.playerData.playerC.name,12);
            this.node_over2_box_4_name.string = storage.getLabelStr(this.playerData.playerD.name,12);
            this.node_over2_guang.stopAllActions();
            this.node_over2_guang.runAction(cc.repeatForever(cc.rotateBy(2,180)));

            var winpos = 0;
            var guangpos = this.node_over2_box_1.position;
            if(this.playerData.playerA.hp + this.playerData.playerC.hp > this.playerData.playerB.hp + this.playerData.playerD.hp)
            {
                if(this.playerData.playerA.uid == selfPlayer.uid)
                    winpos = 1;
                if(this.playerData.playerC.uid == selfPlayer.uid)
                {
                    winpos = 3;
                    guangpos = this.node_over2_box_3.position;
                }
            }
            else
            {
                if(this.playerData.playerB.uid == selfPlayer.uid)
                {
                    winpos = 2;
                    guangpos = this.node_over2_box_2.position;
                }
                if(this.playerData.playerD.uid == selfPlayer.uid)
                {
                    winpos = 4;
                    guangpos = this.node_over2_box_4.position;
                }
            }
            if(winpos > 0)
            {
                this.GAME.isWin = true;
                this.node_over2_title.string = "恭喜！获得胜利";
                this.node_over2_guang.position = guangpos;
                this.node_over2_bili.string = "1 : 0";
                this.node_over2_fanhui_str.string = "改天再战";
                this.node_over2_again_str.string = "再来一局";

                cc.find("str",this.node_over2_jifenx2).active = true;
                cc.find("suiji",this.node_over2_jifenx2).active = true;
                cc.find("str2",this.node_over2_jifenx2).active = false;

                if(this.isCanJScore())
                {
                    var jscore = this.winJscore();
                    var star = this.winStarNum();
                    this.node_over2_jifen.string = "积分+"+jscore;
                    this.node_over2_star.string = "星星+"+star;
                    selfPlayer.jscore += jscore;
                    //selfPlayer.star += star;
                    if(selfPlayer.jscore > selfPlayer.maxJscore)
                        selfPlayer.maxJscore = selfPlayer.jscore;
                    websocket.updateUser(selfPlayer.jscore,star,selfPlayer.gunId,selfPlayer.skinId);

                    storage.setStorageJScore(selfPlayer.jscore);

                    this.lastjscore = jscore;
                    this.laststar = star;

                    if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
                        this.main.wxUploadScore(0,selfPlayer.jscore);
                        //wx.postMessage({ message: "updateWinNum",winNum:selfPlayer.jscore,playerId:selfPlayer.skinId,gunId:selfPlayer.gunId });
                }
                else
                {
                    this.node_over2_jifen.string = "";
                }
                var wincoin = 50;
                if(this.main.GAME.isShouYix2)
                    wincoin *= 2;
                storage.setStorageCoin(storage.getStorageCoin()+wincoin);

                this.node.runAction(cc.repeat(cc.sequence(
                    cc.delayTime(0.05),
                    cc.callFunc(function(){
                        self.addCoin();
                    })
                ),51));

                var winNum = storage.getStorageWinNum();
                winNum += 1;
                storage.setStorageWinNum(winNum);


            }
            else
            {
                var windata = this.playerData.playerA;
                if(this.playerData.playerB.hp > windata.hp)
                {
                    windata = this.playerData.playerB;
                    guangpos =this.node_over2_box_2.position;
                }
                if(this.playerData.playerC.hp > windata.hp)
                {
                    windata = this.playerData.playerC;
                    guangpos =this.node_over2_box_3.position;
                }
                if(this.playerData.playerD.hp > windata.hp)
                {
                    windata = this.playerData.playerD;
                    guangpos =this.node_over2_box_4.position;
                }

                this.GAME.isWin = false;
                this.node_over2_title.string = "遗憾！失败了";
                this.node_over2_guang.position = guangpos;
                this.node_over2_bili.string = "0 : 1";
                this.node_over2_fanhui_str.string = "溜了";
                this.node_over2_again_str.string = "不服再来";

                //this.node_over2_jifenx2.getComponent("cc.Button").interactable = false;
                cc.find("str",this.node_over2_jifenx2).active = false;
                cc.find("suiji",this.node_over2_jifenx2).active = false;
                cc.find("str2",this.node_over2_jifenx2).active = true;

                if(this.isCanJScore())
                {
                    var jscore = this.failJscore();
                    var star = this.winStarNum();
                    //if(star > selfPlayer.star)
                    //    star = selfPlayer.star;
                    this.node_over2_jifen.string = "积分-"+jscore;
                    this.node_over2_star.string = "星星-"+star;

                    selfPlayer.jscore -= jscore;
                    //selfPlayer.star -= star;
                    websocket.updateUser(selfPlayer.jscore,-star,selfPlayer.gunId,selfPlayer.skinId);

                    storage.setStorageJScore(selfPlayer.jscore);

                    this.lastjscore = jscore;
                    this.laststar = star;
                }
                else
                {
                    this.node_over2_jifen.string = "";
                }
            }

            this.qianqista.event("pvp_2v2_num");
        }
        else
        {
            this.node_over.active = true;
            //this.node_over_jifenx2.active = true;
            this.node_over_jifenx2.active = false;
            this.node_over_fanhui.getComponent("cc.Button").interactable = true;
            this.node_over_again.getComponent("cc.Button").interactable = true;
            this.node_over_jifenx2.getComponent("cc.Button").interactable = true;
            this.node_over_home.getComponent("cc.Button").interactable = true;
            this.node_over_home.color = cc.color(255,255,255);

            if(this.playerData.roomType == 1)
                this.node_over_again.active = false;
            else
                this.node_over_again.active = true;


            var enemyPlayer = this.findEnemyPlayerData();

            this.loadPic(this.node_over_box_1,selfPlayer.avatarUrl+"?"+Math.random());
            this.loadPic(this.node_over_box_2,enemyPlayer.avatarUrl+"?"+Math.random());
            this.node_over_box_1_name.string = storage.getLabelStr(selfPlayer.name,12);
            this.node_over_box_2_name.string = storage.getLabelStr(enemyPlayer.name,12);
            this.node_over_guang.stopAllActions();
            this.node_over_guang.runAction(cc.repeatForever(cc.rotateBy(2,180)));

            if(selfPlayer.hp>enemyPlayer.hp)
            {
                if(!selfPlayer.winNum)
                    selfPlayer.winNum = 1;
                else
                    selfPlayer.winNum += 1;

                if(!enemyPlayer.winNum)
                    enemyPlayer.winNum = 0;

                this.GAME.isWin = true;
                this.node_over_title.string = "恭喜！获得胜利";
                this.node_over_guang.position = this.node_over_box_1.position;
                this.node_over_bili.string = selfPlayer.winNum+" : "+enemyPlayer.winNum;
                this.node_over_fanhui_str.string = "改天再战";
                this.node_over_again_str.string = "再来一局";
                cc.find("str",this.node_over_jifenx2).active = true;
                cc.find("suiji",this.node_over_jifenx2).active = true;
                cc.find("str2",this.node_over_jifenx2).active = false;

                var wincoin = 50;
                if(this.main.GAME.isShouYix2)
                    wincoin *= 2;
                storage.setStorageCoin(storage.getStorageCoin()+wincoin);

                if(this.isCanJScore())
                {
                    var jscore = this.winJscore();
                    var star = this.winStarNum();
                    this.node_over_jifen.string = "积分+"+jscore;
                    this.node_over_star.string = "星星+"+star;
                    selfPlayer.jscore += jscore;
                    //selfPlayer.star += star;
                    if(selfPlayer.jscore > selfPlayer.maxJscore)
                        selfPlayer.maxJscore = selfPlayer.jscore;

                    websocket.updateUser(selfPlayer.jscore,star,selfPlayer.gunId,selfPlayer.skinId);

                    storage.setStorageJScore(selfPlayer.jscore);

                    this.lastjscore = jscore;
                    this.laststar = star;

                    if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
                        this.main.wxUploadScore(0,selfPlayer.jscore);
                        //wx.postMessage({ message: "updateWinNum",winNum:selfPlayer.jscore,playerId:selfPlayer.skinId,gunId:selfPlayer.gunId });
                }
                else
                {
                    this.node_over_jifen.string = "";
                }

                this.node.runAction(cc.repeat(cc.sequence(
                    cc.delayTime(0.05),
                    cc.callFunc(function(){
                        self.addCoin();
                    })
                ),51));

                var winNum = storage.getStorageWinNum();
                winNum += 1;
                storage.setStorageWinNum(winNum);


            }
            else
            {
                if(!selfPlayer.winNum)
                    selfPlayer.winNum = 0;

                if(!enemyPlayer.winNum)
                    enemyPlayer.winNum = 1;
                else
                    enemyPlayer.winNum += 1;

                this.GAME.isWin = false;
                this.node_over_title.string = "遗憾！失败了";
                this.node_over_guang.position = this.node_over_box_2.position;
                this.node_over_bili.string = selfPlayer.winNum+" : "+enemyPlayer.winNum;
                this.node_over_fanhui_str.string = "溜了";
                this.node_over_again_str.string = "不服再来";

                //this.node_over_jifenx2.getComponent("cc.Button").interactable = false;
                cc.find("str",this.node_over_jifenx2).active = false;
                cc.find("suiji",this.node_over_jifenx2).active = false;
                cc.find("str2",this.node_over_jifenx2).active = true;

                if(this.isCanJScore())
                {
                    var jscore = this.failJscore();
                    var star = this.winStarNum();
                    //if(star > selfPlayer.star)
                    //    star = selfPlayer.star;
                    this.node_over_jifen.string = "积分-"+jscore;
                    this.node_over_star.string = "星星-"+star;
                    selfPlayer.jscore -= jscore;
                    //selfPlayer.star -= star;
                    websocket.updateUser(selfPlayer.jscore,-star,selfPlayer.gunId,selfPlayer.skinId);

                    storage.setStorageJScore(selfPlayer.jscore);

                    this.lastjscore = jscore;
                    this.laststar = star;
                }
                else
                {
                    this.node_over_jifen.string = "";
                }
            }

            //var coin = storage.getStorageCoin();
            //if(enemyPlayer.robot == 1 && coin >= 30 && !this.judgeJiesuan())
            //{
            //    if(Math.random()<=0.4)
            //    {
            //        this.node.runAction(cc.sequence(
            //            cc.delayTime(2),
            //            cc.callFunc(function(){
            //                websocket.again(0);
            //            })
            //        ));
            //    }
            //    else
            //    {
            //        if(Math.random()<=0.4)
            //            enemyPlayer.againNum = 1;
            //        else
            //            enemyPlayer.againNum = 0;
            //    }
            //}

            this.qianqista.event("pvp_1v1_num");

        }


        this.qianqista.rankJScore(function(res){
            self.main.worldrank.pk = res.data;
        });

        this.main.uploadData();
    },

    jifenx2: function()
    {
        var selfData = this.findSelfPlayerData();
        var star = this.laststar;
        //selfData.star += star;
        //websocket.updateUser(selfData.jscore,0,selfData.gunId,selfData.skinId);
        websocket.updateUser(selfData.jscore,star,selfData.gunId,selfData.skinId);
        this.res.showToast("星星+"+this.laststar);
        //if(this.laststar > 0)
        //{
        //    storage.setStorageJScore(selfData.jscore);
        //    if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        //        this.main.wxUploadScore(0,selfData.jscore);
        //        //wx.postMessage({ message: "updateWinNum",winNum:selfData.jscore,playerId:selfData.skinId,gunId:selfData.gunId });
        //}

        this.qianqista.event("pvp_x2");
    },

    winStarNum: function()
    {
        var num = 0;
        var selfData = this.findSelfPlayerData();
        if(selfData.jscore <= 120)
            num = 1;
        else if(selfData.jscore > 120 && selfData.jscore <= 240)
            num = 2;
        else if(selfData.jscore > 240)
            num = 3;
        return num;
    },

    isCanJScore: function()
    {
        var r = false;
        if(this.playerData.roomType == 3)
        {
            var selfData = this.findSelfPlayerData();
            var num = 0;
            if(this.playerData.playerA.matchRoomId > 0 && this.playerData.playerA.matchRoomId == selfData.roomId)
                num ++;
            if(this.playerData.playerB.matchRoomId > 0 && this.playerData.playerB.matchRoomId == selfData.roomId)
                num ++;
            if(this.playerData.playerC.matchRoomId > 0 && this.playerData.playerC.matchRoomId == selfData.roomId)
                num ++;
            if(this.playerData.playerD.matchRoomId > 0 && this.playerData.playerD.matchRoomId == selfData.roomId)
                num ++;

            if(num == 0 || num == 1 || num == 2)
                r = true;
        }
        else
        {
            var enemyData = this.findEnemyPlayerData();
            var selfData = this.findSelfPlayerData();
            if(enemyData.matchRoomId == 0 && selfData.matchRoomId == 0)
                r = true;
        }
        return r;
    },

    winJscore: function()
    {
        var sc = 0;
        var enemyscore = 0;
        var selfData = this.findSelfPlayerData();
        if(this.playerData.roomType == 3)
        {
            if(selfData.pos == 1 || selfData.pos == 3)
            {
                enemyscore = (this.playerData.playerB.jscore + this.playerData.playerD.jscore)/2;
            }
            else
            {
                enemyscore = (this.playerData.playerA.jscore + this.playerData.playerC.jscore)/2;
            }
        }
        else
        {
            enemyscore = this.findEnemyPlayerData().jscore;
        }

        if(selfData.jscore <= 70)
            sc = 15;
        else if(selfData.jscore > 70 && selfData.jscore <=150)
        {
            sc = 12 + (enemyscore - selfData.jscore)*0.2;
            sc = sc < 10 ? 10 : sc;
        }
        else if(selfData.jscore > 150 && selfData.jscore <=240)
        {
            sc = 10 + (enemyscore - selfData.jscore)*0.25;
            sc = sc < 8 ? 8 : sc;
        }
        else if(selfData.jscore > 240)
        {
            sc = 8 + (enemyscore - selfData.jscore)*0.3;
            sc = sc < 6 ? 6 : sc;
        }

        return Math.floor(sc);
    },

    failJscore: function()
    {
        var sc = 0;
        var enemyscore = this.winJscore();
        var selfData = this.findSelfPlayerData();
        if(selfData.jscore > 70 && selfData.jscore <=150)
        {
            sc = 20 - enemyscore;
            sc = sc < 5 ? 5 : sc;
        }
        else if(selfData.jscore > 150 && selfData.jscore <=240)
        {
            sc = 17 - enemyscore;
            sc = sc < 5 ? 5 : sc;
        }
        else if(selfData.jscore > 240)
        {
            sc = 14 - enemyscore;
            sc = sc < 5 ? 5 : sc;
        }

        return Math.floor(sc);
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

        if(self.node.collnum==1)
        {
            if(self.node.pos == 1 && other.node.pos != 1 && other.node.pos != 3)
            {
                if(other.node.pos == 2)
                    this.enemyHurt(other.tag,self.node.diedir,this.playerData.playerA,this.playerData.playerB);
                else if(other.node.pos == 4)
                    this.enemyHurt(other.tag,self.node.diedir,this.playerData.playerA,this.playerData.playerD);

                this.main.poolebullets.put(self.node);
            }
            else if(self.node.pos == 2 && other.node.pos != 2 && other.node.pos != 4)
            {
                if(other.node.pos == 1)
                    this.enemyHurt(other.tag,self.node.diedir,this.playerData.playerB,this.playerData.playerA);
                else if(other.node.pos == 3)
                    this.enemyHurt(other.tag,self.node.diedir,this.playerData.playerB,this.playerData.playerC);
                this.main.poolebullets.put(self.node);
            }
            else if(self.node.pos == 3 && other.node.pos != 3 && other.node.pos != 1)
            {
                if(other.node.pos == 2)
                    this.enemyHurt(other.tag,self.node.diedir,this.playerData.playerC,this.playerData.playerB);
                else if(other.node.pos == 4)
                    this.enemyHurt(other.tag,self.node.diedir,this.playerData.playerC,this.playerData.playerD);
                this.main.poolebullets.put(self.node);
            }
            else if(self.node.pos == 4 && other.node.pos != 4 && other.node.pos != 2)
            {
                if(other.node.pos == 1)
                    this.enemyHurt(other.tag,self.node.diedir,this.playerData.playerD,this.playerData.playerA);
                else if(other.node.pos == 3)
                    this.enemyHurt(other.tag,self.node.diedir,this.playerData.playerD,this.playerData.playerC);
                this.main.poolebullets.put(self.node);
            }
        }
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
                this.updateRobot(dt);
            }
        }

        if(this.isHide)
        {
            this.isHide = false;
            this.goHome();
        }

        this.subDt += dt;
        if(this.subDt >= 1) {
            this.subDt = 0;

            this.subTime -= 1000;
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
                if (cc.isValid(sp))
                {
                    var spriteFrame = new cc.SpriteFrame(tex);
                    sp.getComponent("cc.Sprite").spriteFrame = spriteFrame;
                }
            }
        });
    }
});
