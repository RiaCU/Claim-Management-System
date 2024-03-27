import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { DownloadClaimComponent } from './download-claim.component';

describe('DownloadClaimComponent', () => {
  let component: DownloadClaimComponent;
  let fixture: ComponentFixture<DownloadClaimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule,FormsModule],
      declarations: [DownloadClaimComponent]
    });
    fixture = TestBed.createComponent(DownloadClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
