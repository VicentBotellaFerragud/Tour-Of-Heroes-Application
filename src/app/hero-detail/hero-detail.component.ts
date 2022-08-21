import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../services/hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  hero!: Hero;

  constructor( private route: ActivatedRoute, private heroService: HeroService, private location: Location) { }

  ngOnInit(): void {

    this.getHero();

  }

  getHero(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.heroService.getHero(id).subscribe((data: Hero) => {

      this.hero = data;

    });

  }

  goBack() {

    this.location.back();

  }

}