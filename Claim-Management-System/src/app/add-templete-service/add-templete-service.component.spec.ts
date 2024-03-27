import { ComponentFixture, TestBed } from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import { AddTempleteServiceComponent } from './add-templete-service.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddTempleteServiceComponent', () => {
  let component: AddTempleteServiceComponent;
  let fixture: ComponentFixture<AddTempleteServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,ReactiveFormsModule],
      declarations: [AddTempleteServiceComponent]
    });
    fixture = TestBed.createComponent(AddTempleteServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
