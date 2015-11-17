define(function (require) {

    var DOOR_WIDTH = 0.5;
    var DOOR_HEIGHT = 0.5;

    var doors = [];

    var THREE = require("three");

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    /*camera.rotation.y += 0;
    camera.position.z = 3;
    camera.position.x = 3*/

    var light = new THREE.PointLight(0xffffff, 1.0, 1000);
    light.position.set(0, 4, -3);
    scene.add(light)


    var calendarGeometry = new THREE.BoxGeometry(5, 8, 1);
    var calendarMaterial = new THREE.MeshPhongMaterial({
        color: 0xff00000
    });
    var calendarMesh = new THREE.Mesh(calendarGeometry, calendarMaterial);
    scene.add(calendarMesh);

    calendarMesh.position.z = -7;
    calendarMesh.position.y = 0;
    calendarMesh.position.x = 0;

    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("calendar")
    });
    renderer.setSize(window.innerWidth, window.innerHeight);


    function createDoor(number) {
        var doorGeometry = new THREE.BoxGeometry(DOOR_WIDTH, DOOR_HEIGHT, 0.05);
        var doorMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ff000
        });
        var doorMesh = new THREE.Mesh(doorGeometry, doorMaterial);
        scene.add(doorMesh);
        doorMesh.position.z = -6;
        doorMesh.position.y = 2 - Math.floor((number - 1) / 4)
        doorMesh.position.x = -1.5 - DOOR_WIDTH / 2 + (number - 1) % 4;

        doorGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(DOOR_WIDTH / 2, 0, 0));
        return doorMesh;
    }

    createDoor(1);

    for (var i = 1; i < 25; i++) {
        doors[i] = createDoor(i);



        renderer.render(scene, camera);
    }


    renderer.render(scene, camera);

    document.onclick = function () {
        openDoor(doors[1]);
    }


    function openDoor(door) {
        if (!(door.rotation.y < -Math.PI)) {
            door.rotation.y += -1 * Math.PI / 180;
            renderer.render(scene, camera);
            requestAnimationFrame(function () {
                openDoor(door);
            });
        }
    }







    /*var camera, scene, renderer,
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
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(5 / 2, 0, 0));

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

    function openDoor() {
        if (!(mesh.rotation.y < -Math.PI)) {
            mesh.rotation.y += -1 * Math.PI / 180;
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



});