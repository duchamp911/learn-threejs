import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-drawing-lines',
  templateUrl: './drawing-lines.component.html',
  styleUrls: ['./drawing-lines.component.scss'],
})
export class DrawingLinesComponent {
  @ViewChild('three') three!: ElementRef;
  private renderer: any = new THREE.WebGLRenderer();
  private width: any;
  private height = 500;
  private scene = new THREE.Scene();
  private camera: any;

  ngAfterViewInit(): void {
    this.width = this.three.nativeElement.offsetWidth;
    //建立背景
    this.renderer.setSize(this.width, this.height);
    //绑定DOM
    this.three.nativeElement.append(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(0, 0, 0);

    const material = new THREE.LineBasicMaterial({ color: '#fff' });
    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    this.scene.add(line);
    this.renderer.render(this.scene, this.camera);
  }
}
