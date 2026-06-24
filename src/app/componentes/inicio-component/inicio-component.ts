import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Nav } from "../nav/nav";
import { HeroComponent } from '../hero-component/hero-component';
import { FooterComponent } from '../footer-component/footer-component';

@Component({
  selector: 'app-inicio-component',
  imports: [Nav, HeroComponent,FooterComponent],
  templateUrl: './inicio-component.html',
  styleUrl: './inicio-component.css',
})
export class InicioComponent  implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;

  ngAfterViewInit(): void {
    this.initScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }

  private initScrollAnimations(): void {
    const elements = document.querySelectorAll(
      '.clients-eyebrow, .clients-title, .client-card'
    );

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Una vez visible, deja de observar
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach(el => this.observer.observe(el));
  }
}
