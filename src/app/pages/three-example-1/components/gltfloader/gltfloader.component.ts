import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';




@Component({
  selector: 'app-gltfloader',
  templateUrl: './gltfloader.component.html',
  styleUrls: ['./gltfloader.component.scss']
})
export class GLTFLoaderComponent {

  @ViewChild('three') three!: ElementRef;
  private renderer: any = new THREE.WebGLRenderer({ antialias: true });
  private width: any;
  private height = 500;
  private scene = new THREE.Scene();
  private camera: any;




  ngAfterViewInit(): void {
    this.init();
    this.render();
  }

  init() {
    const that = this;
    this.width = this.three.nativeElement.clientWidth;
    this.height = this.three.nativeElement.clientHeight;

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.25, 20
    );
    this.camera.position.set(- 1.8, 0.6, 2.7);
    new RGBELoader()
      .setPath('../../../../../assets/gltf/equirectangular/')
      .load('royal_esplanade_1k.hdr', function (texture: any) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        that.scene.background = texture;
        that.scene.environment = texture;
        that.render();


        const loader = new GLTFLoader().setPath('../../../../../assets/gltf/');
        loader.load('DamagedHelmet.gltf', function (gltf: any) {
          that.scene.add(gltf.scene);
          that.render();
        });
      });


    this.renderer.setPixelRatio(window.devicePixelRatio);
    //建立背景
    this.renderer.setSize(this.width, this.height);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    //绑定DOM
    this.three.nativeElement.append(this.renderer.domElement);



    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.addEventListener('change', this.render); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 0, - 0.2);
    controls.update();
    window.addEventListener('resize', this.onWindowResize);
  }

  render() {
    this.renderer && this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

}
