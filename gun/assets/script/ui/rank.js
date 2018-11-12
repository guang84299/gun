var storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {
        paimingItem: {
            default: null,
            type: cc.Prefab
        },
        paimingItem2: {
            default: null,
            type: cc.Prefab
        },
        chaoyueItem: {
            default: null,
            type: cc.Prefab
        }
    },

    onLoad: function()
    {
        this.dsize = new cc.size(720, 1584);
        this.main = cc.find("Canvas").getComponent("main");
        this.res = cc.find("Canvas").getComponent("res");

        this.worldrank = {};
        this.ranktype = 1;
        
        this.initUI();

        var items = this.node.children;
        for(var j=0;j<items.length;j++)
        {
            var item = items[j];
            this.adaptItem(item);
        }
    },

    adaptItem: function(node)
    {
        var s = cc.winSize;
        var h = (this.dsize.height - s.height)/2;
        var sc = node.y/this.dsize.height;
        node.y = s.height*sc + h;
    },

    initUI: function()
    {
        this.node_rank = this.node;

        this.node_paiming = this.node;
        this.node_paiming_content = cc.find("bg/scroll/view/content",this.node_paiming);
        this.node_paiming_title = cc.find("bg/title",this.node_paiming).getComponent("cc.Label");
        this.node_paiming_ranktype_txt = cc.find("bg/ranktype/txt",this.node_paiming).getComponent("cc.Label");
        this.node_paiming_item_me = cc.find("bg/item_me",this.node_paiming);
        this.node_paiming_item_me2 = cc.find("bg/item_me2",this.node_paiming);

        this.node_paiming_num = cc.find("bg/item_me/bg/rank",this.node_paiming);
        this.node_paiming_icon = cc.find("bg/item_me/bg/icon",this.node_paiming);
        this.node_paiming_nick = cc.find("bg/item_me/bg/nike",this.node_paiming);
        this.node_paiming_score = cc.find("bg/item_me/bg/score",this.node_paiming);
        this.node_paiming_role = cc.find("bg/item_me/bg/role",this.node_paiming);
        this.node_paiming_lv = cc.find("bg/item_me/bg/lv",this.node_paiming);

        this.node_paiming_num2 = cc.find("bg/item_me2/bg/rank",this.node_paiming);
        this.node_paiming_icon2 = cc.find("bg/item_me2/bg/icon",this.node_paiming);
        this.node_paiming_nick2 = cc.find("bg/item_me2/bg/nike",this.node_paiming);
        this.node_paiming_score2 = cc.find("bg/item_me2/bg/score",this.node_paiming);
        this.node_paiming_role2 = cc.find("bg/item_me2/bg/role",this.node_paiming);
        this.node_paiming_lv2 = cc.find("bg/item_me2/bg/lv",this.node_paiming);

        this.node_paiming_wujin = cc.find("bg/wujin",this.node_paiming);
        this.node_paiming_duizhan = cc.find("bg/duizhan",this.node_paiming);
        this.node_paiming_mask1 = cc.find("bg/mask1",this.node_paiming);
        this.node_paiming_mask2 = cc.find("bg/mask2",this.node_paiming);
        this.node_paiming_wujinbg = cc.find("bg/wujinbg",this.node_paiming);
        this.node_paiming_duizhanbg = cc.find("bg/duizhanbg",this.node_paiming);
        

        this.updateUI();
    },

    updateUI: function()
    {
        this.worldrank = this.main.worldrank;
        this.showPaiming();
    },

    show: function()
    {
        this.node.active = true;
        this.updateUI();
        this.main.wxBannerShow();
    },

    hide: function()
    {
        this.main.wxBannerHide();
        this.node.destroy();
    },

    click: function(event,data)
    {
        if(data == "close_rank")
        {
            this.main.wxCloseRank();
            this.hide();
            if(this.main.openover)
            {
                this.main.gameResult();
            }
            else
            {
                this.main.wxQuanState(true);
            }

        }
        else if(data == "wujin")
        {
            this.showPaiming();
        }
        else if(data == "duizhan")
        {
            this.showWinNumPaiming();
        }
        else if(data == "ranktype")
        {
            if(this.ranktype == 1)
                this.ranktype = 2;
            else
                this.ranktype = 1;

            this.showPaiming();
        }
        
        cc.log(data);
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

    showWinNumPaiming: function()
    {
        var self = this;
        this.node_paiming.active = true;
        self.node_paiming_wujin.active = true;
        self.node_paiming_duizhan.active = false;
        self.node_paiming_mask1.active = false;
        self.node_paiming_mask2.active = true;
        self.node_paiming_wujinbg.active = false;
        self.node_paiming_duizhanbg.active = true;

        self.node_paiming_item_me.active = false;
        self.node_paiming_item_me2.active = true;

        this.node_paiming_content.removeAllChildren();
        this.node_paiming_content.stopAllActions();
        this.node_paiming_lv2.active = false;
        if(this.ranktype == 1)
        {
            self.node_paiming_title.string = "World rank";
            self.node_paiming_ranktype_txt.string = "Friend";

            var selfrank = null;
            if(this.worldrank.pk && this.worldrank.pk.length>0)
            {
                selfrank = this.worldrank.pk[this.worldrank.pk.length-1];
                if(selfrank)
                {
                    this.node_paiming_lv2.active = true;
                    var rans = selfrank.id+"";
                    var srank = selfrank.id;
                    if(selfrank.id > 50 || selfrank.id == 0)
                    {
                        rans = "-";
                        srank = 100;
                    }

                    this.node_paiming_num2.getComponent("cc.Label").string = rans;
                    this.loadPic(self.node_paiming_icon2,selfrank.avatarUrl);
                    this.node_paiming_nick2.getComponent("cc.Label").string = selfrank.nick;
                    this.node_paiming_score2.getComponent("cc.Label").string = selfrank.jscore;
                    this.node_paiming_lv2.getComponent("cc.Sprite").spriteFrame = this.res.getPkLvSp(selfrank.jscore,srank);

                    this.node_paiming_role2.removeAllChildren();

                    var player = cc.instantiate(this.res.players[selfrank.playerId]);
                    this.node_paiming_role2.addChild(player);

                    var gunConf = this.res.gunsconfig[selfrank.gunId];
                    var gun = cc.instantiate(this.res.guns[selfrank.gunId]);
                    gun.y = player.height*0.3 + gunConf.y;
                    player.addChild(gun);
                }
                this.addworldrankpk(this.worldrank.pk);
            }
        }
        else
        {
            self.node_paiming_title.string = "Friend rank";
            self.node_paiming_ranktype_txt.string = "World";

            FBInstant.getLeaderboardAsync('wjscore')
                .then(function(leaderboard) {
                    return leaderboard.getConnectedPlayerEntriesAsync();
                })
                .then(function(entries) {
                    var selfrank = null;

                    if(entries && entries.length>0)
                    {
                        entries.sort(function(a,b){
                            var a_rank =JSON.parse(a.getExtraData());
                            var AMaxScore=a_rank.jscore;

                            var b_rank =JSON.parse(b.getExtraData());
                            var BMaxScore = b_rank.jscore;

                            return parseInt(BMaxScore) - parseInt(AMaxScore);
                        });
                    }

                    for(var i=0; i < entries.length; ++i) {
                        var rd = entries[i];
                        var edata = rd.getExtraData();
                        var jscore = JSON.parse(edata).jscore;
                        var item = cc.instantiate(self.paimingItem2);
                        var bg = cc.find("bg",item);
                        var num = cc.find("rank",bg);
                        var icon = cc.find("icon",bg);
                        var nick = cc.find("nike",bg);
                        var score = cc.find("score",bg);
                        var role = cc.find("role",bg);

                        num.getComponent("cc.Label").string = (i+1)+"";
                        self.loadPic(icon,rd.getPlayer().getPhoto());
                        nick.getComponent("cc.Label").string = rd.getPlayer().getName();
                        score.getComponent("cc.Label").string = jscore+"";

                        if(rd.getPlayer().getID() == FBInstant.player.getID())
                        {
                            selfrank = rd;
                            selfrank.num = i+1;
                            selfrank.jscore = jscore;
                        }

                        // role.destroyAllChildren();

                        // var player = cc.instantiate(self.GAME.players[rank.playerId]);
                        // role.addChild(player);

                        // var gunConf = self.GAME.gunsconfig[rank.gunId];
                        // var gun = cc.instantiate(self.GAME.guns[rank.gunId]);
                        // gun.y = player.height*0.3 + gunConf.y;
                        // player.addChild(gun);

                        self.node_paiming_content.addChild(item);

                    }

                    if(selfrank)
                    {
                        self.node_paiming_num2.getComponent("cc.Label").string = selfrank.num+"";
                        self.loadPic(self.node_paiming_icon2,selfrank.getPlayer().getPhoto());
                        self.node_paiming_nick2.getComponent("cc.Label").string = selfrank.getPlayer().getName();
                        self.node_paiming_score2.getComponent("cc.Label").string =  selfrank.jscore+"";

                    }
                });

        }

    },

    addworldrankpk: function(datas)
    {
        var self = this;
        var rnum = this.node_paiming_content.childrenCount;
        if(rnum < datas.length-1)
        {
            var data = datas[rnum];

            var item = cc.instantiate(this.paimingItem2);
            var bg = cc.find("bg",item);
            var num = cc.find("rank",bg);
            var icon = cc.find("icon",bg);
            var nick = cc.find("nike",bg);
            var score = cc.find("score",bg);
            var role = cc.find("role",bg);
            var lv = cc.find("lv",bg);
            lv.active = true;


            num.getComponent("cc.Label").string = (rnum+1)+"";
            if(data.avatarUrl && data.avatarUrl.length>10)
                this.loadPic(icon,data.avatarUrl);
            nick.getComponent("cc.Label").string = data.nick;
            score.getComponent("cc.Label").string = data.jscore;
            lv.getComponent("cc.Sprite").spriteFrame = this.res.getPkLvSp(data.jscore,rnum+1);

            role.removeAllChildren();

            var player = cc.instantiate(this.res.players[data.playerId]);
            role.addChild(player);

            var gunConf = this.res.gunsconfig[data.gunId];
            var gun = cc.instantiate(this.res.guns[data.gunId]);
            gun.y = player.height*0.3 + gunConf.y;
            player.addChild(gun);

            this.node_paiming_content.addChild(item);

            this.node_paiming_content.runAction(cc.sequence(
                cc.delayTime(0.06),
                cc.callFunc(function(){
                    self.addworldrankpk(datas);
                })
            ));
        }

    },


    showPaiming: function()
    {
        var self = this;

        this.node_paiming.active = true;
        self.node_paiming_wujin.active = false;
        self.node_paiming_duizhan.active = true;
        self.node_paiming_mask1.active = true;
        self.node_paiming_mask2.active = false;
        self.node_paiming_wujinbg.active = true;
        self.node_paiming_duizhanbg.active = false;

        self.node_paiming_item_me.active = true;
        self.node_paiming_item_me2.active = false;
        this.node_paiming_lv.active = false;
        this.node_paiming_content.removeAllChildren();
        this.node_paiming_content.stopAllActions();

        if(this.ranktype == 1)
        {
            self.node_paiming_title.string = "World rank";
            self.node_paiming_ranktype_txt.string = "Friend";

            var selfrank = null;
            if(this.worldrank.wujin && this.worldrank.wujin.length>0)
            {

                selfrank = this.worldrank.wujin[this.worldrank.wujin.length-1];

                if(selfrank)
                {
                    this.node_paiming_lv.active = true;
                    var rans = selfrank.id+"";
                    var srank = selfrank.id;
                    if(selfrank.id > 50 || selfrank.id == 0)
                    {
                        rans = "-";
                        srank = 100;
                    }
                    this.node_paiming_num.getComponent("cc.Label").string = rans;
                    this.loadPic(self.node_paiming_icon,selfrank.avatarUrl);
                    this.node_paiming_nick.getComponent("cc.Label").string = selfrank.nick;
                    this.node_paiming_score.getComponent("cc.Label").string = selfrank.score+"";
                    this.node_paiming_lv.getComponent("cc.Sprite").spriteFrame = this.res.getPkLvSp(selfrank.score,srank);

                    this.node_paiming_role.removeAllChildren();

                    var player = cc.instantiate(this.res.players[selfrank.playerId]);
                    this.node_paiming_role.addChild(player);

                    var gunConf = this.res.gunsconfig[selfrank.gunId];
                    var gun = cc.instantiate(this.res.guns[selfrank.gunId]);
                    gun.y = player.height*0.3 + gunConf.y;
                    player.addChild(gun);
                }

                this.addworldrankwujin(this.worldrank.wujin);

            }

        }
        else
        {
            self.node_paiming_title.string = "Friend rank";
            self.node_paiming_ranktype_txt.string = "World";

            FBInstant.getLeaderboardAsync('wscore')
                .then(function(leaderboard) {
                    return leaderboard.getConnectedPlayerEntriesAsync();
                })
                .then(function(entries) {
                    var selfrank = null;
                    for(var i=0; i < entries.length; ++i) {
                        var rd = entries[i];

                        var item = cc.instantiate(self.paimingItem);
                        var bg = cc.find("bg",item);
                        var num = cc.find("rank",bg);
                        var icon = cc.find("icon",bg);
                        var nick = cc.find("nike",bg);
                        var score = cc.find("score",bg);
                        var role = cc.find("role",bg);

                        num.getComponent("cc.Label").string = rd.getRank()+"";
                        self.loadPic(icon,rd.getPlayer().getPhoto());
                        nick.getComponent("cc.Label").string = rd.getPlayer().getName();
                        score.getComponent("cc.Label").string = rd.getScore()+"";

                        if(rd.getPlayer().getID() == FBInstant.player.getID())
                        {
                            selfrank = rd;
                        }

                        // role.destroyAllChildren();

                        // var player = cc.instantiate(self.GAME.players[rank.playerId]);
                        // role.addChild(player);

                        // var gunConf = self.GAME.gunsconfig[rank.gunId];
                        // var gun = cc.instantiate(self.GAME.guns[rank.gunId]);
                        // gun.y = player.height*0.3 + gunConf.y;
                        // player.addChild(gun);

                        self.node_paiming_content.addChild(item);

                    }

                    if(selfrank)
                    {
                        self.node_paiming_num.getComponent("cc.Label").string = selfrank.getRank()+"";
                        self.loadPic(self.node_paiming_icon,selfrank.getPlayer().getPhoto());
                        self.node_paiming_nick.getComponent("cc.Label").string = selfrank.getPlayer().getName();
                        self.node_paiming_score.getComponent("cc.Label").string = selfrank.getScore()+"";

                        // self.node_paiming_role.destroyAllChildren();

                        // var player = cc.instantiate(self.GAME.players[selfrank.playerId]);
                        // self.node_paiming_role.addChild(player);

                        // var gunConf = self.GAME.gunsconfig[selfrank.gunId];
                        // var gun = cc.instantiate(self.GAME.guns[selfrank.gunId]);
                        // gun.y = player.height*0.3 + gunConf.y;
                        // player.addChild(gun);
                    }
                });
        }
    },


    addworldrankwujin: function(datas)
    {
        var self = this;
        var rnum = this.node_paiming_content.childrenCount;
        if(rnum < datas.length-1)
        {
            var data = datas[rnum];

            var item = cc.instantiate(this.paimingItem);
            var bg = cc.find("bg",item);
            var num = cc.find("rank",bg);
            var icon = cc.find("icon",bg);
            var nick = cc.find("nike",bg);
            var score = cc.find("score",bg);
            var role = cc.find("role",bg);
            var lv = cc.find("lv",bg);
            lv.active = true;

            num.getComponent("cc.Label").string = (rnum+1)+"";
            if(data.avatarUrl && data.avatarUrl.length>10)
                this.loadPic(icon,data.avatarUrl);
            nick.getComponent("cc.Label").string = data.nick;
            score.getComponent("cc.Label").string = data.score+"";
            lv.getComponent("cc.Sprite").spriteFrame = this.res.getPkLvSp(data.score,rnum+1);


            role.removeAllChildren();

            var player = cc.instantiate(this.res.players[data.playerId]);
            role.addChild(player);

            var gunConf = this.res.gunsconfig[data.gunId];
            var gun = cc.instantiate(this.res.guns[data.gunId]);
            gun.y = player.height*0.3 + gunConf.y;
            player.addChild(gun);

            this.node_paiming_content.addChild(item);

            this.node_paiming_content.runAction(cc.sequence(
                cc.delayTime(0.06),
                cc.callFunc(function(){
                    self.addworldrankwujin(datas);
                })
            ));
        }

    }
    
});
