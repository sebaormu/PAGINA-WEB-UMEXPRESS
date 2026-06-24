import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio-component/inicio-component';
import { NosotrosComponent } from './componentes/nosotros-component/nosotros-component';
import { Contactanos } from './componentes/contactanos/contactanos';
import { Servicios } from './componentes/servicios/servicios';
import { GaleriaComponent } from './componentes/galeria-component/galeria-component';

export const routes: Routes = [
    { path: '', component: InicioComponent},
    { path: 'sobre-nosotros', component: NosotrosComponent},
    { path: 'contactanos', component: Contactanos},
    { path: 'servicios', component: Servicios},
    { path: 'galeria', component: GaleriaComponent}
];
