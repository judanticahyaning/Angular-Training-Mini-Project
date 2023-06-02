import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksIssueComponent } from './books-issue.component';

describe('BooksIssueComponent', () => {
  let component: BooksIssueComponent;
  let fixture: ComponentFixture<BooksIssueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksIssueComponent]
    });
    fixture = TestBed.createComponent(BooksIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
