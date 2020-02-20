import {Component, EventEmitter, OnInit, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-test-module',
  templateUrl: './test-module.component.html',
  styleUrls: ['./test-module.component.scss']
})
export class TestModuleComponent implements OnInit {

  options = 'animatedText';
  public myOutput = new EventEmitter<string>();

  constructor() {
  }

  handleClickTextAnimation(e){
    this.myOutput.emit('eventoButton');
  }

  ngOnInit(): void {
  }

}
