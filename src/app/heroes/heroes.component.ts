import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  selectedHero!: Hero;

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void { 

    this.getHeroes();

  }

  getHeroes() {

    this.heroService.getHeroes().subscribe((data: Hero[]) => {

      this.heroes = data;

    });

  }

  onSelect(hero: Hero): void {

    this.selectedHero = hero;

    this.messageService.add(`Selected hero with id ${hero.id}`);

  }

}