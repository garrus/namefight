
var	playerName,strength,armor,health,mana,speed,luck,power,playerPro,stat,tpoint;
var propertyName=new Array("health","strength","armor","speed","luck","power");
var proName=new Array("","��ʿ","����","��ʦ");
//	���ݳ�ʼ��
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

//	��������
function data_test(){
playerName=new Array("������","������")
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

//	**************���ɽ�ɫ����*************
function createChar(){
	for(g=0;g<playerName.length && g<name_o.length;g++){
		if((playerName[g]=name_o[g].value)==""){
			name_o[g].value="�����ɫ��";
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

// *****************��ͣ��Ϸ********************
function pause(){
	clearInterval(intv_bar);
	intv_bar=0;
}

//	*****************ս�����********************
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

//	*******************�ƶ�*************************
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

//	*****************�ж�***********************
function takeAction(id){
	tid=1-id;

	act=(Math.random()>power[id]/120)?1:2;	//	ʩ����=����/120��ʩ��������10����������ͨ����ʱ��������
	if(act==1){
		if(playerPro[id]==1 && Math.random()<0.2){
			message("<span class=\"name"+id+"\">"+playerName[id]+"</span>����<span class=\"talent\">˫�ع���</span>��");
			normalAttack(id);	//	սʿ�츳��20%����˫�ع���
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

//	*****************��ͨ����*****************
//	����idΪ������
function normalAttack(id){
	var tid=1-id;
	msg="<span class=\"name"+id+"\">"+playerName[id]+"</span>������ͨ����";
	if(playerPro[tid]==2 && Math.random()<0.25){
		msg+="��������<span class=\"name"+tid+"\">"+playerName[tid]+"</span>���츳<span class=\"talent\">����</span>��δ���У�";
		message(msg);	//	�����츳��25%����������
		animColor='white';
	}else{
		dmg=strength[id]*(1.5+0.5*Math.random());	//	�����˺�=1.5~2������
		critical=(luck[id]>200*Math.random());	//	���������2�������˺�
		if(critical){
			dmg*=2;
			msg+="<span class=\"crit\">������!��</span>";
			badWound(tid);
		}
		block=(luck[tid]>250*Math.random());		//	�񵲣�����70%�����˺�
		if(block){
			dmg*=0.3;
			msg+="������<span class=\"name"+tid+"\">"+playerName[tid]+"</span>�ɹ���";
		}
		dmg*=1/(armor[tid]*0.07+1);	//	�˺��������=����/(1+����*0.07)
		dmg=Math.round(dmg);
		if(dmg<1)dmg=1;
		msg+="��<span class=\"name"+tid+"\">"+playerName[tid]+"</span>�ܵ�<span class=\"hurt\">"+dmg+"</span>���˺�";
		health[tid]-=dmg;
		msg+="��ʣ��<span class=\"health\">"+health[tid]+"</span>����������";
		message(msg);
	}
}

//	*****************ʩ��*******************
//	����id����ʩ����
function castSpell(id){
	spell_id=Math.floor(proSpell[playerPro[id]].length*Math.random());
	spell_id=proSpell[playerPro[id]][spell_id];
	spell=spellList[spell_id];
	message("<span class=\"name"+id+"\">"+playerName[id]+"</span>��������<span class=\"spell\">"+spell[0]+"��"+spell[1]+"��</span>��");
	tid=spell[2]?id:1-id;
	info[spell[3]][tid]+=spell[4];
	if(spell[6]>0)addStat(tid,spell);
	if(playerPro[id]==3 && Math.random()<0.3){
		message("<span class=\"name"+id+"\">"+playerName[id]+"</span>����<span class=\"talent\">����ʩ��</span>��");
		castSpell(id);	//	��ʦ������30%���ʶ���ʩ��һ��
	}else{
		tpoint[id]+=spell[5];
	}
}

//	*****************���״̬******************
//	״̬��ʽ���������ƣ��������ԣ�����Ч���������غϣ�����Ч��
function addStat(id,spell){
	newstat=new Array(spell[0],spell[3],spell[8],spell[6],spell[7]);
	stat[id].push(newstat);
	stat[id].sort(statComp);
}

//	******************���״̬***************
function checkStat(id){
	//	�������״̬
	for(i=0;i<stat[id].length;i++){
		stat[id][i][3]--;
		info[stat[id][i][1]][id]+=stat[id][i][4];
		if(stat[id][i][1]==0 && stat[id][i][4]!==0){
			msg="<span class=\"name"+id+"\">"+playerName[id]+"</span>��<span class=\"spell\">"+stat[id][i][0]+"</span>";
			if(stat[id][i][4]>0)msg+="�ָ���<span class=\"health\">"+stat[id][i][4]+"</span>������";
			else msg+="�ܵ���<span class=\"hurt\">"+Math.abs(stat[id][i][4])+"</span>���˺�";
			msg+="��ʣ��<span class=\"health\">"+health[id]+"</span>����������";
			message(msg);
		}
	}
	//	����Ӧ�ý�����״̬
	while(stat[id].length>0 && stat[id][0][3]<1){
		endstat=stat[id].shift();
		info[endstat[1]][id]+=endstat[2];
		if(endstat[1]==0 && endstat[2]!==0){
			msg="<span class=\"name"+id+"\">"+playerName[id]+"</span>��<span class=\"spell\">"+endstat[0]+"</span>";
			if(endstat[2]>0)msg+="�ָ���<span class=\"health\">"+endstat[2]+"</span>��������";
			else msg+="�ܵ���<span class=\"hurt\">"+Math.abs(endstat[2])+"</span>���˺���ʣ��<span class=\"health\">"+health[id]+"</span>����������";
			message(msg);
		}
		if(endstat[1]==0)
		message("<span class=\"spell\">"+endstat[0]+"</span>Ч����<span class=\"name"+id+"\">"+playerName[id]+"</span>������ʧ�ˡ�");

	}
	return checkDead(id);
}

//	****************���Ƿ�����***************
function checkDead(id){
	if(health[id]<1){
		message("<span class=\"name"+(1-id)+"\">"+playerName[1-id]+"</span>���ʤ����");
		playerWin(1-id);
		return true;
	}
	return false;
}

//	****************�����б�********************
//	��ʽ���������֣�����˵�������ö���(�Ƿ�����������)���������ԣ�Ч����ֵ��ʱ�佱����Ч���غ���������Ч��������ʱЧ��
var spellList=new Array();
spellList[0]=new Array("Ӣ�´��","�Է�������95",false,0,-95,50,0,0,0);
spellList[1]=new Array("��ҩ","�Է�������18�㣬����3�غ�",false,1,-18,200,3,0,18);
spellList[2]=new Array("����","�Է����ס�5�㣬����4�غ�",false,2,-5,350,4,0,5);
spellList[3]=new Array("�Ͻ�","�Է��ٶȡ�3�㣬����2�غ�",false,3,-3,250,2,0,3);
spellList[4]=new Array("����","�Է����ˡ�40�㣬����3�غ�",false,4,-35,300,3,0,35);
spellList[5]=new Array("��������","������120",true,0,110,0,0,0,0);
spellList[6]=new Array("����","������25������3�غ�",true,1,24,250,3,0,-24);
spellList[7]=new Array("ħ����","���ס�7������3�غ�",true,2,7,300,3,0,-7);
spellList[8]=new Array("Ѹ��","�ٶȡ�2������3�غ�",true,3,2,250,3,0,-2);
spellList[9]=new Array("ף��","���ˡ�45������3�غ�",true,4,45,350,3,0,-45);
spellList[10]=new Array("�ش�","������85��4�غ��� ������15/�غ�",true,0,75,100,5,15,0);
spellList[11]=new Array("Ұ��","5�غ��� ������25/�غ�",true,0,0,100,5,25,0);
spellList[12]=new Array("��ҩ","4�غϺ� �Է�������160",false,0,0,150,4,0,-160);
spellList[13]=new Array("�²�","�Է�������60��3�غ��ڡ�25/�غ�",false,0,-60,100,3,-25,0);
spellList[14]=new Array("��ע","�ٶȡ�6������2/�غϣ�����3�غ�",true,3,6,0,3,-2,0);
spellList[15]=new Array("�ɳ�","������10",true,1,10,200,0,0,0);
spellList[16]=new Array("ħ��","������60",true,5,50,100,0,0,0);
spellList[17]=new Array("���","�Է�������210��3�غϺ��150",false,0,-210,0,3,0,150);
spellList[18]=new Array("����","2�غϺ� �ٶȡ�2",true,3,0,200,2,0,2);
spellList[19]=new Array("����","4�غ��� �Է�������35/�غ�",false,0,0,200,4,-35,0);
spellList[20]=new Array("��ħ����","5�غ��� �Է�������10/�غ�",false,5,0,200,5,-10,0);
spellList[21]=new Array("����","�Է��ж����700",false,6,-700,250,0,0,0);
spellList[22]=new Array("�嶯","3�غ��� �ж����200",true,6,0,200,3,200,0);
spellList[23]=new Array("����","5�غ��� �Է��ж����100",false,6,0,200,5,-100,0);
spellList[24]=new Array("����","�Է�������50��3�غ��� ��20/�غϣ�����ʱ��80",false,0,-50,0,3,-20,-80);

var proSpell=new Array();
proSpell[0]=new Array();
proSpell[1]=new Array(0,2,3,6,11,15,16,21);
proSpell[2]=new Array(1,8,12,13,16,18,19,22);
proSpell[3]=new Array(4,5,7,9,10,14,17,20,23,24);


