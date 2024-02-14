/**
 * This file deals with initalizing the scene and creating
 * strucutures do manage the visualization.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * The data structure representing the visualization scene.
 */
class visualization {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer();

    this.initVis();

    this.camera.up.set(0, 0, 1);
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    this.objects = [];
  }

  initVis() {
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
    })
  }

  animate() {
    requestAnimationFrame( animate );

    /* add in animation things */

    // vis.movePoints();
    // vis.objects[0].movePoints();

    renderer.render( scene, camera );
  }
}

const vis = new visualization();

export { vis }