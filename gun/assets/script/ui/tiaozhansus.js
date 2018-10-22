var storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {
        icon1: {
            type: cc.SpriteFrame,
            default: null
        },
        icon2: {
            type: cc.SpriteFrame,
            default: null
        },
        icon3: {
            type: cc.SpriteFrame,
            default: null
        },
        icon4: {
            type: cc.SpriteFrame,
            default: null
        },
        icon5: {
            type: cc.SpriteFrame,
            default: null
        },
        icon6: {
            type: cc.SpriteFrame,
            default: null
        },
        icon7: {
            type: cc.SpriteFrame,
            default: null
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
        this.node_tiaozhan_coin = cc.find("coin/num",this.node).getComponent("cc.Label");
        this.node_tiaozhan_desc1 = cc.find("bg/desc1",this.node);
        this.node_tiaozhan_desc1_str = this.node_tiaozhan_desc1.getComponent("cc.Label");
        this.node_tiaozhan_desc1_icon = cc.find("bg/desc1/icon",this.node);
        this.node_tiaozhan_desc2 = cc.find("bg/desc2",this.node);
        this.node_tiaozhan_desc2_str = this.node_tiaozhan_desc2.getComponent("cc.Label");
        this.node_tiaozhan_desc2_icon = cc.find("bg/desc2/icon",this.node);
        this.node_tiaozhan_coin2 = cc.find("bg/coin",this.node).getComponent("cc.Label");

        this.node_tiaozhan_xuanyao = cc.find("xuanyao",this.node).getComponent("cc.Button");
    },

    updateUI: function()
    {
        var currLevel = storage.getStorageLevel();
        this.award = 10;
        if(this.main.tiaozhanlv == currLevel)
        {
            storage.setStorageLevel(this.main.tiaozhanlv+1);
            this.award = 10+this.main.tiaozhanlv*2;
        }

        this.node_tiaozhan_coin.string = storage.getStorageCoin();
        this.node_tiaozhan_coin2.string = this.award;

        this.node_tiaozhan_desc2.active = false;
        var lvdata = this.res.levels[this.main.tiaozhanlv][0];
        this.node_tiaozhan_desc1_str.string = lvdata.desc;
        if(lvdata.type == 3 || lvdata.type == 4 || lvdata.type == 6)
        {
            this.node_tiaozhan_desc2.active = true;
            this.node_tiaozhan_desc2_str.string = lvdata.desc2;
        }

        if(lvdata.type == 1)
        {
            this.node_tiaozhan_desc1_icon.getComponent("cc.Sprite").spriteFrame = this.icon1;
        }
        else if(lvdata.type == 2)
        {
            this.node_tiaozhan_desc1_icon.getComponent("cc.Sprite").spriteFrame = this.icon3;
        }
        else if(lvdata.type == 3)
        {
            this.node_tiaozhan_desc1_icon.getComponent("cc.Sprite").spriteFrame = this.icon7;
            this.node_tiaozhan_desc2_icon.getComponent("cc.Sprite").spriteFrame = this.icon1;
        }
        else if(lvdata.type == 4)
        {
            this.node_tiaozhan_desc1_icon.getComponent("cc.Sprite").spriteFrame = this.icon2;
            this.node_tiaozhan_desc2_icon.getComponent("cc.Sprite").spriteFrame = this.icon6;
        }
        else if(lvdata.type == 5)
        {
            this.node_tiaozhan_desc1_icon.getComponent("cc.Sprite").spriteFrame = this.icon2;
        }
        else if(lvdata.type == 6)
        {
            this.node_tiaozhan_desc1_icon.getComponent("cc.Sprite").spriteFrame = this.icon1;
            this.node_tiaozhan_desc2_icon.getComponent("cc.Sprite").spriteFrame = this.icon5;
        }

    },

    updateCoin: function()
    {
        this.node_tiaozhan_coin.string = storage.getStorageCoin();
    },

    show: function()
    {
        this.node.active = true;
        this.updateUI();
        this.main.wxBannerHide();
    },

    hide: function()
    {
        this.node.destroy();
    },

    click: function(event,data)
    {
        if(data == "home")
        {
            if(this.node_tiaozhan_xuanyao.interactable)
            {
                storage.setStorageCoin(storage.getStorageCoin()+this.award);
                if(this.main.GAME.isShouYix2)
                    storage.setStorageCoin(storage.getStorageCoin()+this.award);
            }

            this.main.goMain();
            if(this.main.opentiaozhan)
                this.main.openTiaoZhan();
            this.hide();
        }
        else if(data == "xuanyao")
        {
            this.xuanyao();
        }
        else if(data == "next")
        {
            if(this.node_tiaozhan_xuanyao.interactable)
            {
                storage.setStorageCoin(storage.getStorageCoin()+this.award);
                if(this.main.GAME.isShouYix2)
                    storage.setStorageCoin(storage.getStorageCoin()+this.award);
            }
            this.node_tiaozhan_xuanyao.interactable = false;
            this.updateCoin();

            if(this.main.tiaozhanlv+1 < this.res.levels.length)
                this.startGame(this.main.tiaozhanlv + 1);
            else
            {
                this.res.showToast("全部挑战完成！");
            }
        }
        cc.log(data);
    },

    xuanyao: function()
    {
          if(this.main.GAME.sharetiaozhan)
          {
              var self = this;
              if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
              {
                  var info = {};
                  info.channel = "sharetiaozhan";
                  var query = JSON.stringify(info);
                  var title = "[ QQ 红包 ] 恭喜发财 玩星辉联赛，百元红包等你来领！";
                  var imageUrl = "http://www.qiqiup.com/gun.gif";
                  var shareInfo = {
                      summary:title,          //QQ聊天消息标题
                      picUrl:imageUrl,               //QQ聊天消息图片
                      extendInfo:query,    //QQ聊天消息扩展字段
                  };
                  BK.QQ.share(shareInfo, function (retCode, shareDest, isFirstShare) {
                      BK.Script.log(1, 1, "retCode:" + retCode + " shareDest:" + shareDest + " isFirstShare:" + isFirstShare);
                      if (retCode == 0) {
                          BK.Script.log(1, 1, "分享成功：" + retCode);
                          self.node_tiaozhan_xuanyao.interactable = false;
                          var rt = 1;
                          if(self.main.GAME.isShouYix2)
                            rt = 2;
                          storage.setStorageCoin(storage.getStorageCoin()+self.award*2*rt);
                          self.res.showToast("金币+"+self.award*2*rt);
                          self.main.qianqista.share(true);
                      }
                      else{
                          BK.Script.log(1, 1, "分享失败" + retCode);
                          self.main.qianqista.share(false);
                          self.res.showToast("分享失败！");
                      }

                  });

                  //var query = "channel=sharetiaozhan";
                  //var title = "自从玩了这个游戏，每把吃鸡都能拿98K";
                  //var imageUrl = cc.url.raw("resources/zhuanfa.jpg");
                  //if(this.main.GAME.shares.sharetiaozhan_pic && this.main.GAME.shares.sharetiaozhan_txt)
                  //{
                  //    title = this.main.GAME.shares.sharetiaozhan_txt;
                  //    imageUrl = this.main.GAME.shares.sharetiaozhan;
                  //}
                  //
                  //wx.shareAppMessage({
                  //    query:query,
                  //    title: title,
                  //    imageUrl: imageUrl,
                  //    success: function(res)
                  //    {
                  //        if(res.shareTickets && res.shareTickets.length>0)
                  //        {
                  //            self.node_tiaozhan_xuanyao.interactable = false;
                  //            storage.setStorageCoin(storage.getStorageCoin()+self.award*2);
                  //            self.res.showToast("金币+"+self.award*2);
                  //        }
                  //        else
                  //        {
                  //            self.res.showToast("请分享到群");
                  //        }
                  //
                  //        self.main.qianqista.share(true);
                  //        cc.log(res);
                  //    },
                  //    fail: function()
                  //    {
                  //        self.main.qianqista.share(false);
                  //    }
                  //});
              }
              else
              {
                  this.node_tiaozhan_xuanyao.interactable = false;
                  var rt = 1;
                  if(this.main.GAME.isShouYix2)
                      rt = 2;
                  storage.setStorageCoin(storage.getStorageCoin()+this.award*2*rt);
                  this.res.showToast("金币+"+this.award*2*rt);
                  this.updateCoin();
              }
          }
          else
          {
              this.main.wxVideoShow(4);
          }
    },

    startGame: function(level)
    {
        this.main.tiaozhanlv = level;
        this.main.openTiaoZhandesc(level);
        this.hide();
    }
});
