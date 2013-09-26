	var camera, 
		scene3D,
		renderer,
		cube, 
		material,
		mesh, 
		socket,
		urlToload,
		tween,
		maxElementsOnStage = 500,
		animationTime = 2000,
		elementsOnStage = [];

		
				
        var initialPos  = {
           
            x:  window.innerWidth*.5,
            y: window.innerHeight*.5,
            z: 800
        };

        var finalPos = { 
        	
            x: window.innerWidth,
            y: window.innerHeight,
            z: 0
        };

	    var userOpts	= {

			range		: 800,
			duration	: 2500,
			delay		: 200,
			easing		: 'Elastic.EaseInOut'
		};
		

			function init() {

				//console.log(THREE);
				//console.log(THREE.Scene);
				scene3D = new THREE.Scene();

				camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
				
				camera.position.z = 1000;
				scene3D.add(camera);

				cube = new THREE.CubeGeometry(300,300,300);

				material = new THREE.MeshBasicMaterial({color:0xFF00FF, wireframe:false});
				mesh = new THREE.Mesh(cube,material);
				scene3D.add(mesh);

				renderer = new THREE.CanvasRenderer();
				renderer.setSize(window.innerWidth,window.innerHeight);


				document.body.appendChild(renderer.domElement);
				animate();

				//socketConnection();
				createElement("http://www.cubedrome.com/overconnected/img/1.jpg");

			 };

			function  animate() { 
				requestAnimationFrame(animate);

				mesh.rotation.x += 0.02;
				mesh.rotation.y += 0.02;


				renderer.render(scene3D,camera);

/*
				$.each( elementsOnStage, function( key, value ) {
   					$(this).position.z ++;
				});
			
*/	


			};

			function socketConnection () { 
			  socket = io.connect('http://localhost');
			  socket.on('news', function (data) {
			    console.log(data);
			    socket.emit('my other event', { my: 'data' });
			  });
			};


			function createElement(img) { 

				

				var texture = THREE.ImageUtils.loadTexture(img);
				var geometry = new THREE.PlaneGeometry(645, 300);
				var material = new THREE.MeshBasicMaterial({map: texture});
				var plane = new THREE.Mesh(geometry, material);
				plane.receiveShadow = false;
				plane.position.x = initialPos.xPos;
				plane.position.y = initialPos.yPos;
				plane.position.z = initialPos.zPos;
				scene3D.add(plane);
				elementsOnStage.push(plane);


				var position = { x : 0, y: 300 };
				var target = { x : 400, y: 50 };
				
				tween = new TWEEN.Tween(position).to(target, 2000);
				console.log(tween);

				tween.onUpdate(function(){
 	 				console.log( position.x);
   					console.log( position.y);
				});

				tween.start();

			}






document.body.onload = init;
