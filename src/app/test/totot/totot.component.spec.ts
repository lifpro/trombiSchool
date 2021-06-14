import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TototComponent } from './totot.component';

describe('TototComponent', () => {
  let component: TototComponent;
  let fixture: ComponentFixture<TototComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TototComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TototComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
