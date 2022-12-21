import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanSuComponent } from './nhan-su.component';

describe('NhanSuComponent', () => {
  let component: NhanSuComponent;
  let fixture: ComponentFixture<NhanSuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhanSuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NhanSuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
