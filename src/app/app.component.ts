import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  Renderer2,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart
} from '@angular/router';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  ComponentEventBindingService
} from './app-message-binding';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild,
  AnimationEvent
} from '@angular/animations';
import {
  Subscription
} from 'rxjs';
import SwiperCore, {
  Pagination,
  Navigation,
  Autoplay,
  FreeMode
} from "swiper";
// install Swiper modules
SwiperCore.use([Pagination, Autoplay, Navigation, FreeMode]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('finishLoading', [
      state('closed-telon', style({
        height: '0',
      })),
      state('opened-telon', style({})),
      transition('opened-telon => closed-telon', [
        query('@spinnerAnimation', animateChild()),
        animate('0.7s 10ms ease-out'),
      ]),
    ]),
    trigger('spinnerAnimation', [
      state('no-show', style({
        opacity: 0,
      })),
      state('show', style({})),
      transition('* <=> *', [
        animate('0.5s 100ms ease-out'),
      ]),
    ]),
    trigger('presentMobileMenu', [
      state('mobileMenuShowing', style({
        opacity: 1
      })),
      state('mobileMenuNotShowing', style({
        opacity: 0
      })),
      transition('mobileMenuShowing <=>  mobileMenuNotShowing', [
        animate("0.2s")
      ])
    ])
  ]
})



export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  DEFAULT_LANGUAGE = 'es';
  title = 'ABN Digital';
  websiteReady: boolean = false;
  listener: any;
  contentInitialazationSubscription: Subscription;
  navMobileButtonEventSubcription: Subscription;
  yPositionEventSubscription: Subscription;
  routerSubscription: Subscription;
  ourPartnersModalSubscription: Subscription;
  showMobileNavMenu = false;
  firstRecordedScroll = true;
  showPartnersModal = false;
  partnersModalData: any;
  websiteNotReadyAndAnimationNotFinished = false;

  @ViewChild('loadingElement')
  loadingElement: ElementRef
  UIButtonsShowing = true;
  constructor(private _router: Router,
    private _ngZone: NgZone,
    private _renderer: Renderer2,
    private _componentBindingService: ComponentEventBindingService,
    private translate: TranslateService) {
    translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    let selectedLanguage = localStorage.getItem("language");
    if (selectedLanguage == null) {
      translate.use(this.DEFAULT_LANGUAGE);
    } else {
      translate.use(selectedLanguage);
    }
  }
  closeMobileMenu() {
    this.showMobileNavMenu = false;
  }
  closeOurPartnersModal() {
    this.showPartnersModal = false;
  }
  ngOnInit() {
    const windowHeight = window.innerHeight;
    const handleUiButtonsVisibility = (yBottomPosition: any, yMaxPosition: any) => {
      if (this.UIButtonsShowing && yBottomPosition > 0.9 * yMaxPosition) {
        this.UIButtonsShowing = false;
        this._componentBindingService.emitSwitchVisibilityUIButtonsEvent()

      } else if (!this.UIButtonsShowing && yBottomPosition < 0.9 * yMaxPosition) {
        this.UIButtonsShowing = true;
        this._componentBindingService.emitSwitchVisibilityUIButtonsEvent()
      }
    }

    const handleLazyComponentLoadingStrategy = (yBottomPosition:any)=>{
      this._componentBindingService.emitScrollYBottomStreamEvent(yBottomPosition, windowHeight)
    }
    
    // child + parent init binder
    this.contentInitialazationSubscription = this._componentBindingService.contentInitialazationEvent$
      .subscribe((ev) => {
        if (ev.content == "ANIMATION_P5_OK") {
          this.websiteReady = true;
        }
    });
    this.listener = this._renderer.listen('window', 'scroll', (e) => {
      if (this.firstRecordedScroll) {
        this.firstRecordedScroll = false;
        this._componentBindingService.emitFirstScrollEvent()
      }
      var yTopWindowPosition = this.getYTopWindowFramePosition(e)
      var yMaxPosition = this.getScrollHeight()
      var yBottomPosition = window.innerHeight + yTopWindowPosition
      handleUiButtonsVisibility(yBottomPosition, yMaxPosition);
      this._componentBindingService.emitNeedleMovementEvent(yTopWindowPosition, yMaxPosition);
      handleLazyComponentLoadingStrategy(yBottomPosition);
    })
    this.navMobileButtonEventSubcription = this._componentBindingService.navMobileButtonClickEvent$
      .subscribe((action) => {
        if (action == "show") {
          this.showMobileNavMenu = true;
        }
    });
    this.ourPartnersModalSubscription = this._componentBindingService.partnerModalEvent$.subscribe((data) => {
      this.partnersModalData = data;
      this.showPartnersModal = true;
    })
    // ng zone component removal
    this.routerSubscription = this._router.events.subscribe((ev: RouterEvent) => {
      if (ev instanceof NavigationStart) {
        this._ngZone.runOutsideAngular(() => {
          this._renderer.setStyle(
            this.loadingElement.nativeElement,
            'opacity',
            '1'
          )
        })
      }
    })
  }
  finishLoadingDoneEvent(event: AnimationEvent) {
    if (this.websiteReady) {
      this.websiteNotReadyAndAnimationNotFinished = true;
    }
  }
  ngAfterViewInit(): void {

  }
  navigateTo(scrollTo: string) {
    this.closeMobileMenu()
    this._componentBindingService.emitNavClickButtonEvent(scrollTo);
  }

  getYTopWindowFramePosition(e: any): number {
    return e.target.scrollingElement.scrollTop;
  }

  getYBottomWindowFramePosition(e: any): number {
    return e.target.scrollingElement.scrollBottom;
  }

  ngOnDestroy(): void {
    this.listener();
    this.routerSubscription.unsubscribe();
    this.yPositionEventSubscription.unsubscribe();
    this.contentInitialazationSubscription.unsubscribe()
    this.navMobileButtonEventSubcription.unsubscribe();
    this.ourPartnersModalSubscription.unsubscribe()
  }

  getScrollHeight(): number {
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
  }
}
