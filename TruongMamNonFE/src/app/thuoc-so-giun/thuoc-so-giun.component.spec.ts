import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuocSoGiunComponent } from './thuoc-so-giun.component';

describe('ThuocSoGiunComponent', () => {
  let component: ThuocSoGiunComponent;
  let fixture: ComponentFixture<ThuocSoGiunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThuocSoGiunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThuocSoGiunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
