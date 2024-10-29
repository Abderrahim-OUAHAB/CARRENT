import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotRequestComponent } from './bot-request.component';

describe('BotRequestComponent', () => {
  let component: BotRequestComponent;
  let fixture: ComponentFixture<BotRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
