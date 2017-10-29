/**
 * Created by Administrator on 2017/10/16.
 */
$(function () {
    $(".subMenuBtn").click(function () {
        $(".subMenuItems").slideToggle();
    });
    $("#menu a").click(function () {
        console.log($(this).index());
        $("#content>div").removeClass("current").eq($(this).index()).addClass("current");
        if ($(this).index()>0){
            $(".logo").addClass("current2");
        }else{
            $(".logo").removeClass("current2");
        }
        $(".subMenuItems").fadeOut(500);
        console.log($(window).width());
        if ($(window).width()>=1000){
            if($(this).index()===1){
                $("#pagewrap").css("height","1100px");
            }else {
                $("#pagewrap").css("height","850px");
            }
        }
    });
    $(".subMenuItems a").click(function () {
        console.log($(this).index());
        $("#content>div").removeClass("current").eq($(this).index()).addClass("current");
        if ($(this).index()>0){
            $(".logo").addClass("current2");
        }else{
            $(".logo").removeClass("current2");
        }
        $(".subMenuItems").fadeOut(500);
        console.log($(window).width());
        if ($(window).width()<1024&&$(window).width()>800){
            if($(this).index()===1){
                $("#pagewrap").css("height","1100px");
            }else {
                $("#pagewrap").css("height","900px");
            }
        }else if($(window).width()<800&&$(window).width()>=500){
            if($(this).index()===1){
                $("#pagewrap").css("height","2400px");
            }else if($(this).index()===2){
                $("#pagewrap").css("height","3300px");
            }else {
                $("#pagewrap").css("height","900px");
            }
        }else if($(window).width()<500){
            if($(this).index()===1){
                $("#pagewrap").css("height","2400px");
            }else if($(this).index()===2){
                $("#pagewrap").css("height","1834px");
            }else {
                $("#pagewrap").css("height","900px");
            }

        }
    });

        var num=0;
        var box =document.querySelector(".box");
    var boxArr= box.children;
    console.log(boxArr.length);
        setInterval(function () {
            if (num>360){
                num=0;
            }else{
                num++;
            }
            for (var i=0; i<boxArr.length;i++){
                boxArr[i].style.backgroundColor= "hsla("+(num+i*60)+",50%,50%,0.5)";
            }
        },10)


});