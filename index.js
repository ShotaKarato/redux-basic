const { combineReducers, legacy_createStore } = require("redux");

// Form
// createClaim: it's a form to create a claim
const createClaim = (name, amount) => ({
  type: "CREATE_CLAIM",
  payload: {
    name,
    amount,
  },
});
// createPolicy: it's a from to create a policy
const createPolicy = (name) => ({
  type: "CREATE_POLICY",
  payload: {
    name,
    amount: 200,
  },
});
// cancelPolicy: it's a form to cancel a policy
const cancelPolicy = (name) => ({
  type: "CANCEL_POLICY",
  payload: {
    name,
  },
});

// Departments - Reducers
// each department receives the current state and form(action) and apply some changes to the state based on the information from the form.
// claimsHistory: it applies changes to the state only when a new claim is created
const claimsHistory = (currentClaimsHistory = [], action) => {
  switch (action.type) {
    case "CREATE_CLAIM":
      const newClaimsHistory = [...currentClaimsHistory, action.payload];
      return newClaimsHistory;
    default:
      return currentClaimsHistory;
  }
};
// policies: it handles the list of claims, so it makes changes to the state when any addition or removal of a policy happens
const policies = (currentPolicies = [], action) => {
  let newPolicies;
  switch (action.type) {
    case "CREATE_POLICY":
      newPolicies = [...currentPolicies, action.payload.name];
      return newPolicies;
    case "CANCEL_POLICY":
      newPolicies = currentPolicies.filter(
        (policy) => policy.name !== action.payload.name
      );
    default:
      return currentPolicies;
  }
};
// accounting: accounting watches the amount of money in the account. Therefore it applies changes to the state when there is an increase or decrease of money
const accounting = (currentAccount = 3000, action) => {
  switch (action.type) {
    case "CREATE_CLAIM":
      currentAccount -= action.payload.amount;
      return currentAccount;
    case "CREATE_POLICY":
      currentAccount += action.payload.amount;
    default:
      return currentAccount;
  }
};

const reducers = combineReducers({
  claimsHistory,
  policies,
  accounting,
});

const store = legacy_createStore(reducers);

// state should be...
// { claimsHistory: [], policies: [], accounting: 3000 }
console.log(store.getState());

store.dispatch(createPolicy("Roger Federer"));
store.dispatch(createPolicy("Nishikori Key"));
store.dispatch(createPolicy("Rafael Nadal"));
store.dispatch(createPolicy("Novak Djokovic"));

// state should be...
// {
//   claimsHistory: [],
//   policies: [
//     'Roger Federer',
//     'Nishikori Key',
//     'Rafael Nadal',
//     'Novak Djokovic'
//   ],
//   accounting: 3800
// }
console.log(store.getState());

store.dispatch(createClaim("Novak Djokovic", 1200));
store.dispatch(cancelPolicy("Roger Federer"));

// state should be...
// {
//   claimsHistory: [ { name: 'Novak Djokovic', amount: 1200 } ],
//   policies: [
//     'Roger Federer',
//     'Nishikori Key',
//     'Rafael Nadal',
//     'Novak Djokovic'
//   ],
//   accounting: 2600
// }
console.log(store.getState());
