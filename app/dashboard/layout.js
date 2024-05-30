"use client"

import NavMenu from "@/src/Layout/NavMenu";
import { CssBaseline } from "@mui/material";
import AlertBox from '../../src/Layout/AlertBox';
import { UserContextProvider } from '../../src/context/userContext'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function RootLayout({ children }) {
  return (
    <AlertBox>
      <CssBaseline />
      <NavMenu/>
      <UserContextProvider>
        { children }
      </UserContextProvider>
    </AlertBox>
  );
}
