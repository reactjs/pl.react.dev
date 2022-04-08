/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * @emails react-core
 * @flow
 */

import Layout from 'components/Layout';
import Container from 'components/Container';
import Header from 'components/Header';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import React from 'react';
import {urlRoot} from 'site-constants';
import {sharedStyles} from 'theme';

// $FlowFixMe This is a valid path
import versions from '../../content/versions.yml';

type Props = {
  location: Location,
};

const Versions = ({location}: Props) => (
  <Layout location={location}>
    <Container>
      <div css={sharedStyles.articleLayout.container}>
        <div css={sharedStyles.articleLayout.content}>
          <Header>Wersje Reacta</Header>
          <TitleAndMetaTags
            canonicalUrl={`${urlRoot}/versions/`}
            title="React - Wersje"
          />
          <div css={sharedStyles.markdown}>
            <p>
              Kompletna historia wypuszczonych wersji Reacta jest dostępna{' '}
              <a
                href="https://github.com/facebook/react/releases"
                target="_blank"
                rel="noopener">
                na GitHubie
              </a>
              .<br />
              Dokumentacje dla ostatnich wersji można również znaleźć poniżej.
            </p>
            <blockquote>
              <p>Uwaga</p>
              <p>
                Ta wersja dokumentacji dotyczy Reacta 18. Dokumentację dla Reacta 17 znajdziesz pod adresem:{' '}
                <a href="https://17.reactjs.org">https://17.reactjs.org.</a>
              </p>
            </blockquote>
            <p>
              Przeczytaj nasze FAQ, aby dowiedzieć się na temat{' '}
              <a href="/docs/faq-versioning.html">
                naszej polityki wersjonowania i gwarancji stabilności
              </a>
              .
            </p>
            {versions.map(version => (
              <div key={version.title}>
                <h3>{version.title}</h3>
                <ul>
                  <li>
                    <a href={version.changelog} target="_blank" rel="noopener">
                      Dziennik zmian
                    </a>
                  </li>
                  {version.path && (
                    <li>
                      <a href={version.path} rel="nofollow">
                        Dokumentacja
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  </Layout>
);

export default Versions;
