<!DOCTYPE html>
<html class="csstransitions">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Mr.Jazryn</title>
	<meta name="description" content="">
	<meta name="keywords" content="">
	<meta name="robots" content="all">
	<meta name="googlebot" content="all">
	<meta name="author" content="Tomahawk">
	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
	<meta http-equiv="cleartype" content="on">
	<link rel="shortcut icon" href="/favicon.ico">
	<link rel="icon" type="image/png" href="img/favicon.png">
	<link rel="stylesheet" rel="stylesheet" href="css/style.css" media="screen">
</head>
<body>
	<div class="preloading">
		<div class="face">
			<img src="img/loading.png" alt="">
			<svg class="loader" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
			  <circle class="internal-circle" cx="60" cy="60" r="28"></circle>
			  <circle class="external-circle" cx="60" cy="60" r="32"></circle>
			</svg>		
		</div>
	</div>
	<div class="wapper" id="experiment">
		<div class="main">
		<div class="inner-container">
			<header class="header">
				<h1 class="header_logo">Mr.Jazryn</h1>
				<strong class="header_logo-subtitle">creative developer</strong>
				<button class="header__about" data-type="page-transition" href="about.php">Information</button>
			</header>
			<div class="project-navigation">
				<button class="project-navigation__el project-navigation__el--previous" data-type="pre">
					<span class="project-navigation__el-line"></span>
					<span class="project-navigation__el-text">Previous</span>
					<span class="project-navigation__el-icon icon icon-chevron-thin-left"></span>
				</button>
				<button class="project-navigation__el project-navigation__el--next" data-type="next">
					<span class="project-navigation__el-line"></span>
					<span class="project-navigation__el-text">Next</span>
					<span class="project-navigation__el-icon icon icon-chevron-thin-right"></span>
				</button>
			</div>
			<div class="project-container" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
				<div class="project-container__content">
					<div class="project-index">
						<span class="project-index__line"></span>
						<span class="project-index__number"></span>
						<span class="project-index__total"></span>
					</div>
					<div class="project-title">
						<span class="project-title__el">博士伦</span>
						<span class="project-title__el">聚划算</span>
					</div>

					<div class="project-visual">
						<div class="project-visual__container">
							<div class="project-visual__list">
								<li class="project-visual__el">
									<div class="project-visual__el-content">
										<img class="project-visual__el-img" src="img/loading.png">
										<div class="caseMask"></div>
									</div>
								</li>
								<li class="project-visual__el">
									<div class="project-visual__el-content">
										<img class="project-visual__el-img" src="img/hero.png">
										<div class="caseMask"></div>
									</div>
								</li>
							</div>
						</div>
					</div>
					<div class="project-infos">
						<div class="project-infos__transition-block"></div>					
						<div class="project-infos__el">
							<h2 class="project-infos__title">天猫无忧购：首个手机话剧团开张了！</h2>
							<p class="project-infos__description">“最有价值的都藏在表面。” 如同“天猫无忧购”的名字，“无忧”是我们希望消费者，在网购过程中能够体会到的。“无”是关联品牌和创意之间的关键词。</p>
						</div>
						<div class="project-infos__el">
							<h2 class="project-infos__title">天猫无忧购：2</h2>
							<p class="project-infos__description">“最有价值的都藏在表面。” 如同“天猫无忧购”的名字，“无忧”是我们希望消费者，在网购过程中能够体会到的。“无”是关联品牌和创意之间的关键词。</p>
						</div>
					</div>
					<div class="project-tags">
						<ul>
							<li class="projects-tags__project-el">
								<ul class="projects-tags__tag-list">
									<li class="project-tags__tag-el">crratJs</li>
									<li class="project-tags__tag-el">crratJs</li>
									<li class="project-tags__tag-el">crratJs</li>
								</ul>
							</li>
							<li class="projects-tags__project-el">
								<ul class="projects-tags__tag-list">
									<li class="project-tags__tag-el">vueJs</li>
									<li class="project-tags__tag-el">vueJs</li>
									<li class="project-tags__tag-el">vueJs</li>
								</ul>
							</li>
						</ul>
					</div>
					<div class="project-links">
						<div class="project-links__el project-links__el--is-active">
							<div class="project-links__el-link link">View website</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		<canvas class="p-canvas-webgl" id="canvas-webgl"></canvas>
	</div>
	
	<div class="page-loading"></div>

	<script type="text/javascript" src="js/zepto.js"></script>
	<script type="text/javascript" src="js/three.js"></script>
	<script type="text/javascript" src="js/gsap.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
</body>
</html>