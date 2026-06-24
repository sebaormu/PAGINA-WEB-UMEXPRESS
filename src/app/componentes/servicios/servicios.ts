import { Component, OnDestroy, OnInit } from '@angular/core';
import { FooterComponent } from "../footer-component/footer-component";
import { Nav } from "../nav/nav";

@Component({
  selector: 'app-servicios',
  imports: [FooterComponent, Nav],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class Servicios implements OnInit, OnDestroy{
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
 
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
      .forEach(el => this.observer.observe(el));
  }
 
  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
