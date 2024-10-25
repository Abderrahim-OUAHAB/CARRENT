import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAddComponent } from './agency-add.component';

describe('AgencyAddComponent', () => {
  let component: AgencyAddComponent;
  let fixture: ComponentFixture<AgencyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
