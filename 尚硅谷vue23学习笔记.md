Object.defineProperty()


���ݽٳ�
���ݴ���
��������



let person={
	name:'����',
	sex:'��'
}
Object.defineProperty(person,'age',{
	enumerable:true,//�Ƿ��ö��
	writable:true,  //�Ƿ�ɱ��޸�
	configurable:true, //�Ƿ�ɱ�ɾ��
	get:function(){}
	set:function(){}
})

���ݴ���ͨ��һ������������һ�������е����ԵĲ���

let obj={x:100}
let obj2={y:200}


Object.defineProperty(obj2,'x',{
	get(){
		return obj.x
	}
	set(value){
		obj.x=value
	}
})



1.Vue �е����ݴ���

ͨ�� vm ���������� data ���������ԵĲ���(��/д)

2.Vue �����ݴ���ĺô�

���ӷ���Ĳ��� data �е�����

3.����ԭ��

ͨ�� Object.defineProperty() �� data ����������������ӵ� vm �ϡ�
Ϊÿһ����ӵ� vm �ϵ����ԣ���ָ��һ�� getter/setter
�� getter/setter �ڲ�ȥ���� (��/д) data �ж�Ӧ������



�����¼�


@keyup

@keyup.enter

e.keycode

��������





<script>
	Vue.config.productionTip=false
	
	const vm=new Vue({
		el:'#root',
		data:{
			isHot:true,
		},
		computed:{},
		method:{},
		watch:{
			immediate:true, //��ʼ��ʱ���� handler ����һ��
			isHot:{
				handler(newValue,oldValue){
					console.log('isHot ���޸���')
				}
			}
		},
	})
</script>


vm.$watch('isHot',{
	immediate:true, //��ʼ��ʱ���� handler ����һ��
	isHot:{
		handler(newValue,oldValue){
			console.log('isHot ���޸���')
		}
	}
})



�������� watch:

1.�����������Ա仯ʱ���ص������Զ����ã�������ز���

2.�������Ա�����ڣ����ܽ��м���

3.���ӵ�����д����

��1��new Value ʱ���� watch ����
��2��ͨ�� vm.$watch ����



��ȼ���





<script>
	Vue.config.productionTip=false
	
	const vm=new Vue({
		el:'#root',
		data:{
			isHot:true,
			number:{
				a:1,
				b:2
			}
		},
		computed:{},
		method:{},
		watch:{
			immediate:true, //��ʼ��ʱ���� handler ����һ��
			isHot:{
				handler(newValue,oldValue){
					console.log('isHot ���޸���')
				}
			}
			'number.a':{
				deep:true,//��ȼ���
				handler(){
					console.log('a����')
				}
			}
		},
	})
</script>


��ȼ�����
��1��Vue �е� watch Ĭ�ϲ��������ڲ�ֵ�ĸı䣨һ�㣩
��2������ deep:true ���Լ������ڲ�ֵ�ĸı�(���)

��ע��
��1��Vue �������Լ��������ڲ�ֵ�ĸı䣬�� Vue �ṩ�� watch Ĭ�ϲ�����
��2��ʹ�� watch ʱ�������ݵľ���ṹ�������Ƿ������ȼ���





̸̸���vue �����

1.���ǽ���ʽ�� js ���
2.���Ŀ�+���
3.��̬�����û�����

vue �ļ����ص�

1.���� mvvm ģʽ
2.�������࣬���С���ܹ��������Ч��
3.�ʺ�pc+�ƶ�����
4.������ֻ��ע ui �� �� react �Ƚ�����
5.���������ɵ�����vue ����������ĵ���������п���


vue ����� angular ��ģ������ݰ󶨼���
Ȼ���ֽ���� react ������� �� ���� dom ����


���ݰ�
����dom 



ʲô�� mvvm

mvvm ȫ���� model view  ViewModel

model �������ݲ�
view ����ͼ��
viewmodel �������� mode -  view ������

�����ݷ����ı���µ�ʱ������ͨ�� viewmodel ֪ͨ��ͼ���չʾ�ı�

ͬʱ�����ͼ�㷢���ı䣬Ҳ��ͨ�� viewmodel ֪ͨmodel ��ı�����



vue �����ʵ����Ӧʽ���ݵ��أ�

��Ӧʽ����ԭ��



instance/state.js



initData  112

Observer/index.js

new Observer  124
this.walk(value)

defineReactive  134   ѭ���������Զ�����Ӧʽ�仯

Object.defineProperty  1345


����js ����仯�ļ�������

pop
push
shift
unshift
splice 
sort
reverse

�����ٳֵķ���
 
 
�ı��������ԭ�����ķ���


vue ���¼���ԭ��

1.ԭ���� dom �¼��İ�  addEvenListener ʵ��
2.����¼��İ� $on  

createEml
invokeCreateHooks
updateDOMListener �ķ���  add ����

v-model ��ʵ��ԭ��  ����Զ��� v-model


value+ input �������﷨��


Ϊʲô vue ���첽��Ⱦ


vue ����������µģ�����������첽����  ÿ�θ��¶���Ե�ǰ���������һ��������Ⱦ

Ϊ�����ܵ���ߣ����ڱ������ݸ��º����첽������ͼ��

����һ������˼�����  nextTick

�첽+�¼�ѭ��

nextTick ����һ���첽��Ⱦ�����������õľ��Ǻ������΢����
��������һ���첽����
��ε��� nextTick �ǻ���� һ�����У�ÿ��������ͨ������첽�ķ���
�����������У�Ȼ��ﵽ�첽���µ�Ч��





















