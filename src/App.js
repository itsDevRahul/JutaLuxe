import { Toaster } from "react-hot-toast";
import CheckOut from "./Pages/CheckOut";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import ProductView from "./Pages/ProductView";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrderSummary from "./Pages/OrderSummary";
import Policy from "./Pages/Policy";
import TermsConditions from "./Pages/TermsConditions";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: ":category?",
          element: <Home />
        },
        {
          path: "product/:id/:img",
          element: <ProductView />
        },
        {
          path: "/privacy-policy",
          element: <Policy />,
        }, 
        {
          path: "/terms-conditions",
          element: <TermsConditions />,
        }
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/checkout",
      element: <CheckOut />,
    },
    {
      path: "/order-summary",
      element: <OrderSummary />,
    }
  ])

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
