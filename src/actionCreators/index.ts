import {
  CancelPolicyAction,
  CreateClaimAction,
  CreatePolicyAction,
} from "../types";

// forms... actions
export const createClaim = (
  name: string,
  claimAmount: number
): CreateClaimAction => ({
  type: "CREATE_CLAIM",
  payload: {
    name,
    claimAmount,
  },
});

export const createPolicy = (name: string): CreatePolicyAction => ({
  type: "CREATE_POLICY",
  payload: {
    name,
    amount: 250,
  },
});

export const cancelPolicy = (name: string): CancelPolicyAction => ({
  type: "CANCEL_POLICY",
  payload: {
    name,
  },
});
