/**
 * Created by guang on 18/7/19.
 */
module.exports = {
    ws: null,
    ip: "ws://wsqqplay.0a8ce26f.com",
    //ip: "ws://192.168.129.110:9123",
    //ip: "ws://wsqqplay.e26f.cn",

    state: 0,//状态 0：未登录 1：登录成功
    pk: null,
    logincallback: null,
    //用户模块
    MODE_USER_LOGIN : "GModeUser_login",
    MODE_USER_HERTBEAT : "GModeUser_heartBeat",
    MODE_USER_MATCH : "GModeUser_match",
    MODE_USER_MATCHROOM : "GModeUser_matchRoom",
    MODE_USER_RECCONN : "GModeUser_recConn",
    MODE_USER_AGAIN : "GModeUser_again",
    MODE_USER_UPDATEUSER : "GModeUser_updateUser",

    MODE_USER_LOGIN_RESULT : "GModeUser_loginResult",
    MODE_USER_HERTBEAT_RESULT : "GModeUser_heartBeatResult",
    MODE_USER_MATCH_RESULT : "GModeUser_matchResult",
    MODE_USER_MATCHEND_RESULT: "GModeUser_matchEndResult",
    MODE_USER_RECCONN_RESULT : "GModeUser_recConnResult",
    MODE_USER_AGAIN_RESULT : "GModeUser_againResult",

    //游戏模块
    MODE_GAME_STARTGAME : "GModeGame_startGame",
    MODE_GAME_MOVE : "GModeGame_move",
    MODE_GAME_ROTATE : "GModeGame_rotate",
    MODE_GAME_ROOMCOUNTDOWN : "GModeGame_roomCountDown",
    MODE_GAME_ROOMTIMEOUT : "GModeGame_roomTimeOut",
    MODE_GAME_LEAVEROOM : "GModeGame_leaveRoom",
    MODE_GAME_QUESTLEAVEROOM : "GModeGame_questLeaveRoom",
    MODE_GAME_ATTACK : "GModeGame_attack",
    MODE_GAME_BULLETCOLLISION : "GModeGame_bulletCollision",

    MODE_GAME_STARTGAME_RESULT : "GModeGame_startGameResult",
    MODE_GAME_JOINROOM_RESULT : "GModeGame_joinRoomResult",
    MODE_GAME_MOVE_RESULT : "GModeGame_moveResult",
    MODE_GAME_ROTATE_RESULT : "GModeGame_rotateResult",
    MODE_GAME_ROOMCOUNTDOWN_RESULT : "GModeGame_roomCountDownResult",
    MODE_GAME_ROOMTIMEOUT_RESULT : "GModeGame_roomTimeOutResult",
    MODE_GAME_LEAVEROOM_RESULT : "GModeGame_leaveRoomResult",
    MODE_GAME_QUESTLEAVEROOM_RESULT : "GModeGame_questLeaveRoomResult",
    MODE_GAME_ATTACKL_RESULT : "GModeGame_attackResult",
    MODE_GAME_BULLETCOLLISION_RESULT : "GModeGame_bulletCollisionResult",
    init: function(pk,callback)
    {
        this.pk = pk;
        if(callback)
            callback();
        //if(this.pk.publish == 1)
        //    this.ip = this.ip1;
        //else
        //    this.ip = this.ip2;
        //if(this.ws == null)
        //{
        //    this.ws = new WebSocket(this.ip);
        //    var self = this;
        //    this.ws.onopen = function (event) {
        //         console.log("Send Text WS was opened.");
        //         if(callback)
        //            callback();
        //     };
        //    this.ws.onmessage = function (event) {
        //         self.parse(event.data);
        //     };
        //    this.ws.onerror = function (event) {
        //         console.log("Send Text fired an error");
        //     };
        //    this.ws.onclose = function (event) {
        //         console.log("WebSocket instance closed.");
        //     };
        //}
    },

    close: function()
    {
        //if(this.ws)
        //{
        //    this.ws.close();
        //    this.ws = null;
        //}
    },

    reader : { 
          readAs: function(type,blob,cb){
            var r = new FileReader();
            r.onloadend = function(){
              if(typeof(cb) === 'function') {
                cb.call(r,r.result);
              }
            }
            try{
              r['readAs'+type](blob);
            }catch(e){}
          }
    },
    parse: function(data)
    {
        
        // var stringVar;
        // reader.readAs('ArrayBuffer',data.slice(0,2),function(arr){
        //     shortVar = (new Int16Array(arr))[0];
        //     console.log(shortVar);
        //   });
        // reader.readAs('ArrayBuffer',data.slice(2,6),function(arr){
        //     intVar = (new Int32Array(arr))[0];
        //     console.log(intVar);
        //   });
        if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
        {
            var unit8Arr = new Uint8Array(data) ;
            var encodedString = String.fromCharCode.apply(null, unit8Arr);
            var str = decodeURIComponent(escape((encodedString)));

            //var dataview = new DataView(data);
            //console.log("---1---");
            //var ints = new Uint8Array(data.byteLength);
            //console.log("---2---");
            //var str = '';
            //for (var i = 0; i < ints.length; i++) {
            //    str += String.fromCharCode(dataview.getUint8(i));
            //}
            console.log(str);
            var sd = JSON.parse(str);
            var fun = sd.mode.split("_")[1];
            var body = sd.body;
            if(fun == "loginResult")
                this.loginResult(body);
            else if(fun == "heartBeatResult")
                this.heartBeatResult(body);
            else if(fun == "matchResult")
                this.matchResult(body);
            else if(fun == "matchEndResult")
                this.matchEndResult(body);
            else if(fun == "joinRoomResult")
                this.joinRoomResult(body);
            else if(fun == "questLeaveRoomResult")
                this.questLeaveRoomResult(body);
            else if(fun == "startGameResult")
                this.startGameResult(body);
            else if(fun == "roomCountDownResult")
                this.roomCountDownResult(body);
            else if(fun == "roomTimeOutResult")
                this.roomTimeOutResult(body);

            else if(fun == "moveResult")
                this.moveResult(body);
            else if(fun == "rotateResult")
                this.rotateResult(body);
            else if(fun == "attackResult")
                this.attackResult(body);
            else if(fun == "bulletCollisionResult")
                this.bulletCollisionResult(body);
            else if(fun == "leaveRoomResult")
                this.leaveRoomResult(body);
            else if(fun == "againResult")
                this.againResult(body);
            //eval("self."+fun+"('"+body+"')");
        }
        else
        {
            var self = this;
            this.reader.readAs('Text',data.slice(0,data.size,'text/plain;charset=UTF-8'),function(result){
                console.log(result);
                var sd = JSON.parse(result);
                var fun = sd.mode.split("_")[1];
                var body = sd.body;
                eval("self."+fun+"('"+body+"')");
                // eval("showme('"+a+"','"+b+"')");
            });
        }


    },

    send: function(protocol,body)
    {
        if (this.ws.readyState === WebSocket.OPEN) {

            var data = {};
            data.mode = protocol;
            data.body = JSON.stringify(body);

            this.ws.send(JSON.stringify(data)+'\r');
        }
        else {
            this.state = 0;
             console.log("WebSocket instance wasn't ready...");
        }
    },

    login: function(uid,nick,avatarUrl,callback)
    {
        this.logincallback = callback;
        var body = {};
        body.uid = uid;
        body.nick = nick;
        body.avatarUrl = avatarUrl;
        body.result = true;
        //this.send(this.MODE_USER_LOGIN,body);
        this.loginResult(JSON.stringify(body));
    },

    loginResult: function(result)
    {
        var data = JSON.parse(result);
        if(data.result)
        {
            this.state = 1;
            if(this.logincallback)
                this.logincallback();
        }

        console.log(data);
    },

    heartBeat: function()
    {
        //var body = {};
        //this.send(this.MODE_USER_HERTBEAT,body);
    },
    heartBeatResult: function(result)
    {
        //var data = JSON.parse(result);
        //console.log(data);
    },

    match: function(type,skinId,gunId,roomId)
    {
        if(this.state == 1)
        {
            var body = {};
            body.type = type;
            body.skinId = skinId;
            body.gunId = gunId;
            body.roomId = roomId;
            //this.send(this.MODE_USER_MATCH,body);

            this.matchResult(JSON.stringify(body));
        }
    },

    matchResult: function(result)
    {
        var data = JSON.parse(result);
        this.pk.match(data);

        console.log(data);

        var self = this;
        var r = Math.random()*6+1;
        console.log(r);
        this.pk.node.runAction(cc.sequence(
            cc.delayTime(r),
            cc.callFunc(function(){
                self.initPlayerData(data.type);
            })
        ));

    },

    initPlayerData: function(type)
    {
        var self = this;
        var body = {};
        if(type == 1)
        {
            body.result = true;
            body.roomType = 1;
            body.playerA = {};
            body.playerA.rotate = 0;
            body.playerA.avatarUrl = this.pk.qianqista.avatarUrl;
            body.playerA.maxJscore = this.pk.storage.getStorageMaxJScore();
            body.playerA.hp = 50;
            body.playerA.skinId = this.pk.main.GAME.currPlayer;
            body.playerA.matchRoomId = 0;
            body.playerA.matchTime = 0;
            body.playerA.sessionId = 0;
            body.playerA.jscore = this.pk.storage.getStorageJScore();
            body.playerA.roomId = 1;
            body.playerA.robot = 0;
            body.playerA.uid = this.pk.qianqista.openid;
            body.playerA.pos = 1;
            body.playerA.name = this.pk.qianqista.userName;
            body.playerA.gunId = this.pk.currPkGun;
            body.playerA.y = 0;
            body.playerA.state = 0;
            body.playerA.roomType = 1;


            body.playerB = {};
            body.playerB.rotate = 0;
            body.playerB.avatarUrl = cc.url.raw("resources/avatar/1.jpg");
            body.playerB.maxJscore = 0;
            body.playerB.hp = 50;
            body.playerB.skinId = this.randSkinId();
            body.playerB.matchRoomId = 0;
            body.playerB.matchTime = 0;
            body.playerB.sessionId = 0;
            body.playerB.jscore = 0;
            body.playerB.roomId = 1;
            body.playerB.robot = 1;
            body.playerB.uid = "robot001";
            body.playerB.pos = 2;
            body.playerB.name = "小猪佩奇";
            body.playerB.gunId = this.randGunId();
            body.playerB.y = 0;
            body.playerB.state = 0;
            body.playerB.roomType = 1;

            this.pk.qianqista.randRobot(function(res){
                //body.playerB.avatarUrl = res.data.avatarUrl;
                if(res.data.avatarUrl)
                {
                    var num = res.data.avatarUrl.split(".jpg")[0];
                    num = num.split("avatar/")[1];
                    body.playerB.avatarUrl = cc.url.raw("resources/avatar/"+num+".jpg");
                }
                body.playerB.name = res.data.name;
                self.joinRoomResult(JSON.stringify(body));
            });

        }
        else
        {

            body.result = true;
            body.roomType = 3;
            body.playerA = {};
            body.playerA.rotate = 0;
            body.playerA.avatarUrl = this.pk.qianqista.avatarUrl;
            body.playerA.maxJscore = this.pk.storage.getStorageMaxJScore();
            body.playerA.hp = 50;
            body.playerA.skinId = this.pk.main.GAME.currPlayer;
            body.playerA.matchRoomId = 0;
            body.playerA.matchTime = 0;
            body.playerA.sessionId = 0;
            body.playerA.jscore = this.pk.storage.getStorageJScore();
            body.playerA.roomId = 1;
            body.playerA.robot = 0;
            body.playerA.uid = this.pk.qianqista.openid;
            body.playerA.pos = 1;
            body.playerA.name = this.pk.qianqista.userName;
            body.playerA.gunId = this.pk.currPkGun;
            body.playerA.y = 0;
            body.playerA.state = 0;
            body.playerA.roomType = 1;


            body.playerB = {};
            body.playerB.rotate = 0;
            body.playerB.avatarUrl = cc.url.raw("resources/avatar/1.jpg");
            body.playerB.maxJscore = 0;
            body.playerB.hp = 50;
            body.playerB.skinId = this.randSkinId();
            body.playerB.matchRoomId = 0;
            body.playerB.matchTime = 0;
            body.playerB.sessionId = 0;
            body.playerB.jscore = 0;
            body.playerB.roomId = 1;
            body.playerB.robot = 1;
            body.playerB.uid = "robot001";
            body.playerB.pos = 2;
            body.playerB.name = "小猪佩奇";
            body.playerB.gunId = this.randGunId();
            body.playerB.y = 0;
            body.playerB.state = 0;
            body.playerB.roomType = 3;

            body.playerC = {};
            body.playerC.rotate = 0;
            body.playerC.avatarUrl = cc.url.raw("resources/avatar/1.jpg");
            body.playerC.maxJscore = 0;
            body.playerC.hp = 50;
            body.playerC.skinId = this.randSkinId();
            body.playerC.matchRoomId = 0;
            body.playerC.matchTime = 0;
            body.playerC.sessionId = 0;
            body.playerC.jscore = 0;
            body.playerC.roomId = 1;
            body.playerC.robot = 1;
            body.playerC.uid = "robot002";
            body.playerC.pos = 3;
            body.playerC.name = "小猪佩奇";
            body.playerC.gunId = this.randGunId();
            body.playerC.y = 0;
            body.playerC.state = 0;
            body.playerC.roomType = 3;

            body.playerD = {};
            body.playerD.rotate = 0;
            body.playerD.avatarUrl = cc.url.raw("resources/avatar/1.jpg");
            body.playerD.maxJscore = 0;
            body.playerD.hp = 50;
            body.playerD.skinId = this.randSkinId();
            body.playerD.matchRoomId = 0;
            body.playerD.matchTime = 0;
            body.playerD.sessionId = 0;
            body.playerD.jscore = 0;
            body.playerD.roomId = 1;
            body.playerD.robot = 1;
            body.playerD.uid = "robot003";
            body.playerD.pos = 4;
            body.playerD.name = "小猪佩奇";
            body.playerD.gunId = this.randGunId();
            body.playerD.y = 0;
            body.playerD.state = 0;
            body.playerD.roomType = 3;

            this.pk.qianqista.randRobot(function(res){
                //body.playerB.avatarUrl = res.data.avatarUrl;
                if(res.data.avatarUrl)
                {
                    var num = res.data.avatarUrl.split(".jpg")[0];
                    num = num.split("avatar/")[1];
                    body.playerB.avatarUrl = cc.url.raw("resources/avatar/"+num+".jpg");
                }
                body.playerB.name = res.data.name;
                self.pk.qianqista.randRobot(function(res2){
                    //body.playerC.avatarUrl = res2.data.avatarUrl;
                    if(res2.data.avatarUrl)
                    {
                        var num = res2.data.avatarUrl.split(".jpg")[0];
                        num = num.split("avatar/")[1];
                        body.playerC.avatarUrl = cc.url.raw("resources/avatar/"+num+".jpg");
                    }
                    body.playerC.name = res2.data.name;
                    self.pk.qianqista.randRobot(function(res3){
                        //body.playerD.avatarUrl = res3.data.avatarUrl;
                        if(res3.data.avatarUrl)
                        {
                            var num = res3.data.avatarUrl.split(".jpg")[0];
                            num = num.split("avatar/")[1];
                            body.playerD.avatarUrl = cc.url.raw("resources/avatar/"+num+".jpg");
                        }
                        body.playerD.name = res3.data.name;
                        self.joinRoomResult(JSON.stringify(body));
                    });
                });
            });

        }


    },

    randGunId: function()
    {
        var r = Math.random();
        var gunId = 0;
        if(r <= 0.4)
        {
            gunId =  Math.floor(Math.random()*3);
        }
        else if(r > 0.4 && r <= 0.7)
        {
            gunId = Math.floor(Math.random()*3) + 3;
        }
        else if(r > 0.7 && r <= 0.9)
        {
            gunId = Math.floor(Math.random()*3) + 6;
        }
        else if(r > 0.9)
        {
            gunId = Math.floor(Math.random()*9) + 10;
        }
        return gunId;
    },

    randSkinId: function()
    {
        var skinId = 0;
        var r2 = Math.random();
        if(r2 > 0.4)
        {
            skinId = Math.floor(Math.random()*8) + 1;
        }
        return skinId;
    },

    matchRoom: function()
    {
        if(this.state == 1)
        {
            var body = {};
            //this.send(this.MODE_USER_MATCHROOM,body);

            //var data = {};
            //data.body = JSON.stringify(body);
            //this.matchResult(JSON.stringify(data));
        }
    },

    joinRoomResult: function(result)
    {
        var data = JSON.parse(result);
        if(data.result)
        {
            this.pk.joinRoom(data);
        }
        console.log(data);
    },

    matchEndResult: function(result)
    {
        var data = JSON.parse(result);
        if(data.result)
        {
            //this.pk.joinRoom(data);
        }
        console.log(data);
    },

    questLeaveRoom: function(uid)
    {
        var body = {};
        body.uid = uid;
        //this.send(this.MODE_GAME_QUESTLEAVEROOM,body);

        this.questLeaveRoomResult(JSON.stringify(body));
    },

    questLeaveRoomResult: function(result)
    {
        var data = JSON.parse(result);
        this.pk.questLeave(data);
    },

    startGame: function()
    {
        var body = {};
        //this.send(this.MODE_GAME_STARTGAME,body);
        this.startGameResult(JSON.stringify(body));
    },

    startGameResult: function(result)
    {
        this.pk.startGame();
    },

    roomCountDownResult: function(result)
    {
        var data = JSON.parse(result);
        this.pk.roomCountDown(data);
    },

    roomTimeOutResult: function(result)
    {
        this.pk.roomTimeOut();
    },

    move: function(y,uid)
    {
        var body = {};
        body.y = y;
        body.uid = uid;
        //this.send(this.MODE_GAME_MOVE,body);

        this.moveResult(JSON.stringify(body));
    },
    moveResult: function(result)
    {
        var data = JSON.parse(result);
        this.pk.playerMove(data);
    },

    rotate: function(rotate,uid)
    {
        var body = {};
        body.rotate = rotate;
        body.uid = uid;
        //this.send(this.MODE_GAME_ROTATE,body);

        this.rotateResult(JSON.stringify(body));
    },

    rotateResult: function(result)
    {
        var data = JSON.parse(result);
        this.pk.playerRotate(data);
    },

    attack: function(uid)
    {
        var body = {};
        body.uid = uid;
        body.r1 = Math.random();
        body.r2 = Math.random();
        var r3 =  Math.random();
        if(r3>0.5)
            r3 = -r3;
        body.r3 = r3;
        var r4 =  Math.random();
        if(r4>0.5)
            r4 = -r4;
        body.r4 = r4;
        //this.send(this.MODE_GAME_ATTACK,body);

        this.attackResult(JSON.stringify(body));
    },
    attackResult: function(result)
    {
        var data = JSON.parse(result);
        this.pk.attack(data);
    },


    bulletCollision: function(uid,hurt,isHead,diedirX,diedirY)
    {
        var body = {};
        body.uid = uid;
        body.hurt = hurt;
        body.isHead = isHead ? 1 : 0;
        body.diedirX = diedirX;
        body.diedirY = diedirY;

        var playerData = this.pk.findPlayerDataByUid(uid);
        playerData.hp -= hurt;
        if(playerData.hp<0)
            playerData.hp = 0;
        body.hp = playerData.hp;
        //this.send(this.MODE_GAME_BULLETCOLLISION,body);

        this.bulletCollisionResult(JSON.stringify(body));
    },
    bulletCollisionResult: function(result)
    {
        var data = JSON.parse(result);
        this.pk.killEnemy(data);
    },

    leaveRoomResult: function(result)
    {
        var data = JSON.parse(result);
        this.pk.leaveRoom(data);
    },

    again: function(start)
    {
        if(this.state == 1)
        {
            var body = {};
            body.start = start;
            body.result = true;
            if(start == 0)
            {
                if(Math.random()>0.5)
                    body.againType = 2;
                else
                    body.againType = 3;
            }
            else if(start == 1)
            {
                body.againType = 4;
            }
            else
            {
                body.againType = 3;
            }
            //this.send(this.MODE_USER_AGAIN,body);

            this.againResult(JSON.stringify(body));
        }
    },

    againResult: function(result)
    {
        var data = JSON.parse(result);
        if(data.result)
        {
            this.pk.toAgain(data);
        }
        console.log(data);
    },

    updateUser: function(jscore,star,gunId,playerId)
    {
        if(this.state == 1)
        {
            star = star ? star : 0;
            var body = {};
            body.jscore = jscore;
            body.star = star;
            body.gunId = gunId;
            body.playerId = playerId;

            console.log("-------aa---",jscore,gunId,playerId);
            this.pk.qianqista.updateJScore(jscore);
            this.pk.qianqista.updateGunAndSkin(gunId,playerId);
            //this.send(this.MODE_USER_UPDATEUSER,body);
        }
    }
};