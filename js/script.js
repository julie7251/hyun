window.addEventListener("load", function () {
  // AOS적용
  AOS.init();
  // 안내창
  let body = document.querySelector("body");
  let modal = document.querySelector(".modal-wrap");
  modal.addEventListener("click", function () {
    // modal.style.display = "none";
    // fadeOut(modal);
    anime({
      targets: ".modal",
      delay: 200,
      duration: 500,
      opacity: 0,
      easing: "easeInOutQuad",
      complete:function(){
        modal.style.display = "none";
        body.classList.add("active")
      }
    });
  });
  // 언어 펼침 기능
  const langWord = document.querySelector(".language-word");
  const language = document.querySelector(".languge");
  const languageLi = document.querySelector(".languge li");
  langWord.addEventListener("click", function () {
    language.classList.toggle("language-box-active");
  });
  // css의 transition: all 0.5s; 자바스크립트 기능
  setTimeout(function () {
    languageLi.style.transition = "all 0.5s";
  });
  // =============================헤더 기능
  // 스크롤 기능
  // 스크롤바의 상단위치
  let scy = 0;
  let scActive = 50;
  scy = window.document.documentElement.scrollTop;
  // console.log(scy);
  let header = document.querySelector(".header");
  let logoW = document.querySelector(".logo-w");
  let logoG = document.querySelector(".logo-g");
  // 마우스 호버했을때
  header.addEventListener("mouseenter", () => {
    header.classList.add("header-active");
    logoW.style.display = "none";
    logoG.style.display = "block";
  });
  header.addEventListener("mouseleave", () => {
    header.classList.remove("header-active");
    logoW.style.display = "block";
    logoG.style.display = "none";
  });
  // 스크롤 될때 헤더
  window.addEventListener("scroll", () => {
    scy = window.document.documentElement.scrollTop;
    if (scy > scActive) {
      header.classList.add("header-active");
      logoW.style.display = "none";
      logoG.style.display = "block";
    } else {
      header.classList.remove("header-active");
      logoW.style.display = "block";
      logoG.style.display = "none";
    }
  });
  // ========================메뉴기능
  let nav = this.document.querySelector(".nav");
  let btMenu = this.document.querySelector(".bt-menu");
  let navClose = this.document.querySelector(".nav-close");
  btMenu.addEventListener("click", () => {
    nav.classList.add("nav-active");
  });
  navClose.addEventListener("click", () => {
    nav.classList.remove("nav-active");
  });
  // nav영역에서 벗어나면 메뉴가 사라지는 기능
  nav.addEventListener("mouseleave", () => {
    nav.classList.remove("nav-active");
  });
  // =======================비주얼 기능

  // 비디오 항목 체크 (video태그로 파악)
  // 모든비디오 태그를 변수에 저장
  let videos = this.document.querySelectorAll(".swVisual video");
  // console.log(videos);
  // 비디오 재생시간 체크
  // 비디오의 재생 시간을 보관할 배열을 생성
  let videosTimeArr = [];
  // 비디오 재생 시간을 배열에 저장하는 반복문을 작성
  for (let i = 0; i < videos.length; i++) {
    // console.log(videos[0].duration);

    videosTimeArr[i] = Math.ceil(videos[i].duration);
    // console.log(videosTimeArr[0]);
  }
  // 첫번째 비디오 자동 실행
  let videoIndex = 0;
  videos[videoIndex].play();
  // visual slide
  // swiper슬라이드 초기화
  let swVisual = new Swiper(".swVisual", {
    loop: true,
  });
  // 슬라이드 변경 이벤트시 처리
  swVisual.on("slideChange", function () {
    // 진행중인 비디오 멈춤
    videos[videoIndex].pause();
    // 다음 화면 보이는 swiper 슬라이드 번호
    // console.log(swVisual.activeIndex);
    // console.log(swVisual.realIndex);
    videoIndex = swVisual.realIndex;
    // 다음 비디오를 재생
    // 처음으로 비디오 플리이헤드 이동
    // currentTime 속성  HTML5 <video>요소에서 사용되는 속성,
    // 현재 비디오 재생 위치를 나타냅니다.
    // 이속성을 조작하여 재생 위치를 변경
    // 다음 슬라이드로 이동할때 마다 비디오를 처음 부터 재생하기 위해서

    videos[videoIndex].currentTime = 0;
    const playPromise = videos[videoIndex].play();
    if (playPromise !== undefined) {
      playPromise.then((_) => {}).catch((error) => {});
    }
    clearInterval(videoTimer);
    videoReset();
  });
  // 비디오 영상이 플레이가 끝나면 다음 슬라이드로 이동
  // 늘어나는 흰색 bar 기능 추가
  let bars = this.document.querySelectorAll(".bar");
  let barScaleW = 0;
  // 타이머를 생성한다
  // 비디오 타이머 초기화 및 설정
  let videoTimer;
  // 비디오 타이머를 설정하고 초기화하는 함수 를 정의하고 호출
  function videoReset() {
    // 처음에는 0%로 만들려고
    barScaleW = 0;
    // 최초에 bar 를 초기화 한다.
    for (let i = 0; i < bars.length; i++) {
      let tag = bars[i];
      tag.style.width = `${barScaleW}%`;
    }

    // 활성화 될 bar클래스 선택
    let activeBar = bars[videoIndex];
    //  console.log(activeBar);
    // 일단 타이머를 청소한다.
    // setTimeOut : 1번 실행 clearTimeOut()
    // setInterval : 시간마다 연속 실행 clearInterval()
    clearInterval(videoTimer);
    // 비디오 플레이시간
    let videoTime = videosTimeArr[videoIndex];
    // console.log(videoTime);
    videoTimer = setInterval(() => {
      barScaleW++;
      // console.log(barScaleW);
      activeBar.style.width = `${barScaleW}%`;
      if (barScaleW >= 100) {
        swVisual.slideNext();
        clearInterval(videoTimer);
        videoReset();
      }
    }, videoTime * 10);
  }
  videoReset();

  // .visual-control > li 클릭했을때 해당 페이지 활성화하기
  const visualControlLi = this.document.querySelectorAll(
    ".visual-control > li"
  );
  visualControlLi.forEach((item, index) => {
    item.addEventListener("click", function () {
      videoIndex = index;
      swVisual.slideTo(videoIndex);
    });
    // console.log(index);
    // console.log(item);
  });
  // 비지니스 swiper
  const sWBusiness = new Swiper(".swBusiness", {
    loop: true,
    speed: 500,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
});
