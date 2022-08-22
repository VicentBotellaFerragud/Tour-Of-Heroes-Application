import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  heroes!: Hero[];

  constructor(private heroService: HeroService) { }

  /**
   * Calls the getHeroes function.
   */
  ngOnInit(): void {

    this.getHeroes();
    
  }

  /**
   * Calls the getHeroes function from the hero service and assigns part of the obtained data (the first 5 heroes from the server) to the heroes array.
   */
  getHeroes() {

    this.heroService.getHeroes().subscribe((data: Hero[]) => {

      this.heroes = data.slice(0, 5);

    });

  }

}
