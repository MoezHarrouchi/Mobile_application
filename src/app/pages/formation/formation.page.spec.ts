import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormationPage } from './formation.page';

describe('FormationPage', () => {
  let component: FormationPage;
  let fixture: ComponentFixture<FormationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
