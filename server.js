

var path    = require('path'),
    http    = require('http'),
    url     = require('url'),
    fs      = require('fs'),
    Crawler = require("crawler").Crawler,
  //  express = require('express'),
  //  app = express(),
    app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');


/* Settings */
var content     = {},
    imgToLoad   = [],
	tags        = 'img|a|h1|h2|h3|p'.split('|'),
	maxTags 	= 1000,
	initial_url = 'http://creston.com/';


var crawler = new Crawler({
    "maxConnections":5,
    "skipDuplicates": true,

    // This will be called for each crawled page
    "callback":function(error,result,$) {

    	if( maxTags <= 0 ) {
    		return;
    	}

    }
/*
        if( tags == undefined ) return;

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
	                   
                        if (path.extname(data.src) != '') {
                            console.log('Found image: ' + path.basename(data.src));  
                       //     writeToFile('<img>'+path.basename(data.src)+'</img>'+'\n');
                       //     addToQueue(path.basename(data.src), tag, data.src);
                        }else{

                            return;
                        }
                		break;

                	case 'a':

                		if( maxTags < 1 ){
                            console.log("maximum reached");
                            return;
                        }

                		// Add url to the data and add it to the queue
            			var href = $(this).attr('href');
                        if( href == undefined || href.charAt(0)!=='h') return;  	
            			data.url = href;

            			crawler.queue( href );
            			// console.log('Found A tag, URL:' + href );
                        
                       // writeToFile('<a>'+data.url+'</a>'+"\n");

                		break;

                	default:

	                    // Add the text to the data
	                    data.text = $(this).text();
	                    // console.log('Found ' + tag + ': ' + data.text );

                     //   writeToFile('<txt>'+data.text+'</txt>' + "\n");

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
    },

 



    onDrain: function(){
        // handleImageQueue();
    }  */
});

  function writeToFile(value) { 


         // write the tag date into the the file ..
        fs.appendFile('masterData.txt', value, function (err) {
                 // if (err) throw err;
                  // console.log('added : ', value);
                  
                });
    }

    function addToQueue(imgName,imgURL,data) {


        var imageName = imgName;
        var imageURL  = url.parse( data );

        //stores images to files. 
        var options  = {
            host: imageURL.host ? imageURL.host  : initial_url,
            port: imageURL.port ? imageURL.port : 80,
            path: imageURL.pathname
        };

        imgToLoad.push({
            options: options,
            imageName: imageName
        });
    }


    function handleImageQueue(){

        var image = imgToLoad.splice(0,1);
        console.log(imgToLoad);

        var request = http.get(image.options, function(res){
            var imagedata = '';
            res.setEncoding('binary');

            res.on('data', function(chunk){
                imagedata += chunk;
            })

            res.on('end', function(){
                fs.writeFile(image.imageName, imagedata, 'binary', function(err){
                    console.log('File saved.');

                    if( imgToLoad.length )
                    {
                        handleImageQueue();                        
                    }
                    else
                    {
                        console.log('All done! :D');
                    }

                });
            });

        });
    }
/*
// express 
    app.get('/hello.txt', function(req, res){
      var body = 'Hello World';
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', body.length);
      res.end(body);
    });
*/
// socket 
  



app.listen(8080);

function handler (req, res) {
  fs.readFile('home/overconnected/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});



crawler.queue( initial_url );