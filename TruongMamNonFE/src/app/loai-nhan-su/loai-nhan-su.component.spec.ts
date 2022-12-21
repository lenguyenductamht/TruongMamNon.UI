import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiNhanSuComponent } from './loai-nhan-su.component';

describe('LoaiNhanSuComponent', () => {
  let component: LoaiNhanSuComponent;
  let fixture: ComponentFixture<LoaiNhanSuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaiNhanSuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaiNhanSuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
