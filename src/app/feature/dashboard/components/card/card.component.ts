import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() imagen: string = '';
  @Input() Titulo: string;
  @Input() Fecha: string;
  @Input() class: string = '';
  @Input() TraeFecha: boolean;
  @Input() edit: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
