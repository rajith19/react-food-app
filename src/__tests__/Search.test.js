import { act, fireEvent, render, screen } from "@testing-library/react"
import Body from "../components/Body.js"
import "@testing-library/jest-dom"
import MOCK_DATA from "../mocks/resList.json"
import { BrowserRouter } from "react-router-dom"


global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA)
        }
    })
})

it("should render the body with search", async () => {
    await act(async () => {
        render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>)
    })

    const searchButton = screen.getByRole("button", { name: "Search" })
    const searchText = screen.getByTestId("search");

    expect(searchButton).toBeInTheDocument();

    fireEvent.change(searchText, { target: { value: "burger" } })
    fireEvent.click(searchButton);

    const resCard = screen.getAllByTestId("resCard");
    console.log(resCard);
    expect(resCard.length).toBe(1);

})