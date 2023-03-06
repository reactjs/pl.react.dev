/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {Page} from 'components/Layout/Page';
import {MDXComponents} from 'components/MDX/MDXComponents';
import sidebarLearn from '../sidebarLearn.json';

const {Intro, MaxWidth, p: P, a: A} = MDXComponents;

export default function NotFound() {
  return (
<<<<<<< HEAD
    <Page toc={[]}>
      <MarkdownPage meta={{title: 'Nie znaleziono'}}>
        <MaxWidth>
          <Intro>
            <P>Podana strona nie istnieje.</P>
            <P>
              Całkiem możliwe, że nie została jeszcze napisana. Ta beta jest{' '}
              <A href="/#how-much-content-is-ready">ciągle w budowie!</A>
            </P>
            <P>Wróć za jakiś czas.</P>
          </Intro>
        </MaxWidth>
      </MarkdownPage>
=======
    <Page toc={[]} meta={{title: 'Not Found'}} routeTree={sidebarLearn}>
      <MaxWidth>
        <Intro>
          <P>This page doesn’t exist.</P>
          <P>
            Quite possibly, it hasn’t been written yet. This beta is a{' '}
            <A href="/#how-much-content-is-ready">work in progress!</A>
          </P>
          <P>Please check back later.</P>
        </Intro>
      </MaxWidth>
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200
    </Page>
  );
}
