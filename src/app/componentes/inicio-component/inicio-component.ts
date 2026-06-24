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
      texto: 'Envié mercancía desde Bogotá hasta Pitalito y llegó en perfectas condiciones al día siguiente. Nunca había tenido una experiencia tan rápida y segura con mis encomiendas.',
      nombre: 'María Fernanda Ríos',
      cargo: 'Comerciante · Bogotá',
      iniciales: 'MR',
      avatarBg: '#EEEDFE',
      avatarColor: '#3C3489'
    },
    {
      texto: 'Manejo mi tienda online y necesito envíos confiables cada semana. Desde que los uso, ningún cliente se ha quejado por demoras ni paquetes dañados. Son mi aliado número uno.',
      nombre: 'Carlos Andrade',
      cargo: 'Emprendedor · Neiva',
      iniciales: 'CA',
      avatarBg: '#E1F5EE',
      avatarColor: '#085041'
    },
    {
      texto: 'Envié documentos urgentes y me garantizaron la entrega en menos de 24 horas. Cumplieron al pie de la letra. El rastreo en tiempo real me dio mucha tranquilidad.',
      nombre: 'Lucía Ospina',
      cargo: 'Abogada · Cali',
      iniciales: 'LO',
      avatarBg: '#FAEEDA',
      avatarColor: '#633806'
    },
    {
      texto: 'Tengo un negocio de ropa y envío pedidos a todo el Huila. El servicio es puntual, el precio es justo y el trato al cliente es excelente. No cambiaría a nadie más.',
      nombre: 'Juliana Torres',
      cargo: 'Diseñadora de modas · Garzón',
      iniciales: 'JT',
      avatarBg: '#FBEAF0',
      avatarColor: '#72243E'
    },
    {
      texto: 'Llevo más de dos años usando su servicio para mis envíos de electrodomésticos. Siempre llegan bien empacados y sin ningún contratiempo. Total confianza.',
      nombre: 'Hernán Díaz',
      cargo: 'Distribuidor · Florencia',
      iniciales: 'HD',
      avatarBg: '#E6F1FB',
      avatarColor: '#0C447C'
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
