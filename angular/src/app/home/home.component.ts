import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatusServiceService, TransitionServiceService } from 'api';
import { status } from 'types';
import { transition } from 'types';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myForm: FormGroup = this.formBuilder.group({
    statusName: ''
  })



  myForm2: FormGroup = this.formBuilder.group({
    transitionName: '',
    from: '',
    to: ''

  })

  V: any
  adj: any
  init!: status
  statusList = Array<status>()
  transitionList = Array<transition>()
  newStatus!: status
  newTransition!: transition
  initial: boolean = false
  orphan: boolean = false
  final: boolean = false

  constructor(private statusService: StatusServiceService, private formBuilder: FormBuilder, private transitioService: TransitionServiceService) { }

  ngOnInit(): void {
    this.showStatusList()
    this.showTransitionList()
  }

  startDFS() {
    this.V = this.statusList.length
    this.adj = new Array(this.V);

    for (let i = 0; i < this.V; ++i) {
      this.adj[i] = []
    }
    console.log(this.transitionList);

    this.transitionList.forEach(r => {

      let fromnum = this.statusList.findIndex(t => t.name == r.fromStatus)
      let tonum = this.statusList.findIndex(t => t.name == r.toStatus)

      this.addEdge(fromnum, tonum)
      let av = this.statusList.findIndex(t => t.initial == true)

      this.BFS(av)

    })
  }

  addEdge(v: number, w: number) {
    this.adj[v].push(w);
  }

  BFS(s: number) {
    let visited = new Array(this.V);

    for (let index = 0; index < visited.length; index++) {
      visited[index] = false;
    }
    let queue = new Array();

    visited[s] = true;
    queue.push(s);


    while (queue.length != 0) {
      s = queue.pop();

      let i = this.adj[s]

      for (const val of i) {
        if (visited[val] == false) {
          visited[val] = true;
          queue.push(0)
          for (let j = queue.length - 1; j > 1; j--) {
            queue[j] = queue[j - 1]
          }
          queue[0] = val
        }
      }
    }

    for (let i = 0; i < this.statusList.length; i++) {
      this.statusList[i].orphan = !visited[i]
    }

    console.log("this.statusList after bsd", this.statusList);

    this.statusList.forEach(r => {
      this.statusService.updateStatus(r).subscribe(a => {
        this.transitioService.getAllTransition().subscribe(y => {
          this.transitionList = y
          this.statusService.getAllStatus().subscribe(dd => {
            this.statusList = dd
          })
        })
      })
    })
  }

  changeInitial(name: string) {
    let index = this.statusList.findIndex(r => r.name == name)
    this.statusList[index].initial = true
    this.statusList[index].orphan = false

    this.statusList.forEach(r => {
      if (r.name != name) {
        r.initial = false
      }
    })
    this.startDFS()

  }
  showStatusList() {
    this.statusService.getAllStatus().subscribe(
      s => {
        if (s != "undefined") {
          this.statusList = s
          this.startDFS()

        }
      }
    )
  }
  showTransitionList() {

    this.transitioService.getAllTransition().subscribe(s => {
      if (s != "undefined") {
        this.transitionList = s
        this.startDFS()

      }
    })

  }

  addNewStatus() {
    console.log(this.statusList.length, "jjj");

    if (this.statusList.length == 0) {

      this.orphan = false
      this.initial = true
    }
    else {
      this.initial = false
    }
    if (this.statusList.length > 0) {
      this.orphan = true
    }
    this.final = true
    this.newStatus = {
      name: this.myForm.value.statusName,
      initial: this.initial,
      orphan: this.orphan,
      final: this.final
    }
    if (this.statusList.length == 0) {
      this.init = this.newStatus
    }

    this.statusService.addStatus(this.newStatus).subscribe(s => {
      this.showStatusList()
      this.myForm.reset()
    })
  }
  removeStatus(name: any) {
    console.log("remove", this.statusList);


    let aa = this.statusList.findIndex(r => r.name == name)

    this.statusService.deleteStatus(name).subscribe(s => {

      if (this.statusList[aa].initial == true) {

        let i = this.statusList.find(d => d.initial == false)
        if (i != undefined) {
          i.initial = true
          i.orphan = false
          this.statusService.updateStatus(i).subscribe()
        }
      }


      this.transitioService.getAllTransition().subscribe(y => {
        this.transitionList = y
        this.showStatusList()
      })
    })
  }

  removeTransition(name: string) {
    this.transitioService.deleteTransition(name).subscribe(a => {
      let bb = this.transitionList.findIndex(r => r.name == name)
      this.transitionList.splice(bb, 1)
      this.showStatusList()
    })
    this.startDFS()
  }
  addTransition() {
    this.newTransition = {
      name: this.myForm2.value.transitionName,
      fromStatus: this.myForm2.value.from,
      toStatus: this.myForm2.value.to
    }
    this.statusList.forEach(r => {
      if (r.name == this.newTransition.fromStatus) {
        r.final = false
      }
    })

    this.transitioService.addTransition(this.newTransition).subscribe(ans => {
      this.showTransitionList()
      this.showStatusList()
      this.myForm2.reset()
    })
  }

  reset() {
    this.statusService.reset().subscribe(s => {
      this.statusList = []
      this.transitionList = []
    })
  }
}
