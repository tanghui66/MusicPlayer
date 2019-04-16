(function () {
    var falg=false;
    $('.play-list').on('click',function () {
        falg=!falg;
        if (falg){
            $('.play-list-box').animate({
                bottom:46
            },300)
        }else{
            $('.play-list-box').animate({
                bottom:-200
            },300)
        }

    })
    $('footer .btns .start').on('click',function () {
        falg=!falg;
        if(falg){
            $('.btns .start').animate({
                backgroundPositionY:-160
            },1)
        }else{
            $('.btns .start').animate({
                backgroundPositionY:-198
            },1)
        }
    });
})();