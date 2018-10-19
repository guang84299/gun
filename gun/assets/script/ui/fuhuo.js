var storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad: function()
    {
        this.dsize = new cc.size(720, 1584);
        this.main = cc.find("Canvas").getComponent("main");
        this.res = cc.find("Canvas").getComponent("res");
        
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
        this.node_fuhuo = this.node;
        this.node_fuhuo_share = cc.find("fuhuo_share",this.node_fuhuo);
        this.node_fuhuo_coin = cc.find("coin/num",this.node_fuhuo);
        this.node_fuhuo_score = cc.find("score",this.node_fuhuo);
        this.node_fuhuo_fu_coin = cc.find("fuhuo_coin",this.node_fuhuo_share);
        this.node_fuhuo_fu_video = cc.find("fuhuo_video",this.node_fuhuo_share);
        this.node_fuhuo_fu_xuming = cc.find("fuhuo_xuming",this.node_fuhuo_share);
        this.node_fuhuo_guang = cc.find("zhanshibg/guang",this.node_fuhuo);

        this.node_fuhuo_icon = cc.find("fuhuo_share/icon",this.node_fuhuo);
        this.node_fuhuo_nick = cc.find("fuhuo_share/nick",this.node_fuhuo);
        this.node_fuhuo_score = cc.find("fuhuo_share/score",this.node_fuhuo);
        this.node_fuhuo_no = cc.find("fuhuo_share/no",this.node_fuhuo);
    },

    updateUI: function()
    {
        this.main.node_game_ui.active = false;
        this.node_fuhuo_guang.stopAllActions();
        this.node_fuhuo_guang.runAction(cc.repeatForever(
            cc.rotateBy(1,180)
        ));
        this.node_fuhuo_coin.getComponent("cc.Label").string = Math.floor(this.main.GAME.coin);
        this.node_fuhuo_score.getComponent("cc.Label").string = parseInt(this.main.GAME.score);
        this.node_fuhuo_fu_coin.getComponent("cc.Button").interactable = this.main.GAME.playerfuhuo;
        this.node_fuhuo_fu_video.getComponent("cc.Button").interactable = this.main.GAME.playerfuhuovideo;
        if(this.main.GAME.playerfuhuo)
        {
            this.node_fuhuo_fu_coin.color = cc.color(255,255,255);
            this.node_fuhuo_fu_xuming.color = cc.color(255,255,255);
        }
        else
        {
            this.node_fuhuo_fu_coin.color = cc.color(161,161,161);
            this.node_fuhuo_fu_xuming.color = cc.color(161,161,161);
        }
        if(this.main.GAME.playerfuhuovideo)
            this.node_fuhuo_fu_video.color = cc.color(255,255,255);
        else
            this.node_fuhuo_fu_video.color = cc.color(161,161,161);

        var date = new Date();
        var stringtime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        var time1 = stringtime + " " + this.main.GAME.xuming.split("-")[0] + ":00";
        var time2 = stringtime + " " + this.main.GAME.xuming.split("-")[1] + ":00";
        var timestamp1 = (new Date(Date.parse(time1.replace(/-/g,"/")))).getTime();
        var timestamp2 = (new Date(Date.parse(time2.replace(/-/g,"/")))).getTime();
        if(date.getTime()>timestamp1 && date.getTime() < timestamp2)
        {
            this.node_fuhuo_fu_xuming.active = true;
            this.node_fuhuo_fu_coin.active = false;
            this.node_fuhuo_fu_xuming.getComponent("cc.Button").interactable = this.main.GAME.playerfuhuo;
        }
        else
        {
            this.node_fuhuo_fu_xuming.active = false;
            this.node_fuhuo_fu_coin.active = true;
        }
        //this.main.wxFuhuoRank(Math.floor(this.main.GAME.score),this.main.GAME.currPlayer,this.main.GAME.currGun);
        this.wxFuhuoRank(Math.floor(this.main.GAME.score));
        this.main.wxBannerShow();


    },

    wxFuhuoRank: function(score)
    {
        var self = this;
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS || cc.sys.myweb)
        {
            FBInstant.getLeaderboardAsync('wscore')
                .then(function(leaderboard) {
                    return leaderboard.getConnectedPlayerEntriesAsync();
                })
                .then(function(entries) {
                    var chaoyue = null;
                    for(var i=0; i < entries.length; ++i) {
                        var rd = entries[i];

                        if(rd.getPlayer().getID() != FBInstant.player.getID())
                        {
                            if(score < rd.getScore())
                            {
                                chaoyue = rd;
                                break;
                            }
                        }
                    }

                    if(chaoyue)
                    {
                        self.node_fuhuo_no.active = false;
                        self.node_fuhuo_nick.active = true;
                        self.node_fuhuo_score.active = true;
                        self.node_fuhuo_icon.active = true;

                        self.main.loadPic(self.node_fuhuo_icon,chaoyue.getPlayer().getPhoto());
                        self.node_fuhuo_nick.getComponent("cc.Label").string = chaoyue.getPlayer().getName();
                        self.node_fuhuo_score.getComponent("cc.Label").string = "Score:"+chaoyue.getScore();
                    }
                    else
                    {
                        self.node_fuhuo_no.active = true;
                        self.node_fuhuo_nick.active = false;
                        self.node_fuhuo_score.active = false;
                        self.node_fuhuo_icon.active = false;
                    }
                });
        }
    },

    show: function()
    {
        this.node.active = true;
        this.updateUI();
        this.main.openfuhuo = true;
    },

    hide: function()
    {
        this.node.destroy();
        this.main.openfuhuo = false;
    },

    click: function(event,data)
    {
        if(data == "zhanshi")
        {
            this.main.openzhanshi();
        }
        else if(data == "fuhuo_share")
        {
            this.wxGropShareFuhuo();
            this.main.qianqista.event("fuhuo_coin");
            //this.hide();
        }
        else if(data == "fuhuo_video")
        {
            this.main.wxVideoShow(2);
            this.main.qianqista.event("fuhuo_video");
        }
        else if(data == "fuhuo_xuming")
        {
            this.main.openXuming();
        }
        else if(data == "skip")
        {
            this.hide();
            this.main.skip();
        }
        cc.log(data);
    },

    wxGropShareFuhuo: function()
    {
        var coinnum = storage.getStorageCoin();
        if(coinnum>=100)
        {
            coinnum = parseInt(coinnum) - 100;
            storage.setStorageCoin(coinnum);
            this.main.fuhuo(false,true,false);
            this.main.uploadData();
        }
        else
        {
            this.main.openCoinNode();
        }
    },
    
});
