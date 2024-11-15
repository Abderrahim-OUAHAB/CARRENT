import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyUpdateComponent } from './agency-update.component';

describe('AgencyUpdateComponent', () => {
  let component: AgencyUpdateComponent;
  let fixture: ComponentFixture<AgencyUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
