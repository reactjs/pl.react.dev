/**
 * Copyright (c) 2013-present, Facebook, Inc.
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
<<<<<<< HEAD
          <Header>Wersje Reacta</Header>
          <TitleAndMetaTags title="React - Wersje" />
=======
          <Header>React Versions</Header>
          <TitleAndMetaTags
            canonicalUrl={`${urlRoot}/versions/`}
            title="React - Versions"
          />
>>>>>>> 06deefa56756f8dac13af59ee657186a81d28151
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
