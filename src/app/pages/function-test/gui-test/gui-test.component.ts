import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';




@Component({
  selector: 'app-gui-test',
  templateUrl: './gui-test.component.html',
  styleUrls: ['./gui-test.component.scss']
})
export class GuiTestComponent {

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
      const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      // 沿着x轴分布
      mesh.position.set(i * 200, 0, 0);
      that.scene.add(mesh); //网格模型添加到场景中
    }

    //环境光:没有特定方向，整体改变场景的光照明暗
    const ambient = new THREE.AmbientLight('#fff', 0.2);
    this.scene.add(ambient);

    // 平行光
    const directionalLight = new THREE.DirectionalLight('#ED2B32', 1);
    // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
    directionalLight.position.set(80, 100, -150);
    // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
    this.scene.add(directionalLight);
    // DirectionalLightHelper：可视化平行光
    const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 20);
    this.scene.add(dirLightHelper);

    // CylinderGeometry：圆柱
    const geometry3 = new THREE.CylinderGeometry(50, 50, 100);
    //材质对象Material
    const material2 = new THREE.MeshLambertMaterial({
      color: 'red', //设置材质颜色
      transparent: true,//开启透明
      opacity: 0.3,//设置透明度
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry3, material2);
    mesh.position.set(400, 400, 400);
    that.scene.add(mesh); //网格模型添加到场景中

    // 实例化一个gui对象
    const gui = new GUI();
    //改变交互界面style属性
    gui.domElement.style.right = '0px';
    gui.domElement.style.width = '300px';
    // gui界面上增加交互界面，改变obj对应属性
    gui.add(ambient, 'intensity', 0, 2.0).name('环境光强度').step(0.1).onChange((value: any) => {
      that.renderer.render(that.scene, that.camera); //执行渲染操作
    });
    gui.add(mesh.position, 'x', {
      left: -100,
      center: 0,
      right: 100
      // 左: -100,//可以用中文
      // 中: 0,
      // 右: 100
    }).name('X位置选择').onChange((value: any) => {
      that.renderer.render(that.scene, that.camera); //执行渲染操作
    });
    gui.add(mesh.position, 'y', [-100, 0, 100]).onChange((value: any) => {
      that.renderer.render(that.scene, that.camera); //执行渲染操作
    });
    gui.add(mesh.position, 'z', -500, 1000).onChange((value: any) => {
      that.renderer.render(that.scene, that.camera); //执行渲染操作
    });
    gui.add(directionalLight, 'intensity', 0, 2.0).name('平行光强度').onChange((value: any) => {
      that.renderer.render(that.scene, that.camera); //执行渲染操作
    });
    gui.addColor(mesh.material, 'color').onChange((value: any) => {
      that.renderer.render(that.scene, that.camera);
    });
    const obj = {
      bool: false,
    };
    // 改变的obj属性数据类型是布尔值，交互界面是单选框
    gui.add(obj, 'bool').name('是否旋转').onChange((value: any) => {
      obj.bool = value;
    });

    // 菜单分组，材质
    const obj2 = {
      color: 0x00ffff,// 材质颜色
    };
    const material6 = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      shininess: 20, //高光部分的亮度，默认30
      specular: 0x444444, //高光部分的颜色
    });
    // 创建材质子菜单
    const matFolder = gui.addFolder('材质');
    matFolder.close();
    // 材质颜色color
    matFolder.addColor(obj2, 'color').onChange(function (value: any) {
      material6.color.set(value);
      that.renderer.render(that.scene, that.camera);
    });
    // 材质高光颜色specular
    matFolder.addColor(material6, 'specular').onChange(function (value: any) {
      material6.specular.set(value);
      that.renderer.render(that.scene, that.camera);
    });

    // 菜单分组，环境光子菜单
    const ambientFolder = gui.addFolder('环境光');
    ambientFolder.close();
    // 环境光强度
    ambientFolder.add(ambient, 'intensity', 0, 2);

    // 菜单分组，平行光子菜单
    const dirFolder = gui.addFolder('平行光');
    dirFolder.close();
    // 平行光强度
    dirFolder.add(directionalLight, 'intensity', 0, 2);
    const dirFolder2 = dirFolder.addFolder('位置');//子菜单的子菜单
    dirFolder2.close();//关闭菜单
    // 平行光位置
    dirFolder2.add(directionalLight.position, 'x', -400, 2400);
    dirFolder2.add(directionalLight.position, 'y', -400, 400);
    dirFolder2.add(directionalLight.position, 'z', -400, 400);












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


    // 渲染循环
    function render() {
      that.renderer.render(that.scene, that.camera);
      // 当gui界面设置obj.bool为true,mesh执行旋转动画
      if (obj.bool) { mesh.rotateX(0.01).rotateZ(0.01).rotateY(0.01) };
      requestAnimationFrame(render);
    }
    render();
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
