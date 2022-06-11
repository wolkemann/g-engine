import * as THREE from "three";
import $ from "jquery";

export default function Example(target: any, width: any, height: any) {
  // init

  const camera = new THREE.PerspectiveCamera(20, width / height, 0.01, 330);
  camera.position.z = 1;

  const scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const material = new THREE.MeshNormalMaterial();

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width - 6, height - 6);
  renderer.setAnimationLoop(animation);

  $(target).append(renderer.domElement);

  // animation

  function animation(time: any) {
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    renderer.render(scene, camera);
  }
}
