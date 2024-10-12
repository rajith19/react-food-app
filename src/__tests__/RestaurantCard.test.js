import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import RestaurantCard from "../components/RestaurantCard"
import MockData from "../mocks/resCardData.json"

it("should render restauant card with data", () => {
    render(<RestaurantCard resData={MockData} />)

    const name = screen.getByText("Namaste");
    expect(name).toBeInTheDocument();
})