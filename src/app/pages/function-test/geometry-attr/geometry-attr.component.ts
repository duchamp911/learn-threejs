import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

@Component({
  selector: 'app-geometry-attr',
  templateUrl: './geometry-attr.component.html',
  styleUrls: ['./geometry-attr.component.scss']
})
export class GeometryAttrComponent {

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
    this.width = this.three.nativeElement.clientWidth;
    this.height = this.three.nativeElement.clientHeight;

    // AxesHelper：辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(150);
    this.scene.add(axesHelper);

    // const geometry = new THREE.PlaneGeometry(100, 50); //矩形平面几何体
    const geometry = new THREE.BoxGeometry(50, 50, 50); //长方体
    console.log('几何体', geometry);
    console.log('顶点位置数据', geometry.attributes['position']);
    console.log('顶点索引数据', geometry.index);


    const material = new THREE.MeshLambertMaterial({
      color: 0x00ffff,
      side: THREE.DoubleSide,
      wireframe: false,//线条模式渲染mesh对应的三角形数据
    });
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    this.scene.add(mesh);


    // 实例化一个gui对象
    const gui = new GUI();
    //改变交互界面style属性
    gui.domElement.style.right = '0px';
    gui.domElement.style.width = '300px';
    const obj = {
      bool: false,
    };
    gui.add(obj, 'bool',).name('线条模式渲染，查看几何体三角形结构').onChange((value: any) => {
      material.wireframe = value;
      that.renderer.render(that.scene, that.camera); //执行渲染操作
    });



    //矩形几何体PlaneGeometry的参数3,4表示细分数，默认是1,1
    const Planegeometry = new THREE.PlaneGeometry(100, 50, 1, 1);
    const Planematerial = new THREE.MeshLambertMaterial({
      color: 0x00ffff,
      side: THREE.DoubleSide,
      wireframe: true,//线条模式渲染mesh对应的三角形数据
    });
    const Planemesh = new THREE.Mesh(Planegeometry, Planematerial); //网格模型对象Mesh
    Planemesh.position.set(200, 200, 200);
    this.scene.add(Planemesh);
    // const PlanemeshObj = {
    //   widthSegments: 1,
    //   heightSegments: 1,
    // }
    // // 参数3、参数4数据类型：数字(拖动条)
    // gui.add(PlanemeshObj, 'widthSegments', 0, 20).name('平面的宽度分段数').onChange(function (value: any) {
    //   Planegeometry.setAttribute() =Math.ceil(value);
    //   that.renderer.render(that.scene, that.camera); //执行渲染操作
    // });
    // gui.add(PlanemeshObj, 'heightSegments', 0, 20).name('平面的高度分段数').onChange(function (value: any) {
    //   Planegeometry.setAttribute('heightSegments', value);
    //   that.renderer.render(that.scene, that.camera); //执行渲染操作
    // });





    const Spheregeometry = new THREE.SphereGeometry(50, 32, 16);
    const Spheregeometry2 = new THREE.SphereGeometry(15, 8, 8);
    const Planemesh1 = new THREE.Mesh(Spheregeometry, Planematerial); //网格模型对象Mesh
    const Planemesh2 = new THREE.Mesh(Spheregeometry2, Planematerial); //网格模型对象Mesh
    Planemesh1.position.set(300, 300, 300);
    Planemesh2.position.set(400, 100, 200);
    this.scene.add(Planemesh1);
    this.scene.add(Planemesh2);
    const objSpheregeometry = {
      scale: 1
    }
    gui.add(objSpheregeometry, 'scale', 0, 2).name('球体缩放').onChange((value: any) => {
      Spheregeometry.scale(value, value, value);
      Spheregeometry.translate(value, 0, 0);//偏移
      that.renderer.render(that.scene, that.camera); //执行渲染操作
    });
    const objSpheregeometryCenter = {
      bool: false,
    };
    gui.add(objSpheregeometryCenter, 'bool',).name('居中').onChange((value: any) => {
      if (value) Spheregeometry.center();
      that.renderer.render(that.scene, that.camera); //执行渲染操作
    });








    //环境光:没有特定方向，整体改变场景的光照明暗
    const ambient = new THREE.AmbientLight('#00ECA5', 0.2);
    this.scene.add(ambient);

    // 实例化一个透视投影相机对象
    this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 1, 80000);
    this.camera.position.set(500, 500, 500);
    this.camera.lookAt(50, 0, 0); //坐标原点
    // 设置相机控件轨道控制器OrbitControls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
    controls.addEventListener('change', function () {
      that.renderer.render(that.scene, that.camera); //执行渲染操作
    });//监听鼠标、键盘事件
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor('#387DFF', 0.5); //设置背景颜色
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
