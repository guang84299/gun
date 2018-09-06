/**
 * Created by guang on 18/7/19.
 */
module.exports = {
    ws: null,
    //ip: "wss://0a8ce26f.com",
    ip: "ws://192.168.129.110:9123",
    //ip: "wss://e26f.cn",
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
        if(this.ws == null)
        {
            this.ws = new WebSocket(this.ip);
            var self = this;
            this.ws.onopen = function (event) {
                 console.log("Send Text WS was opened.");
                 if(callback)
                    callback();
             };
            this.ws.onmessage = function (event) {
                 self.parse(event.data);
             };
            this.ws.onerror = function (event) {
                 console.log("Send Text fired an error");
             };
            this.ws.onclose = function (event) {
                 console.log("WebSocket instance closed.");
             };
        }
    },

    close: function()
    {
        if(this.ws)
        {
            this.ws.close();
            this.ws = null;
        }
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
        this.send(this.MODE_USER_LOGIN,body);
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
        var body = {};
        this.send(this.MODE_USER_HERTBEAT,body);
    },
    heartBeatResult: function(result)
    {
        var data = JSON.parse(result);
        console.log(data);
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
            this.send(this.MODE_USER_MATCH,body);
        }
    },

    matchResult: function(result)
    {
        var data = JSON.parse(result);
        this.pk.match(data);

        console.log(data);
    },

    matchRoom: function()
    {
        if(this.state == 1)
        {
            var body = {};
            this.send(this.MODE_USER_MATCHROOM,body);
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
        this.send(this.MODE_GAME_QUESTLEAVEROOM,body);
    },

    questLeaveRoomResult: function(result)
    {
        var data = JSON.parse(result);
        this.pk.questLeave(data);
    },

    startGame: function()
    {
        var body = {};
        this.send(this.MODE_GAME_STARTGAME,body);
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
        this.send(this.MODE_GAME_MOVE,body);
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
        this.send(this.MODE_GAME_ROTATE,body);
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
        this.send(this.MODE_GAME_ATTACK,body);
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
        this.send(this.MODE_GAME_BULLETCOLLISION,body);
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
            this.send(this.MODE_USER_AGAIN,body);
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

    updateUser: function(jscore)
    {
        if(this.state == 1)
        {
            var body = {};
            body.jscore = jscore;
            this.send(this.MODE_USER_UPDATEUSER,body);
        }
    }
};