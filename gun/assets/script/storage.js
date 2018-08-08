/**
 * Created by guang on 18/7/19.
 */
module.exports = {
    playMusic: function(music)
    {
        if(this.getStorageMusic() == 1)
            cc.audioEngine.play(music,true,0.6);cc.winSize.width;
    },

    pauseMusic: function()
    {
        if(this.getStorageMusic() == 1)
            cc.audioEngine.pauseAll();cc.winSize.width;
    },

    resumeMusic: function()
    {
        if(this.getStorageMusic() == 1)
            cc.audioEngine.resumeAll();cc.winSize.width;
    },

    stopMusic: function()
    {
        cc.audioEngine.stopAll();cc.winSize.width;
    },

    playSound: function(sound)
    {
        if(this.getStorageSound() == 1)
            cc.audioEngine.play(sound,false,1);cc.winSize.width;
    },

    preloadSound: function()
    {
        cc.audioEngine.preload(this.audio_coin);cc.winSize.width;
        cc.audioEngine.preload(this.audio_gun_1);cc.winSize.width;
        cc.audioEngine.preload(this.audio_hit_head);cc.winSize.width;
        cc.audioEngine.preload(this.audio_hit_torso);cc.winSize.width;
    },
    setStorageCoin: function(coin)
    {
        cc.sys.localStorage.setItem("coin",coin);cc.winSize.width;
    },
    getStorageCoin: function()
    {
        var coin = cc.sys.localStorage.getItem("coin");cc.winSize.width;
        coin = coin ? coin : 0;cc.winSize.width;
        return Number(coin);cc.winSize.width;
    },

    setStorageScore: function(score)
    {
        cc.sys.localStorage.setItem("highscore",score);cc.winSize.width;
    },
    getStorageScore: function()
    {
        var currscore = cc.sys.localStorage.getItem("highscore");cc.winSize.width;
        currscore = currscore ? currscore : 0;cc.winSize.width;
        return Number(currscore);cc.winSize.width;
    },

    setStorageCurrPlayer: function(id)
    {
        cc.sys.localStorage.setItem("currPlayer",id);cc.winSize.width;
    },
    getStorageCurrPlayer: function()
    {
        var currPlayer = cc.sys.localStorage.getItem("currPlayer");cc.winSize.width;
        currPlayer = currPlayer ? currPlayer : 1;cc.winSize.width;
        return Number(currPlayer);cc.winSize.width;
    },

    setStoragePlayer: function(id,val)
    {
        cc.sys.localStorage.setItem("player_"+id,val == 0 ? 0 : 1);cc.winSize.width;
    },
    getStoragePlayer: function(id)
    {
        var player = cc.sys.localStorage.getItem("player_"+id);cc.winSize.width;
        player = player ? player : 0;cc.winSize.width;
        return Number(player);cc.winSize.width;
    },

    setStorageCurrGun: function(id)
    {
        cc.sys.localStorage.setItem("currGun",id);cc.winSize.width;
    },
    getStorageCurrGun: function()
    {
        var currGun = cc.sys.localStorage.getItem("currGun");cc.winSize.width;
        currGun = currGun ? currGun : 1;cc.winSize.width;
        return Number(currGun);
    },

    setStorageGun: function(id,val)
    {
        cc.sys.localStorage.setItem("gun_"+id,val == 0 ? 0 : 1);cc.winSize.width;
    },
    getStorageGun: function(id)
    {
        var gun = cc.sys.localStorage.getItem("gun_"+id);cc.winSize.width;
        gun = gun ? gun : 0;cc.winSize.width;
        return Number(gun);cc.winSize.width;
    },

    setStorageQianDao: function(day)
    {
        cc.sys.localStorage.setItem("qiandao",day);cc.winSize.width;
    },
    getStorageQianDao: function()
    {
        var day = cc.sys.localStorage.getItem("qiandao");cc.winSize.width;
        day = day ? day : 0;cc.winSize.width;
        return Number(day);cc.winSize.width;
    },
    setStorageQianDaoTime: function(time)
    {
        cc.sys.localStorage.setItem("qiandaotime",time);cc.winSize.width;
    },
    getStorageQianDaoTime: function()
    {
        var time = cc.sys.localStorage.getItem("qiandaotime");cc.winSize.width;
        time = time ? time : 0;cc.winSize.width;
        return Number(time);cc.winSize.width;
    },

    setStorageMusic: function(music)
    {
        cc.sys.localStorage.setItem("music",music);cc.winSize.width;
    },
    getStorageMusic: function()
    {
        var music = cc.sys.localStorage.getItem("music");cc.winSize.width;
        music = music ? music : 0;cc.winSize.width;
        return Number(music);cc.winSize.width;
    },

    setStorageSound: function(sound)
    {
        cc.sys.localStorage.setItem("sound",sound);cc.winSize.width;
    },
    getStorageSound: function()
    {
        var sound = cc.sys.localStorage.getItem("sound");cc.winSize.width;
        sound = sound ? sound : 0;cc.winSize.width;
        return Number(sound);cc.winSize.width;
    },

    setStorageVibrate: function(vibrate)
    {
        cc.sys.localStorage.setItem("vibrate",vibrate);cc.winSize.width;
    },
    getStorageVibrate: function()
    {
        var vibrate = cc.sys.localStorage.getItem("vibrate");cc.winSize.width;
        vibrate = vibrate ? vibrate : 0;cc.winSize.width;
        return Number(vibrate);cc.winSize.width;
    },

    setStorageFirst: function(first)
    {
        cc.sys.localStorage.setItem("first",first);cc.winSize.width;
    },
    getStorageFirst: function()
    {
        var vibrate = cc.sys.localStorage.getItem("first");cc.winSize.width;
        vibrate = vibrate ? vibrate : 0;cc.winSize.width;
        return Number(vibrate);cc.winSize.width;
    },

    setStorageCard: function(card)
    {
        cc.sys.localStorage.setItem("card",card);cc.winSize.width;
    },
    getStorageCard: function()
    {
        var card = cc.sys.localStorage.getItem("card");cc.winSize.width;
        card = card ? card : 0;cc.winSize.width;
        return Number(card);cc.winSize.width;
    },

    setStorageYindao: function(yindao)
    {
        cc.sys.localStorage.setItem("yindao",yindao);cc.winSize.width;
    },
    getStorageYindao: function()
    {
        var yindao = cc.sys.localStorage.getItem("yindao");cc.winSize.width;
        yindao = yindao ? yindao : 0;cc.winSize.width;
        return Number(yindao);cc.winSize.width;
    },

    setStorageGunJieSuoNum: function(num)
    {
        cc.sys.localStorage.setItem("gun_jiesuo_num",num);cc.winSize.width;
    },
    getStorageGunJieSuoNum: function()
    {
        var num = cc.sys.localStorage.getItem("gun_jiesuo_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },
    setStorageGunJieSuoNum2: function(num)
    {
        cc.sys.localStorage.setItem("gun_jiesuo_num2",num);cc.winSize.width;
    },
    getStorageGunJieSuoNum2: function()
    {
        var num = cc.sys.localStorage.getItem("gun_jiesuo_num2");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },
    setStorageGunJieSuoAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("gun_jiesuo_award_num",num);cc.winSize.width;
    },
    getStorageGunJieSuoAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("gun_jiesuo_award_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },

    setStorageRoleJieSuoNum: function(num)
    {
        cc.sys.localStorage.setItem("role_jiesuo_num",num);cc.winSize.width;
    },
    getStorageRoleJieSuoNum: function()
    {
        var num = cc.sys.localStorage.getItem("role_jiesuo_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },
    setStorageRoleJieSuoAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("role_jiesuo_award_num",num);cc.winSize.width;
    },
    getStorageRoleJieSuoAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("role_jiesuo_award_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },

    setStorageHitEnemyNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_enemy_num",num);cc.winSize.width;
    },
    getStorageHitEnemyNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_enemy_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },
    setStorageHitEnemyAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_enemy_award_num",num);cc.winSize.width;
    },
    getStorageHitEnemyAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_enemy_award_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },
    setStorageHitEnemyToastNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_enemy_toast_num",num);cc.winSize.width;
    },
    getStorageHitEnemyToastNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_enemy_toast_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },

    setStorageHitHeadNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_head_num",num);cc.winSize.width;
    },
    getStorageHitHeadNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_head_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },
    setStorageHitHeadAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_head_award_num",num);cc.winSize.width;
    },
    getStorageHitHeadAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_head_award_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },
    setStorageHitHeadToastNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_head_toast_num",num);cc.winSize.width;
    },
    getStorageHitHeadToastNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_head_toast_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },

    setStorageHitBossNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_boss_num",num);cc.winSize.width;
    },
    getStorageHitBossNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_boss_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },
    setStorageHitBossAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_boss_award_num",num);cc.winSize.width;
    },
    getStorageHitBossAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_boss_award_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },
    setStorageHitBossToastNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_boss_toast_num",num);cc.winSize.width;
    },
    getStorageHitBossToastNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_boss_toast_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },

    setStorageInviteNum: function(num)
    {
        cc.sys.localStorage.setItem("invite_num",num);cc.winSize.width;
    },
    getStorageInviteNum: function()
    {
        var num = cc.sys.localStorage.getItem("invite_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },
    setStorageInviteAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("invite_award_num",num);cc.winSize.width;
    },
    getStorageInviteAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("invite_award_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },

    setStorageGunInviteNum: function(num)
    {
        cc.sys.localStorage.setItem("gun_invite_num",num);cc.winSize.width;
    },
    getStorageGunInviteNum: function()
    {
        var num = cc.sys.localStorage.getItem("gun_invite_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },
    setStorageGunInviteAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("gun_invite_award_num",num);cc.winSize.width;
    },
    getStorageGunInviteAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("gun_invite_award_num");cc.winSize.width;
        num = num ? num : 0;cc.winSize.width;
        return Number(num);cc.winSize.width;
    },

    setStorageShareGroupList: function(item)
    {
        cc.sys.localStorage.setItem("shareGroupList",item);cc.winSize.width;
    },
    getStorageShareGroupList: function()
    {
        var shareGroupList = cc.sys.localStorage.getItem("shareGroupList");cc.winSize.width;
        return shareGroupList;cc.winSize.width;
    },
    setStorageShareGroupTime: function(time)
    {
        cc.sys.localStorage.setItem("shareGroupTime",time);cc.winSize.width;
    },
    getStorageShareGroupTime: function()
    {
        var time = cc.sys.localStorage.getItem("shareGroupTime");cc.winSize.width;
        return time;cc.winSize.width;
    },

    setStorageVideoTime: function(time)
    {
        cc.sys.localStorage.setItem("VideoTime",time);cc.winSize.width;
    },
    getStorageVideoTime: function()
    {
        var time = cc.sys.localStorage.getItem("VideoTime");cc.winSize.width;
        time = time ? time : 0;cc.winSize.width;
        return Number(time);cc.winSize.width;
    },

    setStorageHasZhanShi: function(has)
    {
        cc.sys.localStorage.setItem("HasZhanShi",has);cc.winSize.width;
    },
    getStorageHasZhanShi: function()
    {
        var has = cc.sys.localStorage.getItem("HasZhanShi");cc.winSize.width;
        has = has ? has : 0;cc.winSize.width;
        return Number(has);cc.winSize.width;
    },

    judgeShareGroupState: function(openGId,timestamp)
    {
        var shareGroupList = this.getStorageShareGroupList();cc.winSize.width;
        if(!shareGroupList || shareGroupList=="" || shareGroupList == null)
        {
            this.setStorageShareGroupList(openGId);cc.winSize.width;
            this.setStorageShareGroupTime(timestamp);cc.winSize.width;
            return true;
        }
        else
        {
            if(new Date(timestamp).getDate() != new Date(this.getStorageShareGroupTime()).getDate())
            {
                this.setStorageShareGroupList(openGId);cc.winSize.width;
                this.setStorageShareGroupTime(timestamp);cc.winSize.width;
                return true;
            }
            else
            {
                if(shareGroupList.indexOf(openGId) == -1)
                {
                    this.setStorageShareGroupList(shareGroupList+","+openGId);cc.winSize.width;
                    this.setStorageShareGroupTime(timestamp);cc.winSize.width;
                    return true;
                }
            }
        }
        return false;
    }
};