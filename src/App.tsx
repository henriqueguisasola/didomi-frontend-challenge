import React from 'react';
import './App.css';
import { SideMenuComponent } from './components/SideMenu';
import { ConsentsContextProvider } from './contexts/ConsentsContextProvider';
import { RootRouter } from './router/rootRouter';

function App() {
  return (
    <div className="App">
      <ConsentsContextProvider>
        <SideMenuComponent>
          <RootRouter />
        </SideMenuComponent>
      </ConsentsContextProvider>
    </div>
  );
}

export default App;
