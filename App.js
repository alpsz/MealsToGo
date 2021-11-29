import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";


import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
const firebaseConfig = {
  apiKey: "AIzaSyD7h3ElIwnPPvZMrttE2_-2TcVaKEnxGDc",
  authDomain: "meals-to-go-30983.firebaseapp.com",
  projectId: "meals-to-go-30983",
  storageBucket: "meals-to-go-30983.appspot.com",
  messagingSenderId: "837881118171",
  appId: "1:837881118171:web:2bb9669bce7eceea90bbfe",
  measurementId: "G-MX1J26WPSM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
