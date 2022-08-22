import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {

  heroes$!: Observable<Hero[]>;
  
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  /**
   * The function assigns to the heroes$ array the data obtained by calling the searchHeroes function of the hero service (all heroes that match the 
   * user's search -all heroes whose names contain part of or are the same as the search term-).
   */
  ngOnInit(): void {
    
    this.heroes$ = this.searchTerms.pipe(
    
      //Waits 300ms after each keystroke before considering the search term.
      debounceTime(300),

      //Ignores the new search term if it's the same as the previous one.
      distinctUntilChanged(),

      //Switches to a new search observable each time the search term changes.
      switchMap((term: string) => this.heroService.searchHeroes(term)),
        
    );

  }
  
  /**
   * Pushes the passed-in search term into the observable stream.
   * @param term - This is the passed-in search term.
   */
  search(term: string): void {
    
    this.searchTerms.next(term);

  }
  
}
