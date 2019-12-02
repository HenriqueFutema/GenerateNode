import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateMongooseComponent } from './generate-mongoose.component';

describe('GenerateMongooseComponent', () => {
  let component: GenerateMongooseComponent;
  let fixture: ComponentFixture<GenerateMongooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateMongooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateMongooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
