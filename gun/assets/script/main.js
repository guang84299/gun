var qianqista = require("qianqista");
var storage = require("storage");

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
         this.tex = new cc.Texture2D();
         this.subdt = 0;
         this.userInfo = {};
         this.uploadScoreDt = 0;
         this.videoTimeDt = 0;
         this.openover = false;
         this.openstore = false;

         this.res = cc.find("Canvas").getComponent("res");
         this.qianqista = qianqista;

         this.initPhysics();
         this.initData();
         this.initUI();
         this.addListener();

         this.adapt();

         this.wxGetUserInfo();
         this.wxOpenQuan();

         storage.playMusic(this.res.audio_bgm);
         storage.preloadSound();
         this.wxVideoLoad();

         var self = this;
         qianqista.init("wx5fbc3c48bb79327b","b827592b68ccb026425e36ca8ae10aee","西部神枪手",function(){
             qianqista.datas(function(res){
                 console.log('my datas:', res);
                 if(res.state == 200)
                 {
                     self.updateLocalData(res.data);
                 }
             });
         });
         //qianqista.init("wxd3cb7ae66c150daf","65acd0a6197124b3eef2b0210fc1b8cc","西部神枪手2",function(){
         //    qianqista.datas(function(res){
         //        console.log('my datas:', res);
         //        if(res.state == 200)
         //        {
         //            self.updateLocalData(res.data);
         //        }
         //    });
         //});
         qianqista.control(function(res){
             console.log('my control:', res);
             if(res.state == 200)
             {
                 self.GAME.control = res.data;
                 self.updateUIControl();
             }
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
        //manager.enabledDebugDraw = true;
        //manager.enabledDrawBoundingBox = true;
    },

    initData: function() {
        this.tih = 36;
        this.op = [255, 242, 216, 191, 165, 140, 114, 89, 63, 38, 12, 5, 3, 1, 0];
        this.GAME = {};
        this.GAME.control = [];
        this.GAME.xuming = "00:30-00:30";
        this.GAME.linghongbao = 0;
        this.GAME.state = "stop";

        this.poolbullets = new cc.NodePool();
        this.poolhits = new cc.NodePool();
        this.poolsmokes = new cc.NodePool();
        this.poolshells = new cc.NodePool();
        this.poolbloods = new cc.NodePool();
        this.poolbigbloods = new cc.NodePool();
        for(var i=0;i<5;i++)
        {
            var bullet_1 = cc.instantiate(this.res.bullet_1);
            this.poolbullets.put(bullet_1);

            var hit = cc.instantiate(this.res.hit);
            this.poolhits.put(hit);

            var smoke = cc.instantiate(this.res.smoke);
            this.poolsmokes.put(smoke);

            var shell = cc.instantiate(this.res.shell);
            this.poolshells.put(shell);

            var blood = cc.instantiate(this.res.blood);
            this.poolbloods.put(blood);

            var bigblood = cc.instantiate(this.res.bigblood);
            this.poolbigbloods.put(bigblood);
        }
        this.poolcoins = new cc.NodePool();
        for(var i=0;i<6;i++)
        {
            var coin = cc.instantiate(this.res.coin);
            this.poolcoins.put(coin);
        }



        if(storage.getStorageFirst() == 0)
        {
            storage.setStorageFirst(1);
            storage.setStorageMusic(1);
            storage.setStorageSound(1);
            storage.setStorageVibrate(1);
            storage.setStorageShareGroupList("groups:");
            storage.setStorageShareGroupTime(-1);
            storage.setStorageCard(2);
        }

        //for(var i=1;i<=9;i++)
        //    storage.setStoragePlayer(i,0);
        //for(var i=10;i<=19;i++)
        //    storage.setStorageGun(i,0);
        storage.setStoragePlayer(1);
        storage.setStorageGun(1);
        //storage.setStorageCoin(0);

        //storage.setStorageGun(10,0);
        //storage.setStorageCurrGun(1);
        //storage.setStorageQianDao(0);
        //storage.setStorageQianDaoTime(-1);
        //storage.setStorageYindao(0);
        //storage.setStorageGunJieSuoNum(1);
        //storage.setStorageRoleJieSuoNum(4);
        //cc.sys.localStorage.setItem("playnum",0);
        //storage.setStorageInviteNum(4);
        //storage.setStorageInviteAwardNum(4);

        //storage.setStorageGunInviteNum(1);
        //storage.setStorageGunInviteAwardNum(0);
        //storage.setStorageGun(16,0);
    },


    initUI: function()
    {
        var s = cc.winSize;
        this.node_game = cc.find("Canvas/node_game");
        this.node_game_ui = cc.find("Canvas/node_game_ui");
        this.node_game_ui.score = cc.find("score",this.node_game_ui);
        this.node_game_ui.coinicon = cc.find("coin",this.node_game_ui);
        this.node_game_ui.coin = cc.find("coin/num",this.node_game_ui);
        this.node_game_ui.killhead =  cc.find("killhead",this.node_game_ui);
        this.node_game_ui.boss =  cc.find("boss",this.node_game_ui);
        this.node_game_ui.hitbg =  cc.find("hitbg",this.node_game_ui);
        this.node_game_ui.yindao =  cc.find("yindao",this.node_game_ui);
        this.node_main = cc.find("Canvas/node_main");
        this.node_main_coin = cc.find("coin/num",this.node_main);
        this.node_main_score = cc.find("score",this.node_main);
        this.node_main_bottom = cc.find("bottom",this.node_main);
        this.node_main_lingqu = cc.find("lingqu",this.node_main);
        this.node_main_lingqu_time = cc.find("lingqu/time",this.node_main);
        this.node_main_start = cc.find("start",this.node_main);
        this.node_main_more = cc.find("more",this.node_main);
        this.node_main_more2 = cc.find("more2",this.node_main);
        this.node_main_start.runAction(cc.repeatForever(cc.sequence(
                cc.scaleTo(0.5,1.2).easing(cc.easeSineIn()),
                cc.scaleTo(0.5,1).easing(cc.easeSineOut())
            )));


        

        this.node_setting = cc.find("Canvas/node_setting");
        this.node_setting_music = cc.find("bg/music",this.node_setting);
        this.node_setting_sound = cc.find("bg/sound",this.node_setting);
        this.node_setting_vibrate = cc.find("bg/vibrate",this.node_setting);

        this.node_card = cc.find("Canvas/node_card");
        this.node_card_num = cc.find("bg/cardnum",this.node_card);

        this.node_duihuan = cc.find("Canvas/node_duihuan");

        this.node_qiandao = cc.find("Canvas/node_qiandao");
        this.node_rank = cc.find("Canvas/node_rank");

        this.node_fuhuo = cc.find("Canvas/node_fuhuo");
        this.node_fuhuo_share = cc.find("fuhuo_share",this.node_fuhuo);
        this.node_fuhuo_coin = cc.find("coin/num",this.node_fuhuo);
        this.node_fuhuo_score = cc.find("score",this.node_fuhuo);
        this.node_fuhuo_fu_coin = cc.find("fuhuo_coin",this.node_fuhuo_share);
        this.node_fuhuo_fu_video = cc.find("fuhuo_video",this.node_fuhuo_share);
        this.node_fuhuo_fu_xuming = cc.find("fuhuo_xuming",this.node_fuhuo_share);
        this.node_fuhuo_guang = cc.find("zhanshibg/guang",this.node_fuhuo);

        this.node_over = cc.find("Canvas/node_over");
        this.node_over_coin = cc.find("coin/num",this.node_over);
        this.node_over_score = cc.find("bg/score",this.node_over);
        this.node_over_chaoyue = cc.find("bg/chaoyue",this.node_over);
        this.node_over_more = cc.find("more",this.node_over);
        this.node_over_more2 = cc.find("more2",this.node_over);

        this.node_quanxian = cc.find("Canvas/node_quanxian");


        this.node_award = cc.find("Canvas/node_award");
        this.node_award_itembg = cc.find("bg/itembg",this.node_award);

        this.node_tishi =  cc.find("Canvas/node_tishi");
        this.node_tishi.hand =  cc.find("hand",this.node_tishi);
        this.node_tishi.ios = cc.find("tishibg/ios",this.node_tishi);
        if(cc.sys.os == cc.sys.OS_IOS)
        {
            this.node_tishi.ios.getComponent("cc.Label").string = "2、点击下方【添加到我的小程序】。";
        }

        this.node_zhanshi = cc.find("Canvas/node_zhanshi");
        this.node_zhanshi_guang = cc.find("bg/guang",this.node_zhanshi);
        this.node_zhanshi_zhanshivedio = cc.find("bg/zhanshivedio",this.node_zhanshi);
        this.node_zhanshi_vediostart = cc.find("bg/vediostart",this.node_zhanshi);

        this.node_linggun = cc.find("Canvas/node_linggun");
        this.node_linggun_guang = cc.find("bg/guang",this.node_linggun);

        this.node_xuming = cc.find("Canvas/node_xuming");

        this.node_coin = cc.find("Canvas/node_coin");
        this.node_coin_vedio = cc.find("bg/vediocoin",this.node_coin);
        this.node_coin_time = cc.find("time",this.node_coin_vedio);


        //var stringTime = "2018-07-05 17:01:00";
        //var timestamp2 = (new Date(Date.parse(stringTime.replace(/-/g,"/")))).getTime();
        //if(new Date().getTime() < timestamp2)
        //{
        //
        //}
        this.initGmae();
        this.updateUIControl();
        this.updateDitu();
    },

    updateDitu: function()
    {
        var num = storage.getStorageGunJieSuoNum();
        num = parseInt(num) + parseInt(storage.getStorageGunJieSuoNum2());
        if(num>0)
        {
            this.res.updateDitu();
        }

    },

    updateUIControl: function()
    {
        this.node_main_more.active = false;
        this.node_main_more2.active = false;
        this.node_over_more.active = false;
        this.node_over_more2.active = false;
        cc.find("fangdanyi",this.node_main).active = false;
        cc.find("lingjiang",this.node_main).active = false;
        cc.find("linggunbg",this.node_main).active = false;
        

        this.GAME.more = null;
        this.GAME.more2 = null;
        this.GAME.linghongbao = 0;
        this.GAME.sharecard = false;
        var sto_channel = cc.sys.localStorage.getItem("channel");

        if(this.GAME.control.length>0)
        {
            this.GAME.shares = {};
            for(var i=0;i<this.GAME.control.length;i++)
            {
                var con = this.GAME.control[i];
                if(con.id == "sharecard")
                {
                    if(con.value == "1")
                    {
                        cc.find("fangdanyi",this.node_main).active = true;
                        cc.find("lingjiang",this.node_main).active = true;
                        cc.find("linggunbg",this.node_main).active = true;
                        this.GAME.fangdanyi = true;
                        this.GAME.sharecard = true;
                    }
                }
                else if(con.id == "sharefuhuo")
                {
                    this.GAME.xuming = con.value;
                }
                else if(con.id == "linghongbao")
                {
                    this.GAME.linghongbao = con.value;
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
                    }
                    else
                    {
                        this.GAME.shares[con.id] = con.value;
                    }
                }
            }
        }
        var cardnum = storage.getStorageCard();
        if(this.GAME.fangdanyi && cardnum>0 && this.GAME.playerfangdanyi)
        {
            this.player.fangdanyi.active = true;
        }

        if(this.GAME.more)
        {
            var pic = this.GAME.more.split("--")[0];
            this.node_main_more.active = true;
            this.node_over_more.active = true;
            this.loadPic(this.node_main_more,pic);
            this.loadPic(this.node_over_more,pic);
        }
        if(this.GAME.more2)
        {
            var pic = this.GAME.more2.split("--")[0];
            this.node_main_more2.active = true;
            this.node_over_more2.active = true;
            this.loadPic(this.node_main_more2,pic);
            this.loadPic(this.node_over_more2,pic);
        }

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

            if(datas.currGun)
                storage.setStorageCurrGun(parseInt(datas.currGun));
            if(datas.currPlayer)
                storage.setStorageCurrPlayer(parseInt(datas.currPlayer));

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


            this.node_main_coin.getComponent("cc.Label").string = storage.getStorageCoin();
            this.node_main_score.getComponent("cc.Label").string = storage.getStorageScore();
            this.updateDitu();
        }
        else
        {
            this.uploadData();
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

        var data = JSON.stringify(datas);
        var self = this;
        qianqista.uploaddatas(data,function(res){
            console.log("--uploaddatas:",res);
            if(res && res.state == 200)
                self.updateData();
        });
    },


    adapt: function()
    {
        var nodes = [this.node_main,this.node_game_ui,this.node_tishi,this.node_setting,
            this.node_card,this.node_duihuan,this.node_qiandao,this.node_rank,this.node_fuhuo,this.node_over,
            this.node_award,this.node_zhanshi];
        for(var i=0;i<nodes.length;i++)
        {
            var items = nodes[i].children;
            for(var j=0;j<items.length;j++)
            {
                var item = items[j];
                this.adaptItem(item);
            }
        }
    },

    adaptItem: function(node)
    {
        var s = cc.winSize;
        var h = (this.dsize.height - s.height)/2;
        var sc = node.y/this.dsize.height;
        node.y = s.height*sc + h;
    },

    initGameData: function()
    {
        var loutis = this.res.GAME.loutis[0];
        this.loutis = [];
        for(var i=0;i<loutis.length;i++)
        {
            this.loutis.push(loutis[i]);
        }
        this.last_h = 0;
        this.ltzorder = 1000000;
        this.ltcolor = this.res.bgcolor[0];
        this.currLoutis = [];
        this.louticolls = [];
        this.GAME.state = "stop";
        this.GAME.enemy_num = 9 + Math.floor(Math.random() * 3 + 1);
        this.GAME.score = 0;
        this.GAME.coin = 0;
        this.GAME.killhead = 0;
        if(!this.GAME.useZhanShi)
        {
            this.GAME.currPlayer = storage.getStorageCurrPlayer()-1;
            this.GAME.currPlayerTmp = this.GAME.currPlayer;
        }
        this.GAME.currGun = storage.getStorageCurrGun()-1;
        this.GAME.currGunTmp = this.GAME.currGun;

        this.GAME.playerfuhuo = true;//金币
        this.GAME.playerfangdanyi = true;
        this.GAME.playerfuhuovideo = true;//看视频
        this.GAME.yindao = storage.getStorageYindao();
    },

    initGmae: function()
    {
        this.initGameData();
        this.node_game.destroyAllChildren();
        this.node_game.y = -792;
        this.node_main.active = true;
        this.node_game_ui.active = false;
        this.node_game_ui.boss.active = false;
        this.node_game_ui.killhead.active = false;
        this.node_main_coin.getComponent("cc.Label").string = storage.getStorageCoin();
        this.node_main_score.getComponent("cc.Label").string = storage.getStorageScore();
        this.getScore(0);
        this.getCoin(0);

        this.initLouTis();
        this.initPlayer();
        this.updateLouTiOpa(0);
    },

    nextLevel: function()
    {
        var loutis = this.res.GAME.loutis[Math.floor(Math.random() * this.res.GAME.loutis.length)];
        this.loutis = [];
        for(var i=0;i<loutis.length;i++)
        {
            this.loutis.push(loutis[i]);
        }
        this.last_h = 0;
        this.ltzorder = 1000000;
        this.ltcolor = this.res.bgcolor[Math.floor(Math.random()*this.res.bgcolor.length)];
        this.currLoutis = [];
        this.GAME.state = "stop";
        this.GAME.enemy_num = 3 + Math.floor(Math.random() * 3 + 1);
        this.GAME.killhead = 0;
        this.node_game.destroyAllChildren();
        this.node_game.y = -792;
        this.node_game_ui.boss.active = false;
        this.node_game_ui.killhead.active = false;

        this.initLouTis();
        this.initPlayer();
        this.updateLouTiOpa(0);
        this.startGmae();
    },

    again: function()
    {
        this.node_over.active = false;
        this.openover = false;
        this.initGameData();

        this.node_game.destroyAllChildren();
        this.node_game.y = -792;
        this.node_game_ui.boss.active = false;
        this.node_game_ui.killhead.active = false;
        this.getScore(0);
        this.getCoin(0);

        this.initLouTis();
        this.initPlayer();
        this.updateLouTiOpa(0);
        this.startGmae();
    },

    click: function(event,data,page)
    {
        if(data == "start")
        {
            this.wxQuanState(false);
            this.startGmae();

            var playnum = cc.sys.localStorage.getItem("playnum");
            playnum = playnum ? playnum : 0;
            if(playnum == 1)
            {
                this.node_tishi.active = true;
                this.node_tishi.hand.runAction(cc.repeatForever(cc.sequence(
                    cc.moveBy(0.3,10,0).easing(cc.easeSineIn()),
                    cc.moveBy(0.3,-10,0).easing(cc.easeSineIn())
                )));
            }
            playnum ++;
            cc.sys.localStorage.setItem("playnum",playnum);
        }
        else if(data == "resume")
        {
            this.node_tishi.active = false;
        }
        else if(data == "juese")
        {
            this.wxQuanState(false);
            this.openJuese();
        }
        else if(data == "home")
        {
            this.goMain();
        }
        else if(data == "junhuo")
        {
            this.wxQuanState(false);
            this.openGun();
        }
        else if(data == "riqi")
        {
            if(event.target.canset)
            {
                this.setGunRiQi(event.target.riqiId);
                this.openQianDao();
            }
        }
        else if(data == "setting")
        {
            this.wxQuanState(false);
            this.openSetting();
        }
        else if(data == "music")
        {
            var m = storage.getStorageMusic();
            m = m == 0 ? 1 : 0;
            storage.setStorageMusic(m);
            if(storage.getStorageMusic() == 0)
            {
                storage.stopMusic();
            }
            else
            {
                storage.playMusic(this.res.audio_bgm);
            }
        }
        else if(data == "sound")
        {
            var m = storage.getStorageSound();
            m = m == 0 ? 1 : 0;
            storage.setStorageSound(m);
        }
        else if(data == "vibrate")
        {
            var m = storage.getStorageVibrate();
            m = m == 0 ? 1 : 0;
            storage.setStorageVibrate(m);
        }
        else if(data == "lingqu")
        {
            this.wxQuanState(false);
            if(this.openover)
                this.wxCloseOver();
            this.node_card.active = true;
            this.node_over.active = false;
            this.node_card_num.getComponent("cc.Label").string = storage.getStorageCard();
            qianqista.event("btn_fangdanyi");
        }
        else if(data == "duihuan")
        {
            this.wxQuanState(false);
            this.node_duihuan.active = true;
            qianqista.event("btn_linghongbao");
        }
        else if(data == "rank")
        {
            this.wxQuanState(false);
            this.wxRank();
            this.node_rank.active = true;
        }
        else if(data == "fuhuo_card")
        {
            this.fuhuo(true);
        }
        else if(data == "fuhuo_share")
        {
            this.wxGropShareFuhuo();
            qianqista.event("fuhuo_coin");
        }
        else if(data == "skip")
        {
            this.skip();
        }
        else if(data == "again")
        {
            this.wxCloseOver();
            this.again();
        }
        else if(data == "change")
        {
            this.wxGropShareChange();
            qianqista.event("btn_pk");
        }
        else if(data == "over_rank")
        {
            this.wxRank();
            this.wxCloseOver();
            this.node_rank.active = true;
            this.node_over.active = false;
        }
        else if(data == "close_setting")
        {
            this.wxQuanState(true);
            this.node_setting.active = false;
        }
        else if(data == "close_duihuan")
        {
            this.wxQuanState(true);
            this.node_duihuan.active = false;
        }
        else if(data == "close_card")
        {
            this.node_card.active = false;
            if(this.openover)
            {
                this.node_over.active = true;
                this.wxOverRank(Math.floor(this.GAME.score),this.GAME.currPlayer,this.GAME.currGun);
            }
            else
            {
                this.wxQuanState(true);
            }
        }
        else if(data == "close_qiandao")
        {
            this.node_qiandao.active = false;
            this.wxQuanState(true);
        }
        else if(data == "close_rank")
        {
            this.wxCloseRank();
            this.node_rank.active = false;
            if(this.openover)
            {
                this.node_over.active = true;
                this.wxOverRank(Math.floor(this.GAME.score),this.GAME.currPlayer,this.GAME.currGun);
            }
            else
            {
                this.wxQuanState(true);
            }

        }
        else if(data == "grouprank")
        {
            this.wxGropShare();
            qianqista.event("btn_grouprank");
        }
        else if(data == "sendcard")
        {
            this.wxGropShareCard();
            qianqista.event("btn_fangdanyi_qiuzu");
        }
        else if(data == "more")
        {
            this.wxMore();
            qianqista.event("btn_more");
        }
        else if(data == "more2")
        {
            this.wxMore2();
            qianqista.event("btn_more_over");
        }
        else if(data == "yindao")
        {
            this.node_game_ui.yindao.active = false;
            this.playerFire();
            storage.setStorageYindao(1);
            this.GAME.yindao = 1;
        }
        else if(data == "roleyaoqing")
        {
            this.openstore = true;
            this.openAward();
        }
        else if(data == "chengjiu")
        {
            this.openChengjiu();
            qianqista.event("btn_chengjiu");
        }
        else if(data == "qiandao")
        {
            this.openQianDao();
            qianqista.event("btn_qiandao");
        }
        else if(data == "lingjiang")
        {
            this.openAward();
            this.wxQuanState(false);
            qianqista.event("btn_lingjiang");
        }
        else if(data == "close_award")
        {
            this.node_award.active = false;
            if(this.openstore)
            {
                this.openstore = false;
            }
            else
            this.wxQuanState(true);
        }
        else if(data == "item_award")
        {
            if(event.target.canset)
            {
                this.lingquAward(event.target.awardid);
            }
        }
        else if(data == "lijiyaoqing")
        {
            this.wxGropShareCoin();
            qianqista.event("btn_lingjaing_yaoqing");
        }
        else if(data == "adlingqu")
        {
            this.wxVideoShow(1);
            qianqista.event("main_video");
        }
        else if(data == "fuhuo_video")
        {
            this.wxVideoShow(2);
            qianqista.event("fuhuo_video");
        }
        else if(data == "savepic")
        {
            this.wxtoTempFilePath();
        }
        else if(data == "zhanshi")
        {
            this.openzhanshi();
        }
        else if(data == "zhanshivedio")
        {
            this.wxVideoShow(3);
        }
        else if(data == "vediostart")
        {
            this.useZhanshiStart();
        }
        else if(data == "close_zhanshi")
        {
            this.node_zhanshi.active = false;
            this.wxQuanState(true);
        }
        else if(data == "linggun")
        {
            this.openLingGun();
        }
        else if(data == "linggunshare")
        {
            this.lingquGun();
        }
        else if(data == "close_linggun")
        {
            this.node_linggun.active = false;
            this.wxQuanState(true);
        }
        else if(data == "fuhuo_xuming")
        {
            this.node_xuming.active = true;
        }
        else if(data == "close_xuming")
        {
            this.node_xuming.active = false;
        }
        else if(data == "xuming")
        {
            this.node_xuming.active = false;
            this.wxXuMing();
        }
        else if(data == "close_coin")
        {
            this.node_coin.active = false;
        }
        else if(data == "vediocoin")
        {
            this.wxVideoShow(1);
        }
        else if(data == "kefu")
        {
            this.wxKefu();
            qianqista.event("btn_linghongbao_kefu");
        }

        cc.log(data);
    },

    openCoinNode: function()
    {
        this.node_coin.active = true;
    },

    lingquGun: function()
    {
        var gunInviteNum = storage.getStorageGunInviteNum();
        var gunInviteAwardNum = storage.getStorageGunInviteAwardNum();
        if(gunInviteNum>=4 && gunInviteAwardNum < 1)
        {
            if(storage.getStorageGun(16) == 1)
            {
                storage.setStorageCoin(parseInt(storage.getStorageCoin())+2000);

                storage.setStorageGunInviteAwardNum(1);
                this.uploadData();
                this.res.showToast("金币+"+2000);
                this.openLingGun();
                this.node_main_coin.getComponent("cc.Label").string = storage.getStorageCoin();
                storage.playSound(res.audio_coin);
            }
            else
            {
                storage.setStorageGun(16,1);
                storage.setStorageGunInviteAwardNum(1);
                this.uploadData();
                this.res.showToast("恭喜获取幻灭");
                this.openLingGun();
            }
        }
        else
            this.wxGropShareLingGun();
    },

    openLingGun: function()
    {
        this.wxQuanState(false);
        this.node_linggun.active = true;
        this.node_linggun_guang.stopAllActions();
        this.node_linggun_guang.runAction(cc.repeatForever(
            cc.rotateBy(1,180)
        ));

        var gunInviteNum = storage.getStorageGunInviteNum();
        var gunInviteAwardNum = storage.getStorageGunInviteAwardNum();

        for(var i=1;i<=4;i++)
        {
            var xiaolian = cc.find("bg/xiaolian_"+i,this.node_linggun);
            if(gunInviteNum>=i)
            {
                xiaolian.color = cc.color(243,152,0);
            }
            else
            {
                xiaolian.color = cc.color(160,160,160);
            }
        }
        if(gunInviteNum>=4 && gunInviteAwardNum < 1)
        {
            cc.find("bg/linggunshare/Label",this.node_linggun).getComponent("cc.Label").string = "领取";
        }
        else
        {
            cc.find("bg/linggunshare/Label",this.node_linggun).getComponent("cc.Label").string = "邀请好友";
        }
    },

    useZhanshiStart: function()
    {
         if(parseInt(this.GAME.score) > storage.getStorageScore())
            storage.setStorageScore(parseInt(this.GAME.score));
        storage.setStorageCoin(parseInt(storage.getStorageCoin()) + parseInt(this.GAME.coin));
        this.node_over.active = false;
        this.node_fuhuo.active = false;
        this.wxCloseFuhuo();

        this.GAME.currPlayerTmp = this.GAME.currPlayer;
        this.GAME.currPlayer = 9;
        this.GAME.useZhanShi = true;
        this.node_zhanshi_vediostart.active = false;
        this.node_zhanshi_zhanshivedio.active = true;
        this.node_zhanshi.active = false;
        this.wxQuanState(false);
        this.again();
    },

    openzhanshi: function()
    {
        this.wxQuanState(false);
        this.node_zhanshi.active = true;
        this.node_zhanshi_guang.stopAllActions();
        this.node_zhanshi_guang.runAction(cc.repeatForever(
            cc.rotateBy(1,180)
        ));
    },

    openSetting: function()
    {
        this.node_setting.active = true;
        this.node_setting_music.getComponent("cc.Toggle").isChecked = (storage.getStorageMusic() == 1 ? true : false);
        this.node_setting_sound.getComponent("cc.Toggle").isChecked = (storage.getStorageSound() == 1 ? true : false);
        this.node_setting_vibrate.getComponent("cc.Toggle").isChecked = (storage.getStorageVibrate() == 1 ? true : false);
    },

    

    updateDian: function()
    {
        var qiandao_dian = cc.find("qiandao/dian",this.node_main);
        var lingjiang_dian = cc.find("lingjiang/dian",this.node_main);
        var chengjiu_dian = cc.find("bottom/chengjiu/dian",this.node_main);
        var chengjiu_dian2 = cc.find("home/dian",this.node_over);

        qiandao_dian.active = false;
        lingjiang_dian.active = false;
        chengjiu_dian.active = false;
        chengjiu_dian2.active = false;

        var currQianDao = storage.getStorageQianDao();
        var currQianDaoTime = storage.getStorageQianDaoTime();
        var now = new Date().getDate();
        currQianDao = parseInt(currQianDao)+1;
        for(var i=1;i<=7;i++)
        {
            if(i==currQianDao && now != currQianDaoTime)
            {
                qiandao_dian.active = true;
                break;
            }
        }

        var inviteNum = storage.getStorageInviteNum();
        var inviteAwardNum = storage.getStorageInviteAwardNum();
        if(inviteAwardNum<10 &&  parseInt(inviteAwardNum) <  parseInt(inviteNum))
        {
            lingjiang_dian.active = true;
        }

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
            chengjiu_dian2.active = true;
        }
    },

    lingquAward: function(id)
    {
        var inviteAwardNum = storage.getStorageInviteAwardNum();

        var coin = this.res.inviteconfig[id-1];
        if(inviteAwardNum>=5)
            coin*=2;
        storage.setStorageCoin(parseInt(storage.getStorageCoin())+coin);

        storage.setStorageInviteAwardNum(parseInt(inviteAwardNum)+1);
        this.uploadData();
        this.res.showToast("金币+"+coin);
        this.openAward();
        this.node_main_coin.getComponent("cc.Label").string = storage.getStorageCoin();
        this.updateDian();
        storage.playSound(this.res.audio_coin);

        var self = this;
        if(inviteAwardNum==4)
        {
            this.node.runAction(cc.sequence(
                cc.delayTime(1),
                cc.callFunc(function(){
                    self.res.showToast("继续邀请，奖励翻倍");
                })
            ));
        }

        qianqista.event("invite_num_"+(parseInt(inviteAwardNum)+1));
    },

    openAward: function()
    {
        this.node_award.active = true;
        var inviteNum = storage.getStorageInviteNum();
        var inviteAwardNum = storage.getStorageInviteAwardNum();
        if(inviteAwardNum<5)
        {
            for(var i=1;i<=5;i++)
            {
                var item = cc.find("item_"+i,this.node_award_itembg);
                var box = cc.find("box",item);
                box.awardid = i;
                box.canset = false;
                if(inviteAwardNum<i)
                {
                    if(inviteNum>=i)
                    {
                        box.color = cc.color(137,87,161);
                        box.canset = true;
                    }
                    else
                    {
                        box.color = cc.color(255,255,255);
                    }
                }
                else
                {
                    box.color = cc.color(181,181,181);
                }
            }
        }
        else
        {
            for(var i=1;i<=5;i++)
            {
                var item = cc.find("item_"+i,this.node_award_itembg);
                var box = cc.find("box",item);
                var coin = cc.find("coin",box);
                coin.getComponent("cc.Label").string = this.res.inviteconfig[i-1]*2;
                box.awardid = i;
                box.canset = false;
                if(inviteAwardNum<i+5)
                {
                    if(inviteNum>=i+5)
                    {
                        box.color = cc.color(137,87,161);
                        box.canset = true;
                    }
                    else
                    {
                        box.color = cc.color(255,255,255);
                    }
                }
                else
                {
                    box.color = cc.color(181,181,181);
                }
            }
        }
    },


    judgeChengjiuUI: function()
    {
        var awardnum = storage.getStorageGunJieSuoAwardNum();
        if(awardnum<this.res.chengjiuconfig.jiesuogun.length)
        {
            var num = storage.getStorageGunJieSuoNum();
            num = parseInt(num) + parseInt(storage.getStorageGunJieSuoNum2());
            var data = this.res.chengjiuconfig.jiesuogun[awardnum];
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
        
        var chengjiu = cc.instantiate(this.res.node_chengjiu);
        this.node.addChild(chengjiu);
        this.node_chengjiu = chengjiu.getComponent("chengjiu");
        this.node_chengjiu.show();
    },

    

    setGunRiQi: function(id)
    {
        storage.setStorageQianDao(id);
        //storage.setStorageQianDaoTime(new Date().getTime());
        storage.setStorageQianDaoTime(new Date().getDate());
        var currQianDao = storage.getStorageQianDao();
        if(currQianDao == 7)
        {
            storage.setStorageGun(10);
            qianqista.event("jiesuo_gun_baleite");
        }

        this.updateGunRiQi();
        this.openQianDao();

        storage.setStorageCoin(parseInt(storage.getStorageCoin()) +  this.res.qiandaoconfig[id-1]);
        this.res.showToast("金币+"+this.res.qiandaoconfig[id-1]);
        this.node_main_coin.getComponent("cc.Label").string = storage.getStorageCoin();

        this.uploadData();
        this.updateDian();
        storage.playSound(this.res.audio_coin);
    },

    openQianDao: function()
    {
        this.node_qiandao.active = true;
        this.wxQuanState(false);

        var currQianDao = storage.getStorageQianDao();
        var currQianDaoTime = storage.getStorageQianDaoTime();
        var now = new Date().getDate();

        currQianDao = parseInt(currQianDao)+1;
        for(var i=1;i<=7;i++)
        {
            var item = cc.find("bg/item_" + i, this.node_qiandao);
            var state = cc.find("state",item);
            item.riqiId = i;
            item.canset = false;

            if(i<currQianDao)
            {
                item.color = cc.color(100,100,100);
                state.getComponent("cc.Label").string = "已领取";
            }
            else if(i==currQianDao && now != currQianDaoTime)
            {
                item.color = cc.color(243,180,69);
                state.getComponent("cc.Label").string = "待领取";
                item.canset = true;
            }
            else
            {
                state.getComponent("cc.Label").string = "未领取";
            }
        }

    },

    

    openGun: function()
    {
        this.node_main.active = false;
        this.node_over.active = false;

        var gun = cc.instantiate(this.res.node_gun);
        this.node.addChild(gun);
        this.node_gun = gun.getComponent("gun");
        this.node_gun.show();
        this.node_gun.roleyaoqing(this.GAME.sharecard);
    },


    openJuese: function()
    {
        this.node_main.active = false;
        this.node_over.active = false;
        var role = cc.instantiate(this.res.node_role);
        this.node.addChild(role);
        this.node_role = role.getComponent("role");
        this.node_role.show();
        this.node_role.roleyaoqing(this.GAME.sharecard);
    },

    startGmae: function()
    {
        var self = this;
        this.node_main.active = false;
        this.node_game_ui.active = true;
        this.movenum = 0;
        this.playerMove(false);

        this.node.runAction(cc.sequence(
            cc.delayTime(0.3),
            cc.callFunc(function(){
                self.GAME.state = "start";
            })
        ));

        this.wxBannerShow();
    },

    goMain: function()
    {
        this.node_setting.active = false;
        this.node_card.active = false;
        this.node_duihuan.active = false;
        this.node_qiandao.active = false;
        this.node_rank.active = false;
        this.node_over.active = false;
        this.openover = false;
        this.wxQuanState(true);
        this.wxCloseOver();
        this.wxCloseRank();
        this.initGmae();
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
        return cc.instantiate(this.res.loutis[type-1]);
    },

    initLouTis: function()
    {
        var s = cc.winSize;
        var currH = 600;
        if(currH < s.height)
        {
            var index = 0;
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
                louti.opacity = 0;
                louti.color = this.ltcolor;
                louti.y = this.last_h;
                b.height = s.height;
                b.color = this.ltcolor;
                louti.data = item;
                this.node_game.addChild(louti,this.ltzorder);
                this.currLoutis.push(louti);

                //添加物品
                var r = Math.random();
                if(r>0.6)
                {
                    var wujian = cc.instantiate(this.res.wujians[Math.floor(Math.random()*this.res.wujians.length)]);
                    var ti = cc.find("ti"+item[1],louti);
                    wujian.x = (ti.width/2 - ti.x)/2;
                    wujian.y = this.tih;
                    wujian.color = this.ltcolor;
                    //wujian.opacity = 100;
                    if(item[0]==2)
                    {
                        wujian.scaleX = -1;
                    }
                    ti.addChild(wujian);
                }


                this.last_h = this.last_h + item[1]*this.tih;
                this.ltzorder--;
                index = i;
                if(currH > s.height*0.8)
                {
                    currH += item[1]*this.tih;
                    break;
                }
                currH += item[1]*this.tih;
            }

            this.loutis.splice(0,index+1);
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

            //添加物品
            var r = Math.random();
            if(r>0.6)
            {
                var wujian = cc.instantiate(this.res.wujians[Math.floor(Math.random()*this.res.wujians.length)]);
                var ti = cc.find("ti"+item[1],louti);
                wujian.x = (ti.width/2 - ti.x)/2;
                wujian.y = this.tih;
                wujian.color = this.ltcolor;
                //wujian.opacity = 100;
                if(item[0]==2)
                {
                    wujian.scaleX = -1;
                }
                ti.addChild(wujian);
            }

            this.last_h = this.last_h + item[1]*this.tih;
            this.ltzorder--;

            this.loutis.splice(0,1);
        }

        for(var i=0;i<this.currLoutis.length;i++)
        {
            var louti = this.currLoutis[i];
            var pos = this.node_game.convertToWorldSpace(louti.position);
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
    },

    createYindao: function()
    {
        this.node_game_ui.yindao.active = true;
        var mask = cc.find("mask",this.node_game_ui.yindao);
        var hand = cc.find("hand",this.node_game_ui.yindao);
        var txt = cc.find("txt",this.node_game_ui.yindao);
        var w = this.player.gun.width + 150;
        if(this.player.height > w)
            w = this.player.height + 150;
        mask.width = w;
        mask.height = w;
        mask.x = this.player.x - this.player.height/2;
        var pos = this.node_game.convertToWorldSpaceAR(this.player.position);
        mask.y = pos.y-50;

        hand.x += mask.x;
        hand.y += mask.y;
        txt.x += mask.x;
        txt.y += mask.y;

        hand.runAction(cc.repeatForever(cc.sequence(
            cc.moveBy(0.5,0,50).easing(cc.easeSineIn()),
            cc.moveBy(0.5,0,-50).easing(cc.easeSineIn())
        )));

    },

    rotateGun: function()
    {
        this.player.gun.stopAllActions();

        this.player.aim.active = true;
        this.player.ismove = false;

        if(this.GAME.yindao == 0)
        {
            var self = this;
            var ang = cc.pAngle(this.enemy.position,this.player.position);
            ang = cc.radiansToDegrees(ang)/2;
            ac = cc.sequence(
                cc.rotateBy(ang/20/2,-ang).easing(cc.easeIn(1.5)),
                cc.callFunc(function(){
                    self.createYindao();
                })
            );
            this.player.gun.runAction(ac);
        }
        else
        {
            var playerConf = this.res.playersconfig[this.GAME.currPlayer];

            var ac = cc.repeatForever(cc.sequence(
                cc.rotateBy(1.1*playerConf.aimSpeed,-60).easing(cc.easeIn(1.5)),
                cc.rotateBy(1.1*playerConf.aimSpeed,60).easing(cc.easeOut(1.5))
            ));

            this.player.gun.runAction(ac);
        }
    },

    updateLouTiOpa: function(dt)
    {
        if(dt>0 && this.movenum<2)
            return;
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
                }
            }
            else
            {
                louti.opindex --;
                if(louti.opindex < 0)
                    louti.opindex = 0;
            }
            louti.runAction(cc.fadeTo(dt,this.op[louti.opindex]));
        }
    },

    initPlayer: function()
    {
        var s = cc.winSize;
        this.player = cc.instantiate(this.res.players[this.GAME.currPlayer]);
        this.player.x = s.width/2;
        this.player.y = 600;
        this.node_game.addChild(this.player,1000001);

        this.player.fangdanyi = cc.instantiate(this.res.fangdanyi);
        this.player.addChild(this.player.fangdanyi,1);
        this.player.fangdanyi.active = false;
        var cardnum = storage.getStorageCard();
        if(this.GAME.fangdanyi && cardnum>0 && this.GAME.playerfangdanyi)
        {
            this.player.fangdanyi.active = true;
        }

        var playerConf = this.res.playersconfig[this.GAME.currPlayer];
        var gunConf = this.res.gunsconfig[this.GAME.currGun];

        this.player.gun = cc.instantiate(this.res.guns[this.GAME.currGun]);
        this.player.gun.y = this.player.height*0.3 + gunConf.y;
        this.player.addChild(this.player.gun,1);
        this.player.scaleX = -1;
        this.lastPlayerPos = this.node_game.convertToWorldSpace(this.player.position);

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

            var gunConf = this.res.gunsconfig[0];
            this.enemy.gun = cc.instantiate(this.res.guns[0]);
            this.enemy.gun.y = this.enemy.height*0.3 + gunConf.y;
            this.enemy.addChild(this.enemy.gun);

            this.enemy.gun_fire = cc.instantiate(this.res.gun_fire);
            this.enemy.gun_fire.y = gunConf.y;
            this.enemy.gun_fire.x = this.enemy.gun.width*(1-this.enemy.gun.anchorX);
            this.enemy.gun_fire.active = false;
            this.enemy.gun.addChild(this.enemy.gun_fire,0);

            this.node_game_ui.boss.active = true;
            this.node_game_ui.boss.getComponent("cc.ProgressBar").progress = 1;

            storage.playSound(this.res.audio_boss_chu);
        }
        else
        {
            var index = Math.floor(Math.random()*this.res.enemys.length);
            this.enemy = cc.instantiate(this.res.enemys[index]);
            this.enemy.enemyindex = index;
            this.enemy.enemytype = this.res.enemysconfig[index].type;
            this.enemy.enemycolor = this.res.enemysconfig[index].color;
            this.node_game.addChild(this.enemy,1000001);

            var gunConf = this.res.gunsconfig[0];
            this.enemy.gun = cc.instantiate(this.res.guns[0]);
            this.enemy.gun.y = this.enemy.height*0.3 + gunConf.y;
            this.enemy.addChild(this.enemy.gun);

            this.enemy.gun_fire = cc.instantiate(this.res.gun_fire);
            this.enemy.gun_fire.y = gunConf.y;
            this.enemy.gun_fire.x = this.enemy.gun.width*(1-this.enemy.gun.anchorX);
            this.enemy.gun_fire.active = false;
            this.enemy.gun.addChild(this.enemy.gun_fire,0);
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
        if(louti)
        {
            var data = louti.data;
            var speed = this.res.playersconfig[this.GAME.currPlayer].speed*700;
            var acs = [];
            var lastp = this.player.position;
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

                        acs.push(cc.callFunc(function(){
                            storage.playSound(self.res.audio_foot_1);
                        }));
                    }
                    else if(num == data[1])
                    {
                        var posx = lastp.x - this.tih;
                        var posy = lastp.y + this.tih;
                        acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                        acs.push(cc.callFunc(function(){
                            storage.playSound(self.res.audio_foot_1);
                        }));

                        if(isWin)
                        {
                            var posx2 = -self.player.width;
                            var posy2 = posy;
                            acs.push(cc.moveTo(Math.abs(this.player.x-posx2)/speed/2,posx2,posy2));
                            acs.push(cc.callFunc(function(){
                                self.gameOver(isWin);
                            }));
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
                        }

                    }
                    else
                    {
                        var posx = lastp.x - this.tih;
                        var posy = lastp.y + this.tih;
                        acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                        lastp = cc.v2(posx,posy);

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
                    if(num == 1)
                    {
                        var posx = ti.x-ti.width/2 - this.tih;
                        var posy = this.player.y;
                        acs.push(cc.moveTo(Math.abs(this.player.x-posx)/speed,posx,posy));
                        var posx2 = posx + this.tih;
                        var posy2 = posy + this.tih;
                        acs.push(cc.jumpTo(this.tih*3/speed,posx2,posy2,this.tih,1));
                        lastp = cc.v2(posx2,posy2);

                        acs.push(cc.callFunc(function(){
                            storage.playSound(self.res.audio_foot_1);
                        }));
                    }
                    else if(num == data[1])
                    {
                        var posx = lastp.x + this.tih;
                        var posy = lastp.y + this.tih;
                        acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                        acs.push(cc.callFunc(function(){
                            storage.playSound(self.res.audio_foot_1);
                        }));

                        if(isWin)
                        {
                            var posx2 = cc.winSize.width+self.player.width;
                            var posy2 = posy;
                            acs.push(cc.moveTo(Math.abs(this.player.x-posx2)/speed/2,posx2,posy2));
                            acs.push(cc.callFunc(function(){
                                self.gameOver(isWin);
                            }));
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
                        }

                    }
                    else
                    {
                        var posx = lastp.x + this.tih;
                        var posy = lastp.y + this.tih;
                        acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                        lastp = cc.v2(posx,posy);

                        acs.push(cc.callFunc(function(){
                            storage.playSound(self.res.audio_foot_1);
                        }));
                    }
                }
            }
            this.player.runAction(cc.sequence(acs));
        }

        this.enemyMove();
    },

    enemyMove: function()
    {
        if(!this.node_game_ui.boss.active)
            this.createEnemy();
        this.enemy.judgeboss = false;
        var self = this;
        var louti = null;
        for(var i=0;i<this.currLoutis.length;i++)
        {
            var l = this.currLoutis[i];
            if(!l.ismove)
            {
                louti = l;
                break;
            }
        }
        if(louti)
        {
            var data = louti.data;
            var acs = [];
            var ti = cc.find("ti" + data[1], louti);
            var speed = 700;
            if(data[0] == 1)//left
            {
                if(this.enemy.enemytype == 4)
                {
                    if(this.enemy.hp == this.enemy.zhp)
                    {
                        this.enemy.scaleX = 1;
                        this.enemy.x = -this.enemy.width-20;
                        this.enemy.y = louti.y+600 + data[1]*this.tih;

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

                                acs.push(cc.callFunc(function(){
                                    storage.playSound(self.res.audio_foot_boss_1);
                                }));
                            }
                            else if(num == data[1])
                            {
                                var posx = lastp.x - this.tih;
                                var posy = lastp.y + this.tih;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                                acs.push(cc.callFunc(function(){
                                    storage.playSound(self.res.audio_foot_boss_1);
                                }));

                                var posx2 = ti.x+ti.width/2 - this.enemy.width/2;
                                var posy2 = posy;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx2,posy2,this.tih,1));
                                acs.push(cc.callFunc(function(){
                                    self.enemy.scaleX = 1;
                                    storage.playSound(self.res.audio_foot_boss_1);
                                }));
                            }
                            else
                            {
                                var posx = lastp.x - this.tih;
                                var posy = lastp.y + this.tih;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                                lastp = cc.v2(posx,posy);

                                acs.push(cc.callFunc(function(){
                                    storage.playSound(self.res.audio_foot_boss_1);
                                }));
                            }
                        }
                    }
                }
                else
                {
                    this.enemy.scaleX = 1;
                    this.enemy.x = -this.enemy.width-20;
                    this.enemy.y = louti.y+600 + data[1]*this.tih;

                    var posx = ti.x+ti.width/2 - this.tih/2;
                    var posy = this.enemy.y;


                    acs.push(cc.spawn(
                        cc.repeat(cc.sequence(cc.rotateBy(0.1,-10),cc.rotateBy(0.1,10)),5),
                        cc.moveTo(0.8,posx,posy)
                    ));
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

                                acs.push(cc.callFunc(function(){
                                    storage.playSound(self.res.audio_foot_boss_1);
                                }));
                            }
                            else if(num == data[1])
                            {
                                var posx = lastp.x + this.tih;
                                var posy = lastp.y + this.tih;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                                acs.push(cc.callFunc(function(){
                                    storage.playSound(self.res.audio_foot_boss_1);
                                }));

                                var posx2 = (ti.x-ti.width/2) + this.enemy.width/2;
                                var posy2 = posy;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx2,posy2,this.tih,1));
                                acs.push(cc.callFunc(function(){
                                    self.enemy.scaleX = -1;
                                    storage.playSound(self.res.audio_foot_boss_1);
                                }));
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

                    acs.push(cc.spawn(
                        cc.repeat(cc.sequence(cc.rotateBy(0.1,10),cc.rotateBy(0.1,-10)),5),
                        cc.moveTo(0.8,posx,posy)
                    ));
                    //acs.push(cc.callFunc(function(){
                    //    self.enemy.die = false;
                    //}));
                }

            }
            acs.push(cc.callFunc(function(){
                self.enemy.ismove = false;
            }));
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

        }
    },

    playerFire: function()
    {
        if(this.player.aim.active)
        {
            var self = this;
            this.player.aim.active = false;
            this.player.kill = false;
            this.player.isfire = true;

            var rota = -this.player.gun.rotation;
            var v = cc.v2(1,0);

            if(this.player.scaleX < 1)
            {
                rota = -rota;
                v = cc.v2(-1,0);
            }
            var rad = cc.degreesToRadians(rota);
            this.player.gun.stopAllActions();
            this.player.gun.hitheadnum = 0;
            this.player.gun.hitbodynum = 0;
            this.player.gun.firenum = 0;
            var gunConf = this.res.gunsconfig[this.GAME.currGun];
            var dis = 1584;
            var bulletspeed = 2200;
            if(cc.sys.os == cc.sys.OS_ANDROID)
                bulletspeed = 1200;
            if(gunConf.type == 1)
            {
                var dir = cc.pRotateByAngle(v,cc.v2(0,0),rad);
                var pos = cc.pMult(dir,1584);

                var gw = this.player.gun.width*(1-this.player.gun.anchorX) + 10;

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

                        var shell = null;
                        if (self.poolshells.size() > 0) {
                            shell = self.poolshells.get();
                            shell.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            shell = cc.instantiate(self.res.shell);
                        }
                        shell.position = cc.pAdd(self.player.position,self.player.aim.position);
                        shell.scaleX = -self.player.scaleX;
                        self.node_game.addChild(shell,1000001);
                        shell.runAction(cc.sequence(
                            cc.delayTime(1),
                            cc.callFunc(function(){
                                self.poolshells.put(shell);
                            })
                        ));

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


                var bullet = null;
                if (this.poolbullets.size() > 0) {
                    bullet = this.poolbullets.get();
                    bullet.collnum = 0;
                    bullet.stopAllActions();
                } else {
                    bullet = cc.instantiate(this.res.bullet_1);
                }
                bullet.position = cc.pAdd(this.player.position,this.player.aim.position);
                bullet.position = cc.pAdd(cc.pMult(dir,gw),bullet.position);
                bullet.opacity = 255;
                this.node_game.addChild(bullet,1000001);
                bullet.diedir = dir;

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
            }
            else if(gunConf.type == 2)
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

                        var shell = null;
                        if (self.poolshells.size() > 0) {
                            shell = self.poolshells.get();
                            shell.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            shell = cc.instantiate(self.res.shell);
                        }
                        shell.position = cc.pAdd(self.player.position,self.player.aim.position);
                        shell.scaleX = -self.player.scaleX;
                        self.node_game.addChild(shell,1000001);
                        shell.runAction(cc.sequence(
                            cc.delayTime(1),
                            cc.callFunc(function(){
                                self.poolshells.put(shell);
                            })
                        ));

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
                var ac2 = cc.sequence(
                    cc.repeat(ac,gunConf.num),
                    cc.delayTime(0.2),
                    cc.rotateTo(Math.abs(this.player.gun.rotation)/100, 0),
                    cc.callFunc(function(){
                        self.playerFireEnd();
                    })
                );
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
                    bullet.position = cc.pAdd(this.player.position,this.player.aim.position);
                    bullet.position = cc.pAdd(cc.pMult(dir2,gw),bullet.position);
                    bullet.opacity = 0;
                    this.node_game.addChild(bullet,1000001);
                    bullet.diedir = dir2;

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

                        var shell = null;
                        if (self.poolshells.size() > 0) {
                            shell = self.poolshells.get();
                            shell.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            shell = cc.instantiate(self.res.shell);
                        }
                        shell.position = cc.pAdd(self.player.position,self.player.aim.position);
                        shell.scaleX = -self.player.scaleX;
                        self.node_game.addChild(shell,1000001);
                        shell.runAction(cc.sequence(
                            cc.delayTime(1),
                            cc.callFunc(function(){
                                self.poolshells.put(shell);
                            })
                        ));

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

                for(var i=0;i<gunConf.num;i++)
                {
                    var r = 0;
                    if(i == 1)
                        r = cc.random0To1()*gunConf.angle;
                    else if(i == 2)
                        r = -cc.random0To1()*gunConf.angle;
                    else if(i > 2)
                        r = cc.randomMinus1To1()*gunConf.angle;

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
                    bullet.position = cc.pAdd(this.player.position,this.player.aim.position);
                    bullet.position = cc.pAdd(cc.pMult(dir2,gw),bullet.position);
                    //bullet.opacity = 0;
                    this.node_game.addChild(bullet,1000001);
                    bullet.diedir = dir2;

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
                }
            }
        }
    },

    playerFireEnd: function()
    {
        this.player.gun.rotation = 0;
        this.player.aim.line.rotation = 0;
        this.player.aim.getComponent("cc.ProgressBar").progress = 0;
    },

    judgeEnemyFire: function()
    {
        this.player.gun.firenum ++;
        var gunConf = this.res.gunsconfig[this.GAME.currGun];
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
                var self = this;
                var ac = cc.sequence(
                    cc.delayTime(0.2),
                    cc.callFunc(function(){
                        self.judgeBossMove();
                    })
                );
                this.node.runAction(ac);
            }
        }
    },

    enemyFire: function()
    {
        var self = this;
        var ang = cc.pAngle(this.player.position,this.enemy.position);
        ang = cc.radiansToDegrees(ang);

        var ac = cc.sequence(
            cc.rotateTo(ang/20*0.2,ang),
            cc.moveBy(0.1,-10,3),
            cc.moveBy(0.1,10,-3),
            cc.callFunc(function(){
                self.enemyFireEnd();
            }),
            cc.delayTime(0.05),
            cc.callFunc(function(){
                self.enemy.gun_fire.active = false;
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
        dir = cc.pNormalize(dir);

        var gw = this.enemy.gun.width*(1-this.enemy.gun.anchorX) + 10;
        var pos = cc.pMult(dir,cc.winSize.height);

        var bullet = cc.instantiate(this.res.ebullet_1);
        bullet.position = cc.pAdd(this.enemy.position,this.enemy.gun.position);
        bullet.position = cc.pAdd(cc.pMult(dir,gw),bullet.position);
        this.node_game.addChild(bullet,1000001);
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
        bullet.runAction(seq);

        storage.playSound(this.res.gunaudios[0]);

        var smoke = null;
        if (this.poolsmokes.size() > 0) {
            smoke = this.poolsmokes.get();
            smoke.getComponent("cc.ParticleSystem").resetSystem();
        } else {
            smoke = cc.instantiate(this.res.smoke);
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

        var shell = null;
        if (this.poolshells.size() > 0) {
            shell = this.poolshells.get();
            shell.getComponent("cc.ParticleSystem").resetSystem();
        } else {
            shell = cc.instantiate(this.res.shell);
        }
        shell.position = cc.pAdd(this.enemy.position,this.enemy.gun.position);
        shell.scaleX = -this.enemy.scaleX;
        this.node_game.addChild(shell,1000001);
        shell.runAction(cc.sequence(
            cc.delayTime(1),
            cc.callFunc(function(){
                self.poolshells.put(shell);
            })
        ));

        this.enemy.gun_fire.active = true;
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
            score *= 2;
        if(isHead)
            score *= 2;

        this.getScore(score);


        var hit = null;
        if (this.poolhits.size() > 0) {
            hit = this.poolhits.get();
            hit.stopAllActions();
        } else {
            hit = cc.instantiate(this.res.hit);
        }
        hit.scale = 0;
        hit.color = this.enemy.enemycolor;
        hit.position = this.enemy.position;
        hit.y += this.enemy.height/2;
        this.node_game.addChild(hit,1000001);
        var sct = 0.5;
        if(isHead)
        {
            this.player.gun.hitheadnum++;
            this.GAME.killhead ++;
            var killhscore = this.GAME.killhead*10;
            if(this.GAME.killhead>=2)
                killhscore += 5*this.GAME.killhead;
            this.node_game_ui.killhead.getComponent("cc.Label").string = "爆头x"+this.GAME.killhead+" 得分"+killhscore;
            this.node_game_ui.killhead.active = true;
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

            this.vibrate();
            //this.playSound(this.res.audio_hit_head);


            var par = null;
            if (this.poolbigbloods.size() > 0) {
                par = this.poolbigbloods.get();
                par.getComponent("cc.ParticleSystem").resetSystem();
            } else {
                par = cc.instantiate(this.bigblood);
            }
            par.getComponent("cc.ParticleSystem").startColor = this.enemy.enemycolor;
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

            storage.setStorageHitHeadNum(parseInt(storage.getStorageHitHeadNum())+1);
        }
        else
        {
            this.player.gun.hitbodynum ++;
            this.node_game_ui.killhead.active = false;
            var killhscore = this.GAME.killhead*10;
            if(this.GAME.killhead>=2)
                killhscore += 5*this.GAME.killhead;
            this.getScore(killhscore);
            this.GAME.killhead = 0;
            //this.playSound(this.res.audio_hit_torso);

            var par = null;
            if (this.poolbloods.size() > 0) {
                par = this.poolbloods.get();
                par.getComponent("cc.ParticleSystem").resetSystem();
            } else {
                par = cc.instantiate(this.res.blood);
            }
            par.getComponent("cc.ParticleSystem").startColor = this.enemy.enemycolor;
            par.getComponent("cc.ParticleSystem").endColor = this.enemy.enemycolor;
            par.position = hit.position;
            par.scaleX = -this.enemy.scaleX;
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
                self.poolhits.put(hit);
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

                var hpbg = new cc.Node();
                var hp = hpbg.addComponent("cc.Label");
                hp.string = "-"+hhp;
                hpbg.position = this.enemy.position;
                hpbg.y += this.enemy.height;
                this.node_game.addChild(hpbg,1000000000);

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
                        self.playerMove(false);
                    })
                );
                if(!this.enemy.ismove && !this.enemy.judgeboss)
                    this.enemy.runAction(ac);
                else
                    this.enemy.judgeboss = true;
            }
            else
            {
                this.enemy.judgeboss = false;
                this.node.stopActionByTag(1000);
                this.removeColl();
                var roang = 180;
                var dis = cc.winSize.width - this.enemy.x;
                if(this.enemy.scaleX == 1)
                {
                    roang = -roang;
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
                        self.playerMove(true);
                    }),
                    cc.removeSelf()
                );
                this.enemy.runAction(ac);
                this.enemy.die = true;

                this.node_game_ui.killhead.active = false;
                this.getScore(10*this.GAME.killhead);
                this.GAME.killhead = 0;

                this.showChuKou();

                storage.setStorageHitBossNum(parseInt(storage.getStorageHitBossNum())+1);
            }
        }
        else
        {
            this.removeColl();
            var roang = 180;
            var dis = cc.winSize.width - this.enemy.x;
            if(this.enemy.scaleX == 1)
            {
                roang = -roang;
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
                    self.playerMove(false);
                }),
                cc.removeSelf()
            );
            //var enemy = this.copyEnemy();
            //enemy.runAction(ac);

            this.enemy.die = true;
            this.enemy.runAction(ac);
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
            chukou.x = chukou.width;
            chukou.scaleX = -1;
        }
        this.node_game.addChild(chukou,this.enemy.louti.zOrder);
    },

    removeColl: function()
    {
        //移除碰撞组件
        var data = this.enemy.louti.data;
        for(var i=1;i<=data[1];i++)
        {
            var ti = cc.find("ti" + i, this.enemy.louti);
            ti.removeComponent('cc.BoxCollider');
            //ti.removeComponent('cc.RigidBody');
        }
    },

    judgeBossMove: function()
    {
        var self = this;
        if(!this.enemy.ismove && this.enemy.judgeboss)
        {
            this.enemy.judgeboss = false;
            self.removeColl();
            self.playerMove(false);
        }
        else
        {
            var ac = cc.sequence(
                cc.delayTime(0.2),
                cc.callFunc(function(){
                    self.judgeBossMove();
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
        this.GAME.state = "over";
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
                    self.fuhuo(true);
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
                    self.gameOver(false);
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
            this.nextLevel();
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
        if(parseInt(this.GAME.score) > storage.getStorageScore())
            storage.setStorageScore(parseInt(this.GAME.score));
        storage.setStorageCoin(parseInt(storage.getStorageCoin()) + parseInt(this.GAME.coin));
        //this.initGmae();
        this.node_game_ui.active = false;
        this.node_over.active = true;
        this.openover = true;
        this.node_over_coin.getComponent("cc.Label").string = parseInt(this.GAME.coin);
        this.node_over_score.getComponent("cc.Label").string = parseInt(this.GAME.score);
        this.node_over_chaoyue.getComponent("cc.Label").string = "超过全国"+ this.getChaoyue2() +"的用户";
        cc.find("change/sp",this.node_over).color = this.ltcolor;
        cc.find("change/txt",this.node_over).color = this.ltcolor;
        cc.find("bg/playerbg/title",this.node_over).getComponent("cc.Label").string = this.getChaoyue3();
        cc.find("bg/playerbg/lv",this.node_over).getComponent("cc.Label").string = "LV-"+this.getChaoyue();
        cc.find("bg/playerbg/player",this.node_over).getComponent("cc.Sprite").spriteFrame = this.getChaoyue4();
        this.wxOverRank(Math.floor(this.GAME.score),this.GAME.currPlayer,this.GAME.currGun);


        if(this.GAME.useZhanShi)
        {
            this.GAME.useZhanShi = false;
            this.GAME.currPlayer = this.GAME.currPlayerTmp;
        }
        this.uploadData();
        this.updateDian();
        this.wxBannerHide();
        qianqista.event("ui_jiesuan");

    },

    judgeFuHuo: function()
    {
        //if(!this.GAME.fangdanyi)
        //{
        //    this.gameResult();
        //    return;
        //}

        this.node_fuhuo.active = true;

        this.node_game_ui.active = false;
        this.node_fuhuo_guang.stopAllActions();
        this.node_fuhuo_guang.runAction(cc.repeatForever(
            cc.rotateBy(1,180)
        ));
        this.node_fuhuo_coin.getComponent("cc.Label").string = Math.floor(this.GAME.coin);
        this.node_fuhuo_score.getComponent("cc.Label").string = parseInt(this.GAME.score);
        this.node_fuhuo_fu_coin.getComponent("cc.Button").interactable = this.GAME.playerfuhuo;
        this.node_fuhuo_fu_video.getComponent("cc.Button").interactable = this.GAME.playerfuhuovideo;
        if(this.GAME.playerfuhuo)
        {
            this.node_fuhuo_fu_coin.color = cc.color(255,255,255);
            this.node_fuhuo_fu_xuming.color = cc.color(255,255,255);
        }
        else
        {
            this.node_fuhuo_fu_coin.color = cc.color(161,161,161);
            this.node_fuhuo_fu_xuming.color = cc.color(161,161,161);
        }
        if(this.GAME.playerfuhuovideo)
            this.node_fuhuo_fu_video.color = cc.color(255,255,255);
        else
            this.node_fuhuo_fu_video.color = cc.color(161,161,161);

        var date = new Date();
        var stringtime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        var time1 = stringtime + " " + this.GAME.xuming.split("-")[0] + ":00";
        var time2 = stringtime + " " + this.GAME.xuming.split("-")[1] + ":00";
        var timestamp1 = (new Date(Date.parse(time1.replace(/-/g,"/")))).getTime();
        var timestamp2 = (new Date(Date.parse(time2.replace(/-/g,"/")))).getTime();
        if(date.getTime()>timestamp1 && date.getTime() < timestamp2)
        {
            this.node_fuhuo_fu_xuming.active = true;
            this.node_fuhuo_fu_coin.active = false;
            this.node_fuhuo_fu_xuming.getComponent("cc.Button").interactable = this.GAME.playerfuhuo;
        }
        else
        {
            this.node_fuhuo_fu_xuming.active = false;
            this.node_fuhuo_fu_coin.active = true;
        }
        this.wxFuhuoRank(Math.floor(this.GAME.score),this.GAME.currPlayer,this.GAME.currGun);
        this.wxBannerShow();
    },

    skip: function()
    {
        this.wxCloseFuhuo();
        this.gameResult();
    },

    fuhuo: function(isCard,isCoin,isVideo)
    {
        var self = this;
        this.node_fuhuo.active = false;
        this.node_game_ui.active = true;


        this.player.position = this.GAME.lastplayerpos;
        this.rotateGun();

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
            this.GAME.playerfuhuovideo = false;
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

        this.wxBannerShow();
    },

    addCoin: function()
    {
        var self = this;
        var coin = null;
        if (this.poolcoins.size() > 0) {
            coin = this.poolcoins.get();
            coin.stopAllActions();
        } else {
            coin = cc.instantiate(this.res.coin);
        }
        coin.position = this.node_game.convertToWorldSpace(this.enemy.position);
        coin.y += this.enemy.height;
        this.node_game_ui.addChild(coin);

        var playerConf = this.res.playersconfig[this.GAME.currPlayer];
        var gunConf = this.res.gunsconfig[this.GAME.currGun];
        var coinNum = 1*(playerConf.coin+gunConf.coin-1);


        var x = coin.x+Math.random()*100+200;
        if(coin.x<cc.winSize.width/2)
            x = coin.x-(Math.random()*100+200);
        var seq = cc.sequence(
            cc.bezierTo(1.5,[cc.v2(coin.x,coin.y-Math.random()*200),
                cc.v2(x,coin.y+Math.random()*200),this.node_game_ui.coinicon.position]),
            cc.callFunc(function(){
                self.getCoin(coinNum);
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
                this.killEnemy(other.tag);
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
                    par = this.poolbloods.get();
                    par.getComponent("cc.ParticleSystem").resetSystem();
                } else {
                    par = cc.instantiate(this.res.blood);
                }
                par.getComponent("cc.ParticleSystem").startColor = this.ltcolor;
                par.getComponent("cc.ParticleSystem").endColor = this.ltcolor;
                par.position = self.node.position;
                par.scaleX = -this.enemy.scaleX;
                this.node_game.addChild(par,1000001);
                var se = this;
                par.runAction(cc.sequence(
                    cc.delayTime(1),
                    cc.callFunc(function(){
                        se.poolbloods.put(par);
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
        var self = this;
        var s = cc.winSize;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {

        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if(this.GAME.yindao == 1)
                this.playerFire();
        }, this);
    },


    update: function(dt) {
        if(this.GAME.state == "start")
        {
            this.updateAim();

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
            sdd = 0.5;
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
                this.subdt = 0;
                this._updaetSubDomainCanvas();
            }
        }

        this.videoTimeDt += dt;
        if(this.node_main_lingqu_time.active && this.videoTimeDt>1)
        {
            this.videoTimeDt = 0;
            var videoTime = storage.getStorageVideoTime();
            if(videoTime<0)
            {
                this.node_main_lingqu_time.active = false;
                this.node_main_lingqu.getComponent("cc.Button").interactable = true;

                this.node_coin_time.active = false;
                this.node_coin_vedio.getComponent("cc.Button").interactable = true;
            }
            else
            {
                this.node_main_lingqu_time.getComponent("cc.Label").string = "0:"+videoTime;
                this.node_coin_time.getComponent("cc.Label").string = "0:"+videoTime;
                storage.setStorageVideoTime(videoTime-1);
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
            return 1;
        }
        else if(this.GAME.score < 50 && this.GAME.score >= 10)
        {
            return 2;
        }
        else if(this.GAME.score < 100 && this.GAME.score >= 50)
        {
            return 3;
        }
        else if(this.GAME.score < 300 && this.GAME.score >=100)
        {
            return 4;
        }
        else if(this.GAME.score < 500 && this.GAME.score >=300)
        {
            return 5;
        }
        else if(this.GAME.score < 1000 && this.GAME.score >=500)
        {
            return 6;
        }
        else if(this.GAME.score < 2000 && this.GAME.score >=1000)
        {
            return 7;
        }
        else if(this.GAME.score < 3000 && this.GAME.score >= 2000)
        {
            return 8;
        }
        else if(this.GAME.score < 4000 && this.GAME.score >= 3000)
        {
            return 9;
        }
        else if(this.GAME.score < 5000 && this.GAME.score >= 4000)
        {
            return 10;
        }
        else if(this.GAME.score < 6000 && this.GAME.score >= 5000)
        {
            return 11;
        }
        else if(this.GAME.score < 10000 && this.GAME.score >= 6000)
        {
            return 12;
        }
        else if(this.GAME.score >= 10000)
        {
            return 13;
        }
    },
    getChaoyue2: function()
    {
        var per = ["3%","9%","12%","18%","32%","45%","66%","72%","81%","86%","90%","95%","99%"];
        return per[this.getChaoyue()-1];
    },
    getChaoyue3: function()
    {
        var per = ["盲人也玩游戏？","和瞎了差不多","斜眼","超级近视眼","近视眼","多练练，会好的","见习枪手",
            "实习枪手","轻松吃鸡","英雄枪手","超级神枪手","无敌神枪手","神一样的枪手"];
        return per[this.getChaoyue()-1];
    },
    getChaoyue4: function()
    {
        return this.res.sp_over_players[this.getChaoyue()-1];
    },


    wxGetUserInfo: function()
    {
        var self = this;
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
                                self.wxOpenSetting();
                                qianqista.login(false);
                            }
                        },
                        success: function(res)
                        {
                            cc.log(res.userInfo);
                            self.userInfo = res.userInfo;
                            qianqista.login(true,res.userInfo);
                            wx.postMessage({ message: "loginSuccess",userInfo:res.userInfo });
                        }
                    });
                }
            });

            wx.showShareMenu({
                withShareTicket: true,
                success: function (res) {
                    // 分享成功
                    qianqista.share(true);
                },
                fail: function (res) {
                    // 分享失败
                    qianqista.share(false);
                }
            });

            wx.onShareAppMessage(function (ops){
                return {
                    query:"channel=sharemenu",
                    withShareTicket: true,
                    title: "自从玩了这个游戏，每把吃鸡都能拿98K",
                    imageUrl: cc.url.raw("resources/zhuanfa.jpg")
                }
            });

            wx.updateShareMenu({
                withShareTicket: true,
                success: function (res) {
                    // 分享成功
                    qianqista.share(true);
                },
                fail: function (res) {
                    // 分享失败
                    qianqista.share(false);
                }
            })
        }
    },

    wxOpenSetting: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            self.node_quanxian.active = true;
            var quan = cc.find("bg",self.node_quanxian);
            var openDataContext = wx.getOpenDataContext();
            var sharedCanvas = openDataContext.canvas;
            var sc = sharedCanvas.width/this.dsize.width;
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
                        button.destroy();
                        self.node_quanxian.active = false;
                        if (authSetting['scope.userInfo'] === true) {
                            wx.getUserInfo({
                                openIdList:['selfOpenId'],
                                lang: 'zh_CN',
                                fail: function (res) {
                                    // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                                    if (res.errMsg.indexOf('auth deny') > -1 ||     res.errMsg.indexOf('auth denied') > -1 ) {
                                        // 处理用户拒绝授权的情况
                                        cc.log(res.errMsg);
                                        qianqista.login(false);
                                        self.wxOpenSetting();
                                    }

                                },
                                success: function(res)
                                {
                                    cc.log(res.userInfo);
                                    self.userInfo = res.userInfo;
                                    qianqista.login(true,res.userInfo);
                                    wx.postMessage({ message: "loginSuccess",userInfo:res.userInfo });
                                }
                            });
                        } else if (authSetting['scope.userInfo'] === false){
                            // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
                            self.wxOpenSetting();
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
            var sharedCanvas = openDataContext.canvas;
            var quan = cc.find("quan",this.node_main_bottom);
            var sc = sharedCanvas.width/this.dsize.width;
            var dpi = cc.view._devicePixelRatio;
            //var pos = cc.v2(quan.x*sc/dpi,sharedCanvas.height/dpi - (quan.y-this.node_main_bottom.y)*sc/dpi);
            var pos = cc.v2(quan.x*sc/dpi,sharedCanvas.height/dpi - quan.y*sc/dpi);
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
        this.node_over.active = false;
        this.display_gray.active = false;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            wx.postMessage({ message: "closeOver" });
        }
    },

    wxCloseRank: function()
    {
        this.node_rank.active = false;
        this.display_gray_rank.active = false;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
            wx.postMessage({ message: "closeRank" });
    },

    wxCloseFuhuo: function()
    {
        this.node_fuhuo.active = false;
        this.display_gray.active = false;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
            wx.postMessage({ message: "closeFuhuo" });
    },

    wxRank: function()
    {
        this.node_rank.active = true;
        this.display_gray_rank.active = true;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
            wx.postMessage({ message: "friendRank" });
    },

    wxOverRank: function(score,playerId,gunId)
    {
        this.node_over.active = true;
        this.display_gray.active = true;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        wx.postMessage({ message: "overRank",score:score,playerId:playerId,gunId:gunId });
    },

    wxFuhuoRank: function(score,playerId,gunId)
    {
        this.node_fuhuo.active = true;
        this.display_gray.active = true;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
            wx.postMessage({ message: "fuhuoRank",score:score,playerId:playerId,gunId:gunId });
    },

    wxUploadScore: function(score,playerId,gunId)
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        wx.postMessage({ message: "updateScore",score:score,playerId:playerId,gunId:gunId });
    },

    wxGropShare: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var query = "channel=groupsharemenu";
            var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            if(this.GAME.shares.groupsharemenu_txt1 && this.GAME.shares.groupsharemenu_pic1)
            {
                if(Math.random()>0.5)
                {
                    query = "channel=groupsharemenu_1";
                    title = this.GAME.shares.groupsharemenu_txt1;
                    imageUrl = this.GAME.shares.groupsharemenu_pic1;
                }
                else
                {
                    query = "channel=groupsharemenu_2";
                    title = this.GAME.shares.groupsharemenu_txt2;
                    imageUrl = this.GAME.shares.groupsharemenu_pic2;
                }
            }
            wx.shareAppMessage({
                query:query,
                title: title,
                imageUrl: imageUrl,
                success: function(res)
                {
                    qianqista.share(true);
                    cc.log(res);
                },
                fail: function()
                {
                    qianqista.share(false);
                }
            });
        }

    },
    wxGropShareChange: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var query = "channel=sharechangemenu";
            var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            if(this.GAME.shares.changemenu_txt1 && this.GAME.shares.changemenu_pic1)
            {
                if(Math.random()>0.5)
                {
                    query = "channel=sharechangemenu_1";
                    title = this.GAME.shares.changemenu_txt1;
                    imageUrl = this.GAME.shares.changemenu_pic1;
                }
                else
                {
                    query = "channel=sharechangemenu_2";
                    title = this.GAME.shares.changemenu_txt2;
                    imageUrl = this.GAME.shares.changemenu_pic2;
                }
            }

            wx.shareAppMessage({
                query:query,
                title: title,
                imageUrl: imageUrl,
                success: function(res)
                {
                    qianqista.share(true);
                    cc.log(res);
                },
                fail: function()
                {
                    qianqista.share(false);
                }
            });
        }

    },

    wxGropShareCard: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var query = "channel=sharecardmenu";
            var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            if(this.GAME.shares.cardmenu_txt1 && this.GAME.shares.cardmenu_pic1)
            {
                if(Math.random()>0.5)
                {
                    query = "channel=sharecardmenu_1";
                    title = this.GAME.shares.cardmenu_txt1;
                    imageUrl = this.GAME.shares.cardmenu_pic1;
                }
                else
                {
                    query = "channel=sharecardmenu_2";
                    title = this.GAME.shares.cardmenu_txt2;
                    imageUrl = this.GAME.shares.cardmenu_pic2;
                }
            }

            wx.shareAppMessage({
                query:query,
                title: title,
                imageUrl: imageUrl,
                success: function(res)
                {
                    if(res.shareTickets && res.shareTickets.length>0)
                    {
                        wx.getShareInfo({
                            shareTicket: res.shareTickets[0],
                            success: function(res)
                            {
                                console.log("------",res);
                                qianqista.getGrpupId(res.encryptedData,res.iv,function(b,openGId,timestamp){
                                    if(b==true && storage.judgeShareGroupState(openGId,timestamp))
                                    {
                                        self.res.showToast("获取到一个防弹衣");

                                        var cardnum = storage.getStorageCard();
                                        cardnum = parseInt(cardnum) + 1;
                                        storage.setStorageCard(cardnum);
                                        self.node_card_num.getComponent("cc.Label").string = cardnum+"";
                                        self.uploadData();
                                    }
                                    else
                                    {
                                        self.res.showToast("每个群每天只能转发一次");
                                    }
                                });
                            }
                        });
                    }
                    else
                    {
                        self.res.showToast("请分享到群");
                    }

                    qianqista.share(true);
                    cc.log(res);
                },
                fail: function()
                {
                    qianqista.share(false);
                }
            });
        }
        else
        {
            var cardnum = storage.getStorageCard();
            cardnum = parseInt(cardnum) + 1;
            storage.setStorageCard(cardnum);
            self.node_card_num.getComponent("cc.Label").string = cardnum+"";
        }
    },

    wxXuMing: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var query = "channel=sharexumingmenu";
            var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            if(this.GAME.shares.cardmenu_txt1 && this.GAME.shares.cardmenu_pic1)
            {
                if(Math.random()>0.5)
                {
                    query = "channel=sharexumingmenu_1";
                    title = this.GAME.shares.cardmenu_txt1;
                    imageUrl = this.GAME.shares.cardmenu_pic1;
                }
                else
                {
                    query = "channel=sharexumingmenu_2";
                    title = this.GAME.shares.cardmenu_txt2;
                    imageUrl = this.GAME.shares.cardmenu_pic2;
                }
            }

            wx.shareAppMessage({
                query:query,
                title: title,
                imageUrl: imageUrl,
                success: function(res)
                {
                    if(res.shareTickets && res.shareTickets.length>0)
                    {
                        self.res.showToast("续命成功");
                        self.fuhuo(false,true,false);
                    }
                    else
                    {
                        self.res.showToast("请分享到群");
                    }

                    qianqista.share(true);
                    cc.log(res);
                },
                fail: function()
                {
                    qianqista.share(false);
                }
            });
        }
        else
        {
            this.fuhuo(false,true,false);
        }
    },

    wxGropShareCoin: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var query = "channel=sharecoinmenu&fromid="+qianqista.openid;
            var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            if(this.GAME.shares.coinmenu_txt1 && this.GAME.shares.coinmenu_pic1)
            {
                if(Math.random()>0.5)
                {
                    query = "channel=sharecoinmenu_1&fromid="+qianqista.openid;
                    title = this.GAME.shares.coinmenu_txt1;
                    imageUrl = this.GAME.shares.coinmenu_pic1;
                }
                else
                {
                    query = "channel=sharecoinmenu_2&fromid="+qianqista.openid;
                    title = this.GAME.shares.coinmenu_txt2;
                    imageUrl = this.GAME.shares.coinmenu_pic2;
                }
            }
            wx.shareAppMessage({
                query:query,
                title: title,
                imageUrl: imageUrl,
                success: function(res)
                {

                    self.res.showToast("分享成功，等待好友上线吧");

                    //var cardnum = self.getStorageCoin();
                    //cardnum = parseInt(cardnum) + 100;
                    //self.setStorageCoin(cardnum);
                    //self.node_role_coin.getComponent("cc.Label").string = cardnum+"";
                    //self.node_gun_coin.getComponent("cc.Label").string = cardnum+"";
                    //self.uploadData();
                    qianqista.share(true);
                    cc.log(res);
                },
                fail: function()
                {
                    qianqista.share(false);
                    self.res.showToast("分享失败！");
                }
            });
        }
        else
        {
            var cardnum = storage.getStorageCoin();
            cardnum = parseInt(cardnum) + 100;
            storage.setStorageCoin(cardnum);
            self.node_role.updateCoin(cardnum);
            self.node_gun_coin.getComponent("cc.Label").string = cardnum+"";
        }
    },

    wxGropShareLingGun: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var query = "channel=sharegun&fromid="+qianqista.openid;
            var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            if(this.GAME.shares.coinmenu_txt1 && this.GAME.shares.coinmenu_pic1)
            {
                if(Math.random()>0.5)
                {
                    query = "channel=sharegun&fromid="+qianqista.openid;
                    title = this.GAME.shares.coinmenu_txt1;
                    imageUrl = this.GAME.shares.coinmenu_pic1;
                }
                else
                {
                    query = "channel=sharegun&fromid="+qianqista.openid;
                    title = this.GAME.shares.coinmenu_txt2;
                    imageUrl = this.GAME.shares.coinmenu_pic2;
                }
            }
            wx.shareAppMessage({
                query:query,
                title: title,
                imageUrl: imageUrl,
                success: function(res)
                {

                    self.res.showToast("分享成功，等待好友上线吧");

                    //var cardnum = self.getStorageCoin();
                    //cardnum = parseInt(cardnum) + 100;
                    //self.setStorageCoin(cardnum);
                    //self.node_role_coin.getComponent("cc.Label").string = cardnum+"";
                    //self.node_gun_coin.getComponent("cc.Label").string = cardnum+"";
                    //self.uploadData();
                    qianqista.share(true);
                    cc.log(res);
                },
                fail: function()
                {
                    qianqista.share(false);
                    self.res.showToast("分享失败！");
                }
            });
        }
        else
        {
            var gunInviteNum = storage.getStorageGunInviteNum();
            storage.setStorageGunInviteNum(parseInt(gunInviteNum)+1);
        }
    },

    wxGropShareFuhuo: function()
    {
        var coinnum = storage.getStorageCoin();
        if(coinnum>=100)
        {
            coinnum = parseInt(coinnum) - 100;
            storage.setStorageCoin(coinnum);
            this.fuhuo(false,true,false);
            this.uploadData();
        }
        else
        {
            this.openCoinNode();
        }
    },

    wxVideoLoad: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            this.rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId:'adunit-b9e3b716f84a52de'});
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

                        self.node_coin_vedio.getComponent("cc.Button").interactable = false;
                        self.node_coin_time.active = true;
                        self.node_coin_time.getComponent("cc.Label").string = "0:30";

                        storage.setStorageVideoTime(30);
                        self.res.showToast("金币+100");
                    }
                    else if(self.GAME.VIDEOAD_TYPE == 3)
                    {
                        self.node_zhanshi_zhanshivedio.active = false;
                        self.node_zhanshi_vediostart.active = true;
                    }
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                    if(self.GAME.VIDEOAD_TYPE == 1)
                        self.res.showToast("金币获取失败");
                }
                storage.resumeMusic();
            });

            this.rewardedVideoAd2 = wx.createRewardedVideoAd({ adUnitId:'adunit-4bc6de7bc3426c18'});
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
                        self.node_zhanshi_zhanshivedio.active = false;
                        self.node_zhanshi_vediostart.active = true;
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
        storage.pauseMusic();
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
                var coin = storage.getStorageCoin();
                coin = parseInt(coin) + 100;
                storage.setStorageCoin(coin);
                self.node_main_coin.getComponent("cc.Label").string = coin+"";
                self.uploadData();

                this.node_main_lingqu.getComponent("cc.Button").interactable = false;
                this.node_main_lingqu_time.active = true;
                this.node_main_lingqu_time.getComponent("cc.Label").string = "0:30";

                this.node_coin_vedio.getComponent("cc.Button").interactable = false;
                this.node_coin_time.active = true;
                this.node_coin_time.getComponent("cc.Label").string = "0:30";

                storage.setStorageVideoTime(30);
            }
            else if(type == 2)
            {
                this.fuhuo(false,false,true);
            }
            else if(type == 3)
            {
                this.node_zhanshi_zhanshivedio.active = false;
                this.node_zhanshi_vediostart.active = true;
            }
            storage.resumeMusic();
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
            var dpi = cc.view._devicePixelRatio;
            this.bannerAd = wx.createBannerAd({
                adUnitId: 'adunit-805ad9676746d8d2',
                style: {
                    left: 0,
                    top: sharedCanvas.height/dpi-300/3.5,
                    width: 300,
                }
            });
            var bannerAd = this.bannerAd;
            this.bannerAd.onResize(function(res){
                // console.log(res.width, res.height)
                // console.log(bannerAd.style.realWidth, bannerAd.style.realHeight)
                bannerAd.style.left = (sharedCanvas.width/dpi-res.width)/2;
                bannerAd.style.top = sharedCanvas.height/dpi-res.height;
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

    wxKefu: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            if(this.GAME.linghongbao == 1)
            {
                wx.openCustomerServiceConversation({});
            }
            else
            {
                this.res.showToast("今天活动已经结束，请明天再来");
            }
        }
    },

    wxMore: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var appIdstr = 'wx604f780b017da7df';
            var pathstr = 'pages/main/main';
            if(this.GAME.more)
            {
                var ss = this.GAME.more.split("--");
                appIdstr = ss[1];
                pathstr = ss[2];
            }

            wx.navigateToMiniProgram({
              appId: appIdstr,
              path: pathstr,
              extraData: {
                foo: 'bar'
              },
              // envVersion: 'develop',
              success(res) {
                // 打开成功
              }
            });
            // wx.previewImage({
            //     urls: ["https://77qqup.com:442/img/wxgame/8e5f995bf8334553abb957ea21eb5b58.jpg"],
            //     success: function (res) {
            //     },
            //     fail: function (res) {
            //         return;
            //     }
            // });
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
                var ss = this.GAME.more2.split("--");
                appIdstr = ss[1];
                pathstr = ss[2];
            }

            wx.navigateToMiniProgram({
              appId: appIdstr,
              path: pathstr,
              extraData: {
                foo: 'bar'
              },
              // envVersion: 'develop',
              success(res) {
                // 打开成功
              }
            });
        }
    },

    wxtoTempFilePath: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var self = this;

            var bg = cc.find("bg",this.node_over);
            var more = cc.find("more",this.node_over);
            var savepic = cc.find("savepic",bg);
            var ma = cc.find("ma",bg);
            savepic.active = false;
            ma.active = true;
            more.active = false;
            this.node_game_ui.active = false;



            this.node.runAction(cc.sequence(
                cc.delayTime(0.1),
                cc.callFunc(function(){
                    self.wxtoTempFilePath2();
                })
            ));


        }
    },

    wxtoTempFilePath2: function()
    {
        var self = this;

        var canvas = cc.game.canvas;

        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        var sc = canvas.width/this.dsize.width;

        var bg = cc.find("bg",this.node_over);
        var more = cc.find("more",this.node_over);
        var savepic = cc.find("savepic",bg);
        var ma = cc.find("ma",bg);

        var w = bg.width;
        var h = bg.height;

        var pos = cc.v2((bg.x-w/2)*sc,(sharedCanvas.height-(bg.y-this.node_main_bottom.y)*sc) - h*sc/2);

        canvas.toTempFilePath({
            x: pos.x,
            y: pos.y,
            width: w*sc,
            height: h*sc,
            destWidth: w*1.5,
            destHeight: h*1.5,
            fileType: "png",
            success: function(res){
                savepic.active = true;
                ma.active = false;
                more.active = true;
                self.node_game_ui.active = true;
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function(){
                        self.res.showToast("保存成功");
                    }
                });
                //wx.shareAppMessage({
                //    title: "自从玩了这个游戏，每把吃鸡都能拿98K",
                //    imageUrl: res.tempFilePath
                //})
            }
        });
    }
});
