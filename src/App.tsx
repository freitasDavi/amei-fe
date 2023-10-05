import { RouterProvider } from "react-router-dom"
import { AuthContextProvider } from "./contexts/AuthContext"
import { router } from "./router"

function App() {


  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  )
}

export default App
