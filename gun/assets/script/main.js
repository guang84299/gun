var qianqista = require("qianqista");
var storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {
        chaoyueItem: {
            default: null,
            type: cc.Prefab
        }
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
         this.openduizhan = false;
         this.opentiaozhan = false;
         this.tiaozhanlv = 0;
         this.tiaozhandata = {killEnemy:0,killBoss:0,baoTou:0,fireNum:0,baoTou2:0};
         this.worldrank = {
             wujin:[],
             pk:[]
         };
         this.chaoyueData = [];

         this.res = cc.find("Canvas").getComponent("res");
         this.qianqista = qianqista;

         this.initPhysics();
         this.initData();
         this.initUI();
         this.addListener();

         this.adapt();
         //this.wxUpdate();
         //this.wxGetUserInfo();
         //this.wxOpenQuan();

         storage.playMusic(this.res.audio_bgm);
         storage.preloadSound();
         //this.wxVideoLoad();

         var self = this;


         if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
             BK.Script.logToConsole = 1;
         var score = storage.getStorageScore();
         var jscore = storage.getStorageJScore();
         this.wxUploadScore(score,jscore,1);

         // cc.game.addPersistRootNode(this.node);
         // cc.game.setFrameRate(50);

     },

    initNet: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
            BK.Script.log(1,1,'---------qianqista.init：');
        qianqista.init("101486189","西部神枪手",function(){
            qianqista.datas(function(res){
                console.log('my datas:', res);
                if(res.state == 200)
                {
                    self.updateLocalData(res.data);
                }
            });
            qianqista.pdatas(function(res){
                self.updateLocalData2(res);
            });
            qianqista.rankScore(function(res){
                self.worldrank.wujin = res.data;
            });
            qianqista.rankJScore(function(res){
                self.worldrank.pk = res.data;
            });
        },function(){
            self.startDuizhan();
        });

        qianqista.control(function(res){
            console.log('my control:', res);
            if(res.state == 200)
            {
                self.GAME.control = res.data;
                self.updateUIControl();

            }
        });


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
        this.GAME.isShouYix2 = false;
        this.GAME.isShouYix2Dt = 0;

        this.poolbullets = new cc.NodePool();
        this.poolebullets = new cc.NodePool();
        this.poolhits = new cc.NodePool();
        this.poolsmokes = new cc.NodePool();
        this.poolshells = new cc.NodePool();
        this.poolbloods = new cc.NodePool();
        this.poolbigbloods = new cc.NodePool();
        for(var i=0;i<5;i++)
        {
            var bullet_1 = cc.instantiate(this.res.bullet_1);
            this.poolbullets.put(bullet_1);

            var ebullet_1 = cc.instantiate(this.res.ebullet_1);
            this.poolebullets.put(ebullet_1);

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
        //storage.setStorageCoin(20);

        //storage.setStorageGun(10,0);
        //storage.setStorageCurrGun(1);
        //storage.setStorageQianDao(1);
        //storage.setStorageQianDaoTime(-1);
        //storage.setStorageYindao(0);
        //storage.setStorageGunJieSuoNum(1);
        //storage.setStorageRoleJieSuoNum(4);
        // cc.sys.localStorage.setItem("playnum",0);
        // storage.setStorageInviteNum(5);
        // storage.setStorageInviteAwardNum(4);

        // storage.setStorageGunInviteNum(1);
        // storage.setStorageGunInviteAwardNum(0);
        //storage.setStorageGun(16,0);

        //storage.setStorageLevel(35);

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
        this.node_game_ui.tiaozhanitem1 =  cc.find("tiaozhan/item1",this.node_game_ui);
        this.node_game_ui.tiaozhanitem2 =  cc.find("tiaozhan/item2",this.node_game_ui);
        this.node_game_ui.tiaozhanitem3 =  cc.find("tiaozhan/item3",this.node_game_ui);
        this.node_game_ui.tiaozhanitem4 =  cc.find("tiaozhan/item4",this.node_game_ui);
        this.node_game_ui.tiaozhanitem5 =  cc.find("tiaozhan/item5",this.node_game_ui);
        this.node_game_ui.tiaozhanitem6 =  cc.find("tiaozhan/item6",this.node_game_ui);
        this.node_game_ui.tiaozhanitem7 =  cc.find("tiaozhan/item7",this.node_game_ui);


        this.node_main = cc.find("Canvas/node_main");
        this.node_main_coin = cc.find("coin/num",this.node_main);
        this.node_main_score = cc.find("score",this.node_main);
        this.node_main_bottom = cc.find("bottom",this.node_main);
        this.node_main_lingqu = cc.find("lingqu",this.node_main);
        this.node_main_lingqu_time = cc.find("lingqu/time",this.node_main);
        //this.node_main_start = cc.find("start",this.node_main);
        this.node_main_more = cc.find("more",this.node_main);
        //this.node_main_more2 = cc.find("more2",this.node_main);
        //this.node_main_start.runAction(cc.repeatForever(cc.sequence(
        //        cc.scaleTo(0.5,1.2).easing(cc.easeSineIn()),
        //        cc.scaleTo(0.5,1).easing(cc.easeSineOut())
        //    )));

        this.node_main_morebabg = cc.find("morebabg",this.node_main);
        this.node_main_morebabg_morebaarrow = cc.find("morebabg/morebaarrow",this.node_main);


        var videoTime = storage.getStorageVideoTime();
        if(videoTime>0)
        {
            this.node_main_lingqu.getComponent("cc.Button").interactable = false;
            this.node_main_lingqu_time.active = true;
        }



        this.node_main_zhanshibg_guang = cc.find("zhanshibg/guang",this.node_main);
        this.node_main_fangdanyi_guang = cc.find("fangdanyi/guang",this.node_main);
        this.node_main_linggunbg_guang = cc.find("linggunbg/guang",this.node_main);

        this.node_main_zhanshibg_guang.runAction(cc.repeatForever(cc.rotateBy(2,180)));
        this.node_main_fangdanyi_guang.runAction(cc.repeatForever(cc.rotateBy(2,180)));
        this.node_main_linggunbg_guang.runAction(cc.repeatForever(cc.rotateBy(2,180)));

        this.node_main_libao = cc.find("libao",this.node_main);
        this.node_main_libao.active = false;

        this.node_main_shouyix2 = cc.find("shouyix2",this.node_main);
        this.node_main_shouyix2_bg = cc.find("bg",this.node_main_shouyix2);
        this.node_main_shouyix2_x2 = cc.find("bg/x2",this.node_main_shouyix2);
        this.node_main_shouyix2_coin = cc.find("bg/shouyix2coin",this.node_main_shouyix2);
        this.node_main_shouyix2_str = cc.find("bg/str",this.node_main_shouyix2);
        this.node_main_shouyix2_str_time = this.node_main_shouyix2_str.getComponent("cc.Label");
        this.node_main_shouyix2.active = false;
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
        //this.node_main_more2.active = false;
        this.node_main_morebabg.active = false;
        
        cc.find("fangdanyi",this.node_main).active = false;
        cc.find("bottom/lingjiang",this.node_main).active = false;
        cc.find("linggunbg",this.node_main).active = false;
        

        this.GAME.more = null;
        this.GAME.more2 = null;
        this.GAME.linghongbao = 0;
        this.GAME.sharecard = false;
        this.GAME.sharetiaozhan = false;
        this.GAME.sharetiaozhan_pic = null;
        this.GAME.sharetiaozhan_txt = null;
        this.GAME.sharecoinx2 = false;
        this.GAME.shareqiandao = false;
        this.GAME.moreba = false;
        this.GAME.moreba_items = "";
        this.GAME.pvp_gonggao = null;
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
                        cc.find("bottom/lingjiang",this.node_main).active = true;
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
                else if(con.id == "sharetiaozhan")
                {
                    if(con.value == "1")
                    {
                        this.GAME.sharetiaozhan = true;
                    }
                }
                else if(con.id == "sharetiaozhan_pic")
                {
                    this.GAME.sharetiaozhan_pic = con.value;
                }
                else if(con.id == "sharetiaozhan_txt")
                {
                    this.GAME.sharetiaozhan_txt = con.value;
                }
                else if(con.id == "sharecoinx2")
                {
                    if(con.value == "1")
                    {
                        this.GAME.sharecoinx2 = true;
                    }
                }
                else if(con.id == "shareqiandao")
                {
                    if(con.value == "1")
                    {
                        this.GAME.shareqiandao = true;
                    }
                }
                else if(con.id == "moreba")
                {
                    if(con.value == "1")
                    {
                        this.GAME.moreba = true;
                    }
                }
                else if(con.id == "moreba_items")
                {
                    this.GAME.moreba_items = con.value;
                }
                else if(con.id == "pvp_gonggao")
                {
                    this.GAME.pvp_gonggao = con.value;
                }
                else if(con.id == "publish")
                {
                    if(con.value == "1")
                    {
                        storage.setStoragePublish(1);
                        qianqista.updateUrl2(1);
                    }
                    else
                    {
                        storage.setStoragePublish(0);
                        qianqista.updateUrl2(0);
                    }
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
            this.loadPic(this.node_main_more,pic);
        }
        //if(this.GAME.more2)
        //{
        //    var pic = this.GAME.more2.split("--")[0];
        //    this.node_main_more2.active = true;
        //    this.loadPic(this.node_main_more2,pic);
        //}

        if(this.GAME.moreba)
        {
            this.node_main_morebabg.active = true;
            this.node_main_morebabg_morebaarrow.runAction(cc.repeatForever(cc.sequence(
                cc.moveBy(0.4,6,0).easing(cc.easeSineIn()),
                cc.moveBy(0.4,-6,0).easing(cc.easeSineIn())
            )));

            this.initMoreBaItems();
        }

        this.updateDian();

        if(this.GAME.control.length>0)
        {
            var currQianDao = storage.getStorageQianDao();
            var currQianDaoTime = storage.getStorageQianDaoTime();
            var now = new Date().getDate();
            if(currQianDao < 7 && currQianDaoTime != now)
            {
                this.openQianDao();
            }
        }
    },

    initMoreBaItems: function()
    {
        var items = [];
        if(this.GAME.moreba_items)
            items = this.GAME.moreba_items.split("---");
        for(var i=0;i<8;i++)
        {
            var uitem = cc.find("item"+(i+1),this.node_main_morebabg);
            if(i<items.length)
            {
                uitem.active = true;
                uitem.itemid = i;

                var icon = cc.find("iconbg/icon",uitem);
                var name = cc.find("name",uitem);

                var item = items[i];
                var pic = item.split("--")[1];
                this.loadPic(icon,pic);
                name.getComponent("cc.Label").string = item.split("--")[0];
            }
            else
            {
                uitem.itemid = -1;
                uitem.active = true;
            }
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
    },

    updateLocalData2: function(res)
    {
        var self = this;
        if(res.state == 1)
        {
            qianqista.paddUser(function(res){
                qianqista.rankScore(function(res2){
                    self.worldrank.wujin = res2.data;
                });
                qianqista.rankJScore(function(res2){
                    self.worldrank.pk = res2.data;
                });
            },storage.getStorageScore());
        }
        else
        {
            var datas = res.data;
            if(datas)
            {
                if(datas.jscore)
                    storage.setStorageJScore(datas.jscore);
                if(datas.maxJscore)
                    storage.setStorageMaxJScore(datas.maxJscore);
                if(datas.unionid && datas.unionid.length > 1)
                {
                    storage.setStorageUnionid(datas.unionid);
                    qianqista.isupdateunionid = false;
                }

            }
        }
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
            if(datas.upscore)
                storage.setStorageUpScore(parseInt(datas.upscore));
            if(datas.card)
                storage.setStorageCard(parseInt(datas.card));
            if(datas.qiandao)
                storage.setStorageQianDao(parseInt(datas.qiandao));
            if(datas.winNum)
                storage.setStorageWinNum(datas.winNum);
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
            if(datas.player_10)
                storage.setStoragePlayer(10,parseInt(datas.player_10));
            if(datas.player_11)
                storage.setStoragePlayer(11,parseInt(datas.player_11));
            if(datas.player_12)
                storage.setStoragePlayer(12,parseInt(datas.player_12));
            if(datas.player_13)
                storage.setStoragePlayer(13,parseInt(datas.player_13));
            if(datas.player_14)
                storage.setStoragePlayer(14,parseInt(datas.player_14));
            if(datas.player_15)
                storage.setStoragePlayer(15,parseInt(datas.player_15));
            if(datas.player_16)
                storage.setStoragePlayer(16,parseInt(datas.player_16));
            if(datas.player_17)
                storage.setStoragePlayer(17,parseInt(datas.player_17));
            if(datas.player_18)
                storage.setStoragePlayer(18,parseInt(datas.player_18));
            if(datas.player_19)
                storage.setStoragePlayer(19,parseInt(datas.player_19));

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
            if(datas.roleJiesuoNum2)
                storage.setStorageRoleJieSuoNum2(parseInt(datas.roleJiesuoNum2));
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
            if(datas.winNumAwardNum)
                storage.setStorageWinNumAwardNum(datas.winNumAwardNum);
            if(datas.hasOwnProperty("libaoNum"))
                storage.setStorageLiBaoNum(datas.libaoNum);
            if(datas.hasOwnProperty("usecard"))
                storage.setStorageUseCard(parseInt(datas.usecard));
            if(datas.hasOwnProperty("sytime"))
                storage.setStorageShouYix2Time(datas.sytime);


            this.node_main_coin.getComponent("cc.Label").string = storage.getStorageCoin();
            this.node_main_score.getComponent("cc.Label").string = storage.getStorageScore();
            this.updateDitu();

            //this.wxUpdateUpInviteNum();
            if(storage.getStorageLiBaoNum() == -1 || (storage.getStoragePlayer(10) == 1 && storage.getStorageGun(15)==1))
            {
                this.node_main_libao.active = false;
            }
            else
            {
                this.node_main_libao.active = true;
            }


            var cardnum = storage.getStorageInviteNum() - storage.getStorageUseCard() + 2;
            storage.setStorageCard(cardnum);

            this.updateShouyix2();
        }
        else
        {
            this.uploadData();
        }

    },

    wxUpdateUpInviteNum: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var invitenum = storage.getStorageInviteNum();
            var gameResultData = {
                "infoList": [              //通用数据上报列表
                    {
                        "type": 8,         //必选。数据类型。
                        "op": 2,           //必选。运营类型。1表示增量，2表示存量。
                        "num": invitenum,          //必选。数目。不超过32位有符号数。
                        "extId": 1         //可选。扩展Id。用于特殊数据的上报，如果要填，不能是0。1：分 2：邀请
                    }
                ]
            };
            BK.QQ.reportGameResult(gameResultData, function(errCode, cmd, data) {
                if (errCode !== 0) {
                    //上报运营结果失败
                }else{
                    //上报运营结果成功
                }
            });
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
        datas.upscore = storage.getStorageUpScore();
        datas.card = storage.getStorageCard();
        datas.winNum = storage.getStorageWinNum();
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
        datas.player_10 = storage.getStoragePlayer(10);
        datas.player_11 = storage.getStoragePlayer(11);
        datas.player_12 = storage.getStoragePlayer(12);
        datas.player_13 = storage.getStoragePlayer(13);
        datas.player_14 = storage.getStoragePlayer(14);
        datas.player_15 = storage.getStoragePlayer(15);
        datas.player_16 = storage.getStoragePlayer(16);
        datas.player_17 = storage.getStoragePlayer(17);
        datas.player_18 = storage.getStoragePlayer(18);
        datas.player_19 = storage.getStoragePlayer(19);
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
        datas.roleJiesuoNum2 = storage.getStorageRoleJieSuoNum2();
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
        datas.winNumAwardNum = storage.getStorageWinNumAwardNum();
        datas.libaoNum = storage.getStorageLiBaoNum();
        datas.usecard = storage.getStorageUseCard();
        datas.sytime = storage.getStorageShouYix2Time();


        var data = JSON.stringify(datas);
        var self = this;
        qianqista.uploaddatas(data,function(res){
            console.log("--uploaddatas:",res);
            if(res && res.state == 200)
                self.updateData();
        });

        qianqista.uploadScore(storage.getStorageScore());
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
        if(this.opentiaozhan)
        {
            for(var i=0;i<loutis.length;i++)
            {
                this.loutis.push(loutis[i]);
            }
        }
        this.currLoutis = [];
        this.louticolls = [];
        this.GAME.state = "stop";
        this.GAME.enemy_num = 9 + Math.floor(Math.random() * 3 + 1);
        this.GAME.score = 0;
        this.GAME.coin = 0;
        this.GAME.killhead = 0;
        if(!this.GAME.useZhanShi && !this.GAME.useLiBao)
        {
            this.GAME.currPlayer = storage.getStorageCurrPlayer()-1;
            this.GAME.currPlayerTmp = this.GAME.currPlayer;
        }
        if(!this.GAME.useLiBao)
        {
            this.GAME.currGun = storage.getStorageCurrGun()-1;
            this.GAME.currGunTmp = this.GAME.currGun;
        }

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
        this.node_game.active = true;
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
        if(cc.isValid(this.node_over))
            this.node_over.hide();
        this.openover = false;
        this.initGameData();

        this.ltcolor = this.res.bgcolor[Math.floor(Math.random()*this.res.bgcolor.length)];

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

        if(this.GAME.useZhanShi)
        {
            storage.setStorageHasZhanShi(storage.getStorageHasZhanShi()-1);
        }

        if(this.GAME.useLiBao)
        {
            storage.setStorageLiBaoNum(storage.getStorageLiBaoNum()-1);
        }
    },

    click: function(event,data,page)
    {
        if(data == "start")
        {
            this.wxQuanState(false);
            if(storage.getStorageHasZhanShi() == -1)
            {
                storage.setStorageHasZhanShi(0);
                this.openTryzhanshi();
            }
            else
            {
                this.startGmae();
                this.openTishi();
            }
        }
        else if(data == "juese")
        {
            this.openJuese();
        }
        else if(data == "home")
        {
            this.goMain();
        }
        else if(data == "junhuo")
        {
            this.openGun();
        }
        else if(data == "setting")
        {
            this.wxQuanState(false);
            this.openSetting();
        }
        else if(data == "lingqu")
        {
            this.wxQuanState(false);
            if(this.openover)
                this.wxCloseOver();
           this.openCard();
        }
        else if(data == "duihuan")
        {
            this.wxQuanState(false);
            this.openDuihuan();
        }
        else if(data == "rank")
        {
            this.wxQuanState(false);
            this.openRank();
        }
        else if(data == "fuhuo_card")
        {
            this.fuhuo(true);
        }
        else if(data == "grouprank")
        {
            this.wxGropShare();
            qianqista.event("btn_grouprank");
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
        else if(data == "adlingqu")
        {
            this.wxVideoShow(1);
            qianqista.event("main_video");
        }
        else if(data == "zhanshi")
        {
            this.openzhanshi();
        }
        else if(data == "linggun")
        {
            this.openLingGun();
        }
        else if(data == "duizhan")
        {
            this.openStar();
        }
        else if(data == "tiaozhan")
        {
            this.openTiaoZhan();
        }
        else if(data == "gongzhonghao")
        {
            this.wxGongZhongHao();
        }
        else if(data == "moreba")
        {
            this.openMoreBa();
        }
        else if(data == "morebaitem")
        {
            this.wxMore3(event.target.itemid);
        }
        else if(data == "libao")
        {
            this.openLiBao();
        }
        else if(data == "shouyix2")
        {
            this.wxVideoShow(10);
        }
        cc.log(data);
    },

    updateShouyix2: function()
    {
        this.node_main_shouyix2.active = true;
        var time = storage.getStorageShouYiDt();
        if(time > 24*60*60*1000)
        {
            this.node_main_shouyix2.getComponent("cc.Button").interactable = true;
            this.node_main_shouyix2_bg.color = cc.color(255,255,255);
            this.node_main_shouyix2_x2.color = cc.color(255,255,255);
            this.node_main_shouyix2_coin.active = true;
            this.node_main_shouyix2_str.active = false;
        }
        else if(time <= 24*60*60*1000 && time >= 2*60*60*1000)
        {
            this.node_main_shouyix2.getComponent("cc.Button").interactable = false;
            this.node_main_shouyix2_bg.color = cc.color(160,160,160);
            this.node_main_shouyix2_x2.color = cc.color(160,160,160);
            this.node_main_shouyix2_coin.active = false;
            this.node_main_shouyix2_str.active = true;
            this.node_main_shouyix2_str_time.string = "明天再来";
        }
        else if(time < 2*60*60*1000 && time >= 0)
        {
            this.node_main_shouyix2.getComponent("cc.Button").interactable = false;
            this.node_main_shouyix2_bg.color = cc.color(160,160,160);
            this.node_main_shouyix2_x2.color = cc.color(160,160,160);
            this.node_main_shouyix2_coin.active = false;
            this.node_main_shouyix2_str.active = true;
            this.node_main_shouyix2_str_time.string = "2:00:00";

            this.GAME.isShouYix2 = true;
        }
    },

    updateShouyix2Time: function(dt)
    {
        if(this.GAME.isShouYix2)
        {
            this.GAME.isShouYix2Dt += dt;
            if(this.GAME.isShouYix2Dt>=1)
            {
                this.GAME.isShouYix2Dt = 0;

                var time = storage.getStorageShouYiDt();
                if(time < 2*60*60*1000 && time > 0)
                {
                    time = 2*60*60*1000 - time;
                    var h = Math.floor(time/(60*60*1000));
                    var m = Math.floor((time - h*60*60*1000)/(60*1000));
                    var s = Math.floor(((time - h*60*60*1000 - m*60*1000))/1000);
                    var sh = h < 10 ? "0"+h : h;
                    var sm = m < 10 ? "0"+m : m;
                    var ss = s < 10 ? "0"+s : s;
                    this.node_main_shouyix2_str_time.string = sh+":"+sm+":"+ss;

                    if(cc.isValid(this.node_shouyix2))
                    {
                        this.node_shouyix2.updateShouyix2Time(this.node_main_shouyix2_str_time.string);
                    }
                    if(cc.isValid(this.node_over))
                    {
                        this.node_over.updateShouyix2Time(this.node_main_shouyix2_str_time.string);
                    }
                }
                else
                {
                    this.GAME.isShouYix2 = false;
                    this.updateShouyix2();
                    if(cc.isValid(this.node_shouyix2))
                    {
                        this.node_shouyix2.updateUI();
                    }
                    if(cc.isValid(this.node_over))
                    {
                        this.node_over.updateShouYi();
                    }
                }
            }
        }
    },

    shouyix2: function()
    {
        storage.setStorageShouYix2Time(new Date().getTime());
        this.updateShouyix2();
        this.uploadData();

        if(cc.isValid(this.node_shouyix2))
        {
            this.node_shouyix2.updateUI();
        }
        if(cc.isValid(this.node_over))
        {
            this.node_over.updateShouYi();
        }
    },

    openLiBao: function()
    {
        var libao = cc.instantiate(this.res.node_libao);
        this.node.addChild(libao);
        this.node_libao = libao.getComponent("libao");
        this.node_libao.show();
    },

    openShouYix2: function()
    {
        var shouyix2 = cc.instantiate(this.res.node_shouyix2);
        this.node.addChild(shouyix2);
        this.node_shouyix2 = shouyix2.getComponent("shouyix2");
        this.node_shouyix2.show();
    },

    openMoreBa: function()
    {
        var action = this.node_main_morebabg.getActionByTag(1);
        if(action && !action.isDone())
            return;
        if(this.node_main_morebabg_morebaarrow.active)
        {
            this.node_main_morebabg_morebaarrow.active = false;
            var ac = cc.moveBy(0.5,227,0).easing(cc.easeSineOut());
            ac.setTag(1);
            this.node_main_morebabg.runAction(ac);
        }
        else
        {
            this.node_main_morebabg_morebaarrow.active = true;
            var ac = cc.moveBy(0.5,-227,0).easing(cc.easeSineIn());
            ac.setTag(1);
            this.node_main_morebabg.runAction(ac);
        }
    },

    openCoinx2: function(coin)
    {
        var coinx2 = cc.instantiate(this.res.node_coinx2);
        this.node.addChild(coinx2);
        this.node_coinx2 = coinx2.getComponent("coinx2");
        this.node_coinx2.show(coin);
    },

    openTryzhanshi: function()
    {
        this.wxQuanState(false);
        var tryzhanshi = cc.instantiate(this.res.node_tryzhanshi);
        this.node.addChild(tryzhanshi);
        this.node_tryzhanshi = tryzhanshi.getComponent("tryzhanshi");
        this.node_tryzhanshi.show();
    },

    openTiaoZhandesc: function(lv)
    {
        var self = this;
        this.player.active = false;
        if(this.enemy)
        this.enemy.active = false;

        var tiaozhandesc = cc.instantiate(self.res.node_tiaozhan_desc);
        self.node.addChild(tiaozhandesc);
        self.node_tiaozhan_desc = tiaozhandesc.getComponent("tiaozhandesc");
        self.node_tiaozhan_desc.show(lv);

    },

    openTiaoZhanFail: function(a,b)
    {
        var self = this;
        this.wxBannerHide();
        storage.setStorageCoin(storage.getStorageCoin()+Math.floor(this.GAME.coin));
        if(this.GAME.isShouYix2)
            storage.setStorageCoin(storage.getStorageCoin() + Math.floor(this.GAME.coin));
        this.player.active = false;
        this.enemy.active = false;

        this.node_game_ui.runAction(cc.sequence(
            cc.delayTime(0.3),
            cc.callFunc(function(){
                self.node_game_ui.active = false;

                var tiaozhanfail = cc.instantiate(self.res.node_tiaozhan_fail);
                self.node.addChild(tiaozhanfail);
                self.node_tiaozhan_fail = tiaozhanfail.getComponent("tiaozhanfail");
                self.node_tiaozhan_fail.show(a,b);

                self.wxBannerHide();
            })
        ));

    },

    openTiaoZhanSus: function()
    {
        var self = this;
        this.wxBannerHide();
        storage.setStorageCoin(storage.getStorageCoin()+Math.floor(this.GAME.coin));
        if(this.GAME.isShouYix2)
            storage.setStorageCoin(storage.getStorageCoin() + Math.floor(this.GAME.coin));
        this.player.active = false;
        this.enemy.active = false;

        this.node_game_ui.runAction(cc.sequence(
            cc.delayTime(1.7),
            cc.callFunc(function(){
                self.node_game_ui.active = false;

                var tiaozhansus = cc.instantiate(self.res.node_tiaozhan_sus);
                self.node.addChild(tiaozhansus);
                self.node_tiaozhan_sus = tiaozhansus.getComponent("tiaozhansus");
                self.node_tiaozhan_sus.show();

                self.wxBannerHide();
            })
        ));

    },

    openTiaoZhan: function()
    {
        this.wxQuanState(false);
        this.wxBannerHide();
        this.opentiaozhan = true;
        //this.node_game.active = false;
        this.node_game_ui.active = false;
        this.node_main.active = false;

        var tiaozhan = cc.instantiate(this.res.node_tiaozhan);
        this.node.addChild(tiaozhan);
        this.node_tiaozhan = tiaozhan.getComponent("tiaozhan");
        this.node_tiaozhan.show();
    },

    openStar: function()
    {
        this.wxQuanState(false);
        var star = cc.instantiate(this.res.node_star);
        this.node.addChild(star);
        this.node_star = star.getComponent("star");
        this.node_star.show();
    },

    openDuizhan: function()
    {
        if(this.openduizhan && this.node_duizhan)
            this.node_duizhan.hide();

        this.wxQuanState(false);
        this.openduizhan = true;
        this.node_game.active = false;
        this.node_game_ui.active = false;
        this.node_main.active = false;

        var duizhan = cc.instantiate(this.res.node_duizhan);
        this.node.addChild(duizhan);
        this.node_duizhan = duizhan.getComponent("pk");
        this.node_duizhan.show();
    },

    startDuizhan: function()
    {
        this.openDuizhan();
        var self = this;
        this.node.runAction(cc.sequence(
            cc.delayTime(1),
            cc.callFunc(function(){
                self.node_duizhan.sharePk();
            })
        ));

    },

    openTishi: function()
    {
        var playnum = cc.sys.localStorage.getItem("playnum");
        playnum = playnum ? playnum : 0;
        if(playnum == 1)
        {
            var tishi = cc.instantiate(this.res.node_tishi);
            this.node.addChild(tishi);
            this.node_tishi = tishi.getComponent("tishi");
            this.node_tishi.show();
        }
        playnum ++;
        cc.sys.localStorage.setItem("playnum",playnum);
    },

    openXuming: function()
    {
        var xuming = cc.instantiate(this.res.node_xuming);
        this.node.addChild(xuming);
        this.node_xuming = xuming.getComponent("xuming");
        this.node_xuming.show();
    },

    openRank: function()
    {
        this.wxRank();
        var rank = cc.instantiate(this.res.node_rank);
        this.node.addChild(rank);
        this.node_rank = rank.getComponent("rank");
        this.node_rank.show();
    },

    openDuihuan: function()
    {
        var duihuan = cc.instantiate(this.res.node_duihuan);
        this.node.addChild(duihuan);
        this.node_duihuan = duihuan.getComponent("duihuan");
        this.node_duihuan.show();
        qianqista.event("btn_linghongbao");
    },

    openCard: function()
    {
        var card = cc.instantiate(this.res.node_card);
        this.node.addChild(card);
        this.node_card = card.getComponent("card");
        this.node_card.show();

        qianqista.event("btn_fangdanyi");
    },

    openCoinNode: function()
    {
        var coin = cc.instantiate(this.res.node_coin);
        this.node.addChild(coin);
        this.node_coin = coin.getComponent("coin");
        this.node_coin.show();
    },

    openLingGun: function()
    {
        this.wxQuanState(false);
        
        var linggun = cc.instantiate(this.res.node_linggun);
        this.node.addChild(linggun);
        this.node_linggun = linggun.getComponent("linggun");
        this.node_linggun.show();
    },

    

    openzhanshi: function()
    {
        this.wxQuanState(false);
        var zhanshi = cc.instantiate(this.res.node_zhanshi);
        this.node.addChild(zhanshi);
        this.node_zhanshi = zhanshi.getComponent("zhanshi");
        this.node_zhanshi.show();
    },

    openSetting: function()
    {
        var setting = cc.instantiate(this.res.node_setting);
        this.node.addChild(setting);
        this.node_setting = setting.getComponent("setting");
        this.node_setting.show();
    },

    

    updateDian: function()
    {
        var qiandao_dian = cc.find("qiandao/dian",this.node_main);
        var lingjiang_dian = cc.find("bottom/lingjiang/dian",this.node_main);
        var chengjiu_dian = cc.find("bottom/chengjiu/dian",this.node_main);
        

        qiandao_dian.active = false;
        lingjiang_dian.active = false;
        chengjiu_dian.active = false;
        if(cc.isValid(this.node_over))
            this.node_over.updateDian(false);

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
        for(var i=1;i<=6;i++) {
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
                num = parseInt(num) + parseInt(storage.getStorageRoleJieSuoNum2());
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
            else if (i == 6) {
                var num = storage.getStorageWinNum();
                var awardnum = storage.getStorageWinNumAwardNum();
                var isend = false;
                if (awardnum >= this.res.chengjiuconfig.duizhan.length) {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.res.chengjiuconfig.duizhan[awardnum];
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
        }
    },

    

    openAward: function()
    {
        var award = cc.instantiate(this.res.node_award);
        this.node.addChild(award);
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
            num =  parseInt(num) + parseInt(storage.getStorageRoleJieSuoNum2());
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

    openQianDao: function()
    {
        this.wxQuanState(false);

        var qiandao = cc.instantiate(this.res.node_qiandao);
        this.node.addChild(qiandao);
        this.node_qiandao = qiandao.getComponent("qiandao");
        this.node_qiandao.show();

    },

    openGun: function()
    {
        this.wxQuanState(false);
        this.node_main.active = false;
        if(cc.isValid(this.node_over))
            this.node_over.hide();

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

        this.node.runAction(cc.sequence(
            cc.delayTime(0.3),
            cc.callFunc(function(){
                self.GAME.state = "start";
            })
        ));

        //if(!this.opentiaozhan)
        this.wxBannerShow();
    },

    startTiaoZhan: function()
    {
        this.node_game_ui.tiaozhanitem1.active = false;
        this.node_game_ui.tiaozhanitem2.active = false;
        this.node_game_ui.tiaozhanitem3.active = false;
        this.node_game_ui.tiaozhanitem4.active = false;
        this.node_game_ui.tiaozhanitem5.active = false;
        this.node_game_ui.tiaozhanitem6.active = false;
        this.node_game_ui.tiaozhanitem7.active = false;

        this.tiaozhandata = {killEnemy:0,killBoss:0,baoTou:0,fireNum:0,baoTou2:0};
        this.GAME.enemy_num = this.res.levels[this.tiaozhanlv][0].num;
        this.updateTiaoZhanUI();
        this.startGmae();
    },

    goMain: function()
    {
        this.node_game_ui.tiaozhanitem1.active = false;
        this.node_game_ui.tiaozhanitem2.active = false;
        this.node_game_ui.tiaozhanitem3.active = false;
        this.node_game_ui.tiaozhanitem4.active = false;
        this.node_game_ui.tiaozhanitem5.active = false;
        this.node_game_ui.tiaozhanitem6.active = false;
        this.node_game_ui.tiaozhanitem7.active = false;

        this.openover = false;
        this.wxQuanState(true);
        this.wxCloseOver();
        this.wxCloseRank();
        this.initGmae();


        var showMonyTime = cc.sys.localStorage.getItem("showMonyTime");
        showMonyTime = showMonyTime ? showMonyTime : 0;
        if(new Date().getTime() - showMonyTime > 10*60*1000)
        {
            cc.sys.localStorage.setItem("showMonyTime",new Date().getTime());
            var self = this;
            qianqista.myMony(function(res){
                if(res.data && res.data >= 1)
                {
                    self.res.showToastMony(res.data);
                    storage.playSound(self.res.audio_chengjiu);
                }
            });
        }

    },

    updateTiaoZhanUI: function()
    {
        var res = {a:false,b:false};
        if(this.opentiaozhan)
        {
            var lvdata = this.res.levels[this.tiaozhanlv][0];
            if(lvdata.type == 1)
            {
                this.node_game_ui.tiaozhanitem1.active = true;
                var desc = cc.find("desc",this.node_game_ui.tiaozhanitem1).getComponent("cc.Label");
                var dacheng = cc.find("desc/dacheng",this.node_game_ui.tiaozhanitem1);
                desc.string = this.tiaozhandata.killEnemy + "/" + lvdata.val;
                if(this.tiaozhandata.killEnemy >= lvdata.val)
                {
                    dacheng.x = dacheng.parent.width+3;
                    dacheng.active = true;
                    this.res.showToastRW();
                    this.openTiaoZhanSus();
                    res.a = true;
                }
                else
                {
                    dacheng.active = false;
                    res.a = false;
                }
            }
            else if(lvdata.type == 2)
            {
                this.node_game_ui.tiaozhanitem2.active = true;
                var desc = cc.find("desc",this.node_game_ui.tiaozhanitem2).getComponent("cc.Label");
                var dacheng = cc.find("desc/dacheng",this.node_game_ui.tiaozhanitem2);
                desc.string = this.tiaozhandata.baoTou + "/" + lvdata.val;
                if(this.tiaozhandata.baoTou >= lvdata.val)
                {
                    dacheng.x = dacheng.parent.width+3;
                    dacheng.active = true;
                    this.res.showToastRW();
                    this.openTiaoZhanSus();
                    res.a = true;
                }
                else
                {
                    dacheng.active = false;
                    res.a = false;
                }
            }
            else if(lvdata.type == 3)
            {
                this.node_game_ui.tiaozhanitem1.active = true;
                this.node_game_ui.tiaozhanitem4.active = true;

                var desc = cc.find("desc",this.node_game_ui.tiaozhanitem1).getComponent("cc.Label");
                var dacheng = cc.find("desc/dacheng",this.node_game_ui.tiaozhanitem1);
                desc.string = this.tiaozhandata.killEnemy + "/" + lvdata.val;
                if(this.tiaozhandata.killEnemy >= lvdata.val)
                {
                    dacheng.x = dacheng.parent.width+3;
                    dacheng.active = true;
                    res.b = true;
                }
                else
                {
                    dacheng.active = false;
                    res.b = false;
                }

                var desc2 = cc.find("desc",this.node_game_ui.tiaozhanitem4).getComponent("cc.Label");
                var dacheng2 = cc.find("desc/dacheng",this.node_game_ui.tiaozhanitem4);
                desc2.string = "";
                if(this.GAME.currGun+1 == lvdata.gunId)
                {
                    dacheng2.x = dacheng2.parent.width+3;
                    dacheng2.active = true;
                    res.a = true;
                }
                else
                {
                    dacheng2.active = false;
                    res.a = false;
                }

                if(dacheng.active && dacheng2.active)
                {
                    this.res.showToastRW();
                    this.openTiaoZhanSus();
                }
            }
            else if(lvdata.type == 4)
            {
                this.node_game_ui.tiaozhanitem5.active = true;
                this.node_game_ui.tiaozhanitem7.active = true;

                var desc = cc.find("desc",this.node_game_ui.tiaozhanitem5).getComponent("cc.Label");
                var dacheng = cc.find("desc/dacheng",this.node_game_ui.tiaozhanitem5);
                desc.string = this.tiaozhandata.killBoss + "/" +lvdata.num;
                if(this.tiaozhandata.killBoss >= lvdata.num)
                {
                    dacheng.x = dacheng.parent.width+3;
                    dacheng.active = true;
                    res.a = true;
                }
                else
                {
                    dacheng.active = false;
                    res.a = false;
                }

                var desc2 = cc.find("desc",this.node_game_ui.tiaozhanitem7).getComponent("cc.Label");
                var dacheng2 = cc.find("desc/dacheng",this.node_game_ui.tiaozhanitem7);
                var fireNum = this.tiaozhandata.fireNum;
                fireNum = fireNum == 0 ? 1 : fireNum;
                desc2.string = Math.floor(this.tiaozhandata.baoTou2/fireNum*100)+"%/" + Math.floor(lvdata.val*100)+"%";
                if(this.tiaozhandata.baoTou2/fireNum > lvdata.val)
                {
                    dacheng2.x = dacheng2.parent.width+3;
                    dacheng2.active = true;

                    res.b = true;
                }
                else
                {
                    dacheng2.active = false;
                    res.b = false;
                }

                if(dacheng.active && dacheng2.active)
                {
                    this.res.showToastRW();
                    this.openTiaoZhanSus();
                }
            }
            else if(lvdata.type == 5)
            {
                this.node_game_ui.tiaozhanitem5.active = true;
                var desc = cc.find("desc",this.node_game_ui.tiaozhanitem5).getComponent("cc.Label");
                var dacheng = cc.find("desc/dacheng",this.node_game_ui.tiaozhanitem5);
                desc.string = this.tiaozhandata.killBoss + "/" + lvdata.val;
                if(this.tiaozhandata.killBoss >= lvdata.val)
                {
                    dacheng.x = dacheng.parent.width+3;
                    dacheng.active = true;
                    this.res.showToastRW();
                    this.openTiaoZhanSus();
                    res.a = true;
                }
                else
                {
                    dacheng.active = false;
                    res.a = false;
                }
            }
            else if(lvdata.type == 6)
            {
                this.node_game_ui.tiaozhanitem1.active = true;
                this.node_game_ui.tiaozhanitem6.active = true;

                var desc = cc.find("desc",this.node_game_ui.tiaozhanitem1).getComponent("cc.Label");
                var dacheng = cc.find("desc/dacheng",this.node_game_ui.tiaozhanitem1);
                desc.string = this.tiaozhandata.killEnemy + "/" + lvdata.num;
                if(this.tiaozhandata.killEnemy >= lvdata.num)
                {
                    dacheng.x = dacheng.parent.width+3;
                    dacheng.active = true;
                    res.a = true;
                }
                else
                {
                    dacheng.active = false;
                    res.a = false;
                }

                var desc2 = cc.find("desc",this.node_game_ui.tiaozhanitem6).getComponent("cc.Label");
                var dacheng2 = cc.find("desc/dacheng",this.node_game_ui.tiaozhanitem6);
                var fireNum = this.tiaozhandata.fireNum;
                fireNum = fireNum == 0 ? 1 : fireNum;
                desc2.string = Math.floor(this.tiaozhandata.baoTou2/fireNum*100)+"%/" + Math.floor(lvdata.val*100)+"%";
                if(this.tiaozhandata.baoTou2/fireNum > lvdata.val)
                {
                    dacheng2.x = dacheng2.parent.width+3;
                    dacheng2.active = true;
                    res.b = true;
                }
                else
                {
                    dacheng2.active = false;
                    res.b = false;
                }

                if(dacheng.active && dacheng2.active)
                {
                    this.res.showToastRW();
                    this.openTiaoZhanSus();
                }
            }
        }
        return res;
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
        if(this.GAME.fangdanyi && cardnum>0 && this.GAME.playerfangdanyi && !this.opentiaozhan)
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
        if(this.opentiaozhan) {
            this.createTiaoZhanEnemy();
            return;
        }
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

    createTiaoZhanEnemy: function()
    {
        if(this.GAME.enemy_num <= 1)
        {
            var res = this.updateTiaoZhanUI();
            this.openTiaoZhanFail(res.a,res.b);
            return;
        }

        var lvdata = this.res.levels[this.tiaozhanlv][0];
        if(lvdata.type == 1 || lvdata.type == 2 || lvdata.type == 3 || lvdata.type == 6)
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
        else
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
        this.GAME.enemy_num --;
        this.enemy.ismove = false;
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
            var speed = this.res.playersconfig[this.GAME.currPlayer].speed*850;
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
            var speed = 850;
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

            if(this.opentiaozhan)
            {
                this.tiaozhandata.fireNum += gunConf.num;
            }

            var dis = 1584;
            var bulletspeed = 2200;
            if(cc.sys.os == cc.sys.OS_ANDROID)
                bulletspeed = 1800;
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
            bulletspeed = 1800;

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
        hit.scale = 0.3;
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
            if(disnum>12)
                this.addCoin();

            this.node_game_ui.hitbg.runAction(cc.sequence(
                cc.fadeTo(0.05,150),
                cc.delayTime(0.1),
                cc.fadeOut(0.05)
            ));
            this.node_game.runAction(cc.sequence(
                cc.moveBy(0.05,cc.v2(10,5)).easing(cc.easeSineIn()),
                cc.moveBy(0.05,cc.v2(-10,-5)).easing(cc.easeSineOut()),
                cc.moveBy(0.05,cc.v2(0,5)).easing(cc.easeSineIn()),
                cc.moveBy(0.05,cc.v2(0,-5)).easing(cc.easeSineOut())
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

            if(this.opentiaozhan)
            {
                this.tiaozhandata.baoTou = this.GAME.killhead;
                this.tiaozhandata.baoTou2 += 1;
            }
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

            if(this.opentiaozhan)
            {
                this.tiaozhandata.baoTou = this.GAME.killhead;
            }
        }
        hit.opacity = 120;
        var seq = cc.sequence(
            cc.scaleTo(0.1,sct,sct).easing(cc.easeSineIn()),
            cc.fadeOut(0.06),
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
                var ac = null;
                if(this.opentiaozhan)
                {
                    this.node_game_ui.boss.active = false;
                    ac = cc.sequence(
                        cc.spawn(
                            cc.jumpTo(dis/900,pos,dis/2,1),
                            cc.rotateBy(dis/900,roang)
                        ),
                        cc.callFunc(function(){
                            self.playerMove(false);
                        }),
                        cc.removeSelf()
                    );
                }
                else
                {
                    ac = cc.sequence(
                        cc.spawn(
                            cc.jumpTo(dis/900,pos,dis/2,1),
                            cc.rotateBy(dis/900,roang)
                        ),
                        cc.callFunc(function(){
                            self.playerMove(true);
                        }),
                        cc.removeSelf()
                    );
                }
                this.enemy.runAction(ac);
                this.enemy.die = true;

                this.node_game_ui.killhead.active = false;
                this.getScore(10*this.GAME.killhead);

                if(this.opentiaozhan)
                {
                    this.tiaozhandata.killBoss += 1;
                }
                else
                {
                    this.GAME.killhead = 0;

                    this.showChuKou();
                }


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

            if(this.opentiaozhan)
            {
                this.tiaozhandata.killEnemy += 1;
            }
        }
        this.judgeChengjiuGame();
        this.updateTiaoZhanUI();
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
            if(this.opentiaozhan)
            {
                var res = this.updateTiaoZhanUI();
                this.openTiaoZhanFail(res.a,res.b);
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
        }
    },

    gameResult: function()
    {
        var over = cc.instantiate(this.res.node_over);
        this.node.addChild(over);
        this.node_over = over.getComponent("over");
        this.node_over.show();

        qianqista.rankScore(function(res){
            self.worldrank.wujin = res.data;
        });
    },

    judgeFuHuo: function()
    {
        //if(!this.GAME.fangdanyi)
        //{
        //    this.gameResult();
        //    return;
        //}

        var fuhuo = cc.instantiate(this.res.node_fuhuo);
        this.node.addChild(fuhuo);
        this.node_fuhuo = fuhuo.getComponent("fuhuo");
        this.node_fuhuo.show();

    },

    skip: function()
    {
        this.wxCloseFuhuo();
        this.gameResult();
    },

    fuhuo: function(isCard,isCoin,isVideo)
    {
        var self = this;
        this.node_game_ui.active = true;
        if(cc.isValid(this.node_fuhuo))
            this.node_fuhuo.hide();

        this.player.position = this.GAME.lastplayerpos;
        this.rotateGun();

        if(isCard)
        {
            this.GAME.playerfangdanyi = false;
            storage.setStorageCard(storage.getStorageCard()-1);
            storage.setStorageUseCard(storage.getStorageUseCard()+1);
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

        //if(!this.opentiaozhan)
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
        if(this.openduizhan)
        {
            this.node_duizhan.onCollisionEnter(other,self);
            return;
        }
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

                this.node_game.runAction(cc.sequence(
                    cc.moveBy(0.05,cc.v2(5,2)).easing(cc.easeSineIn()),
                    cc.moveBy(0.05,cc.v2(-5,-2)).easing(cc.easeSineOut())
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

        if(this.openduizhan == false)
        {
            if(this.GAME.state == "start")
            {
                this.updateAim();

                this.uploadScoreDt += dt;
                if(this.uploadScoreDt > 10)
                {
                    this.uploadScoreDt = 0;
                    if(!this.opentiaozhan)
                    {
                        this.wxUpdateScore(Math.floor(this.GAME.score));
                        //this.wxUpdateScore2(Math.floor(this.GAME.score));
                    }

                }
            }
            this.subdt += dt;
            var sdd = 0.02;

            //if(this.GAME.state == "start")
            //{
            //    sdd = 0.5;
            //    if(this.player.ismove)
            //    {
            //        if(this.subdt > sdd)
            //        {
            //            this.subdt = 0;
            //            if(!this.opentiaozhan)
            //                this._updaetSubDomainCanvas();
            //        }
            //    }
            //}
            //else
            //{
            //    if(this.subdt > sdd)
            //    {
            //        this.subdt = 0;
            //        this._updaetSubDomainCanvas();
            //    }
            //}

            this.videoTimeDt += dt;
            if(this.node_main_lingqu_time.active && this.videoTimeDt>1)
            {
                this.videoTimeDt = 0;
                var videoTime = storage.getStorageVideoTime();
                if(videoTime<0)
                {
                    this.node_main_lingqu_time.active = false;
                    this.node_main_lingqu.getComponent("cc.Button").interactable = true;

                    if(cc.isValid(this.node_coin))
                        this.node_coin.updateUI();
                }
                else
                {
                    this.node_main_lingqu_time.getComponent("cc.Label").string = "0:"+videoTime;
                    if(cc.isValid(this.node_coin))
                        this.node_coin.updateUI();
                    storage.setStorageVideoTime(videoTime-1);
                }
            }

            this.updateShouyix2Time(dt);
        }
    },

    vibrate: function(isLong)
    {
        if(storage.getStorageVibrate() == 1 && (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS))
        {
            //if(isLong)
            //{
            //    wx.vibrateLong({});
            //}
            //else
            //{
            //    wx.vibrateShort({});
            //}
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


    //更新
    wxUpdate: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var updateManager = wx.getUpdateManager();

            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                console.log(res.hasUpdate)
            });

            updateManager.onUpdateReady(function () {
                wx.showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启应用？',
                    success: function (res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate();
                        }
                    }
                })
            });

            updateManager.onUpdateFailed(function () {
                // 新版本下载失败
            });
        }
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
                            console.log(res);
                            self.userInfo = res.userInfo;
                            qianqista.login(true,res,function(){
                                self.startDuizhan();
                                qianqista.rankScore(function(res2){
                                    self.worldrank.wujin = res2.data;
                                });
                                qianqista.rankJScore(function(res2){
                                    self.worldrank.pk = res2.data;
                                });
                            });
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

    openQuanxian: function()
    {
        var quanxian = cc.instantiate(this.res.node_quanxian);
        this.node.addChild(quanxian);
        this.node_quanxian = quanxian.getComponent("quanxian");
        this.node_quanxian.show();
    },

    wxOpenSetting: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            self.openQuanxian();
            var quan = self.node_quanxian.quan;
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
                                        cc.log(res.errMsg);
                                        qianqista.login(false);
                                        self.wxOpenSetting();
                                    }

                                },
                                success: function(res)
                                {
                                    console.log(res);
                                    self.userInfo = res.userInfo;
                                    qianqista.login(true,res,function(){
                                        self.startDuizhan();
                                        qianqista.rankScore(function(res2){
                                            self.worldrank.wujin = res2.data;
                                        });
                                        qianqista.rankJScore(function(res2){
                                            self.worldrank.pk = res2.data;
                                        });
                                    });
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
            var quan = cc.find("quan",this.node_main);
            var sc = sharedCanvas.width/this.dsize.width;
            var dpi = cc.view._devicePixelRatio;
            var pos = cc.v2(quan.x*sc/dpi,sharedCanvas.height/dpi - (quan.y-this.node_main_bottom.y)*sc/dpi);
            //var pos = cc.v2(quan.x*sc/dpi,sharedCanvas.height/dpi - quan.y*sc/dpi);
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
            //if(active)
            //    this.quan_button.show();
            //else
            //    this.quan_button.hide();
        }
    },

    wxCloseOver: function()
    {
        if(cc.isValid(this.node_over))
            this.node_over.hide();
        //this.display_gray.active = false;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            //wx.postMessage({ message: "closeOver" });
        }
    },

    wxCloseRank: function()
    {
        //this.display_gray_rank.active = false;
        //if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        //    wx.postMessage({ message: "closeRank" });
    },

    wxCloseFuhuo: function()
    {
        //this.display_gray.active = false;
        //if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        //    wx.postMessage({ message: "closeFuhuo" });
    },

    wxRank: function()
    {
        //this.display_gray_rank.active = true;
        //if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        //    wx.postMessage({ message: "friendRank",worldrank:this.worldrank });
    },

    wxOverRank: function(score,playerId,gunId)
    {
        this.chaoyueData = [];
        this.ranking_list = null;
        //this.display_gray.active = true;
        //if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        //wx.postMessage({ message: "overRank",score:score,playerId:playerId,gunId:gunId });
    },

    wxFuhuoRank: function(score,playerId,gunId)
    {
        //this.display_gray.active = true;
        //if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        //    wx.postMessage({ message: "fuhuoRank",score:score,playerId:playerId,gunId:gunId });
    },

    wxUploadScore: function(score,jscore,callback)
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            if(!score)
                score = 0;
            if(!jscore)
                jscore = 0;
            // wx.postMessage({ message: "updateScore",score:score,playerId:playerId,gunId:gunId });
            var data = {
                userData: [
                    {
                        openId: GameStatusInfo.openId,
                        startMs: ((new Date()).getTime()-24*60*60*1000).toString(),    //必填。 游戏开始时间。单位为毫秒，<font color=#ff0000>类型必须是字符串</font>
                        endMs: ((new Date()).getTime()+3000*24*60*60*1000).toString(),  //必填。 游戏结束时间。单位为毫秒，<font color=#ff0000>类型必须是字符串</font>
                        scoreInfo: {
                            score: score, //分数，类型必须是整型数
                            a1: jscore
                        }
                    }
                ],
                // type 描述附加属性的用途
                // order 排序的方式，
                // 1: 从大到小，即每次上报的分数都会与本周期的最高得分比较，如果大于最高得分则覆盖，否则忽略
                // 2: 从小到大，即每次上报的分数都会与本周期的最低得分比较，如果低于最低得分则覆盖，否则忽略（比如酷跑类游戏的耗时，时间越短越好）
                // 3: 累积，即每次上报的积分都会累积到本周期已上报过的积分上
                // 4: 直接覆盖，每次上报的积分都会将本周期的得分覆盖，不管大小
                // 如score字段对应，上个属性.
                attr: {
                    score: {
                        type: 'rank',
                        order: 1
                    },
                    a1: {
                        type: 'rank',
                        order: 1
                    }
                }
            };

            // gameMode: 游戏模式，如果没有模式区分，直接填 1
            // 必须配置好周期规则后，才能使用数据上报和排行榜功能
            BK.Script.log(1,1,'---------上传分数 --------' + callback);
            BK.QQ.uploadScoreWithoutRoom(1, data, function(errCode, cmd, data) {
                // 返回错误码信息
                BK.Script.log(1,1,'------111---上传分数失败!错误码：' + errCode);
                if(callback && callback == 1)
                {
                    BK.Script.log(1,1,'---------上传分数失败!  1' + callback);
                    self.initNet();
                }
                else
                {
                    BK.Script.log(1,1,'---------上传分数失败!  2' + callback);
                }

                if (errCode !== 0) {
                    BK.Script.log(1,1,'---------上传分数失败!错误码：' + errCode);
                }

            });

        }
        else
        {
            if(callback)
                self.initNet();
        }
    },


    existChaoYue: function(data)
    {
        for(var i=0;i<this.chaoyueData.length;i++)
        {
            var data2 = this.chaoyueData[i];
            if(data.nick == data2.nick &&
                data.url == data2.url)
            {
                return true;
            }
        }
        return false;
    },

    wxUpdateScore: function(score)
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            if(!this.ranking_list)
            {
                var attr = "score";//使用哪一种上报数据做排行，可传入score，a1，a2等
                var order = 2;     //排序的方法：[ 1: 从大到小(单局)，2: 从小到大(单局)，3: 由大到小(累积)]
                var rankType = 0; //要查询的排行榜类型，0: 好友排行榜，1: 群排行榜，2: 讨论组排行榜，3: C2C二人转 (手Q 7.6.0以上支持)
                // 必须配置好周期规则后，才能使用数据上报和排行榜功能
                BK.QQ.getRankListWithoutRoom(attr, order, rankType, function(errCode, cmd, data) {
                    BK.Script.log(1,1,"-------wxUpdateScore callback  cmd" + cmd + " errCode:" + errCode + "  data:" + JSON.stringify(data));
                    // 返回错误码信息
                    if (errCode !== 0) {
                        BK.Script.log(1,1,'------获取排行榜数据失败!错误码：' + errCode);
                        return;
                    }
                    // 解析数据
                    if (data) {
                        self.ranking_list = data.data.ranking_list;
                    }
                });
            }
            else
            {
                var chaoyue = null;
                for(var i=0; i < this.ranking_list.length; ++i)
                {
                    var rd = this.ranking_list[i];
                    if(!rd.selfFlag && !this.existChaoYue(rd))
                    {
                        if(score > rd.score)
                        {
                            chaoyue = rd;
                            break;
                        }
                    }
                }
                if(chaoyue)
                {
                    this.chaoyueData.push(chaoyue);

                    var item = cc.instantiate(this.chaoyueItem);
                    var icon = cc.find("icon",item);
                    var nick = cc.find("nick",item);

                    this.loadPic(icon,chaoyue.url);
                    nick.getComponent("cc.Label").string = "超越"+chaoyue.nick;

                    this.node_game_ui.addChild(item);

                    var seq = cc.sequence(
                        cc.fadeOut(0),
                        cc.moveTo(0,cc.v2(20,this.dsize.height*0.7)),
                        cc.spawn(
                            cc.fadeIn(0.5),
                            cc.moveTo(0.5,cc.v2(20,this.dsize.height*0.75)).easing(cc.easeSineIn())
                        ),
                        cc.delayTime(2),
                        cc.spawn(
                            cc.fadeOut(0.5),
                            cc.moveTo(0.5,cc.v2(20,this.dsize.height*0.8)).easing(cc.easeSineOut())
                        ),
                        cc.removeSelf()
                    );

                    item.runAction(seq);

                    this.wxUploadScore(score);
                }

            }
        }
    },

    wxUpdateScore2: function(score)
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            if(score > storage.getStorageUpScore())
            {
                storage.setStorageUpScore(score);

                var gameResultData = {
                    "infoList": [              //通用数据上报列表
                        {
                            "type": 8,         //必选。数据类型。
                            "op": 2,           //必选。运营类型。1表示增量，2表示存量。
                            "num": score,          //必选。数目。不超过32位有符号数。
                            "extId": 1         //可选。扩展Id。用于特殊数据的上报，如果要填，不能是0。1：分 2：邀请
                        }
                    ]
                };
                BK.QQ.reportGameResult(gameResultData, function(errCode, cmd, data) {
                    if (errCode !== 0) {
                        //上报运营结果失败
                    }else{
                        //上报运营结果成功
                    }
                });
            }
        }
    },

    wxGropShare: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var info = {};
            info.channel = "groupsharemenu";
            var query = JSON.stringify(info);
            var title = "[ QQ 红包 ] 恭喜发财 玩星辉联赛，百元红包等你来领！";
            var imageUrl = "http://www.qiqiup.com/gun.gif";
            var shareInfo = {
                summary:title,          //QQ聊天消息标题
                picUrl:imageUrl,               //QQ聊天消息图片
                extendInfo:query   //QQ聊天消息扩展字段
            };
            BK.QQ.share(shareInfo, function (retCode, shareDest, isFirstShare) {
                BK.Script.log(1, 1, "retCode:" + retCode + " shareDest:" + shareDest + " isFirstShare:" + isFirstShare);
                if (retCode == 0) {
                    BK.Script.log(1, 1, "分享成功：" + retCode);
                    qianqista.share(true);
                }
                else {
                    BK.Script.log(1, 1, "分享失败" + retCode);
                    qianqista.share(false);
                }

            });
            //
            //var query = "channel=groupsharemenu";
            //var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
            //var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
            //if(this.GAME.shares.groupsharemenu_txt1 && this.GAME.shares.groupsharemenu_pic1)
            //{
            //    if(Math.random()>0.5)
            //    {
            //        query = "channel=groupsharemenu_1";
            //        title = this.GAME.shares.groupsharemenu_txt1;
            //        imageUrl = this.GAME.shares.groupsharemenu_pic1;
            //    }
            //    else
            //    {
            //        query = "channel=groupsharemenu_2";
            //        title = this.GAME.shares.groupsharemenu_txt2;
            //        imageUrl = this.GAME.shares.groupsharemenu_pic2;
            //    }
            //}
            //wx.shareAppMessage({
            //    query:query,
            //    title: title,
            //    imageUrl: imageUrl,
            //    success: function(res)
            //    {
            //        qianqista.share(true);
            //        cc.log(res);
            //    },
            //    fail: function()
            //    {
            //        qianqista.share(false);
            //    }
            //});
        }

    },
    

    wxGropShareCard: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var info = {};
            info.channel = "sharecardmenu";
            info.fromid = qianqista.openid;
            var query = JSON.stringify(info);
            var title = "[ QQ 红包 ] 恭喜发财 玩星辉联赛，百元红包等你来领！";
            var imageUrl = "http://www.qiqiup.com/gun.gif";
            var shareInfo = {
                summary:title,          //QQ聊天消息标题
                picUrl:imageUrl,               //QQ聊天消息图片
                extendInfo:query   //QQ聊天消息扩展字段
            };
            BK.QQ.share(shareInfo, function (retCode, shareDest, isFirstShare) {
                BK.Script.log(1, 1, "retCode:" + retCode + " shareDest:" + shareDest + " isFirstShare:" + isFirstShare);
                if (retCode == 0) {
                    BK.Script.log(1, 1, "分享成功：" + retCode);
                    self.res.showToast("等待好友上线吧");

                    //var cardnum = storage.getStorageCard();
                    //cardnum = parseInt(cardnum) + 1;
                    //storage.setStorageCard(cardnum);
                    //self.node_card.updateUI();
                    //self.uploadData();

                    qianqista.share(true);
                }
                else{
                    BK.Script.log(1, 1, "分享失败" + retCode);
                    qianqista.share(false);
                }

            });

        }
        else
        {
            var cardnum = storage.getStorageCard();
            cardnum = parseInt(cardnum) + 1;
            storage.setStorageCard(cardnum);
            self.node_card.updateUI();
        }

        //    var query = "channel=sharecardmenu";
        //    var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
        //    var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
        //    if(this.GAME.shares.cardmenu_txt1 && this.GAME.shares.cardmenu_pic1)
        //    {
        //        if(Math.random()>0.5)
        //        {
        //            query = "channel=sharecardmenu_1";
        //            title = this.GAME.shares.cardmenu_txt1;
        //            imageUrl = this.GAME.shares.cardmenu_pic1;
        //        }
        //        else
        //        {
        //            query = "channel=sharecardmenu_2";
        //            title = this.GAME.shares.cardmenu_txt2;
        //            imageUrl = this.GAME.shares.cardmenu_pic2;
        //        }
        //    }
        //
        //    wx.shareAppMessage({
        //        query:query,
        //        title: title,
        //        imageUrl: imageUrl,
        //        success: function(res)
        //        {
        //            if(res.shareTickets && res.shareTickets.length>0)
        //            {
        //                wx.getShareInfo({
        //                    shareTicket: res.shareTickets[0],
        //                    success: function(res)
        //                    {
        //                        console.log("------",res);
        //                        qianqista.getGrpupId(res.encryptedData,res.iv,function(b,openGId,timestamp){
        //                            if(b==true && storage.judgeShareGroupState(openGId,timestamp))
        //                            {
        //                                self.res.showToast("获取到一个防弹衣");
        //
        //                                var cardnum = storage.getStorageCard();
        //                                cardnum = parseInt(cardnum) + 1;
        //                                storage.setStorageCard(cardnum);
        //                                self.node_card.updateUI();
        //                                self.uploadData();
        //                            }
        //                            else
        //                            {
        //                                self.res.showToast("每个群每天只能转发一次");
        //                            }
        //                        });
        //                    }
        //                });
        //            }
        //            else
        //            {
        //                self.res.showToast("请分享到群");
        //            }
        //
        //            qianqista.share(true);
        //            cc.log(res);
        //        },
        //        fail: function()
        //        {
        //            qianqista.share(false);
        //        }
        //    });
        //}
        //else
        //{
        //    var cardnum = storage.getStorageCard();
        //    cardnum = parseInt(cardnum) + 1;
        //    storage.setStorageCard(cardnum);
        //    self.node_card.updateUI();
        //}
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

                        storage.setStorageVideoTime(30);

                        if(cc.isValid(self.node_coin))
                            self.node_coin.updateUI();

                        self.res.showToast("金币+100");
                    }
                    else if(self.GAME.VIDEOAD_TYPE == 3)
                    {
                        storage.setStorageHasZhanShi(1);
                        if(cc.isValid(self.node_zhanshi))
                            self.node_zhanshi.updateUI();
                        else if(cc.isValid(self.node_tryzhanshi))
                            self.node_tryzhanshi.useZhanshiStart();

                    }
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                    if(self.GAME.VIDEOAD_TYPE == 1)
                        self.res.showToast("金币获取失败");
                }
                //storage.resumeMusic();
                storage.playMusic(self.res.audio_bgm);
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
                        storage.setStorageHasZhanShi(1);
                        if(cc.isValid(self.node_zhanshi))
                            self.node_zhanshi.updateUI();
                        else if(cc.isValid(self.node_tryzhanshi))
                            self.node_tryzhanshi.useZhanshiStart();
                    }
                    else if(self.GAME.VIDEOAD_TYPE == 4)
                    {
                        self.node_tiaozhan_sus.node_tiaozhan_xuanyao.interactable = false;
                        storage.setStorageCoin(storage.getStorageCoin()+self.node_tiaozhan_sus.award*2);
                        self.res.showToast("金币+"+self.node_tiaozhan_sus.award*2);
                        self.node_tiaozhan_sus.updateCoin();
                    }
                    else if(self.GAME.VIDEOAD_TYPE == 5)
                    {
                        self.node_tiaozhan_fail.updateJumpNum();
                    }
                    else if(self.GAME.VIDEOAD_TYPE == 6)
                    {
                        if(self.openduizhan)
                        {
                            self.node_duizhan.jifenx2();
                        }
                    }
                    else if(self.GAME.VIDEOAD_TYPE == 7)
                    {
                        if(cc.isValid(self.node_qiandao))
                            self.node_qiandao.vedioRiqi();
                    }
                    else if(self.GAME.VIDEOAD_TYPE == 8)
                    {
                        if(cc.isValid(self.node_coinx2))
                            self.node_coinx2.lingquSuc();
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
                    else if(self.GAME.VIDEOAD_TYPE == 4)
                    {
                        self.res.showToast("获取失败");
                    }
                    else if(self.GAME.VIDEOAD_TYPE == 5)
                    {
                        self.res.showToast("获取失败");
                    }
                    else if(self.GAME.VIDEOAD_TYPE == 6)
                    {
                        self.res.showToast("获取失败");
                    }
                    else if(self.GAME.VIDEOAD_TYPE == 7)
                    {
                        self.res.showToast("获取失败");
                    }
                    else if(self.GAME.VIDEOAD_TYPE == 8)
                    {
                        self.res.showToast("获取失败");
                    }

                }
                //storage.resumeMusic();
                storage.playMusic(self.res.audio_bgm);
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
            BK.Advertisement.fetchVideoAd(1 /* resultPage */, function (retCode, msg, handle) {
                if (retCode == 0) {

                    handle.setEventCallack(function (code, msg) {
                        BK.Script.log(1, 1, "closeGame"); //关闭游戏

                    }.bind(this), function (code, msg) {
                        //code ==0
                        BK.Script.log(1, 1, "endVide code:" + code + " msg:" + msg); //视频结束
                        handle.jiangli = true;
                    }.bind(this), function (code, msg) {
                        //code ==0
                        if(handle.jiangli)
                        {
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
                            else if(self.GAME.VIDEOAD_TYPE == 2)
                            {
                                self.fuhuo(false,false,true);
                                self.res.showToast("复活成功");
                            }
                            else if(self.GAME.VIDEOAD_TYPE == 3)
                            {
                                storage.setStorageHasZhanShi(1);
                                if(cc.isValid(self.node_zhanshi))
                                    self.node_zhanshi.updateUI();
                                else if(cc.isValid(self.node_tryzhanshi))
                                    self.node_tryzhanshi.useZhanshiStart();
                            }
                            else if(self.GAME.VIDEOAD_TYPE == 4)
                            {
                                self.node_tiaozhan_sus.node_tiaozhan_xuanyao.interactable = false;
                                var fr = 1;
                                if(self.GAME.isShouYix2)
                                    fr = 2;
                                storage.setStorageCoin(storage.getStorageCoin()+self.node_tiaozhan_sus.award*2*fr);
                                self.res.showToast("金币+"+self.node_tiaozhan_sus.award*2*fr);
                                self.node_tiaozhan_sus.updateCoin();
                            }
                            else if(self.GAME.VIDEOAD_TYPE == 5)
                            {
                                self.node_tiaozhan_fail.updateJumpNum();
                            }
                            else if(self.GAME.VIDEOAD_TYPE == 6)
                            {
                                if(self.openduizhan)
                                {
                                    self.node_duizhan.jifenx2();
                                }
                            }
                            else if(self.GAME.VIDEOAD_TYPE == 7)
                            {
                                if(cc.isValid(self.node_qiandao))
                                    self.node_qiandao.vedioRiqi();
                            }
                            else if(self.GAME.VIDEOAD_TYPE == 8)
                            {
                                if(cc.isValid(self.node_coinx2))
                                    self.node_coinx2.lingquSuc();
                            }
                            else if(self.GAME.VIDEOAD_TYPE == 9)
                            {
                                storage.setStorageLiBaoNum(3);
                                if(cc.isValid(self.node_libao))
                                    self.node_libao.updateUI();
                            }
                            else if(self.GAME.VIDEOAD_TYPE == 10)
                            {
                                self.shouyix2();
                            }
                        }
                        else
                        {
                            if(self.GAME.VIDEOAD_TYPE == 1)
                            {
                                self.res.showToast("金币获取失败");
                            }
                            if(self.GAME.VIDEOAD_TYPE == 2)
                            {
                                self.res.showToast("复活失败");
                            }
                            else if(self.GAME.VIDEOAD_TYPE == 3)
                            {
                                self.res.showToast("体验失败");
                            }
                            else
                            {
                                self.res.showToast("获取失败");
                            }
                        }
                        storage.playMusic(self.res.audio_bgm);
                        BK.Script.log(1, 1, "endVide code:" + code + " msg:" + msg); //关闭视频webview
                    }.bind(this), function (code, msg) {
                        //code ==0
                        handle.jiangli = false;
                        BK.Script.log(1, 1, "endVide code:" + code + " msg:" + msg); //开始播放视频
                    }.bind(this));
                    //跳转至播放界面
                    handle.jump();
                }
                else {
                    BK.Script.log(1, 1, "error:" + retCode + " msg:" + msg);
                }
            }.bind(this));
            //if(type == 1)
            //{
            //    this.rewardedVideoAd.show().catch(function(err){
            //        self.rewardedVideoAd.load().then(function(){
            //            self.rewardedVideoAd.show();
            //        });
            //    });
            //}
            //else
            //{
            //    this.rewardedVideoAd2.show().catch(function(err){
            //        self.rewardedVideoAd2.load().then(function(){
            //            self.rewardedVideoAd2.show();
            //        });
            //    });
            //}
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

                storage.setStorageVideoTime(30);
                if(cc.isValid(self.node_coin))
                    self.node_coin.updateUI();
            }
            else if(type == 2)
            {
                this.fuhuo(false,false,true);
            }
            else if(type == 3)
            {
                storage.setStorageHasZhanShi(1);
                if(cc.isValid(this.node_zhanshi))
                    this.node_zhanshi.updateUI();
                else if(cc.isValid(this.node_tryzhanshi))
                    this.node_tryzhanshi.useZhanshiStart();
            }
            else if(type == 4)
            {
                this.node_tiaozhan_sus.node_tiaozhan_xuanyao.interactable = false;
                var fr = 1;
                if(this.GAME.isShouYix2)
                    fr = 2;
                storage.setStorageCoin(storage.getStorageCoin()+this.node_tiaozhan_sus.award*2*fr);
                this.res.showToast("金币+"+this.node_tiaozhan_sus.award*2*fr);
                this.node_tiaozhan_sus.updateCoin();
            }
            else if(type == 5)
            {
                this.node_tiaozhan_fail.updateJumpNum();
            }
            else if(type == 6)
            {
                if(this.openduizhan)
                {
                    this.node_duizhan.jifenx2();
                }
            }
            else if(type == 7)
            {
                if(cc.isValid(this.node_qiandao))
                    this.node_qiandao.vedioRiqi();
            }
            else if(type == 8)
            {
                if(cc.isValid(this.node_coinx2))
                    this.node_coinx2.lingquSuc();
            }
            else if(type == 9)
            {
                storage.setStorageLiBaoNum(3);
                if(cc.isValid(self.node_libao))
                    self.node_libao.updateUI();
            }
            else if(type == 10)
            {
                self.shouyix2();
            }
            //storage.resumeMusic();
            storage.playMusic(self.res.audio_bgm);
        }
    },

    wxBannerShow: function()
    {
        var self = this;
        this.wxBannerHide();
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            BK.Advertisement.fetchBannerAd(function (retCode, msg, adBannerHandle) {
                if (retCode == 0) {
                    //2.开发者 使用adBannerHanlde
                    //2.1 决定是否展示
                    self.bannerAd = adBannerHandle;
                    adBannerHandle.show(function (succCode, msg, handle) {
                        if (succCode == 0) {
                            //
                        }
                        else {
                            BK.Script.log(1, 1, "展示失败 msg:" + msg);
                        }
                    });
                    //2.2 开发者主动关闭广告。
                    //adBannerHandle.close();
                    //2.3 开发者监听事件
                    adBannerHandle.onClickContent(function () {
                        //用户点击了落地页
                    });
                    adBannerHandle.onClickClose(function () {
                        //用户点击了X关闭广告
                    });
                }
                else {
                    BK.Script.log(1, 1, "fetchBannerAd failed. retCode:" + retCode);
                }
            }.bind(this));
            //var openDataContext = wx.getOpenDataContext();
            //var sharedCanvas = openDataContext.canvas;
            //var sc = sharedCanvas.width/this.dsize.width;
            //var dpi = cc.view._devicePixelRatio;
            //this.bannerAd = wx.createBannerAd({
            //    adUnitId: 'adunit-805ad9676746d8d2',
            //    style: {
            //        left: 0,
            //        top: sharedCanvas.height/dpi-300/3.5,
            //        width: 300,
            //    }
            //});
            //var bannerAd = this.bannerAd;
            //this.bannerAd.onResize(function(res){
            //    // console.log(res.width, res.height)
            //    // console.log(bannerAd.style.realWidth, bannerAd.style.realHeight)
            //    bannerAd.style.left = (sharedCanvas.width/dpi-res.width)/2;
            //    bannerAd.style.top = sharedCanvas.height/dpi-res.height;
            //});
            //this.bannerAd.show();
        }
    },

    wxBannerHide: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            if(self.bannerAd)
                self.bannerAd.close();
            self.bannerAd = null;
            //if(this.bannerAd)
            //    this.bannerAd.hide();
        }
    },

    

    wxMore: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var desGameId = 2904; //跳转的gameid，必须为数字
            var extendInfo = "2903"; //额外参数，必须为字符串
            BK.QQ.skipGame(desGameId, extendInfo);
            //var appIdstr = 'wx604f780b017da7df';
            //var pathstr = 'pages/main/main';
            //if(this.GAME.more)
            //{
            //    var ss = this.GAME.more.split("--");
            //    appIdstr = ss[1];
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
            //});

        }
    },

    wxMore2: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var desGameId = 2832; //跳转的gameid，必须为数字
            var extendInfo = "101483649"; //额外参数，必须为字符串
            BK.QQ.skipGame(desGameId, extendInfo);
            //var appIdstr = 'wx604f780b017da7df';
            //var pathstr = 'pages/main/main';
            //if(this.GAME.more2)
            //{
            //    var ss = this.GAME.more2.split("--");
            //    appIdstr = ss[1];
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
            //});
        }
    },

    wxMore3: function(itemid)
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var desGameId = 2832; //跳转的gameid，必须为数字
            var extendInfo = "101483649"; //额外参数，必须为字符串
            if(this.GAME.moreba_items && itemid>=0)
            {
                var item = this.GAME.moreba_items.split("---")[itemid];
                var ss = item.split("--");
                desGameId = ss[2];

            }
            BK.QQ.skipGame(desGameId, extendInfo);

            //var appIdstr = 'wx604f780b017da7df';
            //var pathstr = 'pages/main/main';
            //if(this.GAME.moreba_items && itemid>=0)
            //{
            //    var item = this.GAME.moreba_items.split("---")[itemid];
            //    var ss = item.split("--");
            //    appIdstr = ss[2];
            //    if(ss[3])
            //    pathstr = ss[3];
            //}
            //
            //wx.navigateToMiniProgram({
            //    appId: appIdstr,
            //    path: pathstr,
            //    extraData: {
            //        foo: 'bar'
            //    },
            //    // envVersion: 'develop',
            //    success: function(res) {
            //        // 打开成功
            //    }
            //});
        }
        else
        {
            if(this.GAME.moreba_items  && itemid>=0)
            {
                var item = this.GAME.moreba_items.split("---")[itemid];
                console.log(item);
                var ss = item.split("--");
                console.log(ss);

            }
        }
    },

    wxGongZhongHao: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            BK.QQ.enterPubAccountCard("1290239091");
            //wx.previewImage({
            //     urls: ["https://77qqup.com:442/img/wxgame/192b9782835246449b8f4e62f3ed568c.jpg?="+Math.random()],
            //     success: function (res) {
            //     },
            //     fail: function (res) {
            //         return;
            //     }
            //});
        }
    }

    
});
