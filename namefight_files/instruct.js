var inst=document.getElementById('instruction');

inst.innerHTML+="<hr />";
inst.innerHTML+="<hr />";

	inst.innerHTML+="<h3>属性</h3>";
	inst.innerHTML+="<ul>";
		inst.innerHTML+="<li>力量：直接影响普通攻击的威力</li>";
		inst.innerHTML+="<li>护甲：能够减少受到的普通攻击伤害</li>";
		inst.innerHTML+="<li>速度：影响角色行动点积累速度</li>";
		inst.innerHTML+="<li>幸运：决定暴击率和格挡率</li>";
		inst.innerHTML+="<li>灵力：决定施法概率</li>";
	inst.innerHTML+="</ul>";
inst.innerHTML+="<hr />";
	inst.innerHTML+="<h3>规则</h3>";
	inst.innerHTML+="<ol>";
		inst.innerHTML+="<li>角色会随时间流逝不断积累行动点，行动点达到一定数值（代表角色的行动条移动到最右端）时角色方可行动。</li>";
		inst.innerHTML+="<li>角色每次行动都会消耗全部的行动点，但若施展技能，则会根据技能的不同获得一定的行动点补偿。</li>";
		inst.innerHTML+="<li>角色的一次行动称一个回合。一些技能会令角色带上状态，状态是以回合来结算的。</li>";
		inst.innerHTML+="<li>每回合的状态结算在普通攻击之后，或施展技能之前。</li>";
		inst.innerHTML+="<li>胜利条件：对方生命值降低到0或更低。任何时候有一方达到胜利条件，游戏结束。</li>";
	inst.innerHTML+="</ol>";
inst.innerHTML+="<hr />";
	inst.innerHTML+="<h3>数据</h3>";
	inst.innerHTML+="<ul>";
		inst.innerHTML+="<li>普通攻击基础伤害值在1.5到2倍力量之间浮动（最低造成1点伤害）。</li>";
		inst.innerHTML+="<li>普攻暴击率=幸运/200，若爆击，则造成2倍基础伤害。</li>";
		inst.innerHTML+="<li>格挡成功率=幸运/250，格挡成功时只受到30%伤害。</li>";
		inst.innerHTML+="<li>伤害减免比例=护甲/(1+护甲*0.07)。</li>";
		inst.innerHTML+="<li>施法率=灵力/120，若施法则该回合不能进行普通攻击，且会消耗10点灵力。</li>";
		inst.innerHTML+="<li>普通攻击会恢复灵力，但灵力最低不低于10，最高不超过100。</li>";
	inst.innerHTML+="</ul>";
inst.innerHTML+="<hr />";
	inst.innerHTML+="<h3>职业</h3>";
	inst.innerHTML+="<ol>";
		inst.innerHTML+="<li>武士";
			inst.innerHTML+="<ul>";
				inst.innerHTML+="<li>拥有很高的生命值、力量和护甲，但初始灵力和幸运很低</li>";
				inst.innerHTML+="<li>普通攻击时回复3点灵力</li>";
				inst.innerHTML+="<li>有20%几率在一回合内进行两次普通攻击（但不会额外回复灵力）</li>";
			inst.innerHTML+="</ul>";
		inst.innerHTML+="</li><br />";
		inst.innerHTML+="<li>盗贼";
			inst.innerHTML+="<ul>";
				inst.innerHTML+="<li>拥有很高的速度、幸运值和中等的初始灵力，但生命值很低</li>";
				inst.innerHTML+="<li>普通攻击时回复6点灵力</li>";
				inst.innerHTML+="<li>有25%几率闪避对方的普通攻击，不受到任何伤害</li>";
			inst.innerHTML+="</ul>";
		inst.innerHTML+="</li><br />";
		inst.innerHTML+="<li>巫师";
			inst.innerHTML+="<ul>";
				inst.innerHTML+="<li>拥有很高的初始灵力，但力量值很低</li>";
				inst.innerHTML+="<li>普通攻击时回复12点灵力</li>";
				inst.innerHTML+="<li>每次施法后都有30%几率连续施法（不消耗额外的灵力，但只享受最后一次施法的行动点补偿）</li>";
			inst.innerHTML+="</ul>";
		inst.innerHTML+="</li>";
	inst.innerHTML+="</ol>";
inst.innerHTML+="<hr />";
	inst.innerHTML+="<h3>技能列表</h3>";
	inst.innerHTML+="<ul>";

for(pid=1;pid<proSpell.length;pid++) {
	inst.innerHTML+="<li>"+proName[pid]+"<ul>";
	for(j=0;j<proSpell[pid].length;j++){
		sid=proSpell[pid][j];
		inst.innerHTML+="<li>"+spellList[sid][0]+"："+spellList[sid][1]+"。行动点补偿："+spellList[sid][5]+"</li>";
	}
	inst.innerHTML+="</ul></li><br />";
}

	inst.innerHTML+="</ul>";
inst.innerHTML+="<hr />";
	
inst.innerHTML+="<h4><li>本游戏由kkjames独立开发，如有任何问题，请联系作者：</li>";
inst.innerHTML+="<li>Email: myustc@163.com</li>";
inst.innerHTML+="<li>Email: kkjames@mail.ustc.edu.cn</li>";
inst.innerHTML+="<li>QQ: 362027034（验证码：NameFight）</li></h4>";
