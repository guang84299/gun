var storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {
        item_star: {
            default: null,
            type: cc.Prefab
        }
    },

    onLoad: function()
    {
        this.dsize = cc.view.getDesignResolutionSize();
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
        this.node_star = this.node;
        this.node_star_center = cc.find("center",this.node_star);
        this.node_star_top_guang = cc.find("top/guang",this.node_star);
        //this.node_chengjiu_score = cc.find("score",this.node_star);
        //this.node_chengjiu_coin = cc.find("coin/num",this.node_star);
        this.node_star_scroll_content = cc.find("bg/scroll/view/content",this.node_star);
        this.node_star_rank_curr = cc.find("bg/rank_curr",this.node_star).getComponent("cc.Button");
        this.node_star_rank_last = cc.find("bg/rank_last",this.node_star).getComponent("cc.Button");
        this.node_star_time = cc.find("bg/time",this.node_star).getComponent("cc.Label");
        this.node_star_desc = cc.find("desc/desc",this.node_star).getComponent("cc.Label");
        this.node_star_item_me_bg = cc.find("bg/item_me/bg",this.node_star);
        this.node_star_item_me_rank = cc.find("rank",this.node_star_item_me_bg);
        this.node_star_item_me_icon = cc.find("icon",this.node_star_item_me_bg);
        this.node_star_item_me_nike = cc.find("nike",this.node_star_item_me_bg);
        this.node_star_item_me_score = cc.find("score",this.node_star_item_me_bg);
        this.node_star_item_me_award = cc.find("award",this.node_star_item_me_bg);


        this.node_star_rank_curr.interactable = false;
        this.node_star_top_guang.runAction(cc.repeatForever(
            cc.rotateBy(2,180)
        ));

        this.ranktype = 1;
        this.rankdata1 = null;
        this.rankdata2 = null;
        this.subTime = 0;
        this.subDt =  0;
        this.addItemDt = 0;

        var self = this;
        this.main.qianqista.subTime(function(res){
            self.subTime = res.data;
        });

        if(!this.main.GAME.pvphuodong)
        {
            this.node_star_desc.string = "亲爱的枪手们，本期星辉联赛红包活动已经结束啦，后续我们将不定期开启活动，敬请期待哦~";
        }
    },

    updateUI: function()
    {
        var s = cc.winSize;
        var self = this;
        this.node_star_center.height = s.height - 260;
        this.node_star_center.color = this.main.ltcolor;


        //this.node_chengjiu_score.getComponent("cc.Label").string = storage.getStorageScore();
        //this.node_chengjiu_coin.getComponent("cc.Label").string = storage.getStorageCoin();

        this.node_star_scroll_content.stopAllActions();
        this.node_star_scroll_content.destroyAllChildren();

        if(this.ranktype == 1)
        {
            if(this.rankdata1)
            {
                self.updateMeItem(this.rankdata1);
            }
            else
            {
                this.main.qianqista.rankStar(function(res){
                    var datas = res.data;
                    self.rankdata1 = datas;
                    self.updateMeItem(datas);
                });
            }
        }
        else
        {
            if(this.rankdata2)
            {
                self.updateMeItem(this.rankdata2);
            }
            else
            {
                this.main.qianqista.rankStarLast(function(res){
                    var datas = res.data;
                    self.rankdata2 = datas;
                    self.updateMeItem(datas);
                });
            }

        }

    },

    updateMeItem: function(datas)
    {
        var self = this;
        if(datas && datas.length>0)
        {
            var selfdata = datas[datas.length-1];
            if(selfdata)
            {
                var rankme = selfdata.id+"";
                if(selfdata.id > 50 || selfdata.id == 0)
                    rankme = "落榜";
                this.node_star_item_me_rank.getComponent("cc.Label").string = rankme;
                if(selfdata.avatarUrl && selfdata.avatarUrl.length>10)
                    this.loadPic(this.node_star_item_me_icon,selfdata.avatarUrl);
                this.node_star_item_me_nike.getComponent("cc.Label").string = selfdata.nick;
                if(this.ranktype == 1)
                    this.node_star_item_me_score.getComponent("cc.Label").string = selfdata.star;
                else
                    this.node_star_item_me_score.getComponent("cc.Label").string = selfdata.lastStar;
                this.node_star_item_me_award.getComponent("cc.Label").string = selfdata.award+"￥";

            }

            this.node_star_scroll_content.runAction(cc.sequence(
                cc.delayTime(0.08),
                cc.callFunc(function(){
                    self.addItems(datas);
                })
            ));
        }
    },

    addItems: function(datas)
    {
        var self = this;
        var num = this.node_star_scroll_content.childrenCount;
        if(datas && datas.length>1 && num < datas.length-1)
        {
            var data = datas[num];
            var item = cc.instantiate(this.item_star);
            var bg = cc.find("bg",item);
            var rank = cc.find("rank",bg);
            var icon = cc.find("icon",bg);
            var nike = cc.find("nike",bg);
            var score = cc.find("score",bg);
            var award = cc.find("award",bg);

            rank.getComponent("cc.Label").string = (num+1)+"";
            if(data.avatarUrl && data.avatarUrl.length>10)
                this.loadPic(icon,data.avatarUrl);
            nike.getComponent("cc.Label").string = data.nick;
            if(this.ranktype == 1)
                score.getComponent("cc.Label").string = data.star;
            else
                score.getComponent("cc.Label").string = data.lastStar;
            award.getComponent("cc.Label").string = data.award+"￥";

            this.node_star_scroll_content.addChild(item);
            this.node_star_scroll_content.runAction(cc.sequence(
                cc.delayTime(0.06),
                cc.callFunc(function(){
                    self.addItems(datas);
                })
            ));
        }
    },

    show: function()
    {
        this.node.active = true;
        this.updateUI();
    },

    hide: function()
    {
        this.node.destroy();
    },

    click: function(event,data)
    {
        if(data == "home")
        {
            this.main.goMain();
            this.hide();
        }
        else if(data == "vs")
        {
            if(this.subTime > -2*60*1000 && this.subTime < 5*60*1000)
            {
                var t = 1;
                if(this.subTime>=0)
                    t = Math.floor(this.subTime/60/1000)+2;
                else
                    t = Math.floor((this.subTime + 2*60*1000)/60/1000);
                if(t<=0)
                    t = 1;
                this.res.showToast("奖励结算中，请稍等"+t+"分钟.");
            }
            else
            {
                this.main.openDuizhan();
                this.hide();
            }
        }
        else if(data == "rank_curr")
        {
            this.node_star_rank_curr.interactable = false;
            this.node_star_rank_last.interactable = true;
            this.ranktype = 1;
            this.updateUI();
        }
        else if(data == "rank_last")
        {
            this.node_star_rank_curr.interactable = true;
            this.node_star_rank_last.interactable = false;
            this.ranktype = 2;
            this.updateUI();
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

    update: function(dt)
    {
        this.subDt += dt;
        if(this.subDt >= 1)
        {
            this.subDt = 0;

            this.subTime -= 1000;
            var dtime = this.subTime;
            if(dtime < 0)
                dtime = 0;


            //var d = Math.floor(this.subTime/(24*60*60*1000));
            //var h = Math.floor((this.subTime - d*24*60*60*1000)/(60*60*1000));
            //var m = Math.floor((this.subTime - d*24*60*60*1000 - h*60*60*1000)/(60*1000));
            //var s = Math.floor(((this.subTime - d*24*60*60*1000 - h*60*60*1000 - m*60*1000))/1000);
            var h = Math.floor(dtime/(60*60*1000));
            var m = Math.floor((dtime - h*60*60*1000)/(60*1000));
            var s = Math.floor(((dtime - h*60*60*1000 - m*60*1000))/1000);
            //var sd = "0"+d;
            var sh = h < 10 ? "0"+h : h;
            var sm = m < 10 ? "0"+m : m;
            var ss = s < 10 ? "0"+s : s;
            this.node_star_time.string = "剩余时间 "+sh+":"+sm+":"+ss;
        }

        //this.addItemDt += dt;
        //if(this.addItemDt >= 0.06)
        //{
        //    this.addItemDt = 0;
        //
        //    if(this.ranktype == 1)
        //        this.addItems(this.rankdata1);
        //    else
        //        this.addItems(this.rankdata2);
        //}
    }
});
