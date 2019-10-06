
var siteId = '16';  // 站点ID
var contentId1 = '769676';  // 寒假班领书ID
var contentId2 = '769676';  // 寒假班报名ID

$(function() {
    $('#submitBtn1').on('click', function(e) {
        var sucFun = function(){
            $('.succeed').show();
        }
        validateLinstenOne('.form1', 'http://zyadmin.xhd.cn' , true , sucFun, contentId1);
        e.preventDefault();
    });

    // 报名成功弹窗
    $('.succeed .alert-icon').click(function(){
        $('.succeed').hide();
    });

    $('.select-two .current').click(function(){
        $('.select-two').addClass('open');
    });
    $('.select-two .option').click(function(){
        $('.select-two').removeClass('open');
        $('.select-two .current').text($(this).text());
    });
    $('.select-one .current').click(function(){
        $('.select-one').addClass('open');
    });
    $('.select-one .option').click(function(){
        $('.select-one').removeClass('open');
        $('.select-one .current').text($(this).text());
    });

    $('#submitBtn2').on('click', function(e) {
        var sucFun = function(){
            $.ncAlert({
                icon: 'success',
                title: '恭喜，您已预约成功',
                subtit: '我们会在1个工作日内联系您！'
            });
        }
        validateLinstenTwo('.form-two', 'http://zyadmin.xhd.cn' , true , sucFun, contentId2);
        e.preventDefault();
    });
});

function charToInt(unames) {
    if (unames == null || unames == "") {
        return "";
    }
    var arr = {};
    var rtn = "";
    arr[0] = unames.charAt(0);
    rtn = arr[0].charCodeAt();
    for (var i = 1; i < unames.length; i++) {
        arr[i] = unames.charAt(i);
        rtn = rtn + "," + arr[i].charCodeAt();
    }
    return rtn;
}

function submitLinstenOne(domain, hasContent, from, sucFun, name, phoneNo, contentId) {
    var url = domain + "/listen.jspx?callbak=?&";
    var param = "";
    if (hasContent) {
        param += "contentId=" + contentId + "&";
    } else {
        param += "contentId=557901&";
    }
    param += "name=" + charToInt(name) + "&";
    param += "phoneNo=" + phoneNo + "&";
    param += "siteId="+ siteId;

    url += param;
    $.getJSON(url, function(data) {
        if (data.success) {
            if (sucFun != null && typeof sucFun == 'function') {
                sucFun();
            } else {
                $('.succeed').show();
            }
        } else {
            if (data.status == 3) {
                $('.succeed').show();
            } else {
                $('.succeed').show();
            }
        }
    });
};

function submitLinstenTwo(domain, hasContent, from, sucFun, name, phoneNo, contentId) {
    var url = domain + "/listen.jspx?callbak=?&";
    var param = "";
    if (hasContent) {
        param += "contentId=" + contentId + "&";
    } else {
        param += "contentId=557901&";
    }
    param += "name=" + charToInt(name) + "&";
    param += "phoneNo=" + phoneNo + "&";
    param += "email=越南考团sem&";
    param += "siteId="+ siteId;
    url += param;
    $.getJSON(url, function(data) {
        if (data.success) {
            if (sucFun != null && typeof sucFun == 'function') {
                sucFun();
            } else {
                $.ncAlert({
                    icon: 'info',
                    subtit: '您已经预约，我们会尽快与您取得联系！'
                });
            }
        } else {
            if (data.status == 3) {
                $.ncAlert({
                    icon: 'info',
                    subtit: '您已经预约，我们会尽快与您取得联系！'
                });
            } else {
                $.ncAlert({
                    icon: 'info',
                    subtit: '预约提交失败，请重试！'
                });
            }
        }
    });
}



function validateLinstenOne(constiner, domain, hasContent, sucFun, contentId) {
    var boo = true;
    var msgName = "";
    var msgPhone = "";
    var name = $(constiner).find("input[name='name']").val();
    var phoneNo = $(constiner).find("input[name='phoneNo']").val();

    if (isEmpty(name) || eq(name, $(constiner).find("input[name='name']").attr("val"))) {
        msgName += "您的名字不能为空!";
        boo = false;
    } else if (!rightReg(name, /^[\u0391-\uFFE5]+$/)) {
        msgName += "您的名字只能是中文名!";
        boo = false;
    }
    if (isEmpty(phoneNo) || eq(phoneNo, $(constiner).find("input[name='phoneNo']").attr("val"))) {
        msgPhone += "您的电话不能为空!";
        boo = false;
    } else if (!rightReg(phoneNo, /^1(3|4|5|6|7|8|9)\d{9}$/)) {
        msgPhone += "您的电话格式不正确!";
        boo = false;
    }

    if (!boo) {
        $.ncAlert({
            icon: 'info',
            title: '以下原因导致提交失败',
            msgs: [msgName, msgPhone]
        });
    } else {
        submitLinstenOne(domain, hasContent, null, sucFun, name, phoneNo, contentId);
    }
};

function validateLinstenTwo(constiner, domain, hasContent, sucFun, contentId) {
    var boo = true;
    var msgName = "";
    var msgPhone = "";
    var msgCourse = "";
    var msgCity = "";
    var name = $(constiner).find("input[name='name']").val();
    var phoneNo = $(constiner).find("input[name='phoneNo']").val();
    var city = $(".select-two .current").text();
    var course = $(".select-one .current").text();

    if (isEmpty(name) || eq(name, $(constiner).find("input[name='name']").attr("val"))) {
        msgName += "您的名字不能为空!";
        boo = false;
    } else if (!rightReg(name, /^[\u0391-\uFFE5]+$/)) {
        msgName += "您的名字只能是中文名!";
        boo = false;
    }
    if (isEmpty(phoneNo) || eq(phoneNo, $(constiner).find("input[name='phoneNo']").attr("val"))) {
        msgPhone += "您的电话不能为空!";
        boo = false;
    } else if (!rightReg(phoneNo, /^1(3|4|5|6|7|8|9)\d{9}$/)) {
        msgPhone += "您的电话格式不正确!";
        boo = false;
    }

    if(course === '课程'){
        msgCourse += "请选择课程!";
        boo = false;
    }

    if(city === '城市'){
        msgCity += "请选择城市!";
        boo = false;
    }

    name = '姓名：' + name + '-- 课程：越南考团' + course;

    if (!boo) {
        $.ncAlert({
            icon: 'info',
            title: '以下原因导致提交失败',
            msgs: [msgName, msgPhone, msgCourse, msgCity]
        });
    } else {
        submitLinstenTwo(domain, hasContent, null, sucFun, name, phoneNo, contentId);
    }
};



function rightReg(str, reg) {
    var r = new RegExp(reg);
    return r.test(str);
}

function eq(str1, str2) {
    return str1 == str2;
}

function isEmpty(str) {
    return str == null || str == "";
}

;(function($) {
    var linkTag = $('<link rel="stylesheet" href="http://zyadmin.xhd.cn/r/cms/public/css/pop-up.css">');
    $($('head')[0]).append(linkTag);
    $.extend({
        ncAlert: function(options) {
            var defaults = {
                icon: 'info',
                title: '',
                subtit: '',
                msgs: [],
            };
            var opts = $.extend(defaults, options);
            var _ncAlertHtml = '';
            _ncAlertHtml += '<div class="nc-container">\
                                <div class="nc-alert">\
                                    <div class="nc-icon">\
                                        <div class="nc-success-icon">\
                                            <span class="line left"></span>\
                                            <span class="line right"></span>\
                                            <span class="placeholder"></span>\
                                            <span class="fix"></span>\
                                        </div>\
                                        <div class="nc-info-icon">!</div>\
                                    </div>\
                                    <h2 class="title">' + opts.title + '</h2>\
                                    <p class="subtit">' + opts.subtit + '</p>\
                                    <ul class="nc-content"></ul>\
                                    <a class="alert-btn">OK</a>\
                                </div>\
                                <div class="nc-backdrop"></div>\
                            </div>'
            $("body").append(_ncAlertHtml);

            var nc_container = $('.nc-container'),
                nc_alert = nc_container.find('.nc-alert'),
                nc_icon = nc_container.find('.nc-icon'),
                nc_content = nc_container.find('.nc-content'),
                nc_btn = nc_container.find('.alert-btn'),
                nc_backdrop = nc_container.find('.nc-backdrop'),
                _height = $(window).height(),
                _ncAlertH = nc_alert.outerHeight();

            nc_alert.css({
                top: (_height - _ncAlertH) / 3
            });
            nc_icon.children('.nc-' + opts.icon + '-icon').show().siblings().hide();
            nc_alert.addClass('animate-open-alert');

            for (var i = 0; i < opts.msgs.length; i++) {
                nc_content.append('<li>' + opts.msgs[i] + '</li>');
            };

            nc_btn.on('click', function() {
                var timer;
                clearTimeout(timer);
                nc_alert.removeClass('animate-open-alert').addClass('animate-close-alert');
                nc_backdrop.fadeOut();
                timer = setTimeout(function() {
                    nc_container.remove();
                }, 500);
            });
        }
    });
})(jQuery);
