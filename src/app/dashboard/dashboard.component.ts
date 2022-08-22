import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../services/hero.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  heroes!: Hero[];

  destroy = new Subject();

  constructor(private heroService: HeroService) { }

  /**
   * Calls the getHeroes function.
   */
  ngOnInit(): void {

    this.getHeroes();
    
  }

  /**
   * Calls the getHeroes function from the hero service and assigns part of the obtained data (the first 5 heroes from the server) to the 
   * heroes array.
   */
  getHeroes() {

    this.heroService.getHeroes()
      .pipe(takeUntil(this.destroy))
      .subscribe((data: Hero[]) => {

        this.heroes = data.slice(0, 5);

      });

  }

  /**
   * Sets the local variable "destroy" to "true" so that all observables in the component are unsubscribed when this is "destroyed".
   */
  ngOnDestroy(): void {
    
    this.destroy.next(true);

  }

}