import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'three-project';


  constructor() {
    // console.log(this.fun(8))
    let arr = [
      { id: 1, name: '部门1', pid: 0 },
      { id: 2, name: '部门2', pid: 1 },
      { id: 3, name: '部门3', pid: 1 },
      { id: 4, name: '部门4', pid: 3 },
      { id: 5, name: '部门5', pid: 4 },
    ]
    // this.arrayToTree(arr, 0)

    console.log(this.arrayToTree(arr))
  }

  arrayToTree(items: { id: number; name: string; pid: number; }[]) {
    const result = [];   // 存放结果集
    const itemMap: any = {};  // 

    // 先转成map存储
    for (const item of items) {
      itemMap[item.id] = { ...item, children: [] }
    }

    console.log(itemMap)
    for (const item of items) {
      const id = item.id;
      const pid = item.pid;
      const treeItem = itemMap[id];
      if (pid === 0) {
        result.push(treeItem);
      } else {
        if (!itemMap[pid]) {
          itemMap[pid] = {
            children: [],
          }
        }
        itemMap[pid].children.push(treeItem)
      }
    }
    return result;
  }










  fun(n: number): any {
    console.time()
    let k = 10;
    if (n == k) {
      console.timeEnd()
      return n;
    } else {
      return this.fun(n += 1);
    }
  }


  getChildren(arr: any[], pid: number, result: any) {
    for (let child of arr) {
      if (child.pid == pid) {
        const newChildren = { ...child, children: [] };
        result.push(newChildren);
        this.getChildren(arr, child.id, newChildren.children);
      }
    }
  }

  // arrayToTree(arr: any, pid: number) {
  //   console.time()

  //   const result: any[] = [];
  //   this.getChildren(arr, pid, result)
  //   console.log(result)
  //   console.timeEnd()
  // }
}
