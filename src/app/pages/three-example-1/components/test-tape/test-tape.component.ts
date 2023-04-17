import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


@Component({
  selector: 'app-test-tape',
  templateUrl: './test-tape.component.html',
  styleUrls: ['./test-tape.component.scss']
})
export class TestTapeComponent {

  @ViewChild('three') three!: ElementRef;
  private renderer: any = new THREE.WebGLRenderer();
  private width: any;
  private height = 500;
  private scene = new THREE.Scene();
  private camera: any;

  ngAfterViewInit(): void {
    this.init();
  }


  init(): void {
    const that = this;

    this.width = this.three.nativeElement.clientWidth;
    this.height = this.three.nativeElement.clientHeight;

    // 设置几何体长宽高，也就是x、y、z三个方向的尺寸
    //对比三个参数分别对应xyz轴哪个方向
    const geometry = new THREE.BoxGeometry(100, 60, 20);
    const material = new THREE.MeshLambertMaterial({
      color: 0x0000ff, //设置材质颜色
      // transparent: true,//开启透明
      // opacity: 0.5,//设置透明度
    });
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(0, 0, 0);

    // AxesHelper：辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(150);
    this.scene.add(axesHelper);

    this.scene.add(mesh);

    //点光源：两个参数分别表示光源颜色和光照强度
    // 参数1：0xffffff是纯白光,表示光源颜色
    // 参数2：1.0,表示光照强度，可以根据需要调整
    const pointLight = new THREE.PointLight(0xffffff, 1.0);

    //点光源位置
    pointLight.position.set(130, 70, 0);//点光源放在x轴上
    this.scene.add(pointLight); //点光源添加到场景中



    // 实例化一个透视投影相机对象
    this.camera = new THREE.PerspectiveCamera(30, this.width / this.height, 1, 3000);
    this.camera.position.set(500, 500, 500);
    this.camera.lookAt(50, 0, 0); //坐标原点
    // 设置相机控件轨道控制器OrbitControls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
    controls.addEventListener('change', function () {
      that.renderer.render(that.scene, that.camera); //执行渲染操作
    });//监听鼠标、键盘事件



    // 定义threejs输出画布的尺寸(单位:像素px)
    this.renderer.setSize(this.width, this.height); //设置three.js渲染区域的尺寸(像素px)
    this.renderer.render(this.scene, this.camera); //执行渲染操作



    //绑定DOM
    this.three.nativeElement.append(this.renderer.domElement);

  }
}
