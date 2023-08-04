let camera, scene, renderer, geometry, material, particles;
const d = 0.001; // for animation

init();

function init() {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    2,
    20000
  );
  camera.position.z = 1600;

  scene = new THREE.Scene();

  // setting
  material = new THREE.PointsMaterial({
    color: "#F199F2",
    size: 13,
    sizeAttenuation: true
  });
  const radius = 450;

  // particle
  geometry = new THREE.IcosahedronGeometry(radius, 10);
  material = material.clone();
  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas1 });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.useLegacyLights = false;

  animate();

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  particles.rotation.x -= d;
  particles.rotation.y += d;
  particles.rotation.z -= d;

  renderer.render(scene, camera);
}