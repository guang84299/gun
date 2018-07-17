
cc.Class({
    extends: cc.Component,

    properties: {
        paimingItem: {
            default: null,
            type: cc.Prefab
        },
        chaoyueItem: {
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
        gun_11: {
            default: null,
            type: cc.Prefab
        },
        gun_12: {
            default: null,
            type: cc.Prefab
        },
        gun_13: {
            default: null,
            type: cc.Prefab
        },
        gun_14: {
            default: null,
            type: cc.Prefab
        },
        gun_15: {
            default: null,
            type: cc.Prefab
        },
        gun_16: {
            default: null,
            type: cc.Prefab
        },
        gun_17: {
            default: null,
            type: cc.Prefab
        },
        gun_18: {
            default: null,
            type: cc.Prefab
        },
        gun_19: {
            default: null,
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
        this.GAME.players = [this.player_1,this.player_2,this.player_3,this.player_4,this.player_5,
            this.player_6,this.player_7,this.player_8,this.player_9];
        this.GAME.guns = [this.gun_1,this.gun_2,this.gun_3,this.gun_4,this.gun_5,this.gun_6,this.gun_7,this.gun_8,
            this.gun_9,this.gun_10,this.gun_11,this.gun_12,this.gun_13,this.gun_14,this.gun_15,this.gun_16,
            this.gun_17,this.gun_18,this.gun_19];
        this.GAME.gunsconfig = [
            {aimLen:1.5,type:1,fire:2,num:1,angle:0,y:15,speed:0,score:1.5,coin:1.5},
            {aimLen:1.2,type:1,fire:3,num:1,angle:0,y:15,speed:0,score:1.5,coin:1.5},
            {aimLen:0.6,type:2,fire:1,num:3,angle:8,y:15,speed:0.08,score:1,coin:1},
            {aimLen:0.8,type:2,fire:2,num:3,angle:6,y:15,speed:0.12,score:1,coin:1},
            {aimLen:0.8,type:2,fire:2,num:3,angle:6,y:15,speed:0.12,score:1,coin:1},
            {aimLen:1.6,type:1,fire:3,num:1,angle:0,y:15,speed:0.2,score:1.5,coin:1.5},
            {aimLen:0.5,type:3,fire:2,num:3,angle:8,y:15,speed:0.2,score:1,coin:1},
            {aimLen:0.9,type:2,fire:3,num:3,angle:7,y:15,speed:0.18,score:1,coin:1},
            {aimLen:2,type:1,fire:4,num:1,angle:0,y:15,speed:0.2,score:1.5,coin:1.5},
            {aimLen:3,type:1,fire:5,num:1,angle:0,y:2,speed:0.2,score:1.8,coin:1.8},

            {aimLen:1,type:3,fire:2,num:4,angle:8,y:15,speed:0,score:1.2,coin:1.2},
            {aimLen:0.8,type:2,fire:2,num:4,angle:7,y:15,speed:0.06,score:1,coin:1},
            {aimLen:1.2,type:3,fire:3,num:2,angle:7,y:15,speed:0,score:1.2,coin:1.2},
            {aimLen:1,type:2,fire:2,num:4,angle:7,y:15,speed:0.15,score:1,coin:1},
            {aimLen:0.5,type:3,fire:2,num:5,angle:10,y:15,speed:0,score:1,coin:1},
            {aimLen:0.7,type:2,fire:1,num:5,angle:5,y:15,speed:0.06,score:1,coin:1},
            {aimLen:1.2,type:1,fire:5,num:1,angle:0,y:15,speed:0,score:1.5,coin:1.5},
            {aimLen:0.9,type:2,fire:3,num:3,angle:3,y:15,speed:0.08,score:1,coin:1},
            {aimLen:1.5,type:1,fire:7,num:1,angle:0,y:15,speed:0,score:1.2,coin:2}
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
        this.userInfo = null;
        this.friendRank = null;
        this.chaoyueData = [];
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
        self.node_paiming_num = cc.find("bg/item_me/bg/rank",self.node_paiming);
        self.node_paiming_icon = cc.find("bg/item_me/bg/icon",self.node_paiming);
        self.node_paiming_nick = cc.find("bg/item_me/bg/nike",self.node_paiming);
        self.node_paiming_score = cc.find("bg/item_me/bg/score",self.node_paiming);
        self.node_paiming_role = cc.find("bg/item_me/bg/role",self.node_paiming);

        self.node_fuhuo = cc.find("Canvas/node_fuhuo");
        self.node_fuhuo_icon = cc.find("fuhuo_share/icon",self.node_fuhuo);
        self.node_fuhuo_nick = cc.find("fuhuo_share/nick",self.node_fuhuo);
        self.node_fuhuo_score = cc.find("fuhuo_share/score",self.node_fuhuo);
        self.node_fuhuo_no = cc.find("fuhuo_share/no",self.node_fuhuo);

        self.node_chaoyue = cc.find("Canvas/node_chaoyue");
    },


    click: function(event,data)
    {

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


    showPaiming: function()
    {
        var self = this;
        this.node_paiming.active = true;
        this.node_paiming_content.removeAllChildren();
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

    },

    getUserRank: function()
    {
        var self = this;
        wx.getUserCloudStorage({
            keyList:["gun_rank"],
            success: function(res)
            {
                cc.log(res);
                if(res.KVDataList.length == 0)
                {
                    self.setUserRank(0,new Date().getTime(),0,0,0);
                }
                else
                {
                    var feiji_rank = res.KVDataList[0].value;
                    self.kvdata = JSON.parse(feiji_rank);
                    cc.log(self.kvdata);
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

    getFriendRank: function(callback)
    {
        var self = this;
        wx.getFriendCloudStorage({
            keyList:["gun_rank"],
            success: function(res)
            {
                self.friendRank = res.data;
                self.sortFriendRank();
                cc.log(res);
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
    }


});
