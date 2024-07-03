import React from "react";

import { DrawerProvider } from './context/DrawerContext';
import {AuthProvider} from "./context/AuthContext";
import Router from "./Routes";

function App() {
  return (
    <>
      <AuthProvider>
        <DrawerProvider>
          <Router />
        </DrawerProvider>
      </AuthProvider>
    </>
  );
}

export default App;
