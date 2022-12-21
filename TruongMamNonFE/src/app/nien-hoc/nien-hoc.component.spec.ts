import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NienHocComponent } from './nien-hoc.component';

describe('NienHocComponent', () => {
  let component: NienHocComponent;
  let fixture: ComponentFixture<NienHocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NienHocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NienHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
