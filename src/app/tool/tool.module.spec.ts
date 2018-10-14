import { ToolModule } from './tool.module';

describe('ToolModule', () => {
  let toolModule: ToolModule;

  beforeEach(() => {
    toolModule = new ToolModule();
  });

  it('should create an instance', () => {
    expect(toolModule).toBeTruthy();
  });
});
