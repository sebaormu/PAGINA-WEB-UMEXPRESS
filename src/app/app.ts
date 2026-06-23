import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './componentes/nav/nav';
import { HeroComponent } from "./componentes/hero-component/hero-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, HeroComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('um-express');
}
