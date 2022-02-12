import {
  Component,
  OnInit
} from '@angular/core';
import {
  ComponentEventBindingService
} from '../app-message-binding'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  _ComponentEventBindingService: ComponentEventBindingService;
  constructor(_ComponentEventBindingService: ComponentEventBindingService) {
    this._ComponentEventBindingService = _ComponentEventBindingService;
  }

  navigateTo(scrollTo:string) {
    this._ComponentEventBindingService.emitNavClickButtonEvent(scrollTo);
  }

  ngOnInit(): void {}
  switchNavigationMenu(){
    this._ComponentEventBindingService.emitNavMobileButtonClickEvent("show")
  }
}
