define(function (require) {

    var DOOR_WIDTH = 0.5;
    var DOOR_HEIGHT = 0.5;

    var doors = [];

    var THREE = require("three");

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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
    
    //create road
    var roadGeometry = new THREE.PlaneGeometry(200, 5);
    var roadMaterial = new THREE.MeshPhongMaterial({
        color: 0x333333
    });
    var roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
    roadMesh.position.z = -8
    roadMesh.position.y = -5;
    roadMesh.rotation.x =  -Math.PI/2;
    window.roadMesh = roadMesh;
    scene.add(roadMesh);

    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("calendar"),
        alpha : true
    });
    renderer.setSize(window.innerWidth, window.innerHeight-3);


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

});