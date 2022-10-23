import { Account, Action, ClaimHistory, Policy } from "../types";

// departments... reducers
export const accounting = (currentAccount: Account = 1000, action: Action) => {
  let updatedAccount = currentAccount;
  switch (action.type) {
    case "CREATE_CLAIM":
      updatedAccount = currentAccount - action.payload.claimAmount;
      return updatedAccount;
    case "CREATE_POLICY":
      updatedAccount = currentAccount + action.payload.amount;
      return updatedAccount;
    default:
      return currentAccount;
  }
};

export const claimHistory = (
  currentClaimHistory: ClaimHistory[] = [],
  action: Action
): ClaimHistory[] => {
  switch (action.type) {
    case "CREATE_CLAIM":
      return [...currentClaimHistory, action.payload];
    default:
      return currentClaimHistory;
  }
};

export const policy = (currentPolicy: Policy[] = [], action: Action) => {
  switch (action.type) {
    case "CREATE_POLICY":
      return [...currentPolicy, action.payload];
    case "CANCEL_POLICY":
      return currentPolicy.filter(({ name }) => name !== action.payload.name);
    default:
      return currentPolicy;
  }
};
