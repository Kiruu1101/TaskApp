/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { HomeLayoutWrapper } from "../assets/styled-components/HomeLayoutWrapper";
const HomeLayoutContext = createContext();
const HomeLayout = () => {
  const [daysFilter, setDayFilter] = useState("week");
  const { pathname, search } = useLocation();
  const sp = new URLSearchParams(search);
  const filter = sp.get("filter");
  useEffect(() => {
    const newFilter = Boolean(filter);
    if (newFilter) {
      setDayFilter(filter);
    }
  }, [filter]);

  return (
    <HomeLayoutContext.Provider value={{ daysFilter, setDayFilter }}>
      <HomeLayoutWrapper>
        <Sidebar />
        <Outlet context={{ daysFilter, setDayFilter, search, pathname }} />
      </HomeLayoutWrapper>
    </HomeLayoutContext.Provider>
  );
};
export const useHomeLayoutContext = () => {
  const context = useContext(HomeLayoutContext);
  return context;
};
export default HomeLayout;
