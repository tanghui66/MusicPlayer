(function () {



    let date=[{
        url:'我曾.mp3',
        song:'我曾',
        singer:'鱼大仙儿',
        pic:'img/109951163958414055.jpg'
    },{
        url:'绿色.mp3',
        song:'绿色',
        singer:'赵雪琳',
        pic:'img/109951163860425334.jpg'
    },{
        url:'病变.m4a',
        song:'病变',
        singer:'鞠文娴',
        pic:'https://p2.music.126.net/4TuBpyxVpbHnj2EMCSnW9w==/109951163176375492.jpg?param=34y34"'
    },{
        url:'一定要爱你.m4a',
        song:'一定要爱你',
        singer:'陶晶晶',
        pic:'img/7931876885165531.jpg'
    }];
//获取元素
    //上一曲
    let prev = document.querySelector(" .prev");
    // 暂停开始
    let starts = document.querySelector(".start");
    //下一曲
    let next = document.querySelector(" .next");
    //播放音乐
    let audio = document.querySelector("audio");
    //歌手歌曲
    let songSinger = document.querySelector(".ctrl-bars-box span");

    //logo图片
    let logoimg = document.querySelector(".logo img");
    //播放列表
    let playlist = document.querySelector(".play-list-box ul");
    //进度时间
    let nowTimeSpan = document.querySelector(" .nowTime");
    //总时长
    let totalTimeSpan = document.querySelector(" .totalTime");
    let ctrlBars = document.querySelector(" .ctrl-bars");
    //显示进度条
    let nowBars = document.querySelector(" .nowBars");
    //进度条的圆心
    let ctrlBtn = document.querySelector(" .ctrl-btn");
    //音乐播放模式
    let mode = document.querySelector(" .mode");
    let infos = document.querySelector(" .info");





    //变量
    let  index=0; //标识当前歌曲信息
    let str=' ';//用来累计播放项
    let rotateDeg=0;// 记录专辑旋转角度
    let tre=null;
   let  modeNum=0;// 0顺序播放 1单曲播放 2随机播放
    //加载播放列表
    for (let i = 0; i < date.length ; i++) {
        str +='<li>';
        str +='<span class="left">'+date[i].song+'</span>';
        str +='<span class="right">'+date[i].singer+'</span>';
        str +='</li>';

    }
    playlist.innerHTML=str;
//切换播放选择列表
    function checkPlayList() {
        let listLi=document.querySelectorAll(" .play-list-box li");
        for (let i = 0; i <listLi.length; i++) {
            listLi[i].className=  '';

        }
        listLi[index].className='active';
        // listLi[index].className='active';
    }

    //格式化时间
    function formatTime(time) {
        return time > 9  ? time : '0' + time;
        
    };
    //模式提示框
    function info(str) {
        clearInterval(tre);
        infos.innerHTML=str;
        $(infos).fadeIn();
        // infos.style.display='block';
        tre= setInterval(function () {
            // infos.style.display='none';
            $(infos).fadeOut();
        },1000);

    };
//    播放
function play() {

clearInterval(tre);

    audio.play();

    tre=setInterval(function () {
        rotateDeg++;
        logoimg.style.transform='rotate('+rotateDeg+'deg)';
    },30);
    
}
    //初始化
    function init(){
        rotateDeg=0;
        checkPlayList();
        //设置播放那首歌
        audio.src=date[index].url;
        songSinger.innerHTML='歌名：'+date[index].song + ' --歌手：'+date[index].singer;
        logoimg.src=date[index].pic;
    }

    init();

    // 取不重复的随机数
    function getRandomNum(){
        let  randoNum=Math.floor(Math.random()*date.length);//向下取整
        if(randoNum === index ){
            randoNum=getRandomNum();
        }
        return randoNum;
    };
    //暂停和播放
    starts.addEventListener("click",function () {
        //播放
        if (audio.paused){   //paused这个属性返回的是true fales

            play();
        } else {
            audio.pause();
            clearInterval(tre);
        }
//下一曲
next.addEventListener('click',function () {
    index++;

    index=index>date.length-1?0:index;
    init();
    play();
})

        //上一曲
        prev.addEventListener('click',function () {
            index--;
            index=index<0?date.length-1:index;
            init();
            play();

        });


    });
    // 切换播放模式
    mode.addEventListener('click',function () {
        modeNum++;
        modeNum=modeNum>2?0:modeNum;
        console.log(modeNum);
        switch (modeNum) {
            case 0:
                info('顺序播放');
                mode.style.backgroundPositionX='0px';
                mode.style.backgroundPositionY='275px';

                break;
            case 1:
                info('单曲播放');
                mode.style.backgroundPositionX='60px';
                mode.style.backgroundPositionY='275px';
                break;
            case 2:
                info('随机播放');
                mode.style.backgroundPositionX='60px';
                mode.style.backgroundPositionY='370px';
                break;
        }

    });
    //音乐准备完成
    audio.addEventListener('canplay',function () {
        let  totalTime=audio.duration;//音乐总时长
         let totalM = parseInt(totalTime / 60); //分钟数
         let  totalS =parseInt(totalTime % 60); //秒数
        totalTimeSpan.innerHTML= formatTime(totalM) +':'+ formatTime(totalS);
        audio.addEventListener('timeupdate',function () {
            let currentTime = audio.currentTime;//当前时长
           let currentM=  parseInt(currentTime / 60); //分钟数
            let  currentS =parseInt(currentTime % 60);//秒数
            nowTimeSpan.innerHTML=formatTime(currentM) +':'+formatTime(currentS);

            let barWidth=ctrlBars.clientWidth;//当前的宽度
            let position=currentTime/totalTime*barWidth;
            nowBars.style.width=position +'px';
            ctrlBtn.style.left=position-5+'px';
            if(audio.ended){
                switch (modeNum) {
                    //顺序播放
                    case 0:

                           next.click();
                        break;
                    //单曲播放
                    case 1:

                        init();
                        play();
                        break;
                    //随机播放
                    case 2:

                        index=getRandomNum();
                        init();
                        play();
                        break;
                }
            }

        });
        ctrlBars.addEventListener('click',function (e) {
             audio.currentTime=e.offsetX/ctrlBars.clientWidth*audio.duration;

        });
        // ctrlBars.addEventListener('click',function () {
        //     window.onmouseover=function (e) {
        //         audio.currentTime=e.offsetX/ctrlBars.clientWidth*audio.duration;
        //     }
        //
        // })
    });
})();