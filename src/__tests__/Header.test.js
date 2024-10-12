import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header.js";
import appStore from "../utils/appStore.js";

it("should render header component with login button", () => {
    render(
        <BrowserRouter><Provider store={appStore}>
            <Header />
        </Provider>
        </BrowserRouter>
    );

    const loginButtonName = screen.getByText(/Login/);
    // const loginButton = screen.getByRole("button");
    expect(loginButtonName).toBeInTheDocument();
    // expect(loginButton).toBeInTheDocument();


});

it("should change login button to logout on click in header component", () => {
    render(
        <BrowserRouter><Provider store={appStore}>
            <Header />
        </Provider>
        </BrowserRouter>
    );

    const loginButtonName = screen.getByText(/Login/);
    fireEvent.click(loginButtonName);
    const logOutButtonName = screen.getByText(/Logout/);
    expect(logOutButtonName).toBeInTheDocument();


});