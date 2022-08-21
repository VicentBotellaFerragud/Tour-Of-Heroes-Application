import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {

    this.getHeroes();

  }

  getHeroes() {

    this.heroService.getHeroes().subscribe((data: Hero[]) => {

      this.heroes = data.slice(0, 5);

    });

  }

}