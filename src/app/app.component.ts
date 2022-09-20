import { AfterContentChecked, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {

  title = 'Tour-Of-Heroes-Application';

  url!: string;

  constructor(private router: Router) { }

  /**
   * Gives the local variable "url" the value of the current url once the component has been initiated.
   */
  ngAfterContentChecked(): void {

    this.url = this.router.url;

  }

  /**
   * Checks if the passed-in url corresponds to the current url.
   * @param url - This is the passed-in url.
   * @returns - true or false, depending on whether the passed-in url corresponds to the current url or not. 
   */
  isTheCurrentLocation(url: string) {

    return this.url === url ? true : false;

  }

}