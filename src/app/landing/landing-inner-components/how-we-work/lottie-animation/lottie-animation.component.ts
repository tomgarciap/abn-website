import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-lottie-animation',
  templateUrl: './lottie-animation.component.html',
  styleUrls: ['./lottie-animation.component.scss']
})
export class LottieAnimationComponent implements OnInit {
  @Input("animOptions") animOptions: any;
  @Input("width") width: string;

  showLottie = true;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
  }
}
