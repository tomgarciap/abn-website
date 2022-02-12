import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class ContentInitialazationMessage {
    content: String;
    yPosition: Number;
    constructor(content: String, yPosition: Number){
        this.content = content
        this.yPosition = yPosition
    }
}
export class ComponentEventBindingService {
    private contentInitialazationEventSource = new Subject<ContentInitialazationMessage>();
    contentInitialazationEvent$ = this.contentInitialazationEventSource.asObservable();

    private needleMovementEventSource = new Subject<Object>();
    needleMovementEvent$ = this.needleMovementEventSource.asObservable();

    private navButtonClickEventSource = new Subject<string>();
    navButtonClickEvent$ = this.navButtonClickEventSource.asObservable();

    private navMobileButtonClickSource = new Subject<string>();
    navMobileButtonClickEvent$ = this.navMobileButtonClickSource.asObservable();

    private howWeWorkElementYPositionReportingSource = new Subject<Object>();
    howWeWorkElementYPositionReportingEvent$ = this.howWeWorkElementYPositionReportingSource.asObservable();

    private switchVisibilityUIButtonsSource = new Subject<any>();
    switchVisibilityUIButtonsEvent$ = this.switchVisibilityUIButtonsSource.asObservable();

    private partnerModalSource = new Subject<any>();
    partnerModalEvent$ = this.partnerModalSource.asObservable();

    private firstScrollSource = new Subject();
    firstScrollEvent$ = this.firstScrollSource.asObservable();

    private scrollYBottomStreamSource = new Subject();
    scrollYBottomStreamEvent$ = this.scrollYBottomStreamSource.asObservable();

    emitContentInitEvent(change: ContentInitialazationMessage) {
        this.contentInitialazationEventSource.next(change);
    }
    emitNeedleMovementEvent(yTopWindowPosition:any, yMaxPosition:any){
        this.needleMovementEventSource.next({
            "yTopWindowPos": yTopWindowPosition,
            "yMaxPos": yMaxPosition
        });
    }
    emitNavClickButtonEvent(scrollTo:string){
        this.navButtonClickEventSource.next(scrollTo);
    }
    emitNavMobileButtonClickEvent(action:string){
        this.navMobileButtonClickSource.next(action);
    }
    emitHowWeWorkYPositionReportEvent(elementPosition:any){
        this.howWeWorkElementYPositionReportingSource.next(elementPosition)
    }
    emitFirstScrollEvent(){
        this.firstScrollSource.next()
    }
    emitSwitchVisibilityUIButtonsEvent(){
        this.switchVisibilityUIButtonsSource.next()
    }
    emitPartnerModalEvent(modalData:any){
        this.partnerModalSource.next(modalData)
    }
    emitScrollYBottomStreamEvent(yBottomPosition:any, windowHeight:any){
        this.scrollYBottomStreamSource.next({"yBottomPosition": yBottomPosition,
        "windowHeight":windowHeight});
    }
}