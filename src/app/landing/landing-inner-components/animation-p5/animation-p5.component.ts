import {
  AfterViewInit,
  Component,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import p5 from 'p5'

import {
  ComponentEventBindingService,
  ContentInitialazationMessage
} from '../../../app-message-binding';
@Component({
  selector: 'app-animation-p5',
  templateUrl: './animation-p5.component.html',
  styleUrls: ['./animation-p5.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimationP5Component implements OnInit, AfterViewInit {

  @ViewChild('animationBinding')
  animationBinding: ElementRef;
  ComponentEventBindingService: ComponentEventBindingService;
  ANIMATION_HEX_BACKGROUND: string = "#1B1837";
  animation1 = (s: any) => {
    const FRAME_RATE = 60;
    const CIRCLE_COLOR_MINUS_TRANSP = 'rgba(97,192,189,';
    // JOIN_LINE_COLOR ORIGINAL = rgba(97,192,189,0.2)
    const JOIN_LINE_COLOR = 'rgba(97,192,189,0.25)'
    const JOIN_MOUSE_LINE_COLOR = 'rgba(97,192,189,0.6)';
    var ANIMATION_TIME: any
    if (s.windowWidth < 600) {
      ANIMATION_TIME = 10;
    } else {
      ANIMATION_TIME = 6;
    }
    class Particle {
      HAS_ALL_FIXED_VELCOTIES = false;
      HAS_RANDOM_AND_FIXED_VELCOTIES = true;
      SPEED_MUTLIPLIER = 0.17;

      // setting the co-ordinates, radius and the
      // speed of a particle in both the co-ordinates axes.
      x: any;
      y: any;
      r: any;
      xSpeed: any;
      ySpeed: any;
      constructor() {
        this.x = s.random(0, s.width);
        this.y = s.random(0, s.height);
        this.r = s.random(1, 3) * PARTICLE_SIZE_MULTIPLIER
        if (this.HAS_ALL_FIXED_VELCOTIES) {
          this.xSpeed = 5 * this.SPEED_MUTLIPLIER
          this.ySpeed = 5 * this.SPEED_MUTLIPLIER
        } else if (this.HAS_RANDOM_AND_FIXED_VELCOTIES) {
          if (s.random(0, 1) > 0.1) {
            this.xSpeed = s.random(-2, 1) * this.SPEED_MUTLIPLIER;
            this.ySpeed = s.random(-1, 3) * this.SPEED_MUTLIPLIER;
          } else {
            this.xSpeed = 5 * this.SPEED_MUTLIPLIER
            this.ySpeed = 5 * this.SPEED_MUTLIPLIER
          }
        } else {
          this.xSpeed = s.random(-2, 1) * this.SPEED_MUTLIPLIER;
          this.ySpeed = s.random(-1, 3) * this.SPEED_MUTLIPLIER;
        }
      }

      // creation of a particle.
      createParticle(color: any) {
        s.noStroke();
        s.fill(color);
        s.circle(this.x, this.y, this.r);
        //ellipse(this.x,this.y,this.r, 10)
      }

      // setting the particle in motion.
      moveParticle() {
        if (this.x < 0 || this.x > s.width)
          this.xSpeed *= -1;
        if (this.y < 0 || this.y > s.height)
          this.ySpeed *= -1;
        this.x += this.xSpeed;
        this.y += this.ySpeed;
      }

      invertVelocity() {
        this.xSpeed *= -1;
        this.ySpeed *= -1;
      }

      // this function creates the connections(lines)
      // between particles which are less than a certain distance apart
      joinParticles(particles: Array < Particle > ) {
        var len = particles.length
        var i = 0
        while (i < len) {
          var a = particles[i].x - this.x;
          var b = particles[i].y - this.y;
          var c = Math.sqrt(a * a + b * b);
          if (c < 150) {
            s.stroke(JOIN_LINE_COLOR);
            s.line(this.x, this.y, particles[i].x, particles[i].y);
          }
          i++
        }
      }
    }

    // 200 particulas para width 1920. 50 particular para width 600 o menos
    const PARTICLE_NUMBER_MOBILE = 50;
    var M = (5 / 44)
    var B = -(200 / 11)
    var PARTICLE_NUMBER = Math.ceil(Math.max(M * s.windowWidth + B, PARTICLE_NUMBER_MOBILE));
    const isMobile = s.windowWidth < 600;
    const LINES = false
    const PARTICLE_SIZE_MULTIPLIER = 1.8;
    const VELOCITY_INVERSIONS = true;
    const INVERSIONS_AMOUNT = 1
    var TIMES_INVERTED = 0
    //an array to add multiple particles
    s.preload = () => {
      s.particles = []
    }

    s.setup = () => {
      var offset = (-1) * s.windowWidth * 0.013
      var canv = s.createCanvas(s.windowWidth + offset, s.windowHeight);
      if (LINES) {
        s.background(this.ANIMATION_HEX_BACKGROUND);
      }
      var particlesToPush = PARTICLE_NUMBER
      s.frameRate(FRAME_RATE)
      for (let i = 0; i < particlesToPush; i++) {
        s.particles.push(new Particle());
      }
    };

    s.draw = () => {
     s.background(this.ANIMATION_HEX_BACKGROUND);
     var i = 0,
     len = s.particles.length
     while (i < len) {
       s.particles[i].createParticle(CIRCLE_COLOR_MINUS_TRANSP + "0.2" + ')');
       s.particles[i].moveParticle();
       s.particles[i].joinParticles(s.particles.slice(i));
        var a = s.particles[i].x - s.mouseX;
        var b = s.particles[i].y - s.mouseY;
        var mouseDistance = Math.sqrt(a * a + b * b);
        if (mouseDistance < 100) {
          s.stroke(JOIN_MOUSE_LINE_COLOR);
          s.line(s.particles[i].x, s.particles[i].y, s.mouseX, s.mouseY);
        }
        i++
      }
    };
  }

  constructor(_ComponentEventBindingService: ComponentEventBindingService,
    changeDetector: ChangeDetectorRef) {
    this.ComponentEventBindingService = _ComponentEventBindingService
    //changeDetector.detach()
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    var animationLoading:any = new p5(this.animation1, this.animationBinding.nativeElement);
    var LOOP_COUNT = 0
    var interval = setInterval(()=>{
      if(animationLoading._setupDone){
        this.ComponentEventBindingService.emitContentInitEvent(new ContentInitialazationMessage("ANIMATION_P5_OK", 10))
        clearInterval(interval)
      }
      LOOP_COUNT += 1
    }, 50)
  }
}
