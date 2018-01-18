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
    // load FMS onInit and push the texts back into fmsService
    this.fmsService.loadTexts().subscribe(
      res => {
        this.loading = false;
        this.fmsService.fmsTexts = res;
        console.log('texts: ', this.fmsService.fmsTexts);
      },
      err => { this.loading = true; console.error('could not load FMS texts'); },
      () => { console.log('fms observable stream completed'); }
    );
  }

}
