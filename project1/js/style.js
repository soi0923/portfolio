$(function(){

    let wint;
    let pageN=0;
    let pos=0;

    //페럴렉스 구현 이벤트 실행 

    $(window).scroll(function(){
			wint=$(window).scrollTop();

			if(wint < $("#content1").offset().top){
				pageN=0;
			}else if(wint < $("#content2").offset().top){
				pageN=1;
			}else if(wint < $("#content3").offset().top){
				pageN=2;
			}else if(wint < $("#content4").offset().top){
				pageN=3;
			}else if(wint < $("#content5").offset().top){
				pageN=4;
                //console.log($(window).height()+wint+" : "+$(document).height());

				if(Math.round($(window).height()+wint) == Math.round($(document).height())){
					pageN=5;
				}
			}else{
				pageN=5;
			}

            if(wint > 100){
			$(".btn_top").addClass("active");
            }else{
                $(".btn_top").removeClass("active");
            }

		$("#navBar li").removeClass("active");
		$("#navBar li").eq(pageN).addClass("active");

		// pageN 1, 3, 5, 6 메뉴 글씨 색상 변경
		if(pageN === 1 || pageN === 2 || pageN === 3 || pageN === 4 || pageN === 5){
			$(".top").addClass("color");
		}else{
			$(".top").removeClass("color");
		}
	});

    // $(".tab").click(function(e){
    //     e.preventDefault();
    //     $("body").toggleClass("fixed");
    //     $(".total").toggleClass("open");
    //     $(".dim").toggleClass("active");
    // });

    $(window).trigger("scroll");

    const trigger = new ScrollTrigger.default({
		trigger: {
			once: true,
			toggle: {
				class: {
					in: "active",
					out: "inactive"
				}
			},
			offset: {
				viewport: {
					x: 0,
					y: 0.25
				}
			}
		}
	});

	trigger.add("#main, section[id^=content]");

    const linkArray = [
		"#main", "#content1", "#content2", "#content3", "#content4", "#content5"
	];

    // click 이벤트
    $("#navBar li").click(function(e){
		e.preventDefault();

		pageN = $(this).index();
		//console.log(linkArray[pageN]); // #start

		let target = $(linkArray[pageN]);
		// $("#start").offset().top;

		pos = Math.round(target.offset().top)+5;
		//console.log("click", pos);
		$("html").animate({scrollTop: pos}, 600);
	});

	$(".total .sd-menu").click(function(e){
		e.preventDefault();

		if($(this).hasClass("active") === false){
			$("body").addClass("fixed"); // overflow-y: hidden;
			$(this).addClass("active"); // x
			$(".total .sd-menu").fadeIn(300);
		}else{
			$("body").removeClass("fixed"); // overflow-y: hidden;
			$(this).removeClass("active"); // x
			$(".total .sd-menu").fadeIn(300);
		}
	});

    //해상도가 720보다 커지면 모바일 메뉴 사라짐
    let winw;
        $(window).resize(function(){
            winw = $(window).width();

            //pc해상도
            if(winw > 720){
                if($('.total').hasClass('open')){
                    $('body').removeAttr('class');
                    $('.total').removeClass('open');
                    $('.dim').removeClass('action');

                }
            }
        });
        
        //모바일 메뉴펼쳐져서 눌리면 이동
        $('.total .sd-menu li').click(function(e){
            e.preventDefault();

            pageN = $(this).index();
            $('body').removeClass('fixed');
            $('.total').removeClass('open');
            $('.dim').removeClass('active');
            $('.total .sd-menu').fadeOut(300);



            pageN = $(this).index();

            setTimeout(function(){
                let target = $(linkArray[pageN]);
                pos = target.offset().top;
                $('html').animate({scrollTop: pos}, 600);
            }, 500);
        });


        

        //메뉴 열리는 버튼
        $('.tab').click(function(e){
            e.preventDefault();
            $('body').toggleClass('fixed');
            $('.total').toggleClass('open'); //오른쪽에서부터 옴
            $('.dim').toggleClass('active');
        });

        //dim부분 눌렸을때 닫힘
        $('.dim').click(function(){
            $('body').removeClass('fixed');
            $('.total').removeClass('open'); //오른쪽에서부터 옴
            $('.dim').removeClass('active');
        });

        //top btn 눌렀을때 부드럽게 올라가는 효과
        $(".btn_top").click(function(e){
		e.preventDefault();
		$("html").animate({scrollTop:0}, 400);
	});
});