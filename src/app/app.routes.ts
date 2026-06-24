import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio-component/inicio-component';
import { NosotrosComponent } from './componentes/nosotros-component/nosotros-component';

export const routes: Routes = [
    { path: '', component: InicioComponent},
    { path: 'sobre-nosotros', component: NosotrosComponent}
];
