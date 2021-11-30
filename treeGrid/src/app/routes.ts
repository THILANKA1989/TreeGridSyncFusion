import { Routes } from "@angular/router";
import { FullscreenLayoutComponent } from "./layouts/fullscreen-layout/fullscreen-layout.component";
import { TreegridComponent } from "./modules/treegrid/treegrid.component";

export const appRoutes: Routes = [
    {
       path: '',
       component: FullscreenLayoutComponent,
       children: [
          { path: 'treegrid', component: TreegridComponent }
       ]
    },
    { path: '**', redirectTo: 'treegrid', pathMatch: 'full' },
 ];