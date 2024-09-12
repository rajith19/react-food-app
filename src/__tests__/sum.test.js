import Sum from "../components/sum"

test("Sum function should calculate the sum of two numbers", () => {
    const results = Sum(3, 4)
    expect(results).toBe(7)

})