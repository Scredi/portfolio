/*
    = Preloader
    = Animated scrolling / Scroll Up
    = Full Screen Slider
    = Sticky Menu
    = Back To Top
    = Countup
    = Progress Bar
    = More skill
    = Shuffle
    = Modal slider
    = Wow js
    = Typed js
    = Google Map

*/

jQuery(function ($) {

    'use strict';

    /* ---------------------------------------------- /*
     * Preloader
    /* ---------------------------------------------- */

    $(window).ready(function() {
        $('#pre-status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
    });


    $(function () {
        $.ajax({
            type: "GET",
            url: "./bdd/results.php",
            dataType: "json",
            success: function(json) {
                $(".item-info ul li#comptaPlus").text(json.comptaVoteUp);
                $(".item-info ul li#comptaMinus").text(json.comptaVoteDown);
                $(".item-info ul li#todPlus").text(json.todVoteUp);
                $(".item-info ul li#todMinus").text(json.todVoteDown);
                $(".item-info ul li#cpPlus").text(json.cpVoteUp);
                $(".item-info ul li#cpMinus").text(json.cpVoteDown);
                $(".item-info ul li#gdaPlus").text(json.gdaVoteUp);
                $(".item-info ul li#gdaMinus").text(json.gdaVoteDown);
                $(".item-info ul li#adrPlus").text(json.adrVoteUp);
                $(".item-info ul li#adrMinus").text(json.adrVoteDown);
            }
        });
    });



    // -------------------------------------------------------------
    // Animated scrolling / Scroll Up
    // -------------------------------------------------------------

    (function () {
        $('a[href*=#]').bind("click", function(e){
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1000);
            e.preventDefault();
        });
    }());

    // -------------------------------------------------------------
    // Full Screen Slider
    // -------------------------------------------------------------
    (function () {
        $(".fullHeight").height($(window).height());

        $(window).resize(function(){
            $(".fullHeight").height($(window).height());
        });

    }());

    // -------------------------------------------------------------
    // Sticky Menu + Transition effect navbar-brand
    // -------------------------------------------------------------

    (function () {
        $('.header').sticky({
            topSpacing: 0
        });

        $('body').scrollspy({
            target: '.navbar-custom',
            offset: 70
        });

        $(document).scroll(function () {
            if($(document).scrollTop() > $("#about").offset().top) {
                $(".header a.navbar-brand").css({
                    transform: "scale(0.8)",
                    transition: "all 0.2s linear"
                });
            } else {
                $(".header a.navbar-brand").css({
                    transform: "scale(1)",
                    transition: "all 0.2s linear"
                });
            }
        });
    }());


    // -------------------------------------------------------------
    // Back To Top
    // -------------------------------------------------------------

    (function () {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });
    }());


    // -------------------------------------------------------------
    // Countup
    // -------------------------------------------------------------
    $('.count-wrap').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.timer').each(function () {
                var $this = $(this);
                $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).unbind('inview');
        }
    });


    // -------------------------------------------------------------
    // Progress Bar
    // -------------------------------------------------------------
 
    $('.skill-progress').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $.each($('div.progress-bar'),function(){
                $(this).css('width', $(this).attr('aria-valuenow')+'%');
            });
            $(this).unbind('inview');
        }
    });
    
    // -------------------------------------------------------------
    // More skill
    // -------------------------------------------------------------
    $('.more-skill').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $('.chart').easyPieChart({
                //your configuration goes here
                easing: 'easeOut',
                delay: 3000,
                barColor:'#68c3a3',
                trackColor:'rgba(255,255,255,0.2)',
                scaleColor: false,
                lineWidth: 8,
                size: 140,
                animate: 2000,
                onStep: function(from, to, percent) {
                    this.el.children[0].innerHTML = Math.round(percent);
                }

            });
            $(this).unbind('inview');
        }
    });


    // -------------------------------------------------------------
    // Shuffle
    // -------------------------------------------------------------

    (function () {

        var $grid = $('#grid');

        $grid.shuffle({
            itemSelector: '.portfolio-item'
        });

        /* reshuffle when user clicks a filter item */
        $('#filter a').click(function (e) {
            e.preventDefault();

            // set active class
            $('#filter a').removeClass('active');
            $(this).addClass('active');

            // get group name from clicked item
            var groupName = $(this).attr('data-group');

            // reshuffle grid
            $grid.shuffle('shuffle', groupName );
        });


    }());


    // -------------------------------------------------------------
    // Modal slider
    // -------------------------------------------------------------

    var itemInfoWrapper = $('.single-item');

    itemInfoWrapper.each(function(){
        var container = $(this),
        // create slider pagination
            sliderPagination = createSliderPagination(container);

        //update slider navigation visibility
        updateNavigation(container, container.find('.slider li').eq(0));

        container.find('.slider').on('click', function(event){
            //enlarge slider images
            if( !container.hasClass('slider-active') && $(event.target).is('.slider')) {
                itemInfoWrapper.removeClass('slider-active');
                container.addClass('slider-active').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                    $('body,html').animate({'scrollTop':container.offset().top}, 200);
                });
            }
        });

        container.find('.close').on('click', function(){
            //shrink slider images
            container.removeClass('slider-active');
        });

        //update visible slide
        container.find('.next').on('click', function(){
            nextSlide(container, sliderPagination);
        });

        container.find('.prev').on('click', function(){
            prevSlide(container, sliderPagination);
        });

        container.find('.slider').on('swipeleft', function(){
            var wrapper = $(this),
                bool = enableSwipe(container);
            if(!wrapper.find('.selected').is(':last-child') && bool) {nextSlide(container, sliderPagination);}
        });

        container.find('.slider').on('swiperight', function(){
            var wrapper = $(this),
                bool = enableSwipe(container);
            if(!wrapper.find('.selected').is(':first-child') && bool) {prevSlide(container, sliderPagination);}
        });

        sliderPagination.on('click', function(){
            var selectedDot = $(this);
            if(!selectedDot.hasClass('selected')) {
                var selectedPosition = selectedDot.index(),
                    activePosition = container.find('.slider .selected').index();
                if( activePosition < selectedPosition) {
                    nextSlide(container, sliderPagination, selectedPosition);
                } else {
                    prevSlide(container, sliderPagination, selectedPosition);
                }
            }
        });
    });

    //keyboard slider navigation
    $(document).keyup(function(event){
        if(event.which=='37' && $('.slider-active').length > 0 && !$('.slider-active .slider .selected').is(':first-child')) {
            prevSlide($('.slider-active'), $('.slider-active').find('.slider-pagination li'));
        } else if( event.which=='39' && $('.slider-active').length && !$('.slider-active .slider .selected').is(':last-child')) {
            nextSlide($('.slider-active'), $('.slider-active').find('.slider-pagination li'));
        } else if(event.which=='27') {
            itemInfoWrapper.removeClass('slider-active');
        }
    });

    function createSliderPagination($container){
        var wrapper = $('<ul class="slider-pagination"></ul>').insertAfter($container.find('.slider-navigation'));
        $container.find('.slider li').each(function(index){
            var dotWrapper = (index == 0) ? $('<li class="selected"></li>') : $('<li></li>'),
                dot = $('<a></a>').appendTo(dotWrapper);
            dotWrapper.appendTo(wrapper);
            dot.text(index+1);
        });
        return wrapper.children('li');
    }

    function nextSlide($container, $pagination, $n){
        var visibleSlide = $container.find('.slider .selected'),
            navigationDot = $container.find('.slider-pagination .selected');
        if(typeof $n === 'undefined') $n = visibleSlide.index() + 1;
        visibleSlide.removeClass('selected');
        $container.find('.slider li').eq($n).addClass('selected').prevAll().addClass('move-left');
        navigationDot.removeClass('selected');
        $pagination.eq($n).addClass('selected');
        updateNavigation($container, $container.find('.slider li').eq($n));
    }

    function prevSlide($container, $pagination, $n){
        var visibleSlide = $container.find('.slider .selected'),
            navigationDot = $container.find('.slider-pagination .selected');
        if(typeof $n === 'undefined') $n = visibleSlide.index() - 1;
        visibleSlide.removeClass('selected');
        $container.find('.slider li').eq($n).addClass('selected').removeClass('move-left').nextAll().removeClass('move-left');
        navigationDot.removeClass('selected');
        $pagination.eq($n).addClass('selected');
        updateNavigation($container, $container.find('.slider li').eq($n));
    }

    function updateNavigation($container, $active) {
        $container.find('.prev').toggleClass('inactive', $active.is(':first-child'));
        $container.find('.next').toggleClass('inactive', $active.is(':last-child'));
    }

    function enableSwipe($container) {
        var mq = window.getComputedStyle(document.querySelector('.slider'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
        return ( mq=='mobile' || $container.hasClass('slider-active'));
    }


    // -------------------------------------------------------------
    // STELLAR FOR BACKGROUND SCROLLING
    // -------------------------------------------------------------

    $(window).load(function() {

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
         
        }else {
            $.stellar({
                horizontalScrolling: false,
                responsive: true
            });
        }

    });


    // -------------------------------------------------------------
    // WOW JS
    // -------------------------------------------------------------

    (function () {

        new WOW({

            mobile:  false

        }).init();

    }());


    // -------------------------------------------------------------
    // Contact Form
    // -------------------------------------------------------------

    (function () {

        $(".contact-form form input[type='text'], .contact-form form textarea").on("focus", function() {
            $(".contact-form form .form-group").removeClass("has-error");
            $(".contact-form .alert").fadeOut("fast", function () {
                $(this).remove();
            });
        });

        $(".contact-form form").submit(function(e) {
            e.preventDefault();
            $(".contact-form form input[type='text'], .contact-form form textarea").removeClass("has-error");
            var postData = $(".contact-form form").serialize();
            $.ajax({
                type: "POST",
                url: "./mail/mail.php",
                data: postData,
                dataType: "json",
                success: function(json) {
                    if(json.errorName != "") {
                        $(".contact-form form .contact-name").addClass("has-error");
                    }
                    if(json.errorEmail != "") {
                        $(".contact-form form .contact-email").addClass("has-error");
                    }
                    if(json.errorSubject != "") {
                        $(".contact-form form .contact-subject").addClass('has-error');
                    }
                    if(json.errorMessage != "") {
                        $(".contact-form form .contact-message").addClass("has-error");
                    }
                    if(json.errorSpam != "") {
                        $(".contact-form form .contact-antispam").addClass("has-error");
                    }
                    if(json.errorName == "" && json.errorEmail == "" && json.errorSubject == "" && json.errorMessage == "" && json.errorSpam == "") {
                        $(".contact-form form input[type='text'], .contact-form form textarea").val("");
                        $(".contact-form .alert").remove();
                        $(".contact-form form").prepend("<div class='alert alert-success text-center'><h5>Email envoyé. Je vous répondrez au plus vite, merci !</h5></div>");
                    }
                    else {
                        $(".contact-form .alert").remove();
                        $(".contact-form form").prepend("<div class='alert alert-danger text-center'><h5>Avez-vous rempli tous les champs ?</h5></div>");
                    }
                }
            });
        });
    }());





    // -------------------------------------------------------------
    // Google Map
    // -------------------------------------------------------------

    (function () {
        var myLatlng = new google.maps.LatLng(48.864716, 	2.349014);

            var styles = [
                {
                    featureType: "landscape",
                    stylers: [
                        { color: '#f7f7f7' }
                    ]
                },{
                    featureType: "natural",
                    stylers: [
                        { hue: '#00ffe6' }
                    ]
                },{
                    featureType: "road",
                    stylers: [
                        { hue: '#fff' },
                        { saturation: -70 }
                    ]
                },{
                    featureType: "building",
                    elementType: "labels",
                    stylers: [
                        { hue: '' }
                    ]
                },{
                    featureType: "poi",
                    stylers: [
                        { hue: '' }
                    ]
                }
            ];

            var isDraggable = $(document).width() > 766 ? true : false;

            var mapOptions = {
                draggable: isDraggable,
                zoom: 11,
                scrollwheel: false,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true,
                styles: styles
            };
            var map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                animation: google.maps.Animation.DROP
            });

            var contentString = "Oui oui, je suis dans ce coin !";

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });

    }());


    // -------------------------------------------------------------
    // Vote
    // -------------------------------------------------------------


    (function () {
        $(".item-info ul li.thumbUp, .item-info ul li.thumbDown").click(function () {
            switch (this.id) {
                case "comptaVoteUp":
                    $.ajax({
                        type: "POST",
                        url: "./bdd/vote.php",
                        data: {project: "compta-free", vote: "up", token: localStorage.getItem('token')},
                        dataType: "json",
                        success: function (json) {
                            if($.isNumeric(json.voteUp)) {
                                $(".item-info li#comptaPlus").text(json.voteUp);
                            }
                            if(json.done !== undefined) {
                                alert(json.done);
                            }
                        }
                    });
                    break;
                case "comptaVoteDown":
                    $.ajax({
                        type: "POST",
                        url: "./bdd/vote.php",
                        data: {project: "compta-free", vote: "down", token: localStorage.getItem('token')},
                        dataType: "json",
                        success: function (json) {
                            if($.isNumeric(json.voteDown)) {
                                $(".item-info li#comptaMinus").text(json.voteDown);
                            }
                            if(json.done !== undefined) {
                                alert(json.done);
                            }
                        }
                    });
                    break;
                case "todVoteUp":
                    $.ajax({
                        type: "POST",
                        url: "./bdd/vote.php",
                        data: {project: "tod", vote: "up", token: localStorage.getItem('token')},
                        dataType: "json",
                        success: function (json) {
                            if($.isNumeric(json.voteUp)) {
                                $(".item-info li#todPlus").text(json.voteUp);
                            }
                            if(json.done !== undefined) {
                                alert(json.done);
                            }
                        }
                    });
                    break;
                case "todVoteDown":
                    $.ajax({
                        type: "POST",
                        url: "./bdd/vote.php",
                        data: {project: "tod", vote: "down", token: localStorage.getItem('token')},
                        dataType: "json",
                        success: function (json) {
                            if($.isNumeric(json.voteDown)) {
                                $(".item-info li#todMinus").text(json.voteDown);
                            }
                            if(json.done !== undefined) {
                                alert(json.done);
                            }
                        }
                    });
                    break;
                case "cpVoteUp":
                    $.ajax({
                        type: "POST",
                        url: "./bdd/vote.php",
                        data: {project: "cp", vote: "up", token: localStorage.getItem('token')},
                        dataType: "json",
                        success: function (json) {
                            if($.isNumeric(json.voteUp)) {
                                $(".item-info li#cpPlus").text(json.voteUp);
                            }
                            if(json.done !== undefined) {
                                alert(json.done);
                            }
                        }
                    });
                    break;
                case "cpVoteDown":
                    $.ajax({
                        type: "POST",
                        url: "./bdd/vote.php",
                        data: {project: "cp", vote: "down", token: localStorage.getItem('token')},
                        dataType: "json",
                        success: function (json) {
                            if($.isNumeric(json.voteDown)) {
                                $(".item-info li#cpMinus").text(json.voteDown);
                            }
                            if(json.done !== undefined) {
                                alert(json.done);
                            }
                        }
                    });
                    break;
                case "gdaVoteUp":
                    $.ajax({
                        type: "POST",
                        url: "./bdd/vote.php",
                        data: {project: "gda", vote: "up", token: localStorage.getItem('token')},
                        dataType: "json",
                        success: function (json) {
                            if($.isNumeric(json.voteUp)) {
                                $(".item-info li#gdaPlus").text(json.voteUp);
                            }
                            if(json.done !== undefined) {
                                alert(json.done);
                            }
                        }
                    });
                    break;
                case "gdaVoteDown":
                    $.ajax({
                        type: "POST",
                        url: "./bdd/vote.php",
                        data: {project: "gda", vote: "down", token: localStorage.getItem('token')},
                        dataType: "json",
                        success: function (json) {
                            if($.isNumeric(json.voteDown)) {
                                $(".item-info li#gdaMinus").text(json.voteDown);
                            }
                            if(json.done !== undefined) {
                                alert(json.done);
                            }
                        }
                    });
                    break;
                case "adrVoteUp":
                    $.ajax({
                        type: "POST",
                        url: "./bdd/vote.php",
                        data: {project: "adr", vote: "up", token: localStorage.getItem('token')},
                        dataType: "json",
                        success: function (json) {
                            if($.isNumeric(json.voteUp)) {
                                $(".item-info li#adrPlus").text(json.voteUp);
                            }
                            if(json.done !== undefined) {
                                alert(json.done);
                            }
                        }
                    });
                    break;
                case "adrVoteDown":
                    $.ajax({
                        type: "POST",
                        url: "./bdd/vote.php",
                        data: {project: "adr", vote: "down", token: localStorage.getItem('token')},
                        dataType: "json",
                        success: function (json) {
                            if($.isNumeric(json.voteDown)) {
                                $(".item-info li#adrMinus").text(json.voteDown);
                            }
                            if(json.done !== undefined) {
                                alert(json.done);
                            }
                        }
                    });
                    break;
            }
        });
    })();

});



