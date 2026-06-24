import { Component, OnDestroy, OnInit } from '@angular/core';
import { Nav } from "../nav/nav";
import { FooterComponent } from "../footer-component/footer-component";

@Component({
  selector: 'app-contactanos',
  imports: [Nav, FooterComponent],
  templateUrl: './contactanos.html',
  styleUrl: './contactanos.css',
})
export class Contactanos implements OnInit, OnDestroy {
  private observer!: IntersectionObserver;
 
  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
 
    document.querySelectorAll('.reveal-up')
      .forEach(el => this.observer.observe(el));
  }
 
  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
