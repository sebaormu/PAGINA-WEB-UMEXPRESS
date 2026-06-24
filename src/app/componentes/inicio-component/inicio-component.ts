import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Nav } from "../nav/nav";
import { HeroComponent } from '../hero-component/hero-component';
import { FooterComponent } from '../footer-component/footer-component';

@Component({
  selector: 'app-inicio-component',
  imports: [Nav, HeroComponent, FooterComponent],
  templateUrl: './inicio-component.html',
  styleUrl: './inicio-component.css',
})
export class InicioComponent implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;
  testimonios = [
  {
    texto: 'El equipo superó todas nuestras expectativas. La velocidad de entrega y calidad fue impresionante.',
    nombre: 'Carlos Mendoza', cargo: 'CEO · Craft Studio',
    iniciales: 'CM', avatarBg: '#EEEDFE', avatarColor: '#3C3489'
  },
  {
    texto: 'Nunca habíamos trabajado con una agencia tan comprometida. Soluciones simples a problemas complejos.',
    nombre: 'Laura Rodríguez', cargo: 'Directora · Haus Group',
    iniciales: 'LR', avatarBg: '#E1F5EE', avatarColor: '#085041'
  },
  {
    texto: 'La transformación digital fue posible gracias a su acompañamiento. Resultados desde la primera semana.',
    nombre: 'Andrés Peña', cargo: 'CTO · PowerXR Module',
    iniciales: 'AP', avatarBg: '#FAEEDA', avatarColor: '#633806'
  },
  {
    texto: 'Comunicación clara, tiempos cumplidos y resultado que superó lo que teníamos en mente.',
    nombre: 'Sofía Vargas', cargo: 'Fundadora · Hype Brand',
    iniciales: 'SV', avatarBg: '#FBEAF0', avatarColor: '#72243E'
  },
  {
    texto: 'El nivel de profesionalismo fue algo que no esperábamos. La mejor inversión del año.',
    nombre: 'Jorge Mora', cargo: 'Gerente · Minimum Co.',
    iniciales: 'JM', avatarBg: '#E6F1FB', avatarColor: '#0C447C'
  },
];

  current = 0;
  cardWidth = 296;
  private timer: any;

  ngOnInit() { this.startAuto(); }

  goTo(i: number) { this.current = (i + this.testimonios.length) % this.testimonios.length; }
  prev() { this.goTo(this.current - 1); this.startAuto(); }
  next() { this.goTo(this.current + 1); this.startAuto(); }

  startAuto() {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.next(), 4000);
  }

  ngAfterViewInit(): void {
    this.initScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
    clearInterval(this.timer);
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
