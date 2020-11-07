import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { BackendCommunicationModule } from './core/backend/backend-communication.module';
import { DetailsModule } from './details/details.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BackendCommunicationModule.forRoot({
      yandexWeatherApiKey: environment.yandexWeatherApiKey,
    }),
    BrowserModule,
    BrowserAnimationsModule,
    DetailsModule.forRoot({
      latitude: environment.cityCoordinates.latitude,
      longitude: environment.cityCoordinates.longitude,
    }),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
