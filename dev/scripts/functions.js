$( document ).ready(function() {
	var obj = {};	
	var afterId; // This value will = null at the end. Determine validity???
	var prevQuery;
	var shadowboxIndex = null;
	var thisQuery;

	// JQ Objs
	var $shadowbox = $('.shadowbox');
	var $albumImages = $shadowbox.find('#albumImages');

	// Creates DOM objects and places them sequentially into the #results container
	var placeMedia = function(src, alt, isAlbum) {	
		var $img = $('<img />').attr('src', src);
		var $a = $('<a class="brick">').attr('href', src);
		
		alt && $img.attr('alt', alt.replace('"', '\''));
        $a.append($img);

        if (isAlbum) {
        	$a.addClass('album');
        }

        $('#results').append($a);
	}

	// Get Album Images
	var imgurAlbum = window.imgurAlbum = function(id){
		$.ajax({ 
		    url: 'https://api.imgur.com/3/album/'+ id +'/images',
		    headers: {
		    	Authorization: 'Client-ID e567945caf3581e'
		    },
		    type: 'GET',
		    success: function(res) {
		    	if (!obj[res.data[0]]) return;

    			obj[res.data[0].link] = [];
    			placeMedia(res.data[0].link, res.data[0].title, true);	    

		    	for (var i in res.data) {    		
		    		// Create a list under this links ID
	    			obj[res.data[0].link].push(res.data[i].link);
	    		}
		    }
		});
	}

	var fn = function(res) {
		var children = res.data.children;
		var currentQuery;
	
		if (prevQuery === currentQuery){
			if (afterId != null && res.data.after == null) {
				return;
			} 
		}

		afterId = res.data.after;

		// Itterate through the children
		for (var i in children) {
			var child = children[i]; // Get this child
			var src = child.data.url;
			var albumId = src.split('/'); 
			var alt = child.data.title;
			var domain = child.data.domain;

			// Ensure some data exists in URL
			if (child.data.url) {

				// Ensure it is from DOMAIN imgur
				if (domain.indexOf('imgur.com') >= 0) {
					// Check for gallery/albums
					if (src.indexOf('/gallery/') >= 0 || src.indexOf('/a/') >= 0 ) {
						// Get Gallery IMAGES
						imgurAlbum(src.split('/')[src.split('/').length - 1]);

						continue;
					}

					// Check for an IMAGE 
					if (src.lastIndexOf('.') >= src.length - 8){						
						placeMedia(src, alt);
					
						continue;	
					}

					// We have one of those weirdos with no jpg or album identifier
					placeMedia(src + '.jpg', alt);
				}
			}
		}

		if ($("#results").height() + $("#results").offset().top < $(window).height()) {
			var query = currentQuery = $("#search").val();

			sendRequest(query); // we know this is set in "fn"
		}
		
		prevQuery = currentQuery;
	};	

	function sendRequest(query) {
		if (!afterId) {
			// use reddit.subredditsByTopic(query).fetch(); to get a list of subreddits to query
			reddit.hot(query).limit(25).fetch(fn);
			
			return;
		}
	
		reddit.hot(query).limit(25).after(afterId).fetch(fn);
	};

	function subRequest(query){
		$('.tags').empty();

		reddit.subredditsByTopic(query).fetch(function(subreddits) {
			for(i in subreddits) {

				var $sub = subreddits[i];
				var $subName = $sub.name;
				var $subLink = 'http://reddit.com/r/' + $subName;

				$('.tags').append(($('<li></li>').append($('<a></a>').attr('href',$subLink).append($subName))));
			}
		})
	};

	/////////////////
	// Event handlers

	$(window).on("scroll", function() {
		var scrollHeight = $(document).height();
		var scrollPosition = $(window).height() + $(window).scrollTop(); 

		console.log((scrollHeight - scrollPosition) / scrollHeight);

		if ((scrollHeight - scrollPosition) / scrollHeight === 0) { // SPECIAL CASE: 
			getNext(thisQuery);
		}
	});

	var getNext = function (currentQuery) {
		//FIX THIS
		var query = currentQuery;
		sendRequest(query);
	}
	
	$('#submit').click(function() {
		var query = $("#search").val();
		$('.controls').css('position','relative');
		$('#footer').css('position','relative');
		subRequest(query);
		//sendRequest(query);
	});

	$('.tags').on('click', 'li a', function(e) {
		var $subName = $(this).text();
		var thisQuery = $subName;
		sendRequest($subName);
		//SEND $subName TO getNext VIA currentQuery VAR
		return false;
	});

	$(document).keydown(function(e) {
	    // ESCAPE key pressed
	    if (e.keyCode == 27) {
	       $('.shadowbox').hide();
	    }

	    if (e.keyCode == 13) {
	       $('#submit').trigger('click');
	    }

	    if (e.keyCode == 39) {
	       $('#next').trigger('click');
	    }

	    if (e.keyCode == 37) {
	       $('#prev').trigger('click');
	    }
	});

	// Click thumbnail to open shadowbox
	$('#results').on('click', 'a img', function(event) {
		var $this = $(this);
		var $anchor = $this.parent();
		var imgSrc = $this.attr('src');

		shadowboxIndex = $anchor.index();

		$shadowbox.find('.shadowbox-img').attr('src', imgSrc);
		$shadowbox.show();

		albumize($anchor, imgSrc);

		return false;
	});

	var albumize = function ($anchor, imgSrc) {
		$albumImages.empty();

		if ($anchor.hasClass('album')) {
			for (var i in obj[imgSrc]) {
				$albumImages.append($('<li></li>').append($('<a></a>').append($('<img />').attr('src', obj[imgSrc][i]))));
			}
		}  
	}

	//create functions to map with keypresses
	$('.shadowbox').on('click', '#prev', function(){
		var $anchor = $('#results a').eq(shadowboxIndex > 0 ? --shadowboxIndex : 0);
		var src = $anchor.find('img').attr('src');

		$('.shadowbox-img').attr('src', src);

		albumize($anchor, src);
	});
	
	$('.shadowbox').on('click', '#next', function(){
		var $anchor = $('#results a').eq(++shadowboxIndex);
		var src = $anchor.find('img').attr('src');

		$('.shadowbox-img').attr('src', src);

		albumize($anchor, src);
	});	

	$('#exit-shadowbox').click(function() {
		$('.shadowbox').hide(); 
	});

	//$('#results').masonry({
	//	columnWidth: 200,
	//	itemSelector: '.brick'
	//});
});
