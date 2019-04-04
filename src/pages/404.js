/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 * @flow
 */

import Container from 'components/Container';
import Header from 'components/Header';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import Layout from 'components/Layout';
import React from 'react';
import {sharedStyles} from 'theme';

type Props = {
  location: Location,
};

const PageNotFound = ({location}: Props) => (
  <Layout location={location}>
    <Container>
      <div css={sharedStyles.articleLayout.container}>
        <div css={sharedStyles.articleLayout.content}>
          <Header>Nie znaleziono strony</Header>
          <TitleAndMetaTags title="React - Nie znaleziono strony" />
          <div css={sharedStyles.markdown}>
            <p>Nie udało nam się znaleźć tego, czego szukasz.</p>
            <p>
              Prosimy o kontakt z administratorami strony, która przekierowała
              cię tutaj, i poinformowanie ich, że ten link jest nieprawidłowy.
            </p>
          </div>
        </div>
      </div>
    </Container>
  </Layout>
);

export default PageNotFound;
