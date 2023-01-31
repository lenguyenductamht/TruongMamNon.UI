import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThucPhamComponent } from './thuc-pham.component';

describe('ThucPhamComponent', () => {
  let component: ThucPhamComponent;
  let fixture: ComponentFixture<ThucPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThucPhamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThucPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
