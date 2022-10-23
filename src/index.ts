import { combineReducers, legacy_createStore } from "redux";
import { cancelPolicy, createClaim, createPolicy } from "./actionCreators";
import { accounting, claimHistory, policy } from "./reducers";

const store = legacy_createStore(
  combineReducers({
    accounting,
    claimHistory,
    policy,
  })
);

/** state should be...
 * { claimsHistory: [], policy: [], account: 3000 }
 */
console.log(store.getState());

store.dispatch(createPolicy("Roger Federer"));
store.dispatch(createPolicy("Nishikori Key"));
store.dispatch(createPolicy("Rafael Nadal"));
store.dispatch(createPolicy("Novak Djokovic"));

/**  state should be...
 * {
 *   claimsHistory: [],
 *   policies: [
 *     'Roger Federer',
 *     'Nishikori Key',
 *     'Rafael Nadal',
 *     'Novak Djokovic'
 *   ],
 *   accounting: 3800
 * }
 */
console.log(store.getState());

store.dispatch(createClaim("Novak Djokovic", 1200));
store.dispatch(cancelPolicy("Roger Federer"));

/** state should be...
 * {
 *   claimsHistory: [ { name: 'Novak Djokovic', amount: 1200 } ],
 *   policies: [
 *     'Roger Federer',
 *     'Nishikori Key',
 *     'Rafael Nadal',
 *     'Novak Djokovic'
 *   ],
 *   accounting: 2600
 * }
 */
console.log(store.getState());
