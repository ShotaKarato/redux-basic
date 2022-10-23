export type ClaimHistory = {
  readonly name: string;
  readonly claimAmount: number;
};
export type Policy = {
  readonly name: string;
  readonly amount?: 250;
};
export type Account = number;
export type Action =
  | CreateClaimAction
  | CreatePolicyAction
  | CancelPolicyAction;
export type CreateClaimAction = {
  readonly type: "CREATE_CLAIM";
  readonly payload: {
    readonly name: string;
    readonly claimAmount: number;
  };
};
export type CreatePolicyAction = {
  readonly type: "CREATE_POLICY";
  readonly payload: {
    readonly name: string;
    readonly amount: 250;
  };
};
export type CancelPolicyAction = {
  readonly type: "CANCEL_POLICY";
  readonly payload: {
    readonly name: string;
  };
};
