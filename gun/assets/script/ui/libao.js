var storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {
        
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
        this.node_libao = this.node;

        this.node_libao_zhanshibg_guang = cc.find("bg/zhanshibg/guang",this.node_libao);
        this.node_libao_linggunbg_guang = cc.find("bg/linggunbg/guang",this.node_libao);

        this.node_libao_zhanshibg_guang.runAction(cc.repeatForever(cc.rotateBy(2,180)));
        this.node_libao_linggunbg_guang.runAction(cc.repeatForever(cc.rotateBy(2,180)));

        this.node_libao_video = cc.find("bg/video",this.node_libao);
        this.node_libao_start = cc.find("bg/start",this.node_libao);

        this.updateUI();
    },

    updateUI: function()
    {
        if(storage.getStorageLiBaoNum() > 0)
        {
            this.node_libao_video.active = false;
            this.node_libao_start.active = true;
        }
        else
        {
            this.node_libao_video.active = true;
            this.node_libao_start.active = false;
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
        if(data == "close")
        {
            this.main.wxQuanState(true);
            this.hide();
        }
        else if(data == "start")
        {
            this.useLiBaoStart();
        }
        else if(data == "video")
        {
            this.main.wxVideoShow(9);
        }
       
        cc.log(data);
    },

    useLiBaoStart: function()
    {
        if(parseInt(this.main.GAME.score) > storage.getStorageScore())
            storage.setStorageScore(parseInt(this.main.GAME.score));
        storage.setStorageCoin(parseInt(storage.getStorageCoin()) + parseInt(this.main.GAME.coin));

        if(cc.isValid(this.main.node_fuhuo))
            this.main.node_fuhuo.hide();

        this.main.wxCloseFuhuo();

        this.main.GAME.currPlayerTmp = this.main.GAME.currPlayer;
        this.main.GAME.currPlayer = 9;
        this.main.GAME.currGunTmp = this.main.GAME.currGun;
        this.main.GAME.currGun = 14;
        this.main.GAME.useLiBao = true;

        this.main.wxQuanState(false);
        this.main.again();
        this.hide();
    }
    
});
