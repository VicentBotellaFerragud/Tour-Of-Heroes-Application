import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { Subject, takeUntil } from 'rxjs';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit, OnDestroy {

  heroes!: Hero[];

  destroy = new Subject();

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  /**
   * Calls the getHeroes function.
   */
  ngOnInit(): void { 

    this.getHeroes();

  }

  /**
   * Calls the getHeroes function from the hero service (to get all heroes from the server) and assigns the data obtained by calling this function
   * (all the heroes from the server) to the heroes array.
   */
  getHeroes() {

    this.heroService.getHeroes()
      .pipe(takeUntil(this.destroy))
      .subscribe((data: Hero[]) => {

      this.heroes = data;

    });

  }

  /**
   * Calls the addHero function from the hero service (to add a new hero to the server) and pusehs the data obtained by calling this function (the 
   * recently created hero) to the heroes array.
   * @param name - This is the passed-in name.
   * @returns - nothing. The function just breaks if there's no passed-in value.
   */
  add(name: string): void {
    
    name = name.trim();

    if (!name) { 
      
      return; 
    
    }

    this.heroService.addHero({ name } as Hero)
      .pipe(takeUntil(this.destroy))
      .subscribe((data: Hero) => {
      
        this.heroes.push(data);
      
      });

  }
  
  /**
   * Sets the local variable "destroy" to "true" so that all observables in the component are unsubscribed when this is "destroyed".
   */
  ngOnDestroy(): void {
    
    this.destroy.next(true);

  }

}
