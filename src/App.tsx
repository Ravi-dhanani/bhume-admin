import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LstServices from "./component/Service/LstServices";
import AboutUs from "./component/aboutus/AboutUs";
import PrivateRoute from "./component/auth/PrivateRoute";
import PublicRoute from "./component/auth/PublicRoute";
import LstCareer from "./component/career/LstCareer";
import MainLayout from "./component/header/MainLayout";
import HomePage from "./component/home/HomePage";
import LstLanguage from "./component/languages/LstLanguage";
import Login from "./component/login/Login";
import PrivacyPolicy from "./component/privacy-policy/PrivacyPolicy";
import TermsCondition from "./component/terms-condition/TermsCondition";
import Enquiry from "./component/Enquiry/Enquiry";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <MainLayout>
                <HomePage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/service"
          element={
            <PrivateRoute>
              <MainLayout>
                <LstServices />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/career"
          element={
            <PrivateRoute>
              <MainLayout>
                <LstCareer />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/aboutus"
          element={
            <PrivateRoute>
              <MainLayout>
                <AboutUs />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/language"
          element={
            <PrivateRoute>
              <MainLayout>
                <LstLanguage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/Enquiry"
          element={
            <PrivateRoute>
              <MainLayout>
                <Enquiry />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PrivateRoute>
              <MainLayout>
                <PrivacyPolicy />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/terms-condition"
          element={
            <PrivateRoute>
              <MainLayout>
                <TermsCondition />
              </MainLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
