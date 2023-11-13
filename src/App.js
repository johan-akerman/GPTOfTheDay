import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useUser } from "./hooks/useUser";
import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";
import InfoBar from "./components/InfoBar";
import { Footer } from "./components/Footer";
import { AuthContextProvider } from "./firebase";
import Directory from "./pages/Directory";
import SubmitGPT from "./pages/SubmitGPT";
import Gpt from "./pages/Gpt";

function App() {
  const user = useUser();

  return (
    <AuthContextProvider>
      <Router>
        <InfoBar />
        <Navbar />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/directory" Component={Directory} />
          <Route exact path="/submit" Component={SubmitGPT} />
          <Route exact path="/gpts/:gpt" Component={Gpt} />
        </Routes>
        <Footer />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
