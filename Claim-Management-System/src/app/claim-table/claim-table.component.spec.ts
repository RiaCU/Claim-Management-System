import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ClaimTableComponent } from './claim-table.component';

describe('ClaimTableComponent', () => {
  let component: ClaimTableComponent;
  let fixture: ComponentFixture<ClaimTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule],
      declarations: [ClaimTableComponent]
    });
    fixture = TestBed.createComponent(ClaimTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
