import { RouterProvider } from "react-router-dom"
import { AuthContextProvider } from "./contexts/AuthContext"
import { router2 } from "./router"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51Nq3F7Ez6oa2bkpU2cKNj50NS4r0yd0BvXDUrZStk2kYesiwdbqp8Uc4iCDPjdeHP3NAQlEwPLDaZrFgqXNlrgGP009ak11IZe');

function App() {
  const options = {
    clientSecret: 'sk_test_51Nq3F7Ez6oa2bkpUYnGIZJaxzHec0LGk1jt9dMRljwK3kUzcrYyIqqDoJd9OE11b0h4b9CyX6QR546apBqc13BSY00EURk2Kvz'
  }


  return (
    <AuthContextProvider>
      <Elements stripe={stripePromise} options={options}>
        <RouterProvider router={router2} />
      </Elements>
    </AuthContextProvider>
  )
}

export default App
