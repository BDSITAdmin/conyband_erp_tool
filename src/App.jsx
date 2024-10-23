import { useState } from "react";
import Header from './components/header'
import Menu from "./components/Menu";
import Content from "./components/Content";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        <Menu activePage={activePage} setActivePage={setActivePage} />

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Content activePage={activePage} />
        </div>
      </div>
    </div>
  );
}

export default App;
