import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//引入性能监视器stats.js
import Stats from 'three/examples/jsm/libs/stats.module.js';

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
  spt: number = 0;

  ngAfterViewInit(): void {
    this.init();
    this.OnWindowResize();
  }


  init(): void {

    const that = this;

    this.width = this.three.nativeElement.clientWidth;
    this.height = this.three.nativeElement.clientHeight;

    // 设置几何体长宽高，也就是x、y、z三个方向的尺寸
    //对比三个参数分别对应xyz轴哪个方向
    const geometry = new THREE.BoxGeometry(100, 60, 20);
    const material = new THREE.MeshLambertMaterial({
      color: 0xffffff, //设置材质颜色
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
    const pointLight = new THREE.PointLight('#FF7F22', 1.0,);

    //点光源位置
    pointLight.position.set(110, 90, 40);//点光源放在x轴上
    this.scene.add(pointLight); //点光源添加到场景中

    // 光源辅助观察
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
    this.scene.add(pointLightHelper);

    //环境光:没有特定方向，整体改变场景的光照明暗
    const ambient = new THREE.AmbientLight('#00ECA5', 0.2);
    this.scene.add(ambient);


    // 平行光
    const directionalLight = new THREE.DirectionalLight('#ED2B32', 1);
    // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
    directionalLight.position.set(80, 100, -150);
    // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
    directionalLight.target = mesh;
    this.scene.add(directionalLight);

    // DirectionalLightHelper：可视化平行光
    const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 20);
    this.scene.add(dirLightHelper);





    // 实例化一个透视投影相机对象
    this.camera = new THREE.PerspectiveCamera(30, this.width / this.height, 1, 3000);
    this.camera.position.set(500, 500, 500);
    this.camera.lookAt(50, 0, 0); //坐标原点
    // 设置相机控件轨道控制器OrbitControls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
    // controls.addEventListener('change', function () {
    //   that.renderer.render(that.scene, that.camera); //执行渲染操作
    // });//监听鼠标、键盘事件



    // 定义threejs输出画布的尺寸(单位:像素px)
    this.renderer.setSize(this.width, this.height); //设置three.js渲染区域的尺寸(像素px)
    this.renderer.render(this.scene, this.camera); //执行渲染操作



    //绑定DOM
    this.three.nativeElement.append(this.renderer.domElement);

    // console.log(this.renderer.domElement)

    // 设置了渲染循环,相机控件OrbitControls就不用再通过事件change执行renderer.render(scene, camera);，毕竟渲染循环一直在执行renderer.render(scene, camera);
    // 渲染循环
    // const clock = new THREE.Clock();
    // // 渲染函数
    // let countNum = 0;
    // function render() {
    //   countNum += 1;
    //   that.spt = clock.getDelta() * 1000;//毫秒
    //   if (countNum % 4 == 0) that.fpsTime = that.spt;
    //   // console.log('两帧渲染时间间隔(毫秒)', clock.getDelta() * 1000);
    //   // console.log('帧率FPS', 1000 / (clock.getDelta() * 1000));
    //   that.renderer.render(that.scene, that.camera); //执行渲染操作
    //   mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
    //   requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
    // }
    // render();

    this.OnStats(mesh);
    this.addGetryTestPerformance();
  }

  fpsTime: number = 0;


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

  /** 性能监视 */
  OnStats(mesh: any): void {
    const that = this;
    //创建stats对象
    const stats = new Stats();
    //stats.domElement:web页面上输出计算结果,一个div元素，
    stats.dom.style.position = 'absolute';
    stats.dom.style.left = '0px';
    stats.dom.style.top = '0px';
    this.three.nativeElement.append(stats.dom);
    // document.body.appendChild(stats.dom);
    // 渲染函数
    function render() {
      //requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
      stats.update();
      that.renderer.render(that.scene, that.camera); //执行渲染操作
      mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
      requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
    }
    render();
  }

  addGetryTestPerformance(): void {
    // 随机创建大量的模型,测试渲染性能
    const num = 1000; //控制长方体模型数量
    for (let i = 0; i < num; i++) {
      const geometry = new THREE.BoxGeometry(5, 5, 5);
      const material = new THREE.MeshLambertMaterial({
        color: 0x00ffff
      });
      const mesh = new THREE.Mesh(geometry, material);
      // 随机生成长方体xyz坐标
      const x = (Math.random() - 0.5) * 200
      const y = (Math.random() - 0.5) * 200
      const z = (Math.random() - 0.5) * 200
      mesh.position.set(x, y, z)
      this.scene.add(mesh); // 模型对象插入场景中
    }
  }
}
