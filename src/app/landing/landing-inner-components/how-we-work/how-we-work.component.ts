import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  Renderer2,
  OnDestroy,
  NgModule,
  Output,
  EventEmitter
} from '@angular/core';
import {
  AnimationOptions, LottieModule
} from 'ngx-lottie';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild,
  group
} from '@angular/animations';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import { CDN } from 'src/app/globals'
import { SwiperModule } from 'swiper/angular';

import {
  ComponentEventBindingService
} from "../../../app-message-binding"
import {
  DeviceDetectorService
} from 'ngx-device-detector';
import {
  Subject,
  Subscription
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { LottieAnimationComponent } from './lottie-animation/lottie-animation.component';
import { fadeSlideInOutAnimation } from '../../../animations';
// in seconds
const LOTTIE_ANIMATION_FADE_DURATION = 0.5

// ON SCROLL ANIMATION DURATION
const ANIMATION_DURATION = 1

@Component({
  selector: 'app-how-we-work',
  templateUrl: './how-we-work.component.html',
  styleUrls: ['./how-we-work.component.scss'],
  animations: [
    trigger(
      'inOutDomAnimation', 
      [
        transition(
          ':enter', 
          [
            style({opacity: 0 }),
            animate('1s ease-out', 
                    style({opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({opacity: 1 }),
            animate('1s ease-in', 
                    style({opacity: 0 }))
          ]
        )
      ]
    ),
    trigger("inOutViewTriggered",[
      state("inView", style({
        opacity:1
      })),
      state("outOfView", style({
        opacity:0,
        transform: "translateX(-50px)"
      })),
      transition("inView => outOfView", [
        animate("0.1s")
      ]),
      transition("outOfView => inView", [
        animate("0.8s")
      ])
    ]),
    trigger('onWorkItemClick', [      
      // Line Color
      state('lineColorOnView', style({
        fill: "#4BC0BA"
      })),
      state('lineColorNotOnView', style({
        fill: "#4E4F53"
      })),
      // Line Container
      state('containerLineOnView', style({
        paddingTop: "2.625rem",
        paddingBottom: "2.625rem"
      })),
      state('containerLineNotOnView', style({
        paddingTop: "0.125rem",
        paddingBottom: "0.125rem"
      })),
      // Description
      state('descriptionOnView', style({
        opacity: "1",
        height: "7rem"
      })),
      state('descriptionNotOnView', style({
        height: "0",
        opacity: "0"
      })),
      state('onViewTitle', style({
        color: "#4BC0BA",
        height: "1.75rem"
      })),
      state('notOnViewTitle', style({
        color: "#ffffff",
        height: "3.25rem",
      })),
      transition('onViewTitle => notOnViewTitle', [
        group([
          animate("0.7s ease-out", style({ height: "3.25rem",
          alignItems: "flex-start"})),
          animate("0.2s", style({
            color: "#ffffff",
          }))
        ])
      ]),
      transition('notOnViewTitle => onViewTitle', [
        group([
          animate("0.7s ease-out", style({height: "1.75rem",
          alignItems: "center"})),
          animate("0.2s", style({
            color: "#4BC0BA",
          }))
        ])
      ]),
      transition('containerLineOnView <=> containerLineNotOnView', [
        group(
          [
            query('@innerLineSize', animateChild()),
            animate("0.7s ease-out")
          ]
        )
      ]),
      transition('descriptionOnView => descriptionNotOnView', [
        group([
          animate("0.2s ease", style({
            opacity: 0
          })),
          animate("0.7s ease-out", style({
            height: 0
          }))
        ])
        
      ]),
      transition('descriptionNotOnView => descriptionOnView', [
        animate("0.7s ease-out", style({
          height: "7rem"
        })),
        animate("0.3s")
      ])
    ]),
    trigger('innerLineSize', [
      state('lineOnView', style({
        height: "1.75rem"
      })),
      state('lineNotOnView', style({
        height: "1.25rem"
      })),
      transition('lineOnView <=> lineNotOnView', [
        animate("0.7s ease-out")
      ])
    ]),
    fadeSlideInOutAnimation
  ]
})
export class HowWeWorkComponent implements OnInit, AfterViewInit, OnDestroy {
  animationOneOptions: AnimationOptions;
  animationTwoOptions: AnimationOptions;
  animationThreeOptions: AnimationOptions;
  animationFourOptions: AnimationOptions;
  animationFiveOptions: AnimationOptions;
  animationSixOptions: AnimationOptions;

  selectedAnimation: String = "animationOne";
  inProgressAnimation: String = "";
  animationSwitchInProcess = false;
  originalPosition: any = {
    x: null,
    y: null
  };
  pagination = {
    clickable: true
  };
  @ViewChild("sectionTitle") sectionTitle: ElementRef;
  @ViewChild("rightBodySection") rightBodySection: ElementRef;
  @ViewChild("leftBodySection") leftBodySection: ElementRef;
  @ViewChild("sectionTitleMobile") sectionTitleMobile: ElementRef;
  @ViewChild("rightBodySectionMobile") rightBodySectionMobile: ElementRef;


  @ViewChild("howWeWorkTitleOne") howWeWorkTitleOne: ElementRef;
  @ViewChild("howWeWorkTitleTwo") howWeWorkTitleTwo: ElementRef;
  @ViewChild("howWeWorkTitleThree") howWeWorkTitleThree: ElementRef;
  @ViewChild("howWeWorkTitleFour") howWeWorkTitleFour: ElementRef;
  @ViewChild("howWeWorkTitleFive") howWeWorkTitleFive: ElementRef;
  @ViewChild("howWeWorkTitleSix") howWeWorkTitleSix: ElementRef;

  @Output() componentFinishedLoading = new EventEmitter<boolean>();
  destroy$ = new Subject()

  listOfHowWeWork: any[]
  isMobile = false;
  sectionTitleInView: boolean = false;
  rightBodySectionInView: boolean = false;
  leftBodySectionInView: boolean = false;
  sectionTitleInViewMobile: boolean = false;
  rightBodySectionInViewMobile: boolean = false;
  leftBodySectionInViewMobile: boolean = false;

  // Subscriptions
  firstScrollEventSubscription: Subscription;
  howWeWorkElementInViewSubscription: Subscription;
  howWeWorkTitleSubscriptions: Array < any >  = [];

  constructor(private _renderer2: Renderer2,
    private _componentBindingService: ComponentEventBindingService,
    private deviceService: DeviceDetectorService) {
    this.isMobile = this.deviceService.isMobile()
    this.animationOneOptions = {
      path: CDN + 'assets/animations/landing/discovery.json'
    }
    this.animationTwoOptions = {
      path: CDN + 'assets/animations/landing/strategy-creation.json'
    }
    this.animationThreeOptions = {
      path: CDN + 'assets/animations/landing/implementation.json'
    }
    this.animationFourOptions = {
      path: CDN + 'assets/animations/landing/optimization.json'
    }
    this.animationFiveOptions = {
      path: CDN + 'assets/animations/landing/real-time-reporting.json'
    }
    this.animationSixOptions = {
      path: CDN + 'assets/animations/landing/presentation.json'
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.firstScrollEventSubscription.unsubscribe()
    this.howWeWorkElementInViewSubscription.unsubscribe()
    for (var i = 0; i < this.howWeWorkTitleSubscriptions.length; i++) {
      this.howWeWorkTitleSubscriptions[i].unsubscribe()
    }
  }

  ngAfterViewInit(): void {
    this.listOfHowWeWork = [{
      animationName: "animationOne",
      htmlElement: this.howWeWorkTitleOne,
    },
    {
      animationName: "animationTwo",
      htmlElement: this.howWeWorkTitleTwo,
    },
    {
      animationName: "animationThree",
      htmlElement: this.howWeWorkTitleThree,
    },
    {
      animationName: "animationFour",
      htmlElement: this.howWeWorkTitleFour,
    },
    {
      animationName: "animationFive",
      htmlElement: this.howWeWorkTitleFive,
    },
    {
      animationName: "animationSix",
      htmlElement: this.howWeWorkTitleSix,
    }
  ];

    var hoverSubscription1 = this._renderer2.listen(this.listOfHowWeWork[0].htmlElement.nativeElement, 'mouseenter', (event) => {
      if(this.selectedAnimation != this.listOfHowWeWork[0].animationName){
        this.presentAnimation(this.listOfHowWeWork[0].animationName)
      }
    })

    var hoverSubscription2 = this._renderer2.listen(this.listOfHowWeWork[1].htmlElement.nativeElement, 'mouseenter', (event) => {
      if(this.selectedAnimation != this.listOfHowWeWork[1].animationName){
        this.presentAnimation(this.listOfHowWeWork[1].animationName)
      }
    })

    var hoverSubscription3 = this._renderer2.listen(this.listOfHowWeWork[2].htmlElement.nativeElement, 'mouseenter', (event) => {
      if(this.selectedAnimation != this.listOfHowWeWork[2].animationName){
        this.presentAnimation(this.listOfHowWeWork[2].animationName)
      }
    })

    var hoverSubscription4 = this._renderer2.listen(this.listOfHowWeWork[3].htmlElement.nativeElement, 'mouseenter', (event) => {
      if(this.selectedAnimation != this.listOfHowWeWork[3].animationName){
        this.presentAnimation(this.listOfHowWeWork[3].animationName)
      }
    })

    var hoverSubscription5 = this._renderer2.listen(this.listOfHowWeWork[4].htmlElement.nativeElement, 'mouseenter', (event) => {
      if(this.selectedAnimation != this.listOfHowWeWork[4].animationName){
        this.presentAnimation(this.listOfHowWeWork[4].animationName)
      }
    })

    var hoverSubscription6 = this._renderer2.listen(this.listOfHowWeWork[5].htmlElement.nativeElement, 'mouseenter', (event) => {
      if(this.selectedAnimation != this.listOfHowWeWork[5].animationName){
        this.presentAnimation(this.listOfHowWeWork[5].animationName)
      }
    })
    this.howWeWorkTitleSubscriptions.push(hoverSubscription1)
    this.howWeWorkTitleSubscriptions.push(hoverSubscription2)
    this.howWeWorkTitleSubscriptions.push(hoverSubscription3)
    this.howWeWorkTitleSubscriptions.push(hoverSubscription4)
    this.howWeWorkTitleSubscriptions.push(hoverSubscription5)
    this.howWeWorkTitleSubscriptions.push(hoverSubscription6)
    
    this.componentFinishedLoading.emit(true)
  }

  presentAnimation(animationName: string) {
    this.selectedAnimation = animationName;
  }
}

@NgModule(
  {
    declarations: [HowWeWorkComponent, LottieAnimationComponent],
    imports: [
      CommonModule, 
      LottieModule.forRoot({ player: playerFactory,
      useCache: true,
      }),
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
  }
)
class HowWeWorkModule{}

export function playerFactory() {
  return import('lottie-web/build/player/lottie_svg');
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}