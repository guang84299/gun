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
        this.node_setting = this.node;
        this.node_setting_music = cc.find("bg/music",this.node_setting);
        this.node_setting_sound = cc.find("bg/sound",this.node_setting);
        this.node_setting_vibrate = cc.find("bg/vibrate",this.node_setting);

        this.updateUI();
    },

    updateUI: function()
    {
        this.node_setting_music.getComponent("cc.Toggle").isChecked = (storage.getStorageMusic() == 1 ? true : false);
        this.node_setting_sound.getComponent("cc.Toggle").isChecked = (storage.getStorageSound() == 1 ? true : false);
        this.node_setting_vibrate.getComponent("cc.Toggle").isChecked = (storage.getStorageVibrate() == 1 ? true : false);
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
        if(data == "close_setting")
        {
            this.main.wxQuanState(true);
            this.hide();
        }
        else if(data == "music")
        {
            var m = storage.getStorageMusic();
            m = m == 0 ? 1 : 0;
            storage.setStorageMusic(m);
            if(storage.getStorageMusic() == 0)
            {
                storage.stopMusic();
            }
            else
            {
                storage.playMusic(this.res.audio_bgm);
            }
        }
        else if(data == "sound")
        {
            var m = storage.getStorageSound();
            m = m == 0 ? 1 : 0;
            storage.setStorageSound(m);
        }
        else if(data == "vibrate")
        {
            var m = storage.getStorageVibrate();
            m = m == 0 ? 1 : 0;
            storage.setStorageVibrate(m);
        }
        cc.log(data);
    }
    
});
