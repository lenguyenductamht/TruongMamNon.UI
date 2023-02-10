import { Component, OnInit } from '@angular/core';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private menuBarComponent: MenuBarComponent) {}

  ngOnInit(): void {
    this.menuBarComponent.ngOnInit();
  }
}
