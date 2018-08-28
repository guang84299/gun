var storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {
        item: {
            default: null,
            type: cc.Prefab
        }
    },

    onLoad: function()
    {
        this.dsize = cc.view.getDesignResolutionSize();
        this.main = cc.find("Canvas").getComponent("main");
        this.res = cc.find("Canvas").getComponent("res");

        this.items = [];
        
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
        this.node_tiaozhan_coin = cc.find("coin/num",this.node);
        this.node_tiaozhan_scroll = cc.find("scroll",this.node).getComponent("cc.ScrollView");
        this.node_tiaozhan_scroll_content = cc.find("scroll/view/content",this.node);

        this.node_tiaozhan_coin.getComponent("cc.Label").string = storage.getStorageCoin();

        var currLevel = storage.getStorageLevel();

        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = this.node;
        eventHandler.component = "tiaozhan";
        eventHandler.handler = "click";
        eventHandler.customEventData = "item";

        for(var i=0;i<5;i++)
        {
            var data = this.res.levels[i][0];

            var item = cc.instantiate(this.item);
            item.getComponent("cc.Button").clickEvents.push(eventHandler);
            item.tag = i;
            item.canset = false;

            var bg = cc.find("bg",item);
            var level = cc.find("levelbg/level",item);
            var success = cc.find("success",item);
            var suo = cc.find("suo",item);

            level.getComponent("cc.Label").string = (i+1)+"";
            if(i<currLevel)
            {
                item.color = cc.color(82,226,96);
                level.color = cc.color(82,226,96);
                bg.color = cc.color(82,226,96);
                bg.active = false;
                success.active = true;
                suo.active = false;

                item.canset = true;
            }
            else if(i == currLevel)
            {
                item.color = cc.color(82,226,96);
                level.color = cc.color(82,226,96);
                bg.color = cc.color(82,226,96);
                bg.active = true;
                success.active = false;
                suo.active = false;

                item.canset = true;
            }
            else
            {
                item.color = cc.color(181,181,181);
                level.color = cc.color(181,181,181);
                bg.color = cc.color(181,181,181);
                bg.active = true;
                success.active = false;
                suo.active = true;
            }

            if(data.type == 1 || data.type == 2 || data.type == 5)
            {
                var icon = cc.find("icon"+data.type,item);
                icon.active = true;
                var desc = cc.find("desc",icon).getComponent("cc.Label");
                desc.string = data.desc;
            }
            else if(data.type == 3)
            {
                var icon = cc.find("icon"+data.type,item);
                icon.active = true;
                icon.y += 22;
                var desc = cc.find("desc",icon).getComponent("cc.Label");
                desc.string = data.desc;

                var icon2 = cc.find("icon1",item);
                icon2.active = true;
                icon2.y -= 22;
                var desc2 = cc.find("desc",icon2).getComponent("cc.Label");
                desc2.string = data.desc2;
            }
            else if(data.type == 4)
            {
                var icon = cc.find("icon5",item);
                icon.active = true;
                icon.y += 22;
                var desc = cc.find("desc",icon).getComponent("cc.Label");
                desc.string = data.desc;

                var icon2 = cc.find("icon"+data.type,item);
                icon2.active = true;
                icon2.y -= 22;
                var desc2 = cc.find("desc",icon2).getComponent("cc.Label");
                desc2.string = data.desc2;
            }
            else if(data.type == 6)
            {
                var icon = cc.find("icon1",item);
                icon.active = true;
                icon.y += 22;
                var desc = cc.find("desc",icon).getComponent("cc.Label");
                desc.string = data.desc;

                var icon2 = cc.find("icon"+data.type,item);
                icon2.active = true;
                icon2.y -= 22;
                var desc2 = cc.find("desc",icon2).getComponent("cc.Label");
                desc2.string = data.desc2;
            }

            this.node_tiaozhan_scroll_content.addChild(item);
            this.items.push(item);
        }

    },

    addItems: function()
    {
        var currLevel = storage.getStorageLevel();

        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = this.node;
        eventHandler.component = "tiaozhan";
        eventHandler.handler = "click";
        eventHandler.customEventData = "item";

        for(var i=5;i<this.res.levels.length;i++)
        {
            var data = this.res.levels[i][0];

            var item = cc.instantiate(this.item);
            item.getComponent("cc.Button").clickEvents.push(eventHandler);
            item.tag = i;
            item.canset = false;

            var bg = cc.find("bg",item);
            var level = cc.find("levelbg/level",item);
            var success = cc.find("success",item);
            var suo = cc.find("suo",item);

            level.getComponent("cc.Label").string = (i+1)+"";
            if(i<currLevel)
            {
                item.color = cc.color(82,226,96);
                level.color = cc.color(82,226,96);
                bg.color = cc.color(82,226,96);
                bg.active = false;
                success.active = true;
                suo.active = false;

                item.canset = true;
            }
            else if(i == currLevel)
            {
                item.color = cc.color(82,226,96);
                level.color = cc.color(82,226,96);
                bg.color = cc.color(82,226,96);
                bg.active = true;
                success.active = false;
                suo.active = false;

                item.canset = true;
            }
            else
            {
                item.color = cc.color(181,181,181);
                level.color = cc.color(181,181,181);
                bg.color = cc.color(181,181,181);
                bg.active = true;
                success.active = false;
                suo.active = true;
            }

            if(data.type == 1 || data.type == 2 || data.type == 5)
            {
                var icon = cc.find("icon"+data.type,item);
                icon.active = true;
                var desc = cc.find("desc",icon).getComponent("cc.Label");
                desc.string = data.desc;
            }
            else if(data.type == 3)
            {
                var icon = cc.find("icon"+data.type,item);
                icon.active = true;
                icon.y += 22;
                var desc = cc.find("desc",icon).getComponent("cc.Label");
                desc.string = data.desc;

                var icon2 = cc.find("icon1",item);
                icon2.active = true;
                icon2.y -= 22;
                var desc2 = cc.find("desc",icon2).getComponent("cc.Label");
                desc2.string = data.desc2;
            }
            else if(data.type == 4)
            {
                var icon = cc.find("icon5",item);
                icon.active = true;
                icon.y += 22;
                var desc = cc.find("desc",icon).getComponent("cc.Label");
                desc.string = data.desc;

                var icon2 = cc.find("icon"+data.type,item);
                icon2.active = true;
                icon2.y -= 22;
                var desc2 = cc.find("desc",icon2).getComponent("cc.Label");
                desc2.string = data.desc2;
            }
            else if(data.type == 6)
            {
                var icon = cc.find("icon1",item);
                icon.active = true;
                icon.y += 22;
                var desc = cc.find("desc",icon).getComponent("cc.Label");
                desc.string = data.desc;

                var icon2 = cc.find("icon"+data.type,item);
                icon2.active = true;
                icon2.y -= 22;
                var desc2 = cc.find("desc",icon2).getComponent("cc.Label");
                desc2.string = data.desc2;
            }

            this.node_tiaozhan_scroll_content.addChild(item);
            this.items.push(item);
        }

        //var currLevel = storage.getStorageLevel();
        if(currLevel>3)
        {
            this.node_tiaozhan_scroll.scrollToPercentVertical(1-currLevel/this.items.length,0);
        }
    },

    updateUI: function()
    {
        this.node_tiaozhan_coin.getComponent("cc.Label").string = storage.getStorageCoin();

        var currLevel = storage.getStorageLevel();
        //for(var i=0;i<this.items.length;i++)
        //{
        //    var item = this.items[i];
        //    var bg = cc.find("bg",item);
        //    var level = cc.find("levelbg/level",item);
        //    var success = cc.find("success",item);
        //    var suo = cc.find("suo",item);
        //    item.canset = false;
        //
        //    if(i<currLevel)
        //    {
        //        item.color = cc.color(82,226,96);
        //        level.color = cc.color(82,226,96);
        //        bg.color = cc.color(82,226,96);
        //        bg.active = false;
        //        success.active = true;
        //        suo.active = false;
        //
        //        item.canset = true;
        //    }
        //    else if(i == currLevel)
        //    {
        //        item.color = cc.color(82,226,96);
        //        level.color = cc.color(82,226,96);
        //        bg.color = cc.color(82,226,96);
        //        bg.active = true;
        //        success.active = false;
        //        suo.active = false;
        //
        //        item.canset = true;
        //    }
        //    else
        //    {
        //        item.color = cc.color(181,181,181);
        //        level.color = cc.color(181,181,181);
        //        bg.color = cc.color(181,181,181);
        //        bg.active = true;
        //        success.active = false;
        //        suo.active = true;
        //    }
        //}



        var self = this;
        this.node.runAction(cc.sequence(
            cc.delayTime(0.1),
            cc.callFunc(function(){
                self.addItems();
            })
        ));
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

    show2: function()
    {
        this.main.wxQuanState(false);
        this.main.node_main.active = false;
        this.node.active = true;
    },

    click: function(event,data)
    {
        if(data == "home")
        {
            this.main.opentiaozhan = false;
            this.main.goMain();
            this.hide();
        }
        else if(data == "juese")
        {
            this.main.openJuese();
            this.node.active = false;
            //this.hide();
        }
        else if(data == "junhuo")
        {
            this.main.openGun();
            //this.hide();
            this.node.active = false;
        }
        else if(data == "item")
        {
            if(event.target.canset)
            {
                this.startGame(event.target.tag);
            }
        }
        else if(data == "tiaozhan")
        {
            var currLevel = storage.getStorageLevel();
            this.startGame(currLevel);
        }
        cc.log(data);
    },

    startGame: function(level)
    {
        this.main.tiaozhanlv = level;
        this.main.openTiaoZhandesc(level);
        this.hide();
    }
});
