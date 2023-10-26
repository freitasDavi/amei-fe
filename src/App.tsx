import { RouterProvider } from "react-router-dom"
import { AuthContextProvider } from "./contexts/AuthContext"
import { router } from "./router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient();

function App() {


  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContextProvider>
  )
}

export default App
