import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentTotalComponent } from './comment-total.component';

describe('CommentTotalComponent', () => {
  let component: CommentTotalComponent;
  let fixture: ComponentFixture<CommentTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
