import { cancelPolicy, createClaim, createPolicy } from "../actionCreators";

describe("createClaim", () => {
  it("should create action for creating claim", () => {
    const claim = createClaim("Roger Federer", 300);
    expect(claim).toStrictEqual({
      type: "CREATE_CLAIM",
      payload: {
        name: "Roger Federer",
        claimAmount: 300,
      },
    });
  });
});

describe("createPolicy", () => {
  it("should create action for creating policy", () => {
    const claim = createPolicy("Rafael Nadal");
    expect(claim).toStrictEqual({
      type: "CREATE_POLICY",
      payload: {
        name: "Rafael Nadal",
        amount: 250,
      },
    });
  });
});

describe("cancelPolicy", () => {
  it("should create action for canceling policy", () => {
    const claim = cancelPolicy("Novak Djokovic");
    expect(claim).toStrictEqual({
      type: "CANCEL_POLICY",
      payload: {
        name: "Novak Djokovic",
      },
    });
  });
});
