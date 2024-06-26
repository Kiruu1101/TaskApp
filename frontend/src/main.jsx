import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store.js";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomeLayout from "./pages/HomeLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import SettingPage from "./pages/SettingPage.jsx";
import PrivateRotue from "./components/PrivateRotue.jsx";
import SharePage from "./pages/SharePage.jsx";
import RouteError from "./components/RouteError.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<RouteError />}>
      <Route index={true} element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/share/:taskId" element={<SharePage />} />
      <Route path="" element={<PrivateRotue />}>
        <Route
          path="/home"
          element={<HomeLayout />}
          errorElement={<RouteError />}
        >
          <Route index={true} element={<DashboardPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingPage />} />
        </Route>
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
