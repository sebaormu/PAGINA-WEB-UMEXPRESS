import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
export interface Slide {
  image: string;
  alt:   string;
}

@Component({
  selector: 'app-hero-component',
  imports: [],
  templateUrl: './hero-component.html',
  styleUrl: './hero-component.css',
})
export class HeroComponent implements OnInit, OnDestroy{
  readonly DURATION = 10000; // ms por slide

  slides: Slide[] = [
    {
      image: 'https://images.pexels.com/photos/6169189/pexels-photo-6169189.jpeg',
      alt:   ''
    },
    {
      image: 'https://images.pexels.com/photos/6169051/pexels-photo-6169051.jpeg',
      alt:   ''
    },
    {
      image: 'https://images.pexels.com/photos/5025636/pexels-photo-5025636.jpeg',
      alt:   ''
    }
  ];

  current      = 0;
  progressPct  = 0;

  private sliderTimer!:   ReturnType<typeof setInterval>;
  private progressTimer!: ReturnType<typeof setInterval>;
  private readonly TICK  = 50; // ms de resolución del progreso

  parallaxY = 0;

  ngOnInit(): void {
    this.startAuto();
  }

  ngOnDestroy(): void {
    this.stopTimers();
  }

  goTo(index: number): void {
    this.current = (index + this.slides.length) % this.slides.length;
    this.stopTimers();
    this.startAuto();
  }

  private startAuto(): void {
    this.progressPct = 0;
    const steps      = this.DURATION / this.TICK;
    let   step       = 0;

    this.progressTimer = setInterval(() => {
      step++;
      this.progressPct = (step / steps) * 100;
    }, this.TICK);

    this.sliderTimer = setInterval(() => {
      this.current    = (this.current + 1) % this.slides.length;
      this.progressPct = 0;
      step = 0;
    }, this.DURATION);
  }

  private stopTimers(): void {
    clearInterval(this.sliderTimer);
    clearInterval(this.progressTimer);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const heroH = window.innerHeight;
    if (window.scrollY < heroH) {
      this.parallaxY = window.scrollY * 0.40;
    }
  }
}
