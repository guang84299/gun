
cc.Class({
    extends: cc.Component,

    properties: {
        node_role: {
            default: null,
            type: cc.Prefab
        },
        node_gun: {
            default: null,
            type: cc.Prefab
        },
        node_chengjiu: {
            default: null,
            type: cc.Prefab
        },
        node_setting: {
            default: null,
            type: cc.Prefab
        },
        node_card: {
            default: null,
            type: cc.Prefab
        },
        node_duihuan: {
            default: null,
            type: cc.Prefab
        },
        node_qiandao: {
            default: null,
            type: cc.Prefab
        },
        node_rank: {
            default: null,
            type: cc.Prefab
        },
        node_linggun: {
            default: null,
            type: cc.Prefab
        },
        node_award: {
            default: null,
            type: cc.Prefab
        },
        node_zhanshi: {
            default: null,
            type: cc.Prefab
        },
        node_tryzhanshi: {
            default: null,
            type: cc.Prefab
        },
        node_xuming: {
            default: null,
            type: cc.Prefab
        },
        node_coin: {
            default: null,
            type: cc.Prefab
        },
        node_coinx2: {
            default: null,
            type: cc.Prefab
        },
        node_fuhuo: {
            default: null,
            type: cc.Prefab
        },
        node_tishi: {
            default: null,
            type: cc.Prefab
        },
        node_over: {
            default: null,
            type: cc.Prefab
        },
        node_quanxian: {
            default: null,
            type: cc.Prefab
        },
        node_duizhan: {
            default: null,
            type: cc.Prefab
        },
        node_tiaozhan: {
            default: null,
            type: cc.Prefab
        },
        node_tiaozhan_sus: {
            default: null,
            type: cc.Prefab
        },
        node_tiaozhan_fail: {
            default: null,
            type: cc.Prefab
        },
        node_tiaozhan_desc: {
            default: null,
            type: cc.Prefab
        },
        node_star: {
            default: null,
            type: cc.Prefab
        },
        loutis: {
            default: [],
            type: cc.Prefab
        },
        players: {
            default: [],
            type: cc.Prefab
        },
        guns: {
            default: [],
            type: cc.Prefab
        },
        enemys: {
            default: [],
            type: cc.Prefab
        },
        bosss: {
            default: [],
            type: cc.Prefab
        },
        gunaudios: {
            url: cc.AudioClip,
            default: []
        },
        wujians: {
            default: [],
            type: cc.Prefab
        },
        sp_over_players: {
            default: [],
            type: cc.SpriteFrame
        },
        pk_lvs: {
            default: [],
            type: cc.SpriteFrame
        },
        aim_1: {
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
        audio_chengjiu: {
            url: cc.AudioClip,
            default: null
        }
    },

    onLoad: function()
    {

        this.playersconfig = [
            {speed:1,coin:1,fire:0,aimLen:1,aimSpeed:1.0},
            {speed:1.5,coin:1,fire:0,aimLen:1,aimSpeed:1.0},
            {speed:1,coin:1.2,fire:0,aimLen:1,aimSpeed:1.0},
            {speed:1,coin:1.1,fire:0,aimLen:1,aimSpeed:1.0},
            {speed:1,coin:1,fire:0,aimLen:1.2,aimSpeed:1.0},
            {speed:1,coin:1,fire:1,aimLen:1,aimSpeed:1.0},
            {speed:1,coin:1,fire:0,aimLen:1.1,aimSpeed:1.0},
            {speed:1,coin:1,fire:0,aimLen:1,aimSpeed:1.1},
            {speed:1,coin:1,fire:0,aimLen:1,aimSpeed:1.2},
            {speed:1.5,coin:1,fire:0,aimLen:1.2,aimSpeed:1.1},

            {speed:1,coin:1,fire:0,aimLen:1.1,aimSpeed:1.05},
            {speed:1,coin:1.1,fire:0,aimLen:1.1,aimSpeed:1.0},
            {speed:1,coin:1,fire:0,aimLen:1.1,aimSpeed:1.1},
            {speed:1,coin:1,fire:1,aimLen:1.1,aimSpeed:1.0},
            {speed:1,coin:1.1,fire:0,aimLen:1,aimSpeed:1.1},
            {speed:1,coin:1,fire:0,aimLen:1.15,aimSpeed:1.1},
            {speed:1,coin:1,fire:1,aimLen:1.15,aimSpeed:1.0},
            {speed:1,coin:1.2,fire:1,aimLen:1,aimSpeed:1.0},
            {speed:1,coin:1,fire:1,aimLen:1,aimSpeed:1.2}
        ];

        this.enemysconfig = [
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

        this.gunsconfig = [
            {aimLen:1.5,type:1,fire:2,num:1,angle:0,y:15,speed:0,score:2,coin:1.5},
            {aimLen:1.2,type:1,fire:3,num:1,angle:0,y:15,speed:0,score:2,coin:1.5},
            {aimLen:0.6,type:2,fire:1,num:3,angle:8,y:15,speed:0.08,score:1,coin:1},
            {aimLen:0.8,type:2,fire:2,num:3,angle:6,y:15,speed:0.12,score:1,coin:1},
            {aimLen:0.8,type:2,fire:2,num:3,angle:6,y:15,speed:0.12,score:1,coin:1},
            {aimLen:1.6,type:1,fire:3,num:1,angle:0,y:15,speed:0.2,score:2,coin:1.5},
            {aimLen:0.5,type:3,fire:2,num:3,angle:8,y:15,speed:0.2,score:1,coin:1},
            {aimLen:0.9,type:2,fire:3,num:3,angle:7,y:15,speed:0.18,score:1,coin:1},
            {aimLen:2,type:1,fire:4,num:1,angle:0,y:15,speed:0.2,score:2,coin:1.5},
            {aimLen:3,type:1,fire:5,num:1,angle:0,y:2,speed:0.2,score:2,coin:1.8},

            {aimLen:1,type:3,fire:2,num:4,angle:8,y:15,speed:0,score:1.2,coin:1.2},
            {aimLen:0.8,type:2,fire:2,num:4,angle:7,y:15,speed:0.06,score:1,coin:1},
            {aimLen:1.2,type:3,fire:3,num:2,angle:7,y:15,speed:0,score:1.2,coin:1.2},
            {aimLen:1,type:2,fire:2,num:4,angle:7,y:15,speed:0.15,score:1,coin:1},
            {aimLen:0.5,type:3,fire:2,num:5,angle:15,y:15,speed:0,score:1,coin:1},
            {aimLen:0.7,type:2,fire:1,num:5,angle:5,y:15,speed:0.06,score:1,coin:1},
            {aimLen:1.2,type:1,fire:5,num:1,angle:0,y:15,speed:0,score:3,coin:2},
            {aimLen:0.9,type:2,fire:3,num:3,angle:3,y:15,speed:0.08,score:1,coin:1},
            {aimLen:1.5,type:1,fire:7,num:1,angle:0,y:15,speed:0,score:3,coin:2},

            {aimLen:1.2,type:2,fire:3,num:4,angle:3,y:15,speed:0.08,score:2,coin:2}
        ];

        this.bgcolor = [cc.color(36,106,206),cc.color(110,24,128),cc.color(25,112,133),cc.color(136,110,94),
            cc.color(89,89,89),cc.color(132,131,172),cc.color(134,152,118),cc.color(149,149,149),
            cc.color(24,128,93),cc.color(122,28,24),cc.color(24,95,128),cc.color(149,140,46),
            cc.color(208,163,162),cc.color(107,133,148),cc.color(140,31,57),cc.color(86,127,22)];

        this.qiandaoconfig = [20,20,30,30,40,50,100];

        this.chengjiuconfig = {
            hitenemy:[{num:100,coin:10},{num:200,coin:20},{num:500,coin:30},{num:1000,coin:50},{num:5000,coin:100},{num:10000,coin:200}],
            hithead:[{num:50,coin:10},{num:100,coin:20},{num:200,coin:30},{num:500,coin:50},{num:1000,coin:100},{num:5000,coin:200}],
            hitboss:[{num:20,coin:10},{num:50,coin:20},{num:100,coin:30},{num:200,coin:50},{num:500,coin:100},{num:1000,coin:200}],
            jiesuogun:[{num:2,coin:10},{num:4,coin:30},{num:8,coin:100},{num:10,coin:200},{num:12,coin:300},{num:14,coin:300},{num:16,coin:300}],
            jiesuorole:[{num:2,coin:10},{num:4,coin:30},{num:8,coin:100}],
            duizhan:[{num:1,coin:10},{num:3,coin:30},{num:5,coin:50},{num:10,coin:80},{num:20,coin:100},{num:30,coin:120}]
        };

        this.inviteconfig = [50,70,80,100,600];

        this.robotconfig = [
            {lv:1,baotou:0.1,hit:0.3,willhit:0.45,other:0.15},
            {lv:2,baotou:0.1,hit:0.3,willhit:0.45,other:0.15},
            {lv:3,baotou:0.2,hit:0.4,willhit:0.25,other:0.15},
            {lv:4,baotou:0.2,hit:0.4,willhit:0.25,other:0.15},
            {lv:5,baotou:0.2,hit:0.4,willhit:0.25,other:0.15},
            {lv:6,baotou:0.3,hit:0.4,willhit:0.2,other:0.1},
            {lv:7,baotou:0.3,hit:0.4,willhit:0.2,other:0.1}
        ];

        this.GAME = {};

        this.GAME.loutis = [
            [
                [1,2,1],
                [2,2,0],
                [1,2,0],
                [2,3,0],
                [1,3,-1],
                [2,2,0],
                [1,2,0],
                [2,3,0],
                [1,4,-1],
                [2,3,0],
                [1,2,1],
                [2,3,0],
                [1,4,-1],
                [2,3,0],
                [1,4,-1],
                [2,4,-1],
                [1,4,-1],
                [2,3,0],
                [1,3,-1],
                [2,2,1],
                [1,2,1],
                [2,4,2],
                [1,4,-1],
                [2,3,1],
                [1,2,0],
                [2,4,-1],
                [1,3,0],
                [2,3,0],
                [1,3,0],
                [2,4,1],
                [1,2,0],
                [2,2,0]
            ],
            [
                [1,2,1],
                [2,2,-1],
                [1,3,-1],
                [2,4,-1],
                [1,2,0],
                [2,3,0],
                [1,4,0],
                [2,3,-1],
                [1,4,0],
                [2,4,-1],
                [1,2,1],
                [2,4,-1],
                [1,4,-2],
                [2,3,-2],
                [1,2,0],
                [2,3,1],
                [1,4,-1],
                [2,3,-1],
                [1,2,1],
                [2,4,1],
                [1,3,0],
                [2,2,1],
                [1,5,-2],
                [2,4,0],
                [1,5,-2],
                [2,3,0],
                [1,4,-1],
                [2,5,-1],
                [1,2,0],
                [2,4,-1],
                [1,4,-2],
                [2,2,0]
            ],
            [
                [1,2,1],
                [2,2,0],
                [1,5,-2],
                [2,4,-2],
                [1,3,0],
                [2,4,0],
                [1,5,-2],
                [2,4,-2],
                [1,3,1],
                [2,3,1],
                [1,5,-2],
                [2,4,-1],
                [1,2,1],
                [2,3,1],
                [1,2,0],
                [2,4,-1],
                [1,2,0],
                [2,3,-1],
                [1,5,-1],
                [2,3,1],
                [1,5,0],
                [2,2,0],
                [1,3,1],
                [2,5,-1],
                [1,5,-2],
                [2,4,0],
                [1,3,1],
                [2,5,-1],
                [1,2,1],
                [2,3,1],
                [1,2,1],
                [2,2,0]
            ],
            [
                [1,2,1],
                [2,3,-1],
                [1,5,-2],
                [2,5,-2],
                [1,4,0],
                [2,4,-1],
                [1,3,0],
                [2,2,1],
                [1,5,-2],
                [2,3,0],
                [1,4,-1],
                [2,5,-1],
                [1,4,0],
                [2,5,-1],
                [1,2,2],
                [2,3,2],
                [1,5,-2],
                [2,5,-1],
                [1,2,2],
                [2,5,-1],
                [1,6,-2],
                [2,3,-1],
                [1,4,0],
                [2,3,0],
                [1,2,1],
                [2,4,0],
                [1,3,-2],
                [2,3,1],
                [1,4,1],
                [2,6,-2],
                [1,4,0],
                [2,2,0]
            ],
            [
                [1,2,1],
                [2,4,-1],
                [1,2,1],
                [2,5,-2],
                [1,3,0],
                [2,4,0],
                [1,5,-2],
                [2,2,1],
                [1,4,-1],
                [2,3,1],
                [1,4,0],
                [2,5,-1],
                [1,3,0],
                [2,4,0],
                [1,5,-2],
                [2,4,0],
                [1,5,-1],
                [2,2,2],
                [1,4,0],
                [2,5,-1],
                [1,2,1],
                [2,5,0],
                [1,5,-2],
                [2,3,1],
                [1,5,-2],
                [2,3,1],
                [1,4,0],
                [2,2,2],
                [1,5,0],
                [2,4,1],
                [1,5,-1],
                [2,2,0]
            ]

        ];


        this.levels = [
            [
                {type:1,desc:"Beat 5 enemies in a row",val:5,num:5}
            ],
            [
                {type:1,desc:"Beat 10 enemies in a row",val:10,num:10}
            ],
            [
                {type:2,desc:"Continuous headshot 2 times",val:2,num:10}
            ],
            [
                {type:1,desc:"Beat 15 enemies in a row",val:15,num:15}
            ],
            [
                {type:5,desc:"Beat 2 bosses",val:2,num:2}
            ],
            [
                {type:2,desc:"Continuous headshot 3 times",val:3,num:15}
            ],
            [
                {type:3,desc:"Using Uzi",desc2:"Beat 10 enemies",val:10,num:10,gunId:3}
            ],
            [
                {type:2,desc:"Continuous headshot 4 times",val:4,num:15}
            ],
            [
                {type:1,desc:"Beat 20 enemies in a row",val:20,num:20}
            ],
            [
                {type:5,desc:"Beat 3 bosses",val:3,num:3}
            ],
            [
                {type:3,desc:"Using Desert eagle",desc2:"Beat 12 enemies",val:12,num:12,gunId:2}
            ],
            [
                {type:1,desc:"Beat 25 enemies in a row",val:25,num:25}
            ],
            [
                {type:2,desc:"Continuous headshot 5 times",val:5,num:15}
            ],
            [
                {type:5,desc:"Beat 4 bosses",val:4,num:4}
            ],
            [
                {type:3,desc:"Using M4",desc2:"Beat 15 enemies",val:15,num:15,gunId:4}
            ],
            [
                {type:1,desc:"Beat 30 enemies in a row",val:30,num:30}
            ],
            [
                {type:2,desc:"Continuous headshot 6 times",val:6,num:15}
            ],
            [
                {type:5,desc:"Beat 5 bosses",val:5,num:5}
            ],
            [
                {type:3,desc:"Using AK-47",desc2:"Beat 20 enemies",val:20,num:20,gunId:5}
            ],
            [
                {type:1,desc:"Beat 35 enemies in a row",val:35,num:35}
            ],
            [
                {type:2,desc:"Continuous headshot 7 times",val:7,num:15}
            ],
            [
                {type:5,desc:"Beat 6 bosses",val:6,num:6}
            ],
            [
                {type:3,desc:"Using Scout",desc2:"Beat 20 enemies",val:20,num:20,gunId:6}
            ],
            [
                {type:6,desc:"Beat 30 enemies in a row",desc2:"More than 30% headshot rate",val:0.3,num:30}
            ],
            [
                {type:2,desc:"Continuous headshot 8 times",val:8,num:15}
            ],
            [
                {type:4,desc:"Beat 5 bosses",desc2:"More than 30% headshot rate",val:0.3,num:5}
            ],
            [
                {type:3,desc:"Using M240",desc2:"Beat 25 enemies",val:25,num:25,gunId:8}
            ],
            [
                {type:6,desc:"Beat 30 enemies in a row",desc2:"More than 50% headshot rate",val:0.5,num:30}
            ],
            [
                {type:2,desc:"Continuous headshot 9 times",val:9,num:15}
            ],
            [
                {type:4,desc:"Beat 5 bosses",desc2:"More than 40% headshot rate",val:0.4,num:5}
            ],
            [
                {type:3,desc:"Using AWP",desc2:"Beat 20 enemies",val:20,num:20,gunId:9}
            ],
            [
                {type:6,desc:"Beat 30 enemies in a row",desc2:"More than 60% headshot rate",val:0.6,num:30}
            ],
            [
                {type:2,desc:"Continuous headshot 10 times",val:10,num:14}
            ],
            [
                {type:4,desc:"Beat 6 bosses",desc2:"More than 50% headshot rate",val:0.5,num:6}
            ],
            [
                {type:3,desc:"Using Divine power",desc2:"Beat 20 enemies",val:20,num:20,gunId:17}
            ],
            [
                {type:6,desc:"Beat 30 enemies in a row",desc2:"More than 70% headshot rate",val:0.7,num:30}
            ],
            [
                {type:2,desc:"Continuous headshot 10 times",val:10,num:13}
            ],
            [
                {type:4,desc:"Beat 6 bosses",desc2:"More than 60% headshot rate",val:0.6,num:6}
            ],
            [
                {type:3,desc:"Using Giant",desc2:"Beat 20 enemies",val:20,num:20,gunId:19}
            ],
            [
                {type:6,desc:"Beat 30 enemies in a row",desc2:"More than 80% headshot rate",val:0.8,num:30}
            ],
            [
                {type:2,desc:"Continuous headshot 10 times",val:10,num:12}
            ],
            [
                {type:4,desc:"Beat 6 bosses",desc2:"More than 70% headshot rate",val:0.7,num:6}
            ],
            [
                {type:2,desc:"Continuous headshot 10 times",val:10,num:10}
            ],
            [
                {type:2,desc:"Continuous headshot 15 times",val:15,num:15}
            ],
            [
                {type:2,desc:"Continuous headshot 20 times",val:20,num:20}
            ],
            [
                {type:2,desc:"Continuous headshot 25 times",val:25,num:25}
            ],
            [
                {type:2,desc:"Continuous headshot 30 times",val:30,num:30}
            ],
            [
                {type:2,desc:"Continuous headshot 35 times",val:35,num:35}
            ],
            [
                {type:2,desc:"Continuous headshot 40 times",val:40,num:40}
            ],
            [
                {type:2,desc:"Continuous headshot 50 times",val:50,num:50}
            ]
        ];
    },

    updateDitu: function()
    {
        this.GAME.loutis = [
                [
                    [1,2,3],
                    [2,3,1],
                    [1,2,1],
                    [2,3,1],
                    [1,3,0],
                    [2,4,0],
                    [1,2,1],
                    [2,3,1],
                    [1,4,0],
                    [2,5,-2],
                    [1,2,1],
                    [2,3,1],
                    [1,5,-2],
                    [2,3,1],
                    [1,4,0],
                    [2,4,-2],
                    [1,5,-1],
                    [2,3,0],
                    [1,3,0],
                    [2,2,3],
                    [1,2,2],
                    [2,4,0],
                    [1,4,-1],
                    [2,3,1],
                    [1,2,1],
                    [2,4,0],
                    [1,5,-2],
                    [2,3,1],
                    [1,3,0],
                    [2,4,1],
                    [1,2,0],
                    [2,3,0]
                ],
                [
                    [1,2,3],
                    [2,2,0],
                    [1,3,0],
                    [2,4,0],
                    [1,2,0],
                    [2,3,1],
                    [1,4,-1],
                    [2,3,0],
                    [1,5,-2],
                    [2,4,0],
                    [1,2,0],
                    [2,4,2],
                    [1,8,-2],
                    [2,5,-2],
                    [1,2,1],
                    [2,3,2],
                    [1,5,-2],
                    [2,4,-1],
                    [1,2,1],
                    [2,4,2],
                    [1,3,0],
                    [2,2,2],
                    [1,5,0],
                    [2,6,-1],
                    [1,7,-2],
                    [2,3,1],
                    [1,4,-1],
                    [2,5,0],
                    [1,2,2],
                    [2,4,0],
                    [1,4,-1],
                    [2,3,0]
                ],
                [
                    [1,2,3],
                    [2,3,0],
                    [1,6,-2],
                    [2,4,-1],
                    [1,3,1],
                    [2,5,0],
                    [1,6,-1],
                    [2,8,-2],
                    [1,4,0],
                    [2,4,1],
                    [1,6,-2],
                    [2,4,0],
                    [1,3,1],
                    [2,2,2],
                    [1,2,1],
                    [2,5,0],
                    [1,2,-1],
                    [2,3,0],
                    [1,5,0],
                    [2,3,1],
                    [1,5,0],
                    [2,2,1],
                    [1,3,2],
                    [2,7,-1],
                    [1,5,-1],
                    [2,4,0],
                    [1,3,1],
                    [2,5,1],
                    [1,2,1],
                    [2,3,3],
                    [1,2,2],
                    [2,3,0]
                ],
                [
                    [1,2,3],
                    [2,3,1],
                    [1,5,0],
                    [2,6,-1],
                    [1,4,0],
                    [2,4,1],
                    [1,3,2],
                    [2,2,3],
                    [1,7,-1],
                    [2,3,0],
                    [1,4,0],
                    [2,6,-1],
                    [1,4,1],
                    [2,5,-1],
                    [1,2,2],
                    [2,3,2],
                    [1,6,-1],
                    [2,7,-2],
                    [1,2,2],
                    [2,5,1],
                    [1,6,-2],
                    [2,8,-3],
                    [1,3,0],
                    [2,4,2],
                    [1,2,3],
                    [2,4,1],
                    [1,5,-1],
                    [2,3,2],
                    [1,4,2],
                    [2,6,-1],
                    [1,4,0],
                    [2,3,1]
                ],
                [
                    [1,2,3],
                    [2,4,0],
                    [1,2,1],
                    [2,5,-1],
                    [1,3,1],
                    [2,4,1],
                    [1,5,-1],
                    [2,2,2],
                    [1,6,-1],
                    [2,3,1],
                    [1,4,1],
                    [2,6,-1],
                    [1,3,1],
                    [2,4,1],
                    [1,5,-1],
                    [2,4,1],
                    [1,6,-1],
                    [2,2,3],
                    [1,4,1],
                    [2,5,0],
                    [1,2,2],
                    [2,5,0],
                    [1,6,0],
                    [2,3,2],
                    [1,6,-1],
                    [2,3,2],
                    [1,4,1],
                    [2,2,3],
                    [1,5,1],
                    [2,4,2],
                    [1,5,0],
                    [2,2,1]
                ]
            ];
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
        toast.y = cc.winSize.height/2 - 50;
        this.node.addChild(toast,1000);

        var seq = cc.sequence(
            cc.fadeIn(0.5),
            cc.delayTime(2),
            cc.fadeOut(0.5),
            cc.removeSelf()
        );
        toast.runAction(seq);
    },

    showToastRW: function()
    {
        var toast = cc.instantiate(this.toast_cj);
        cc.find("str",toast).getComponent("cc.Label").string = "Mission completed！";
        toast.opacity = 0;
        toast.y = cc.winSize.height/2 - 50;
        this.node.addChild(toast,1000);

        var seq = cc.sequence(
            cc.fadeIn(0.5),
            cc.delayTime(2),
            cc.fadeOut(0.5),
            cc.removeSelf()
        );
        toast.runAction(seq);
    },

    showToastMony: function(mony)
    {
        var toast = cc.instantiate(this.toast_cj);
        cc.find("sp",toast).active = false;
        var str = cc.find("str",toast);
        str.x = 0;
        str.getComponent("cc.Label").string = "你有"+mony+"元现金红包待领取！";
        toast.opacity = 0;
        toast.y = cc.winSize.height/2 - 50;
        this.node.addChild(toast,1000);

        var seq = cc.sequence(
            cc.fadeIn(0.5),
            cc.delayTime(2),
            cc.fadeOut(0.5),
            cc.removeSelf()
        );
        toast.runAction(seq);
    },

    judgeRobotLv: function(jscore)
    {
        if(jscore<30)
            return 1;
        else if(jscore<70)
            return 2;
        else if(jscore<120)
            return 3;
        else if(jscore<180)
            return 4;
        else if(jscore<240)
            return 5;
        else if(jscore<300)
            return 6;
        else
            return 7;
    },

    getJSocreByGunId: function(gunId)
    {
        if(gunId>3 && gunId<=6)
            return 30;
        else if(gunId>6 && gunId<=9)
            return 70;
        else if(gunId>9 && gunId<=12)
            return 120;
        else if(gunId>12 && gunId<=15)
            return 180;
        else if(gunId>15 && gunId<=18)
            return 240;
        else if(gunId>18)
            return 300;
    },

    getPkLvSp: function(jscore,rank)
    {
        var lv = this.judgeRobotLv(jscore);
        if(lv<7)
        {
            return this.pk_lvs[lv-1];
        }
        else
        {
            if(rank > 100)
            {
                return this.pk_lvs[7-1];
            }
            else if(rank <= 100 && rank > 10)
            {
                return this.pk_lvs[8-1];
            }
            else if(rank <= 10 && rank >= 4)
            {
                return this.pk_lvs[9-1];
            }
            else if(rank <= 3 && rank >= 2)
            {
                return this.pk_lvs[10-1];
            }
            else if(rank == 1)
            {
                return this.pk_lvs[11-1];
            }
        }
    }

});
