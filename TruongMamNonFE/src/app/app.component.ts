import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DataService } from './services/data.service';
import { NienHoc } from './models/nien-hoc.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TruongMamNonFE';
  constructor() {}
  ngOnInit(): void {}
}
