import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit
} from '@angular/core';
import {
  DeviceDetectorService
} from 'ngx-device-detector';
import { CDN } from 'src/app/globals'
import { SwiperModule } from 'swiper/angular';


@Component({
  selector: 'app-continous-slider',
  templateUrl: './continous-slider.component.html',
  styleUrls: ['./continous-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContinousSliderComponent implements OnInit {

  tools = [{
      path: CDN + 'assets/img/tools/tool-1.png',
    },
    {
      path: CDN + 'assets/img/tools/tool-2.png',
    },
    {
      path: CDN + 'assets/img/tools/tool-3.png',
    },
    {
      path: CDN + 'assets/img/tools/tool-4.png',
    },
    {
      path: CDN + 'assets/img/tools/tool-5.png',
    },
    {
      path: CDN + 'assets/img/tools/tool-6.png',
    },
    {
      path: CDN + 'assets/img/tools/tool-7.png',
    },
    {
      path: CDN + 'assets/img/tools/tool-8.png',
    },
    {
      path: CDN + 'assets/img/tools/tool-9.png',
    },
    {
      path: CDN + 'assets/img/tools/tool-10.png',
    }
  ]
  isMobile = false;
  pagination = false
  autoplay = {
    delay: 3000,
    disableOnInteraction: true
  }
  constructor(
    private deviceService: DeviceDetectorService) {
    this.isMobile = this.deviceService.isMobile();
  }
  

  ngOnInit(): void {}
}
@NgModule({
  declarations: [ContinousSliderComponent],
  imports: [SwiperModule, CommonModule],
})

class ContinousSliderModule {}
