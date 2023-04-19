import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//引入性能监视器stats.js
import Stats from 'three/examples/jsm/libs/stats.module.js';

@Component({
  selector: 'app-camera-test',
  templateUrl: './camera-test.component.html',
  styleUrls: ['./camera-test.component.scss']
})
export class CameraTestComponent {

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
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor('#387DFF', 0.5); //设置背景颜色


    const geometry = new THREE.BoxGeometry(100, 100, 100);
    //材质对象Material
    const material = new THREE.MeshLambertMaterial({
      color: 0x00ffff, //设置材质颜色
      transparent: true,//开启透明
      opacity: 0.5,//设置透明度
      side: THREE.DoubleSide
    });
    for (let i = 0; i < 10; i++) {
      const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      // 沿着x轴分布
      mesh.position.set(i * 200, 0, 0);
      that.scene.add(mesh); //网格模型添加到场景中
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        // 在XOZ平面上分布
        mesh.position.set(i * 200, 0, j * 200);
        that.scene.add(mesh); //网格模型添加到场景中  
      }
    }

    //BoxGeometry：长方体
    const geometry1 = new THREE.BoxGeometry(100, 100, 100);
    // SphereGeometry：球体
    const geometry2 = new THREE.SphereGeometry(50);
    // CylinderGeometry：圆柱
    const geometry3 = new THREE.CylinderGeometry(50, 50, 100);
    // PlaneGeometry：矩形平面
    const geometry4 = new THREE.PlaneGeometry(100, 50);
    // CircleGeometry：圆形平面
    const geometry5 = new THREE.CircleGeometry(50);
    const geometryList = [geometry1, geometry2, geometry3, geometry4, geometry5];

    for (let i = 0; i < 5; i++) {

      const mesh = new THREE.Mesh(geometryList[i], material); //网格模型对象Mesh
      // 沿着x轴分布
      mesh.position.set(200, (i + 1) * 200, 200);
      that.scene.add(mesh); //网格模型添加到场景中
    }

    const geometry6 = new THREE.CylinderGeometry(50, 50, 100);
    // 模拟镜面反射，产生一个高光效果
    const material6 = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      shininess: 20, //高光部分的亮度，默认30
      specular: 0x444444, //高光部分的颜色
    });
    const mesh6 = new THREE.Mesh(geometry6, material6); //网格模型对象Mesh
    // 沿着x轴分布
    mesh6.position.set(400, 400, 400);
    that.scene.add(mesh6); //网格模型添加到场景中

    // AxesHelper：辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(150);
    this.scene.add(axesHelper);

    //点光源：两个参数分别表示光源颜色和光照强度
    const pointLight = new THREE.PointLight('#FF7F22', 1.0,);
    //点光源位置
    pointLight.position.set(310, 800, 500);//点光源放在x轴上
    this.scene.add(pointLight); //点光源添加到场景中
    // 光源辅助观察
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
    this.scene.add(pointLightHelper);

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

    //环境光:没有特定方向，整体改变场景的光照明暗
    const ambient = new THREE.AmbientLight('#00ECA5', 0.2);
    this.scene.add(ambient);


    // 定义threejs输出画布的尺寸(单位:像素px)
    this.renderer.setSize(this.width, this.height); //设置three.js渲染区域的尺寸(像素px)
    this.renderer.render(this.scene, this.camera); //执行渲染操作
    //绑定DOM
    this.three.nativeElement.append(this.renderer.domElement);


    // 平行光
    const directionalLight = new THREE.DirectionalLight('#ED2B32', 1);
    // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
    directionalLight.position.set(80, 100, -150);
    // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
    this.scene.add(directionalLight);
    // DirectionalLightHelper：可视化平行光
    const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 20);
    this.scene.add(dirLightHelper);





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

  antialias(): void {
    this.renderer.antialias = this.renderer.antialias ? false : true;
    console.log(this.renderer.antialias)
  }
}
