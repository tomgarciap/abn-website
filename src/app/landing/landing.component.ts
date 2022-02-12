import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Injector,
  OnDestroy,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import {
  ComponentEventBindingService,
  ContentInitialazationMessage
} from '../app-message-binding';
import {
  AnimationOptions
} from 'ngx-lottie';
import {
  Subscription
} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {
  trigger,
  style,
  transition,
  animate
} from '@angular/animations';

interface LazyComponentToLoad {
  isInit: boolean,
  topFrameViewPosition: number,
  triggeringFunction: Function,
  componentName: string
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(10px)'
        }),
        animate('500ms', style({
          opacity: 1,
          transform: 'translateY(0)'
        })),
      ]),
      transition(':leave', [
        animate('500ms', style({
          opacity: 0,
          transform: 'translateY(10px)'
        })),
      ]),
    ])
  ]
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  _ComponentEventBindingService: ComponentEventBindingService;

  @ViewChild("animationPosition")
  animationPosition: ElementRef
  @ViewChild("howWeWorkPosition")
  howWeWorkPosition: ElementRef
  @ViewChild("howWeWorkContainer", {
    read: ViewContainerRef
  })
  howWeWorkContainer: ViewContainerRef
  @ViewChild("continousSliderContainer", {
    read: ViewContainerRef
  })
  continousSliderContainer: ViewContainerRef;
  @ViewChild("ourTeamPosition")
  ourTeamPosition: ElementRef
  @ViewChild("ourTeamContainer", {
    read: ViewContainerRef
  })
  ourTeamContainer: ViewContainerRef;
  @ViewChild("contactPosition")
  contactPosition: ElementRef
  @ViewChild("ourPartnersPosition")
  ourPartnersPosition: ElementRef
  @ViewChild("ourPartnersContainer", {
    read: ViewContainerRef
  })
  ourPartnersContainer: ViewContainerRef;

  scrollingOptions = {
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  }
  arrowDownAnimationOptions: AnimationOptions;
  navButtonSubscription: Subscription;
  navBottomUIButtonsSubscription: Subscription;
  firstScrollEventSubscription: Subscription;
  yStreamEventSubscription: Subscription;
  showUIButtons = true;
  lazyComponentsToLoadRegister: LazyComponentToLoad[];

  yBottomPosition:number = window.innerHeight;
  windowHeight:number = window.innerHeight;

  constructor(_ComponentEventBindingService: ComponentEventBindingService,
    private cfr: ComponentFactoryResolver,
    private injector: Injector) {
    this._ComponentEventBindingService = _ComponentEventBindingService;
    this.arrowDownAnimationOptions = {
      path: 'assets/animations/down_arrow.json',
    }
  }

  ngOnDestroy(): void {
    this.navButtonSubscription.unsubscribe();
    this.navBottomUIButtonsSubscription.unsubscribe();
    this.yStreamEventSubscription.unsubscribe();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.lazyComponentsToLoadRegister = [
      {
        howWeWork: true,
        isInit: false,
        topFrameViewPosition: this.howWeWorkContainer.element.nativeElement.parentElement.offsetTop,
        triggeringFunction: async () => {
          const {HowWeWorkComponent} = await import("./landing-inner-components/how-we-work/how-we-work.component");
          const howWeWorkFactory = this.cfr.resolveComponentFactory(HowWeWorkComponent);
          this.howWeWorkContainer.createComponent(howWeWorkFactory, undefined, this.injector);
         },
         componentName: "howWeWork",
      },
      {
        ourPartners: true,
        isInit: false,
        topFrameViewPosition: this.ourPartnersContainer.element.nativeElement.parentElement.offsetTop,
        triggeringFunction: async () => {
          const {OurPartnersComponent} = await import("./landing-inner-components/our-partners/our-partners.component");
          const ourPartnersFactory = this.cfr.resolveComponentFactory(OurPartnersComponent);
          this.ourPartnersContainer.createComponent(ourPartnersFactory, undefined, this.injector);
        },
        componentName: "ourPartners",
      },
      {
        ourTeam: true,
        isInit: false,
        topFrameViewPosition: this.ourTeamContainer.element.nativeElement.parentElement.offsetTop,
        triggeringFunction: async () => {
          const {OurTeamComponent} = await import("./landing-inner-components/our-team/our-team.component");
          const OurTeamFactory = this.cfr.resolveComponentFactory(OurTeamComponent);
          this.ourTeamContainer.createComponent(OurTeamFactory, undefined, this.injector);
          const {ContinousSliderComponent} = await import("../landing/continous-slider/continous-slider.component");
          const ContinousSliderFactory = this.cfr.resolveComponentFactory(ContinousSliderComponent);
          this.continousSliderContainer.createComponent(ContinousSliderFactory, undefined, this.injector);
        },
        componentName: "ourTeam",
      }
    ]
    this._ComponentEventBindingService.emitContentInitEvent(new ContentInitialazationMessage("LANDING_OK", 10));
    this.navButtonSubscription = this._ComponentEventBindingService.navButtonClickEvent$.subscribe((scrollTo: string) => {
      this.navTo(scrollTo);
    })
    this.navBottomUIButtonsSubscription = this._ComponentEventBindingService.switchVisibilityUIButtonsEvent$.subscribe(() => {
      this.showUIButtons = !this.showUIButtons;
    });
    this.yStreamEventSubscription = this._ComponentEventBindingService.scrollYBottomStreamEvent$.subscribe((obj:any)=>{
      this.yBottomPosition = obj.yBottomPosition;
      // TODO: Implement scroll velocity calculation, establish threshold velocity and disable this handling.
      var notInitComponents = this.lazyComponentsToLoadRegister.filter((el:any) => !el.isInit);
      for(var i = 0; i < notInitComponents.length; i ++){
        if(this.yBottomPosition  > notInitComponents[i].topFrameViewPosition + (this.windowHeight / 2)){
          notInitComponents[i].triggeringFunction();
          notInitComponents[i].isInit = true;
        }
      }
    });
    setTimeout(()=>{
      var comp = this.getArrayObjectByKey(this.lazyComponentsToLoadRegister, "howWeWork")
      if(comp && !comp.isInit){
        comp.isInit = true;
        comp.triggeringFunction();
      }
      setTimeout(()=>{
        var comp = this.getArrayObjectByKey(this.lazyComponentsToLoadRegister, "ourPartners")
        if(comp && !comp.isInit){
          comp.isInit = true;
          comp.triggeringFunction();
        }
        setTimeout(()=>{
          var comp = this.getArrayObjectByKey(this.lazyComponentsToLoadRegister, "ourTeam")
          if(comp && !comp.isInit){
            comp.isInit = true;
            comp.triggeringFunction();
          }
        }, 1000)
      }, 1000)
    }, 300)
  }

  getArrayObjectByKey(arr:Array<any>, key:string) {
     return (arr.find(x => Object.keys(x)[0] === key) || {});
  }

  scrollToElementPosition(elementPosition: ElementRef, viewAdjuster = 0){
    window.scrollTo({
      top: elementPosition.nativeElement.offsetTop + viewAdjuster,
      left: 0,
      behavior: 'smooth'
    });
  }

  scrollToTop(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  goToNextComponent(){
    var closestBottomFrameComponent = "contact";
    var closestBottomFrameComponentMinPositiveDistance;
    for(var i = 0; i < this.lazyComponentsToLoadRegister.length; i ++){
      var bottomFramePosition = this.lazyComponentsToLoadRegister[i].topFrameViewPosition + this.windowHeight;
      var distanceFromYBottomToBottomFrame = bottomFramePosition - this.yBottomPosition;
      if(distanceFromYBottomToBottomFrame > 0){
        console.log("Y bottom view value", this.yBottomPosition)
        console.log("Component name", this.lazyComponentsToLoadRegister[i].componentName)
        console.log("Distance from y bottom to component bottom", distanceFromYBottomToBottomFrame)
        if(closestBottomFrameComponentMinPositiveDistance == undefined){
          closestBottomFrameComponentMinPositiveDistance = distanceFromYBottomToBottomFrame
          closestBottomFrameComponent = this.lazyComponentsToLoadRegister[i].componentName
        } else if (distanceFromYBottomToBottomFrame < closestBottomFrameComponentMinPositiveDistance) {
          closestBottomFrameComponentMinPositiveDistance = distanceFromYBottomToBottomFrame
          closestBottomFrameComponent = this.lazyComponentsToLoadRegister[i].componentName
        }
      }
    }
    this.navTo(closestBottomFrameComponent);
  }
  
  navTo(scrollTo: string) {
    if (scrollTo == "howWeWork") {
      var comp = this.getArrayObjectByKey(this.lazyComponentsToLoadRegister, "howWeWork")
      if(comp && !comp.isInit){
        comp.isInit = true;
        comp.triggeringFunction();
      }
      this.scrollToElementPosition(this.howWeWorkPosition, 50);
    } else if (scrollTo == "ourTeam") {
      var comp = this.getArrayObjectByKey(this.lazyComponentsToLoadRegister, "ourTeam");
      if(comp && !comp.isInit){
        comp.isInit = true;
        comp.triggeringFunction();
      }
      this.scrollToElementPosition(this.ourTeamPosition, 50);
    } else if (scrollTo == "contact") {
      this.scrollToElementPosition(this.contactPosition);
    } else if (scrollTo == "ourPartners") {
      var comp = this.getArrayObjectByKey(this.lazyComponentsToLoadRegister, "ourPartners")
      if(comp && !comp.isInit){
        comp.isInit = true;
        comp.triggeringFunction();
      }
      this.scrollToElementPosition(this.ourPartnersPosition);
    } else if (scrollTo == "animation") {
      this.scrollToElementPosition(this.animationPosition);
    } else if (scrollTo == "top") {
      this.scrollToTop();
    }
  }

  openLinkInNewTab(platformToOpen: string) {
    var linkToOpen;
    if (platformToOpen == "instagram") {
      linkToOpen = "https://www.instagram.com/abndigital/"
    } else if (platformToOpen == "linked_in") {
      linkToOpen = "https://www.linkedin.com/company/68662985"
    } else {
      linkToOpen = "https://www.google.com/partners/agency?id=1312938906"
    }
    window.open(linkToOpen, '_blank')
  }
}
