import {
  state,
  style,
  trigger,
  transition,
  animate
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit
} from '@angular/core';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import {
  TranslateService
} from '@ngx-translate/core';
import {
  DeviceDetectorService
} from 'ngx-device-detector';
import { ComponentEventBindingService } from 'src/app/app-message-binding';
import { CDN } from 'src/app/globals';
import { fadeSlideInOutAnimation } from '../../../animations';

@Component({
  selector: 'app-our-partners',
  templateUrl: './our-partners.component.html',
  styleUrls: ['./our-partners.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('bringToFrontAnimation', [
      state('inView', style({
        opacity: "1",
        zIndex: "3"
      })),
      state('outOfView', style({
        opacity: "0",
        zIndex: "1"
      })),
      transition('outOfView => inView', [
        animate("0.01s", style({
          zIndex: "3"
        })),
        animate("0.4s", style({
          opacity: "1"
        }))
      ]),
      transition('inView => outOfView', [
        animate("0.4s", style({
          opacity: "0"
        })),

        animate("0.01s", style({
          zIndex: "1"
        })),
      ])
    ]),
    fadeSlideInOutAnimation
  ]
})
export class OurPartnersComponent implements OnInit {

  partnersEn = [{
      name: "OPI",
      onView: false,
      logo: CDN + "assets/img/our-partners/opi-white.png",
      modal_logo: CDN + "assets/img/our-partners/opi-logo.png",
      goal: "Generate brand awareness",
      channels: "Facebook, Instagram",
      industry: "Fashion",
      description: "OPI is a leading brand in nail polishing products and we are working together to build their brand awareness through distinctive creative campaigns on Facebook’s network. We are not driving conversions yet, but we are using Facebook’s tools to gather audience data of interested users and in the future when the business demands it we can target that audience with calls to action."
    },
    {
      name: "Assist card",
      onView: false,
      logo: CDN + "assets/img/our-partners/assist-card-logo.png",
      modal_logo: CDN + "assets/img/our-partners/assist-card-logo.png",
      goal: "Assist card’s inhouse team enhancement",
      channels: "Facebook, Instagram, Google Ads",
      industry: "Travel health insurance",
      description: "Assist card is a world-class business that has its own marketing in-house team and chose ABN to help them implement and maintain large campaign structures on both Google and Facebook. We help them optimize and maintain high performance results on their digital strategy in 14 different countries."
    },
    {
      name: "Flux IT",
      onView: false,
      logo: CDN + "assets/img/our-partners/flux-it-logo.png",
      modal_logo: CDN + "assets/img/our-partners/flux-it-logo.png",
      goal: "B2B marketing and employer branding",
      channels: "Linkedin Ads, Google Ads, Twitter Ads, Facebook, Instagram.",
      industry: "Software developement",
      description: "In Flux IT’s case we are working together to push their B2B software solutions using LinkedIn’s network. We take full advantage of the largest professional network and drive high quality leads that they follow up with their sales team. We are also implementing employer branding campaigns on the rest of the channels to help Flux communicate the value differentials of their work environment and improve their hiring."
    },
    {
      name: "Diagnóstico Maipú",
      onView: false,
      logo: CDN + "assets/img/our-partners/maipu-white.png",
      modal_logo: CDN + "assets/img/our-partners/dmaipu-logo.png",
      goal: "Drive acquisition of product and services",
      channels: "Facebook, Instagram, Youtube, Google Display Network, Google Search",
      industry: "Health",
      description: "ABN is currently working with Diagnóstico Maipú running location specific campaigns each with its own marketing funnel strategic state. They have a wide-range of products and services distributed across their different headquarters and we ensure that all the different target audiences get the right message. We use Google Search with relevant keywords to meet demands of potential customers and Facebook push marketing tools to reach new potential customers and expand Maipú’s reach."
    },
  ]
  partnersEs = [{
      name: "OPI",
      onView: false,
      logo: CDN + "assets/img/our-partners/opi-white.png",
      modal_logo: CDN + "assets/img/our-partners/opi-logo.png",
      goal: "Generate brand awareness",
      channels: "Facebook, Instagram",
      industry: "Fashion",
      description: "OPI is a leading brand in nail polishing products and we are working together to build their brand awareness through distinctive creative campaigns on Facebook’s network. We are not driving conversions yet, but we are using Facebook’s tools to gather audience data of interested users and in the future when the business demands it we can target that audience with calls to action."
    },
    {
      name: "Assist card",
      onView: false,
      logo: CDN + "assets/img/our-partners/assist-card-logo.png",
      modal_logo: CDN + "assets/img/our-partners/assist-card-logo.png",
      goal: "Assist card’s inhouse team enhancement",
      channels: "Facebook, Instagram, Google Ads",
      industry: "Travel health insurance",
      description: "Assist card is a world-class business that has its own marketing in-house team and chose ABN to help them implement and maintain large campaign structures on both Google and Facebook. We help them optimize and maintain high performance results on their digital strategy in 14 different countries."
    },
    {
      name: "Flux IT",
      onView: false,
      logo: CDN + "assets/img/our-partners/flux-it-logo.png",
      modal_logo: CDN + "assets/img/our-partners/flux-it-logo.png",
      goal: "B2B marketing and employer branding",
      channels: "Linkedin Ads, Google Ads, Twitter Ads, Facebook, Instagram.",
      industry: "Software developement",
      description: "In Flux IT’s case we are working together to push their B2B software solutions using LinkedIn’s network. We take full advantage of the largest professional network and drive high quality leads that they follow up with their sales team. We are also implementing employer branding campaigns on the rest of the channels to help Flux communicate the value differentials of their work environment and improve their hiring."
    },
    {
      name: "Diagnóstico Maipú",
      onView: false,
      logo: CDN + "assets/img/our-partners/maipu-white.png",
      modal_logo: CDN + "assets/img/our-partners/dmaipu-logo.png",
      goal: "Impulsar la adquisición de servicios",
      channels: "Facebook, Instagram, Youtube, Google Display Network, Google Search",
      industry: "Salud",
      description: "Actualmente estamos trabajando junto a Diagnóstico Maipú, Centro de Diagnóstico por Imágenes y Laboratorio de Análisis Clínicos. Ellos ofrecen una amplia variedad de servicios y su objetivo es promover la adquisición de los mismos a través de campañas de marketing digital. Para alcanzar ese objetivo implementamos una estrategia Full Funnel que incluye campañas pull y push en distintos medios digitales, como Google Ads y Facebook / Instagram Ads."
    },
    {
      name: "PPA",
      onView: false,
      logo: CDN + "assets/img/our-partners/ppa-logo.png",
      modal_logo: CDN + "assets/img/our-partners/ppa-logo-light.png",
      goal: "Incrementar la cantidad de asociados",
      channels: "Facebook, Instagram, Google Display Network, Google Search",
      industry: "Fotografía profesional",
      description: "Actualmente estamos trabajando junto a Diagnóstico Maipú, Centro de Diagnóstico por Imágenes y Laboratorio de Análisis Clínicos. Ellos ofrecen una amplia variedad de servicios y su objetivo es promover la adquisición de los mismos a través de campañas de marketing digital. Para alcanzar ese objetivo implementamos una estrategia Full Funnel que incluye campañas pull y push en distintos medios digitales, como Google Ads y Facebook / Instagram Ads."
    }
  ]
  partners: any = []
  autoplay = {
    delay: 3000,
    disableOnInteraction: true
  }
  slidesPerView: any;
  isMobile: boolean;
  constructor(private translate: TranslateService,
    private deviceService: DeviceDetectorService,
    private _componentBindingService: ComponentEventBindingService ) {
    this.isMobile = this.deviceService.isMobile();
    if (this.isMobile) {
      this.slidesPerView = 1
    } else {
      this.slidesPerView = 3
    }
    if (translate.currentLang == "en") {
      this.partners = this.partnersEn
    } else {
      this.partners = this.partnersEs
    }
  }

  ngOnInit(): void {}

  triggerAnimation(clientName: string) {
    if (this.isMobile) {
      var selectedPartnerData:any;
      for (var i = 0; i < this.partners.length; i++) {
        if (this.partners[i].name == clientName) {
          selectedPartnerData = this.partners[i]
        }
      }
      this._componentBindingService.emitPartnerModalEvent(selectedPartnerData)
    } else {
      for (var i = 0; i < this.partners.length; i++) {
        if (this.partners[i].name == clientName) {
          this.partners[i].onView = true
        } else {
          this.partners[i].onView = false
        }
      }
    }

  }
  untriggerAnimation(clientName: string) {
    for (var i = 0; i < this.partners.length; i++) {
      if (this.partners[i].name == clientName) {
        this.partners[i].onView = false
      }
    }
  }
}

@NgModule({
  declarations: [OurPartnersComponent],
  imports: [
    CommonModule,
    SwiperModule,
      TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
      }),
      HttpClientModule
  ]
})
class OurPartnersModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}