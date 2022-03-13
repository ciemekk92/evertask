import React from 'react';
import { Router, RouterProps } from 'react-router-dom';
import { BrowserHistory, HashHistory } from 'history';

interface Props {
  history: BrowserHistory | HashHistory;
  children: React.ReactNode;
  basename: string;
}

export const CustomRouter = ({ basename, children, history }: Props) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });

  React.useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};
