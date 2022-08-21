import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero';
import { HEROES } from '../mocks/mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {

    const heroes = of(HEROES);

    this.messageService.add('Heroes successfully fetched from server!')

    return heroes;

  }

  getHero(id: number): Observable<Hero> {

    const hero = HEROES.find(hero => hero.id === id)!;

    this.messageService.add(`You selected hero with id ${hero?.id}.`);

    return of(hero);

  }
  
}