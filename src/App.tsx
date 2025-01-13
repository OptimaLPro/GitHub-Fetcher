import "./App.css";
import SidebarDashboard from "./components/SidebarDashboard/SidebarDashboard";
import Router from "../Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SidebarDashboard>
          <main className="p-6">
            <Router />
          </main>
        </SidebarDashboard>
      </QueryClientProvider>
    </>
  );
}

export default App;
