import { TooltipProvider } from "./components/ui/tooltip";
import Dashboard from "./features/dashboard/Dashboard";

function App() {
  return (
    <TooltipProvider>
      <Dashboard />
    </TooltipProvider>
  );
}

export default App;
