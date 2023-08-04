let camera, scene, renderer, geometry, material;
let particles;
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
    size: 13,
    sizeAttenuation: true
  });
  const radius = 450;
  const particle_num = 3000;
  const vertex = new THREE.Vector3();
  let vertices = [];
  let colors = [];
  let color = new THREE.Color();
  let random_ratio;

  // particle
  geometry = new THREE.BufferGeometry();
  for (let i = 0; i < particle_num; i++) {
    const theta = Math.acos(THREE.MathUtils.randFloatSpread(2));
    const phi = THREE.MathUtils.randFloatSpread(360);
    // outside
    vertex.x = radius * Math.sin(theta) * Math.cos(phi);
    vertex.y = radius * Math.sin(theta) * Math.sin(phi);
    vertex.z = radius * Math.cos(theta);

    // inside
    random_ratio = Math.sqrt(
      Math.sqrt(Math.random()) * Math.sqrt(Math.random())
    );

    vertex.copy(vertex).multiplyScalar(random_ratio);
    vertices.push(vertex.x, vertex.y, vertex.z);
    color.setHSL(THREE.MathUtils.randFloat(0.5, 0.8), 0.4, 0.6);
    colors.push(color.r, color.g, color.b);
  }
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  material = material.clone();
  material.size = 10;
  material.vertexColors = true;
  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas2 });
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
  particles.rotation.y -= d;
  particles.rotation.z += d;
  particles.rotation.x += d;

  renderer.render(scene, camera);
}