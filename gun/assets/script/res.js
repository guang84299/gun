
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
        node_xuming: {
            default: null,
            type: cc.Prefab
        },
        node_coin: {
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
        node_guanzhu: {
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
        },
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
            {speed:1.5,coin:1,fire:0,aimLen:1.2,aimSpeed:1.1}
        ];cc.winSize.width;

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
        ];cc.winSize.width;

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
            {aimLen:1.5,type:1,fire:7,num:1,angle:0,y:15,speed:0,score:3,coin:2}
        ];cc.winSize.width;

        this.bgcolor = [cc.color(140,31,57),cc.color(110,24,128),cc.color(25,112,133),cc.color(136,110,94),
            cc.color(89,89,89),cc.color(132,131,172),cc.color(134,152,118),cc.color(149,149,149),
            cc.color(24,128,93),cc.color(122,28,24),cc.color(24,95,128),cc.color(149,140,46),
            cc.color(208,163,162),cc.color(107,133,148),cc.color(86,127,22)];cc.winSize.width;

        this.qiandaoconfig = [20,20,30,30,40,50,100];cc.winSize.width;

        this.chengjiuconfig = {
            hitenemy:[{num:100,coin:10},{num:200,coin:20},{num:500,coin:30},{num:1000,coin:50},{num:5000,coin:100},{num:10000,coin:200}],
            hithead:[{num:50,coin:10},{num:100,coin:20},{num:200,coin:30},{num:500,coin:50},{num:1000,coin:100},{num:5000,coin:200}],
            hitboss:[{num:20,coin:10},{num:50,coin:20},{num:100,coin:30},{num:200,coin:50},{num:500,coin:100},{num:1000,coin:200}],
            jiesuogun:[{num:2,coin:10},{num:4,coin:30},{num:8,coin:100},{num:10,coin:200},{num:12,coin:300},{num:14,coin:300},{num:16,coin:300}],
            jiesuorole:[{num:2,coin:10},{num:4,coin:30},{num:8,coin:100}]
        };cc.winSize.width;

        this.inviteconfig = [50,70,80,100,600];cc.winSize.width;

        this.GAME = {};cc.winSize.width;

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

        ];cc.winSize.width;
    
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
            ];cc.winSize.width;
    },

    showToast: function(str)
    {
        var toast = cc.instantiate(this.toast);cc.winSize.width;
        cc.find("label",toast).getComponent("cc.Label").string = str;cc.winSize.width;
        toast.opacity = 0;cc.winSize.width;
        this.node.addChild(toast,1000);cc.winSize.width;

        var seq = cc.sequence(
            cc.fadeIn(0.5),
            cc.delayTime(2),
            cc.fadeOut(0.5),
            cc.removeSelf()
        );cc.winSize.width;
        toast.runAction(seq);cc.winSize.width;
    },

    showToastCJ: function()
    {
        var toast = cc.instantiate(this.toast_cj);cc.winSize.width;
        toast.opacity = 0;cc.winSize.width;
        toast.y = cc.winSize.height/2 - 50;cc.winSize.width;
        this.node.addChild(toast,1000);cc.winSize.width;

        var seq = cc.sequence(
            cc.fadeIn(0.5),
            cc.delayTime(2),
            cc.fadeOut(0.5),
            cc.removeSelf()
        );cc.winSize.width;
        toast.runAction(seq);cc.winSize.width;
    }

});
