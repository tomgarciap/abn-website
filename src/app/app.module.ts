import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Globals } from './globals';
import { ComponentEventBindingService } from './app-message-binding';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { LottieModule } from 'ngx-lottie';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AnimationP5Component } from './landing/landing-inner-components/animation-p5/animation-p5.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { SectionSliderComponent } from './section-slider/section-slider.component';
import { ContactUsComponent } from './landing/landing-inner-components/contact-us/contact-us.component';
import { ComponentSeparatorComponent } from './landing/landing-inner-components/component-separator/component-separator.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AnimationP5Component,
    LandingComponent,
    FooterComponent,
    SectionSliderComponent,
    ContactUsComponent,
    ComponentSeparatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory,
                           useCache: true,
                         })
  ],
  providers: [Globals, ComponentEventBindingService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


export function playerFactory() {
  return import('lottie-web/build/player/lottie_svg');
}