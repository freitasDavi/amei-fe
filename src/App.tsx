import { RouterProvider } from "react-router-dom"
import { AuthContextProvider } from "./contexts/AuthContext"
import { router2 } from "./router"
import { loadStripe } from "@stripe/stripe-js"

export const stripePromise = loadStripe('pk_test_51Nq3F7Ez6oa2bkpU2cKNj50NS4r0yd0BvXDUrZStk2kYesiwdbqp8Uc4iCDPjdeHP3NAQlEwPLDaZrFgqXNlrgGP009ak11IZe');

function App() {

  return (
    <AuthContextProvider>
      <RouterProvider router={router2} />
    </AuthContextProvider>
  )
}

export default App
