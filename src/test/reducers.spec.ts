import { combineReducers, legacy_createStore, Store } from "redux";
import { cancelPolicy, createClaim, createPolicy } from "../actionCreators";
import { accounting, claimHistory, policy } from "../reducers";

describe("reducers", () => {
  let store: Store;
  beforeEach(() => {
    store = legacy_createStore(
      combineReducers({ accounting, claimHistory, policy })
    );
  });

  it("should update account and policy upon receiving an action", () => {
    store.dispatch(createPolicy("Roger Federer"));
    store.dispatch(createPolicy("Nishikori Kei"));
    store.dispatch(createPolicy("Rafael Nadal"));
    store.dispatch(createPolicy("Novak Djokovic"));

    expect(store.getState()).toStrictEqual({
      claimHistory: [],
      policy: [
        { name: "Roger Federer", amount: 250 },
        { name: "Nishikori Kei", amount: 250 },
        { name: "Rafael Nadal", amount: 250 },
        { name: "Novak Djokovic", amount: 250 },
      ],
      accounting: 2000,
    });
  });

  it("should update claim history upon receiving an action", () => {
    store.dispatch(createPolicy("Rafael Nadal"));
    store.dispatch(createPolicy("Novak Djokovic"));

    store.dispatch(createClaim("Novak Djokovic", 320));
    store.dispatch(createClaim("Rafael Nadal", 450));

    expect(store.getState()).toStrictEqual({
      claimHistory: [
        { name: "Novak Djokovic", claimAmount: 320 },
        { name: "Rafael Nadal", claimAmount: 450 },
      ],
      policy: [
        { name: "Rafael Nadal", amount: 250 },
        { name: "Novak Djokovic", amount: 250 },
      ],
      accounting: 730,
    });
  });

  it("should update policy upon receiving an action", () => {
    store.dispatch(createPolicy("Roger Federer"));
    store.dispatch(cancelPolicy("Roger Federer"));
    expect(store.getState()).toStrictEqual({
      claimHistory: [],
      policy: [],
      accounting: 1250,
    });
  });
});
