import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCarCustomerComponent } from './search-car-customer.component';

describe('SearchCarCustomerComponent', () => {
  let component: SearchCarCustomerComponent;
  let fixture: ComponentFixture<SearchCarCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCarCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCarCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
