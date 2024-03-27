import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UpdateClaimComponent } from './update-claim.component';

describe('UpdateClaimComponent', () => {
  let component: UpdateClaimComponent;
  let fixture: ComponentFixture<UpdateClaimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule],
      declarations: [UpdateClaimComponent]
    });
    fixture = TestBed.createComponent(UpdateClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
