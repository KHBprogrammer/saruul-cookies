import logo from "./logo.svg";
import "./App.css";
import { Box } from "@mui/system";
import Register from "./pages/register";
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import Home from "./pages/home";
import Login from "./pages/login";

function App() {
  const [first, setFirst] = useCookies(["user"]);
  console.log(`
  sshasladlfjaslkdjflkasjdflkjsadlkf
  
  `);
  console.log(first);
  return (
    <Box>
      <Router>
        <Routes>
          {first && first.authenticated ? (
            <>
              <Route element={<Home />} path="/" />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route element={<Register />} path="/register" />
              <Route element={<Login />} path="/login" />

              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
