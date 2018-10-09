
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
    },

    getBase64SharePic: function()
    {
        return "data:image/png;base64,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";
    }

});
