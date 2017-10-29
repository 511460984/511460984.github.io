/**
 * Created by Administrator on 2017/10/4.
 */
//需求：点击ol中的li，屏幕滑动到对应的contentBox中的li的范围。
//思路：利用window.scrollTo();利用缓动动画原理实现屏幕滑动。

    var contentBox = document.getElementById("contentBox");
    var ol = document.getElementsByTagName("ol")[0];
    var conArr = contentBox.children;
    var olLiArr = ol.children;
    var target = 0;
    var leader = 0;
    var timer = null;


    //设置一个数组，里面装颜色，然指定的颜色给数组中的指定元素
    var arrColor = ["#c9c9c9","#e3e3e3","#9ad3de","#89bdd3","#c0dfd9","#b3c2bf","#edd9c0","#c9d8c5","#a8b6bf","#759f98"];
    for(var i=0;i<conArr.length;i++){
        //上色
        var olNewli=document.createElement("li");
        ol.appendChild(olNewli);
        conArr[i].style.backgroundColor = arrColor[i];
        olLiArr[i].style.backgroundColor ="#666";
        olLiArr[i].innerHTML = conArr[i].innerHTML;

        //属性绑定索引值
        olLiArr[i].index = i;
        olLiArr[i].onclick = function () {
            //获取索引值。
            target = conArr[this.index].offsetTop;

            //要用定时器，先清除定时器
            clearInterval(timer);
            //3.利用缓动动画原理实现屏幕滑动
            timer = setInterval(function () {
                //获取步长
                var step = (target-leader)/10;
                //二次处理步长
                step = step>0?Math.ceil(step):Math.floor(step);
                //屏幕滑动
                leader = leader + step;
                window.scrollTo(0,leader);
                //清除定时器
                if(Math.abs(target-leader)<=Math.abs(step)){
                    window.scrollTo(0,target);
                    clearInterval(timer);
                }
            },30);
        }
    }

    //4.用scroll事件模拟盒子距离最顶端的距离。
    window.onscroll = function () {
        //每次屏幕滑动，把屏幕卷去的头部赋值给leader,模拟获取显示区域距离顶部的距离
        leader = scroll().top;
        ol.style.display=scroll().top>contentBox.offsetTop?"block":"none";
    }