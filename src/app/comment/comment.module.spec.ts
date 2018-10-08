import { CommentModule } from './comment.module';

describe('CommentModule', () => {
  let commentModule: CommentModule;

  beforeEach(() => {
    commentModule = new CommentModule();
  });

  it('should create an instance', () => {
    expect(commentModule).toBeTruthy();
  });
});
