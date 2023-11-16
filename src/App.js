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
          <Route exact path="/" element={<Home user={user} />} />
          <Route exact path="/directory" element={<Directory user={user} />} />
          <Route exact path="/submit" element={<SubmitGPT user={user} />} />
          <Route exact path="/gpts/:gpt" element={<Gpt user={user} />} />
        </Routes>
        <Footer />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
