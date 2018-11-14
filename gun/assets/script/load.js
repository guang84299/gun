
cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: {
            default: null,
            type: cc.ProgressBar
        },

        progressTips: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad: function() {

         this.resource = null;
         //this.progressBar.progress = this.progressBar.getComponent("cc.ProgressBar").progress;
         //this.progressTips.string = this.progressTips.getComponent("cc.Label").string;

         cc.loader.loadResDir("prefab/", this.progressCallback.bind(this), this.completeCallback.bind(this));
     },

    progressCallback: function (completedCount, totalCount, res) {
        this.progress = completedCount / totalCount;
        this.resource = res;
        this.completedCount = completedCount;
        this.totalCount = totalCount;

        this.progressBar.progress = this.progress;
        this.progressTips.string = "Loading"+ " (" + this.completedCount + "/" + this.totalCount + ")";
    },

    completeCallback: function (error, res) {
        this.progressTips.string = "Complete";
        cc.director.loadScene("main");
    }

    //update: function (dt) {
    //    if (!this.resource) {
    //        return;
    //    }
    //    var progress = this.progressBar.progress;
    //    if (progress >= 1) {
    //        this.progressTips.string = "load end ";
    //        this.progressBar.node.active = false;
    //        this.enabled = false;
    //        return;
    //    }
    //    if (progress < this.progress) {
    //        progress += dt;
    //    }
    //    this.progressBar.progress = progress;
    //    this.progressTips.string = "loading"+ this.resource.id + " (" + this.completedCount + "/" + this.totalCount + ")";
    //}
});
