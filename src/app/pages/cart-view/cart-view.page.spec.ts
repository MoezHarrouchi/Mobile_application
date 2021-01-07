import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartViewPage } from './cart-view.page';

describe('CartViewPage', () => {
  let component: CartViewPage;
  let fixture: ComponentFixture<CartViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
