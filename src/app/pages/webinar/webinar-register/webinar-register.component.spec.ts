import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarRegisterComponent } from './webinar-register.component';

describe('WebinarRegisterComponent', () => {
  let component: WebinarRegisterComponent;
  let fixture: ComponentFixture<WebinarRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebinarRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebinarRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
