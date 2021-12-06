
'use strict';

$(document).ready(function() {
  preventDefaultAnchor();
  typingHeader();
  scrollAnimate();
  pageVisibility('#page2');
  topCheckScroll();
  pageChange();
});

function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
}
  
function typingHeader() {
  var typingBool = false; 
  var typingIdx=0; 
  var liIndex = 0;
  var liLength = $(".txt-wrap>ul>li").length;

  // 타이핑될 텍스트를 가져온다 
  var typingTxt = $(".txt-wrap>ul>li").eq(liIndex).text(); 
  typingTxt=typingTxt.split(""); // 한글자씩 자른다. 
  if(typingBool==false){ // 타이핑이 진행되지 않았다면 
      typingBool=true; 
      var tyInt = setInterval(typing,100); // 반복동작 
  } 
  function typing(){
    $(".txt-typing-wrap ul li").removeClass("on");
    $(".txt-typing-wrap ul li").eq(liIndex).addClass("on");
    if(typingIdx<typingTxt.length){ // 타이핑될 텍스트 길이만큼 반복 
      $(".txt-typing-wrap ul li").eq(liIndex).append(typingTxt[typingIdx]); // 한글자씩 이어준다. 
      typingIdx++; 
    } else { if(liIndex<liLength-1){
      //다음문장으로  가기위해 인덱스를 1증가
        liIndex++; 
      //다음문장을 타이핑하기위한 셋팅
          typingIdx=0;
          typingBool = false; 
          typingTxt = $(".txt-wrap>ul>li").eq(liIndex).text(); 
        
      //다음문장 타이핑전 1초 쉰다
          clearInterval(tyInt);
            //타이핑종료
      
          setTimeout(function(){
            //1초후에 다시 타이핑 반복 시작
            tyInt = setInterval(typing,100);
          },1000);
          } else if(liIndex==liLength-1){
            
          //마지막 문장까지 써지면 반복종료
            clearInterval(tyInt);
          }
    } 
  }  
  $(window).on('scroll resize', function() {
    var scrollAmt = $(document).scrollTop();
    var windowHeight = $(window).height();
    if (scrollAmt > windowHeight / 2) {
      $(".txt-typing-wrap ul li").eq(liIndex).removeClass("on");
    } else {
      $(".txt-typing-wrap ul li").eq(liIndex).addClass("on");
    }
  })
};

//header scroll시 addClass('on')
function topCheckScroll() {
  $(window).on('scroll resize', function() {
    var scrollAmt = $(document).scrollTop();
    var documentHeight = $('#page2').offset().top;
    if(scrollAmt > documentHeight) {
      $('#header').addClass('on');
    }else {
      $('#header').removeClass('on');
    }
  });
}

//스크롤시 animate

function scrollAnimate() {
  $('#page3 .wrapper ul').children().addClass('up-scroll');
  $('#page4 .wrapper .txt-wrap').children().addClass('up-scroll');

  function isElementUnderBottom(elem, triggerDiff) {
    const { top } = elem.getBoundingClientRect();
    const { innerHeight } = window;
    return top > innerHeight + (triggerDiff || 0);
  }

  function handleScroll() {
    const elems = document.querySelectorAll('.up-scroll');
    elems.forEach(elem => {
      if (isElementUnderBottom(elem, -20)) {
        elem.style.opacity = "0";
        elem.style.transform = 'translateY(70px)';
      } else {
        elem.style.opacity = "1";
        elem.style.transform = 'translateY(0px)';
      }
    })
  }
  window.addEventListener('scroll', handleScroll);
}

function pageVisibility(selector) { 
  $(window).on('scroll resize', function() {
    $(selector).each(function() {
      var $selector = $(this)
      var start = $selector.offset().top - $(window).height();
      var scrollAmt = $(document).scrollTop();
      if (scrollAmt >= start - 30) {
        $selector.addClass('on');
      } else {
        $selector.removeClass('on');
      }
    });
  })
}


function pageChange() {
  var numPage = $('section.page').length;
  var pageNow = 0;
  var pagePrev = 0;
  var pageNext = 0;

  showPage(1);
  
  $('#header .wrapper ul > li > a').on('click', function() {
    var index = $('#header .wrapper ul > li').index($(this).parent());
    showPage(index + 1);
  });

  function showPage(n) {
    var scrollAmt = $('section.page:eq(' + (n - 1) + ')').offset().top;
    $('html').stop(true).animate({'scrollTop': scrollAmt}, 500, function() {
    });
    pageNow = n;
    pagePrev = (n <= 1) ? 1 : (n - 1);
    pageNext = (n >= numPage) ? numPage : (n + 1);
  }
}