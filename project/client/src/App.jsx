import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import { useMemo } from "react";
import { CssBaseline,ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {

  const theme=useMemo(()=>createTheme(themeSettings("light")));

  return (
    <div className="app">      
      <Router>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
          <Route path="/forgotpassword/:id" element={<PasswordReset/>}/>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
