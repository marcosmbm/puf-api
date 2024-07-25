import { describe, expect, it } from "@jest/globals";

import { getCredentialsByAuthHeader } from "./services";

describe("User module", () => {
  it("should return credentials by basic authentication token", () => {
    //prepare
    const email = "teste@email.com";
    const password = "12345678";

    const token = Buffer.from(`${email}:${password}`, "utf-8").toString(
      "base64",
    );
    const basicToken = `Basic ${token}`;

    //execution
    const credentials = getCredentialsByAuthHeader(basicToken);

    //expectation
    expect(credentials).toHaveLength(2);
    expect(credentials[0]).toBe(email);
    expect(credentials[1]).toBe(password);
  });

  it("should return error message when token is not Basic type ", () => {
    //prepare
    const email = "teste@email.com";
    const password = "12345678";

    const token = Buffer.from(`${email}:${password}`, "utf-8").toString(
      "base64",
    );
    const basicToken = `Bearer ${token}`;

    //execution
    const credentials = () => getCredentialsByAuthHeader(basicToken);

    //expectation
    expect(credentials).toThrowError("Credentials invalid");
  });
});
