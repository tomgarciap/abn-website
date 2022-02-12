import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  query,
  animateChild
} from '@angular/animations';
import {
  DeviceDetectorService
} from 'ngx-device-detector';
import { HttpClient } from '@angular/common/http';

const QUESTION_ANIMATION_TIME = '0.7s';
const OFFSET_AMOUNT_QUESTION_NEXT_ANIMATION_QUESTION = 2;
const SHAPE_ORIGINAL_WIDTH = 30
const SHAPE_FINAL_WIDTH = 8

declare global {
  interface Window {
    dataLayer: any[];
  }
}


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  animations: [
    // QUESTIONS ANIMATIONS
    trigger('questionAnimation', [
      state('questionToShow', style({
        top: "2rem"
      })),
      state('questionShowing', style({
        top: "0"
      })),
      state('questionFilled', style({
        top: "-2rem"
      })),
      transition('questionShowing => questionFilled', [
        animate(QUESTION_ANIMATION_TIME, keyframes([
          style({
            top: ((-1) * (1 / 8) * OFFSET_AMOUNT_QUESTION_NEXT_ANIMATION_QUESTION + "rem"),
            offset: 0.1
          }),
          style({
            top: ((-1) * (2 / 8) * OFFSET_AMOUNT_QUESTION_NEXT_ANIMATION_QUESTION + "rem"),
            offset: 0.15
          }),
          style({
            top: ((-1) * (3 / 8) * OFFSET_AMOUNT_QUESTION_NEXT_ANIMATION_QUESTION + "rem"),
            offset: 0.20
          }),
          style({
            top: ((-1) * (4 / 8) * OFFSET_AMOUNT_QUESTION_NEXT_ANIMATION_QUESTION + "rem"),
            offset: 0.35
          }),
          style({
            top: ((-1) * (5 / 8) * OFFSET_AMOUNT_QUESTION_NEXT_ANIMATION_QUESTION + "rem"),
            offset: 0.40
          }),
          style({
            top: ((-1) * (6 / 8) * OFFSET_AMOUNT_QUESTION_NEXT_ANIMATION_QUESTION + "rem"),
            offset: 0.44
          }),
          style({
            top: ((-1) * (7 / 8) * OFFSET_AMOUNT_QUESTION_NEXT_ANIMATION_QUESTION + "rem"),
            offset: 0.47
          }),
          style({
            top: ((-1) * (8 / 8) * OFFSET_AMOUNT_QUESTION_NEXT_ANIMATION_QUESTION + "rem"),
            offset: 0.48
          }),
        ]))
      ]),
      transition('questionToShow => questionShowing', [
        animate(QUESTION_ANIMATION_TIME)
      ])
    ]),
    // END QUESTIONS ANIMATIONS

    // SEND OUTER FORM ANIMATIONS
    trigger('sendFormOuterAnimation', [
      state('outterShapeShowing', style({

      })),
      state('outterShapeSentMode', style({
        width: SHAPE_FINAL_WIDTH + "rem"
      })),

      transition('outterShapeShowing => outterShapeSentMode', [
        query('@sendFormInnerAnimation', animateChild()),
        animate("0.6s", keyframes([
          style({
            width: SHAPE_FINAL_WIDTH + "rem",
            offset: 1
          })
        ])),
        query('@sentIconDisplay', animateChild()),
      ])
    ]),
    trigger('sendFormInnerAnimation', [
      state('innerContentShowing', style({
        opacity: 1
      })),
      state('innerContentHidden', style({
        opacity: 0
      })),
      transition('innerContentShowing => innerContentHidden', [
        animate("0.6s")
      ]),
    ]),
    trigger('sentIconDisplay', [
      state('sentIconShowing', style({
        opacity: 1
      })),
      state('sentIconHidden', style({
        opacity: 0
      })),
      transition('sentIconHidden => sentIconShowing', [
        animate("0.6s 0.6s")
      ]),
    ])
    // END SEND OUTER FORM ANIMATIONS
  ]
})

export class ContactUsComponent implements OnInit, AfterViewInit {

  CONTACT_ENDPOINT: string = "https://script.google.com/macros/s/AKfycbxldWVSi39-nLgBw5Ik6kkSvIjgdllB7hV2H8pJQT_ponu42YUd37LQsrFRNfFIoOB1sQ/exec"
  formQuestions = [{
    number: 0,
    name: "nombre",
    alreadyFilled: false,
    notShown: false,
    showing: true,
    enteredText: "",
  }, {
    number: 1,
    name: "email",
    alreadyFilled: false,
    notShown: true,
    showing: false,
    enteredText: "",
  }, {
    number: 2,
    name: "empresa",
    alreadyFilled: false,
    notShown: true,
    showing: false,
    enteredText: "",
  }, {
    number: 3,
    name: "inversionMensual",
    alreadyFilled: false,
    notShown: true,
    showing: false,
    enteredText: "",
  }, {
    number: 4,
    name: "comentario",
    alreadyFilled: false,
    notShown: true,
    showing: false,
    enteredText: "",
  }]

  enteredText = "";
  showingInput = true;
  QUESTION_INDEX_WITH_BUTTONS = 3;
  showRequiredFieldMessage = false;
  showRequiredValidEmailMessage = false;

  @ViewChild('formInput')
  formInput: ElementRef
  @ViewChild('contactFormContainer')
  contactFormContainer: ElementRef

  formSent = false;
  isMobile: boolean;
  constructor(private deviceService: DeviceDetectorService,
    private http: HttpClient) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.contactFormContainer.nativeElement.addEventListener('keypress', (e: any) => {
      if (e.key === 'Enter') {
        this.nextQuestion()
      }
    });
  }

  sendContactForm() {
    var urlQueryParamsWithPostValues:string = ""
    for(var i = 0; i < this.formQuestions.length; i ++){
      urlQueryParamsWithPostValues +=  this.formQuestions[i].name + "=" + this.formQuestions[i].enteredText + "&"
    }
    urlQueryParamsWithPostValues = urlQueryParamsWithPostValues.substring(0, urlQueryParamsWithPostValues.length - 1)
    this.formSent = true
    this.http.get(this.CONTACT_ENDPOINT + "?" + urlQueryParamsWithPostValues).subscribe(
      (data) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'formSubmitted',
          'formName': 'contactForm'
        });
      }
    );
  }

  nextQuestion() {
    var questionInShowObject: any = this.getQuestionInShow();
    if (questionInShowObject.number == this.formQuestions.length - 1) {
      // Send form to backend
      this.saveUserInput(questionInShowObject)
      this.cleanUserInput()
      this.sendContactForm()
    } else {
      var nextQuestionOffset = 0
      if (this.isMobile && questionInShowObject.number == 2) {
        nextQuestionOffset = 1
      }
      if (questionInShowObject.number == 3 && this.enteredText == "") {
        return
      }
      if (this.enteredText == "") {
        this.resetValidationMessages()
        this.showRequiredFieldMessage = true;
        return
      }
      if (questionInShowObject.number == 2 && !this.validateEmail(this.enteredText)) {
        this.resetValidationMessages()
        this.showRequiredValidEmailMessage = true;
        return
      }
      var nextQuestionObject = this.formQuestions[questionInShowObject.number + 1 + nextQuestionOffset]
      this.showNextQuestion(nextQuestionObject);
      this.showInputForQuestion(nextQuestionObject);
      this.hideLastQuestion(questionInShowObject);
      this.saveUserInput(questionInShowObject)
      this.cleanUserInput()
      this.resetValidationMessages()
      if (this.showingInput) {
        setTimeout(() => {
          this.formInput.nativeElement.focus();
        }, 200);
      }
    }
  }
  hideLastQuestion(questionInShowObject: any) {
    questionInShowObject.showing = false;
    questionInShowObject.alreadyFilled = true;
  }
  getQuestionInShow() {
    var questionInShow = this.formQuestions.filter(el => el.showing)
    return questionInShow.length != 1 ? null : questionInShow[0];
  }
  saveUserInput(questionInShowObject: any) {
    questionInShowObject.enteredText = this.enteredText;
  }
  cleanUserInput() {
    this.enteredText = "";
  }
  showNextQuestion(nextQuestionObject: any) {
    nextQuestionObject.notShown = false;
    nextQuestionObject.showing = true;
  }
  showInputForQuestion(nextQuestionObject: any) {
    if (nextQuestionObject.number == this.QUESTION_INDEX_WITH_BUTTONS) {
      this.showingInput = false;
    } else {
      this.showingInput = true;
    }
  }
  selectBudgetOption(selectedOption: string) {
    this.enteredText = selectedOption;
    this.nextQuestion();
  }
  resetValidationMessages() {
    this.showRequiredFieldMessage = false;
    this.showRequiredValidEmailMessage = false;
  }
  validateEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
}
