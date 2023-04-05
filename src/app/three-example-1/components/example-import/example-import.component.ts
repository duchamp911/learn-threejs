import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

@Component({
  selector: 'app-example-import',
  templateUrl: './example-import.component.html',
  styleUrls: ['./example-import.component.scss'],
})
export class ExampleImportComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.createThree();
  }

  createThree() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  }
}
