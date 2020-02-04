export { assume } from './assume';
export { that } from './that';

import { ValidationStart } from './Validation';
import { assume } from './assume';
import { that } from './that';

const myValue = 7;
const myBool = true;
assume(that(() => myValue).is.not.equalTo(7));
assume(that(() => myBool));
