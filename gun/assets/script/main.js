var qianqista = require("qianqista");

cc.Class({
    extends: cc.Component,

    properties: {
        louti_1: {
            default: null,
            type: cc.Prefab
        },
        louti_2: {
            default: null,
            type: cc.Prefab
        },
        louti_3: {
            default: null,
            type: cc.Prefab
        },
        louti_4: {
            default: null,
            type: cc.Prefab
        },
        louti_5: {
            default: null,
            type: cc.Prefab
        },
        louti_6: {
            default: null,
            type: cc.Prefab
        },
        louti_7: {
            default: null,
            type: cc.Prefab
        },
        louti_8: {
            default: null,
            type: cc.Prefab
        },
        aim_1: {
            default: null,
            type: cc.Prefab
        },
        player_1: {
            default: null,
            type: cc.Prefab
        },
        player_2: {
            default: null,
            type: cc.Prefab
        },
        player_3: {
            default: null,
            type: cc.Prefab
        },
        player_4: {
            default: null,
            type: cc.Prefab
        },
        player_5: {
            default: null,
            type: cc.Prefab
        },
        player_6: {
            default: null,
            type: cc.Prefab
        },
        player_7: {
            default: null,
            type: cc.Prefab
        },
        player_8: {
            default: null,
            type: cc.Prefab
        },
        player_9: {
            default: null,
            type: cc.Prefab
        },
        enemy_1: {
            default: null,
            type: cc.Prefab
        },
        enemy_2: {
            default: null,
            type: cc.Prefab
        },
        enemy_3: {
            default: null,
            type: cc.Prefab
        },
        enemy_4: {
            default: null,
            type: cc.Prefab
        },
        enemy_5: {
            default: null,
            type: cc.Prefab
        },
        enemy_6: {
            default: null,
            type: cc.Prefab
        },
        enemy_7: {
            default: null,
            type: cc.Prefab
        },
        enemy_8: {
            default: null,
            type: cc.Prefab
        },
        enemy_9: {
            default: null,
            type: cc.Prefab
        },
        enemy_10: {
            default: null,
            type: cc.Prefab
        },
        enemy_11: {
            default: null,
            type: cc.Prefab
        },
        enemy_12: {
            default: null,
            type: cc.Prefab
        },
        enemy_13: {
            default: null,
            type: cc.Prefab
        },
        enemy_14: {
            default: null,
            type: cc.Prefab
        },
        enemy_15: {
            default: null,
            type: cc.Prefab
        },
        boss_1: {
            default: null,
            type: cc.Prefab
        },
        boss_2: {
            default: null,
            type: cc.Prefab
        },
        boss_3: {
            default: null,
            type: cc.Prefab
        },
        boss_4: {
            default: null,
            type: cc.Prefab
        },
        boss_5: {
            default: null,
            type: cc.Prefab
        },
        boss_6: {
            default: null,
            type: cc.Prefab
        },
        boss_7: {
            default: null,
            type: cc.Prefab
        },
        boss_8: {
            default: null,
            type: cc.Prefab
        },
        boss_9: {
            default: null,
            type: cc.Prefab
        },
        boss_10: {
            default: null,
            type: cc.Prefab
        },
        boss_11: {
            default: null,
            type: cc.Prefab
        },
        boss_12: {
            default: null,
            type: cc.Prefab
        },
        boss_13: {
            default: null,
            type: cc.Prefab
        },
        boss_14: {
            default: null,
            type: cc.Prefab
        },
        boss_15: {
            default: null,
            type: cc.Prefab
        },
        boss_16: {
            default: null,
            type: cc.Prefab
        },
        gun_1: {
            default: null,
            type: cc.Prefab
        },
        gun_2: {
            default: null,
            type: cc.Prefab
        },
        gun_3: {
            default: null,
            type: cc.Prefab
        },
        gun_4: {
            default: null,
            type: cc.Prefab
        },
        gun_5: {
            default: null,
            type: cc.Prefab
        },
        gun_6: {
            default: null,
            type: cc.Prefab
        },
        gun_7: {
            default: null,
            type: cc.Prefab
        },
        gun_8: {
            default: null,
            type: cc.Prefab
        },
        gun_9: {
            default: null,
            type: cc.Prefab
        },
        gun_10: {
            default: null,
            type: cc.Prefab
        },
        bullet_1: {
            default: null,
            type: cc.Prefab
        },
        ebullet_1: {
            default: null,
            type: cc.Prefab
        },
        wujian_1: {
            default: null,
            type: cc.Prefab
        },
        wujian_2: {
            default: null,
            type: cc.Prefab
        },
        wujian_3: {
            default: null,
            type: cc.Prefab
        },
        wujian_4: {
            default: null,
            type: cc.Prefab
        },
        wujian_5: {
            default: null,
            type: cc.Prefab
        },
        wujian_6: {
            default: null,
            type: cc.Prefab
        },
        wujian_7: {
            default: null,
            type: cc.Prefab
        },
        wujian_8: {
            default: null,
            type: cc.Prefab
        },
        wujian_9: {
            default: null,
            type: cc.Prefab
        },
        wujian_10: {
            default: null,
            type: cc.Prefab
        },
        wujian_11: {
            default: null,
            type: cc.Prefab
        },
        wujian_12: {
            default: null,
            type: cc.Prefab
        },
        wujian_13: {
            default: null,
            type: cc.Prefab
        },
        wujian_14: {
            default: null,
            type: cc.Prefab
        },
        wujian_15: {
            default: null,
            type: cc.Prefab
        },
        wujian_16: {
            default: null,
            type: cc.Prefab
        },
        wujian_17: {
            default: null,
            type: cc.Prefab
        },
        wujian_18: {
            default: null,
            type: cc.Prefab
        },
        wujian_19: {
            default: null,
            type: cc.Prefab
        },
        hit: {
            default: null,
            type: cc.Prefab
        },
        coin: {
            default: null,
            type: cc.Prefab
        },
        blood: {
            default: null,
            type: cc.Prefab
        },
        bigblood: {
            default: null,
            type: cc.Prefab
        },
        toast: {
            default: null,
            type: cc.Prefab
        },
        toast_cj: {
            default: null,
            type: cc.Prefab
        },
        chukou: {
            default: null,
            type: cc.Prefab
        },
        smoke: {
            default: null,
            type: cc.Prefab
        },
        shell: {
            default: null,
            type: cc.Prefab
        },
        gun_fire: {
            default: null,
            type: cc.Prefab
        },
        fangdanyi: {
            default: null,
            type: cc.Prefab
        },
        audio_bgm: {
            url: cc.AudioClip,
            default: null
        },
        audio_boss_chu: {
            url: cc.AudioClip,
            default: null
        },
        audio_boss_hurt_1: {
            url: cc.AudioClip,
            default: null
        },
        audio_boss_hurt_2: {
            url: cc.AudioClip,
            default: null
        },
        audio_boss_hurt_3: {
            url: cc.AudioClip,
            default: null
        },
        audio_coin: {
            url: cc.AudioClip,
            default: null
        },
        audio_foot_1: {
            url: cc.AudioClip,
            default: null
        },
        audio_foot_boss_1: {
            url: cc.AudioClip,
            default: null
        },
        audio_foot_boss_land: {
            url: cc.AudioClip,
            default: null
        },
        audio_gun_1: {
            url: cc.AudioClip,
            default: null
        },
        audio_gun_2: {
            url: cc.AudioClip,
            default: null
        },
        audio_gun_3: {
            url: cc.AudioClip,
            default: null
        },
        audio_gun_4: {
            url: cc.AudioClip,
            default: null
        },
        audio_gun_5: {
            url: cc.AudioClip,
            default: null
        },
        audio_gun_6: {
            url: cc.AudioClip,
            default: null
        },
        audio_gun_7: {
            url: cc.AudioClip,
            default: null
        },
        audio_gun_8: {
            url: cc.AudioClip,
            default: null
        },
        audio_gun_9: {
            url: cc.AudioClip,
            default: null
        },
        audio_gun_10: {
            url: cc.AudioClip,
            default: null
        },
        audio_hit_head_yuyin: {
            url: cc.AudioClip,
            default: null
        },
        audio_hit_head: {
            url: cc.AudioClip,
            default: null
        },
        audio_hit_torso: {
            url: cc.AudioClip,
            default: null
        },
        audio_ricco_1: {
            url: cc.AudioClip,
            default: null
        },
        audio_ricco_2: {
            url: cc.AudioClip,
            default: null
        },
        audio_jiesuo: {
            url: cc.AudioClip,
            default: null
        },
        audio_rand: {
            url: cc.AudioClip,
            default: null
        },
        audio_role_huan: {
            url: cc.AudioClip,
            default: null
        },
        audio_role: {
            url: cc.AudioClip,
            default: null
        },

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
         this.openover = false;

         this.initPhysics();
         this.initData();
         this.initUI();
         this.addListener();

         this.adapt();

         this.wxGetUserInfo();
         this.wxOpenQuan();

         this.playMusic(this.audio_bgm);
         this.preloadSound();

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
        this.GAME.state = "stop";
        this.GAME.enemys = [this.enemy_1, this.enemy_2, this.enemy_3, this.enemy_4, this.enemy_5,
            this.enemy_6, this.enemy_7, this.enemy_8, this.enemy_9, this.enemy_10, this.enemy_11,
            this.enemy_12, this.enemy_13, this.enemy_14, this.enemy_15];
        this.GAME.bosss = [this.boss_1, this.boss_2, this.boss_3, this.boss_4, this.boss_5, this.boss_6,
            this.boss_7, this.boss_8, this.boss_9, this.boss_10, this.boss_11, this.boss_12,this.boss_13,
            this.boss_14,this.boss_15,this.boss_16];
        this.GAME.players = [this.player_1,this.player_2,this.player_3,this.player_4,this.player_5,
            this.player_6,this.player_7,this.player_8,this.player_9];
        this.GAME.guns = [this.gun_1,this.gun_2,this.gun_3,this.gun_4,this.gun_5,this.gun_6,this.gun_7,this.gun_8,
            this.gun_9,this.gun_10];
        this.GAME.gunaudios = [this.audio_gun_1,this.audio_gun_2,this.audio_gun_3,this.audio_gun_4,this.audio_gun_5,
            this.audio_gun_6,this.audio_gun_7,this.audio_gun_8,this.audio_gun_9,this.audio_gun_10];
        this.GAME.wujians = [this.wujian_1,this.wujian_2,this.wujian_3,this.wujian_4,this.wujian_5,this.wujian_6,
            this.wujian_7,this.wujian_8,this.wujian_9,this.wujian_10,this.wujian_11,this.wujian_12,this.wujian_13,
            this.wujian_14,this.wujian_15,this.wujian_16,this.wujian_17,this.wujian_18,this.wujian_19];

        this.GAME.enemysconfig = [
            {type:1,color:cc.color(42,254,182)},
            {type:1,color:cc.color(157,251,56)},
            {type:1,color:cc.color(240,42,60)},
            {type:1,color:cc.color(120,56,251)},
            {type:1,color:cc.color(221,88,254)},
            {type:2,color:cc.color(42,254,182)},
            {type:2,color:cc.color(157,251,56)},
            {type:2,color:cc.color(240,42,60)},
            {type:2,color:cc.color(120,56,251)},
            {type:2,color:cc.color(221,88,254)},
            {type:3,color:cc.color(42,254,182)},
            {type:3,color:cc.color(157,251,56)},
            {type:3,color:cc.color(240,42,60)},
            {type:3,color:cc.color(120,56,251)},
            {type:3,color:cc.color(221,88,254)}
        ];
        this.GAME.playersconfig = [
            {speed:1,coin:1,fire:0,aimLen:1,aimSpeed:1.0},
            {speed:1.5,coin:1,fire:0,aimLen:1,aimSpeed:1.0},
            {speed:1,coin:1.2,fire:0,aimLen:1,aimSpeed:1.0},
            {speed:1,coin:1.1,fire:0,aimLen:1,aimSpeed:1.0},
            {speed:1,coin:1,fire:0,aimLen:1.2,aimSpeed:1.0},
            {speed:1,coin:1,fire:1,aimLen:1,aimSpeed:1.0},
            {speed:1,coin:1,fire:0,aimLen:1.1,aimSpeed:1.0},
            {speed:1,coin:1,fire:0,aimLen:1,aimSpeed:1.1},
            {speed:1,coin:1,fire:0,aimLen:1,aimSpeed:1.2}
        ];
        this.GAME.gunsconfig = [
            {aimLen:1,type:1,fire:2,num:1,angle:0,y:15,speed:0,score:1.5,coin:1.5},
            {aimLen:1,type:1,fire:3,num:1,angle:0,y:15,speed:0,score:1.5,coin:1.5},
            {aimLen:0.5,type:2,fire:1,num:3,angle:8,y:15,speed:0.08,score:1,coin:1},
            {aimLen:0.6,type:2,fire:2,num:3,angle:6,y:15,speed:0.12,score:1,coin:1},
            {aimLen:0.6,type:2,fire:2,num:3,angle:6,y:15,speed:0.12,score:1,coin:1},
            {aimLen:1.5,type:1,fire:3,num:1,angle:0,y:15,speed:0.2,score:1.5,coin:1.5},
            {aimLen:0.4,type:3,fire:2,num:3,angle:8,y:15,speed:0.2,score:1,coin:1},
            {aimLen:0.7,type:2,fire:3,num:3,angle:7,y:15,speed:0.18,score:1,coin:1},
            {aimLen:2,type:1,fire:4,num:1,angle:0,y:15,speed:0.2,score:1.5,coin:1.5},
            {aimLen:3,type:1,fire:5,num:1,angle:0,y:2,speed:0.2,score:1.8,coin:1.8}
        ];

        this.GAME.bgcolor = [cc.color(136,110,94),cc.color(25,112,133),cc.color(110,24,128),
            cc.color(89,89,89),cc.color(132,131,172),cc.color(134,152,118),cc.color(149,149,149),
            cc.color(24,128,93),cc.color(122,28,24),cc.color(24,95,128),cc.color(149,140,46),
            cc.color(208,163,162),cc.color(107,133,148),cc.color(140,31,57),cc.color(86,127,22)];

        this.GAME.qiandaoconfig = [20,20,30,30,40,50,100];

        this.GAME.chengjiuconfig = {
            hitenemy:[{num:100,coin:10},{num:200,coin:20},{num:500,coin:30},{num:1000,coin:50},{num:5000,coin:100},{num:10000,coin:200}],
            hithead:[{num:50,coin:10},{num:100,coin:20},{num:200,coin:30},{num:500,coin:50},{num:1000,coin:100},{num:5000,coin:200}],
            hitboss:[{num:20,coin:10},{num:50,coin:20},{num:100,coin:30},{num:200,coin:50},{num:500,coin:100},{num:1000,coin:200}],
            jiesuogun:[{num:2,coin:10},{num:4,coin:30},{num:8,coin:100}],
            jiesuorole:[{num:2,coin:10},{num:4,coin:30}]
        };

        this.poolbullets = new cc.NodePool();
        this.poolhits = new cc.NodePool();
        this.poolsmokes = new cc.NodePool();
        this.poolshells = new cc.NodePool();
        this.poolbloods = new cc.NodePool();
        this.poolbigbloods = new cc.NodePool();
        for(var i=0;i<3;i++)
        {
            var bullet_1 = cc.instantiate(this.bullet_1);
            this.poolbullets.put(bullet_1);

            var hit = cc.instantiate(this.hit);
            this.poolhits.put(hit);

            var smoke = cc.instantiate(this.smoke);
            this.poolsmokes.put(smoke);

            var shell = cc.instantiate(this.shell);
            this.poolshells.put(shell);

            var blood = cc.instantiate(this.blood);
            this.poolbloods.put(blood);

            var bigblood = cc.instantiate(this.bigblood);
            this.poolbigbloods.put(bigblood);
        }
        this.poolcoins = new cc.NodePool();
        for(var i=0;i<6;i++)
        {
            var coin = cc.instantiate(this.coin);
            this.poolcoins.put(coin);
        }



        this.GAME.loutis = [
            [
                [1,2,3],
                [2,3,1],
                [1,2,1],
                [2,3,1],
                [1,3,0],
                [2,4,1],
                [1,2,1],
                [2,3,1],
                [1,4,0],
                [2,5,-1],
                [1,2,2],
                [2,3,1],
                [1,5,-1],
                [2,3,2],
                [1,4,2],
                [2,4,-1],
                [1,5,0],
                [2,3,1],
                [1,3,0],
                [2,2,4],
                [1,2,2],
                [2,4,1],
                [1,4,2],
                [2,3,3],
                [1,2,1],
                [2,4,1],
                [1,5,-1],
                [2,3,2],
                [1,3,1],
                [2,4,2],
                [1,2,1],
                [2,3,0]
            ],
            [
                [1,2,3],
                [2,2,0],
                [1,3,0],
                [2,4,2],
                [1,2,0],
                [2,3,1],
                [1,4,1],
                [2,3,0],
                [1,5,0],
                [2,4,2],
                [1,2,0],
                [2,4,2],
                [1,8,0],
                [2,5,0],
                [1,2,1],
                [2,3,2],
                [1,5,-1],
                [2,4,0],
                [1,2,2],
                [2,4,3],
                [1,3,0],
                [2,2,2],
                [1,5,1],
                [2,6,1],
                [1,7,0],
                [2,3,1],
                [1,4,-1],
                [2,5,2],
                [1,2,2],
                [2,4,0],
                [1,4,1],
                [2,3,0]
            ],
            [
                [1,2,3],
                [2,3,1],
                [1,6,0],
                [2,4,-1],
                [1,3,1],
                [2,5,1],
                [1,6,1],
                [2,8,-1],
                [1,4,0],
                [2,4,2],
                [1,6,-1],
                [2,4,1],
                [1,3,2],
                [2,2,2],
                [1,2,1],
                [2,5,1],
                [1,2,-1],
                [2,3,0],
                [1,5,2],
                [2,3,2],
                [1,5,2],
                [2,2,1],
                [1,3,2],
                [2,7,0],
                [1,5,0],
                [2,4,1],
                [1,3,2],
                [2,5,3],
                [1,2,1],
                [2,3,3],
                [1,2,2],
                [2,3,0]
            ],
            [
                [1,2,3],
                [2,3,1],
                [1,5,2],
                [2,6,1],
                [1,4,2],
                [2,4,1],
                [1,3,2],
                [2,2,4],
                [1,7,0],
                [2,3,1],
                [1,4,1],
                [2,6,1],
                [1,4,2],
                [2,5,1],
                [1,2,3],
                [2,3,2],
                [1,6,0],
                [2,7,-1],
                [1,2,3],
                [2,5,1],
                [1,6,-2],
                [2,8,-2],
                [1,3,0],
                [2,4,2],
                [1,2,3],
                [2,4,1],
                [1,5,0],
                [2,3,2],
                [1,4,2],
                [2,6,-1],
                [1,4,1],
                [2,3,1]
            ],
            [
                [1,2,3],
                [2,4,0],
                [1,2,1],
                [2,5,0],
                [1,3,1],
                [2,4,1],
                [1,5,0],
                [2,2,2],
                [1,6,0],
                [2,3,2],
                [1,4,1],
                [2,6,0],
                [1,3,1],
                [2,4,1],
                [1,5,0],
                [2,4,1],
                [1,6,0],
                [2,2,3],
                [1,4,2],
                [2,5,1],
                [1,2,2],
                [2,5,1],
                [1,6,1],
                [2,3,2],
                [1,6,0],
                [2,3,2],
                [1,4,1],
                [2,2,3],
                [1,5,1],
                [2,4,2],
                [1,5,0],
                [2,2,1]
            ]

        ];

        if(this.getStorageFirst() == 0)
        {
            this.setStorageFirst(1);
            this.setStorageMusic(1);
            this.setStorageSound(1);
            this.setStorageVibrate(1);
        }

        //for(var i=1;i<=9;i++)
        //    this.setStoragePlayer(i,0);
        //for(var i=1;i<=10;i++)
        //    this.setStorageGun(i,0);
        this.setStoragePlayer(1);
        this.setStorageGun(1);
        //this.setStorageCoin(15000);

        //this.setStorageGun(10,0);
        //this.setStorageCurrGun(1);
        //this.setStorageQianDao(0);
        //this.setStorageQianDaoTime(-1);
        //this.setStorageYindao(0);
        //this.setStorageGunJieSuoNum(1);
        //this.setStorageRoleJieSuoNum(4);
        //cc.sys.localStorage.setItem("playnum",0);

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
        this.node_role = cc.find("Canvas/node_role");
        this.node_role_center = cc.find("center",this.node_role);
        this.node_role_top_player = cc.find("top/player",this.node_role);
        this.node_role_score = cc.find("score",this.node_role);
        this.node_role_coin = cc.find("coin/num",this.node_role);
        this.node_role_page1 = cc.find("page/view/content/page_1",this.node_role);

        this.node_gun = cc.find("Canvas/node_gun");
        this.node_gun_center = cc.find("center",this.node_gun);
        this.node_gun_top_player = cc.find("top/player",this.node_gun);
        this.node_gun_score = cc.find("score",this.node_gun);
        this.node_gun_coin = cc.find("coin/num",this.node_gun);
        this.node_gun_page = cc.find("page",this.node_gun);
        this.node_gun_page1 = cc.find("page/view/content/page_1",this.node_gun);
        this.node_gun_page2 = cc.find("page/view/content/page_2",this.node_gun);

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
        this.node_fuhuo_card = cc.find("pro/fuhuo_card",this.node_fuhuo);
        this.node_fuhuo_card_num = cc.find("pro/fuhuo_card/num",this.node_fuhuo);
        this.node_fuhuo_share = cc.find("fuhuo_share",this.node_fuhuo);
        this.node_fuhuo_skip = cc.find("bottom/bg/skip",this.node_fuhuo);
        this.node_fuhuo_pro = cc.find("pro",this.node_fuhuo);
        this.node_fuhuo_coin = cc.find("coin/num",this.node_fuhuo);
        this.node_fuhuo_score = cc.find("score",this.node_fuhuo);

        this.node_over = cc.find("Canvas/node_over");
        this.node_over_coin = cc.find("coin/num",this.node_over);
        this.node_over_score = cc.find("score",this.node_over);
        this.node_over_chaoyue = cc.find("chaoyue",this.node_over);

        this.node_quanxian = cc.find("Canvas/node_quanxian");

        this.node_chengjiu = cc.find("Canvas/node_chengjiu");
        this.node_chengjiu_center = cc.find("center",this.node_chengjiu);
        this.node_chengjiu_top_player = cc.find("top/player",this.node_chengjiu);
        this.node_chengjiu_score = cc.find("score",this.node_chengjiu);
        this.node_chengjiu_coin = cc.find("coin/num",this.node_chengjiu);
        this.node_chengjiu_scroll_content = cc.find("scroll/view/content",this.node_chengjiu);

        this.node_tishi =  cc.find("Canvas/node_tishi");
        this.node_tishi.hand =  cc.find("hand",this.node_tishi);

        //var stringTime = "2018-07-05 17:01:00";
        //var timestamp2 = (new Date(Date.parse(stringTime.replace(/-/g,"/")))).getTime();
        //if(new Date().getTime() < timestamp2)
        //{
        //
        //}
        this.initGmae();
        this.updateUIControl();
    },

    updateUIControl: function()
    {
        cc.find("lingqu",this.node_main).active = false;
        cc.find("lingqu",this.node_over).active = false;
        cc.find("roleyaoqing",this.node_role).active = false;
        cc.find("roleyaoqing",this.node_gun).active = false;

        if(this.GAME.control.length>0)
        {
            for(var i=0;i<this.GAME.control.length;i++)
            {
                var con = this.GAME.control[i];
                if(con.id == "sharecard")
                {
                    if(con.value == "1")
                    {
                        cc.find("lingqu",this.node_main).active = true;
                        cc.find("lingqu",this.node_over).active = true;
                        cc.find("roleyaoqing",this.node_role).active = true;
                        cc.find("roleyaoqing",this.node_gun).active = true;
                        this.GAME.fangdanyi = true;
                    }
                    break;
                }
            }
        }

        this.GAME.fangdanyi = true;
        var cardnum = this.getStorageCard();
        if(this.GAME.fangdanyi && cardnum>0 && this.GAME.playerfangdanyi)
        {
            this.player.fangdanyi.active = true;
        }
    },

    updateLocalData: function(data)
    {
        if(data)
        {
            var datas = JSON.parse(data);
            if(datas.first)
                this.setStorageFirst(1);
            if(datas.coin)
                this.setStorageCoin(parseInt(datas.coin));
            if(datas.score)
                this.setStorageScore(parseInt(datas.score));
            if(datas.card)
                this.setStorageCard(parseInt(datas.card));
            if(datas.qiandao)
                this.setStorageQianDao(parseInt(datas.qiandao));
            if(datas.player_1)
                this.setStoragePlayer(1,parseInt(datas.player_1));
            if(datas.player_2)
                this.setStoragePlayer(2,parseInt(datas.player_2));
            if(datas.player_3)
                this.setStoragePlayer(3,parseInt(datas.player_3));
            if(datas.player_4)
                this.setStoragePlayer(4,parseInt(datas.player_4));
            if(datas.player_5)
                this.setStoragePlayer(5,parseInt(datas.player_5));
            if(datas.player_6)
                this.setStoragePlayer(6,parseInt(datas.player_6));
            if(datas.player_7)
                this.setStoragePlayer(7,parseInt(datas.player_7));
            if(datas.player_8)
                this.setStoragePlayer(8,parseInt(datas.player_8));
            if(datas.player_9)
                this.setStoragePlayer(9,parseInt(datas.player_9));

            if(datas.gun_1)
                this.setStorageGun(1,parseInt(datas.gun_1));
            if(datas.gun_2)
                this.setStorageGun(2,parseInt(datas.gun_2));
            if(datas.gun_3)
                this.setStorageGun(3,parseInt(datas.gun_3));
            if(datas.gun_4)
                this.setStorageGun(4,parseInt(datas.gun_4));
            if(datas.gun_5)
                this.setStorageGun(5,parseInt(datas.gun_5));
            if(datas.gun_6)
                this.setStorageGun(6,parseInt(datas.gun_6));
            if(datas.gun_7)
                this.setStorageGun(7,parseInt(datas.gun_7));
            if(datas.gun_8)
                this.setStorageGun(8,parseInt(datas.gun_8));
            if(datas.gun_9)
                this.setStorageGun(9,parseInt(datas.gun_9));
            if(datas.gun_10)
                this.setStorageGun(10,parseInt(datas.gun_10));

            if(datas.currGun)
                this.setStorageCurrGun(parseInt(datas.currGun));
            if(datas.currPlayer)
                this.setStorageCurrPlayer(parseInt(datas.currPlayer));

            if(datas.gunJiesuoNum)
                this.setStorageGunJieSuoNum(parseInt(datas.gunJiesuoNum));
            if(datas.gunJiesuoAwardNum)
                this.setStorageGunJieSuoAwardNum(parseInt(datas.gunJiesuoAwardNum));
            if(datas.roleJiesuoNum)
                this.setStorageRoleJieSuoNum(parseInt(datas.roleJiesuoNum));
            if(datas.roleJiesuoAwardNum)
                this.setStorageRoleJieSuoAwardNum(parseInt(datas.roleJiesuoAwardNum));
            if(datas.hitEnemyNum)
                this.setStorageHitEnemyNum(parseInt(datas.hitEnemyNum));
            if(datas.hitEnemyAwardNum)
                this.setStorageHitEnemyAwardNum(parseInt(datas.hitEnemyAwardNum));
            if(datas.hitHeadNum)
                this.setStorageHitHeadNum(parseInt(datas.hitHeadNum));
            if(datas.hitHeadAwardNum)
                this.setStorageHitHeadAwardNum(parseInt(datas.hitHeadAwardNum));
            if(datas.hitBossNum)
                this.setStorageHitBossNum(parseInt(datas.hitBossNum));
            if(datas.hitBossAwardNum)
                this.setStorageHitBossAwardNum(parseInt(datas.hitBossAwardNum));


            this.node_main_coin.getComponent("cc.Label").string = this.getStorageCoin();
            this.node_main_score.getComponent("cc.Label").string = this.getStorageScore();
        }
        else
        {
            this.uploadData();
        }
    },

    uploadData: function()
    {
        var datas = {};
        datas.first = this.getStorageFirst();
        datas.coin = this.getStorageCoin();
        datas.score = this.getStorageScore();
        datas.card = this.getStorageCard();
        datas.qiandao = this.getStorageQianDao();
        datas.player_1 = this.getStoragePlayer(1);
        datas.player_2 = this.getStoragePlayer(2);
        datas.player_3 = this.getStoragePlayer(3);
        datas.player_4 = this.getStoragePlayer(4);
        datas.player_5 = this.getStoragePlayer(5);
        datas.player_6 = this.getStoragePlayer(6);
        datas.player_7 = this.getStoragePlayer(7);
        datas.player_8 = this.getStoragePlayer(8);
        datas.player_9 = this.getStoragePlayer(9);
        datas.gun_1 = this.getStorageGun(1);
        datas.gun_2 = this.getStorageGun(2);
        datas.gun_3 = this.getStorageGun(3);
        datas.gun_4 = this.getStorageGun(4);
        datas.gun_5 = this.getStorageGun(5);
        datas.gun_6 = this.getStorageGun(6);
        datas.gun_7 = this.getStorageGun(7);
        datas.gun_8 = this.getStorageGun(8);
        datas.gun_9 = this.getStorageGun(9);
        datas.gun_10 = this.getStorageGun(10);
        datas.currGun = this.getStorageCurrGun();
        datas.currPlayer = this.getStorageCurrPlayer();

        datas.gunJiesuoNum = this.getStorageGunJieSuoNum();
        datas.gunJiesuoAwardNum = this.getStorageGunJieSuoAwardNum();
        datas.roleJiesuoNum = this.getStorageRoleJieSuoNum();
        datas.roleJiesuoAwardNum = this.getStorageRoleJieSuoAwardNum();
        datas.hitEnemyNum = this.getStorageHitEnemyNum();
        datas.hitEnemyAwardNum = this.getStorageHitEnemyAwardNum();
        datas.hitHeadNum = this.getStorageHitHeadNum();
        datas.hitHeadAwardNum = this.getStorageHitHeadAwardNum();
        datas.hitBossNum = this.getStorageHitBossNum();
        datas.hitBossAwardNum = this.getStorageHitBossAwardNum();


        var data = JSON.stringify(datas);
        qianqista.uploaddatas(data,function(res){
            console.log("--uploaddatas:",res);
        });
    },


    adapt: function()
    {
        var nodes = [this.node_main,this.node_game_ui,this.node_tishi,this.node_role,this.node_gun,this.node_setting,
            this.node_card,this.node_duihuan,this.node_qiandao,this.node_rank,this.node_fuhuo,this.node_over,
            this.node_chengjiu];
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
        var loutis = this.GAME.loutis[0];
        this.loutis = [];
        for(var i=0;i<loutis.length;i++)
        {
            this.loutis.push(loutis[i]);
        }
        this.last_h = 0;
        this.ltzorder = 1000000;
        this.ltcolor = this.GAME.bgcolor[0];
        this.currLoutis = [];
        this.louticolls = [];
        this.GAME.state = "stop";
        this.GAME.enemy_num = 9 + Math.floor(Math.random() * 3 + 1);
        this.GAME.score = 0;
        this.GAME.coin = 0;
        this.GAME.killhead = 0;
        this.GAME.currPlayer = this.getStorageCurrPlayer()-1;
        this.GAME.currGun = this.getStorageCurrGun()-1;

        this.GAME.playerfuhuo = true;
        this.GAME.playerfangdanyi = true;
        this.GAME.yindao = this.getStorageYindao();
    },

    initGmae: function()
    {
        this.initGameData();
        this.node_game.removeAllChildren();
        this.node_game.y = -792;
        this.node_main.active = true;
        this.node_game_ui.active = false;
        this.node_game_ui.boss.active = false;
        this.node_game_ui.killhead.active = false;
        this.node_main_coin.getComponent("cc.Label").string = this.getStorageCoin();
        this.node_main_score.getComponent("cc.Label").string = this.getStorageScore();
        this.getScore(0);
        this.getCoin(0);

        this.initLouTis();
        this.initPlayer();
        this.updateLouTiOpa(0);
    },

    nextLevel: function()
    {
        var loutis = this.GAME.loutis[Math.floor(Math.random() * this.GAME.loutis.length)];
        this.loutis = [];
        for(var i=0;i<loutis.length;i++)
        {
            this.loutis.push(loutis[i]);
        }
        this.last_h = 0;
        this.ltzorder = 1000000;
        this.ltcolor = this.GAME.bgcolor[Math.floor(Math.random()*this.GAME.bgcolor.length)];
        this.currLoutis = [];
        this.GAME.state = "stop";
        this.GAME.enemy_num = 3 + Math.floor(Math.random() * 3 + 1);
        this.GAME.killhead = 0;
        this.node_game.removeAllChildren();
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

        this.node_game.removeAllChildren();
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
            if(cc.sys.os == cc.sys.OS_ANDROID)
            {
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
        else if(data == "roleitem")
        {
            if(event.target.canset)
            {
                this.setJuese(event.target.playerId);
            }
        }
        else if(data == "rolejiesuo")
        {
            this.rolejiesuo();
        }
        else if(data == "junhuo")
        {
            this.wxQuanState(false);
            this.openGun();
        }
        else if(data == "gunitem")
        {
            if(event.target.canset)
            {
                this.setGun(event.target.gunId);
            }
        }
        else if(data == "gunjiesuo")
        {
            this.gunjiesuo();
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
            var m = this.getStorageMusic();
            m = m == 0 ? 1 : 0;
            this.setStorageMusic(m);
            if(this.getStorageMusic() == 0)
            {
                this.stopMusic();
            }
            else
            {
                this.playMusic(this.audio_bgm);
            }
        }
        else if(data == "sound")
        {
            var m = this.getStorageSound();
            m = m == 0 ? 1 : 0;
            this.setStorageSound(m);
        }
        else if(data == "vibrate")
        {
            var m = this.getStorageVibrate();
            m = m == 0 ? 1 : 0;
            this.setStorageVibrate(m);
        }
        else if(data == "lingqu")
        {
            this.wxQuanState(false);
            if(this.openover)
                this.wxCloseOver();
            this.node_card.active = true;
            this.node_over.active = false;
            this.node_card_num.getComponent("cc.Label").string = this.getStorageCard();
        }
        else if(data == "duihuan")
        {
            this.wxQuanState(false);
            this.node_duihuan.active = true;
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
                this.wxOverRank();
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
                this.wxOverRank();
            }
            else
            {
                this.wxQuanState(true);
            }

        }
        else if(data == "grouprank")
        {
            this.wxGropShare();
        }
        else if(data == "sendcard")
        {
            this.wxGropShareCard();
        }
        else if(data == "more")
        {
            this.wxMore();
        }
        else if(data == "yindao")
        {
            this.node_game_ui.yindao.active = false;
            this.playerFire();
            this.setStorageYindao(1);
            this.GAME.yindao = 1;
        }
        else if(data == "roleyaoqing")
        {
            this.wxGropShareCoin();
        }
        else if(data == "chengjiu")
        {
            this.openChengjiu();
        }
        else if(data == "qiandao")
        {
            this.openQianDao();
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

    openSetting: function()
    {
        this.node_setting.active = true;
        this.node_setting_music.getComponent("cc.Toggle").isChecked = (this.getStorageMusic() == 1 ? true : false);
        this.node_setting_sound.getComponent("cc.Toggle").isChecked = (this.getStorageSound() == 1 ? true : false);
        this.node_setting_vibrate.getComponent("cc.Toggle").isChecked = (this.getStorageVibrate() == 1 ? true : false);
    },

    pageScoll: function(num,target,data)
    {
        if(data == "page_gun")
        {
            var index = this.node_gun_page.getComponent("cc.PageView").getCurrentPageIndex();
            if(index == 0)
            {
                if(this.GAME.control.length>0)
                {
                    for(var i=0;i<this.GAME.control.length;i++)
                    {
                        var con = this.GAME.control[i];
                        if(con.id == "sharecard")
                        {
                            if(con.value == "1")
                            {
                                cc.find("roleyaoqing",this.node_gun).active = true;
                            }
                            break;
                        }
                    }
                }
                cc.find("gunjiesuo",this.node_gun).active = true;
            }
            else
            {
                cc.find("gunjiesuo",this.node_gun).active = false;
                cc.find("roleyaoqing",this.node_gun).active = false;
            }
        }
    },

    lingquChengjiu: function(id,coin)
    {
        this.setStorageCoin(parseInt(this.getStorageCoin())+coin);
        if(id == 1)
        {
            var awardnum = this.getStorageHitEnemyAwardNum();
            this.setStorageHitEnemyAwardNum(parseInt(awardnum)+1);
        }
        else if(id == 2)
        {
            var awardnum = this.getStorageHitHeadAwardNum();
            this.setStorageHitHeadAwardNum(parseInt(awardnum)+1);
        }
        else if(id == 3)
        {
            var awardnum = this.getStorageHitBossAwardNum();
            this.setStorageHitBossAwardNum(parseInt(awardnum)+1);
        }
        else if(id == 4)
        {
            var awardnum = this.getStorageGunJieSuoAwardNum();
            this.setStorageGunJieSuoAwardNum(parseInt(awardnum)+1);
        }
        else if(id == 5)
        {
            var awardnum = this.getStorageRoleJieSuoAwardNum();
            this.setStorageRoleJieSuoAwardNum(parseInt(awardnum)+1);
        }

        this.uploadData();
        this.showToast("金币+"+coin);
        this.openChengjiu();
    },

    judgeChengjiuUI: function()
    {
        var awardnum = this.getStorageGunJieSuoAwardNum();
        if(awardnum<this.GAME.chengjiuconfig.jiesuogun.length)
        {
            var num = this.getStorageGunJieSuoNum();
            var data = this.GAME.chengjiuconfig.jiesuogun[awardnum];
            if(num >= data.num)
            {
                this.showToastCJ();
                return;
            }
        }

        var awardnum2 = this.getStorageRoleJieSuoAwardNum();
        if(awardnum2<this.GAME.chengjiuconfig.jiesuorole.length)
        {
            var num = this.getStorageRoleJieSuoNum();
            var data = this.GAME.chengjiuconfig.jiesuorole[awardnum2];
            if(num >= data.num)
            {
                this.showToastCJ();
                return;
            }
        }
    },

    judgeChengjiuGame: function()
    {
        var awardnum = this.getStorageHitEnemyAwardNum();
        var toastnum = this.getStorageHitEnemyToastNum();
        if(awardnum<this.GAME.chengjiuconfig.hitenemy.length && toastnum == awardnum)
        {
            var num = this.getStorageHitEnemyNum();
            var data = this.GAME.chengjiuconfig.hitenemy[awardnum];
            if(num >= data.num)
            {
                this.setStorageHitEnemyToastNum(parseInt(toastnum)+1);
                this.showToastCJ();
                return;
            }
        }

        var awardnum2 = this.getStorageHitHeadAwardNum();
        var toastnum2 = this.getStorageHitHeadToastNum();
        if(awardnum2<this.GAME.chengjiuconfig.hithead.length && toastnum2 == awardnum2)
        {
            var num = this.getStorageHitHeadNum();
            var data = this.GAME.chengjiuconfig.hithead[awardnum2];
            if(num >= data.num)
            {
                this.setStorageHitHeadToastNum(parseInt(toastnum2)+1);
                this.showToastCJ();
                return;
            }
        }

        var awardnum3 = this.getStorageHitBossAwardNum();
        var toastnum3 = this.getStorageHitBossToastNum();
        if(awardnum3<this.GAME.chengjiuconfig.hitboss.length && toastnum3 == awardnum3)
        {
            var num = this.getStorageHitBossNum();
            var data = this.GAME.chengjiuconfig.hitboss[awardnum3];
            if(num >= data.num)
            {
                this.setStorageHitBossToastNum(parseInt(toastnum3)+1);
                this.showToastCJ();
                return;
            }
        }
    },

    openChengjiu: function()
    {
        var s = cc.winSize;
        this.node_main.active = false;
        this.node_chengjiu.active = true;
        this.node_chengjiu_center.height = s.height - 335;
        this.node_chengjiu_center = this.ltcolor;

        this.node_chengjiu_top_player.removeAllChildren();
        var player = cc.instantiate(this.GAME.players[this.GAME.currPlayer]);
        this.node_chengjiu_top_player.addChild(player);

        var gunConf = this.GAME.gunsconfig[this.GAME.currGun];
        var gun = cc.instantiate(this.GAME.guns[this.GAME.currGun]);
        gun.y = player.height*0.3 + gunConf.y;
        player.addChild(gun);

        this.node_chengjiu_score.getComponent("cc.Label").string = this.getStorageScore();
        this.node_chengjiu_coin.getComponent("cc.Label").string = this.getStorageCoin();

        for(var i=1;i<=5;i++)
        {
            var item = cc.find("item_"+i,this.node_chengjiu_scroll_content);
            var lnum = cc.find("num",item);
            var box = cc.find("box",item);
            var award = cc.find("award",box);
            var curr = cc.find("curr",box);
            box.cjid = i;
            if(i == 1)
            {
                var num = this.getStorageHitEnemyNum();
                var awardnum = this.getStorageHitEnemyAwardNum();
                var isend = false;
                if(awardnum>=this.GAME.chengjiuconfig.hitenemy.length)
                {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.GAME.chengjiuconfig.hitenemy[awardnum];
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
                var num = this.getStorageHitHeadNum();
                var awardnum = this.getStorageHitHeadAwardNum();
                var isend = false;
                if(awardnum>=this.GAME.chengjiuconfig.hithead.length)
                {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.GAME.chengjiuconfig.hithead[awardnum];
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
                var num = this.getStorageHitBossNum();
                var awardnum = this.getStorageHitBossAwardNum();
                var isend = false;
                if(awardnum>=this.GAME.chengjiuconfig.hitboss.length)
                {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.GAME.chengjiuconfig.hitboss[awardnum];
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
                var num = this.getStorageGunJieSuoNum();
                var awardnum = this.getStorageGunJieSuoAwardNum();
                var isend = false;
                if(awardnum>=this.GAME.chengjiuconfig.jiesuogun.length)
                {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.GAME.chengjiuconfig.jiesuogun[awardnum];
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
                var num = this.getStorageRoleJieSuoNum();
                var awardnum = this.getStorageRoleJieSuoAwardNum();
                var isend = false;
                if(awardnum>=this.GAME.chengjiuconfig.jiesuorole.length)
                {
                    isend = true;
                    awardnum -= 1;
                }
                var data = this.GAME.chengjiuconfig.jiesuorole[awardnum];
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

    gunjiesuo: function()
    {
        var self = this;
        var needcoin = this.getStorageGunJieSuoNum()*50 + 200;
        if(this.getStorageCoin()< needcoin)
        {
            this.showToast("金币不足");
        }
        else
        {
            var uopen = [];
            var items = [];
            for(var i=1;i<=9;i++)
            {
                if(this.getStorageGun(i) != 1)
                {
                    uopen.push(i);
                    var item = cc.find("item_" + i, this.node_gun_page1);
                    var box1 = cc.find("box_1", item);
                    items.push(box1);
                }
            }
            if(uopen.length<=0)
            {
                this.showToast("枪支已经全部开启");
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
                                self.playSound(self.audio_rand);
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
                        self.playSound(self.audio_jiesuo);
                        self.setStorageCoin(self.getStorageCoin() - needcoin);
                        self.setStorageGun(id);
                        self.setStorageGunJieSuoNum(parseInt(self.getStorageGunJieSuoNum())+1);
                        self.judgeChengjiuUI();
                        self.uploadData();
                        //self.showToast("角色已经开启");
                        self.openGun();
                    })
                );
                seq.setTag(1);
                this.node_gun_page1.runAction(seq);

            }
        }
    },

    setGun: function(id)
    {
        var currGun = this.getStorageCurrGun();
        if(currGun != id)
        {
            this.playSound(this.audio_role_huan);
            this.setStorageCurrGun(id);
            this.GAME.currGun = this.getStorageCurrGun()-1;
            this.openGun();
            this.uploadData();
        }
    },

    setGunRiQi: function(id)
    {
        this.setStorageQianDao(id);
        //this.setStorageQianDaoTime(new Date().getTime());
        this.setStorageQianDaoTime(new Date().getDate());
        var currQianDao = this.getStorageQianDao();
        if(currQianDao == 7)
        {
            this.setStorageGun(10);
            this.uploadData();
        }

        this.updateGunRiQi();

        this.setStorageCoin(parseInt(this.getStorageCoin()) +  this.GAME.qiandaoconfig[id-1]);
        this.showToast("金币+"+this.GAME.qiandaoconfig[id-1]);
        this.node_main_coin.getComponent("cc.Label").string = this.getStorageCoin();

        this.uploadData();
    },

    openQianDao: function()
    {this.player.fangdanyi.active = true;
        this.node_qiandao.active = true;
        this.wxQuanState(false);

        var currQianDao = this.getStorageQianDao();
        var currQianDaoTime = this.getStorageQianDaoTime();
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

    updateGunRiQi: function()
    {
        //日期
        var currQianDao = this.getStorageQianDao();

        for(var i=1;i<=7;i++)
        {
            var item = cc.find("riqi/riqi"+i,this.node_gun_page2);
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

        var currGun = this.getStorageCurrGun();
        var box1 = cc.find("box_1",this.node_gun_page2);
        var box2 = cc.find("box_2",this.node_gun_page2);
        this.node_gun_page2.gunId = 10;

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
            if(this.getStorageGun(10) == 1)
            {
                box1.color = cc.color(243,180,69);
                this.node_gun_page2.canset = true;
            }
            else
            {
                box1.color = cc.color(100,100,100);
                this.node_gun_page2.canset = false;
            }
        }
    },

    openGun: function()
    {
        var s = cc.winSize;
        this.node_main.active = false;
        this.node_over.active = false;
        this.node_gun.active = true;

        this.node_gun_center.height = s.height - 335;
        this.node_gun_center.color = this.ltcolor;

        this.node_gun_top_player.removeAllChildren();
        var player = cc.instantiate(this.GAME.players[this.GAME.currPlayer]);
        this.node_gun_top_player.addChild(player);

        var gunConf = this.GAME.gunsconfig[this.GAME.currGun];
        var gun = cc.instantiate(this.GAME.guns[this.GAME.currGun]);
        gun.y = player.height*0.3 + gunConf.y;
        player.addChild(gun);

        this.node_gun_score.getComponent("cc.Label").string = this.getStorageScore();
        this.node_gun_coin.getComponent("cc.Label").string = this.getStorageCoin();

        cc.find("gunjiesuo/coinbg",this.node_gun).color = this.ltcolor;
        cc.find("gunjiesuo/txt",this.node_gun).color = this.ltcolor;
        var jscoin = cc.find("gunjiesuo/coin",this.node_gun);
        jscoin.color = this.ltcolor;
        jscoin.getComponent("cc.Label").string = (this.getStorageGunJieSuoNum()*50 + 200);

        var currGun = this.getStorageCurrGun();
        for(var i=1;i<=9;i++)
        {
            var item = cc.find("item_"+i,this.node_gun_page1);
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
                if(this.getStorageGun(i) == 1)
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

        this.playSound(this.audio_role);
    },

    rolejiesuo: function()
    {
        var self = this;
        if(this.getStorageCoin()<500)
        {
            this.showToast("金币不足");
        }
        else
        {
            var uopen = [];
            var items = [];
            for(var i=1;i<=9;i++)
            {
                if(this.getStoragePlayer(i) != 1)
                {
                    uopen.push(i);
                    var item = cc.find("item_" + i, this.node_role_page1);
                    var box1 = cc.find("box_1", item);
                    items.push(box1);
                }
            }
            if(uopen.length<=0)
            {
                this.showToast("角色已经全部开启");
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
                                self.playSound(self.audio_rand);
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
                        self.playSound(self.audio_jiesuo);
                        self.setStorageCoin(self.getStorageCoin() - 500);
                        self.setStoragePlayer(id);
                        self.setStorageRoleJieSuoNum(parseInt(self.getStorageRoleJieSuoNum())+1);
                        self.judgeChengjiuUI();
                        self.uploadData();
                        //self.showToast("角色已经开启");
                        self.openJuese();
                    })
                );
                seq.setTag(1);
                this.node_role_page1.runAction(seq);

            }
        }
    },

    setJuese: function(id)
    {
        var currPlayer = this.getStorageCurrPlayer();
        if(currPlayer != id)
        {
            this.playSound(this.audio_role_huan);
            this.setStorageCurrPlayer(id);
            this.GAME.currPlayer = this.getStorageCurrPlayer()-1;
            this.openJuese();
            this.uploadData();
        }
    },

    openJuese: function()
    {
        var s = cc.winSize;
        this.node_main.active = false;
        this.node_over.active = false;
        this.node_role.active = true;

        this.node_role_center.height = s.height - 335;
        this.node_role_center.color = this.ltcolor;

        this.node_role_top_player.removeAllChildren();
        var player = cc.instantiate(this.GAME.players[this.GAME.currPlayer]);
        this.node_role_top_player.addChild(player);

        var gunConf = this.GAME.gunsconfig[this.GAME.currGun];
        var gun = cc.instantiate(this.GAME.guns[this.GAME.currGun]);
        gun.y = player.height*0.3 + gunConf.y;
        player.addChild(gun);

        this.node_role_score.getComponent("cc.Label").string = this.getStorageScore();
        this.node_role_coin.getComponent("cc.Label").string = this.getStorageCoin();
        cc.find("rolejiesuo/coinbg",this.node_role).color = this.ltcolor;
        cc.find("rolejiesuo/txt",this.node_role).color = this.ltcolor;
        cc.find("rolejiesuo/coin",this.node_role).color = this.ltcolor;

        var currPlayer = this.getStorageCurrPlayer();
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
                if(this.getStoragePlayer(i) == 1)
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

        this.playSound(this.audio_role);
    },

    startGmae: function()
    {
        this.GAME.state = "start";
        this.node_main.active = false;
        this.node_game_ui.active = true;
        this.movenum = 0;
        this.playerMove(false);
    },

    goMain: function()
    {
        this.node_role.active = false;
        this.node_gun.active = false;
        this.node_setting.active = false;
        this.node_card.active = false;
        this.node_duihuan.active = false;
        this.node_qiandao.active = false;
        this.node_rank.active = false;
        this.node_over.active = false;
        this.node_chengjiu.active = false;
        this.openover = false;
        this.wxQuanState(true);
        this.wxCloseOver();
        this.wxCloseRank();
        this.initGmae();
    },

    getScore: function(score)
    {
        var gunConf = this.GAME.gunsconfig[this.GAME.currGun];
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
        if(type == 2)
            return cc.instantiate(this.louti_2);
        else if(type == 3)
            return cc.instantiate(this.louti_3);
        else if(type == 4)
            return cc.instantiate(this.louti_4);
        else if(type == 5)
            return cc.instantiate(this.louti_5);
        else if(type == 6)
            return cc.instantiate(this.louti_6);
        else if(type == 7)
            return cc.instantiate(this.louti_7);
        else if(type == 8)
            return cc.instantiate(this.louti_8);
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
                    var wujian = cc.instantiate(this.GAME.wujians[Math.floor(Math.random()*this.GAME.wujians.length)]);
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
                if(currH > s.height)
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
                var wujian = cc.instantiate(this.GAME.wujians[Math.floor(Math.random()*this.GAME.wujians.length)]);
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
            var playerConf = this.GAME.playersconfig[this.GAME.currPlayer];

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
        this.player = cc.instantiate(this.GAME.players[this.GAME.currPlayer]);
        this.player.x = s.width/2;
        this.player.y = 600;
        this.node_game.addChild(this.player,1000001);

        this.player.fangdanyi = cc.instantiate(this.fangdanyi);
        this.player.addChild(this.player.fangdanyi,1);
        this.player.fangdanyi.active = false;
        var cardnum = this.getStorageCard();
        if(this.GAME.fangdanyi && cardnum>0 && this.GAME.playerfangdanyi)
        {
            this.player.fangdanyi.active = true;
        }

        var playerConf = this.GAME.playersconfig[this.GAME.currPlayer];
        var gunConf = this.GAME.gunsconfig[this.GAME.currGun];

        this.player.gun = cc.instantiate(this.GAME.guns[this.GAME.currGun]);
        this.player.gun.y = this.player.height*0.3 + gunConf.y;
        this.player.addChild(this.player.gun,1);
        this.player.scaleX = -1;
        this.lastPlayerPos = this.node_game.convertToWorldSpace(this.player.position);

        this.player.aim = cc.instantiate(this.aim_1);
        this.player.aim.y = this.player.gun.y;
        this.player.aim.active = false;
        this.player.aim.line = cc.find("line",this.player.aim);
        this.player.aim.scale = (gunConf.aimLen+playerConf.aimLen)/2;
        this.player.addChild(this.player.aim,0);

        this.player.aim.line.rotation = 0;
        this.player.aim.getComponent("cc.ProgressBar").progress = 0;

        this.player.gun_fire = cc.instantiate(this.gun_fire);
        this.player.gun_fire.y = gunConf.y;
        this.player.gun_fire.x = this.player.gun.width*(1-this.player.gun.anchorX);
        this.player.gun_fire.active = false;
        this.player.gun.addChild(this.player.gun_fire,0);
    },

    createEnemy: function()
    {
        if(this.GAME.enemy_num==0)
        {
            this.enemy = cc.instantiate(this.GAME.bosss[Math.floor(Math.random()*this.GAME.bosss.length)]);
            this.enemy.enemytype = 4;
            this.enemy.enemycolor = this.GAME.enemysconfig[2].color;
            this.enemy.hp = Math.floor(Math.random()*10+15);
            this.enemy.zhp = this.enemy.hp;
            this.node_game.addChild(this.enemy,1000001);

            var gunConf = this.GAME.gunsconfig[0];
            this.enemy.gun = cc.instantiate(this.gun_1);
            this.enemy.gun.y = this.enemy.height*0.3 + gunConf.y;
            this.enemy.addChild(this.enemy.gun);

            this.enemy.gun_fire = cc.instantiate(this.gun_fire);
            this.enemy.gun_fire.y = gunConf.y;
            this.enemy.gun_fire.x = this.enemy.gun.width*(1-this.enemy.gun.anchorX);
            this.enemy.gun_fire.active = false;
            this.enemy.gun.addChild(this.enemy.gun_fire,0);

            this.node_game_ui.boss.active = true;
            this.node_game_ui.boss.getComponent("cc.ProgressBar").progress = 1;

            this.playSound(this.audio_boss_chu);
        }
        else
        {
            var index = Math.floor(Math.random()*this.GAME.enemys.length);
            this.enemy = cc.instantiate(this.GAME.enemys[index]);
            this.enemy.enemyindex = index;
            this.enemy.enemytype = this.GAME.enemysconfig[index].type;
            this.enemy.enemycolor = this.GAME.enemysconfig[index].color;
            this.node_game.addChild(this.enemy,1000001);

            var gunConf = this.GAME.gunsconfig[0];
            this.enemy.gun = cc.instantiate(this.gun_1);
            this.enemy.gun.y = this.enemy.height*0.3 + gunConf.y;
            this.enemy.addChild(this.enemy.gun);

            this.enemy.gun_fire = cc.instantiate(this.gun_fire);
            this.enemy.gun_fire.y = gunConf.y;
            this.enemy.gun_fire.x = this.enemy.gun.width*(1-this.enemy.gun.anchorX);
            this.enemy.gun_fire.active = false;
            this.enemy.gun.addChild(this.enemy.gun_fire,0);
        }
        this.GAME.enemy_num --;
        this.enemy.ismove = false;
        this.enemy.die = true;
    },

    copyEnemy: function()
    {
        var index = this.enemy.enemyindex;
        var enemy = cc.instantiate(this.GAME.enemys[index]);
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
            var speed = this.GAME.playersconfig[this.GAME.currPlayer].speed*700;
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
                            self.playSound(self.audio_foot_1);
                        }));
                    }
                    else if(num == data[1])
                    {
                        var posx = lastp.x - this.tih;
                        var posy = lastp.y + this.tih;
                        acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                        acs.push(cc.callFunc(function(){
                            self.playSound(self.audio_foot_1);
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
                                self.playSound(self.audio_foot_1);
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
                            self.playSound(self.audio_foot_1);
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
                            self.playSound(self.audio_foot_1);
                        }));
                    }
                    else if(num == data[1])
                    {
                        var posx = lastp.x + this.tih;
                        var posy = lastp.y + this.tih;
                        acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                        acs.push(cc.callFunc(function(){
                            self.playSound(self.audio_foot_1);
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
                                self.playSound(self.audio_foot_1);
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
                            self.playSound(self.audio_foot_1);
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
                            self.playSound(self.audio_foot_boss_land);
                            self.node_game.runAction(cc.sequence(
                                cc.moveBy(0.05,cc.v2(0,20)).easing(cc.easeSineIn()),
                                cc.moveBy(0.05,cc.v2(0,-20)).easing(cc.easeSineOut()),
                                cc.moveBy(0.05,cc.v2(0,10)).easing(cc.easeSineIn()),
                                cc.moveBy(0.05,cc.v2(0,-10)).easing(cc.easeSineOut())
                            ));
                            self.enemy.die = false;
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
                                    self.playSound(self.audio_foot_boss_1);
                                }));
                            }
                            else if(num == data[1])
                            {
                                var posx = lastp.x - this.tih;
                                var posy = lastp.y + this.tih;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                                acs.push(cc.callFunc(function(){
                                    self.playSound(self.audio_foot_boss_1);
                                }));

                                var posx2 = ti.x+ti.width/2 - this.enemy.width/2;
                                var posy2 = posy;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx2,posy2,this.tih,1));
                                acs.push(cc.callFunc(function(){
                                    self.enemy.scaleX = 1;
                                    self.playSound(self.audio_foot_boss_1);
                                }));
                            }
                            else
                            {
                                var posx = lastp.x - this.tih;
                                var posy = lastp.y + this.tih;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                                lastp = cc.v2(posx,posy);

                                acs.push(cc.callFunc(function(){
                                    self.playSound(self.audio_foot_boss_1);
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
                        cc.moveTo(1,posx,posy)
                    ));
                    acs.push(cc.callFunc(function(){
                        self.enemy.die = false;
                    }));
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
                            self.playSound(self.audio_foot_boss_land);
                            self.node_game.runAction(cc.sequence(
                                cc.moveBy(0.05,cc.v2(0,20)).easing(cc.easeSineIn()),
                                cc.moveBy(0.05,cc.v2(0,-20)).easing(cc.easeSineOut()),
                                cc.moveBy(0.05,cc.v2(0,10)).easing(cc.easeSineIn()),
                                cc.moveBy(0.05,cc.v2(0,-10)).easing(cc.easeSineOut())
                            ));
                            self.enemy.die = false;
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
                                    self.playSound(self.audio_foot_boss_1);
                                }));
                            }
                            else if(num == data[1])
                            {
                                var posx = lastp.x + this.tih;
                                var posy = lastp.y + this.tih;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                                acs.push(cc.callFunc(function(){
                                    self.playSound(self.audio_foot_boss_1);
                                }));

                                var posx2 = (ti.x-ti.width/2) + this.enemy.width/2;
                                var posy2 = posy;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx2,posy2,this.tih,1));
                                acs.push(cc.callFunc(function(){
                                    self.enemy.scaleX = -1;
                                    self.playSound(self.audio_foot_boss_1);
                                }));
                            }
                            else
                            {
                                var posx = lastp.x + this.tih;
                                var posy = lastp.y + this.tih;
                                acs.push(cc.jumpTo(this.tih*3/speed,posx,posy,this.tih,1));
                                lastp = cc.v2(posx,posy);

                                acs.push(cc.callFunc(function(){
                                    self.playSound(self.audio_foot_boss_1);
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
                        cc.moveTo(1,posx,posy)
                    ));
                    acs.push(cc.callFunc(function(){
                        self.enemy.die = false;
                    }));
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
            var gunConf = this.GAME.gunsconfig[this.GAME.currGun];
            var dis = 1584;
            var bulletspeed = 2500;
            if(cc.sys.os == cc.sys.OS_ANDROID)
                bulletspeed = 1600;
            if(gunConf.type == 1)
            {
                var dir = cc.pRotateByAngle(v,cc.v2(0,0),rad);
                var pos = cc.pMult(dir,1584);

                var gw = this.player.gun.width*(1-this.player.gun.anchorX) + 10;

                var ac = cc.sequence(
                    cc.callFunc(function(){
                        self.playSound(self.GAME.gunaudios[self.GAME.currGun]);
                        var smoke = null;
                        if (self.poolsmokes.size() > 0) {
                            smoke = self.poolsmokes.get();
                            smoke.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            smoke = cc.instantiate(self.smoke);
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
                            shell = cc.instantiate(self.shell);
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
                    bullet = cc.instantiate(this.bullet_1);
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
                        self.playSound(self.GAME.gunaudios[self.GAME.currGun]);
                        var smoke = null;
                        if (self.poolsmokes.size() > 0) {
                            smoke = self.poolsmokes.get();
                            smoke.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            smoke = cc.instantiate(self.smoke);
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
                            shell = cc.instantiate(self.shell);
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

                    dir = cc.pRotateByAngle(dir,cc.v2(0,0),cc.degreesToRadians(r));
                    var pos = cc.pMult(dir,1584);

                    var bullet = null;
                    if (this.poolbullets.size() > 0) {
                        bullet = this.poolbullets.get();
                        bullet.collnum = 0;
                        bullet.stopAllActions();
                    } else {
                        bullet = cc.instantiate(this.bullet_1);
                    }
                    bullet.position = cc.pAdd(this.player.position,this.player.aim.position);
                    bullet.position = cc.pAdd(cc.pMult(dir,gw),bullet.position);
                    bullet.opacity = 0;
                    this.node_game.addChild(bullet,1000001);
                    bullet.diedir = dir;

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
                        self.playSound(self.GAME.gunaudios[self.GAME.currGun]);
                        var smoke = null;
                        if (self.poolsmokes.size() > 0) {
                            smoke = self.poolsmokes.get();
                            smoke.getComponent("cc.ParticleSystem").resetSystem();
                        } else {
                            smoke = cc.instantiate(self.smoke);
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
                            shell = cc.instantiate(self.shell);
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
                    dir = cc.pRotateByAngle(dir,cc.v2(0,0),cc.degreesToRadians(r));
                    var pos = cc.pMult(dir,1584);

                    var bullet = null;
                    if (this.poolbullets.size() > 0) {
                        bullet = this.poolbullets.get();
                        bullet.collnum = 0;
                        bullet.stopAllActions();
                    } else {
                        bullet = cc.instantiate(this.bullet_1);
                    }
                    bullet.position = cc.pAdd(this.player.position,this.player.aim.position);
                    bullet.position = cc.pAdd(cc.pMult(dir,gw),bullet.position);
                    //bullet.opacity = 0;
                    this.node_game.addChild(bullet,1000001);
                    bullet.diedir = dir;

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
        var gunConf = this.GAME.gunsconfig[this.GAME.currGun];
        if(gunConf.num == this.player.gun.firenum)
        {
            var b = false;
            if(this.player.gun.hitheadnum>0)
            {
                b = true;
                this.playSound(this.audio_hit_head_yuyin);
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
        var bulletspeed = 2500;
        if(cc.sys.os == cc.sys.OS_ANDROID)
            bulletspeed = 1600;

        var dir = cc.pSub(this.player.position,this.enemy.position);
        dir = cc.pNormalize(dir);

        var gw = this.enemy.gun.width*(1-this.enemy.gun.anchorX) + 10;
        var pos = cc.pMult(dir,cc.winSize.height);

        var bullet = cc.instantiate(this.ebullet_1);
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

        this.playSound(this.audio_gun_1);

        var smoke = null;
        if (this.poolsmokes.size() > 0) {
            smoke = this.poolsmokes.get();
            smoke.getComponent("cc.ParticleSystem").resetSystem();
        } else {
            smoke = cc.instantiate(this.smoke);
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
            shell = cc.instantiate(this.shell);
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
            hit = cc.instantiate(this.hit);
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
            if(disnum>5)
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
            this.playSound(this.audio_hit_head);
            this.playSound(this.audio_coin);

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

            this.setStorageHitHeadNum(parseInt(this.getStorageHitHeadNum())+1);
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
            this.playSound(this.audio_hit_torso);

            var par = null;
            if (this.poolbloods.size() > 0) {
                par = this.poolbloods.get();
                par.getComponent("cc.ParticleSystem").resetSystem();
            } else {
                par = cc.instantiate(this.blood);
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
            cc.scaleTo(0.4,sct,sct).easing(cc.easeSineIn()),
            cc.callFunc(function(){
                self.poolhits.put(hit);
            })
        );
        hit.runAction(seq);


        this.setStorageHitEnemyNum(parseInt(this.getStorageHitEnemyNum())+1);

        if(this.enemy.enemytype == 4)
        {
            if(!this.enemy.ismove)
            this.enemy.stopAllActions();

            var playerConf = this.GAME.playersconfig[this.GAME.currPlayer];
            var gunConf = this.GAME.gunsconfig[this.GAME.currGun];
            if(this.enemy.hp > 0)
            {
                if(this.enemy.hp%3 == 0)
                    this.playSound(this.audio_boss_hurt_1);
                else if(this.enemy.hp%3 == 1)
                    this.playSound(this.audio_boss_hurt_2);
                else
                    this.playSound(this.audio_boss_hurt_3);
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
                var pos = cc.pAdd(this.enemy.position,cc.pMult(this.enemy.diedir, cc.winSize.width));
                var roang = 360;
                if(this.enemy.scaleX == 1)
                    roang = -roang;
                var ac = cc.sequence(
                    cc.spawn(
                        cc.jumpTo(0.8,pos,cc.winSize.width/4,1),
                        cc.rotateBy(0.8,roang)
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

                this.setStorageHitBossNum(parseInt(this.getStorageHitBossNum())+1);
            }
        }
        else
        {
            this.removeColl();
            var pos = cc.pAdd(this.enemy.position,cc.pMult(this.enemy.diedir, cc.winSize.width));
            var roang = 360;
            if(this.enemy.scaleX == 1)
                roang = -roang;
            var ac = cc.sequence(
                cc.spawn(
                    cc.jumpTo(0.8,pos,cc.winSize.width/4,1),
                    cc.rotateBy(0.8,roang),
                    cc.sequence(
                        cc.delayTime(0.1),
                        cc.callFunc(function(){
                            self.playerMove(false);
                        })
                    )
                ),
                cc.removeSelf()
            );
            var enemy = this.copyEnemy();
            enemy.runAction(ac);

            this.enemy.die = true;
            this.enemy.destroy();
        }
        this.judgeChengjiuGame();
    },

    showChuKou: function()
    {
        var data = this.enemy.louti.data;

        var chukou = cc.instantiate(this.chukou);
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
            var fangdanyi = cc.instantiate(this.fangdanyi);
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
            if(Math.floor(this.GAME.score) > this.getStorageScore())
                this.setStorageScore(Math.floor(this.GAME.score));
            this.nextLevel();
        }
        else
        {
            if(this.GAME.playerfuhuo)
                this.judgeFuHuo();
            else
            {
                this.gameResult();
            }
        }
    },

    gameResult: function()
    {
        if(parseInt(this.GAME.score) > this.getStorageScore())
            this.setStorageScore(parseInt(this.GAME.score));
        this.setStorageCoin(parseInt(this.getStorageCoin()) + parseInt(this.GAME.coin));
        //this.initGmae();
        this.node_game_ui.active = false;
        this.node_over.active = true;
        this.openover = true;
        this.node_over_coin.getComponent("cc.Label").string = parseInt(this.GAME.coin);
        this.node_over_score.getComponent("cc.Label").string = parseInt(this.GAME.score);
        this.node_over_chaoyue.getComponent("cc.Label").string = "超过全国"+ this.getChaoyue() +"的用户";
        this.wxOverRank(Math.floor(this.GAME.score),this.GAME.currPlayer,this.GAME.currGun);
        this.uploadData();
    },

    judgeFuHuo: function()
    {
        var self = this;
        if(this.GAME.control.length>0)
        {
            for(var i=0;i<this.GAME.control.length;i++)
            {
                var con = this.GAME.control[i];
                if(con.id == "sharecard")
                {
                    if(con.value == "0")
                    {
                        this.gameResult();
                        return;
                    }
                }
            }
        }

        this.node_fuhuo.active = true;

        this.node_game_ui.active = false;
        this.node_fuhuo_skip.active = false;
        this.node_fuhuo_coin.getComponent("cc.Label").string = Math.floor(this.GAME.coin);
        this.node_fuhuo_score.getComponent("cc.Label").string = parseInt(this.GAME.score);

        var cardnum = this.getStorageCard();
        if(cardnum <= 0)
        {
            this.node_fuhuo_pro.active = false;
            this.node_fuhuo_share.active = true;
        }
        else
        {
            this.node_fuhuo_pro.active = true;
            this.node_fuhuo_share.active = false;

            this.node_fuhuo_card_num.getComponent("cc.Label").string = "剩余:"+cardnum;
            this.node_fuhuo_pro.getComponent("cc.ProgressBar").progress = 1;
            this.node_fuhuo_pro.runtime = 8;
            var seq = cc.sequence(
                cc.delayTime(0.1),
                cc.callFunc(function(){
                    self.node_fuhuo_pro.runtime -= 0.1;
                    var p = self.node_fuhuo_pro.runtime/8;
                    self.node_fuhuo_pro.getComponent("cc.ProgressBar").progress = p;
                })
            );
            var seq2 = cc.sequence(
                cc.delayTime(8),
                cc.callFunc(function(){
                    self.gameResult();
                    self.node_fuhuo.active = false;
                })
            );

            self.node_fuhuo_pro.runAction(cc.repeat(seq,80));
            self.node_fuhuo_pro.runAction(seq2);
        }
        var seq3 = cc.sequence(
            cc.delayTime(1.5),
            cc.callFunc(function(){
                self.node_fuhuo_skip.active = true;
            })
        );
        this.node_fuhuo.runAction(seq3);
    },

    skip: function()
    {
        this.node_fuhuo_pro.stopAllActions();
        this.node_fuhuo.active = false;
        this.gameResult();
    },

    fuhuo: function(isCard)
    {
        this.node_fuhuo_pro.stopAllActions();
        this.node_fuhuo.active = false;
        this.node_game_ui.active = true;

        this.GAME.state = "start";
        this.player.position = this.GAME.lastplayerpos;
        this.rotateGun();

        if(isCard)
        {
            this.GAME.playerfangdanyi = false;
            this.setStorageCard(this.getStorageCard()-1);
            this.uploadData();
        }
        else
        {
            this.GAME.playerfuhuo = false;
        }
    },

    addCoin: function()
    {
        var self = this;
        var coin = null;
        if (this.poolcoins.size() > 0) {
            coin = this.poolcoins.get();
            coin.stopAllActions();
        } else {
            coin = cc.instantiate(this.coin);
        }
        coin.position = this.node_game.convertToWorldSpace(this.enemy.position);
        coin.y += this.enemy.height;
        this.node_game_ui.addChild(coin);

        var playerConf = this.GAME.playersconfig[this.GAME.currPlayer];
        var gunConf = this.GAME.gunsconfig[this.GAME.currGun];
        var coinNum = 1*(playerConf.coin+gunConf.coin-1);


        var x = coin.x+Math.random()*100+200;
        if(coin.x<cc.winSize.width/2)
            x = coin.x-(Math.random()*100+200);
        var seq = cc.sequence(
            cc.bezierTo(1.5,[cc.v2(coin.x,coin.y-Math.random()*200),
                cc.v2(x,coin.y+Math.random()*200),this.node_game_ui.coinicon.position]),
            cc.callFunc(function(){
                self.getCoin(coinNum);
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
                    this.playSound(this.audio_ricco_1);
                else
                    this.playSound(this.audio_ricco_2);

                var par = null;
                if (this.poolbloods.size() > 0) {
                    par = this.poolbloods.get();
                    par.getComponent("cc.ParticleSystem").resetSystem();
                } else {
                    par = cc.instantiate(this.blood);
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

    },

    vibrate: function(isLong)
    {
        if(this.getStorageVibrate() == 1 && (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS))
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

    showToast: function(str)
    {
        var toast = cc.instantiate(this.toast);
        cc.find("label",toast).getComponent("cc.Label").string = str;
        toast.opacity = 0;
        this.node.addChild(toast,1000);

        var seq = cc.sequence(
            cc.fadeIn(0.5),
            cc.delayTime(2),
            cc.fadeOut(0.5),
            cc.removeSelf()
        );
        toast.runAction(seq);
    },

    showToastCJ: function()
    {
        var toast = cc.instantiate(this.toast_cj);
        toast.opacity = 0;
        this.node.addChild(toast,1000);

        var seq = cc.sequence(
            cc.fadeIn(0.5),
            cc.delayTime(2),
            cc.fadeOut(0.5),
            cc.removeSelf()
        );
        toast.runAction(seq);
    },

    playMusic: function(music)
    {
        if(this.getStorageMusic() == 1)
            cc.audioEngine.play(music,true,0.6);
    },

    stopMusic: function()
    {
        cc.audioEngine.stopAll();
    },

    playSound: function(sound)
    {
        if(this.getStorageSound() == 1)
            cc.audioEngine.play(sound,false,1);
    },

    preloadSound: function()
    {
        cc.audioEngine.preload(this.audio_coin);
        cc.audioEngine.preload(this.audio_gun_1);
        cc.audioEngine.preload(this.audio_hit_head);
        cc.audioEngine.preload(this.audio_hit_torso);
    },

    setStorageCoin: function(coin)
    {
        cc.sys.localStorage.setItem("coin",coin);
    },
    getStorageCoin: function()
    {
        var coin = cc.sys.localStorage.getItem("coin");
        coin = coin ? coin : 0;
        return coin;
    },

    setStorageScore: function(score)
    {
        cc.sys.localStorage.setItem("highscore",score);
    },
    getStorageScore: function()
    {
        var currscore = cc.sys.localStorage.getItem("highscore");
        currscore = currscore ? currscore : 0;
        return currscore;
    },

    setStorageCurrPlayer: function(id)
    {
        cc.sys.localStorage.setItem("currPlayer",id);
    },
    getStorageCurrPlayer: function()
    {
        var currPlayer = cc.sys.localStorage.getItem("currPlayer");
        currPlayer = currPlayer ? currPlayer : 1;
        return currPlayer;
    },

    setStoragePlayer: function(id,val)
    {
        cc.sys.localStorage.setItem("player_"+id,val == 0 ? 0 : 1);
    },
    getStoragePlayer: function(id)
    {
        var player = cc.sys.localStorage.getItem("player_"+id);
        player = player ? player : 0;
        return player;
    },

    setStorageCurrGun: function(id)
    {
        cc.sys.localStorage.setItem("currGun",id);
    },
    getStorageCurrGun: function()
    {
        var currGun = cc.sys.localStorage.getItem("currGun");
        currGun = currGun ? currGun : 1;
        return currGun;
    },

    setStorageGun: function(id,val)
    {
        cc.sys.localStorage.setItem("gun_"+id,val == 0 ? 0 : 1);
    },
    getStorageGun: function(id)
    {
        var gun = cc.sys.localStorage.getItem("gun_"+id);
        gun = gun ? gun : 0;
        return gun;
    },

    setStorageQianDao: function(day)
    {
        cc.sys.localStorage.setItem("qiandao",day);
    },
    getStorageQianDao: function()
    {
        var day = cc.sys.localStorage.getItem("qiandao");
        day = day ? day : 0;
        return day;
    },
    setStorageQianDaoTime: function(time)
    {
        cc.sys.localStorage.setItem("qiandaotime",time);
    },
    getStorageQianDaoTime: function()
    {
        var time = cc.sys.localStorage.getItem("qiandaotime");
        time = time ? time : 0;
        return time;
    },

    setStorageMusic: function(music)
    {
        cc.sys.localStorage.setItem("music",music);
    },
    getStorageMusic: function()
    {
        var music = cc.sys.localStorage.getItem("music");
        music = music ? music : 0;
        return music;
    },

    setStorageSound: function(sound)
    {
        cc.sys.localStorage.setItem("sound",sound);
    },
    getStorageSound: function()
    {
        var sound = cc.sys.localStorage.getItem("sound");
        sound = sound ? sound : 0;
        return sound;
    },

    setStorageVibrate: function(vibrate)
    {
        cc.sys.localStorage.setItem("vibrate",vibrate);
    },
    getStorageVibrate: function()
    {
        var vibrate = cc.sys.localStorage.getItem("vibrate");
        vibrate = vibrate ? vibrate : 0;
        return vibrate;
    },

    setStorageFirst: function(first)
    {
        cc.sys.localStorage.setItem("first",first);
    },
    getStorageFirst: function()
    {
        var vibrate = cc.sys.localStorage.getItem("first");
        vibrate = vibrate ? vibrate : 0;
        return vibrate;
    },

    setStorageCard: function(card)
    {
        cc.sys.localStorage.setItem("card",card);
    },
    getStorageCard: function()
    {
        var card = cc.sys.localStorage.getItem("card");
        card = card ? card : 0;
        return card;
    },

    setStorageYindao: function(yindao)
    {
        cc.sys.localStorage.setItem("yindao",yindao);
    },
    getStorageYindao: function()
    {
        var yindao = cc.sys.localStorage.getItem("yindao");
        yindao = yindao ? yindao : 0;
        return yindao;
    },

    setStorageGunJieSuoNum: function(num)
    {
        cc.sys.localStorage.setItem("gun_jiesuo_num",num);
    },
    getStorageGunJieSuoNum: function()
    {
        var num = cc.sys.localStorage.getItem("gun_jiesuo_num");
        num = num ? num : 0;
        return num;
    },
    setStorageGunJieSuoAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("gun_jiesuo_award_num",num);
    },
    getStorageGunJieSuoAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("gun_jiesuo_award_num");
        num = num ? num : 0;
        return num;
    },

    setStorageRoleJieSuoNum: function(num)
    {
        cc.sys.localStorage.setItem("role_jiesuo_num",num);
    },
    getStorageRoleJieSuoNum: function()
    {
        var num = cc.sys.localStorage.getItem("role_jiesuo_num");
        num = num ? num : 0;
        return num;
    },
    setStorageRoleJieSuoAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("role_jiesuo_award_num",num);
    },
    getStorageRoleJieSuoAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("role_jiesuo_award_num");
        num = num ? num : 0;
        return num;
    },

    setStorageHitEnemyNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_enemy_num",num);
    },
    getStorageHitEnemyNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_enemy_num");
        num = num ? num : 0;
        return num;
    },
    setStorageHitEnemyAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_enemy_award_num",num);
    },
    getStorageHitEnemyAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_enemy_award_num");
        num = num ? num : 0;
        return num;
    },
    setStorageHitEnemyToastNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_enemy_toast_num",num);
    },
    getStorageHitEnemyToastNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_enemy_toast_num");
        num = num ? num : 0;
        return num;
    },

    setStorageHitHeadNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_head_num",num);
    },
    getStorageHitHeadNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_head_num");
        num = num ? num : 0;
        return num;
    },
    setStorageHitHeadAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_head_award_num",num);
    },
    getStorageHitHeadAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_head_award_num");
        num = num ? num : 0;
        return num;
    },
    setStorageHitHeadToastNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_head_toast_num",num);
    },
    getStorageHitHeadToastNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_head_toast_num");
        num = num ? num : 0;
        return num;
    },

    setStorageHitBossNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_boss_num",num);
    },
    getStorageHitBossNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_boss_num");
        num = num ? num : 0;
        return num;
    },
    setStorageHitBossAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_boss_award_num",num);
    },
    getStorageHitBossAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_boss_award_num");
        num = num ? num : 0;
        return num;
    },
    setStorageHitBossToastNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_boss_toast_num",num);
    },
    getStorageHitBossToastNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_boss_toast_num");
        num = num ? num : 0;
        return num;
    },

    getChaoyue: function()
    {
        if(this.GAME.score < 10)
        {
            return "3%";
        }
        else if(this.GAME.score < 50 && this.GAME.score >= 10)
        {
            return "9%";
        }
        else if(this.GAME.score < 100 && this.GAME.score >= 50)
        {
            return "12%";
        }
        else if(this.GAME.score < 300 && this.GAME.score >=100)
        {
            return "18%";
        }
        else if(this.GAME.score < 500 && this.GAME.score >=300)
        {
            return "32%";
        }
        else if(this.GAME.score < 1000 && this.GAME.score >=500)
        {
            return "45%";
        }
        else if(this.GAME.score < 2000 && this.GAME.score >=1000)
        {
            return "66%";
        }
        else if(this.GAME.score < 3000 && this.GAME.score >= 2000)
        {
            return "72%";
        }
        else if(this.GAME.score < 4000 && this.GAME.score >= 3000)
        {
            return "81%";
        }
        else if(this.GAME.score < 5000 && this.GAME.score >= 4000)
        {
            return "86%";
        }
        else if(this.GAME.score < 6000 && this.GAME.score >= 5000)
        {
            return "90%";
        }
        else if(this.GAME.score < 10000 && this.GAME.score >= 6000)
        {
            return "95%";
        }
        else if(this.GAME.score >= 10000)
        {
            return "99%";
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
                    cc.log(res);
                },
                fail: function (res) {
                    // 分享失败
                    qianqista.share(false);
                }
            });

            wx.onShareAppMessage(function (ops){
                return {
                    query:"channel=sharemenu",
                    title: "自从玩了这个游戏，每把吃鸡都能拿98K",
                    imageUrl: cc.url.raw("resources/zhuanfa.jpg")
                }
            });
        }
    },

    wxOpenSetting: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            self.node_quanxian.active = true;
            var openDataContext = wx.getOpenDataContext();
            var sharedCanvas = openDataContext.canvas;
            var button = wx.createOpenSettingButton({
                type: 'text',
                text: '打开设置页面',
                style: {
                    left: sharedCanvas.width/4-50,
                    top: sharedCanvas.height/4+30,
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
            var quan = cc.find("quan",this.node_main);
            var sc = sharedCanvas.width/this.dsize.width;
            var dpi = cc.view._devicePixelRatio;
            var pos = cc.v2(quan.x*sc/dpi,sharedCanvas.height/dpi - (quan.y-this.node_main_bottom.y)*sc/dpi);
            this.quan_button = wx.createGameClubButton({
                icon: 'white',
                style: {
                    left: pos.x - 15,
                    top: pos.y - 15,
                    width: 30,
                    height: 30
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

    wxUploadScore: function(score,playerId,gunId)
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        wx.postMessage({ message: "updateScore",score:score,playerId:playerId,gunId:gunId });
    },

    wxGropShare: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            wx.shareAppMessage({
                query:"channel=groupsharemenu",
                title: "自从玩了这个游戏，每把吃鸡都能拿98K",
                imageUrl: cc.url.raw("resources/zhuanfa.jpg"),
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
            var s = "自从玩了这个游戏，每把吃鸡都能拿98K";
            wx.shareAppMessage({
                query:"channel=sharechangemenu",
                title: s,
                imageUrl: cc.url.raw("resources/zhuanfa.jpg"),
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
        var sharetime = cc.sys.localStorage.getItem("sharetime");
        sharetime = sharetime ? sharetime : 0;
        var now = new Date().getTime();
        if(now - sharetime > 24*60*60*1000)
        {
            cc.sys.localStorage.setItem("sharetime",now);
            cc.sys.localStorage.setItem("sharenum",0);
        }

        var sharenum = cc.sys.localStorage.getItem("sharenum");
        sharenum = sharenum ? sharenum : 0;
        if(sharenum>=5)
        {
            if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
            {
                wx.showToast({
                    title: "每天最多领取5次"
                });
            }

            return;
        }

        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            wx.shareAppMessage({
                query:"channel=sharecardmenu",
                title: "自从玩了这个游戏，每把吃鸡都能拿98K",
                imageUrl: cc.url.raw("resources/zhuanfa.jpg"),
                success: function(res)
                {
                    wx.showToast({
                        title: "获取到一个复活卡"
                    });
                    cc.sys.localStorage.setItem("sharenum",(sharenum+1));

                    var cardnum = self.getStorageCard();
                    cardnum = parseInt(cardnum) + 1;
                    self.setStorageCard(cardnum);
                    self.node_card_num.getComponent("cc.Label").string = cardnum+"";
                    self.uploadData();
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
            var cardnum = self.getStorageCard();
            cardnum = parseInt(cardnum) + 1;
            self.setStorageCard(cardnum);
            self.node_card_num.getComponent("cc.Label").string = cardnum+"";
        }
    },

    wxGropShareCoin: function()
    {
        var sharetime = cc.sys.localStorage.getItem("sharetime_coin");
        sharetime = sharetime ? sharetime : 0;
        var now = new Date().getTime();
        if(now - sharetime > 24*60*60*1000)
        {
            cc.sys.localStorage.setItem("sharetime_coin",now);
            cc.sys.localStorage.setItem("sharenum_coin",0);
        }

        var sharenum = cc.sys.localStorage.getItem("sharenum_coin");
        sharenum = sharenum ? sharenum : 0;

        if(sharenum>=2)
        {
            if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
            {
                wx.showToast({
                    title: "每天最多领取2次"
                });
            }

            return;
        }

        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            wx.shareAppMessage({
                query:"channel=sharecoinmenu",
                title: "自从玩了这个游戏，每把吃鸡都能拿98K",
                imageUrl: cc.url.raw("resources/zhuanfa.jpg"),
                success: function(res)
                {
                    wx.showToast({
                        title: "获取到100金币"
                    });
                    cc.sys.localStorage.setItem("sharenum_coin",(sharenum+1));

                    var cardnum = self.getStorageCoin();
                    cardnum = parseInt(cardnum) + 100;
                    self.setStorageCoin(cardnum);
                    self.node_role_coin.getComponent("cc.Label").string = cardnum+"";
                    self.node_gun_coin.getComponent("cc.Label").string = cardnum+"";
                    self.uploadData();
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
            var cardnum = self.getStorageCoin();
            cardnum = parseInt(cardnum) + 100;
            self.setStorageCoin(cardnum);
            self.node_role_coin.getComponent("cc.Label").string = cardnum+"";
            self.node_gun_coin.getComponent("cc.Label").string = cardnum+"";
        }
    },

    wxGropShareFuhuo: function()
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            wx.shareAppMessage({
                query:"channel=sharefuhuomenu",
                title: this.userInfo.nickName +"挑战失败，快来帮帮 Ta",
                imageUrl: cc.url.raw("resources/zhuanfa.jpg"),
                success: function(res)
                {
                    wx.showToast({
                        title: "复活成功"
                    });
                    self.fuhuo();
                    qianqista.share(true);
                },
                fail: function()
                {
                    qianqista.share(false);
                }
            });
        }
        else
        {
            self.fuhuo(false);
        }
    },

    wxMore: function()
    {
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            wx.previewImage({
                urls: ["https://www.77qqup.com:442/images/apptuijian/hulubox.jpg"],
                success: function (res) {
                },
                fail: function (res) {
                    return;
                }
            });
        }
    }
});
