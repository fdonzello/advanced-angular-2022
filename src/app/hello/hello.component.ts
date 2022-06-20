import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: `
    <div class="container">
      <div class="row">
        <div class="col text-center">
          <p>
            Welcome in this showcase of Angular
          </p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
