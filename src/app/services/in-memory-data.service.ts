import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../interfaces/hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  /**
   * Creates the hero "database".
   * @returns - an object with all heroes and their information.
   */
  createDb() {

    const heroes = [

      { id: 1, name: 'Dr. Nice' },
      { id: 2, name: 'Bombasto' },
      { id: 3, name: 'Celeritas' },
      { id: 4, name: 'Magneta' },
      { id: 5, name: 'RubberMan' },
      { id: 6, name: 'Dynama' },
      { id: 7, name: 'Dr. IQ' },
      { id: 8, name: 'Magma' },
      { id: 9, name: 'Tornado' }

    ];

    return { heroes };

  }

  /**
   * Ensures that a hero always has an id. If the heroes array is empty, it returns the initial id (1). If, on the contrary, the heroes 
   * array is not empty, it returns the highest hero id + 1.
   * @param heroes - This is the passed-in array (in this case/project, always the heroes array).
   * @returns - the highest hero id + 1 or the initial id (1).
   */
  genId(heroes: Hero[]): number {

    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 1;

  }
  
}