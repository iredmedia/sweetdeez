<!DOCTYPE html>
<html>
	<head>
		<title>Sweet Dee Serves</title>
		
		<link rel="stylesheet" type="text/css" href="styles/style.css">
		<link rel="icon" type="image/png" href="http://sweetdeez.com/favicon.png">

		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

		<script type="text/javascript" src="scripts/jquery.min.js"></script>
		<script type="text/javascript" src="scripts/reddit.js"></script>

	</head>

	<body>
		<div class="controls">
			<h1><a href="/" class="logo"><img src="img/sweetdeez-search-anything.png" alt="Sweetdeez Search Anything"/></a></h1>
			<input id="search" type="text" placeholder="Eg: pics"></input>

			<button id="submit">Search</button>
			
			<span class="tag-wrapper"><ul class="tags" id="optionTags"><li><a href="http://reddit.com/r/pics">Pics</a></li><li><a href="http://reddit.com/r/funny">Funny</a></li><li><a href="http://reddit.com/r/nsfw">NSFW</a></li><li><a href="http://reddit.com/r/gifs">GIFS</a></li><li><a href="http://reddit.com/r/gonewild">Gonewild</a></li><li><a href="http://reddit.com/r/adviceanimals">AdviceAnimals</a></li><li><a href="http://reddit.com/r/earthporn">EarthPorn</a></li></ul></span>
			<span class="tag-wrapper"><ul class="tags" id="currentTags"></ul></span>
			
		</div>

		<div class="shadowbox">
			<button id="exit-shadowbox">x</button>
			<h2 class="shadowbox-h2"></h2>
			<img class="shadowbox-img"/>
			<ul id="albumImages"></ul>
			<button id="prev" class="shadowbox-nav">&lt;</button>
			<button id="next" class="shadowbox-nav">&gt;</button>
		</div>

		<div id="results"></div>
		<footer>Sweetdeez.com serves third party media. We assume no responsibility for the content of our service(s). Sweetdeez.com &copy; 2015.</footer>
		
		<script type="text/javascript" src="scripts/functions.js"></script>

	</body>
</html>

