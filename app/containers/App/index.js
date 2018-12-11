/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import GlobalStyle from '../../global-styles';
import H1 from '../../components/H1';
import Main from '../../components/Main';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Deck dash 2"
        defaultTitle="Deck dash 2"
      >
        <meta name="description" content="A Deck dash 2 application" />
      </Helmet>
      <Main>
      <H1>Mähren Digital GmbH Deck Dashboard 2</H1>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      </Main>
      <GlobalStyle />
    </AppWrapper>
  );
}
