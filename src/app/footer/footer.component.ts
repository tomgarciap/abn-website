import { Component, OnInit } from '@angular/core';
import { ComponentEventBindingService } from '../app-message-binding';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', '../app.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private _ComponentBindingService :ComponentEventBindingService) { }

  ngOnInit(): void {
  }

  openLinkInNewTab(platformToOpen:string){
    var linkToOpen;
    if(platformToOpen == "instagram"){
      linkToOpen = "https://www.instagram.com/abndigital/"
    } else if(platformToOpen == "linked_in"){
      linkToOpen = "https://www.linkedin.com/company/68662985"
    } else {
      linkToOpen = "https://www.google.com/partners/agency?id=1312938906"
    }
    window.open(linkToOpen, '_blank')
  }

  abnLogoClick(){
    this._ComponentBindingService.emitNavClickButtonEvent("top")
  }


}
