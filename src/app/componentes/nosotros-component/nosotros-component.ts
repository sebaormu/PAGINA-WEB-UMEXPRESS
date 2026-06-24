import { Component, OnDestroy, OnInit } from '@angular/core';
import { Nav } from "../nav/nav";
import { FooterComponent } from "../footer-component/footer-component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nosotros-component',
  imports: [Nav, FooterComponent, RouterModule],
  templateUrl: './nosotros-component.html',
  styleUrl: './nosotros-component.css',
})
export class NosotrosComponent  implements OnInit, OnDestroy{
  private observers: IntersectionObserver[] = [];
 
  ngOnInit(): void {
    this.initRevealAnimations();
    this.initCounters();
  }
 
  ngOnDestroy(): void {
    this.observers.forEach(obs => obs.disconnect());
  }
 
  private initRevealAnimations(): void {
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
 
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
      .forEach(el => revealObs.observe(el));
 
    this.observers.push(revealObs);
  }
 
  private initCounters(): void {
    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = parseInt(el.dataset['target'] || '0', 10);
            this.animateCounter(el, target);
            counterObs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
 
    document.querySelectorAll('.stat-num')
      .forEach(el => counterObs.observe(el));
 
    this.observers.push(counterObs);
  }
 
  private animateCounter(el: HTMLElement, target: number): void {
    const duration = 1800;
    const start = performance.now();
 
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
 
    requestAnimationFrame(tick);
  }
}
