import React from 'react';
import { Route } from 'react-router-dom';
import { HomePage } from 'Modules/HomePage';

export const Routes = (): JSX.Element => {
  return (
    <React.Fragment>
      <Route path={'/'} element={HomePage} />
    </React.Fragment>
  );
};
