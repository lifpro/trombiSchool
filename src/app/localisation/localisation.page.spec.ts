import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocalisationPage } from './localisation.page';

describe('LocalisationPage', () => {
  let component: LocalisationPage;
  let fixture: ComponentFixture<LocalisationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalisationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocalisationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
