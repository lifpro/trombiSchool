import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfesseurPage } from './professeur.page';

describe('ProfesseurPage', () => {
  let component: ProfesseurPage;
  let fixture: ComponentFixture<ProfesseurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesseurPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesseurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
