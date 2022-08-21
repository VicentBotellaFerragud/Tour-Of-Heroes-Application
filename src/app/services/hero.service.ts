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

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {

    //The catchError() operator intercepts an Observable that failed. The operator then passes the error to the error handling function.
    //The following handleError() method reports the error and then returns an innocuous result so that the application keeps working.
    return this.http.get<Hero[]>(this.heroesUrl).pipe(tap(_ => this.log('Heroes successfully fetched')),catchError(this.handleError<Hero[]>('getHeroes', [])));

  }

  getHero(id: number): Observable<Hero> {

    const hero = HEROES.find(hero => hero.id === id)!;

    this.messageService.add(`You selected hero with id ${hero?.id}.`);

    return of(hero);

  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}