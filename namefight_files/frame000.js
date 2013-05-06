var n=2,pro_n=3,barlength=630,speedFactor=5;
var switcher,mainbox,msgbox,bar,cH,cW,oX,fps=0,t=0,threadsafe=false,inBattle=false;
var hk=new Array(n);
var info_o=new Array(n),health_o=new Array(n),strength_o=new Array(n),armor_o=new Array(n),speed_o=new Array(n),luck_o=new Array(n),power_o=new Array(n);
var stat_o=new Array(n),name_o=new Array(n),pro_o=new Array(n),tpoint_o=new Array(n);
var intv_bar=0;

$(document).ready(function(){
	$("#instpanel").css('zIndex',99);
	// 绑定“开始战斗”按钮事件
	$("#switcher").click(function(){
		$("#mesbox").slideUp(500);
		$("#speedbar").fadeOut(500);
			$(".infolist").slideUp(500,function(){
				init();
				createChar();
			});
		$(".infolist").slideToggle('slow',function(){startBattle();});
		$("#mesbox").slideToggle('slow');
		$("#speedbar").fadeIn('slow');
	});
});

function showGame(){
	$('#instbox').slideUp(500,function(){
		$('#gamebox').slideToggle(500,function(){
			if(inBattle==true)startBattle();
		});
		$('#instpanel').html("游戏说明↓");
	});
	setTimeout(function(){document.getElementById("instpanel").onclick=showInst;},1000);
}

function showInst(){
	pause();
	$('#gamebox').slideUp(500,function(){
		$('#instbox').slideToggle(500);
		$('#instpanel').html("回到游戏↑");
	});
	setTimeout(function(){document.getElementById("instpanel").onclick=showGame;},1000);
}


onload=function(){
switcher=document.getElementById("switcher");
mainbox=document.getElementById("mainbox");
msgbox=document.getElementById("message_box");
bar=document.getElementById("bar");
for(i=0,j=1;i<n;i++){
	info_o[i]=document.getElementById("info"+j);
	health_o[i]=document.getElementById("health"+j);
	strength_o[i]=document.getElementById("strength"+j);
	armor_o[i]=document.getElementById("armor"+j);
	speed_o[i]=document.getElementById("speed"+j);
	luck_o[i]=document.getElementById("luck"+j);
	power_o[i]=document.getElementById("power"+j);
	hk[i]=document.getElementById("obj"+j);
	stat_o[i]=document.getElementsByName("stat"+j);
	name_o[i]=document.getElementById("player"+j);
	pro_o[i]=document.getElementById("pro"+j);
	tpoint_o[i]=document.getElementById("tpoint"+j);
	j++;
}
originX=bar.offsetLeft;
adjustPosition();
try{
document.body.onresizeend=adjustPosition;
}catch(e){}

try{
	if(localStorage.playerName){
		var tmp=localStorage.playerName.split(',');
		name_o[0].value=tmp[0];
		name_o[1].value=tmp[1];
		var tmp=localStorage.playerPro.split(',');
		pro_o[0].value=tmp[0];
		pro_o[1].value=tmp[1];
	}
}catch(e){}
}

function adjustPosition(){
if(document.body.clientWidth>700){
mainbox.style.left=(document.body.clientWidth-700)/2;
}else{mainbox.style.left=0;}
}

function init(){
hk[0].style.left=originX;
hk[1].style.left=originX;

bar.style.backgroundColor="#CCCC33";
hk[0].style.backgroundColor="#99CCFF";
hk[1].style.backgroundColor="#00ff00";
hk[0].style.zIndex=11;
hk[1].style.zIndex=12;
mainbox.style.zIndex=1;
bar.style.zIndex=0;


for(i=0;i<stat_o.length;i++){
	tpoint_o[i].innerHTML="";
	power_o[i].innerHTML="";
	luck_o[i].innerHTML="";
	speed_o[i].innerHTML="";
	armor_o[i].innerHTML="";
	strength_o[i].innerHTML="";
	health_o[i].innerHTML="";
	for(j=0;j<stat_o[i].length;j++){
		stat_o[i][j].innerHTML="";
	}
}
msgbox.innerHTML="";
data_init();
threadsafe=true;
inited=true;
}

function valueChange(){
reg=/[^\d|\.]/;
speed[0]=Number(speed_o[0].value.split(reg,1)[0]);
speed[1]=Number(speed_o[1].value.split(reg,1)[0]);
}

function freshpage(){
for(i=0;i<n;i++){
hk[i].style.left=(tpoint[i]<0?0:tpoint[i])+originX;
}
}

function message(msg){
msgbox.innerHTML="<p>"+msg+"</p>"+msgbox.innerHTML;
}

function actionReport(){
for(i=0;i<n;i++){
health_o[i].innerHTML=health[i];
strength_o[i].innerHTML=strength[i];
armor_o[i].innerHTML=armor[i];
speed_o[i].innerHTML=speed[i];
luck_o[i].innerHTML=luck[i];
power_o[i].innerHTML=power[i];
tpoint_o[i].innerHTML=tpoint[i];
for(j=0;j<stat_o[i].length;j++){
stat_o[i][j].innerHTML="";
}

for(j=0;j<stat[i].length;j++){
stat_o[i][stat[i][j][1]].innerHTML+="【"+stat[i][j][0]+stat[i][j][3]+"】";
}
}
}


function speedAdjust(spd){
if(spd!='0')
speedFactor=spd;
}

