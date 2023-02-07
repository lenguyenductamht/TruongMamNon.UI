import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotUongVitaminComponent } from './dot-uong-vitamin.component';

describe('DotUongVitaminComponent', () => {
  let component: DotUongVitaminComponent;
  let fixture: ComponentFixture<DotUongVitaminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotUongVitaminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotUongVitaminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
