import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {

  title = 'Tour-Of-Heroes-Application';

  url!: string;

  constructor (private router: Router) {}

  ngAfterContentChecked(): void {
    
    this.url = this.router.url;

  }

  isTheCurrentLocation(url: string) {

    return this.url === url ? true : false;

  }

}