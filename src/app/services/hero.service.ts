import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero';
import { HEROES } from '../mocks/mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /**
   * GET METHOD: fetches all heroes from server. If the observable stream fails, the catchError operator intercepts the error and passes it to the 
   * error handling function, which reports the error and returns an innocuous result so that the application can keep working (this error handling 
   * procedure is used in all methods of this service.).
   */
  getHeroes(): Observable<Hero[]> {

    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
      
        tap(_ => this.log('Heroes successfully fetched!')), 
        catchError(this.handleError<Hero[]>('getHeroes', []))
      
      );

  }

  /** 
   * GET BY ID METHOD: does exactly the same as the previous method, but in this case just fetches one hero (the hero that corresponds to the 
   * passed-in id).
   * @param id - This is the passed-in id, which corresponds to the to-be-fetched hero.
   */  
  getHero(id: number): Observable<Hero> {
    
    let url = `${this.heroesUrl}/${id}`;
    
    return this.http.get<Hero>(url)
      .pipe(
      
        tap(_ => this.log(`You selected hero with id ${id}.`)),
        catchError(this.handleError<Hero>(`getHero with id ${id}.`))
      
      );
    
  }

  /** 
   * PUT METHOD: updates the passed-in hero on the server.
   * @param hero - This is the passed-in hero.
   */
  updateHero(hero: Hero): Observable<any> {
    
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
      
        tap(_ => this.log(`You updated hero with id ${hero.id}.`)),
        catchError(this.handleError<any>('updateHero'))
      
      );
    
  }

  /** 
   * POST METHOD: adds the passed-in hero to the server.
   * @param hero - This is the passed-in hero.
   */
  addHero(hero: Hero): Observable<Hero> {
    
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
      
        tap((newHero: Hero) => this.log(`New hero created! Hero's name: ${newHero.name}, Hero's id: ${newHero.id}.`)),
        catchError(this.handleError<Hero>('addHero'))
      
      );
    
  }

  /** 
   * DELETE METHOD: deletes the hero that corresponds to the passed-in id.
   * @param id - This is the passed-in id, which corresponds to the to-be-deleted hero.
   */
  deleteHero(id: number): Observable<Hero> {
    
    let url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      
      tap(_ => this.log(`You deleted hero with id ${id}.`)),
      catchError(this.handleError<Hero>('deleteHero'))
      
    );
    
  }

  /**
   * GET BY SEARCH METHOD: does exactly the same as the "GET BY ID" method, but in this case a search term is passed in instead of an id. 
   * @param term - This is the passed-in term, which could correspond to one, several or no hero at all.
   */
  searchHeroes(term: string): Observable<Hero[]> {
    
    if (!term.trim()) {
      
      return of([]);
      
    }
    
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
      
        tap(x => x.length ? this.log(`Found heroes matching "${term}".`) : this.log(`No heroes found matching "${term}".`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      
      );
    
  }

  /**
   * Handles http operations that fail.
   * @param operation - This is the name of the operation that failed.
   * @param result - This is the optional value to return as the observable result.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}.`);

      return of(result as T);
      
    };
    
  }

  /** 
   * Logs the passed-in message making use of the the message service.
   * @param message - This is the passed-in message.
   */
  private log(message: string) {
    
    this.messageService.add(`HeroService: ${message}`);
    
  }

}
