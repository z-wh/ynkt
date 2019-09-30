$(function () {
    // 表单提交
    $('.form-two').listenForm({
        siteId: 16,
        contentName: '越南考团报名',
        submitTarget: '#submitBtn2',
        successFun: function () {
            alert('您已成功提交！我们将在1个工作日内与您取得联系！谢谢！');
        }
    });

    fixNav();
    // nav点击跳转
    $(".my-nav li").on("click", function () {
        var index = $(this).index();
        $(this).addClass("actived").siblings().removeClass("actived");
        $obj = $(".tittle");
        $obj[index].scrollIntoView();
    });

    // 考团时间点击切换
    $(".time-tab li").on("click", function () {
        var index = $(this).index();
        $(this).addClass("actived").siblings().removeClass("actived");
        $(".time-tab-wrapper .time-tab-items").eq(index).addClass("current").siblings().removeClass("current");

    });

    // 行程安排切换
    $(".schedule-tab li").on("click", function () {
        var index = $(this).index();
        $(this).addClass("actived").siblings().removeClass("actived");
        $(".schedule-tab-content .schedule-tab-items").eq(index).addClass("current").siblings().removeClass("current");
    });

    // 时间悬浮标亮
    $(".time-box").hover(
        function () {
            $(this).addClass("time-box-hover").siblings().removeClass("time-box-hover");
        },
        function () {
            $(this).removeClass("time-box-hover");
        }
    );

});

function fixNav() {
    var oTop = $(".blue-color").offset().top;
    //获取导航栏的高度，此高度用于保证内容的平滑过渡
    var martop = $('.blue-color').outerHeight();

    var sTop = 0;
    // 监听页面的滚动
    $(window).scroll(function () {
        // 获取页面向上滚动的距离
        sTop = $(this).scrollTop();
        // 当导航栏到达屏幕顶端
        if (sTop >= oTop) {
            // 修改导航栏position属性，使之固定在屏幕顶端
            $(".blue-color").css({
                "position": "fixed",
                "width": "100%",
                "top": "0",
                "z-index": "9",
                // "opacity": "0.8",
            });
            // 修改内容的margin-top值，保证平滑过渡
            $("#tittle-what").css({
                "margin-top": martop,
            });
        } else {
            // 当导航栏脱离屏幕顶端时，回复原来的属性
            $(".blue-color").css({
                "position": "static",
                // "opacity": "1",
            });
            $("#tittle-what").css({
                "margin-top": "0"
            });
        }
    });
}
