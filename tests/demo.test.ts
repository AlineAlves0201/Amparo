import { describe, it, expect } from "vitest";
import {
  adjustedRating,
  selectDemoAssistant,
  requestSchema,
  transitions,
  categories,
} from "../lib/demo";
describe("customer demonstration", () => {
  it("ranks established reviews above a small perfect sample", () => {
    expect(adjustedRating(4.9, 82)).toBeGreaterThan(adjustedRating(5, 3));
    expect(selectDemoAssistant()?.id).toBe("ana");
  });
  it("excludes declined assistants and handles exhaustion", () => {
    expect(selectDemoAssistant(["ana"])?.id).toBe("carla");
    expect(selectDemoAssistant(["ana", "bruno", "carla"])).toBeNull();
  });
  it("rejects incomplete addresses and unknown categories", () => {
    expect(
      requestSchema.safeParse({
        categoryId: "unknown",
        address: "x",
        safetyConsent: false,
      }).success,
    ).toBe(false);
  });
  it("has a finite service progression and complete catalog", () => {
    expect(transitions.completed).toBeNull();
    expect(categories).toHaveLength(8);
  });
});
