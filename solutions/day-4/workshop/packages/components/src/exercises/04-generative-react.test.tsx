import * as React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import fc from "fast-check";
import { RemConverter } from "./04-generative-react";

afterEach(cleanup);

describe("04-generative-react", () => {
  /**
   * Exercise 1
   */
  it("should render correctly", () => {
    expect(render(<RemConverter />)).toBeDefined();
  });

  /**
   * Exercise 2
   */
  it("should convert px to rem using property based assertion", async () => {
    const { getByTestId, getByText } = render(<RemConverter />);
    fc.assert(
      fc.property(fc.nat(), fc.constant(16), (px, baseFontSize) => {
        fireEvent.change(getByTestId("px"), {
          target: { value: `${px}` },
        });
        fireEvent.click(getByText("Convert"));
        expect((getByTestId("rem") as HTMLInputElement).value).toBe(
          `${px / baseFontSize}`
        );
      })
    );
  });
});