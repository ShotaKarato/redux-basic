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

console.log(store.getState());

store.dispatch(createPolicy("Roger Federer"));
store.dispatch(createPolicy("Nishikori Key"));
store.dispatch(createPolicy("Rafael Nadal"));
store.dispatch(createPolicy("Novak Djokovic"));

console.log(store.getState());

store.dispatch(createClaim("Novak Djokovic", 1200));
store.dispatch(cancelPolicy("Roger Federer"));

console.log(store.getState());
