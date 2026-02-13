import { TooltipProvider } from "./components/ui/tooltip";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";

function App() {
  return (
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  );
}

export default App;
