import { Component, OnInit } from '@angular/core';

import { FmsService } from './fms.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  public loading = false;

  constructor(private fmsService: FmsService){}

  ngOnInit() {
    this.loading = true;
    this.fmsService.getFms().subscribe(
      res => { this.loading = false; },
      err => { this.loading = true; }
    );
  }

}
