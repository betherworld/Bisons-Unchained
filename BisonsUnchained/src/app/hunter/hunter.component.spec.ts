import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HunterComponent } from './hunter.component';

describe('HunterComponent', () => {
  let component: HunterComponent;
  let fixture: ComponentFixture<HunterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HunterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HunterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
