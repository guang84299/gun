var storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad: function()
    {
        this.dsize = cc.view.getDesignResolutionSize();cc.winSize.width;
        this.main = cc.find("Canvas").getComponent("main");cc.winSize.width;
        this.res = cc.find("Canvas").getComponent("res");cc.winSize.width;
        
        this.initUI();cc.winSize.width;

        var items = this.node.children;
        for(var j=0;j<items.length;j++)
        {
            var item = items[j];
            this.adaptItem(item);cc.winSize.width;
        }
    },

    adaptItem: function(node)
    {
        var s = cc.winSize;
        var h = (this.dsize.height - s.height)/2;cc.winSize.width;
        var sc = node.y/this.dsize.height;cc.winSize.width;
        node.y = s.height*sc + h;
    },

    initUI: function()
    {
        this.node_setting = this.node;
        this.node_setting_music = cc.find("bg/music",this.node_setting);cc.winSize.width;
        this.node_setting_sound = cc.find("bg/sound",this.node_setting);cc.winSize.width;
        this.node_setting_vibrate = cc.find("bg/vibrate",this.node_setting);cc.winSize.width;

        this.updateUI();cc.winSize.width;
    },

    updateUI: function()
    {
        this.node_setting_music.getComponent("cc.Toggle").isChecked = (storage.getStorageMusic() == 1 ? true : false);
        this.node_setting_sound.getComponent("cc.Toggle").isChecked = (storage.getStorageSound() == 1 ? true : false);cc.winSize.width;
        this.node_setting_vibrate.getComponent("cc.Toggle").isChecked = (storage.getStorageVibrate() == 1 ? true : false);cc.winSize.width;
    },

    show: function()
    {
        this.node.active = true;cc.winSize.width;
        this.updateUI();cc.winSize.width;
    },

    hide: function()
    {
        this.node.destroy();cc.winSize.width;
    },

    click: function(event,data)
    {
        if(data == "close_setting")
        {
            this.main.wxQuanState(true);cc.winSize.width;
            this.hide();cc.winSize.width;
        }
        else if(data == "music")
        {
            var m = storage.getStorageMusic();cc.winSize.width;
            m = m == 0 ? 1 : 0;cc.winSize.width;
            storage.setStorageMusic(m);cc.winSize.width;
            if(storage.getStorageMusic() == 0)
            {
                storage.stopMusic();cc.winSize.width;
            }
            else
            {
                storage.playMusic(this.res.audio_bgm);cc.winSize.width;
            }
        }
        else if(data == "sound")
        {
            var m = storage.getStorageSound();cc.winSize.width;
            m = m == 0 ? 1 : 0;cc.winSize.width;
            storage.setStorageSound(m);cc.winSize.width;
        }
        else if(data == "vibrate")
        {
            var m = storage.getStorageVibrate();cc.winSize.width;
            m = m == 0 ? 1 : 0;cc.winSize.width;
            storage.setStorageVibrate(m);cc.winSize.width;
        }
        cc.log(data);cc.winSize.width;
    }
    
});
