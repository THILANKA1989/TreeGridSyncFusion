import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreegridComponent } from './modules/treegrid/treegrid.component';
import { FullscreenLayoutComponent } from './layouts/fullscreen-layout/fullscreen-layout.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FilterService, PageService, SortService, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TreegridComponent,
    FullscreenLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,
    RouterModule.forRoot(appRoutes,{
      anchorScrolling : 'enabled'
   }), BrowserAnimationsModule,
   BrowserModule,
   FormsModule,
   TreeGridModule 
   // Registering EJ2 Button Module
  ],
  providers: [PageService, HttpClientModule,
    SortService,
    FilterService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class AppModule { }
