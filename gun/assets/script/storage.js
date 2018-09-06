/**
 * Created by guang on 18/7/19.
 */
module.exports = {
    playMusic: function(music)
    {
        if(this.getStorageMusic() == 1)
            cc.audioEngine.play(music,true,0.6);
    },

    pauseMusic: function()
    {
        if(this.getStorageMusic() == 1)
            cc.audioEngine.pauseAll();
    },

    resumeMusic: function()
    {
        if(this.getStorageMusic() == 1)
            cc.audioEngine.resumeAll();
    },

    stopMusic: function()
    {
        cc.audioEngine.stopAll();
    },

    playSound: function(sound)
    {
        if(this.getStorageSound() == 1)
            cc.audioEngine.play(sound,false,1);
    },

    preloadSound: function()
    {
        cc.audioEngine.preload(this.audio_coin);
        cc.audioEngine.preload(this.audio_gun_1);
        cc.audioEngine.preload(this.audio_hit_head);
        cc.audioEngine.preload(this.audio_hit_torso);
    },
    setStorageCoin: function(coin)
    {
        cc.sys.localStorage.setItem("coin",coin);
    },
    getStorageCoin: function()
    {
        var coin = cc.sys.localStorage.getItem("coin");
        coin = coin ? coin : 0;
        return Number(coin);
    },

    setStorageScore: function(score)
    {
        cc.sys.localStorage.setItem("highscore",score);
    },
    getStorageScore: function()
    {
        var currscore = cc.sys.localStorage.getItem("highscore");
        currscore = currscore ? currscore : 0;
        return Number(currscore);
    },

    setStorageJScore: function(jscore)
    {
        cc.sys.localStorage.setItem("jscore",jscore);
        if(jscore>this.getStorageMaxJScore())
        {
            this.setStorageMaxJScore(jscore);
        }
    },
    getStorageJScore: function()
    {
        var currscore = cc.sys.localStorage.getItem("jscore");
        currscore = currscore ? currscore : 0;
        return Number(currscore);
    },

    setStorageMaxJScore: function(jscore)
    {
        cc.sys.localStorage.setItem("maxjscore",jscore);
    },
    getStorageMaxJScore: function()
    {
        var currscore = cc.sys.localStorage.getItem("maxjscore");
        currscore = currscore ? currscore : 0;
        return Number(currscore);
    },


    setStorageWinNum: function(winNum)
    {
        cc.sys.localStorage.setItem("winNum",winNum);
    },
    getStorageWinNum: function()
    {
        var winNum = cc.sys.localStorage.getItem("winNum");
        winNum = winNum ? winNum : 0;
        return Number(winNum);
    },

    setStorageCurrPlayer: function(id)
    {
        cc.sys.localStorage.setItem("currPlayer",id);
    },
    getStorageCurrPlayer: function()
    {
        var currPlayer = cc.sys.localStorage.getItem("currPlayer");
        currPlayer = currPlayer ? currPlayer : 1;
        return Number(currPlayer);
    },

    setStoragePlayer: function(id,val)
    {
        cc.sys.localStorage.setItem("player_"+id,val == 0 ? 0 : 1);
    },
    getStoragePlayer: function(id)
    {
        var player = cc.sys.localStorage.getItem("player_"+id);
        player = player ? player : 0;
        return Number(player);
    },

    setStorageCurrGun: function(id)
    {
        cc.sys.localStorage.setItem("currGun",id);
    },
    getStorageCurrGun: function()
    {
        var currGun = cc.sys.localStorage.getItem("currGun");
        currGun = currGun ? currGun : 1;
        return Number(currGun);
    },

    setStorageCurrPkGun: function(id)
    {
        cc.sys.localStorage.setItem("currPkGun",id);
        var currGun = cc.sys.localStorage.getItem("currPkGun");
    },
    getStorageCurrPkGun: function()
    {
        var currGun = cc.sys.localStorage.getItem("currPkGun");
        currGun = currGun ? currGun : 1;
        return Number(currGun);
    },

    setStorageGun: function(id,val)
    {
        cc.sys.localStorage.setItem("gun_"+id,val == 0 ? 0 : 1);
    },
    getStorageGun: function(id)
    {
        var gun = cc.sys.localStorage.getItem("gun_"+id);
        gun = gun ? gun : 0;
        return Number(gun);
    },

    setStorageQianDao: function(day)
    {
        cc.sys.localStorage.setItem("qiandao",day);
    },
    getStorageQianDao: function()
    {
        var day = cc.sys.localStorage.getItem("qiandao");
        day = day ? day : 0;
        return Number(day);
    },
    setStorageQianDaoTime: function(time)
    {
        cc.sys.localStorage.setItem("qiandaotime",time);
    },
    getStorageQianDaoTime: function()
    {
        var time = cc.sys.localStorage.getItem("qiandaotime");
        time = time ? time : 0;
        return Number(time);
    },

    setStorageMusic: function(music)
    {
        cc.sys.localStorage.setItem("music",music);
    },
    getStorageMusic: function()
    {
        var music = cc.sys.localStorage.getItem("music");
        music = music ? music : 0;
        return Number(music);
    },

    setStorageSound: function(sound)
    {
        cc.sys.localStorage.setItem("sound",sound);
    },
    getStorageSound: function()
    {
        var sound = cc.sys.localStorage.getItem("sound");
        sound = sound ? sound : 0;
        return Number(sound);
    },

    setStorageVibrate: function(vibrate)
    {
        cc.sys.localStorage.setItem("vibrate",vibrate);
    },
    getStorageVibrate: function()
    {
        var vibrate = cc.sys.localStorage.getItem("vibrate");
        vibrate = vibrate ? vibrate : 0;
        return Number(vibrate);
    },

    setStorageFirst: function(first)
    {
        cc.sys.localStorage.setItem("first",first);
    },
    getStorageFirst: function()
    {
        var vibrate = cc.sys.localStorage.getItem("first");
        vibrate = vibrate ? vibrate : 0;
        return Number(vibrate);
    },

    setStorageCard: function(card)
    {
        cc.sys.localStorage.setItem("card",card);
    },
    getStorageCard: function()
    {
        var card = cc.sys.localStorage.getItem("card");
        card = card ? card : 0;
        return Number(card);
    },

    setStorageYindao: function(yindao)
    {
        cc.sys.localStorage.setItem("yindao",yindao);
    },
    getStorageYindao: function()
    {
        var yindao = cc.sys.localStorage.getItem("yindao");
        yindao = yindao ? yindao : 0;
        return Number(yindao);
    },

    setStorageGunJieSuoNum: function(num)
    {
        cc.sys.localStorage.setItem("gun_jiesuo_num",num);
    },
    getStorageGunJieSuoNum: function()
    {
        var num = cc.sys.localStorage.getItem("gun_jiesuo_num");
        num = num ? num : 0;
        return Number(num);
    },
    setStorageGunJieSuoNum2: function(num)
    {
        cc.sys.localStorage.setItem("gun_jiesuo_num2",num);
    },
    getStorageGunJieSuoNum2: function()
    {
        var num = cc.sys.localStorage.getItem("gun_jiesuo_num2");
        num = num ? num : 0;
        return Number(num);
    },
    setStorageGunJieSuoAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("gun_jiesuo_award_num",num);
    },
    getStorageGunJieSuoAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("gun_jiesuo_award_num");
        num = num ? num : 0;
        return Number(num);
    },

    setStorageRoleJieSuoNum: function(num)
    {
        cc.sys.localStorage.setItem("role_jiesuo_num",num);
    },
    getStorageRoleJieSuoNum: function()
    {
        var num = cc.sys.localStorage.getItem("role_jiesuo_num");
        num = num ? num : 0;
        return Number(num);
    },
    setStorageRoleJieSuoNum2: function(num)
    {
        cc.sys.localStorage.setItem("role_jiesuo_num2",num);
    },
    getStorageRoleJieSuoNum2: function()
    {
        var num = cc.sys.localStorage.getItem("role_jiesuo_num2");
        num = num ? num : 0;
        return Number(num);
    },
    setStorageRoleJieSuoAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("role_jiesuo_award_num",num);
    },
    getStorageRoleJieSuoAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("role_jiesuo_award_num");
        num = num ? num : 0;
        return Number(num);
    },

    setStorageHitEnemyNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_enemy_num",num);
    },
    getStorageHitEnemyNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_enemy_num");
        num = num ? num : 0;
        return Number(num);
    },
    setStorageHitEnemyAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_enemy_award_num",num);
    },
    getStorageHitEnemyAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_enemy_award_num");
        num = num ? num : 0;
        return Number(num);
    },
    setStorageHitEnemyToastNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_enemy_toast_num",num);
    },
    getStorageHitEnemyToastNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_enemy_toast_num");
        num = num ? num : 0;
        return Number(num);
    },

    setStorageHitHeadNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_head_num",num);
    },
    getStorageHitHeadNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_head_num");
        num = num ? num : 0;
        return Number(num);
    },
    setStorageHitHeadAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_head_award_num",num);
    },
    getStorageHitHeadAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_head_award_num");
        num = num ? num : 0;
        return Number(num);
    },
    setStorageHitHeadToastNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_head_toast_num",num);
    },
    getStorageHitHeadToastNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_head_toast_num");
        num = num ? num : 0;
        return Number(num);
    },

    setStorageHitBossNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_boss_num",num);
    },
    getStorageHitBossNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_boss_num");
        num = num ? num : 0;
        return Number(num);
    },
    setStorageHitBossAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_boss_award_num",num);
    },
    getStorageHitBossAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_boss_award_num");
        num = num ? num : 0;
        return Number(num);
    },
    setStorageHitBossToastNum: function(num)
    {
        cc.sys.localStorage.setItem("hit_boss_toast_num",num);
    },
    getStorageHitBossToastNum: function()
    {
        var num = cc.sys.localStorage.getItem("hit_boss_toast_num");
        num = num ? num : 0;
        return Number(num);
    },

    setStorageInviteNum: function(num)
    {
        cc.sys.localStorage.setItem("invite_num",num);
    },
    getStorageInviteNum: function()
    {
        var num = cc.sys.localStorage.getItem("invite_num");
        num = num ? num : 0;
        return Number(num);
    },
    setStorageInviteAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("invite_award_num",num);
    },
    getStorageInviteAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("invite_award_num");
        num = num ? num : 0;
        return Number(num);
    },

    setStorageGunInviteNum: function(num)
    {
        cc.sys.localStorage.setItem("gun_invite_num",num);
    },
    getStorageGunInviteNum: function()
    {
        var num = cc.sys.localStorage.getItem("gun_invite_num");
        num = num ? num : 0;
        return Number(num);
    },
    setStorageGunInviteAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("gun_invite_award_num",num);
    },
    getStorageGunInviteAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("gun_invite_award_num");
        num = num ? num : 0;
        return Number(num);
    },

    setStorageWinNumAwardNum: function(num)
    {
        cc.sys.localStorage.setItem("winNum_award_num",num);
    },
    getStorageWinNumAwardNum: function()
    {
        var num = cc.sys.localStorage.getItem("winNum_award_num");
        num = num ? num : 0;
        return Number(num);
    },

    setStorageShareGroupList: function(item)
    {
        cc.sys.localStorage.setItem("shareGroupList",item);
    },
    getStorageShareGroupList: function()
    {
        var shareGroupList = cc.sys.localStorage.getItem("shareGroupList");
        return shareGroupList;
    },
    setStorageShareGroupTime: function(time)
    {
        cc.sys.localStorage.setItem("shareGroupTime",time);
    },
    getStorageShareGroupTime: function()
    {
        var time = cc.sys.localStorage.getItem("shareGroupTime");
        return time;
    },

    setStorageVideoTime: function(time)
    {
        cc.sys.localStorage.setItem("VideoTime",time);
    },
    getStorageVideoTime: function()
    {
        var time = cc.sys.localStorage.getItem("VideoTime");
        time = time ? time : 0;
        return Number(time);
    },

    setStorageHasZhanShi: function(has)
    {
        cc.sys.localStorage.setItem("HasZhanShi",has);
    },
    getStorageHasZhanShi: function()
    {
        var has = cc.sys.localStorage.getItem("HasZhanShi");
        has = has ? has : 0;
        return Number(has);
    },

    setStorageLevel: function(level)
    {
        cc.sys.localStorage.setItem("level",level);
    },
    getStorageLevel: function()
    {
        var level = cc.sys.localStorage.getItem("level");
        level = level ? level : 0;
        return Number(level);
    },

    judgeShareGroupState: function(openGId,timestamp)
    {
        var shareGroupList = this.getStorageShareGroupList();
        if(!shareGroupList || shareGroupList=="" || shareGroupList == null)
        {
            this.setStorageShareGroupList(openGId);
            this.setStorageShareGroupTime(timestamp);
            return true;
        }
        else
        {
            if(new Date(timestamp).getDate() != new Date(this.getStorageShareGroupTime()).getDate())
            {
                this.setStorageShareGroupList(openGId);
                this.setStorageShareGroupTime(timestamp);
                return true;
            }
            else
            {
                if(shareGroupList.indexOf(openGId) == -1)
                {
                    this.setStorageShareGroupList(shareGroupList+","+openGId);
                    this.setStorageShareGroupTime(timestamp);
                    return true;
                }
            }
        }
        return false;
    }
};