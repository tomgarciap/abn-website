import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  NgModule
} from '@angular/core';
import { CDN } from 'src/app/globals';
import { SwiperModule } from 'swiper/angular';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { fadeSlideInOutAnimation } from '../../../animations';
@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss', '../../../app.component.scss'],
  animations: [
    fadeSlideInOutAnimation
  ]
})
// TODO: Mejorar el metodo de hover en este componente
export class OurTeamComponent implements OnInit, AfterViewInit, OnDestroy {
  
  teamRowOneList = [{
      "name": "Tom",
      "image": CDN + "assets/img/our-team/tom.jpg",
      "description": "Reporting and automation developer. Ninja coder. Partner",
      "bottomTransparency": 30,
      "inHover": false,
      "links": [{
          "icon": "linked_in",
          "link": "https://www.linkedin.com/in/tom%C3%A1s-garc%C3%ADa-pi%C3%B1eiro-1a43a5136/"
        },
        {
          "icon": "github",
          "link": "https://github.com/tomgarciap"
        }
      ]
    },
    {
      "name": "Martina",
      "image": CDN + "assets/img/our-team/martina.jpg",
      "description": "Team Leader. Operations. Founder",
      "bottomTransparency": 15,
      "inHover": false,
      "links": [{
          "icon": "linked_in",
          "link": "https://www.linkedin.com/in/martina-abritta-216124101/"
        },
        {
          "icon": "facebook",
          "link": "https://www.facebook.com/business/success/idat"
        }
      ]
    }, {
      "name": "Sebastian",
      "image": CDN + "assets/img/our-team/sebastian.jpg",
      "description": "Team Leader. Commercial. Founder",
      "bottomTransparency": 15,
      "inHover": false,
      "links": [{
          "icon": "linked_in",
          "link": "https://www.linkedin.com/in/sebastian-nofal-8b9042117/"
        },
        {
          "icon": "facebook",
          "link": "https://www.facebook.com/business/success/homecenter?locale=es_LA"
        }
      ]
    }, {
      "name": "Juan Pablo",
      "image": CDN + "assets/img/our-team/juan_pablo.jpg",
      "description": "Team Leader. Tech Product Creator. Partner",
      "bottomTransparency": 25,
      "inHover": false,
      "links": [{
          "icon": "linked_in",
          "link": "https://www.linkedin.com/in/juan-pablo-brea-971aa313a/"
        }
      ]
    }
  ];
  teamRowTwoList = [{
      "name": "Agustín",
      "image": CDN + "assets/img/our-team/agustin.jpg",
      "description": "Team Leader. Finance. Founder",
      "bottomTransparency": 15,
      "inHover": false,
      "links": [{
          "icon": "linked_in",
          "link": "https://www.linkedin.com/in/agustinbrea/"
        }
      ]
    }, {
      "name": "Aylen",
      "image": CDN + "assets/img/our-team/aylen.jpg",
      "description": "Account Manager. Junior Coder.",
      "bottomTransparency": 15,
      "inHover": false,
      "links": [{
          "icon": "linked_in",
          "link": "https://www.linkedin.com/in/aylengalandrini/"
        }
      ]
    },
    {
      "name": "Tiziano",
      "image": CDN + "assets/img/our-team/tiziano.jpg",
      "description": "Account Strategist. Junior Coder.",
      "bottomTransparency": 15,
      "inHover": false,
      "links": [{
          "icon": "sittio",
          "link": "https://sitt.io/tiziano-corvo-dolcet"
        }
      ]
    }, {
      "name": "Rocío",
      "image": CDN + "assets/img/our-team/rocio.jpg",
      "description": "Account Strategist. Junior Coder.",
      "bottomTransparency": 15,
      "inHover": false,
      "links": [{
          "icon": "linked_in",
          "link": "https://www.linkedin.com/in/roc%C3%ADo-florencia-villa/"
        },
        {
          "icon": "google",
          "link": "https://skillshop.exceedlms.com/profiles/ad8e5409e9ef493cae903146da5c917d"
        }
      ]
    }, {
      "name": "Luján",
      "image": CDN + "assets/img/our-team/lujan.jpg",
      "description": "Account Strategist. Junior Coder.",
      "bottomTransparency": 15,
      "inHover": false,
      "links": [{
          "icon": "linked_in",
          "link": "https://www.linkedin.com/in/lujan-castellani-59b12a182/"
        }
      ]
    }
  ];
  pagination1 = {
    clickable: true
  };
  pagination2 = {
    clickable: true
  };
  autoplay1 = {
    delay: 3000,
    disableOnInteraction: true
  }
  autoplay2 = {
    delay: 3500,
    disableOnInteraction: true
  }
  listernersCreated:any = [];
  @ViewChild('rowOneTeam') rowOneTeam: ElementRef;;
  @ViewChild('rowTwoTeam') rowTwoTeam: ElementRef;;
  constructor(private _renderer: Renderer2) {
    this.teamRowOneList = this.shuffle(this.teamRowOneList);
    this.teamRowTwoList = this.shuffle(this.teamRowTwoList);
  }

  ngOnInit(): void {

  }

  shuffle(array: any[]) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  
  ngAfterViewInit(): void {
    // Row one hover bindings
    var zeroPositionRowOne = this.rowOneTeam.nativeElement;
    this.listernersCreated.push(this._renderer.listen(zeroPositionRowOne, 'mouseenter', (ev)=>{
      this.mouseEnterEvent(ev, "rowOne")
    }))
    this.listernersCreated.push(this._renderer.listen(zeroPositionRowOne, 'mouseleave', (ev)=>{
      this.mouseLeaveEvent(ev, "rowOne")
    }))
    var previousSilbing = this.rowOneTeam.nativeElement.nextSibling;
    for (var i = 1; i < this.teamRowOneList.length; i++) {
      this.listernersCreated.push(this._renderer.listen(previousSilbing, 'mouseenter', (ev)=>{
        this.mouseEnterEvent(ev, "rowOne")
      }))
      this.listernersCreated.push(this._renderer.listen(previousSilbing, 'mouseleave', (ev)=>{
        this.mouseLeaveEvent(ev, "rowOne")
      }))
      previousSilbing = previousSilbing.nextSibling
    }

    // Row two hover bindings
    var zeroPositionrowTwo = this.rowTwoTeam.nativeElement;
    this.listernersCreated.push(this._renderer.listen(zeroPositionrowTwo, 'mouseenter', (ev)=>{
      this.mouseEnterEvent(ev, "rowTwo")
    }))
    this.listernersCreated.push(this._renderer.listen(zeroPositionrowTwo, 'mouseleave', (ev)=>{
      this.mouseLeaveEvent(ev, "rowTwo")
    }))
    var previousSilbing = this.rowTwoTeam.nativeElement.nextSibling;
    for (var i = 1; i < this.teamRowTwoList.length; i++) {
      this.listernersCreated.push(this._renderer.listen(previousSilbing, 'mouseenter', (ev)=>{
        this.mouseEnterEvent(ev, "rowTwo")
      }))
      this.listernersCreated.push(this._renderer.listen(previousSilbing, 'mouseleave', (ev)=>{
        this.mouseLeaveEvent(ev, "rowTwo")
      }))
      previousSilbing = previousSilbing.nextSibling
    }
  }

  mouseEnterEvent(event: any, row: String) {
    var teamMemberElemId: String = event.target.id
    var memberIndex = parseInt(teamMemberElemId.replace("teamMember", ""))
    if (row == "rowOne") {
      this.teamRowOneList[memberIndex].inHover = true
    } else if (row == "rowTwo"){
      this.teamRowTwoList[memberIndex].inHover = true
    } else {
      console.log("ERROR")
    }
  }

  mouseLeaveEvent(event: any, row: String) {
    var teamMemberElemId: String = event.target.id
    var memberIndex = parseInt(teamMemberElemId.replace("teamMember", ""))
    if (row == "rowOne") {
      this.teamRowOneList[memberIndex].inHover = false
    } else if (row == "rowTwo"){
      this.teamRowTwoList[memberIndex].inHover = false
    } else {
      console.log("ERROR")
    }
  }

  openLinkInNewTab(linkToOpen: string) {
    window.open(linkToOpen, '_blank')
  }

  ngOnDestroy(): void {
      for(var i = 0; i < this.listernersCreated.length; i++){
        this.listernersCreated[i]();
      }
  }
}

@NgModule({
  declarations: [
    OurTeamComponent
  ],
  imports:[
    SwiperModule,
    CommonModule,
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
class OurTeamModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}