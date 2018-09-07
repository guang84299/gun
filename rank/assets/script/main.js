
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
        },
        players: {
            default: [],
            type: cc.Prefab
        },
        guns: {
            default: [],
            type: cc.Prefab
        },
        box_1: {
            default: null,
            type: cc.SpriteFrame
        },
        box_2: {
            default: null,
            type: cc.SpriteFrame
        },
        box_3: {
            default: null,
            type: cc.SpriteFrame
        },
        box_4: {
            default: null,
            type: cc.SpriteFrame
        }

    },


    onLoad: function()
    {
        this.dsize = cc.view.getDesignResolutionSize();
        this.GAME = {};
        this.GAME.players = this.players;
        this.GAME.guns = this.guns;
        this.GAME.gunsconfig = [
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

        this.initUI();
        this.adapt();

        this.kvdata = {
            wxgame:
            {
                score: 0,
                update_time: 0
            },
            card: 0,
            playerId:0,
            gunId:0
        };
        this.winnumdata = {
            wxgame:
            {
                winNum: 0,
                update_time: 0
            },
            playerId:0,
            gunId:0
        };
        this.userInfo = null;
        this.friendRank = null;
        this.friendWinNumRank = null;
        this.chaoyueData = [];
        this.worldrank = {};
        this.ranktype = 1;
        var self = this;


        wx.onMessage(function(data){
            if(data.message == "closeOver")
            {
                self.node_over.active = false;
            }
            else if(data.message == "closeRank")
            {
                self.node_paiming.active = false;
            }
            else if(data.message == "closeFuhuo")
            {
                self.node_fuhuo.active = false;
            }
            else if(data.message == "friendRank"){ //好友排行榜
                self.worldrank = data.worldrank;
                self.showPaiming();
            }
            else if(data.message == "overRank"){ //3人排行榜
                self.uploadScore(data.score,data.playerId,data.gunId);
                self.showOverRank(data.score);
                self.chaoyueData = [];
            }
            else if(data.message == "fuhuoRank"){ //下个超越排行榜
                self.uploadScore(data.score,data.playerId,data.gunId);
                self.showFuhuoRank(data.score);
            }
            else if(data.message == "loginSuccess")
            {
                self.userInfo = data.userInfo;
                self.getUserRank();
                self.getFriendRank();
            }
            else if(data.message == "updateScore")
            {
                self.updateScore(data.score,data.playerId,data.gunId);
            }
            else if(data.message == "updateWinNum")
            {
                self.updateWinNum(data.winNum,data.playerId,data.gunId);
            }
            cc.log(data.message);
        });

    },



    adapt: function()
    {

        var nodes = [this.node_over,this.node_paiming];
        for(var i=0;i<nodes.length;i++)
        {
            cc.log(nodes[i]);
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

    initUI: function()
    {
        var self = this;
        self.node_over = cc.find("Canvas/node_over");
        self.node_over_icon = cc.find("icon",self.node_over);
        self.node_over_nick = cc.find("nick",self.node_over);
        self.node_over_no = cc.find("no",self.node_over);

        self.node_paiming = cc.find("Canvas/node_rank");
        self.node_paiming_content = cc.find("bg/scroll/view/content",self.node_paiming);
        self.node_paiming_title = cc.find("bg/title",self.node_paiming).getComponent("cc.Label");
        self.node_paiming_ranktype_txt = cc.find("bg/ranktype/txt",self.node_paiming).getComponent("cc.Label");
        self.node_paiming_item_me = cc.find("bg/item_me",self.node_paiming);
        self.node_paiming_item_me2 = cc.find("bg/item_me2",self.node_paiming);

        self.node_paiming_num = cc.find("bg/item_me/bg/rank",self.node_paiming);
        self.node_paiming_icon = cc.find("bg/item_me/bg/icon",self.node_paiming);
        self.node_paiming_nick = cc.find("bg/item_me/bg/nike",self.node_paiming);
        self.node_paiming_score = cc.find("bg/item_me/bg/score",self.node_paiming);
        self.node_paiming_role = cc.find("bg/item_me/bg/role",self.node_paiming);

        self.node_paiming_num2 = cc.find("bg/item_me2/bg/rank",self.node_paiming);
        self.node_paiming_icon2 = cc.find("bg/item_me2/bg/icon",self.node_paiming);
        self.node_paiming_nick2 = cc.find("bg/item_me2/bg/nike",self.node_paiming);
        self.node_paiming_score2 = cc.find("bg/item_me2/bg/score",self.node_paiming);
        self.node_paiming_role2 = cc.find("bg/item_me2/bg/role",self.node_paiming);

        self.node_paiming_wujin = cc.find("bg/wujin",self.node_paiming);
        self.node_paiming_duizhan = cc.find("bg/duizhan",self.node_paiming);
        self.node_paiming_mask1 = cc.find("bg/mask1",self.node_paiming);
        self.node_paiming_mask2 = cc.find("bg/mask2",self.node_paiming);
        self.node_paiming_wujinbg = cc.find("bg/wujinbg",self.node_paiming);
        self.node_paiming_duizhanbg = cc.find("bg/duizhanbg",self.node_paiming);

        self.node_fuhuo = cc.find("Canvas/node_fuhuo");
        self.node_fuhuo_icon = cc.find("fuhuo_share/icon",self.node_fuhuo);
        self.node_fuhuo_nick = cc.find("fuhuo_share/nick",self.node_fuhuo);
        self.node_fuhuo_score = cc.find("fuhuo_share/score",self.node_fuhuo);
        self.node_fuhuo_no = cc.find("fuhuo_share/no",self.node_fuhuo);

        self.node_chaoyue = cc.find("Canvas/node_chaoyue");
    },


    click: function(event,data)
    {
        if(data == "wujin")
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
    },

    showFuhuoRank: function(score)
    {
        this.node_fuhuo.active = true;

        var self = this;
        if(this.friendRank && this.userInfo)
        {
            self.showFuhuoRank2(score);
        }
        else
        {
            this.getFriendRank(function(){
                self.showFuhuoRank2(score);
            });
        }

    },

    showFuhuoRank2: function(score)
    {
        if(this.friendRank && this.userInfo)
        {
            var chaoyue = null;
            for(var i=this.friendRank.length-1;i>=0;i--)
            {
                var data = this.friendRank[i];
                if(data.nickname != this.userInfo.nickName &&
                    data.avatarUrl != this.userInfo.avatarUrl)
                {
                    var feiji_rank = data.KVDataList[0].value;
                    var rank  = JSON.parse(feiji_rank);
                    if(score < rank.wxgame.score)
                    {
                        chaoyue = data;
                        break;
                    }
                }
            }
            //if(chaoyue == null && this.friendRank.length>0)
            //    chaoyue = this.friendRank[0];
            if(chaoyue)
            {
                this.node_fuhuo_no.active = false;
                this.node_fuhuo_nick.active = true;
                this.node_fuhuo_score.active = true;
                this.node_fuhuo_icon.active = true;
                var feiji_rank = chaoyue.KVDataList[0].value;
                var rank  = JSON.parse(feiji_rank);

                this.loadPic(this.node_fuhuo_icon,chaoyue.avatarUrl);
                this.node_fuhuo_nick.getComponent("cc.Label").string = chaoyue.nickname;
                this.node_fuhuo_score.getComponent("cc.Label").string = "得分:"+rank.wxgame.score;
            }
            else
            {
                this.node_fuhuo_no.active = true;
                this.node_fuhuo_nick.active = false;
                this.node_fuhuo_score.active = false;
                this.node_fuhuo_icon.active = false;
            }
        }
    },

    existChaoYue: function(data)
    {
        for(var i=0;i<this.chaoyueData.length;i++)
        {
            var data2 = this.chaoyueData[i];
            if(data.nickname == data2.nickname &&
                data.avatarUrl == data2.avatarUrl)
            {
                return true;
            }
        }
        return false;
    },

    updateScore: function(score,playerId,gunId)
    {
        if(this.friendRank && this.userInfo)
        {
            var chaoyue = null;
            for(var i=this.friendRank.length-1;i>=0;i--)
            {
                var data = this.friendRank[i];
                if(data.nickname != this.userInfo.nickName &&
                    data.avatarUrl != this.userInfo.avatarUrl && !this.existChaoYue(data))
                {
                    var feiji_rank = data.KVDataList[0].value;
                    var rank  = JSON.parse(feiji_rank);
                    if(score > rank.wxgame.score)
                    {
                        chaoyue = data;
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

                this.loadPic(icon,chaoyue.avatarUrl);
                nick.getComponent("cc.Label").string = "超越"+chaoyue.nickname;

                this.node_chaoyue.addChild(item);

                var seq = cc.sequence(
                    cc.moveTo(0,cc.v2(20,this.dsize.height*0.7)),
                    cc.delayTime(3),
                    cc.removeSelf()
                );

                item.runAction(seq);

                this.uploadScore(score,playerId,gunId);
            }
        }
    },

    showOverRank: function(score)
    {
        this.node_over.active = true;
        this.node_over_icon.active = true;
        this.node_over_nick.active = true;

        var self = this;
        this.getFriendRank(function(){
            self.showOverRank2(score);
        });
    },

    showOverRank2: function(score)
    {
        if(this.friendRank && this.userInfo)
        {
            var chaoyue = null;
            for(var i=this.friendRank.length-1;i>=0;i--)
            {
                var data = this.friendRank[i];
                if(data.nickname != this.userInfo.nickName &&
                    data.avatarUrl != this.userInfo.avatarUrl)
                {
                    var feiji_rank = data.KVDataList[0].value;
                    var rank  = JSON.parse(feiji_rank);
                    if(score < rank.wxgame.score)
                    {
                        chaoyue = data;
                        break;
                    }
                }
            }
            //if(chaoyue == null && this.friendRank.length>0)
            //    chaoyue = this.friendRank[0];
            if(chaoyue)
            {
                this.node_over_icon.active = true;
                this.node_over_nick.active = true;
                this.node_over_no.active = false;

                //var feiji_rank = chaoyue.KVDataList[0].value;
                //var rank  = JSON.parse(feiji_rank);

                this.loadPic(this.node_over_icon,chaoyue.avatarUrl);
                this.node_over_nick.getComponent("cc.Label").string = chaoyue.nickname;
                //this.node_fuhuo_score.getComponent("cc.Label").string = "得分:"+rank.wxgame.score;
            }
            else
            {
                this.node_over_icon.active = false;
                this.node_over_nick.active = false;
                this.node_over_no.active = true;
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
        if(this.ranktype == 1)
        {
            self.node_paiming_title.string = "世界排行榜";
            self.node_paiming_ranktype_txt.string = "好友";

            var selfrank = null;
            if(this.worldrank.pk && this.worldrank.pk.length>0)
            {
                selfrank = this.worldrank.pk[this.worldrank.pk.length-1];
                for(var i=0;i<this.worldrank.pk.length-1;i++)
                {
                    var data = this.worldrank.pk[i];

                    var item = cc.instantiate(this.paimingItem2);
                    var bg = cc.find("bg",item);
                    var num = cc.find("rank",bg);
                    var icon = cc.find("icon",bg);
                    var nick = cc.find("nike",bg);
                    var score = cc.find("score",bg);
                    var role = cc.find("role",bg);


                    num.getComponent("cc.Label").string = (i+1)+"";
                    if(data.avatarUrl && data.avatarUrl.length>10)
                        this.loadPic(icon,data.avatarUrl);
                    nick.getComponent("cc.Label").string = data.nick;
                    score.getComponent("cc.Label").string = data.jscore;

                    role.removeAllChildren();

                    var player = cc.instantiate(this.GAME.players[data.playerId]);
                    role.addChild(player);

                    var gunConf = this.GAME.gunsconfig[data.gunId];
                    var gun = cc.instantiate(this.GAME.guns[data.gunId]);
                    gun.y = player.height*0.3 + gunConf.y;
                    player.addChild(gun);

                    this.node_paiming_content.addChild(item);
                }
                if(selfrank)
                {
                    this.node_paiming_num2.getComponent("cc.Label").string = selfrank.id+"";
                    this.loadPic(self.node_paiming_icon2,selfrank.avatarUrl);
                    this.node_paiming_nick2.getComponent("cc.Label").string = selfrank.nick;
                    this.node_paiming_score2.getComponent("cc.Label").string = selfrank.jscore;

                    this.node_paiming_role2.removeAllChildren();

                    var player = cc.instantiate(this.GAME.players[selfrank.playerId]);
                    this.node_paiming_role2.addChild(player);

                    var gunConf = this.GAME.gunsconfig[selfrank.gunId];
                    var gun = cc.instantiate(this.GAME.guns[selfrank.gunId]);
                    gun.y = player.height*0.3 + gunConf.y;
                    player.addChild(gun);
                }

            }
        }
        else
        {
            self.node_paiming_title.string = "好友排行榜";
            self.node_paiming_ranktype_txt.string = "世界";

            var selfrank = null;
            if(this.friendWinNumRank && this.userInfo)
            {

                for(var i=0;i<this.friendWinNumRank.length;i++)
                {
                    var data = this.friendWinNumRank[i];
                    var feiji_rank = data.KVDataList[1].value;
                    var rank  = JSON.parse(feiji_rank);

                    var item = cc.instantiate(this.paimingItem2);
                    var bg = cc.find("bg",item);
                    var num = cc.find("rank",bg);
                    var icon = cc.find("icon",bg);
                    var nick = cc.find("nike",bg);
                    var score = cc.find("score",bg);
                    var role = cc.find("role",bg);


                    num.getComponent("cc.Label").string = (i+1)+"";
                    if(data.avatarUrl && data.avatarUrl.length>10)
                        this.loadPic(icon,data.avatarUrl);
                    nick.getComponent("cc.Label").string = data.nickname;
                    score.getComponent("cc.Label").string = rank.wxgame.winNum;

                    if(data.nickname == this.userInfo.nickName &&
                        data.avatarUrl == this.userInfo.avatarUrl)
                    {
                        selfrank = data;
                        selfrank.num = (i+1);
                    }

                    role.removeAllChildren();

                    var player = cc.instantiate(this.GAME.players[rank.playerId]);
                    role.addChild(player);

                    var gunConf = this.GAME.gunsconfig[rank.gunId];
                    var gun = cc.instantiate(this.GAME.guns[rank.gunId]);
                    gun.y = player.height*0.3 + gunConf.y;
                    player.addChild(gun);

                    this.node_paiming_content.addChild(item);
                }
                if(selfrank)
                {
                    var feiji_rank = selfrank.KVDataList[1].value;
                    var rank  = JSON.parse(feiji_rank);

                    this.node_paiming_num2.getComponent("cc.Label").string = selfrank.num+"";
                    this.loadPic(self.node_paiming_icon2,selfrank.avatarUrl);
                    this.node_paiming_nick2.getComponent("cc.Label").string = selfrank.nickname;
                    this.node_paiming_score2.getComponent("cc.Label").string = rank.wxgame.winNum;

                    this.node_paiming_role2.removeAllChildren();

                    var player = cc.instantiate(this.GAME.players[rank.playerId]);
                    this.node_paiming_role2.addChild(player);

                    var gunConf = this.GAME.gunsconfig[rank.gunId];
                    var gun = cc.instantiate(this.GAME.guns[rank.gunId]);
                    gun.y = player.height*0.3 + gunConf.y;
                    player.addChild(gun);
                }

            }
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

        this.node_paiming_content.removeAllChildren();

        if(this.ranktype == 1)
        {
            self.node_paiming_title.string = "世界排行榜";
            self.node_paiming_ranktype_txt.string = "好友";

            var selfrank = null;
            if(this.worldrank.wujin && this.worldrank.wujin.length>0)
            {

                selfrank = this.worldrank.wujin[this.worldrank.wujin.length-1];
                for(var i=0;i<this.worldrank.wujin.length-1;i++)
                {
                    var data = this.worldrank.wujin[i];

                    var item = cc.instantiate(this.paimingItem);
                    var bg = cc.find("bg",item);
                    var num = cc.find("rank",bg);
                    var icon = cc.find("icon",bg);
                    var nick = cc.find("nike",bg);
                    var score = cc.find("score",bg);
                    var role = cc.find("role",bg);

                    num.getComponent("cc.Label").string = (i+1)+"";
                    if(data.avatarUrl && data.avatarUrl.length>10)
                        this.loadPic(icon,data.avatarUrl);
                    nick.getComponent("cc.Label").string = data.nick;
                    score.getComponent("cc.Label").string = data.score+"";


                    role.removeAllChildren();

                    var player = cc.instantiate(this.GAME.players[data.playerId]);
                    role.addChild(player);

                    var gunConf = this.GAME.gunsconfig[data.gunId];
                    var gun = cc.instantiate(this.GAME.guns[data.gunId]);
                    gun.y = player.height*0.3 + gunConf.y;
                    player.addChild(gun);

                    this.node_paiming_content.addChild(item);
                }
                if(selfrank)
                {
                    this.node_paiming_num.getComponent("cc.Label").string = selfrank.id+"";
                    this.loadPic(self.node_paiming_icon,selfrank.avatarUrl);
                    this.node_paiming_nick.getComponent("cc.Label").string = selfrank.nick;
                    this.node_paiming_score.getComponent("cc.Label").string = selfrank.score+"";

                    this.node_paiming_role.removeAllChildren();

                    var player = cc.instantiate(this.GAME.players[selfrank.playerId]);
                    this.node_paiming_role.addChild(player);

                    var gunConf = this.GAME.gunsconfig[selfrank.gunId];
                    var gun = cc.instantiate(this.GAME.guns[selfrank.gunId]);
                    gun.y = player.height*0.3 + gunConf.y;
                    player.addChild(gun);
                }

            }

        }
        else
        {
            self.node_paiming_title.string = "好友排行榜";
            self.node_paiming_ranktype_txt.string = "世界";

            var selfrank = null;
            if(this.friendRank && this.userInfo)
            {

                for(var i=0;i<this.friendRank.length;i++)
                {
                    var data = this.friendRank[i];
                    var feiji_rank = data.KVDataList[0].value;
                    var rank  = JSON.parse(feiji_rank);

                    var item = cc.instantiate(this.paimingItem);
                    var bg = cc.find("bg",item);
                    var num = cc.find("rank",bg);
                    var icon = cc.find("icon",bg);
                    var nick = cc.find("nike",bg);
                    var score = cc.find("score",bg);
                    var role = cc.find("role",bg);

                    //var j1 = cc.find("j1",icon);
                    //var j2 = cc.find("j2",icon);
                    //var j3 = cc.find("j3",icon);
                    //
                    //if(i+1 == 1)
                    //    j1.active = true;
                    //else if(i+1 == 2)
                    //    j2.active = true;
                    //else if(i+1 == 3)
                    //    j3.active = true;

                    num.getComponent("cc.Label").string = (i+1)+"";
                    if(data.avatarUrl && data.avatarUrl.length>10)
                        this.loadPic(icon,data.avatarUrl);
                    nick.getComponent("cc.Label").string = data.nickname;
                    score.getComponent("cc.Label").string = rank.wxgame.score+"";

                    if(data.nickname == this.userInfo.nickName &&
                        data.avatarUrl == this.userInfo.avatarUrl)
                    {
                        //bg.active = true;
                        //num.color = cc.color(200,176,165,255);
                        //nick.color = cc.color(200,176,165,255);
                        //score.color = cc.color(200,176,165,255);
                        selfrank = data;
                        selfrank.num = (i+1);
                    }

                    role.removeAllChildren();

                    var player = cc.instantiate(this.GAME.players[rank.playerId]);
                    role.addChild(player);

                    var gunConf = this.GAME.gunsconfig[rank.gunId];
                    var gun = cc.instantiate(this.GAME.guns[rank.gunId]);
                    gun.y = player.height*0.3 + gunConf.y;
                    player.addChild(gun);

                    this.node_paiming_content.addChild(item);
                }
                if(selfrank)
                {
                    var feiji_rank = selfrank.KVDataList[0].value;
                    var rank  = JSON.parse(feiji_rank);

                    //var j1 = cc.find("j1",self.node_paiming_icon);
                    //var j2 = cc.find("j2",self.node_paiming_icon);
                    //var j3 = cc.find("j3",self.node_paiming_icon);
                    //j1.active = false;
                    //j2.active = false;
                    //j3.active = false;
                    //
                    //if(selfrank.num == 1)
                    //    j1.active = true;
                    //else if(selfrank.num == 2)
                    //    j2.active = true;
                    //else if(selfrank.num == 3)
                    //    j3.active = true;

                    this.node_paiming_num.getComponent("cc.Label").string = selfrank.num+"";
                    this.loadPic(self.node_paiming_icon,selfrank.avatarUrl);
                    this.node_paiming_nick.getComponent("cc.Label").string = selfrank.nickname;
                    this.node_paiming_score.getComponent("cc.Label").string = rank.wxgame.score+"";

                    this.node_paiming_role.removeAllChildren();

                    var player = cc.instantiate(this.GAME.players[rank.playerId]);
                    this.node_paiming_role.addChild(player);

                    var gunConf = this.GAME.gunsconfig[rank.gunId];
                    var gun = cc.instantiate(this.GAME.guns[rank.gunId]);
                    gun.y = player.height*0.3 + gunConf.y;
                    player.addChild(gun);
                }

            }
        }
    },

    getUserRank: function()
    {
        var self = this;
        wx.getUserCloudStorage({
            keyList:["gun_rank","gun_winnum_rank"],
            success: function(res)
            {
                cc.log(res);
                if(res.KVDataList.length == 0)
                {
                    self.setUserRank(0,new Date().getTime(),0,0,0);
                    self.setUserWinNumRank(0,new Date().getTime(),0,0);
                }
                else
                {
                    var feiji_rank = res.KVDataList[0].value;
                    self.kvdata = JSON.parse(feiji_rank);
                    cc.log(self.kvdata);

                    if(res.KVDataList.length > 1)
                    {
                        var winnum_rank = res.KVDataList[1].value;
                        self.winnumdata = JSON.parse(winnum_rank);
                    }
                    else
                    {
                        self.setUserWinNumRank(0,new Date().getTime(),0,0);
                    }
                }
            }
        });
    },

    uploadScore: function(score,playerId,gunId)
    {
        if(this.kvdata)
        {
            if(score > this.kvdata.wxgame.score)
            {
                this.kvdata.wxgame.score = score;
                this.setUserRank(score,new Date().getTime(),this.kvdata.card,playerId,gunId);
            }
        }
        else
        {
            this.getUserRank();
        }
    },

    updateWinNum: function(winNum,playerId,gunId)
    {
        if(this.winnumdata)
        {
            winNum = this.winnumdata.wxgame.winNum + 1;
            if(winNum > this.winnumdata.wxgame.winNum)
            {
                this.winnumdata.wxgame.winNum = winNum;
                this.setUserWinNumRank(winNum,new Date().getTime(),playerId,gunId);
            }
        }
        else
        {
            this.getUserRank();
        }
    },

    setUserRank: function(score,update_time,card,playerId,gunId)
    {
        var self = this;
        var data = {
            key: "gun_rank",
            value: "{\"wxgame\":{\"score\":"+score+",\"update_time\": "+update_time+"},\"card\":"+card+",\"playerId\":"+playerId+",\"gunId\":"+gunId+"}"
        };

        var kvDataList = [data];
        wx.setUserCloudStorage({
            KVDataList: kvDataList,
            success: function(res)
            {
                self.kvdata.wxgame.score = score;
                self.getFriendRank();
                cc.log(res);
            },
            fail: function(res)
            {
                cc.log(res);
            }
        });
    },

    setUserWinNumRank: function(winNum,update_time,playerId,gunId)
    {
        var self = this;
        var data = {
            key: "gun_winnum_rank",
            value: "{\"wxgame\":{\"winNum\":"+winNum+",\"update_time\": "+update_time+"},\"playerId\":"+playerId+",\"gunId\":"+gunId+"}"
        };

        var kvDataList = [data];
        wx.setUserCloudStorage({
            KVDataList: kvDataList,
            success: function(res)
            {
                self.winnumdata.wxgame.winNum = winNum;
                self.getFriendRank();
                cc.log(res);
            },
            fail: function(res)
            {
                cc.log(res);
            }
        });
    },

    getFriendRank: function(callback)
    {
        var self = this;
        wx.getFriendCloudStorage({
            keyList:["gun_rank","gun_winnum_rank"],
            success: function(res)
            {
                console.log(res);
                self.friendRank = res.data;
                self.friendWinNumRank = res.data;
                self.sortFriendRank();

                if(callback)
                    callback();
            }
        });
    },

    sortFriendRank: function()
    {
        if(this.friendRank)
        {
            this.friendRank.sort(function(a,b){
                var a_rank =JSON.parse(a.KVDataList[0].value);
                var AMaxScore=a_rank.wxgame.score;

                var b_rank =JSON.parse(b.KVDataList[0].value);
                var BMaxScore = b_rank.wxgame.score;

                return parseInt(BMaxScore) - parseInt(AMaxScore);
            });
        }

        if(this.friendWinNumRank)
        {
            var data = [];
            for(var i=0;i<this.friendWinNumRank.length;i++)
            {
                var item = this.friendWinNumRank[i];
                if(item.KVDataList.length > 1)
                {
                    data.push(item);
                }
            }
            this.friendWinNumRank = data;
            this.friendWinNumRank.sort(function(a,b){
                var a_rank =JSON.parse(a.KVDataList[1].value);
                var AMaxScore=a_rank.wxgame.winNum;

                var b_rank =JSON.parse(b.KVDataList[1].value);
                var BMaxScore = b_rank.wxgame.winNum;

                return parseInt(BMaxScore) - parseInt(AMaxScore);
            });
        }
    }


});
