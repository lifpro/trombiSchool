import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Totot2Component } from './totot2.component';

describe('Totot2Component', () => {
  let component: Totot2Component;
  let fixture: ComponentFixture<Totot2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Totot2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Totot2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
