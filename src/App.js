import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Body from "./components/Body";
import Contact from "./components/Contact";
import Error from "./components/Error";
// import Grocery from "./components/Grocery";
import Header from "./components/Header";
import RestaurantMenu from "./components/RestaurantMenu";
import ShimmerUi from "./components/ShimmerUi";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";

const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {

    const [name, setName] = useState("");

    useEffect(() => {
        setName("Rajith")
    }, [])

    return (
        <Provider store={appStore}>
            <UserContext.Provider value={{ loggedInUser: name, setName }}>
                <div className="app">
                    <Header />
                    <Outlet />
                </div>
            </UserContext.Provider>
        </Provider>
    )
}
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/grocery",
                element: <Suspense fallback={<ShimmerUi />}><Grocery /></Suspense>
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu />
            },
            {
                path: "/cart",
                element: <Cart />
            }
        ],
        errorElement: <Error />
    },

])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}></RouterProvider>);
