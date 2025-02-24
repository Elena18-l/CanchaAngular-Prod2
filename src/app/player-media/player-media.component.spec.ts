import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMediaComponent } from './player-media.component';

describe('PlayerMediaComponent', () => {
  let component: PlayerMediaComponent;
  let fixture: ComponentFixture<PlayerMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerMediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
