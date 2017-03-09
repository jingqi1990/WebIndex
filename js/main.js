var canvas = document.getElementById('canvas-webgl');
var renderer = new THREE.WebGLRenderer({
	antialias: false,
	canvas: canvas,
	alpha:true
});
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
var clock = new THREE.Clock();
var isAnimating = false,
	newLocation = '',
	firstLoad = false;
var slider,sliders,slidesNum,prevSlideID,currentSlideID,sliderTitle,sliderTitles,sliderInfo,sliderInfos,sliderTag,sliderTags,firstAni;
var resize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};
$(window).on('resize', resize);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var Plane = function () {
	function Plane() {
	    _classCallCheck(this, Plane);
	    this.uniforms = {
	      time: {
	        type: 'f',
	        value: 0
	      }
	    };
	    this.mesh = this.createMesh();
	    this.time = 1;
	  }
	  Plane.prototype.createMesh = function createMesh() {
	    return new THREE.Mesh(new THREE.PlaneGeometry(256, 256, 256, 256), new THREE.RawShaderMaterial({
	      uniforms: this.uniforms,
	      vertexShader: "#define GLSLIFY 1\nattribute vec3 position;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nuniform float time;\n\nvarying vec3 vPosition;\n\nmat4 rotateMatrixX(float radian) {\n  return mat4(\n    1.0, 0.0, 0.0, 0.0,\n    0.0, cos(radian), -sin(radian), 0.0,\n    0.0, sin(radian), cos(radian), 0.0,\n    0.0, 0.0, 0.0, 1.0\n  );\n}\n\n//\n// GLSL textureless classic 3D noise \"cnoise\",\n// with an RSL-style periodic variant \"pnoise\".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-10-11\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n\nvoid main(void) {\n  vec3 updatePosition = (rotateMatrixX(radians(90.0)) * vec4(position, 1.0)).xyz;\n  float sin1 = sin(radians(updatePosition.x / 128.0 * 90.0));\n  vec3 noisePosition = updatePosition + vec3(0.0, 0.0, time * -30.0);\n  float noise1 = cnoise(noisePosition * 0.08);\n  float noise2 = cnoise(noisePosition * 0.06);\n  float noise3 = cnoise(noisePosition * 0.4);\n  vec3 lastPosition = updatePosition + vec3(0.0,\n    noise1 * sin1 * 8.0\n    + noise2 * sin1 * 8.0\n    + noise3 * (abs(sin1) * 2.0 + 0.5)\n    + pow(sin1, 2.0) * 40.0, 0.0);\n\n  vPosition = lastPosition;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(lastPosition, 1.0);\n}\n",
	      fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nvarying vec3 vPosition;\n\nvoid main(void) {\n  float opacity = (96.0 - length(vPosition)) / 256.0 * 0.6;\n  vec3 color = vec3(0.6);\n  gl_FragColor = vec4(color, opacity);\n}\n",
	      transparent: true
	    }));
  	};
  	Plane.prototype.render = function render(time) {
    	this.uniforms.time.value += time * this.time;
	};
	return Plane;
}();

var render = function render() {
	plane.render(clock.getDelta());
	renderer.render(scene, camera);
};
var renderLoop = function renderLoop() {
	render();
	requestAnimationFrame(renderLoop);
};

var init = function(){
	tl  = new TimelineMax();
	tl.to('.preloading',1,{opacity:1});
	tl.to('.loader',1,{opacity:1});
    tl.to('.preloading',1,{opacity:0,delay:1,onComplete:function(){
    	TweenMax.set(['.wapper','.main'],{css:{'display':'block'}});
    	TweenMax.to(['.wapper','.main'],1,{opacity:1});
    	$('.preloading').remove();
    	main();  	
    }});
    resize();
	plane = new Plane();
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.position.set(0, 16, 128);
	camera.lookAt(new THREE.Vector3(0, 28, 0));
	scene.add(plane.mesh);
};

if (document.readyState == 'complete'){
    init();
} else {
    window.load = init();
};

function main(){
	slider = $(".project-visual__list");
	sliders = slider.find(".project-visual__el");
	slidesNum = sliders.length;
	prevSlideID = null;
	currentSlideID = 0;
	
	sliderTitle = $(".project-title");
	sliderTitles = sliderTitle.find(".project-title__el");
	

	sliderInfo = $(".project-infos");
	sliderInfos = sliderInfo.find(".project-infos__el");

	sliderTag = $(".project-tags");
	sliderTags = sliderTag.find(".projects-tags__project-el");

	// renderLoop();
	currentSlideIndex = $('.project-index__number');
	slidesNumPrint = $('.project-index__total');
	
	IndexC = currentSlideID+1;
	currentSlideIndex.html("0"+IndexC);
	slidesNumPrint.html("0"+slidesNum);

	gotoSlide(0,0);
	firstAni = true;
	$('.main').on('click','[data-type="page-transition"]',function(event){
		event.preventDefault();
		var newPage = $(this).attr('href');
		if( !isAnimating ) changePage(newPage, true);
		firstLoad = true;
	});
	$('.project-navigation__el--previous').on('click',function(event){
		firstAni = false;
		var slideToGo = currentSlideID - 1;
		if (slideToGo <= -1) {
			slideToGo = slidesNum - 1;
		}
		gotoSlide(slideToGo,"prev");
		console.log(slideToGo);
		IndexC = slideToGo+1;
		currentSlideIndex.html("0"+IndexC);
	});

	$('.project-navigation__el--next').on('click',function(event){
		firstAni = false;
		var slideToGo = currentSlideID + 1;
		if (slideToGo >= slidesNum) {
			slideToGo = 0;
		}
		gotoSlide(slideToGo,"next");
		console.log(slideToGo);
		IndexC = slideToGo+1;
		currentSlideIndex.html("0"+IndexC);		
	});
	$('.project-links__el-link').on('click',function(event){
		TweenMax.to('.caseMask',1,{opacity:1});
	});
	$('.caseMask').on('click',function(event){
		TweenMax.to('.caseMask',1,{opacity:0});
	});	
}



function gotoSlide(slideID, _direction) {
	prevSlideID = currentSlideID;
	currentSlideID = slideID;
	var prevSlide = sliders.eq(prevSlideID);
	var currentSlide = sliders.eq(currentSlideID);

	var prevSlideTitle = sliderTitles.eq(prevSlideID);
	var currentSlideTitle = sliderTitles.eq(currentSlideID);

	var prevSlideInfo = sliderInfos.eq(prevSlideID);
	var currentSlideInfo = sliderInfos.eq(currentSlideID);
	var prevSlideTag = sliderTags.eq(prevSlideID);
	var currentSlideTag = sliderTags.eq(currentSlideID);

	var direction = "next";
	if (_direction != null) {
		direction = _direction;
	}
	if (direction == "next") {
		currentSlide.addClass('project-visual__el--is-active');
		prevSlide.removeClass('project-visual__el--is-active');
		currentSlideTitle.addClass('project-title__el--is-active');
		prevSlideTitle.removeClass('project-title__el--is-active');
		TweenMax.to(prevSlideTitle,0.5,{y:"-150%"});
		TweenMax.fromTo(currentSlideTitle,0.5,{y:"150%"},{y:"0%"});

		tl1 = new TimelineMax();
		tl1.to('.project-infos__transition-block',0.5,{scaleX:1,transformOrigin:"left 50%",ease:Expo.easeOut,onComplete:function(){
			currentSlideInfo.addClass('project-infos__el--is-active');
			prevSlideInfo.removeClass('project-infos__el--is-active');
		}});
		tl1.to('.project-infos__transition-block',0.3,{scaleX:0,transformOrigin:"right 50%",ease:Expo.easeOut});

		currentSlideTag.addClass('projects-tags__project-el--is-active');
		prevSlideTag.removeClass('projects-tags__project-el--is-active');		

	} else {
		prevSlide.removeClass('project-visual__el--is-active');
		currentSlide.addClass('project-visual__el--is-active');
		prevSlideTitle.removeClass('project-title__el--is-active');
		currentSlideTitle.addClass('project-title__el--is-active');
		TweenMax.to(prevSlideTitle,0.5,{y:"150%"});
		TweenMax.fromTo(currentSlideTitle,0.5,{y:"-150%"},{y:"0%"});

		if(firstAni == false){
			tl1 = new TimelineMax();
			tl1.to('.project-infos__transition-block',0.5,{scaleX:1,transformOrigin:"right 50%",ease:Expo.easeOut,onComplete:function(){
				prevSlideInfo.removeClass('project-infos__el--is-active');
				currentSlideInfo.addClass('project-infos__el--is-active');
			}});
			tl1.to('.project-infos__transition-block',0.3,{scaleX:0,transformOrigin:"left 50%",ease:Expo.easeOut});
		}else{
			prevSlideInfo.removeClass('project-infos__el--is-active');
			currentSlideInfo.addClass('project-infos__el--is-active');			
		}
		prevSlideTag.removeClass('projects-tags__project-el--is-active');
		currentSlideTag.addClass('projects-tags__project-el--is-active');	
	}
}


function changePage(url, bool) {
	isAnimating = true;

	// trigger page animation
	$('body').addClass('page-is-changing');
	$('.page-loading').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
		loadNewContent(url, bool);
		newLocation = url;
		$('.page-loading').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
	});
	if( !transitionsSupported() ) {
		loadNewContent(url, bool);
		newLocation = url;
	}
}

// New page
function loadNewContent(url, bool) {
	url = ('' == url) ? 'index.html' : url;
	var newSection = 'page-'+url.replace('.html', '');
	var section = $('<div class="inner-container '+newSection+'"></div>');
	
	section.load(url+' .inner-container > *', function(event){
		$('.main').html(section);
		new Blazy();
		var delay = ( transitionsSupported() ) ? 1200 : 0;
		setTimeout(function(){
        	$('body').removeClass('page-is-changing');	
			closeButton();
			main();
			$('.page-loading').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				isAnimating = false;
				$('.page-loading').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
			});
			if( !transitionsSupported() ) isAnimating = false;
		}, delay);
  		
		if(url!=window.location && bool){
			window.history.pushState({path: url},'',url);
		}
	});
}

$(window).on('popstate', function() {
	if( firstLoad ) {
		var newPageArray = location.pathname.split('/'),
		newPage = newPageArray[newPageArray.length - 1];

		if( !isAnimating  &&  newLocation != newPage ) changePage(newPage, false);
	}

	firstLoad = true;
});

function transitionsSupported() {
	return $('html').hasClass('csstransitions');
}
// Blazy.js
window.bLazy = new Blazy();
// INACTIVE TAB TITLE +
var message = "I miss you :(";
var original;

$(window).focus(function() {
	if (original) {
		document.title = original;
	}
	}).blur(function() {
	var title = $("title").text();
	if (title != message) {
		original = title;
	}
	document.title = message;
});

// Close button
function closeButton() {
	if ($('.close-btn').hasClass('close-active')) {
		$('.close-btn').css('z-index', '-1');
		$('.close-btn').removeClass('close-active');
	} else {
		setTimeout( function() {
			$('.close-btn').addClass('close-active');
		}, 1000);
		setTimeout( function() {
			$('.close-btn').css('z-index', '1001');
		}, 1600);
	}
}

closeButton();
