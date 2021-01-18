import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Question UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Question');
  const content = updateContent(app.container);

  it('Question page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Question page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Question module');
  });
});
