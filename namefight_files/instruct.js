var inst=document.getElementById('instruction');

inst.innerHTML+="<hr />";
inst.innerHTML+="<hr />";

	inst.innerHTML+="<h3>����</h3>";
	inst.innerHTML+="<ul>";
		inst.innerHTML+="<li>������ֱ��Ӱ����ͨ����������</li>";
		inst.innerHTML+="<li>���ף��ܹ������ܵ�����ͨ�����˺�</li>";
		inst.innerHTML+="<li>�ٶȣ�Ӱ���ɫ�ж�������ٶ�</li>";
		inst.innerHTML+="<li>���ˣ����������ʺ͸���</li>";
		inst.innerHTML+="<li>����������ʩ������</li>";
	inst.innerHTML+="</ul>";
inst.innerHTML+="<hr />";
	inst.innerHTML+="<h3>����</h3>";
	inst.innerHTML+="<ol>";
		inst.innerHTML+="<li>��ɫ����ʱ�����Ų��ϻ����ж��㣬�ж���ﵽһ����ֵ�������ɫ���ж����ƶ������Ҷˣ�ʱ��ɫ�����ж���</li>";
		inst.innerHTML+="<li>��ɫÿ���ж���������ȫ�����ж��㣬����ʩչ���ܣ������ݼ��ܵĲ�ͬ���һ�����ж��㲹����</li>";
		inst.innerHTML+="<li>��ɫ��һ���ж���һ���غϡ�һЩ���ܻ����ɫ����״̬��״̬���Իغ�������ġ�</li>";
		inst.innerHTML+="<li>ÿ�غϵ�״̬��������ͨ����֮�󣬻�ʩչ����֮ǰ��</li>";
		inst.innerHTML+="<li>ʤ���������Է�����ֵ���͵�0����͡��κ�ʱ����һ���ﵽʤ����������Ϸ������</li>";
	inst.innerHTML+="</ol>";
inst.innerHTML+="<hr />";
	inst.innerHTML+="<h3>����</h3>";
	inst.innerHTML+="<ul>";
		inst.innerHTML+="<li>��ͨ���������˺�ֵ��1.5��2������֮�両����������1���˺�����</li>";
		inst.innerHTML+="<li>�չ�������=����/200���������������2�������˺���</li>";
		inst.innerHTML+="<li>�񵲳ɹ���=����/250���񵲳ɹ�ʱֻ�ܵ�30%�˺���</li>";
		inst.innerHTML+="<li>�˺��������=����/(1+����*0.07)��</li>";
		inst.innerHTML+="<li>ʩ����=����/120����ʩ����ûغϲ��ܽ�����ͨ�������һ�����10��������</li>";
		inst.innerHTML+="<li>��ͨ������ָ���������������Ͳ�����10����߲�����100��</li>";
	inst.innerHTML+="</ul>";
inst.innerHTML+="<hr />";
	inst.innerHTML+="<h3>ְҵ</h3>";
	inst.innerHTML+="<ol>";
		inst.innerHTML+="<li>��ʿ";
			inst.innerHTML+="<ul>";
				inst.innerHTML+="<li>ӵ�кܸߵ�����ֵ�������ͻ��ף�����ʼ���������˺ܵ�</li>";
				inst.innerHTML+="<li>��ͨ����ʱ�ظ�3������</li>";
				inst.innerHTML+="<li>��20%������һ�غ��ڽ���������ͨ���������������ظ�������</li>";
			inst.innerHTML+="</ul>";
		inst.innerHTML+="</li><br />";
		inst.innerHTML+="<li>����";
			inst.innerHTML+="<ul>";
				inst.innerHTML+="<li>ӵ�кܸߵ��ٶȡ�����ֵ���еȵĳ�ʼ������������ֵ�ܵ�</li>";
				inst.innerHTML+="<li>��ͨ����ʱ�ظ�6������</li>";
				inst.innerHTML+="<li>��25%�������ܶԷ�����ͨ���������ܵ��κ��˺�</li>";
			inst.innerHTML+="</ul>";
		inst.innerHTML+="</li><br />";
		inst.innerHTML+="<li>��ʦ";
			inst.innerHTML+="<ul>";
				inst.innerHTML+="<li>ӵ�кܸߵĳ�ʼ������������ֵ�ܵ�</li>";
				inst.innerHTML+="<li>��ͨ����ʱ�ظ�12������</li>";
				inst.innerHTML+="<li>ÿ��ʩ������30%��������ʩ���������Ķ������������ֻ�������һ��ʩ�����ж��㲹����</li>";
			inst.innerHTML+="</ul>";
		inst.innerHTML+="</li>";
	inst.innerHTML+="</ol>";
inst.innerHTML+="<hr />";
	inst.innerHTML+="<h3>�����б�</h3>";
	inst.innerHTML+="<ul>";

for(pid=1;pid<proSpell.length;pid++) {
	inst.innerHTML+="<li>"+proName[pid]+"<ul>";
	for(j=0;j<proSpell[pid].length;j++){
		sid=proSpell[pid][j];
		inst.innerHTML+="<li>"+spellList[sid][0]+"��"+spellList[sid][1]+"���ж��㲹����"+spellList[sid][5]+"</li>";
	}
	inst.innerHTML+="</ul></li><br />";
}

	inst.innerHTML+="</ul>";
inst.innerHTML+="<hr />";
	
inst.innerHTML+="<h4><li>����Ϸ��kkjames���������������κ����⣬����ϵ���ߣ�</li>";
inst.innerHTML+="<li>Email: myustc@163.com</li>";
inst.innerHTML+="<li>Email: kkjames@mail.ustc.edu.cn</li>";
inst.innerHTML+="<li>QQ: 362027034����֤�룺NameFight��</li></h4>";
