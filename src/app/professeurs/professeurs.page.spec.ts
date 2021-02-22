import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfesseursPage } from './professeurs.page';

describe('ProfesseursPage', () => {
  let component: ProfesseursPage;
  let fixture: ComponentFixture<ProfesseursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesseursPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesseursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
