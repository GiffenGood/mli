import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  layout = 'row';

  constructor() { }

  ngOnInit() {
  }

}
