// JavaScript Document
window.onload=function(){

	//解决IE低版本兼容性
	if (!document.getElementsByClassName){
		document.getElementsByClassName=function(cls){
			var ret=[];
			var els=document.getElementsByTagName('*');
			for ( var i=0, len=els.length; i<len; i++){
				if(els[i].className==cls||
					els[i].className.indexOf(cls + ' ') >=0||
					els[i].className.indexOf(' ' + cls + ' ') >=0||
					els[i].className.indexOf( ' ' + cls) >=0){
					ret.push(els[i]);
				}
			}
			return ret;
		}
	}

	var cartTable=document.getElementById('carttable');//获取表格
	var tr=cartTable.children[1].rows;//cartTable.children[1]获取tbody, .rows 获取所有的行、表格元素特有的属性，存放节点所有的tr元素
	var checkInputs=document.getElementsByClassName('check');//获取所有input
	var checkAllInputs=document.getElementsByClassName('check-all');//获取所有全选
	var selectedTotal=document.getElementById('selectedTotal');//获取已选数量
	var selected=document.getElementById('selected');//已选商品
	var foot=document.getElementById('foot');//
	var selectedViewList=document.getElementById('selectedViewList');//
	var deleteAll=document.getElementById('deleteAll');//
	//计算
	function getTotal(){
		//数量和总价
		var selected = 0;
		var price= 0;
		var HTMLstr='';
		for ( var i=0,len=tr.length;i<len;i++){
			if(tr[i].getElementsByTagName('input')[0].checked){
				tr[i].className = 'on';
				selected += parseInt(tr[i].getElementsByTagName('input')[1].value);
				price += parseFloat(tr[i].cells[4].innerHTML);
				HTMLstr += '<div><img src="'+ tr[i].getElementsByTagName('img')[0].src +'"><span class="del" index="'+i+'">取消选择</span></div>';//已选商品缩略图的拼接
			}
			else{
				tr[i].className = '';
			}
		}
		selectedTotal.innerHTML = selected;
		priceTotal.innerHTML = price.toFixed(2);
		selectedViewList.innerHTML = HTMLstr;
		if (selected==0){
			foot.className = 'foot';
		}
	}
	//小计
	function getSubTotal(tr){
		var tds = tr.cells;//行内所有TD
		var price = parseFloat(tds[2].innerHTML);
		var count = parseInt(tr.getElementsByTagName('input')[1].value);
		var SubTotal = parseFloat(price * count);
		tds[4].innerHTML=SubTotal.toFixed(2);
	}

	for (var i=0 , len=checkInputs.length; i<len; i++){
		checkInputs[i].onclick=function(){
			//全选
			if(this.className ==='check-all check'){
				for	(var j=0;j<checkInputs.length;j++){
					checkInputs[j].checked = this.checked;
				}
			}
			if(this.checked == false){
				for( var k=0; k<checkAllInputs.length; k++){
					checkAllInputs[k].checked = false;
				}
			}
			getTotal();
		}
		//点击出现已选商品预览
		selected.onclick=function(){
			if ( foot.className=='foot'){
				if(selectedTotal.innerHTML !=0){
					foot.className='foot show';
				}
			}
			else{
				foot.className='foot';
			}
		}

	}
	//预览取消选择
	selectedViewList.onclick=function(e){
		e = e || window.event;
		//IE:有srcElement属性，没有target属性，firefox:有target属性，没有srcElement属性。
		var el=e.srcElement ? e.srcElement : e.target;
		if (el.className=='del'){
			var index = el.getAttribute('index');
			var input = tr[index].getElementsByTagName('input')[0];
			input.checked = false;
			input.onclick();
		}
	}
	for (var i=0;i<tr.length;i++){
		//加减按钮改变数量
		tr[i].onclick = function(e){
			e=e||window.event;
			//IE:有srcElement属性，没有target属性，firefox:有target属性，没有srcElement属性。
			var el=e.srcElement ? e.srcElement : e.target;
			console.log(el);
			var cls = el.className;
			var input = this.getElementsByTagName('input')[1];
			var val = parseInt(input.value);
			var reduce = this.getElementsByTagName('span')[1];
			switch(cls){
				case 'add':
					input.value = val + 1;
					reduce.innerHTML ='-';
					getSubTotal(this);
					break;
				case 'reduce':
					if(val>1){
						input.value = val - 1;
					}
					if(input.value<=1){
						reduce.innerHTML = '';
					}
					getSubTotal(this);
					break;
				//删除事件
				case 'delete':
					var conf = confirm('确定要删除吗？');//弹出框
					if(conf){
						this.parentNode.removeChild(this);
					}
					break;
				default:
					break;
			}
			getTotal();
		}
		//键盘输入数量
		tr[i].getElementsByTagName('input')[1].onkeyup=function(){
			var val=parseInt(this.value);
			var tr=this.parentNode.parentNode;//获取父集的父集
			var reduce=tr.getElementsByTagName('span')[1];
			//保证数量大于等于1
			if(isNaN(val)||val<1){
				val =1;
			}
			this.value = val;
			if ( val<=1){
				reduce.innerHTML = '';
			}else{
				reduce.innerHTML = '-';
			}
			getSubTotal(tr);
			getTotal();
		}
	}
	//多选删除
	deleteAll.onclick=function(){
		if(selectedTotal.innerHTML !='0'){
			var conf = confirm('确定要删除吗？');
			if(conf){
				for (var i=0;i<tr.length;i++){
					var input = tr[i].getElementsByTagName('input')[0];
					if(input.checked){
						tr[i].parentNode.removeChild(tr[i]);
						i--;
					}
				}
			}
		}
	}
	checkAllInputs[0].checked=true;
	checkAllInputs[0].onclick();
}