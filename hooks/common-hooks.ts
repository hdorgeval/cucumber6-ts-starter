import { getLogger } from '../loggers/common-logger';
import { Before, BeforeAll } from 'cucumber';

Before({ tags: '@ignore' }, async function() {
  return 'skipped';
});

Before({ tags: '@debug' }, async function() {
  this.debug = true;
});

/**
 * Before each scenario hook
 */
Before({ tags: '@simpleLogger' }, async function() {
  this.logger = getLogger('@simpleLogger');
});

/**
 * Before each scenario hook
 */
Before({ tags: '@noOpLogger' }, async function() {
  this.logger = getLogger('@noOpLogger');
});

/**
 * Before each scenario hook
 */
Before({ tags: '@simpleLogger and @debug' }, async function() {
  this.logger = getLogger('@simpleLogger@verbose');
});

BeforeAll(async function() {
  // eslint-disable-next-line no-console
  console.log('Before All');
});
