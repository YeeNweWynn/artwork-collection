import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkWrapperComponent } from './artwork-wrapper.component';

describe('ArtworkWrapperComponent', () => {
  let component: ArtworkWrapperComponent;
  let fixture: ComponentFixture<ArtworkWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtworkWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
