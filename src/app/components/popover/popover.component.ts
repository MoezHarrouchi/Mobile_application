import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input('description') description; 

  constructor() { }

  ngOnInit() {}

}
