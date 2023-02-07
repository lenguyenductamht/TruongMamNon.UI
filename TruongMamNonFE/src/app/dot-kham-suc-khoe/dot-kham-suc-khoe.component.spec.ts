import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotKhamSucKhoeComponent } from './dot-kham-suc-khoe.component';

describe('DotKhamSucKhoeComponent', () => {
  let component: DotKhamSucKhoeComponent;
  let fixture: ComponentFixture<DotKhamSucKhoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotKhamSucKhoeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotKhamSucKhoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
