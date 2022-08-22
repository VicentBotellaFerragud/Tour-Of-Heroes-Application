import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../services/hero.service';
import { Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {

  hero!: Hero;

  destroy = new Subject();

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) { }

  /**
   * Calls the getHero function.
   */
  ngOnInit(): void {

    this.getHero();

  }

  /**
   * Gets the hero id from the url and passes it in when calling the getHero function from the hero service. Then, when the to-be-fetched 
   * hero is returned, the function assigns it to the local variable hero.
   */
  getHero(): void {

    let id = Number(this.route.snapshot.paramMap.get('id'));

    this.heroService.getHero(id)
      .pipe(takeUntil(this.destroy))
      .subscribe((data: Hero) => {

        this.hero = data;

      });

  }

  /**
   * By calling the updateHero function from the hero service updates the name of the current hero (the hero corresponding to the local 
   * variable hero) and then navigates the user to the previous view.
   */
  save(): void {
    
    if (this.hero) {
      
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
      
    }
    
  }

  /**
   * By calling the deleteHero function from the hero service deletes the current hero (the hero corresponding to the local variable hero) 
   * and then navigates the user to the previous view.
   */
  delete(): void {
    
    this.heroService.deleteHero(this.hero.id)
      .subscribe(() => this.goBack());

  }

  /**
   * Navigates the user to the previous view.
   */
  goBack() {

    this.location.back();

  }

  /**
   * Sets the local variable "destroy" to "true" so that all observables in the component are unsubscribed when this is "destroyed".
   */
  ngOnDestroy(): void {
    
    this.destroy.next(true);

  }

}