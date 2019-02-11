import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersetupComponent } from './customersetup.component';

describe('CustomersetupComponent', () => {
  let component: CustomersetupComponent;
  let fixture: ComponentFixture<CustomersetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
