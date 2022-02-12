import { Component, OnInit, 
  OnDestroy, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentEventBindingService } from '../app-message-binding';
@Component({
  selector: 'app-section-slider',
  templateUrl: './section-slider.component.html',
  styleUrls: ['./section-slider.component.scss']
})
export class SectionSliderComponent implements OnInit, OnDestroy {
 
  @ViewChild('needleElement')
  needleElement: ElementRef
  needleMovementSubscription: Subscription;
  constructor(private _componentBindingService: ComponentEventBindingService,
    private _renderer: Renderer2) { }

  ngOnInit(): void {
    this.needleMovementSubscription = this._componentBindingService.needleMovementEvent$
    .subscribe((yPositionsObject:any)=>{
      var yTopWindowPos = parseInt(yPositionsObject["yTopWindowPos"])
      var maxYSize = parseInt(yPositionsObject["yMaxPos"])
      var coveredContentPercentage = (yTopWindowPos / (maxYSize - window.innerHeight))* 100 
      if(coveredContentPercentage >= 98){
        coveredContentPercentage = 100
      }      
      this._renderer.setStyle(this.needleElement.nativeElement, "height", coveredContentPercentage + "%");
    })
  }

  ngOnDestroy(){
    this.needleMovementSubscription.unsubscribe()
  }

}
