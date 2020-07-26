import { Before, BeforeAll, AfterAll } from 'cucumber';

Before({ tags: '@ignore' }, async function () {
  return 'skipped';
});

Before({ tags: '@debug' }, async function () {
  this.debug = true;
});

BeforeAll(async function () {
  // eslint-disable-next-line no-console
  console.log('Before All');
});

AfterAll(async function () {
  // eslint-disable-next-line no-console
  console.log('After All');
});
