import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mli-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  color: string;

  constructor() { }

  log(msg: any) {
    console.log(msg);
  }

  ngOnInit() {
  }

}
