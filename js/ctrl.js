var Starting = true;
var map = {
    "DivObject":Array(64),
    "Count":Array(64)
};
var Player = document.createElement("div");

var PlayerLeft = 0.0;
var PlayerHigh = 0.0;
var PlayerHSpeed = 0.0;

var Score = {
    "Div":document.getElementById("Score").innerHTML,
    "Num":0
};


var OnGround = true;

function Start2048(){
    if(Starting){
        Score.Num = 0;
        document.getElementById("PLAY").appendChild(Player);
        Player.setAttribute("style","width:75px;height:75px;background:blue;position:absolute;z-index:50;margin-top: 565px;margin-left: 282.5px;")
        Player.id = "Player";
        for(var i = 0;i < 64;i++){
        map.DivObject[i] = document.createElement("div");
        map.DivObject[i].setAttribute("style","width:11.71875%;height:11.71875%;background:grey;float:left;margin:2.5px;");
        // map[i].innerHTML = "<div class='new'>1</div>";
        // map[i].class = "";
        document.getElementById("PLAY").appendChild(map.DivObject[i]);
        map.Count[i] = 0;
        }
        Starting = false;
        Score.Div = "<h3>你的分数：</h3>" + Score.Num;
        document.getElementById("Score").innerHTML = Score.Div;
    }
    
}

function Move(To){
    if(To == 1){//W
        if(PlayerHSpeed >= 0.0 && PlayerHigh >= -565){
            document.getElementById("Player").style.marginTop = (PlayerHigh -= PlayerHSpeed) + 565 + "px";
            
            PlayerHSpeed -= 0.049*PlayerHSpeed;
        }
    }else if(To == 2){//A
        document.getElementById("Player").style.marginLeft = (PlayerLeft -= 2.5) + 282.5 + "px";
    }else if(To == 3){
        document.getElementById("Player").style.marginLeft = (PlayerLeft += 2.5) + 282.5 + "px";
    }else{

    }
    
}


var Speed = 0;
var Second = 0;
setInterval(function (){
    Second++;
    if(PlayerHigh < 0){
        document.getElementById("Player").style.marginTop = ((PlayerHigh += (Speed += Second*0.49))+565) + "px";
        console.log(PlayerHigh);
        if(PlayerHigh > 0){
            PlayerHigh = 0;
            document.getElementById("Player").style.marginTop = "565px";
        }
        OnGround = false;
    }else{
        Speed = 0;
        Second = 0;
        OnGround = true;
    }
},25);


// setInterval(function (){
    
// },);


document.onkeydown=function E(key) {
    console.log(key.keyCode);
    if(key.keyCode == 87||key.keyCode == 32){//W
        if(PlayerHigh > -565.0){
            for(PlayerHSpeed = 10.0;(PlayerHSpeed > 0.0)&&OnGround;PlayerHSpeed -= 0.2175){
                setTimeout(Move(1),5);
            }
            PlayerHSpeed = 0.0;
            PlayerHigh = (PlayerHigh<-565)?-565:PlayerHigh;
        }
    }else if(key.keyCode == 83){
        Move(4);
    }else if(key.keyCode == 65){//A
        if(PlayerLeft > -282.5){
            Move(2);Move(2);Move(2);Move(2);Move(2);
            document.getElementById("Player").style.marginLeft = (282.5 + (PlayerLeft = (PlayerLeft > -282.5)?PlayerLeft:-282.5)) + "px";
        }
    }else if(key.keyCode == 68){//D
        if(PlayerLeft < 282.5){
            Move(3);Move(3);Move(3);Move(3);Move(3);
            document.getElementById("Player").style.marginLeft = (282.5 + (PlayerLeft = (PlayerLeft < 282.5)?PlayerLeft:282.5)) + "px";
        }
    }
};

function sleep(delay) {
    var start = (new Date()).getTime();
    while((new Date()).getTime() - start < delay) {
        continue;
    }
}

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

//虚拟键
var KeyBoard;
if(IsPC() == false){
    KeyBoard = document.createElement("div");
    KeyBoard.id = "KeyBoard";
    document.body.appendChild(KeyBoard);
}
