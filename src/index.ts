export { assume } from './assume';
export { that } from './that';

import { assume } from './assume';
import { that } from './that';

const myValue = 7;
assume(that(() => myValue).is.not.equalTo(7));
