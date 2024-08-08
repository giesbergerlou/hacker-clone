import React from 'react';
import { QueryParamProvider } from 'use-query-params';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components
import List from './components/List';
import Navigation from './components/Navigation';
import ErrorState from './components/ErrorState';

// Helpers
import { createPaths } from './helpers/routes';

const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="*" element={<ErrorState message="Page not found" icon={faMagnifyingGlass} />} />
            <Route path="/" key={0} element={<List tab='default'/>} />
            {createPaths().slice(1).map((path, index) => {
              return <Route path={path} key={index + 1} element={<List tab={path}/>} />
            })}
          </Routes>
        </div>
      </QueryParamProvider>
    </BrowserRouter>
  );
}

export default App;
