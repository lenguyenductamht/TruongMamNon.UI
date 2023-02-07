import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuKhamSucKhoeComponent } from './phieu-kham-suc-khoe.component';

describe('PhieuKhamSucKhoeComponent', () => {
  let component: PhieuKhamSucKhoeComponent;
  let fixture: ComponentFixture<PhieuKhamSucKhoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuKhamSucKhoeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuKhamSucKhoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
