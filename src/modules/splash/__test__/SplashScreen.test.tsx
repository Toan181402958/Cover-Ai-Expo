import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import SplashScreen from "..";
import navigationHelper from "utils/navigationHelper";
import R from "src/assets/R";
import { ROUTER_APP } from "constants/constants";

const mockNavigation = jest.fn();
jest.mock("src/utils/navigationHelper", () => ({
  //   navigate: mockNavigation,
  __esModule: true,
  default: {
    navigate: mockNavigation,
  },
}));

beforeEach(() => {
  jest.useFakeTimers();
  mockNavigation.mockClear(); // reset số lần gọi trước đó
});

afterEach(() => {
  jest.useRealTimers();
});

describe("SplashScreen", () => {
  it("renders and navigates to MAIN_TAB", async () => {
    const { getByTestId } = render(<SplashScreen />);

    expect(getByTestId("ic_app")).toBeTruthy();
    expect(getByTestId("txt_app_name").props.children).toBe(
      R.strings().app_name
    );

    jest.advanceTimersByTime(1000); // Giả lập thời gian trôi qua 1000ms

    expect(mockNavigation).toHaveBeenCalledTimes(1);

    expect(mockNavigation).toHaveBeenCalledWith("MAIN_TAB");
  });
});
