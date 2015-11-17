define(function (require) {
    //POC CODE
    var THREE = require("three");

    var camera, scene, renderer,
        geometry, material, light, mesh,
        clock = new THREE.Clock();
    var canvas = document.getElementById("calendar");
    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });
    camera = new THREE.PerspectiveCamera(75, 1280 / 800, 0.3, 10000.0);
    camera.position.set(0, 1.62, 3.0);
    scene = new THREE.Scene();
    geometry = new THREE.PlaneGeometry(5, 5);
    geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 5/2, 0, 0 ) );

    material = new THREE.MeshLambertMaterial({
        color: 0x3df44f,
        side: THREE.DoubleSide
    });
    mesh = new THREE.Mesh(
        geometry, material
    );

    mesh.position.set(-1 + 0.2, 0.25, -20);

    scene.add(mesh);
    light = new THREE.PointLight(0xffffff, 1.0, 48.0);
    light.position.set(0, 4, 0);
    scene.add(light)

    renderer.setSize(window.innerWidth, window.innerHeight);


    renderer.render(scene, camera);
    document.body.appendChild(renderer.domElement);



    var rotWorldMatrix;

    // Rotate an object around an arbitrary axis in world space       
    function rotateAroundWorldAxis(object, axis, radians) {
        rotWorldMatrix = new THREE.Matrix4();
        rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
        rotWorldMatrix.multiply(object.matrix); // pre-multiply
        object.matrix = rotWorldMatrix;
        object.rotation.setFromRotationMatrix(object.matrix, 0);
    }
    
    function openDoor()
    {
        if(!(mesh.rotation.y < -Math.PI))
        {
            mesh.rotation.y += -1 * Math.PI/180;
            renderer.render(scene, camera);
            requestAnimationFrame(openDoor);
        }
    }




    document.onclick = function () {
        //rotateAroundWorldAxis(mesh, new THREE.Vector3(0,1,0), -30 * Math.PI/180);
        
        openDoor();
        
        /*for(var i = 0; i < 180; i++)
        {
            
           mesh.rotation.y += -1 * Math.PI/180;
            i++;
            
    renderer.render(scene, camera);
        }*/
    }


});