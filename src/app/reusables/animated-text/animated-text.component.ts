import {
  AfterViewInit, Component, ComponentFactory, ComponentFactoryResolver, ElementRef, EventEmitter, Input, OnInit, Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-animated-text',
  templateUrl: './animated-text.component.html',
  styleUrls: ['./animated-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AnimatedTextComponent implements OnInit, AfterViewInit {

  @Input() text;
  @Input() animation;
  @Input() initialClass;
  @Input() timeDelay;
  @Input() eventStarter;
  @Output() startAnimation = new EventEmitter<string>();
  @Output() endAnimation = new EventEmitter<string>();
  @ViewChild('textContainer') textContainer:ElementRef;
  interval;
  actualChild: number;


  constructor() {
    this.animation = this.animation ? this.animation : 'fade-in';
    this.timeDelay = this.timeDelay ? this.timeDelay : 50;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void{
    this.setEnviroment();
  }

  setEnviroment(){
    this.separateText();
    this.eventStarter ? this.eventStarter.subscribe( () => {this.triggerAnimation()}) : this.triggerAnimation();
  }

  triggerAnimation(){
    this.startAnimation.emit('started');
    this.actualChild = 0;
    this.interval = setInterval(() => {this.nextSpan()},this.timeDelay);
  }

  nextSpan(){
    let children = this.textContainer.nativeElement.children;
    children[this.actualChild].classList.remove('initial-' + this.animation);
    children[this.actualChild].classList.add(this.animation);
    this.actualChild+=1;
    if(this.actualChild == children.length){
      clearInterval(this.interval);
      this.endAnimation.emit('ended');
    }
  }

  separateText(){
    let textArray = this.text.split('');
    textArray.forEach( el => {
      this.textContainer.nativeElement.insertAdjacentHTML(
        'beforeend',
        el != ' ' ? '<span class=" text initial-' + this.animation + '">' + el + '</span>' : '<span> </span>'
      );
    })
  }


}
