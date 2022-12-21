import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucThucDonComponent } from './danh-muc-thuc-don.component';

describe('DanhMucThucDonComponent', () => {
  let component: DanhMucThucDonComponent;
  let fixture: ComponentFixture<DanhMucThucDonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DanhMucThucDonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DanhMucThucDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
