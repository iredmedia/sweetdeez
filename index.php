<!DOCTYPE html>
<html>
	<head>
		<title>Sweet Dee Serves</title>
		
		<link rel="stylesheet" type="text/css" href="/styles/style.css">
		<link rel="icon" type="image/png" href="http://sweetdeez.com/favicon.png">

		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

		<script type="text/javascript" src="/scripts/jquery.min.js"></script>
		<script type="text/javascript" src="/scripts/reddit/reddit.js"></script>
		<script type="text/javascript" src="/scripts/masonry/dist/masonry.pkgd.js"></script>
	</head>

	<body>
		<div class="controls">
			<h1><img src="/img/sweetdeez-search-anything.png" alt="Sweetdeez Search Anything"/></h1>
			<input id="search" type="text" placeholder="Eg: pics"></input>

			<button id="submit">Search</button>
			<p>Sweetdeez.com serves third party media. We assume no responsibility for the content of our service(s). Sweetdeez.com &copy; 2015.</p>
			<ul class="tags"></ul>

		</div>

		<div class="shadowbox">
			<button id="exit-shadowbox">x</button>

			<img class="shadowbox-img"/>
			<ul id="albumImages"></ul>
			<button id="prev" class="shadowbox-nav">&lt;</button>
			<button id="next" class="shadowbox-nav">&gt;</button>
		</div>

		<div id="results"></div>

		
		<script type="text/javascript" src="/scripts/functions.js"></script>

	</body>
</html>

