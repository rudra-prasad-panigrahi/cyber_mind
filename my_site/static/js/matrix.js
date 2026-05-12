const globeCanvas = document.getElementById('globe-canvas');
if (globeCanvas) {
  const globeRenderer = new THREE.WebGLRenderer({ canvas: globeCanvas, alpha: true, antialias: true });
  globeRenderer.setPixelRatio(window.devicePixelRatio);

  const globeScene = new THREE.Scene();
  const globeCamera = new THREE.PerspectiveCamera(75, globeCanvas.clientWidth / globeCanvas.clientHeight, 0.1, 1000);
  globeCamera.position.set(0, 0, 3);

  const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
  const globeMaterial = new THREE.MeshBasicMaterial({
    color: 0x001122,
    transparent: true,
    opacity: 0.8,
    wireframe: true,
  });
  const globe = new THREE.Mesh(globeGeometry, globeMaterial);
  globeScene.add(globe);

  const attackLines = [];
  function createAttackLine(start, end) {
    const points = [];
    points.push(new THREE.Vector3(start.x, start.y, start.z));
    points.push(new THREE.Vector3(end.x, end.y, end.z));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xff3d81, linewidth: 2 });
    const line = new THREE.Line(geometry, material);
    globeScene.add(line);
    attackLines.push(line);
    setTimeout(() => {
      globeScene.remove(line);
      attackLines.splice(attackLines.indexOf(line), 1);
    }, 5000);
  }

  function animateGlobe() {
    requestAnimationFrame(animateGlobe);
    globe.rotation.y += 0.005;
    globeRenderer.render(globeScene, globeCamera);
  }

  function resizeGlobe() {
    const width = globeCanvas.clientWidth;
    const height = globeCanvas.clientHeight;
    globeRenderer.setSize(width, height);
    globeCamera.aspect = width / height;
    globeCamera.updateProjectionMatrix();
  }

  window.addEventListener('resize', resizeGlobe);
  resizeGlobe();
  animateGlobe();

  setInterval(() => {
    const start = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    ).normalize().multiplyScalar(1.01);
    const end = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    ).normalize().multiplyScalar(1.01);
    createAttackLine(start, end);
  }, 2000);
}
