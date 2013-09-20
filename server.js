var Crawler = require("crawler").Crawler;

/* Settings */
var content     = {},
	tags        = 'a|h1|h2|h3|p|img'.split('|'),
	maxTags 	= 1000,
	initial_url = 'http://creston.com/';


var c = new Crawler({
    "maxConnections":10,
    "skipDuplicates": true,

    // This will be called for each crawled page
    "callback":function(error,result,$) {

    	if( maxTags <= 0 ) {
    		return;
    	}

        // Loop through our tags
        $.each(tags, function( index, tag ){

            // Find tags in page
            $(tag).each(function(){

                // Setup collection for the data
                var data = {};

                // If the tag is an image
                switch( tag )
                {
                	case 'img':

	                    // Add the source to the data
	                    data.src = $(this).attr('src');
	                    console.log('Found image: ' + data.src );
              		
                		break;

                	case 'a':

                		if( maxTags <= 0 ) {
                			return;
                		}

                		// Add url to the data and add it to the queue
            			var href = $(this).attr('href');	
            			data.url = href;

            			c.queue( href );
            			console.log('Found A tag, URL:' + href );

                		break;

                	default:

	                    // Add the text to the data
	                    data.text = $(this).text();
	                    console.log('Found ' + tag + ': ' + data.text );

                		break;
                }

                // Small check to make sure we have a data in this content area
                if( content[tag] == undefined )
                {
                    content[tag] = [];
                }

                // Push our data to our content
                content[tag].push( data );
                maxTags--;
            });
        });
    }
});

c.queue( initial_url );