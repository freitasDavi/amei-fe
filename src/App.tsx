import { RouterProvider } from "react-router-dom"
import { AuthContextProvider } from "./contexts/AuthContext"
import { router2 } from "./router"
import { initMercadoPago } from "@mercadopago/sdk-react";

function App() {
  const mercadoPagoPK = import.meta.env.VITE_PAY_BROKER_PUBLIC_KEY;

  console.log(mercadoPagoPK);

  if (mercadoPagoPK) {
    initMercadoPago(mercadoPagoPK);
  }


  return (
    <AuthContextProvider>
      <RouterProvider router={router2} />
    </AuthContextProvider>
  )
}

export default App
