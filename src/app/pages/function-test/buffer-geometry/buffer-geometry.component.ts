import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';




@Component({
  selector: 'app-buffer-geometry',
  templateUrl: './buffer-geometry.component.html',
  styleUrls: ['./buffer-geometry.component.scss']
})
export class BufferGeometryComponent {

  @ViewChild('three') three!: ElementRef;
  private renderer: any = new THREE.WebGLRenderer();
  private width: number = 500;
  private height: number = 500;
  private scene: THREE.Scene = new THREE.Scene();
  private camera: any;

  ngAfterViewInit(): void {
    this.init();
    this.OnWindowResize();
  }

  init(): void {
    const that = this;

    // AxesHelper：辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(150);
    this.scene.add(axesHelper);

    const geometry = new THREE.BoxGeometry(100, 100, 100);
    //材质对象Material
    const material = new THREE.MeshLambertMaterial({
      color: 0x00ffff, //设置材质颜色
      transparent: true,//开启透明
      opacity: 0.5,//设置透明度
      side: THREE.DoubleSide
    });
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        // 在XOZ平面上分布
        mesh.position.set(i * 200, 0, j * 200);
        that.scene.add(mesh); //网格模型添加到场景中  
      }
    }

    //创建一个空的几何体对象
    const bufferGeometry = new THREE.BufferGeometry();
    //类型化数组创建顶点数据
    const vertices = new Float32Array([
      0, 0, 0, //顶点1坐标
      50, 0, 0, //顶点2坐标
      0, 100, 0, //顶点3坐标
      0, 0, 10, //顶点4坐标
      0, 0, 100, //顶点5坐标
      50, 0, 10, //顶点6坐标
    ]);
    // 创建属性缓冲区对象
    //3个为一组，表示一个顶点的xyz坐标
    const attribue = new THREE.BufferAttribute(vertices, 3);
    // 设置几何体attributes属性的位置属性
    bufferGeometry.attributes['position'] = attribue;
    // 点渲染模式
    const bufferGeometryMaterial = new THREE.PointsMaterial({
      color: 0xffff00,
      size: 10.0 //点对象像素尺寸
    });
    const points = new THREE.Points(bufferGeometry, bufferGeometryMaterial); //点模型对象
    points.position.set(200, 200, 200);
    this.scene.add(points);


    // 线材质对象
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xff0000 //线条颜色
    });
    const linePoints = [];
    linePoints.push(new THREE.Vector3(-100, 100, 100));
    linePoints.push(new THREE.Vector3(110, 190, 110));
    linePoints.push(new THREE.Vector3(200, 200, 200));
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    // 创建线模型对象
    const line = new THREE.Line(lineGeometry, lineMaterial);
    this.scene.add(line);

    const reactangleVertices = new Float32Array([
      0, 0, 0, //顶点1坐标
      80, 0, 0, //顶点2坐标
      80, 80, 0, //顶点3坐标

      0, 0, 0, //顶点4坐标   和顶点1位置相同
      80, 80, 0, //顶点5坐标  和顶点3位置相同
      0, 80, 0, //顶点6坐标
    ]);

    const reactGeometry = new THREE.BufferGeometry();























    //环境光:没有特定方向，整体改变场景的光照明暗
    const ambient = new THREE.AmbientLight('#fff', 0.2);
    this.scene.add(ambient);

    // 实例化一个透视投影相机对象
    this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 1, 8000);
    this.camera.position.set(500, 500, 500);
    this.camera.lookAt(50, 0, 0); //坐标原点
    // 设置相机控件轨道控制器OrbitControls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
    controls.addEventListener('change', function () {
      that.renderer.render(that.scene, that.camera); //执行渲染操作
    });//监听鼠标、键盘事件
    this.width = this.three.nativeElement.clientWidth;
    this.height = this.three.nativeElement.clientHeight;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.renderer.setClearColor('#387DFF', 0.5); //设置背景颜色
    // 定义threejs输出画布的尺寸(单位:像素px)
    this.renderer.setSize(this.width, this.height); //设置three.js渲染区域的尺寸(像素px)
    this.renderer.render(this.scene, this.camera); //执行渲染操作
    //绑定DOM
    this.three.nativeElement.append(this.renderer.domElement);

  }

  /** 监听窗口尺寸变化 */
  OnWindowResize() {
    const that = this;
    window.onresize = function () {
      // 重置渲染器输出画布canvas尺寸
      that.renderer.setSize(window.innerWidth, window.innerHeight);
      // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
      that.camera.aspect = window.innerWidth / window.innerHeight;
      // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
      // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
      // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
      that.camera.updateProjectionMatrix();
    };
  }

}
