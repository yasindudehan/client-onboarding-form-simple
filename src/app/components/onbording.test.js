import { z } from "zod";
import { formSchema } from "./onbording";

describe("Onboarding Form Schema", () => {

  it("should pass with valid data", () => {
    const validData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      companyName: "Example Inc",
      services: ["WEB DEVELOPMENT", "AI"],
      budgetUsd: 500,
      projectStartDate: new Date().toISOString().split("T")[0], // today
      acceptTerms: true
    };

    expect(() => formSchema.parse(validData)).not.toThrow();
  });

  it("should fail if fullName is too short", () => {
    const invalidData = {
      fullName: "J",
      email: "john.doe@example.com",
      companyName: "Example Inc",
      services: ["WEB DEVELOPMENT"],
      budgetUsd: 500,
      projectStartDate: new Date().toISOString().split("T")[0],
      acceptTerms: true
    };

    expect(() => formSchema.parse(invalidData)).toThrow();
  });

  it("should fail if email is invalid", () => {
    const invalidData = {
      fullName: "John Doe",
      email: "not-an-email",
      companyName: "Example Inc",
      services: ["WEB DEVELOPMENT"],
      budgetUsd: 500,
      projectStartDate: new Date().toISOString().split("T")[0],
      acceptTerms: true
    };

    expect(() => formSchema.parse(invalidData)).toThrow();
  });

  it("should fail if no services selected", () => {
    const invalidData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      companyName: "Example Inc",
      services: [],
      budgetUsd: 500,
      projectStartDate: new Date().toISOString().split("T")[0],
      acceptTerms: true
    };

    expect(() => formSchema.parse(invalidData)).toThrow();
  });

  it("should fail if budget is too low", () => {
    const invalidData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      companyName: "Example Inc",
      services: ["WEB DEVELOPMENT"],
      budgetUsd: 50, // too low
      projectStartDate: new Date().toISOString().split("T")[0],
      acceptTerms: true
    };

    expect(() => formSchema.parse(invalidData)).toThrow();
  });

  it("should fail if projectStartDate is in the past", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const invalidData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      companyName: "Example Inc",
      services: ["WEB DEVELOPMENT"],
      budgetUsd: 500,
      projectStartDate: pastDate.toISOString().split("T")[0],
      acceptTerms: true
    };

    expect(() => formSchema.parse(invalidData)).toThrow();
  });

  it("should fail if acceptTerms is false", () => {
    const invalidData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      companyName: "Example Inc",
      services: ["WEB DEVELOPMENT"],
      budgetUsd: 500,
      projectStartDate: new Date().toISOString().split("T")[0],
      acceptTerms: false
    };

    expect(() => formSchema.parse(invalidData)).toThrow();
  });
});
