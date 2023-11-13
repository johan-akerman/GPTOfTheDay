import {
  BrowserRouter as Router,
  Route,
  useNavigate,
  Routes,
} from "react-router-dom";
import { useUser } from "./hooks/useUser";
import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";
import InfoBar from "./components/InfoBar";
import { Footer } from "./components/Footer";
import { AuthContextProvider, useAuthState } from "./firebase";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
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
          <Route exact path="/log-in" Component={LogIn} />
          <Route exact path="/sign-up" Component={SignUp} />
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
