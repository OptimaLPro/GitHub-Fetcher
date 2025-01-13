import "./App.css";
import SidebarDashboard from "./components/SidebarDashboard/SidebarDashboard";
import Router from "../Router";

function App() {
  return (
    <>
      <SidebarDashboard>
        <Router />
      </SidebarDashboard>
    </>
  );
}

export default App;
