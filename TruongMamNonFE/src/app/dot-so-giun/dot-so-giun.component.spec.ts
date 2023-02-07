import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotSoGiunComponent } from './dot-so-giun.component';

describe('DotSoGiunComponent', () => {
  let component: DotSoGiunComponent;
  let fixture: ComponentFixture<DotSoGiunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotSoGiunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotSoGiunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
