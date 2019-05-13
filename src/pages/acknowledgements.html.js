/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 */

import Layout from 'components/Layout';
import Container from 'components/Container';
import Header from 'components/Header';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import React from 'react';
import {urlRoot} from 'site-constants';
import {sharedStyles} from 'theme';

import names from '../../content/acknowledgements.yml';

const Acknowlegements = ({data, location}) => (
  <Layout location={location}>
    <Container>
      <div css={sharedStyles.articleLayout.container}>
        <div css={sharedStyles.articleLayout.content}>
          <Header>Podziękowania</Header>
          <TitleAndMetaTags
            ogUrl={`${urlRoot}/acknowledgements.html`}
            title="React - Podziękowania"
          />

          <div css={sharedStyles.markdown}>
            <p>
              Chcielibyśmy podziękować osobom, które wniosły wkład w powstanie
              Reacta:
            </p>

            <ul
              css={{
                display: 'flex',
                flexWrap: 'wrap',
              }}>
              {names.map((name, index) => (
                <li
                  css={{
                    flex: '1 0 200px',
                  }}
                  key={index}>
                  {name}
                </li>
              ))}
            </ul>

            <p>Oprócz tego, jesteśmy wdzięczni:</p>
            <ul>
              <li>
                <a href="https://github.com/jeffbski">Jeffowi Barczewskiemu</a>{' '}
                za pozwolenie nam na wykorzystanie nazwy{' '}
                <a href="https://www.npmjs.com/package/react">react</a> dla
                naszej paczki w rejestrze NPM.
              </li>
              <li>
                <a href="https://christopheraue.net/">Christopherowi Aue</a> za
                pozwolenie nam na wykorzystanie domeny{' '}
                <a href="https://reactjs.com/">reactjs.com</a> oraz nazwy{' '}
                <a href="https://twitter.com/reactjs">@reactjs</a> na Twitterze.
              </li>
              <li>
                <a href="https://github.com/ProjectMoon">ProjectMoon</a> za
                pozwolenie nam na wykorzystanie nazwy{' '}
                <a href="https://www.npmjs.com/package/flux">flux</a> dla naszej
                paczki w rejestrze NPM.
              </li>
              <li>
                Shane'owi Andersonowi za pozwolenie nam na wykorzystanie nazwy{' '}
                <a href="https://github.com/react">react</a> dla organizacji na
                GitHubie.
              </li>
              <li>
                <a href="https://github.com/voronianski">
                  Dmitriowi Voronianskiemu
                </a>{' '}
                za pozwolenie nam na wykorzystanie motywu{' '}
                <a href="https://labs.voronianski.com/oceanic-next-color-scheme/">
                  Oceanic Next
                </a>{' '}
                na naszej stronie.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  </Layout>
);

export default Acknowlegements;
