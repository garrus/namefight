
var	playerName,strength,armor,health,mana,speed,luck,power,playerPro,stat,tpoint;
var propertyName=new Array("health","strength","armor","speed","luck","power");
var proName=new Array("","武士","盗贼","巫师");
//	数据初始化
function data_init(){
playerName=new Array(0,0);
strength=new Array(n);
armor=new Array(n);
health=new Array(n);
speed=new Array(n);
luck=new Array(n);
power=new Array(n);
mana=new Array(n);
playerPro=new Array(n);
stat=new Array(new Array(),new Array());
tpoint=new Array(0,0);
info=new Array();
info[0]=health;
info[1]=strength;
info[2]=armor;
info[3]=speed;
info[4]=luck;
info[5]=power;
info[6]=tpoint;
}

//	测试数据
function data_test(){
playerName=new Array("古郎特","萨大妈")
strength=new Array(39,52);
armor=new Array(3,6);
health=new Array(330,350);
mana=new Array(100,75);
speed=new Array(12,10);
luck=new Array(82,45);
power=new Array(43,25);
playerPro=new Array(1,2);
stat=new Array(new Array(),new Array());
actionReport();
}

function comp(a,b){
if(a>b)return -1;
else if(a=b)return 0;
else return 1;
}

function statComp(a,b){
return a[3]-b[3];
}

function playerWin(id){
	clearInterval(intv_bar);
	intv_bar=0;
	inBattle=false;
	switcher.disabled="";
	name_o[0].disabled="";
	name_o[1].disabled="";
	pro_o[0].disabled="";
	pro_o[1].disabled="";
}

function badWound(id){
	setTimeout(function(){health_o[id].style.backgroundColor="red";},10);
	setTimeout(function(){health_o[id].style.backgroundColor="";},160);
	setTimeout(function(){health_o[id].style.backgroundColor="red";},310);
	setTimeout(function(){health_o[id].style.backgroundColor="";},460);
}

//	**************生成角色属性*************
function createChar(){
	for(g=0;g<playerName.length && g<name_o.length;g++){
		if((playerName[g]=name_o[g].value)==""){
			name_o[g].value="输入角色名";
			name_o[g].select();
			return false;
		}
	}
	playerPro[0]=Number(pro_o[0].value);
	playerPro[1]=Number(pro_o[1].value);
	str="";
	MD5str=new Array(2);
	for(g=0;g<playerName.length;g++){
		for(j=0;j<playerName[g].length;j++){
			str+=playerName[g].charCodeAt(j);
		}
		MD5str[g]=calcMD5(str);
		str="";
	}
	var num;
	var strIndex="01234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for(i=0;i<MD5str.length;i++){
		num=new Array(0,0,0,0);
		for(j=0;j<MD5str[i].length;j++)num[j%4]+=strIndex.indexOf(MD5str[i].charAt(j));
		num.sort(comp);
		sum=num[0]+num[1]+num[2]+num[3]+4;
		health[i]=sum%400;
		while(health[i]<200)health[i]*=2;
		switch(playerPro[i]){
			case 1:
				health[i]*=1.55;
				strength[i]=num[0]%61>num[0]%53?num[0]%61:num[0]%53;
				strength[i]=Math.round(strength[i]*1.2);
				if(strength[i]<35)strength[i]=35;
				armor[i]=num[1]%13;
				if(armor[i]<5)armor[i]=5;
				speed[i]=num[3]%14>num[3]%11?num[3]%14:num[3]%11;
				if(speed[i]<8)speed[i]=8;
				luck[i]=num[2]%75;
				if(luck[i]>45)luck[i]=45;
				power[i]=Math.round(15+sum%21);
				break;
			case 2:
				health[i]*=1.15;
				luck[i]=num[0]%125;
				if(luck[i]>75)luck[i]=75;
				else while(luck[i]<45)luck[i]=luck[i]*2;
				armor[i]=num[3]%10;
				speed[i]=num[2]%15>num[2]%13?num[2]%15:num[2]%13;
				if(speed[i]<10)speed[i]=10;
				strength[i]=num[1]%47>num[1]%37?num[1]%47:num[1]%37;
				if(strength[i]<28)strength[i]=28;
				strength[i]+=3;
				power[i]=Math.round(25+sum%31);
				break;
			case 3:
				health[i]*=1.35;
				armor[i]=num[3]%7;
				speed[i]=num[0]%15>num[0]%11?num[0]%15:num[0]%11;
				if(speed[i]<9)speed[i]=9;
				strength[i]=num[2]%47>num[2]%31?num[2]%47:num[2]%31;
				if(strength[i]<24)strength[i]=24;
				luck[i]=num[1]%100;
				if(luck[i]>60)luck[i]=60;
				power[i]=Math.round(40+sum%21+sum%31);
				break;
			default:
				break;
		}
		health[i]=Math.round(health[i]);
	}
	actionReport();
	try{
		localStorage.playerName=playerName;
		localStorage.playerPro=playerPro;
	}catch(e){	}
	return true;
}

// *****************暂停游戏********************
function pause(){
	clearInterval(intv_bar);
	intv_bar=0;
}

//	*****************战斗入口********************
function startBattle(){
	if(playerName[0]==0 || playerName[1]==0)
		if(!createChar())return;

	if(intv_bar==0){
		name_o[0].disabled="disabled";
		name_o[1].disabled="disabled";
		pro_o[0].disabled="disabled";
		pro_o[1].disabled="disabled";
		intv_bar=setInterval(function(){if(threadsafe)generalMove();t++},25);
		switcher.disabled="disabled";
		inBattle=true;
	}
}

//	*******************移动*************************
function generalMove(){
threadsafe=false;
action=false;
	for(i=0;i<n;i++){
		xx=speed[i]/speedFactor+0.5;
		if(xx<0.5)xx=0.5;
		tpoint[i]+=xx;
		if(tpoint[i]>barlength){
			tpoint[i]-=barlength;
			takeAction(i);
			actionReport();
			action=true;
		}
	}
	freshpage();
if(action){
setTimeout(function(){threadsafe=true;},speedFactor*150);
}else{
threadsafe=true;
}
}

//	*****************行动***********************
function takeAction(id){
	tid=1-id;

	act=(Math.random()>power[id]/120)?1:2;	//	施法率=灵力/120，施法会消耗10点灵力，普通攻击时积攒灵力
	if(act==1){
		if(playerPro[id]==1 && Math.random()<0.2){
			message("<span class=\"name"+id+"\">"+playerName[id]+"</span>触发<span class=\"talent\">双重攻击</span>！");
			normalAttack(id);	//	战士天赋：20%几率双重攻击
		}
		normalAttack(id);
		switch(playerPro[id]){
			case 1:
				power[id]+=3;
				break;
			case 2:
				power[id]+=6;
				break;
			case 3:
				power[id]+=12;
				break;
			default:
				break;
		}
		if(checkDead(tid)==true)return;
	}

	if(stat[id].length>0 && checkStat(id)==true)return;

	if(act==2){
		castSpell(id);
		power[id]-=10;
		if(checkDead(tid)==true)return;
	}
	
	if(power[id]<10)power[id]=10;
	if(power[id]>100)power[id]=100;
	
}

//	*****************普通攻击*****************
//	参数id为攻击者
function normalAttack(id){
	var tid=1-id;
	msg="<span class=\"name"+id+"\">"+playerName[id]+"</span>发动普通攻击";
	if(playerPro[tid]==2 && Math.random()<0.25){
		msg+="，但触发<span class=\"name"+tid+"\">"+playerName[tid]+"</span>的天赋<span class=\"talent\">闪避</span>，未命中！";
		message(msg);	//	盗贼天赋：25%闪避物理攻击
		animColor='white';
	}else{
		dmg=strength[id]*(1.5+0.5*Math.random());	//	基础伤害=1.5~2倍力量
		critical=(luck[id]>200*Math.random());	//	暴击，造成2倍基础伤害
		if(critical){
			dmg*=2;
			msg+="<span class=\"crit\">（爆击!）</span>";
			badWound(tid);
		}
		block=(luck[tid]>250*Math.random());		//	格挡，减少70%所受伤害
		if(block){
			dmg*=0.3;
			msg+="，但被<span class=\"name"+tid+"\">"+playerName[tid]+"</span>成功格挡";
		}
		dmg*=1/(armor[tid]*0.07+1);	//	伤害减免比例=护甲/(1+护甲*0.07)
		dmg=Math.round(dmg);
		if(dmg<1)dmg=1;
		msg+="，<span class=\"name"+tid+"\">"+playerName[tid]+"</span>受到<span class=\"hurt\">"+dmg+"</span>点伤害";
		health[tid]-=dmg;
		msg+="（剩余<span class=\"health\">"+health[tid]+"</span>点生命）。";
		message(msg);
	}
}

//	*****************施法*******************
//	参数id代表施法者
function castSpell(id){
	spell_id=Math.floor(proSpell[playerPro[id]].length*Math.random());
	spell_id=proSpell[playerPro[id]][spell_id];
	spell=spellList[spell_id];
	message("<span class=\"name"+id+"\">"+playerName[id]+"</span>发动技能<span class=\"spell\">"+spell[0]+"【"+spell[1]+"】</span>。");
	tid=spell[2]?id:1-id;
	info[spell[3]][tid]+=spell[4];
	if(spell[6]>0)addStat(tid,spell);
	if(playerPro[id]==3 && Math.random()<0.3){
		message("<span class=\"name"+id+"\">"+playerName[id]+"</span>触发<span class=\"talent\">多重施法</span>！");
		castSpell(id);	//	法师福利：30%几率额外施法一次
	}else{
		tpoint[id]+=spell[5];
	}
}

//	*****************添加状态******************
//	状态格式：法术名称，作用属性，结束效果，持续回合，持续效果
function addStat(id,spell){
	newstat=new Array(spell[0],spell[3],spell[8],spell[6],spell[7]);
	stat[id].push(newstat);
	stat[id].sort(statComp);
}

//	******************检查状态***************
function checkStat(id){
	//	逐个处理状态
	for(i=0;i<stat[id].length;i++){
		stat[id][i][3]--;
		info[stat[id][i][1]][id]+=stat[id][i][4];
		if(stat[id][i][1]==0 && stat[id][i][4]!==0){
			msg="<span class=\"name"+id+"\">"+playerName[id]+"</span>因<span class=\"spell\">"+stat[id][i][0]+"</span>";
			if(stat[id][i][4]>0)msg+="恢复了<span class=\"health\">"+stat[id][i][4]+"</span>点生命";
			else msg+="受到了<span class=\"hurt\">"+Math.abs(stat[id][i][4])+"</span>点伤害";
			msg+="（剩余<span class=\"health\">"+health[id]+"</span>点生命）。";
			message(msg);
		}
	}
	//	处理应该结束的状态
	while(stat[id].length>0 && stat[id][0][3]<1){
		endstat=stat[id].shift();
		info[endstat[1]][id]+=endstat[2];
		if(endstat[1]==0 && endstat[2]!==0){
			msg="<span class=\"name"+id+"\">"+playerName[id]+"</span>因<span class=\"spell\">"+endstat[0]+"</span>";
			if(endstat[2]>0)msg+="恢复了<span class=\"health\">"+endstat[2]+"</span>点生命。";
			else msg+="受到了<span class=\"hurt\">"+Math.abs(endstat[2])+"</span>点伤害（剩余<span class=\"health\">"+health[id]+"</span>点生命）。";
			message(msg);
		}
		if(endstat[1]==0)
		message("<span class=\"spell\">"+endstat[0]+"</span>效果从<span class=\"name"+id+"\">"+playerName[id]+"</span>身上消失了。");

	}
	return checkDead(id);
}

//	****************看是否死人***************
function checkDead(id){
	if(health[id]<1){
		message("<span class=\"name"+(1-id)+"\">"+playerName[1-id]+"</span>获得胜利！");
		playerWin(1-id);
		return true;
	}
	return false;
}

//	****************技能列表********************
//	格式：技能名字，技能说明，作用对象(是否作用于自身)，作用属性，效果数值，时间奖励，效果回合数，持续效果，结束时效果
var spellList=new Array();
spellList[0]=new Array("英勇打击","对方生命↓95",false,0,-95,50,0,0,0);
spellList[1]=new Array("麻药","对方力量↓18点，持续3回合",false,1,-18,200,3,0,18);
spellList[2]=new Array("粉碎","对方护甲↓5点，持续4回合",false,2,-5,350,4,0,5);
spellList[3]=new Array("断筋","对方速度↓3点，持续2回合",false,3,-3,250,2,0,3);
spellList[4]=new Array("诅咒","对方幸运↓40点，持续3回合",false,4,-35,300,3,0,35);
spellList[5]=new Array("快速治疗","生命↑120",true,0,110,0,0,0,0);
spellList[6]=new Array("咆哮","力量↑25，持续3回合",true,1,24,250,3,0,-24);
spellList[7]=new Array("魔甲术","护甲↑7，持续3回合",true,2,7,300,3,0,-7);
spellList[8]=new Array("迅捷","速度↑2，持续3回合",true,3,2,250,3,0,-2);
spellList[9]=new Array("祝福","幸运↑45，持续3回合",true,4,45,350,3,0,-45);
spellList[10]=new Array("回春","生命↑85，4回合内 生命↑15/回合",true,0,75,100,5,15,0);
spellList[11]=new Array("野性","5回合内 生命↑25/回合",true,0,0,100,5,25,0);
spellList[12]=new Array("毒药","4回合后 对方生命↓160",false,0,0,150,4,0,-160);
spellList[13]=new Array("致残","对方生命↓60，3回合内↓25/回合",false,0,-60,100,3,-25,0);
spellList[14]=new Array("灌注","速度↑6，但↓2/回合，持续3回合",true,3,6,0,3,-2,0);
spellList[15]=new Array("成长","力量↑10",true,1,10,200,0,0,0);
spellList[16]=new Array("魔化","灵力↑60",true,5,50,100,0,0,0);
spellList[17]=new Array("虚空","对方生命↓210，3回合后↑150",false,0,-210,0,3,0,150);
spellList[18]=new Array("疾跑","2回合后 速度↑2",true,3,0,200,2,0,2);
spellList[19]=new Array("割裂","4回合内 对方生命↓35/回合",false,0,0,200,4,-35,0);
spellList[20]=new Array("恶魔缠身","5回合内 对方灵力↓10/回合",false,5,0,200,5,-10,0);
spellList[21]=new Array("击退","对方行动点↓700",false,6,-700,250,0,0,0);
spellList[22]=new Array("冲动","3回合内 行动点↑200",true,6,0,200,3,200,0);
spellList[23]=new Array("缠绕","5回合内 对方行动点↓100",false,6,0,200,5,-100,0);
spellList[24]=new Array("活焰","对方生命↓50，3回合内 ↓20/回合，结束时↓80",false,0,-50,0,3,-20,-80);

var proSpell=new Array();
proSpell[0]=new Array();
proSpell[1]=new Array(0,2,3,6,11,15,16,21);
proSpell[2]=new Array(1,8,12,13,16,18,19,22);
proSpell[3]=new Array(4,5,7,9,10,14,17,20,23,24);


