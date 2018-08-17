var qianqista = require("qianqista");
var storage = require("storage");
import './yxmp.js';

cc.Class({
    extends: cc.Component,

    properties: {
        display: cc.Sprite,
        display_gray: cc.Node,
        display_gray_rank: cc.Node,
        display_bg: cc.Node
    },


     onLoad: function() {
         this.dsize = cc.view.getDesignResolutionSize();
         cc.winSize.width;
         this.tex = new cc.Texture2D();
         cc.winSize.width;
         this.subdt = 0;
         this.userInfo = {};
         this.uploadScoreDt = 0;
         cc.winSize.width;
         this.videoTimeDt = 0;
         this.openover = false;
         this.openstore = false;
         cc.winSize.width;

         this.res = cc.find("Canvas").getComponent("res");
         this.qianqista = qianqista;
         cc.winSize.width;

         this.initPhysics();
         this.initData();
         cc.winSize.width;
         this.initUI();
         this.addListener();

         this.adapt();
            cc.winSize.width;
         this.wxGetUserInfo();
         this.wxOpenQuan();
         cc.winSize.width;
         storage.playMusic(this.res.audio_bgm);
         storage.preloadSound();
         this.wxVideoLoad();
        cc.winSize.width;

         var self = this;


         qianqista.init("wx3256b6b014a0d069","a91097f900117997f13aa4250f56b650","王牌枪手",function(){
             qianqista.datas(function(res){
                 console.log('my datas:', res);cc.winSize.width;
                 if(res.state == 200)
                 {
                     self.updateLocalData(res.data);
                 }
             });
         });

         qianqista.control(function(res){
             console.log('my control:', res);
             if(res.state == 200)
             {
                 self.GAME.control = res.data;cc.winSize.width;
                 self.updateUIControl();
             }
         });


         var sdkReady = yxmp.init({
             appName: 'topgunner', // app_name需要填入, 是与服务器通信的凭证
             serverUrl: 'https://api.xiuwu.me', // beta测试环境的地址是 betaapi.xiuwu.me
             // 静态配表/资源的设置, 关系到推荐位, 版本号比对, 分享的物料配置
             // 静态资源的beta/prod与API服务器的beta/prod配置是相互独立的.
             asset: {
                 server: 'https://s.xiuwu.me', // 生产和beta环境
                 beta: false // 使用beta环境的配表内容
             }
         });

         sdkReady.then(function(){
             var recommendApp = yxmp.asset.getRecommendApp('home');
             //{ icon, appid, path, poster }
             if (recommendApp)
             {
                 self.GAME.more = recommendApp;
                 if(self.GAME.more)
                 {
                      self.node_main_more.active = true;
                     self.loadPic(self.node_main_more,recommendApp.icon);
                 }
             }
             qianqista.openid =  yxmp.getUserOpenId();

         });

      // cc.game.setFrameRate(50);
     },

    initPhysics: function()
    {
        //cc.director.getPhysicsManager().enabled = true;
        //cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //cc.PhysicsManager.DrawBits.e_pairBit |
        //cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //cc.PhysicsManager.DrawBits.e_jointBit |
        //cc.PhysicsManager.DrawBits.e_shapeBit;
        //cc.director.getPhysicsManager().gravity = cc.v2(0, 0);
        //cc.director.getPhysicsManager().debugDrawFlags = 0;


        //cc.director.getPhysicsManager().attachDebugDrawToCamera(this.GAME.camera);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        cc.winSize.width;
        //manager.enabledDebugDraw = true;
        //manager.enabledDrawBoundingBox = true;
    },


    initData: function() {
        this.tih = 36;
        this.op = [255, 242, 216, 191, 165, 140, 114, 89, 63, 38, 12, 5, 3, 1, 0];
        this.GAME = {};
        cc.winSize.width;
        this.GAME.control = [];
        this.GAME.xuming = "00:30-00:30";
        cc.winSize.width;
        this.GAME.linghongbao = 0;
        this.GAME.state = "stop";
        cc.winSize.width;

        this.poolbullets = new cc.NodePool();
        this.poolhits = new cc.NodePool();
        cc.winSize.width;
        this.poolsmokes = new cc.NodePool();
        this.poolshells = new cc.NodePool();
        cc.winSize.width;
        this.poolbloods = new cc.NodePool();
        this.poolbigbloods = new cc.NodePool();
        for(var i=0;i<5;i++)
        {
            var bullet_1 = cc.instantiate(this.res.bullet_1);
            this.poolbullets.put(bullet_1);
            cc.winSize.width;
            var hit = cc.instantiate(this.res.hit);
            this.poolhits.put(hit);
            cc.winSize.width;
            var smoke = cc.instantiate(this.res.smoke);
            this.poolsmokes.put(smoke);
cc.winSize.width;
            var shell = cc.instantiate(this.res.shell);
            this.poolshells.put(shell);
            cc.winSize.width;
            var blood = cc.instantiate(this.res.blood);
            this.poolbloods.put(blood);
            cc.winSize.width;
            var bigblood = cc.instantiate(this.res.bigblood);
            this.poolbigbloods.put(bigblood);
            cc.winSize.width;
        }
        this.poolcoins = new cc.NodePool();
        cc.winSize.width;
        for(var i=0;i<6;i++)
        {
            var coin = cc.instantiate(this.res.coin);
            this.poolcoins.put(coin);
        }
        cc.winSize.width;


        if(storage.getStorageFirst() == 0)
        {
            storage.setStorageFirst(1);
            storage.setStorageMusic(1);
            cc.winSize.width;
            storage.setStorageSound(1);
            storage.setStorageVibrate(1);
            cc.winSize.width;
            storage.setStorageShareGroupList("groups:");
            storage.setStorageShareGroupTime(-1);
            cc.winSize.width;
            storage.setStorageCard(2);
        }

        // for(var i=1;i<=9;i++)
        //    storage.setStoragePlayer(i,0);
        // for(var i=1;i<=19;i++)
        //    storage.setStorageGun(i,0);
        storage.setStoragePlayer(1);
        storage.setStorageGun(1);
        cc.winSize.width;
        //storage.setStorageCoin(5000);

        //storage.setStorageGun(10,0);
        //storage.setStorageCurrGun(1);
        // storage.setStorageQianDao(6);
        // storage.setStorageQianDaoTime(-1);
        //storage.setStorageYindao(0);
        //storage.setStorageGunJieSuoNum(1);
        // storage.setStorageRoleJieSuoNum(10);
        // cc.sys.localStorage.setItem("playnum",0);
        // storage.setStorageInviteNum(0);
        // storage.setStorageInviteAwardNum(0);

        // storage.setStorageGunInviteNum(1);
        // storage.setStorageGunInviteAwardNum(0);
        //storage.setStorageGun(16,0);
    },


    initUI: function()
    {
        var s = cc.winSize;
        this.node_game = cc.find("Canvas/node_game");
        this.node_game_ui = cc.find("Canvas/node_game_ui");
        cc.winSize.width;
        this.node_game_ui.score = cc.find("score",this.node_game_ui);
        this.node_game_ui.coinicon = cc.find("coin",this.node_game_ui);
        cc.winSize.width;
        this.node_game_ui.coin = cc.find("coin/num",this.node_game_ui);
        this.node_game_ui.killhead =  cc.find("killhead",this.node_game_ui);
        cc.winSize.width;
        this.node_game_ui.boss =  cc.find("boss",this.node_game_ui);
        this.node_game_ui.hitbg =  cc.find("hitbg",this.node_game_ui);
        cc.winSize.width;
        this.node_game_ui.yindao =  cc.find("yindao",this.node_game_ui);
        this.node_main = cc.find("Canvas/node_main");
        cc.winSize.width;
        this.node_main_coin = cc.find("coin/num",this.node_main);
        this.node_main_score = cc.find("score",this.node_main);
        cc.winSize.width;
        this.node_main_bottom = cc.find("bottom",this.node_main);
        this.node_main_lingqu = cc.find("lingqu",this.node_main);
        cc.winSize.width;
        this.node_main_lingqu_time = cc.find("lingqu/time",this.node_main);
        this.node_main_start = cc.find("start",this.node_main);
        cc.winSize.width;
        this.node_main_more = cc.find("more",this.node_main);
        this.node_main_more2 = cc.find("more2",this.node_main);
        cc.winSize.width;
        this.node_main_start.runAction(cc.repeatForever(cc.sequence(
                cc.scaleTo(0.5,1.2).easing(cc.easeSineIn()),
                cc.scaleTo(0.5,1).easing(cc.easeSineOut())
            )));
        cc.winSize.width;
        //var stringTime = "2018-07-05 17:01:00";
        //var timestamp2 = (new Date(Date.parse(stringTime.replace(/-/g,"/")))).getTime();
        //if(new Date().getTime() < timestamp2)
        //{
        //
        //}
        this.initGmae();
        cc.winSize.width;
        this.updateUIControl();
        cc.winSize.width;
        this.updateDitu();
    },

    updateDitu: function()
    {
        var num = storage.getStorageGunJieSuoNum();
        num = parseInt(num) + parseInt(storage.getStorageGunJieSuoNum2());
        cc.winSize.width;
        if(num>0)
        {
            this.res.updateDitu();
        }

    },

    updateUIControl: function()
    {
        this.node_main_more.active = false;
        this.node_main_more2.active = false;
        cc.winSize.width;
        cc.find("fangdanyi",this.node_main).active = false;
        cc.find("lingjiang",this.node_main).active = false;
        cc.find("linggunbg",this.node_main).active = false;
        cc.winSize.width;

        this.GAME.more = null;
        this.GAME.more2 = null;
        cc.winSize.width;
        this.GAME.linghongbao = 0;
        this.GAME.sharecard = false;
        cc.winSize.width;
        var sto_channel = cc.sys.localStorage.getItem("channel");
        cc.winSize.width;
        if(this.GAME.control.length>0)
        {
            this.GAME.shares = {};
            cc.winSize.width;
            for(var i=0;i<this.GAME.control.length;i++)
            {
                var con = this.GAME.control[i];
                if(con.id == "sharecard")
                {
                    if(con.value == "1")
                    {
                        cc.find("fangdanyi",this.node_main).active = true;
                        cc.find("lingjiang",this.node_main).active = true;
                        cc.winSize.width;
                        // cc.find("linggunbg",this.node_main).active = true;
                        this.GAME.fangdanyi = true;
                        this.GAME.sharecard = true;
                    }
                }
                else if(con.id == "sharefuhuo")
                {
                    this.GAME.xuming = con.value;
                    cc.winSize.width;
                }
                else if(con.id == "linghongbao")
                {
                    this.GAME.linghongbao = con.value;
                    cc.winSize.width;
                }
                else
                {
                    if(con.id.indexOf("channel") >= 0)
                    {
                        if(con.id == "channel_default" && this.GAME.more == null)
                            this.GAME.more = con.value;
                        else if(con.id == "channel_default_2" && this.GAME.more2 == null)
                            this.GAME.more2 = con.value;
                        if(sto_channel)
                        {
                            if(con.id == ("channel_"+sto_channel))
                                this.GAME.more = con.value;
                            else if(con.id == ("channel_"+sto_channel+"_2"))
                                this.GAME.more2 = con.value;
                        }
                        cc.winSize.width;
                    }
                    else
                    {
                        this.GAME.shares[con.id] = con.value;
                        cc.winSize.width;
                    }
                }
            }
        }
        var cardnum = storage.getStorageCard();
        cc.winSize.width;
        if(this.GAME.fangdanyi && cardnum>0 && this.GAME.playerfangdanyi)
        {
            this.player.fangdanyi.active = true;
            cc.winSize.width;
        }

        // if(this.GAME.more)
        // {
        //     var pic = this.GAME.more.split("--")[0];
        //     this.node_main_more.active = true;
        //     this.loadPic(this.node_main_more,pic);
        // }
        // if(this.GAME.more2)
        // {
        //     var pic = this.GAME.more2.split("--")[0];
        //     this.node_main_more2.active = true;
        //     this.loadPic(this.node_main_more2,pic);
        // }

        this.updateDian();
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
                cc.winSize.width;
            }
        });
    },

    updateLocalData: function(data)
    {
        if(data)
        {
            var datas = JSON.parse(data);
            if(datas.first)
                storage.setStorageFirst(1);
            if(datas.coin)
                storage.setStorageCoin(parseInt(datas.coin));
            if(datas.score)
                storage.setStorageScore(parseInt(datas.score));
            if(datas.card)
                storage.setStorageCard(parseInt(datas.card));
            if(datas.qiandao)
                storage.setStorageQianDao(parseInt(datas.qiandao));
            if(datas.player_1)
                storage.setStoragePlayer(1,parseInt(datas.player_1));
            if(datas.player_2)
                storage.setStoragePlayer(2,parseInt(datas.player_2));
            if(datas.player_3)
                storage.setStoragePlayer(3,parseInt(datas.player_3));
            if(datas.player_4)
                storage.setStoragePlayer(4,parseInt(datas.player_4));
            if(datas.player_5)
                storage.setStoragePlayer(5,parseInt(datas.player_5));
            if(datas.player_6)
                storage.setStoragePlayer(6,parseInt(datas.player_6));
            if(datas.player_7)
                storage.setStoragePlayer(7,parseInt(datas.player_7));
            if(datas.player_8)
                storage.setStoragePlayer(8,parseInt(datas.player_8));
            if(datas.player_9)
                storage.setStoragePlayer(9,parseInt(datas.player_9));

            cc.winSize.width;

            if(datas.gun_1)
                storage.setStorageGun(1,parseInt(datas.gun_1));
            if(datas.gun_2)
                storage.setStorageGun(2,parseInt(datas.gun_2));
            if(datas.gun_3)
                storage.setStorageGun(3,parseInt(datas.gun_3));
            if(datas.gun_4)
                storage.setStorageGun(4,parseInt(datas.gun_4));
            if(datas.gun_5)
                storage.setStorageGun(5,parseInt(datas.gun_5));
            if(datas.gun_6)
                storage.setStorageGun(6,parseInt(datas.gun_6));
            if(datas.gun_7)
                storage.setStorageGun(7,parseInt(datas.gun_7));
            if(datas.gun_8)
                storage.setStorageGun(8,parseInt(datas.gun_8));
            if(datas.gun_9)
                storage.setStorageGun(9,parseInt(datas.gun_9));
            if(datas.gun_10)
                storage.setStorageGun(10,parseInt(datas.gun_10));
            if(datas.gun_11)
                storage.setStorageGun(11,parseInt(datas.gun_11));
            if(datas.gun_12)
                storage.setStorageGun(12,parseInt(datas.gun_12));
            if(datas.gun_13)
                storage.setStorageGun(13,parseInt(datas.gun_13));
            if(datas.gun_14)
                storage.setStorageGun(14,parseInt(datas.gun_14));
            if(datas.gun_15)
                storage.setStorageGun(15,parseInt(datas.gun_15));
            if(datas.gun_16)
                storage.setStorageGun(16,parseInt(datas.gun_16));
            if(datas.gun_17)
                storage.setStorageGun(17,parseInt(datas.gun_17));
            if(datas.gun_18)
                storage.setStorageGun(18,parseInt(datas.gun_18));
            if(datas.gun_19)
                storage.setStorageGun(19,parseInt(datas.gun_19));

            cc.winSize.width;

            if(datas.currGun)
                storage.setStorageCurrGun(parseInt(datas.currGun));
            if(datas.currPlayer)
                storage.setStorageCurrPlayer(parseInt(datas.currPlayer));

            cc.winSize.width;

            if(datas.gunJiesuoNum)
                storage.setStorageGunJieSuoNum(parseInt(datas.gunJiesuoNum));
            if(datas.gunJiesuoNum2)
                storage.setStorageGunJieSuoNum2(parseInt(datas.gunJiesuoNum2));
            if(datas.gunJiesuoAwardNum)
                storage.setStorageGunJieSuoAwardNum(parseInt(datas.gunJiesuoAwardNum));
            if(datas.roleJiesuoNum)
                storage.setStorageRoleJieSuoNum(parseInt(datas.roleJiesuoNum));
            if(datas.roleJiesuoAwardNum)
                storage.setStorageRoleJieSuoAwardNum(parseInt(datas.roleJiesuoAwardNum));
            if(datas.hitEnemyNum)
                storage.setStorageHitEnemyNum(parseInt(datas.hitEnemyNum));
            if(datas.hitEnemyAwardNum)
                storage.setStorageHitEnemyAwardNum(parseInt(datas.hitEnemyAwardNum));
            if(datas.hitHeadNum)
                storage.setStorageHitHeadNum(parseInt(datas.hitHeadNum));
            if(datas.hitHeadAwardNum)
                storage.setStorageHitHeadAwardNum(parseInt(datas.hitHeadAwardNum));
            if(datas.hitBossNum)
                storage.setStorageHitBossNum(parseInt(datas.hitBossNum));
            if(datas.hitBossAwardNum)
                storage.setStorageHitBossAwardNum(parseInt(datas.hitBossAwardNum));
            if(datas.inviteNum)
                storage.setStorageInviteNum(parseInt(datas.inviteNum));
            if(datas.inviteAwardNum)
                storage.setStorageInviteAwardNum(parseInt(datas.inviteAwardNum));
            if(datas.invitelist)
                storage.setStorageInviteNum(datas.invitelist.length);
            if(datas.shareGroupList)
                storage.setStorageShareGroupList(datas.shareGroupList);
            if(datas.shareGroupTime)
                storage.setStorageShareGroupTime(datas.shareGroupTime);
            if(datas.gunInviteAwardNum)
                storage.setStorageGunInviteAwardNum(parseInt(datas.gunInviteAwardNum));
            if(datas.guninvitelist)
                storage.setStorageGunInviteNum(datas.guninvitelist.length);

            cc.winSize.width;


            this.node_main_coin.getComponent("cc.Label").string = storage.getStorageCoin();
            this.node_main_score.getComponent("cc.Label").string = storage.getStorageScore();
            this.updateDitu();

            cc.winSize.width;
        }
        else
        {
            this.uploadData();

            cc.winSize.width;
        }
    },

    updateData: function()
    {
        var self = this;
        qianqista.datas(function(res){
            console.log('my datas:', res);
            if(res.state == 200)
            {
                self.updateLocalData(res.data);
            }
        });
        cc.winSize.width;
    },

    uploadData: function()
    {
        var datas = {};
        datas.first = storage.getStorageFirst();
        datas.coin = storage.getStorageCoin();
        datas.score = storage.getStorageScore();
        datas.card = storage.getStorageCard();
        datas.qiandao = storage.getStorageQianDao();
        datas.player_1 = storage.getStoragePlayer(1);
        datas.player_2 = storage.getStoragePlayer(2);
        datas.player_3 = storage.getStoragePlayer(3);
        datas.player_4 = storage.getStoragePlayer(4);
        datas.player_5 = storage.getStoragePlayer(5);
        datas.player_6 = storage.getStoragePlayer(6);
        datas.player_7 = storage.getStoragePlayer(7);
        datas.player_8 = storage.getStoragePlayer(8);
        datas.player_9 = storage.getStoragePlayer(9);
        datas.gun_1 = storage.getStorageGun(1);
        datas.gun_2 = storage.getStorageGun(2);
        datas.gun_3 = storage.getStorageGun(3);
        datas.gun_4 = storage.getStorageGun(4);
        datas.gun_5 = storage.getStorageGun(5);
        datas.gun_6 = storage.getStorageGun(6);
        datas.gun_7 = storage.getStorageGun(7);
        datas.gun_8 = storage.getStorageGun(8);
        datas.gun_9 = storage.getStorageGun(9);
        datas.gun_10 = storage.getStorageGun(10);
        datas.gun_11 = storage.getStorageGun(11);
        datas.gun_12 = storage.getStorageGun(12);
        datas.gun_13 = storage.getStorageGun(13);
        datas.gun_14 = storage.getStorageGun(14);
        datas.gun_15 = storage.getStorageGun(15);
        datas.gun_16 = storage.getStorageGun(16);
        datas.gun_17 = storage.getStorageGun(17);
        datas.gun_18 = storage.getStorageGun(18);
        datas.gun_19 = storage.getStorageGun(19);
        datas.currGun = storage.getStorageCurrGun();
        datas.currPlayer = storage.getStorageCurrPlayer();

        cc.winSize.width;

        datas.gunJiesuoNum = storage.getStorageGunJieSuoNum();
        datas.gunJiesuoNum2 = storage.getStorageGunJieSuoNum2();
        datas.gunJiesuoAwardNum = storage.getStorageGunJieSuoAwardNum();
        datas.roleJiesuoNum = storage.getStorageRoleJieSuoNum();
        datas.roleJiesuoAwardNum = storage.getStorageRoleJieSuoAwardNum();
        datas.hitEnemyNum = storage.getStorageHitEnemyNum();
        datas.hitEnemyAwardNum = storage.getStorageHitEnemyAwardNum();
        datas.hitHeadNum = storage.getStorageHitHeadNum();
        datas.hitHeadAwardNum = storage.getStorageHitHeadAwardNum();
        datas.hitBossNum = storage.getStorageHitBossNum();
        datas.hitBossAwardNum = storage.getStorageHitBossAwardNum();
        datas.inviteNum = storage.getStorageInviteNum();
        datas.inviteAwardNum = storage.getStorageInviteAwardNum();
        datas.shareGroupList = storage.getStorageShareGroupList();
        datas.shareGroupTime = storage.getStorageShareGroupTime();
        datas.gunInviteAwardNum = storage.getStorageGunInviteAwardNum();

        cc.winSize.width;

        var data = JSON.stringify(datas);
        var self = this;
        qianqista.uploaddatas(data,function(res){
            console.log("--uploaddatas:",res);
            if(res && res.state == 200)
                self.updateData();
        });

        cc.winSize.width;
    },


    adapt: function()
    {
        var nodes = [this.node_main,this.node_game_ui];
        for(var i=0;i<nodes.length;i++)
        {
            var items = nodes[i].children;
            for(var j=0;j<items.length;j++)
            {
                var item = items[j];
                this.adaptItem(item);
                cc.winSize.width;
            }
        }
    },

    adaptItem: function(node)
    {
        var s = cc.winSize;
        var h = (this.dsize.height - s.height)/2;
        var sc = node.y/this.dsize.height;
        node.y = s.height*sc + h;

        cc.winSize.width;
    },

    initGameData: function()
    {
        var loutis = this.res.GAME.loutis[0];
        this.loutis = [];
        for(var i=0;i<loutis.length;i++)
        {
            this.loutis.push(loutis[i]);
        }

        cc.winSize.width;

        this.last_h = 0;
        this.ltzorder = 1000000;
        this.ltcolor = this.res.bgcolor[0];

        cc.winSize.width;


        this.currLoutis = [];
        this.louticolls = [];

        cc.winSize.width;

        this.GAME.state = "stop";
        this.GAME.enemy_num = 9 + Math.floor(Math.random() * 3 + 1);
        this.GAME.score = 0;
        this.GAME.coin = 0;

        cc.winSize.width;

        this.GAME.killhead = 0;
        if(!this.GAME.useZhanShi)
        {
            this.GAME.currPlayer = storage.getStorageCurrPlayer()-1;
            this.GAME.currPlayerTmp = this.GAME.currPlayer;
            cc.winSize.width;
        }
        this.GAME.currGun = storage.getStorageCurrGun()-1;
        this.GAME.currGunTmp = this.GAME.currGun;

        cc.winSize.width;

        this.GAME.playerfuhuo = true;//金币
        this.GAME.playerfangdanyi = true;

        cc.winSize.width;

        this.GAME.playerfuhuovideo = true;//看视频
        this.GAME.yindao = storage.getStorageYindao();

        cc.winSize.width;
    },

    initGmae: function()
    {
        this.initGameData();
        this.node_game.destroyAllChildren();
        this.node_game.y = -792;
        this.node_main.active = true;

        cc.winSize.width;

        this.node_game_ui.active = false;
        this.node_game_ui.boss.active = false;
        this.node_game_ui.killhead.active = false;

        cc.winSize.width;

        this.node_main_coin.getComponent("cc.Label").string = storage.getStorageCoin();
        this.node_main_score.getComponent("cc.Label").string = storage.getStorageScore();

        cc.winSize.width;

        this.getScore(0);
        this.getCoin(0);

        cc.winSize.width;

        this.initLouTis();
        this.initPlayer();

        cc.winSize.width;

        this.updateLouTiOpa(0);
    },

    nextLevel: function()
    {
        var loutis = this.res.GAME.loutis[Math.floor(Math.random() * this.res.GAME.loutis.length)];
        this.loutis = [];
        cc.winSize.width;
        for(var i=0;i<loutis.length;i++)
        {
            this.loutis.push(loutis[i]);
        }
        cc.winSize.width;
        this.last_h = 0;
        this.ltzorder = 1000000;

        cc.winSize.width;

        this.ltcolor = this.res.bgcolor[Math.floor(Math.random()*this.res.bgcolor.length)];
        this.currLoutis = [];

        cc.winSize.width;

        this.GAME.state = "stop";
        this.GAME.enemy_num = 3 + Math.floor(Math.random() * 3 + 1);

        cc.winSize.width;

        this.GAME.killhead = 0;
        this.node_game.destroyAllChildren();
        this.node_game.y = -792;

        cc.winSize.width;

        this.node_game_ui.boss.active = false;
        this.node_game_ui.killhead.active = false;

        this.initLouTis();
        this.initPlayer();

        cc.winSize.width;

        this.updateLouTiOpa(0);
        this.startGmae();

        cc.winSize.width;
    },

    again: function()
    {
        if(cc.isValid(this.node_over))
            this.node_over.hide();

        cc.winSize.width;

        this.openover = false;
        this.initGameData();

        cc.winSize.width;

        this.node_game.destroyAllChildren();
        this.node_game.y = -792;

        cc.winSize.width;

        this.node_game_ui.boss.active = false;
        this.node_game_ui.killhead.active = false;

        cc.winSize.width;

        this.getScore(0);
        this.getCoin(0);

        cc.winSize.width;

        this.initLouTis();
        this.initPlayer();

        cc.winSize.width;

        this.updateLouTiOpa(0);
        this.startGmae();

        cc.winSize.width;
    },

    click: function(event,data,page)
    {
        if(data == "start")
        {
            this.wxQuanState(false);
            this.startGmae();
            cc.winSize.width;
            this.openTishi();
        }
        else if(data == "juese")
        {
            this.openJuese();
            cc.winSize.width;
        }
        else if(data == "home")
        {
            this.goMain();
            cc.winSize.width;
        }
        else if(data == "junhuo")
        {
            this.openGun();
            cc.winSize.width;
        }
        else if(data == "setting")
        {
            this.wxQuanState(false);
            this.openSetting();
            cc.winSize.width;
        }
        else if(data == "lingqu")
        {
            this.wxQuanState(false);
            if(this.openover)
                this.wxCloseOver();
           this.openCard();

           cc.winSize.width;
        }
        else if(data == "duihuan")
        {
            this.wxQuanState(false);
            this.openDuihuan();

            cc.winSize.width;
        }
        else if(data == "rank")
        {
            this.wxQuanState(false);
            this.openRank();

            cc.winSize.width;
        }
        else if(data == "fuhuo_card")
        {
            this.fuhuo(true);

            cc.winSize.width;
        }
        else if(data == "grouprank")
        {
            this.wxGropShare();
            qianqista.event("btn_grouprank");

            cc.winSize.width;
        }
        else if(data == "more")
        {
            this.wxMore();
            qianqista.event("btn_more");

            cc.winSize.width;
        }
        else if(data == "more2")
        {
            this.wxMore2();
            qianqista.event("btn_more_over");

            cc.winSize.width;
        }
        else if(data == "yindao")
        {
            this.node_game_ui.yindao.active = false;
            this.playerFire();
            storage.setStorageYindao(1);
            this.GAME.yindao = 1;

            cc.winSize.width;
        }
        else if(data == "chengjiu")
        {
            this.openChengjiu();
            qianqista.event("btn_chengjiu");

            cc.winSize.width;
        }
        else if(data == "qiandao")
        {
            this.openQianDao();
            qianqista.event("btn_qiandao");

            cc.winSize.width;
        }
        else if(data == "lingjiang")
        {
            this.openAward();
            this.wxQuanState(false);
            qianqista.event("btn_lingjiang");

            cc.winSize.width;
        }
        else if(data == "adlingqu")
        {
            //this.res.showToast("敬请期待！");
            this.wxVideoShow(1);
            qianqista.event("main_video");

            cc.winSize.width;
        }
        else if(data == "zhanshi")
        {
            this.openzhanshi();

            cc.winSize.width;
        }
        else if(data == "linggun")
        {
            this.openLingGun();

            cc.winSize.width;
        }
        else if(data == "gongzhonghao")
        {
            this.openGuanZhu();
        }

        cc.log(data);
    },

    openTishi: function()
    {
        var playnum = cc.sys.localStorage.getItem("playnum");
        playnum = playnum ? playnum : 0;

        cc.winSize.width;

        if(playnum == 1)
        {
            var tishi = cc.instantiate(this.res.node_tishi);
            this.node.addChild(tishi);
            this.node_tishi = tishi.getComponent("tishi");
            this.node_tishi.show();
        }

        cc.winSize.width;

        playnum ++;
        cc.sys.localStorage.setItem("playnum",playnum);
    },

    openGuanZhu: function()
    {
        var guanzhu = cc.instantiate(this.res.node_guanzhu);
        this.node.addChild(guanzhu);

        cc.winSize.width;

        this.node_guanzhu = guanzhu.getComponent("guanzhu");
        this.node_guanzhu.show();
    },

    openXuming: function()
    {
        var xuming = cc.instantiate(this.res.node_xuming);
        this.node.addChild(xuming);

        cc.winSize.width;

        this.node_xuming = xuming.getComponent("xuming");
        this.node_xuming.show();
    },

    openRank: function()
    {
        this.wxRank();
        var rank = cc.instantiate(this.res.node_rank);
        this.node.addChild(rank);

        cc.winSize.width;

        this.node_rank = rank.getComponent("rank");
        this.node_rank.show();
    },

    openDuihuan: function()
    {
        //var duihuan = cc.instantiate(this.res.node_duihuan);
        //this.node.addChild(duihuan);
        //
        //cc.winSize.width;
        //
        //this.node_duihuan = duihuan.getComponent("duihuan");
        //this.node_duihuan.show();
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            wx.openCustomerServiceConversation({});
        }

        qianqista.event("btn_linghongbao");
    },

    openCard: function()
    {
        var card = cc.instantiate(this.res.node_card);
        this.node.addChild(card);

        cc.winSize.width;

        this.node_card = card.getComponent("card");
        this.node_card.show();

        qianqista.event("btn_fangdanyi");
    },

    openCoinNode: function()
    {
        var coin = cc.instantiate(this.res.node_coin);
        this.node.addChild(coin);

        cc.winSize.width;

        this.node_coin = coin.getComponent("coin");
        this.node_coin.show();
    },

    openLingGun: function()
    {
        this.wxQuanState(false);
        
        var linggun = cc.instantiate(this.res.node_linggun);
        this.node.addChild(linggun);

        cc.winSize.width;

        this.node_linggun = linggun.getComponent("linggun");
        this.node_linggun.show();
    },

    

    openzhanshi: function()
    {
        this.wxQuanState(false);
        var zhanshi = cc.instantiate(this.res.node_zhanshi);
        this.node.addChild(zhanshi);

        cc.winSize.width;

        this.node_zhanshi = zhanshi.getComponent("zhanshi");
        this.node_zhanshi.show();
    },

    openSetting: function()
    {
        var setting = cc.instantiate(this.res.node_setting);
        this.node.addChild(setting);

        cc.winSize.width;

        this.node_setting = setting.getComponent("setting");
        this.node_setting.show();
    },

    

    updateDian: function()
    {
        var qiandao_dian = cc.find("qiandao/dian",this.node_main);
        var lingjiang_dian = cc.find("lingjiang/dian",this.node_main);
        var chengjiu_dian = cc.find("chengjiu/dian",this.node_main);
        
        cc.winSize.width;

        qiandao_dian.active = false;
        lingjiang_dian.active = false;
        chengjiu_dian.active = false;

        cc.winSize.width;

        if(cc.isValid(this.node_over))
            this.node_over.updateDian(false);

        cc.winSize.width;

        var currQianDao = storage.getStorageQianDao();
        var currQianDaoTime = storage.getStorageQianDaoTime();
        var now = new Date().getDate();
        currQianDao = parseInt(currQianDao)+1;

        cc.winSize.width;

        for(var i=1;i<=7;i++)
        {
            if(i==currQianDao && now != currQianDaoTime)
            {
                qiandao_dian.active = true;
                break;
            }
        }

        cc.winSize.width;


        var inviteNum = storage.getStorageInviteNum();
        var inviteAwardNum = storage.getStorageInviteAwardNum();
        if(inviteAwardNum<10 &&  parseInt(inviteAwardNum) <  parseInt(inviteNum))
        {
            lingjiang_dian.active = true;
        }

        cc.winSize.width;

        var isshow = false;
        for(var i=1;i<=5;i++) {
            if (i == 1) {
                var num = storage.getStorageHitEnemyNum();
                var awardnum = storage.getStorageHitEnemyAwardNum();
                if (awardnum >= this.res.chengjiuconfig.hitenemy.length) {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.res.chengjiuconfig.hitenemy[awardnum];

                if (!isend && num >= data.num) {
                    isshow = true;
                    break;
                }

            }
            else if (i == 2) {
                var num = storage.getStorageHitHeadNum();
                var awardnum = storage.getStorageHitHeadAwardNum();
                var isend = false;
                if (awardnum >= this.res.chengjiuconfig.hithead.length) {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.res.chengjiuconfig.hithead[awardnum];
                if (!isend && num >= data.num) {
                    isshow = true;
                    break;
                }
            }
            else if (i == 3) {
                var num = storage.getStorageHitBossNum();
                var awardnum = storage.getStorageHitBossAwardNum();
                var isend = false;
                if (awardnum >= this.res.chengjiuconfig.hitboss.length) {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.res.chengjiuconfig.hitboss[awardnum];
                if (!isend && num >= data.num) {
                    isshow = true;
                    break;
                }
            }
            else if (i == 4) {
                var num = storage.getStorageGunJieSuoNum();
                num = parseInt(num) + parseInt(storage.getStorageGunJieSuoNum2());
                var awardnum = storage.getStorageGunJieSuoAwardNum();
                var isend = false;
                if (awardnum >= this.res.chengjiuconfig.jiesuogun.length) {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.res.chengjiuconfig.jiesuogun[awardnum];
                if (!isend && num >= data.num) {
                    isshow = true;
                    break;
                }
            }
            else if (i == 5) {
                var num = storage.getStorageRoleJieSuoNum();
                var awardnum = storage.getStorageRoleJieSuoAwardNum();
                var isend = false;
                if (awardnum >= this.res.chengjiuconfig.jiesuorole.length) {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.res.chengjiuconfig.jiesuorole[awardnum];
                if (!isend && num >= data.num) {
                    isshow = true;
                    break;
                }
            }
        }

        if(isshow)
        {
            chengjiu_dian.active = true;
            if(cc.isValid(this.node_over))
                this.node_over.updateDian(true);

            cc.winSize.width;
        }
    },

    

    openAward: function()
    {
        var award = cc.instantiate(this.res.node_award);
        this.node.addChild(award);

        cc.winSize.width;

        this.node_award = award.getComponent("award");
        this.node_award.show();
    },


    judgeChengjiuUI: function()
    {
        var awardnum = storage.getStorageGunJieSuoAwardNum();
        if(awardnum<this.res.chengjiuconfig.jiesuogun.length)
        {
            var num = storage.getStorageGunJieSuoNum();
            num = parseInt(num) + parseInt(storage.getStorageGunJieSuoNum2());
            var data = this.res.chengjiuconfig.jiesuogun[awardnum];

            cc.winSize.width;

            if(num >= data.num)
            {
                this.res.showToastCJ();
                storage.playSound(this.res.audio_chengjiu);
                return;
            }
        }

        var awardnum2 = storage.getStorageRoleJieSuoAwardNum();
        if(awardnum2<this.res.chengjiuconfig.jiesuorole.length)
        {
            var num = storage.getStorageRoleJieSuoNum();
            var data = this.res.chengjiuconfig.jiesuorole[awardnum2];

            cc.winSize.width;

            if(num >= data.num)
            {
                this.res.showToastCJ();
                storage.playSound(this.res.audio_chengjiu);
                return;
            }
        }
    },

    judgeChengjiuGame: function()
    {
        var awardnum = storage.getStorageHitEnemyAwardNum();
        var toastnum = storage.getStorageHitEnemyToastNum();
        if(awardnum<this.res.chengjiuconfig.hitenemy.length && toastnum == awardnum)
        {
            var num = storage.getStorageHitEnemyNum();
            var data = this.res.chengjiuconfig.hitenemy[awardnum];

            cc.winSize.width;

            if(num >= data.num)
            {
                storage.setStorageHitEnemyToastNum(parseInt(toastnum)+1);
                this.res.showToastCJ();
                storage.playSound(this.res.audio_chengjiu);
                return;
            }
        }

        var awardnum2 = storage.getStorageHitHeadAwardNum();
        var toastnum2 = storage.getStorageHitHeadToastNum();
        if(awardnum2<this.res.chengjiuconfig.hithead.length && toastnum2 == awardnum2)
        {
            var num = storage.getStorageHitHeadNum();
            var data = this.res.chengjiuconfig.hithead[awardnum2];

            cc.winSize.width;

            if(num >= data.num)
            {
                storage.setStorageHitHeadToastNum(parseInt(toastnum2)+1);
                this.res.showToastCJ();
                storage.playSound(this.res.audio_chengjiu);
                return;
            }
        }

        var awardnum3 = storage.getStorageHitBossAwardNum();
        var toastnum3 = storage.getStorageHitBossToastNum();
        if(awardnum3<this.res.chengjiuconfig.hitboss.length && toastnum3 == awardnum3)
        {
            var num = storage.getStorageHitBossNum();
            var data = this.res.chengjiuconfig.hitboss[awardnum3];

            cc.winSize.width;

            if(num >= data.num)
            {
                storage.setStorageHitBossToastNum(parseInt(toastnum3)+1);
                this.res.showToastCJ();
                storage.playSound(this.res.audio_chengjiu);
                return;
            }
        }
    },

    openChengjiu: function()
    {
        this.wxQuanState(false);
        this.node_main.active = false;

        cc.winSize.width;
        
        var chengjiu = cc.instantiate(this.res.node_chengjiu);
        this.node.addChild(chengjiu);
        this.node_chengjiu = chengjiu.getComponent("chengjiu");
        this.node_chengjiu.show();
    },

    openQianDao: function()
    {
        this.wxQuanState(false);

        var qiandao = cc.instantiate(this.res.node_qiandao);
        this.node.addChild(qiandao);

        cc.winSize.width;

        this.node_qiandao = qiandao.getComponent("qiandao");
        this.node_qiandao.show();

    },

    openGun: function()
    {
        this.wxQuanState(false);
        this.node_main.active = false;
        if(cc.isValid(this.node_over))
            this.node_over.hide();

        cc.winSize.width;

        var gun = cc.instantiate(this.res.node_gun);
        this.node.addChild(gun);
        this.node_gun = gun.getComponent("gun");
        this.node_gun.show();
    },

    openJuese: function()
    {
        this.wxQuanState(false);
        this.node_main.active = false;
        if(cc.isValid(this.node_over))
            this.node_over.hide();

        cc.winSize.width;

        var role = cc.instantiate(this.res.node_role);
        this.node.addChild(role);
        this.node_role = role.getComponent("role");
        this.node_role.show();
    },

    startGmae: function()
    {
        var self = this;
        this.node_main.active = false;
        this.node_game_ui.active = true;
        this.movenum = 0;
        this.playerMove(false);

        cc.winSize.width;

        this.node.runAction(cc.sequence(
            cc.delayTime(0.3),
            cc.callFunc(function(){
                self.GAME.state = "start";
            })
        ));

        cc.winSize.width;

        this.wxBannerShow();
    },

    goMain: function()
    {
        this.openover = false;
        this.wxQuanState(true);

        cc.winSize.width;

        this.wxCloseOver();
        this.wxCloseRank();
        this.initGmae();

        cc.winSize.width;
    },

    getScore: function(score)
    {
        var gunConf = this.res.gunsconfig[this.GAME.currGun];
        score = score * gunConf.score;
        this.GAME.score += score;
        this.node_game_ui.score.getComponent("cc.Label").string = Math.floor(this.GAME.score)+"";
    },

    getCoin: function(coin)
    {
        this.GAME.coin += coin;
        this.node_game_ui.coin.getComponent("cc.Label").string = Math.floor(this.GAME.coin)+"";
    },

    getLouTi: function(type)
    {
        cc.winSize.width;
        return cc.instantiate(this.res.loutis[type-1]);
    },

    initLouTis: function()
    {
        var s = cc.winSize;
        var currH = 600;
        if(currH < s.height)
        {
            var index = 0;
            cc.winSize.width;
            for(var i=0;i<this.loutis.length;i++)
            {
                var item = this.loutis[i];
                var louti = this.getLouTi(item[1]);
                var b = cc.find("b",louti);
                for(var num=1;num<=item[1];num++)
                {
                    var ti = cc.find("ti"+num,louti);
                    ti.color = this.ltcolor;
                    if(item[0]==1)
                    {
                        ti.x = ti.x - item[2]*this.tih - this.tih*num;
                    }
                    else
                    {
                        ti.x = s.width + item[2]*this.tih + this.tih*num;
                    }
                }

                cc.winSize.width;

                louti.opacity = 0;
                louti.color = this.ltcolor;
                louti.y = this.last_h;
                b.height = s.height;
                b.color = this.ltcolor;
                louti.data = item;
                this.node_game.addChild(louti,this.ltzorder);
                this.currLoutis.push(louti);

                cc.winSize.width;

                //添加物品
                // var r = Math.random();
                // if(r>0.6)
                // {
                //     var wujian = cc.instantiate(this.res.wujians[Math.floor(Math.random()*this.res.wujians.length)]);
                //     var ti = cc.find("ti"+item[1],louti);
                //     wujian.x = (ti.width/2 - ti.x)/2;
                //     wujian.y = this.tih;
                //     wujian.color = this.ltcolor;
                //     //wujian.opacity = 100;
                //     if(item[0]==2)
                //     {
                //         wujian.scaleX = -1;
                //     }
                //     ti.addChild(wujian);
                // }


                this.last_h = this.last_h + item[1]*this.tih;
                this.ltzorder--;
                index = i;
                if(currH > s.height*1.0)
                {
                    currH += item[1]*this.tih;
                    break;
                }
                currH += item[1]*this.tih;

                cc.winSize.width;
            }

            this.loutis.splice(0,index+1);

            cc.winSize.width;
        }
    },
    addLouTis: function()
    {
        var s = cc.winSize;
        if(this.loutis.length>0)
        {
            var item = this.loutis[0];
            var louti = this.getLouTi(item[1]);
            var b = cc.find("b",louti);

            cc.winSize.width;

            for(var num=1;num<=item[1];num++)
            {
                var ti = cc.find("ti"+num,louti);
                ti.color = this.ltcolor;
                if(item[0]==1)
                {
                    ti.x = ti.x - item[2]*this.tih - this.tih*num;
                }
                else
                {
                    ti.x = s.width + item[2]*this.tih + this.tih*num;
                }
            }
            louti.opacity = 0;
            louti.color = this.ltcolor;
            louti.y = this.last_h;
            louti.data = item;
            b.height = s.height;
            b.color = this.ltcolor;
            this.node_game.addChild(louti,this.ltzorder);
            this.currLoutis.push(louti);

            cc.winSize.width;

            //添加物品
            // var r = Math.random();
            // if(r>0.6)
            // {
            //     var wujian = cc.instantiate(this.res.wujians[Math.floor(Math.random()*this.res.wujians.length)]);
            //     var ti = cc.find("ti"+item[1],louti);
            //     wujian.x = (ti.width/2 - ti.x)/2;
            //     wujian.y = this.tih;
            //     wujian.color = this.ltcolor;
            //     //wujian.opacity = 100;
            //     if(item[0]==2)
            //     {
            //         wujian.scaleX = -1;
            //     }
            //     ti.addChild(wujian);
            // }

            this.last_h = this.last_h + item[1]*this.tih;
            this.ltzorder--;

            this.loutis.splice(0,1);

            cc.winSize.width;
        }

        for(var i=0;i<this.currLoutis.length;i++)
        {
            var louti = this.currLoutis[i];
            var pos = this.node_game.convertToWorldSpace(louti.position);

            cc.winSize.width;

            if(pos.y+600 < 0)
            {
                louti.destroy();
                this.currLoutis.splice(0,1);
                break;
            }
        }
    },

    updateLouTiPos: function()
    {
        var s = cc.winSize;
        var pos = this.node_game.convertToWorldSpace(this.player.position);
        var dis = pos.y - this.lastPlayerPos.y;
        var ac = cc.moveBy(dis/100,0,-dis).easing(cc.easeSineInOut());
        this.node_game.runAction(ac.clone());

        cc.winSize.width;

        //this.enemy.runAction(ac.clone());
        //
        //for(var i=0;i<this.louticolls.length;i++)
        //{
        //    ac = cc.sequence(
        //        cc.moveBy(dis/100/2,0,-dis/2).easing(cc.easeSineInOut()),
        //        cc.moveBy(dis/100/2,0,dis/2).easing(cc.easeSineInOut())
        //    );
        //    this.louticolls[i].runAction(ac.clone());
        //}

        this.addLouTis();
        this.updateLouTiOpa(dis/100);
        this.rotateGun();

        cc.winSize.width;
    },

    createYindao: function()
    {
        this.node_game_ui.yindao.active = true;
        var mask = cc.find("mask",this.node_game_ui.yindao);
        var hand = cc.find("hand",this.node_game_ui.yindao);
        var txt = cc.find("txt",this.node_game_ui.yindao);

        cc.winSize.width;

        var w = this.player.gun.width + 150;
        if(this.player.height > w)
            w = this.player.height + 150;

        cc.winSize.width;

        mask.width = w;
        mask.height = w;
        mask.x = this.player.x - this.player.height/2;
        var pos = this.node_game.convertToWorldSpaceAR(this.player.position);
        mask.y = pos.y-50;

        cc.winSize.width;


        hand.x += mask.x;
        hand.y += mask.y;
        txt.x += mask.x;
        txt.y += mask.y;

        cc.winSize.width;

        hand.runAction(cc.repeatForever(cc.sequence(
            cc.moveBy(0.5,0,50).easing(cc.easeSineIn()),
            cc.moveBy(0.5,0,-50).easing(cc.easeSineIn())
        )));

        cc.winSize.width;
    },

    rotateGun: function()
    {
        this.player.gun.stopAllActions();

        this.player.aim.active = true;
        this.player.ismove = false;

        cc.winSize.width;

        if(this.GAME.yindao == 0)
        {
            var self = this;
            var ang = cc.pAngle(this.enemy.position,this.player.position);

            cc.winSize.width;

            ang = cc.radiansToDegrees(ang)/2;
            ac = cc.sequence(
                cc.rotateBy(ang/20/2,-ang).easing(cc.easeIn(1.5)),
                cc.callFunc(function(){
                    self.createYindao();
                })
            );

            cc.winSize.width;

            this.player.gun.runAction(ac);
        }
        else
        {
            var playerConf = this.res.playersconfig[this.GAME.currPlayer];

            var ac = cc.repeatForever(cc.sequence(
                cc.rotateBy(1.1*playerConf.aimSpeed,-60).easing(cc.easeIn(1.5)),
                cc.rotateBy(1.1*playerConf.aimSpeed,60).easing(cc.easeOut(1.5))
            ));

            cc.winSize.width;

            this.player.gun.runAction(ac);
        }
    },

    updateLouTiOpa: function(dt)
    {
        if(dt>0 && this.movenum<2)
            return;

        cc.winSize.width;

        for(var i=0;i<this.currLoutis.length;i++)
        {
            var louti = this.currLoutis[i];
            if(!louti.opindex)
            {
                if(i==0)
                    louti.opindex = 4;
                else
                {
                    louti.opindex = this.currLoutis[i-1].opindex + 1;
                    if(louti.opindex>=this.op.length)
                        louti.opindex = this.op.length-1;

                    cc.winSize.width;
                }
            }
            else
            {
                louti.opindex --;
                if(louti.opindex < 0)
                    louti.opindex = 0;

                cc.winSize.width;
            }
            louti.runAction(cc.fadeTo(dt,this.op[louti.opindex]));
        }

        cc.winSize.width;
    },

    initPlayer: function()
    {
        var s = cc.winSize;
        this.player = cc.instantiate(this.res.players[this.GAME.currPlayer]);
        this.player.x = s.width/2;
        this.player.y = 600;
        this.node_game.addChild(this.player,1000001);

        cc.winSize.width;

        this.player.fangdanyi = cc.instantiate(this.res.fangdanyi);
        this.player.addChild(this.player.fangdanyi,1);
        this.player.fangdanyi.active = false;

        cc.winSize.width;

        var cardnum = storage.getStorageCard();
        if(this.GAME.fangdanyi && cardnum>0 && this.GAME.playerfangdanyi)
        {
            this.player.fangdanyi.active = true;
        }

        var playerConf = this.res.playersconfig[this.GAME.currPlayer];
        var gunConf = this.res.gunsconfig[this.GAME.currGun];

        cc.winSize.width;

        this.player.gun = cc.instantiate(this.res.guns[this.GAME.currGun]);
        this.player.gun.y = this.player.height*0.3 + gunConf.y;
        this.player.addChild(this.player.gun,1);
        this.player.scaleX = -1;
        this.lastPlayerPos = this.node_game.convertToWorldSpace(this.player.position);

        cc.winSize.width;

        this.player.aim = cc.instantiate(this.res.aim_1);
        this.player.aim.y = this.player.gun.y;
        this.player.aim.active = false;
        this.player.aim.line = cc.find("line",this.player.aim);
        this.player.aim.scale = (gunConf.aimLen+playerConf.aimLen)/2;
        this.player.addChild(this.player.aim,0);

        cc.winSize.width;

        this.player.aim.line.rotation = 0;
        this.player.aim.getComponent("cc.ProgressBar").progress = 0;

        cc.winSize.width;

        this.player.gun_fire = cc.instantiate(this.res.gun_fire);
        this.player.gun_fire.y = gunConf.y;
        this.player.gun_fire.x = this.player.gun.width*(1-this.player.gun.anchorX);
        this.player.gun_fire.active = false;
        this.player.gun.addChild(this.player.gun_fire,0);

        cc.winSize.width;
    },

    createEnemy: function()
    {
        if(this.GAME.enemy_num==0)
        {
            this.enemy = cc.instantiate(this.res.bosss[Math.floor(Math.random()*this.res.bosss.length)]);
            this.enemy.enemytype = 4;
            this.enemy.enemycolor = this.res.enemysconfig[2].color;
            this.enemy.hp = Math.floor(Math.random()*10+15);
            this.enemy.zhp = this.enemy.hp;
            this.node_game.addChild(this.enemy,1000001);

            cc.winSize.width;

            var gunConf = this.res.gunsconfig[0];
            this.enemy.gun = cc.instantiate(this.res.guns[0]);
            this.enemy.gun.y = this.enemy.height*0.3 + gunConf.y;
            this.enemy.addChild(this.enemy.gun);

            cc.winSize.width;

            this.enemy.gun_fire = cc.instantiate(this.res.gun_fire);
            this.enemy.gun_fire.y = gunConf.y;
            this.enemy.gun_fire.x = this.enemy.gun.width*(1-this.enemy.gun.anchorX);
            this.enemy.gun_fire.active = false;
            this.enemy.gun.addChild(this.enemy.gun_fire,0);

            cc.winSize.width;

            this.node_game_ui.boss.active = true;
            this.node_game_ui.boss.getComponent("cc.ProgressBar").progress = 1;

            storage.playSound(this.res.audio_boss_chu);

            cc.winSize.width;
        }
        else
        {
            var index = Math.floor(Math.random()*this.res.enemys.length);
            this.enemy = cc.instantiate(this.res.enemys[index]);
            this.enemy.enemyindex = index;
            this.enemy.enemytype = this.res.enemysconfig[index].type;
            this.enemy.enemycolor = this.res.enemysconfig[index].color;
            this.node_game.addChild(this.enemy,1000001);

            cc.winSize.width;

            var gunConf = this.res.gunsconfig[0];
            this.enemy.gun = cc.instantiate(this.res.guns[0]);
            this.enemy.gun.y = this.enemy.height*0.3 + gunConf.y;
            this.enemy.addChild(this.enemy.gun);

            cc.winSize.width;

            this.enemy.gun_fire = cc.instantiate(this.res.gun_fire);
            this.enemy.gun_fire.y = gunConf.y;
            this.enemy.gun_fire.x = this.enemy.gun.width*(1-this.enemy.gun.anchorX);
            this.enemy.gun_fire.active = false;
            this.enemy.gun.addChild(this.enemy.gun_fire,0);

            cc.winSize.width;
        }
        this.GAME.enemy_num --;
        this.enemy.ismove = false;
        //this.enemy.die = true;
    },

    copyEnemy: function()
    {
        var index = this.enemy.enemyindex;
        var enemy = cc.instantiate(this.res.enemys[index]);
        enemy.position = this.enemy.position;

        cc.winSize.width;

        enemy.die = true;
        this.node_game.addChild(enemy,1000001);
        return enemy;
    },

    playerMove: function(isWin)
    {
        if(this.player.ismove)
            return;
        this.player.ismove = true;
        this.movenum ++;
        this.player.isfire = false;
        var self = this;
        var louti = null;

        cc.winSize.width;

        for(var i=0;i<this.currLoutis.length;i++)
        {
            var l = this.currLoutis[i];
            if(!l.ismove)
            {
                l.ismove = true;
                louti = l;
                break;
            }
        }

        cc.winSize.width;

        if(louti)
        {
            var data = louti.data;
            var speed = this.res.playersconfig[this.GAME.currPlayer].speed*700;
            var acs = [];
            var lastp = this.player.position;

            cc.winSize.width;

            if(data[0] == 1)//left
            {
                for(var num=1;num<=data[1];num++) {
                    var ti = cc.find("ti" + num, louti);
                    if(num == 1)
                    {
                        var posx = ti.x+ti.width/2 + this.tih;
                        var posy = this.player.y;
                        acs.push(cc.moveTo(Math.abs(this.player.x-posx)/speed,posx,posy));
                        var posx2 = posx - this.tih;
                        var posy2 = posy + this.tih;
                        acs.push(cc.jumpTo(this.tih*3/speed,posx2,posy2,this.tih,1));
                        lastp = cc.v2(posx2,posy2);

                        cc.winSize.width;

                        acs.push(cc.callFunc(function(){
                            storage.playSound(self.res.audio_foot_1);
                        }));

                        cc.winSize.width;
                    }
                    else if(num == data[1])
                    {
                        var posx = lastp.x - this.tih;
                        var posy = lastp.y + this.tih;
                        acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                        acs.push(cc.callFunc(function(){
                            storage.playSound(self.res.audio_foot_1);
                        }));

                        cc.winSize.width;

                        if(isWin)
                        {
                            var posx2 = -self.player.width;
                            var posy2 = posy;
                            acs.push(cc.moveTo(Math.abs(this.player.x-posx2)/speed/2,posx2,posy2));
                            acs.push(cc.callFunc(function(){
                                self.gameOver(isWin);
                            }));

                            cc.winSize.width;
                        }
                        else
                        {
                            var posx2 = (ti.x+ti.width/2)/2;
                            var posy2 = posy;
                            acs.push(cc.jumpTo(this.tih*3/speed,posx2,posy2,this.tih,1));
                            acs.push(cc.callFunc(function(){
                                self.player.scaleX = 1;
                                self.updateLouTiPos();
                                storage.playSound(self.res.audio_foot_1);
                            }));

                            cc.winSize.width;
                        }

                    }
                    else
                    {
                        var posx = lastp.x - this.tih;
                        var posy = lastp.y + this.tih;
                        acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                        lastp = cc.v2(posx,posy);

                        cc.winSize.width;

                        acs.push(cc.callFunc(function(){
                            storage.playSound(self.res.audio_foot_1);
                        }));
                    }
                }
            }
            else//right
            {
                for(var num=1;num<=data[1];num++) {
                    var ti = cc.find("ti" + num, louti);

                    cc.winSize.width;

                    if(num == 1)
                    {
                        var posx = ti.x-ti.width/2 - this.tih;
                        var posy = this.player.y;
                        acs.push(cc.moveTo(Math.abs(this.player.x-posx)/speed,posx,posy));
                        var posx2 = posx + this.tih;
                        var posy2 = posy + this.tih;
                        acs.push(cc.jumpTo(this.tih*3/speed,posx2,posy2,this.tih,1));
                        lastp = cc.v2(posx2,posy2);

                        cc.winSize.width;

                        acs.push(cc.callFunc(function(){
                            storage.playSound(self.res.audio_foot_1);
                        }));

                        cc.winSize.width;
                    }
                    else if(num == data[1])
                    {
                        var posx = lastp.x + this.tih;
                        var posy = lastp.y + this.tih;
                        acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                        acs.push(cc.callFunc(function(){
                            storage.playSound(self.res.audio_foot_1);
                        }));

                        cc.winSize.width;

                        if(isWin)
                        {
                            var posx2 = cc.winSize.width+self.player.width;
                            var posy2 = posy;
                            acs.push(cc.moveTo(Math.abs(this.player.x-posx2)/speed/2,posx2,posy2));
                            acs.push(cc.callFunc(function(){
                                self.gameOver(isWin);
                            }));

                            cc.winSize.width;
                        }
                        else
                        {
                            var posx2 = (ti.x-ti.width/2) + (ti.width-(ti.x-ti.width/2))/2;
                            var posy2 = posy;
                            acs.push(cc.jumpTo(this.tih*3/speed,posx2,posy2,this.tih,1));
                            acs.push(cc.callFunc(function(){
                                self.player.scaleX = -1;
                                self.updateLouTiPos();
                                storage.playSound(self.res.audio_foot_1);
                            }));

                            cc.winSize.width;
                        }

                    }
                    else
                    {
                        var posx = lastp.x + this.tih;
                        var posy = lastp.y + this.tih;
                        acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                        lastp = cc.v2(posx,posy);

                        cc.winSize.width;

                        acs.push(cc.callFunc(function(){
                            storage.playSound(self.res.audio_foot_1);
                        }));
                    }
                }
            }
            this.player.runAction(cc.sequence(acs));
        }

        cc.winSize.width;

        this.enemyMove();

        cc.winSize.width;
    },

    enemyMove: function()
    {
        if(!this.node_game_ui.boss.active)
            this.createEnemy();
        this.enemy.judgeboss = false;
        var self = this;
        var louti = null;

        cc.winSize.width;

        for(var i=0;i<this.currLoutis.length;i++)
        {
            var l = this.currLoutis[i];
            if(!l.ismove)
            {
                louti = l;
                break;
            }
        }

        cc.winSize.width;

        if(louti)
        {
            var data = louti.data;
            var acs = [];
            var ti = cc.find("ti" + data[1], louti);
            var speed = 700;

            cc.winSize.width;

            if(data[0] == 1)//left
            {
                if(this.enemy.enemytype == 4)
                {
                    if(this.enemy.hp == this.enemy.zhp)
                    {
                        this.enemy.scaleX = 1;
                        this.enemy.x = -this.enemy.width-20;
                        this.enemy.y = louti.y+600 + data[1]*this.tih;

                        cc.winSize.width;

                        var posx = ti.x+ti.width/2 - this.tih/2;
                        var posy = this.enemy.y;

                        acs.push(cc.spawn(cc.rotateBy(0.4,360),cc.jumpTo(0.6,posx,posy,this.tih*5,1)));
                        acs.push(cc.callFunc(function(){
                            storage.playSound(self.res.audio_foot_boss_land);
                            self.node_game.runAction(cc.sequence(
                                cc.moveBy(0.05,cc.v2(0,20)).easing(cc.easeSineIn()),
                                cc.moveBy(0.05,cc.v2(0,-20)).easing(cc.easeSineOut()),
                                cc.moveBy(0.05,cc.v2(0,10)).easing(cc.easeSineIn()),
                                cc.moveBy(0.05,cc.v2(0,-10)).easing(cc.easeSineOut())
                            ));
                            //self.enemy.die = false;
                            self.vibrate();
                        }));

                        cc.winSize.width;
                    }
                    else
                    {
                        this.enemy.ismove = true;
                        var lastp = this.enemy.position;
                        for(var num=1;num<=data[1];num++) {
                            var ti = cc.find("ti" + num, louti);
                            if(num == 1)
                            {
                                var posx = ti.x+ti.width/2 + this.tih;
                                var posy = this.enemy.y;
                                acs.push(cc.moveTo(Math.abs(this.enemy.x-posx)/speed,posx,posy));
                                var posx2 = posx - this.tih;
                                var posy2 = posy + this.tih;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx2,posy2,this.tih,1));
                                lastp = cc.v2(posx2,posy2);

                                cc.winSize.width;

                                acs.push(cc.callFunc(function(){
                                    storage.playSound(self.res.audio_foot_boss_1);
                                }));

                                cc.winSize.width;
                            }
                            else if(num == data[1])
                            {
                                var posx = lastp.x - this.tih;
                                var posy = lastp.y + this.tih;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                                acs.push(cc.callFunc(function(){
                                    storage.playSound(self.res.audio_foot_boss_1);
                                }));

                                cc.winSize.width;

                                var posx2 = ti.x+ti.width/2 - this.enemy.width/2;
                                var posy2 = posy;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx2,posy2,this.tih,1));
                                acs.push(cc.callFunc(function(){
                                    self.enemy.scaleX = 1;
                                    storage.playSound(self.res.audio_foot_boss_1);
                                }));

                                cc.winSize.width;
                            }
                            else
                            {
                                var posx = lastp.x - this.tih;
                                var posy = lastp.y + this.tih;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                                lastp = cc.v2(posx,posy);

                                cc.winSize.width;

                                acs.push(cc.callFunc(function(){
                                    storage.playSound(self.res.audio_foot_boss_1);
                                }));

                                cc.winSize.width;
                            }
                        }
                    }
                }
                else
                {
                    this.enemy.scaleX = 1;
                    this.enemy.x = -this.enemy.width-20;
                    this.enemy.y = louti.y+600 + data[1]*this.tih;

                    cc.winSize.width;

                    var posx = ti.x+ti.width/2 - this.tih/2;
                    var posy = this.enemy.y;


                    acs.push(cc.spawn(
                        cc.repeat(cc.sequence(cc.rotateBy(0.1,-10),cc.rotateBy(0.1,10)),5),
                        cc.moveTo(0.8,posx,posy)
                    ));

                    cc.winSize.width;
                    //acs.push(cc.callFunc(function(){
                    //    self.enemy.die = false;
                    //}));
                }
            }
            else
            {
                if(this.enemy.enemytype == 4)
                {
                    if(this.enemy.hp == this.enemy.zhp)
                    {
                        this.enemy.scaleX = -1;
                        this.enemy.x = ti.width + 20;
                        this.enemy.y = louti.y+600 + data[1]*this.tih;

                        var posx = ti.x-ti.width/2 + this.tih/2;
                        var posy = this.enemy.y;

                        cc.winSize.width;

                        acs.push(cc.spawn(cc.rotateBy(0.4,-360),cc.jumpTo(0.6,posx,posy,this.tih*5,1)));
                        acs.push(cc.callFunc(function(){
                            storage.playSound(self.res.audio_foot_boss_land);
                            self.node_game.runAction(cc.sequence(
                                cc.moveBy(0.05,cc.v2(0,20)).easing(cc.easeSineIn()),
                                cc.moveBy(0.05,cc.v2(0,-20)).easing(cc.easeSineOut()),
                                cc.moveBy(0.05,cc.v2(0,10)).easing(cc.easeSineIn()),
                                cc.moveBy(0.05,cc.v2(0,-10)).easing(cc.easeSineOut())
                            ));
                            //self.enemy.die = false;
                            self.vibrate();
                        }));

                        cc.winSize.width;
                    }
                    else
                    {
                        this.enemy.ismove = true;
                        var lastp = this.enemy.position;
                        for(var num=1;num<=data[1];num++) {
                            var ti = cc.find("ti" + num, louti);
                            if(num == 1)
                            {
                                var posx = ti.x-ti.width/2 - this.tih;
                                var posy = this.enemy.y;
                                acs.push(cc.moveTo(Math.abs(this.enemy.x-posx)/speed,posx,posy));
                                var posx2 = posx + this.tih;
                                var posy2 = posy + this.tih;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx2,posy2,this.tih,1));
                                lastp = cc.v2(posx2,posy2);

                                cc.winSize.width;

                                acs.push(cc.callFunc(function(){
                                    storage.playSound(self.res.audio_foot_boss_1);
                                }));

                                cc.winSize.width;
                            }
                            else if(num == data[1])
                            {
                                var posx = lastp.x + this.tih;
                                var posy = lastp.y + this.tih;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                                acs.push(cc.callFunc(function(){
                                    storage.playSound(self.res.audio_foot_boss_1);
                                }));

                                cc.winSize.width;

                                var posx2 = (ti.x-ti.width/2) + this.enemy.width/2;
                                var posy2 = posy;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx2,posy2,this.tih,1));
                                acs.push(cc.callFunc(function(){
                                    self.enemy.scaleX = -1;
                                    storage.playSound(self.res.audio_foot_boss_1);
                                }));

                                cc.winSize.width;
                            }
                            else
                            {
                                var posx = lastp.x + this.tih;
                                var posy = lastp.y + this.tih;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                                lastp = cc.v2(posx,posy);

                                acs.push(cc.callFunc(function(){
                                    storage.playSound(self.res.audio_foot_boss_1);
                                }));

                                cc.winSize.width;
                            }
                        }
                    }
                }
                else
                {
                    this.enemy.scaleX = -1;
                    this.enemy.x = ti.width + 20;
                    this.enemy.y = louti.y+600 + data[1]*this.tih;

                    var posx = ti.x-ti.width/2 + this.tih/2;
                    var posy = this.enemy.y;

                    cc.winSize.width;

                    acs.push(cc.spawn(
                        cc.repeat(cc.sequence(cc.rotateBy(0.1,10),cc.rotateBy(0.1,-10)),5),
                        cc.moveTo(0.8,posx,posy)
                    ));
                    //acs.push(cc.callFunc(function(){
                    //    self.enemy.die = false;
                    //}));

                    cc.winSize.width;
                }

            }
            acs.push(cc.callFunc(function(){
                self.enemy.ismove = false;
            }));

            cc.winSize.width;

            this.enemy.louti = louti;
            this.enemy.runAction(cc.sequence(acs));

            //添加碰撞组件
            for(var i=1;i<=data[1];i++)
            {
                var ti = cc.find("ti" + i, louti);

                var coll = ti.addComponent('cc.BoxCollider');
                coll.offset = cc.v2(1,this.tih/2);
                coll.size = cc.size(ti.width-2,ti.height-4);
                coll.tag = 4;

                //var coll = cc.instantiate(this.louti_1);
                //coll.position = cc.pAdd(louti.position,ti.position);
                //this.node_game.addChild(coll,1000000001);
                //
                //this.louticolls.push(coll);
            }

            cc.winSize.width;

        }

        cc.winSize.width;
    },

    playerFire: function()
    {
        if(this.player.aim.active)
        {
            var self = this;
            this.player.aim.active = false;
            this.player.kill = false;
            this.player.isfire = true;

            cc.winSize.width;

            var rota = -this.player.gun.rotation;
            var v = cc.v2(1,0);

            if(this.player.scaleX < 1)
            {
                rota = -rota;
                v = cc.v2(-1,0);
            }

            cc.winSize.width;

            var rad = cc.degreesToRadians(rota);
            this.player.gun.stopAllActions();
            this.player.gun.hitheadnum = 0;
            this.player.gun.hitbodynum = 0;
            this.player.gun.firenum = 0;

            cc.winSize.width;

            var gunConf = this.res.gunsconfig[this.GAME.currGun];
            var dis = 1584;
            var bulletspeed = 2200;
            if(cc.sys.os == cc.sys.OS_ANDROID)
                bulletspeed = 1200;

            cc.winSize.width;

            if(gunConf.type == 1)
            {
                var dir = cc.pRotateByAngle(v,cc.v2(0,0),rad);
                var pos = cc.pMult(dir,1584);

                var gw = this.player.gun.width*(1-this.player.gun.anchorX) + 10;

                cc.winSize.width;

                var ac = cc.sequence(
                    cc.callFunc(function(){
                        storage.playSound(self.res.gunaudios[self.GAME.currGun]);
                        var smoke = null;
                        if (self.poolsmokes.size() > 0) {
                            smoke = self.poolsmokes.get();
                            smoke.getComponent("cc.ParticleSystem").resetSystem();

                            cc.winSize.width;
                        } else {
                            smoke = cc.instantiate(self.res.smoke);
                        }

                        cc.winSize.width;

                        smoke.position = cc.pAdd(self.player.position,self.player.aim.position);
                        smoke.position = cc.pAdd(cc.pMult(dir,gw),smoke.position);
                        smoke.scaleX = -self.player.scaleX;
                        self.node_game.addChild(smoke,1000001);
                        smoke.runAction(cc.sequence(
                            cc.delayTime(1),
                            cc.callFunc(function(){
                                self.poolsmokes.put(smoke);
                            })
                        ));

                        cc.winSize.width;

                        var shell = null;
                        if (self.poolshells.size() > 0) {
                            shell = self.poolshells.get();
                            shell.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            shell = cc.instantiate(self.res.shell);
                        }

                        cc.winSize.width;

                        shell.position = cc.pAdd(self.player.position,self.player.aim.position);
                        shell.scaleX = -self.player.scaleX;
                        self.node_game.addChild(shell,1000001);
                        shell.runAction(cc.sequence(
                            cc.delayTime(1),
                            cc.callFunc(function(){
                                self.poolshells.put(shell);
                            })
                        ));

                        cc.winSize.width;

                        self.player.gun_fire.active = true;
                    }),
                    cc.moveBy(0.1,-10,-3),
                    cc.moveBy(0.1,10,3),
                    cc.delayTime(0.2),
                    cc.rotateTo(Math.abs(this.player.gun.rotation)/100, 0),
                    cc.callFunc(function(){
                        self.playerFireEnd();
                    })
                );

                cc.winSize.width;

                this.player.gun.runAction(cc.sequence(cc.delayTime(0.05),
                    cc.callFunc(function(){
                        self.player.gun_fire.active = false;
                    })));
                this.player.gun.runAction(ac);

                cc.winSize.width;


                var bullet = null;
                if (this.poolbullets.size() > 0) {
                    bullet = this.poolbullets.get();
                    bullet.collnum = 0;
                    bullet.stopAllActions();
                } else {
                    bullet = cc.instantiate(this.res.bullet_1);
                }

                cc.winSize.width;

                bullet.position = cc.pAdd(this.player.position,this.player.aim.position);
                bullet.position = cc.pAdd(cc.pMult(dir,gw),bullet.position);
                bullet.opacity = 255;
                this.node_game.addChild(bullet,1000001);
                bullet.diedir = dir;

                cc.winSize.width;

                pos = cc.pAdd(pos,bullet.position);

                //var colls = this.enemy.getComponents("cc.BoxCollider");
                //for(var i=0;i<colls.length;i++)
                //{
                //    var start = this.node_game.convertToWorldSpace(bullet.position);
                //    var end = this.node_game.convertToWorldSpace(pos);
                //    var b = cc.Intersection.lineRect(start,end,colls[i].world.aabb);
                //    if(b)
                //    {
                //        dis = cc.pDistance(bullet.position,cc.v2(this.enemy.x,this.enemy.y+this.enemy.height/2));
                //        pos = cc.pMult(dir,dis);
                //        pos = cc.pAdd(pos,bullet.position);
                //        break;
                //    }
                //}

                var seq = cc.sequence(
                    //cc.delayTime(0.15),
                    //cc.fadeIn(0.05),
                    cc.moveTo(dis/bulletspeed,pos),
                    //cc.fadeOut(0.1),
                    //cc.delayTime(0.3),
                    cc.callFunc(function(){
                        self.enemyFire();
                    }),
                    cc.removeSelf()
                );
                bullet.runAction(seq);

                cc.winSize.width;
            }
            else if(gunConf.type == 2)
            {
                var gw = this.player.gun.width*(1-this.player.gun.anchorX) + 10;

                var dir = cc.pRotateByAngle(v,cc.v2(0,0),rad);

                cc.winSize.width;

                var ac = cc.sequence(
                    cc.callFunc(function(){
                        storage.playSound(self.res.gunaudios[self.GAME.currGun]);
                        var smoke = null;
                        if (self.poolsmokes.size() > 0) {
                            smoke = self.poolsmokes.get();
                            smoke.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            smoke = cc.instantiate(self.res.smoke);
                        }

                        cc.winSize.width;

                        smoke.position = cc.pAdd(self.player.position,self.player.aim.position);
                        smoke.position = cc.pAdd(cc.pMult(dir,gw),smoke.position);
                        smoke.scaleX = -self.player.scaleX;
                        self.node_game.addChild(smoke,1000001);
                        smoke.runAction(cc.sequence(
                            cc.delayTime(1),
                            cc.callFunc(function(){
                                self.poolsmokes.put(smoke);
                            })
                        ));

                        cc.winSize.width;

                        var shell = null;
                        if (self.poolshells.size() > 0) {
                            shell = self.poolshells.get();
                            shell.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            shell = cc.instantiate(self.res.shell);
                        }

                        cc.winSize.width;

                        shell.position = cc.pAdd(self.player.position,self.player.aim.position);
                        shell.scaleX = -self.player.scaleX;
                        self.node_game.addChild(shell,1000001);
                        shell.runAction(cc.sequence(
                            cc.delayTime(1),
                            cc.callFunc(function(){
                                self.poolshells.put(shell);
                            })
                        ));

                        cc.winSize.width;

                        self.player.gun_fire.active = true;
                    }),
                    cc.spawn(
                        cc.sequence(
                            cc.moveBy(gunConf.speed/2,-10,-3),
                            cc.moveBy(gunConf.speed/2,10,3)),
                        cc.sequence(cc.delayTime(0.05),
                            cc.callFunc(function(){
                                self.player.gun_fire.active = false;
                            }))
                    )
                );

                cc.winSize.width;

                var ac2 = cc.sequence(
                    cc.repeat(ac,gunConf.num),
                    cc.delayTime(0.2),
                    cc.rotateTo(Math.abs(this.player.gun.rotation)/100, 0),
                    cc.callFunc(function(){
                        self.playerFireEnd();
                    })
                );

                cc.winSize.width;

                this.player.gun.runAction(ac2);

                for(var i=0;i<gunConf.num;i++)
                {
                    var r = 0;
                    if(i == 1)
                        r = cc.random0To1()*gunConf.angle;
                    else if(i == 2)
                        r = -cc.random0To1()*gunConf.angle;
                    else if(i > 2)
                        r = cc.randomMinus1To1()*gunConf.angle;

                    cc.winSize.width;

                    var dir2 = cc.pRotateByAngle(dir,cc.v2(0,0),cc.degreesToRadians(r));
                    var pos = cc.pMult(dir2,1584);

                    var bullet = null;
                    if (this.poolbullets.size() > 0) {
                        bullet = this.poolbullets.get();
                        bullet.collnum = 0;
                        bullet.stopAllActions();
                    } else {
                        bullet = cc.instantiate(this.res.bullet_1);
                    }

                    cc.winSize.width;

                    bullet.position = cc.pAdd(this.player.position,this.player.aim.position);
                    bullet.position = cc.pAdd(cc.pMult(dir2,gw),bullet.position);
                    bullet.opacity = 0;
                    this.node_game.addChild(bullet,1000001);
                    bullet.diedir = dir2;

                    cc.winSize.width;

                    pos = cc.pAdd(pos,bullet.position);

                    //var colls = this.enemy.getComponents("cc.BoxCollider");
                    //for(var j=0;j<colls.length;j++)
                    //{
                    //    var start = this.node_game.convertToWorldSpace(bullet.position);
                    //    var end = this.node_game.convertToWorldSpace(pos);
                    //    var b = cc.Intersection.lineRect(start,end,colls[j].world.aabb);
                    //    if(b)
                    //    {
                    //        dis = cc.pDistance(bullet.position,cc.v2(this.enemy.x,this.enemy.y+this.enemy.height/2));
                    //        pos = cc.pMult(dir,dis);
                    //        pos = cc.pAdd(pos,bullet.position);
                    //        break;
                    //    }
                    //}
                    var seq = cc.sequence(
                        cc.delayTime(gunConf.speed*(i+1)),
                        cc.fadeIn(0),
                        cc.moveTo(dis/bulletspeed,pos),
                        //cc.fadeOut(0.1),
                        //cc.delayTime(0.3),
                        cc.callFunc(function(){
                            self.judgeEnemyFire();
                        }),
                        cc.removeSelf()
                    );
                    bullet.runAction(seq);

                    cc.winSize.width;
                }
            }
            else if(gunConf.type == 3)
            {
                var gw = this.player.gun.width*(1-this.player.gun.anchorX) + 10;
                var dir = cc.pRotateByAngle(v,cc.v2(0,0),rad);

                var ac = cc.sequence(
                    cc.callFunc(function(){
                        storage.playSound(self.res.gunaudios[self.GAME.currGun]);
                        var smoke = null;
                        if (self.poolsmokes.size() > 0) {
                            smoke = self.poolsmokes.get();
                            smoke.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            smoke = cc.instantiate(self.res.smoke);
                        }

                        cc.winSize.width;

                        smoke.position = cc.pAdd(self.player.position,self.player.aim.position);
                        smoke.position = cc.pAdd(cc.pMult(dir,gw),smoke.position);
                        smoke.scaleX = -self.player.scaleX;
                        self.node_game.addChild(smoke,1000001);
                        smoke.runAction(cc.sequence(
                            cc.delayTime(1),
                            cc.callFunc(function(){
                                self.poolsmokes.put(smoke);
                            })
                        ));

                        cc.winSize.width;

                        var shell = null;
                        if (self.poolshells.size() > 0) {
                            shell = self.poolshells.get();
                            shell.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            shell = cc.instantiate(self.res.shell);
                        }

                        cc.winSize.width;


                        shell.position = cc.pAdd(self.player.position,self.player.aim.position);
                        shell.scaleX = -self.player.scaleX;
                        self.node_game.addChild(shell,1000001);
                        shell.runAction(cc.sequence(
                            cc.delayTime(1),
                            cc.callFunc(function(){
                                self.poolshells.put(shell);
                            })
                        ));

                        cc.winSize.width;

                        self.player.gun_fire.active = true;
                    }),
                    cc.moveBy(0.1,-10,-3),
                    cc.moveBy(0.1,10,3),
                    cc.delayTime(0.2),
                    cc.rotateTo(Math.abs(this.player.gun.rotation)/100, 0),
                    cc.callFunc(function(){
                        self.playerFireEnd();
                    })
                );
                this.player.gun.runAction(cc.sequence(cc.delayTime(0.05),
                    cc.callFunc(function(){
                        self.player.gun_fire.active = false;
                    })));
                this.player.gun.runAction(ac);

                cc.winSize.width;

                for(var i=0;i<gunConf.num;i++)
                {
                    var r = 0;
                    if(i == 1)
                        r = cc.random0To1()*gunConf.angle;
                    else if(i == 2)
                        r = -cc.random0To1()*gunConf.angle;
                    else if(i > 2)
                        r = cc.randomMinus1To1()*gunConf.angle;


                    cc.winSize.width;

                    var dir2 = cc.pRotateByAngle(dir,cc.v2(0,0),cc.degreesToRadians(r));
                    var pos = cc.pMult(dir2,1584);

                    var bullet = null;
                    if (this.poolbullets.size() > 0) {
                        bullet = this.poolbullets.get();
                        bullet.collnum = 0;
                        bullet.stopAllActions();
                    } else {
                        bullet = cc.instantiate(this.res.bullet_1);
                    }

                    cc.winSize.width;


                    bullet.position = cc.pAdd(this.player.position,this.player.aim.position);
                    bullet.position = cc.pAdd(cc.pMult(dir2,gw),bullet.position);
                    //bullet.opacity = 0;
                    this.node_game.addChild(bullet,1000001);
                    bullet.diedir = dir2;

                    pos = cc.pAdd(pos,bullet.position);

                    cc.winSize.width;

                    //var colls = this.enemy.getComponents("cc.BoxCollider");
                    //for(var j=0;j<colls.length;j++)
                    //{
                    //    var start = this.node_game.convertToWorldSpace(bullet.position);
                    //    var end = this.node_game.convertToWorldSpace(pos);
                    //    var b = cc.Intersection.lineRect(start,end,colls[j].world.aabb);
                    //    if(b)
                    //    {
                    //        dis = cc.pDistance(bullet.position,cc.v2(this.enemy.x,this.enemy.y+this.enemy.height/2));
                    //        pos = cc.pMult(dir,dis);
                    //        pos = cc.pAdd(pos,bullet.position);
                    //        break;
                    //    }
                    //}

                    var seq = cc.sequence(
                        //cc.delayTime(0.2),
                        //cc.fadeIn(0.05),
                        cc.moveTo(dis/bulletspeed,pos),
                        //cc.fadeOut(0.1),
                        //cc.delayTime(0.3),
                        cc.callFunc(function(){
                            self.judgeEnemyFire();
                        }),
                        cc.removeSelf()
                    );
                    bullet.runAction(seq);

                    cc.winSize.width;
                }
            }
        }
    },

    playerFireEnd: function()
    {
        this.player.gun.rotation = 0;cc.winSize.width;
        this.player.aim.line.rotation = 0;
        this.player.aim.getComponent("cc.ProgressBar").progress = 0;
    },

    judgeEnemyFire: function()
    {
        this.player.gun.firenum ++;
        var gunConf = this.res.gunsconfig[this.GAME.currGun];cc.winSize.width;
        if(gunConf.num == this.player.gun.firenum)
        {
            var b = false;
            if(this.player.gun.hitheadnum>0)
            {
                b = true;
                storage.playSound(this.res.audio_hit_head_yuyin);
            }
            else
            {
                if(this.player.gun.hitbodynum==0)
                    this.enemyFire();
                else
                    b = true;
            }
            if(b && this.enemy.judgeboss && !this.enemy.die)
            {
                var self = this;cc.winSize.width;
                var ac = cc.sequence(
                    cc.delayTime(0.2),
                    cc.callFunc(function(){
                        self.judgeBossMove();
                    })
                );
                this.node.runAction(ac);cc.winSize.width;
            }
        }
    },

    enemyFire: function()
    {
        var self = this;
        var ang = cc.pAngle(this.player.position,this.enemy.position);
        ang = cc.radiansToDegrees(ang);cc.winSize.width;

        var ac = cc.sequence(
            cc.rotateTo(ang/20*0.2,ang),
            cc.moveBy(0.1,-10,3),
            cc.moveBy(0.1,10,-3),
            cc.callFunc(function(){
                self.enemyFireEnd();
            }),
            cc.delayTime(0.05),
            cc.callFunc(function(){
                self.enemy.gun_fire.active = false;cc.winSize.width;
            })
        );
        this.enemy.gun.runAction(ac);
    },

    enemyFireEnd: function()
    {
        var self = this;
        this.enemy.gun.rotation = 0;
        var dis = 1584;
        var bulletspeed = 2200;
        if(cc.sys.os == cc.sys.OS_ANDROID)
            bulletspeed = 1200;

        var dir = cc.pSub(this.player.position,this.enemy.position);
        dir = cc.pNormalize(dir);cc.winSize.width;

        var gw = this.enemy.gun.width*(1-this.enemy.gun.anchorX) + 10;
        var pos = cc.pMult(dir,cc.winSize.height);

        var bullet = cc.instantiate(this.res.ebullet_1);
        bullet.position = cc.pAdd(this.enemy.position,this.enemy.gun.position);
        bullet.position = cc.pAdd(cc.pMult(dir,gw),bullet.position);
        this.node_game.addChild(bullet,1000001);cc.winSize.width;
        this.player.diedir = dir;

        pos = cc.pAdd(pos,bullet.position);

        //var colls = this.player.getComponents("cc.BoxCollider");
        //for(var j=0;j<colls.length;j++)
        //{
        //    var start = this.node_game.convertToWorldSpace(bullet.position);
        //    var end = this.node_game.convertToWorldSpace(pos);
        //    var b = cc.Intersection.lineRect(start,end,colls[j].world.aabb);
        //    if(b)
        //    {
        //        dis = cc.pDistance(bullet.position,cc.v2(this.player.x,this.player.y+this.player.height/2));
        //        pos = cc.pMult(dir,dis);
        //        pos = cc.pAdd(pos,bullet.position);
        //        break;
        //    }
        //}

        var seq = cc.sequence(
            cc.moveTo(dis/bulletspeed,pos),
            cc.callFunc(function(){
                self.killPlayer();
            }),
            cc.removeSelf()
        );
        bullet.runAction(seq);cc.winSize.width;

        storage.playSound(this.res.gunaudios[0]);

        var smoke = null;
        if (this.poolsmokes.size() > 0) {
            smoke = this.poolsmokes.get();
            smoke.getComponent("cc.ParticleSystem").resetSystem();
        } else {
            smoke = cc.instantiate(this.res.smoke);cc.winSize.width;
        }
        smoke.position = cc.pAdd(this.enemy.position,this.enemy.gun.position);
        smoke.position = cc.pAdd(cc.pMult(dir,gw),smoke.position);
        smoke.scaleX = -this.enemy.scaleX;
        this.node_game.addChild(smoke,1000001);
        smoke.runAction(cc.sequence(
            cc.delayTime(1),
            cc.callFunc(function(){
                self.poolsmokes.put(smoke);
            })
        ));

        var shell = null;cc.winSize.width;
        if (this.poolshells.size() > 0) {
            shell = this.poolshells.get();
            shell.getComponent("cc.ParticleSystem").resetSystem();
        } else {
            shell = cc.instantiate(this.res.shell);
        }
        shell.position = cc.pAdd(this.enemy.position,this.enemy.gun.position);
        shell.scaleX = -this.enemy.scaleX;cc.winSize.width;
        this.node_game.addChild(shell,1000001);
        shell.runAction(cc.sequence(
            cc.delayTime(1),
            cc.callFunc(function(){
                self.poolshells.put(shell);
            })
        ));

        this.enemy.gun_fire.active = true;cc.winSize.width;
    },

    updateAim: function()
    {
        if(this.player.aim.active)
        {
            var ang = -this.player.gun.rotation;
            var zpro = 60/360;
            var pro = ang/60*zpro;
            this.player.aim.line.rotation = -ang;cc.winSize.width;
            this.player.aim.getComponent("cc.ProgressBar").progress = pro;
        }
    },

    killEnemy: function(isHead)
    {
        if(this.enemy.die)
            return;
        var self = this;
        this.player.kill = true;
        //得分
        var score = 5;
        if(this.enemy.enemytype != 1)
            score = 10;
        var disnum = Math.abs(this.enemy.x - this.player.x)/this.tih;
        if(disnum>5)
            score *= 2;cc.winSize.width;
        if(isHead)
            score *= 2;

        this.getScore(score);cc.winSize.width;


        var hit = null;
        if (this.poolhits.size() > 0) {
            hit = this.poolhits.get();
            hit.stopAllActions();
        } else {
            hit = cc.instantiate(this.res.hit);
        }
        hit.scale = 0;
        hit.color = this.enemy.enemycolor;cc.winSize.width;
        hit.position = this.enemy.position;
        hit.y += this.enemy.height/2;
        this.node_game.addChild(hit,1000001);
        var sct = 0.5;cc.winSize.width;
        if(isHead)
        {
            this.player.gun.hitheadnum++;
            this.GAME.killhead ++;
            var killhscore = this.GAME.killhead*10;
            if(this.GAME.killhead>=2)
                killhscore += 5*this.GAME.killhead;
            this.node_game_ui.killhead.getComponent("cc.Label").string = "爆头x"+this.GAME.killhead+" 得分"+killhscore;
            this.node_game_ui.killhead.active = true;cc.winSize.width;
            sct = 1;
            this.addCoin();
            if(disnum>7)
                this.addCoin();

            this.node_game_ui.hitbg.runAction(cc.sequence(
                cc.fadeIn(0.05),
                cc.fadeOut(0.05)
            ));
            this.node_game.runAction(cc.sequence(
                cc.moveBy(0.05,cc.v2(20,10)).easing(cc.easeSineIn()),
                cc.moveBy(0.05,cc.v2(-20,-10)).easing(cc.easeSineOut()),
                cc.moveBy(0.05,cc.v2(0,10)).easing(cc.easeSineIn()),
                cc.moveBy(0.05,cc.v2(0,-10)).easing(cc.easeSineOut())
            ));

            this.vibrate();cc.winSize.width;
            //this.playSound(this.res.audio_hit_head);


            var par = null;
            if (this.poolbigbloods.size() > 0) {
                par = this.poolbigbloods.get();
                par.getComponent("cc.ParticleSystem").resetSystem();
            } else {
                par = cc.instantiate(this.bigblood);
            }
            par.getComponent("cc.ParticleSystem").startColor = this.enemy.enemycolor;cc.winSize.width;
            par.getComponent("cc.ParticleSystem").endColor = this.enemy.enemycolor;
            par.position = hit.position;
            par.scaleX = -this.enemy.scaleX;
            this.node_game.addChild(par,1000001);
            par.runAction(cc.sequence(
                cc.delayTime(1),
                cc.callFunc(function(){
                    self.poolbigbloods.put(par);
                })
            ));

            storage.setStorageHitHeadNum(parseInt(storage.getStorageHitHeadNum())+1);cc.winSize.width;
        }
        else
        {
            this.player.gun.hitbodynum ++;
            this.node_game_ui.killhead.active = false;
            var killhscore = this.GAME.killhead*10;
            if(this.GAME.killhead>=2)
                killhscore += 5*this.GAME.killhead;
            this.getScore(killhscore);cc.winSize.width;
            this.GAME.killhead = 0;
            //this.playSound(this.res.audio_hit_torso);

            var par = null;
            if (this.poolbloods.size() > 0) {
                par = this.poolbloods.get();
                par.getComponent("cc.ParticleSystem").resetSystem();cc.winSize.width;
            } else {
                par = cc.instantiate(this.res.blood);
            }
            par.getComponent("cc.ParticleSystem").startColor = this.enemy.enemycolor;
            par.getComponent("cc.ParticleSystem").endColor = this.enemy.enemycolor;
            par.position = hit.position;
            par.scaleX = -this.enemy.scaleX;cc.winSize.width;
            this.node_game.addChild(par,1000001);

            par.runAction(cc.sequence(
                cc.delayTime(1),
                cc.callFunc(function(){
                    self.poolbloods.put(par);
                })
            ));
        }
        var seq = cc.sequence(
            cc.scaleTo(0.3,sct,sct).easing(cc.easeSineIn()),
            cc.callFunc(function(){
                self.poolhits.put(hit);cc.winSize.width;
            })
        );
        hit.runAction(seq);


        storage.setStorageHitEnemyNum(parseInt(storage.getStorageHitEnemyNum())+1);

        if(this.enemy.enemytype == 4)
        {
            if(!this.enemy.ismove)
            this.enemy.stopAllActions();

            var playerConf = this.res.playersconfig[this.GAME.currPlayer];
            var gunConf = this.res.gunsconfig[this.GAME.currGun];
            if(this.enemy.hp > 0)
            {
                //if(this.enemy.hp%3 == 0)
                //    storage.playSound(this.res.audio_boss_hurt_1);
                //else if(this.enemy.hp%3 == 1)
                //    storage.playSound(this.res.audio_boss_hurt_2);
                //else
                //    storage.playSound(this.res.audio_boss_hurt_3);
                var hhp = (gunConf.fire+playerConf.fire);
                if(isHead)
                    hhp *= 2;
                this.enemy.hp -= (gunConf.fire+playerConf.fire);
                if(this.enemy.hp<0)
                    this.enemy.hp = 0;
                this.node_game_ui.boss.getComponent("cc.ProgressBar").progress = this.enemy.hp/this.enemy.zhp;

                var hpbg = new cc.Node();cc.winSize.width;
                var hp = hpbg.addComponent("cc.Label");
                hp.string = "-"+hhp;
                hpbg.position = this.enemy.position;
                hpbg.y += this.enemy.height;
                this.node_game.addChild(hpbg,1000000000);cc.winSize.width;

                hpbg.runAction(cc.sequence(
                    cc.spawn(
                        cc.moveBy(0.5,Math.random()*80,100).easing(cc.easeSineOut()),
                        cc.scaleTo(0.5,1.4).easing(cc.easeSineOut()),
                        cc.fadeOut(0.7)
                    ),
                    cc.removeSelf()
                ));
            }
            if(this.enemy.hp > 0)
            {
                var dis = 20;
                if(this.enemy.x < cc.winSize.width/2)
                    dis = -dis;
                var ac = cc.sequence(
                    cc.moveBy(0.06,cc.v2(dis,0)),
                    cc.moveBy(0.06,cc.v2(-dis,0)),
                    cc.delayTime(0.3),
                    cc.callFunc(function(){
                        self.removeColl();
                        self.playerMove(false);cc.winSize.width;
                    })
                );
                if(!this.enemy.ismove && !this.enemy.judgeboss)
                    this.enemy.runAction(ac);
                else
                    this.enemy.judgeboss = true;
            }
            else
            {
                this.enemy.judgeboss = false;cc.winSize.width;
                this.node.stopActionByTag(1000);
                this.removeColl();
                var roang = 180;
                var dis = cc.winSize.width - this.enemy.x;
                if(this.enemy.scaleX == 1)
                {
                    roang = -roang;cc.winSize.width;
                    dis = this.enemy.x;
                }
                dis += 100;
                var pos = cc.pAdd(this.enemy.position,cc.pMult(this.enemy.diedir, dis));
                var ac = cc.sequence(
                    cc.spawn(
                        cc.jumpTo(dis/900,pos,dis/2,1),
                        cc.rotateBy(dis/900,roang)
                    ),
                    cc.callFunc(function(){
                        self.playerMove(true);cc.winSize.width;
                    }),
                    cc.removeSelf()
                );
                this.enemy.runAction(ac);
                this.enemy.die = true;

                this.node_game_ui.killhead.active = false;
                this.getScore(10*this.GAME.killhead);cc.winSize.width;
                this.GAME.killhead = 0;

                this.showChuKou();

                storage.setStorageHitBossNum(parseInt(storage.getStorageHitBossNum())+1);
            }
        }
        else
        {
            this.removeColl();
            var roang = 180;cc.winSize.width;
            var dis = cc.winSize.width - this.enemy.x;
            if(this.enemy.scaleX == 1)
            {
                roang = -roang;
                dis = this.enemy.x;
            }
            dis += 100;
            var pos = cc.pAdd(this.enemy.position,cc.pMult(this.enemy.diedir, dis));cc.winSize.width;

            var ac = cc.sequence(
                cc.spawn(
                    cc.jumpTo(dis/900,pos,dis/2,1),
                    cc.rotateBy(dis/900,roang)
                ),
                cc.callFunc(function(){
                    self.playerMove(false);
                }),
                cc.removeSelf()
            );
            //var enemy = this.copyEnemy();
            //enemy.runAction(ac);

            this.enemy.die = true;
            this.enemy.runAction(ac);cc.winSize.width;
        }
        this.judgeChengjiuGame();
    },

    showChuKou: function()
    {
        var data = this.enemy.louti.data;

        var chukou = cc.instantiate(this.res.chukou);
        chukou.y = this.enemy.louti.y+600 + data[1]*this.tih;
        if(data[0] == 2)
        {
            chukou.x = cc.winSize.width - chukou.width;
        }
        else
        {
            chukou.x = chukou.width;cc.winSize.width;
            chukou.scaleX = -1;
        }
        this.node_game.addChild(chukou,this.enemy.louti.zOrder);
    },

    removeColl: function()
    {
        //移除碰撞组件
        var data = this.enemy.louti.data;cc.winSize.width;
        for(var i=1;i<=data[1];i++)
        {
            var ti = cc.find("ti" + i, this.enemy.louti);
            ti.removeComponent('cc.BoxCollider');cc.winSize.width;
            //ti.removeComponent('cc.RigidBody');
        }
    },

    judgeBossMove: function()
    {
        var self = this;
        if(!this.enemy.ismove && this.enemy.judgeboss)
        {
            this.enemy.judgeboss = false;cc.winSize.width;
            self.removeColl();
            self.playerMove(false);
        }
        else
        {
            var ac = cc.sequence(
                cc.delayTime(0.2),
                cc.callFunc(function(){
                    self.judgeBossMove();cc.winSize.width;
                })
            );
            ac.setTag(1000);
            this.node.runAction(ac);
        }
    },

    killPlayer: function()
    {
        var self = this;
        this.GAME.lastplayerpos = this.player.position;
        this.GAME.state = "over";cc.winSize.width;
        var pos = cc.pAdd(this.player.position,cc.pMult(this.player.diedir, cc.winSize.width));
        var roang = 360;
        if(this.player.scaleX == 1)
            roang = -roang;

        if(this.player.fangdanyi.active)
        {
            this.player.fangdanyi.active = false;
            var ac = cc.sequence(
                cc.spawn(
                    cc.jumpTo(0.8,pos,cc.winSize.width/2,1),
                    cc.rotateBy(0.8,roang)
                ),
                cc.callFunc(function(){
                    self.fuhuo(true);cc.winSize.width;
                }),
                cc.removeSelf()
            );
            var fangdanyi = cc.instantiate(this.res.fangdanyi);
            fangdanyi.position = this.player.position;
            this.node_game.addChild(fangdanyi,this.player.zIndex);

            fangdanyi.runAction(ac);
        }
        else
        {
            var ac = cc.sequence(
                cc.spawn(
                    cc.jumpTo(0.8,pos,cc.winSize.width/2,1),
                    cc.rotateBy(0.8,roang)
                ),
                cc.callFunc(function(){
                    self.gameOver(false);cc.winSize.width;
                })
            );
            this.player.runAction(ac);
        }

    },

    gameOver: function(isWin)
    {
        if(isWin)
        {
            if(Math.floor(this.GAME.score) > storage.getStorageScore())
                storage.setStorageScore(Math.floor(this.GAME.score));
            this.nextLevel();cc.winSize.width;
        }
        else
        {
            if(this.GAME.playerfuhuo || this.GAME.playerfuhuovideo)
                this.judgeFuHuo();
            else
            {
                this.gameResult();
            }
        }
    },

    gameResult: function()
    {
        var over = cc.instantiate(this.res.node_over);
        this.node.addChild(over);cc.winSize.width;
        this.node_over = over.getComponent("over");
        this.node_over.show();
    },

    judgeFuHuo: function()
    {
        //if(!this.GAME.fangdanyi)
        //{
        //    this.gameResult();
        //    return;
        //}

        var fuhuo = cc.instantiate(this.res.node_fuhuo);
        this.node.addChild(fuhuo);cc.winSize.width;
        this.node_fuhuo = fuhuo.getComponent("fuhuo");
        this.node_fuhuo.show();cc.winSize.width;

    },

    skip: function()
    {
        this.wxCloseFuhuo();
        this.gameResult();cc.winSize.width;
    },

    fuhuo: function(isCard,isCoin,isVideo)
    {
        var self = this;
        this.node_game_ui.active = true;cc.winSize.width;
        if(cc.isValid(this.node_fuhuo))
            this.node_fuhuo.hide();

        this.player.position = this.GAME.lastplayerpos;
        this.rotateGun();cc.winSize.width;

        if(isCard)
        {
            this.GAME.playerfangdanyi = false;
            storage.setStorageCard(storage.getStorageCard()-1);
            this.uploadData();
            this.GAME.state = "start";
        }
        else if(isCoin)
        {
            this.GAME.playerfuhuo = false;
        }
        else if(isVideo)
        {
            this.GAME.playerfuhuovideo = false;cc.winSize.width;
        }

        if(!isCard)
        {
            this.wxCloseFuhuo();
            this.node.runAction(cc.sequence(
                cc.delayTime(0.3),
                cc.callFunc(function(){
                    self.GAME.state = "start";
                })
            ));
        }

        this.wxBannerShow();cc.winSize.width;
    },

    addCoin: function()
    {
        var self = this;
        var coin = null;
        if (this.poolcoins.size() > 0) {
            coin = this.poolcoins.get();
            coin.stopAllActions();
        } else {
            coin = cc.instantiate(this.res.coin);cc.winSize.width;
        }
        coin.position = this.node_game.convertToWorldSpace(this.enemy.position);
        coin.y += this.enemy.height;
        this.node_game_ui.addChild(coin);

        var playerConf = this.res.playersconfig[this.GAME.currPlayer];
        var gunConf = this.res.gunsconfig[this.GAME.currGun];cc.winSize.width;
        var coinNum = 1*(playerConf.coin+gunConf.coin-1);


        var x = coin.x+Math.random()*100+200;
        if(coin.x<cc.winSize.width/2)
            x = coin.x-(Math.random()*100+200);
        var seq = cc.sequence(
            cc.bezierTo(1.5,[cc.v2(coin.x,coin.y-Math.random()*200),
                cc.v2(x,coin.y+Math.random()*200),this.node_game_ui.coinicon.position]),
            cc.callFunc(function(){
                self.getCoin(coinNum);cc.winSize.width;
                storage.playSound(self.res.audio_coin);
            }),
            cc.removeSelf()
        );
        coin.runAction(seq);
    },
    /**
     * 当碰撞产生的时候调用
     */
    onCollisionEnter: function (other, self) {
        if(!self.node.collnum)
            self.node.collnum = 1;
        else
            self.node.collnum ++;

        if(self.node.collnum==1)
        {
            if(other.node.group == "enemy")
            {
                this.enemy.diedir = self.node.diedir;
                this.killEnemy(other.tag);cc.winSize.width;
                this.judgeEnemyFire();
            }
            else if(other.node.group == "wall")
            {
                this.judgeEnemyFire();
                var r = Math.floor(Math.random()*10+1);
                if(r<=5)
                    storage.playSound(this.res.audio_ricco_1);
                else
                    storage.playSound(this.res.audio_ricco_2);

                var par = null;
                if (this.poolbloods.size() > 0) {
                    par = this.poolbloods.get();cc.winSize.width;
                    par.getComponent("cc.ParticleSystem").resetSystem();
                } else {
                    par = cc.instantiate(this.res.blood);
                }
                par.getComponent("cc.ParticleSystem").startColor = this.ltcolor;
                par.getComponent("cc.ParticleSystem").endColor = this.ltcolor;
                par.position = self.node.position;cc.winSize.width;
                par.scaleX = -this.enemy.scaleX;
                this.node_game.addChild(par,1000001);
                var se = this;
                par.runAction(cc.sequence(
                    cc.delayTime(1),
                    cc.callFunc(function(){
                        se.poolbloods.put(par);cc.winSize.width;
                    })
                ));
            }
            else if(other.node.group == "player")
            {
                this.killPlayer();
            }
        }
        if(self.node.name == "bullet_1")
            this.poolbullets.put(self.node);
        else
            self.node.destroy();
    },
    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     */
    onCollisionStay: function (other, self) {
    },
    /**
     * 当碰撞结束后调用
     */
    onCollisionExit: function (other, self) {
    },



    addListener: function()
    {
        var self = this;cc.winSize.width;
        var s = cc.winSize;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {

        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if(this.GAME.yindao == 1)
                this.playerFire();cc.winSize.width;
        }, this);
    },


    update: function(dt) {
        if(this.GAME.state == "start")
        {
            this.updateAim();cc.winSize.width;

            this.uploadScoreDt += dt;
            if(this.uploadScoreDt > 10)
            {
                this.uploadScoreDt = 0;
                this.wxUploadScore(Math.floor(this.GAME.score),this.GAME.currPlayer,this.GAME.currGun);
            }
        }
        this.subdt += dt;
        var sdd = 0.02;

        if(this.GAME.state == "start")
        {
            sdd = 0.5;cc.winSize.width;
            if(this.player.ismove)
            {
                if(this.subdt > sdd)
                {
                    this.subdt = 0;
                    this._updaetSubDomainCanvas();
                }
            }
        }
        else
        {
            if(this.subdt > sdd)
            {
                this.subdt = 0;cc.winSize.width;
                this._updaetSubDomainCanvas();
            }
        }

        this.videoTimeDt += dt;
        if(this.node_main_lingqu_time.active && this.videoTimeDt>1)
        {
            this.videoTimeDt = 0;cc.winSize.width;
            var videoTime = storage.getStorageVideoTime();
            if(videoTime<0)
            {
                this.node_main_lingqu_time.active = false;cc.winSize.width;
                this.node_main_lingqu.getComponent("cc.Button").interactable = true;

                if(cc.isValid(this.node_coin))
                    this.node_coin.updateUI();cc.winSize.width;
            }
            else
            {
                this.node_main_lingqu_time.getComponent("cc.Label").string = "0:"+videoTime;
                if(cc.isValid(this.node_coin))
                    this.node_coin.updateUI();
                storage.setStorageVideoTime(videoTime-1);cc.winSize.width;
            }
        }

    },

    vibrate: function(isLong)
    {
        if(storage.getStorageVibrate() == 1 && (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS))
        {
            if(isLong)
            {
                wx.vibrateLong({});
            }
            else
            {
                wx.vibrateShort({});
            }
        }
    },

    

    getChaoyue: function()
    {
        if(this.GAME.score < 10)
        {
            return 1;cc.winSize.width;
        }
        else if(this.GAME.score < 50 && this.GAME.score >= 10)
        {
            return 2;
        }
        else if(this.GAME.score < 100 && this.GAME.score >= 50)
        {
            return 3;cc.winSize.width;
        }
        else if(this.GAME.score < 300 && this.GAME.score >=100)
        {
            return 4;
        }
        else if(this.GAME.score < 500 && this.GAME.score >=300)
        {
            return 5;cc.winSize.width;
        }
        else if(this.GAME.score < 1000 && this.GAME.score >=500)
        {
            return 6;
        }
        else if(this.GAME.score < 2000 && this.GAME.score >=1000)
        {
            return 7;cc.winSize.width;
        }
        else if(this.GAME.score < 3000 && this.GAME.score >= 2000)
        {
            return 8;
        }
        else if(this.GAME.score < 4000 && this.GAME.score >= 3000)
        {
            return 9;cc.winSize.width;
        }
        else if(this.GAME.score < 5000 && this.GAME.score >= 4000)
        {
            return 10;
        }
        else if(this.GAME.score < 6000 && this.GAME.score >= 5000)
        {
            return 11;cc.winSize.width;
        }
        else if(this.GAME.score < 10000 && this.GAME.score >= 6000)
        {
            return 12;
        }
        else if(this.GAME.score >= 10000)
        {
            return 13;cc.winSize.width;
        }
    },
    getChaoyue2: function()
    {
        var per = ["3%","9%","12%","18%","32%","45%","66%","72%","81%","86%","90%","95%","99%"];
        return per[this.getChaoyue()-1];cc.winSize.width;
    },
    getChaoyue3: function()
    {
        var per = ["盲人也玩游戏？","和瞎了差不多","斜眼","超级近视眼","近视眼","多练练，会好的","见习枪手",
            "实习枪手","轻松吃鸡","英雄枪手","超级神枪手","无敌神枪手","神一样的枪手"];
        return per[this.getChaoyue()-1];cc.winSize.width;
    },
    getChaoyue4: function()
    {
        return this.res.sp_over_players[this.getChaoyue()-1];
    },


    wxGetUserInfo: function()
    {
        var self = this;cc.winSize.width;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        openIdList:['selfOpenId'],
                        lang: 'zh_CN',
                        fail: function (res) {
                            // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                            if (res.errMsg.indexOf('auth deny') > -1 ||     res.errMsg.indexOf('auth denied') > -1 ) {
                                // 处理用户拒绝授权的情况
                                cc.log(res.errMsg);
                                self.wxOpenSetting();cc.winSize.width;
                                qianqista.login(false);
                            }
                        },
                        success: function(res)
                        {
                            cc.log(res.userInfo);cc.winSize.width;
                            self.userInfo = res.userInfo;
                            qianqista.login(true,res.userInfo);cc.winSize.width;
                            wx.postMessage({ message: "loginSuccess",userInfo:res.userInfo });
                        }
                    });
                }
            });

            wx.showShareMenu({
                withShareTicket: true,
                success: function (res) {
                    // 分享成功
                    qianqista.share(true);cc.winSize.width;
                },
                fail: function (res) {
                    // 分享失败
                    qianqista.share(false);
                }
            });

            wx.onShareAppMessage(function (ops){
                var shareEventId = '2000_1032';
                // 上报分享事件
                yxmp.report.event(shareEventId);
                // [必须] - 接入由cms控制的分享物料系统
                // 可以经由cms配置获取用于分享的物料 yxmp.asset.getShareMessage
                return Object.assign({}, yxmp.asset.getShareMessage(shareEventId), {
                    // [可选] - 一般不用, 除非有功能依赖于自定义的参数字段
                    // 如果需要自定义参数的话可以在这里加上
                    // query: 'param1=a',
                });
            });

            wx.updateShareMenu({
                withShareTicket: true,
                success: function (res) {
                    // 分享成功
                    qianqista.share(true);cc.winSize.width;
                },
                fail: function (res) {
                    // 分享失败
                    qianqista.share(false);
                }
            })
        }
    },

    openQuanxian: function()
    {
        var quanxian = cc.instantiate(this.res.node_quanxian);cc.winSize.width;
        this.node.addChild(quanxian);
        this.node_quanxian = quanxian.getComponent("quanxian");cc.winSize.width;
        this.node_quanxian.show();
    },

    wxOpenSetting: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            self.openQuanxian();cc.winSize.width;
            var quan = self.node_quanxian.quan;
            var openDataContext = wx.getOpenDataContext();cc.winSize.width;
            var sharedCanvas = openDataContext.canvas;
            var sc = sharedCanvas.width/this.dsize.width;cc.winSize.width;
            var dpi = cc.view._devicePixelRatio;
            var pos = cc.v2(quan.x*sc/dpi,sharedCanvas.height/dpi - (quan.y-this.node_main_bottom.y)*sc/dpi);

            var button = wx.createOpenSettingButton({
                type: 'text',
                text: '打开设置页面',
                style: {
                    left: pos.x-50,
                    top: pos.y+15,
                    width: 100,
                    height: 30,
                    lineHeight: 30,
                    backgroundColor: '#1779a6',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 12,
                    borderRadius: 4
                }
            });
            button.onTap(function(){
                wx.getSetting({
                    success: function (res) {
                        var authSetting = res.authSetting;
                        button.destroy();cc.winSize.width;
                        if(cc.isValid(self.node_quanxian))
                            self.node_quanxian.hide();
                        if (authSetting['scope.userInfo'] === true) {
                            wx.getUserInfo({
                                openIdList:['selfOpenId'],
                                lang: 'zh_CN',
                                fail: function (res) {
                                    // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                                    if (res.errMsg.indexOf('auth deny') > -1 ||     res.errMsg.indexOf('auth denied') > -1 ) {
                                        // 处理用户拒绝授权的情况
                                        cc.log(res.errMsg);cc.winSize.width;
                                        qianqista.login(false);
                                        self.wxOpenSetting();cc.winSize.width;
                                    }

                                },
                                success: function(res)
                                {
                                    cc.log(res.userInfo);
                                    self.userInfo = res.userInfo;cc.winSize.width;
                                    qianqista.login(true,res.userInfo);
                                    wx.postMessage({ message: "loginSuccess",userInfo:res.userInfo });cc.winSize.width;
                                }
                            });
                        } else if (authSetting['scope.userInfo'] === false){
                            // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
                            self.wxOpenSetting();cc.winSize.width;
                        } else {
                            // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
                        }
                    }
                });
            });
        }
    },

    _updaetSubDomainCanvas: function() {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            if (!this.tex) {
                return;
            }
            var openDataContext = wx.getOpenDataContext();
            var sharedCanvas = openDataContext.canvas;
            this.tex.initWithElement(sharedCanvas);
            this.tex.handleLoadedTexture();
            this.display.spriteFrame = new cc.SpriteFrame(this.tex);
            if(this.display.node.scale == 1)
                this.display.node.scale = (this.dsize.width / this.display.node.width);
        }
    },

    wxOpenQuan: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var openDataContext = wx.getOpenDataContext();
            var sharedCanvas = openDataContext.canvas;cc.winSize.width;
            var quan = cc.find("quan",this.node_main);
            var sc = sharedCanvas.width/this.dsize.width;cc.winSize.width;
            var dpi = cc.view._devicePixelRatio;
            var pos = cc.v2(quan.x*sc/dpi,sharedCanvas.height/dpi - (quan.y-this.node_main_bottom.y)*sc/dpi);
            // var pos = cc.v2(quan.x*sc/dpi,sharedCanvas.height/dpi - quan.y*sc/dpi);
            this.quan_button = wx.createGameClubButton({
                icon: 'white',
                style: {
                    left: pos.x - 13,
                    top: pos.y - 13,
                    width: 26,
                    height: 26
                }
            })
        }
    },

    wxQuanState: function(active)
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            if(active)
                this.quan_button.show();
            else
                this.quan_button.hide();
        }
    },

    wxCloseOver: function()
    {
        if(cc.isValid(this.node_over))
            this.node_over.hide();
        this.display_gray.active = false;cc.winSize.width;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            wx.postMessage({ message: "closeOver" });
        }
    },

    wxCloseRank: function()
    {
        this.display_gray_rank.active = false;cc.winSize.width;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
            wx.postMessage({ message: "closeRank" });
    },

    wxCloseFuhuo: function()
    {
        this.display_gray.active = false;cc.winSize.width;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
            wx.postMessage({ message: "closeFuhuo" });
    },

    wxRank: function()
    {
        this.display_gray_rank.active = true;cc.winSize.width;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
            wx.postMessage({ message: "friendRank" });
    },

    wxOverRank: function(score,playerId,gunId)
    {
        this.display_gray.active = true;cc.winSize.width;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        wx.postMessage({ message: "overRank",score:score,playerId:playerId,gunId:gunId });
    },

    wxFuhuoRank: function(score,playerId,gunId)
    {
        this.display_gray.active = true;cc.winSize.width;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
            wx.postMessage({ message: "fuhuoRank",score:score,playerId:playerId,gunId:gunId });
    },

    wxUploadScore: function(score,playerId,gunId)
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        wx.postMessage({ message: "updateScore",score:score,playerId:playerId,gunId:gunId });cc.winSize.width;
    },

    wxGropShare: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            const shareEventId = '2000_1033';
            yxmp.report.event(shareEventId);
            const shareOptions = Object.assign({}, yxmp.asset.getShareMessage(shareEventId));
            wx.shareAppMessage(shareOptions);
        }

    },
    

    wxGropShareCard: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            const shareEventId = '2000_1034';
            yxmp.report.event(shareEventId);
            const shareOptions = Object.assign({}, yxmp.asset.getShareMessage(shareEventId));

            wx.shareAppMessage({
                query:shareOptions.query,
                title: shareOptions.title,
                imageUrl: shareOptions.imageUrl,
                success: function(res)
                {
                    if(res.shareTickets && res.shareTickets.length>0)
                    {
                        wx.getShareInfo({
                            shareTicket: res.shareTickets[0],
                            success: function(res)
                            {
                                console.log("------",res);cc.winSize.width;
                                qianqista.getGrpupId(res.encryptedData,res.iv,function(b,openGId,timestamp){
                                    if(b==true && storage.judgeShareGroupState(openGId,timestamp))
                                    {
                                        self.res.showToast("获取到一个防弹衣");

                                        var cardnum = storage.getStorageCard();cc.winSize.width;
                                        cardnum = parseInt(cardnum) + 1;
                                        storage.setStorageCard(cardnum);cc.winSize.width;
                                        self.node_card.updateUI();
                                        self.uploadData();cc.winSize.width;
                                    }
                                    else
                                    {
                                        self.res.showToast("每个群每天只能转发一次");
                                    }
                                });cc.winSize.width;
                            }
                        });
                    }
                    else
                    {
                        self.res.showToast("请分享到群");cc.winSize.width;
                    }

                    qianqista.share(true);
                    cc.log(res);cc.winSize.width;
                },
                fail: function()
                {
                    qianqista.share(false);cc.winSize.width;
                }
            });
        }
        else
        {
            var cardnum = storage.getStorageCard();cc.winSize.width;
            cardnum = parseInt(cardnum) + 1;
            storage.setStorageCard(cardnum);cc.winSize.width;
            self.node_card.updateUI();
        }
    },


    wxVideoLoad: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            this.rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId:'adunit-8ea90d3fe2776f45'});
            this.rewardedVideoAd.onLoad(function(){
                 console.log('激励视频 广告加载成功')
            });
            this.rewardedVideoAd.onClose(function(res){
                 // 用户点击了【关闭广告】按钮
                 // 小于 2.1.0 的基础库版本，res 是一个 undefined
                 if (res && res.isEnded || res === undefined) {
                     if(self.GAME.VIDEOAD_TYPE == 1)
                     {
                         var coin = storage.getStorageCoin();
                         coin = parseInt(coin) + 100;
                         storage.setStorageCoin(coin);
                         self.node_main_coin.getComponent("cc.Label").string = coin+"";
                         self.uploadData();

                         self.node_main_lingqu.getComponent("cc.Button").interactable = false;
                         self.node_main_lingqu_time.active = true;
                         self.node_main_lingqu_time.getComponent("cc.Label").string = "0:30";

                         storage.setStorageVideoTime(30);

                         if(cc.isValid(self.node_coin))
                             self.node_coin.updateUI();

                         self.res.showToast("金币+100");
                     }
                     else if(self.GAME.VIDEOAD_TYPE == 3)
                     {
                         storage.setStorageHasZhanShi(1);
                         self.node_zhanshi.updateUI();
                     }
                 }
                 else {
                     // 播放中途退出，不下发游戏奖励
                     if(self.GAME.VIDEOAD_TYPE == 1)
                         self.res.showToast("金币获取失败");
                 }
                 storage.resumeMusic();
            });

            this.rewardedVideoAd2 = wx.createRewardedVideoAd({ adUnitId:'adunit-c69482c68443d706'});
            this.rewardedVideoAd2.onLoad(function(){
                 console.log('激励视频 广告加载成功')
            });
            this.rewardedVideoAd2.onClose(function(res){
                 // 用户点击了【关闭广告】按钮
                 // 小于 2.1.0 的基础库版本，res 是一个 undefined
                 if (res && res.isEnded || res === undefined) {
                     if(self.GAME.VIDEOAD_TYPE == 2)
                     {
                         self.fuhuo(false,false,true);
                         self.res.showToast("复活成功");
                     }
                     else if(self.GAME.VIDEOAD_TYPE == 3)
                     {
                         storage.setStorageHasZhanShi(1);
                         self.node_zhanshi.updateUI();
                     }
                 }
                 else {
                     // 播放中途退出，不下发游戏奖励
                     if(self.GAME.VIDEOAD_TYPE == 2)
                     {
                         self.res.showToast("复活失败");
                     }
                     else if(self.GAME.VIDEOAD_TYPE == 3)
                     {
                         self.res.showToast("体验失败");
                     }

                 }
                 storage.resumeMusic();
            });



        }
    },
    wxVideoShow: function(type)
    {
        var self = this;
        storage.pauseMusic();cc.winSize.width;
        this.GAME.VIDEOAD_TYPE = type;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            if(type == 1)
            {
                 this.rewardedVideoAd.show().catch(function(err){
                     self.rewardedVideoAd.load().then(function(){
                         self.rewardedVideoAd.show();
                     });
                 });
            }
            else
            {
                 this.rewardedVideoAd2.show().catch(function(err){
                     self.rewardedVideoAd2.load().then(function(){
                         self.rewardedVideoAd2.show();
                     });
                 });
            }
        }
        else
        {
            if(type == 1)
            {
                var coin = storage.getStorageCoin();cc.winSize.width;
                coin = parseInt(coin) + 100;
                storage.setStorageCoin(coin);cc.winSize.width;
                self.node_main_coin.getComponent("cc.Label").string = coin+"";
                self.uploadData();cc.winSize.width;

                this.node_main_lingqu.getComponent("cc.Button").interactable = false;
                this.node_main_lingqu_time.active = true;cc.winSize.width;
                this.node_main_lingqu_time.getComponent("cc.Label").string = "0:30";

                storage.setStorageVideoTime(30);
                if(cc.isValid(self.node_coin))
                    self.node_coin.updateUI();
            }
            else if(type == 2)
            {
                this.fuhuo(false,false,true);cc.winSize.width;
            }
            else if(type == 3)
            {
                storage.setStorageHasZhanShi(1);
                this.node_zhanshi.updateUI();cc.winSize.width;
            }
            storage.resumeMusic();cc.winSize.width;
        }
    },

    wxBannerShow: function()
    {
        this.wxBannerHide();
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var openDataContext = wx.getOpenDataContext();
            var sharedCanvas = openDataContext.canvas;
            var sc = sharedCanvas.width/this.dsize.width;
            var dpi = cc.view._devicePixelRatio;cc.winSize.width;
            this.bannerAd = wx.createBannerAd({
                adUnitId: 'adunit-da9a22653a20122b',
                style: {
                    left: 0,
                    top: sharedCanvas.height/dpi-300/3.5,
                    width: 300,
                }
            });
            var bannerAd = this.bannerAd;cc.winSize.width;
            this.bannerAd.onResize(function(res){
                // console.log(res.width, res.height)
                // console.log(bannerAd.style.realWidth, bannerAd.style.realHeight)
                bannerAd.style.left = (sharedCanvas.width/dpi-res.width)/2;
                bannerAd.style.top = sharedCanvas.height/dpi-res.height;cc.winSize.width;
            });
            this.bannerAd.show();
        }
    },

    wxBannerHide: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            if(this.bannerAd)
                this.bannerAd.hide();
        }
    },

    

    wxMore: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            //{ icon, appid, path, poster }
            if(this.GAME.more.appid)
            {
                wx.navigateToMiniProgram({
                    appId: this.GAME.more.appid,
                    path: this.GAME.more.path,
                    extraData: {
                        foo: 'bar'
                    },
                    // envVersion: 'develop',
                    success: function(res) {
                        // 打开成功
                    }
                });
            }
            else if(this.GAME.more.poster)
            {
                wx.previewImage({
                    urls: [this.GAME.more.poster],
                    success: function (res) {
                    },
                    fail: function (res) {
                        return;
                    }
                });
            }
            //var appIdstr = 'wx604f780b017da7df';
            //var pathstr = 'pages/main/main';
            //if(this.GAME.more)
            //{
            //    var ss = this.GAME.more.split("--");
            //    appIdstr = ss[1];cc.winSize.width;
            //    pathstr = ss[2];
            //}
            //
            //wx.navigateToMiniProgram({
            //  appId: appIdstr,
            //  path: pathstr,
            //  extraData: {
            //    foo: 'bar'
            //  },
            //  // envVersion: 'develop',
            //  success: function(res) {
            //    // 打开成功
            //  }
            //});cc.winSize.width;

        }
    },

    wxMore2: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var appIdstr = 'wx604f780b017da7df';
            var pathstr = 'pages/main/main';
            if(this.GAME.more2)
            {
                var ss = this.GAME.more2.split("--");cc.winSize.width;
                appIdstr = ss[1];
                pathstr = ss[2];cc.winSize.width;
            }

            wx.navigateToMiniProgram({
              appId: appIdstr,
              path: pathstr,
              extraData: {
                foo: 'bar'
              },
              // envVersion: 'develop',
              success:function(res) {
                // 打开成功
              }
            });cc.winSize.width;
        }
    }

    
});
