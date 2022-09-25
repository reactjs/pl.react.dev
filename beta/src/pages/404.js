/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {Page} from 'components/Layout/Page';
import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {MDXComponents} from 'components/MDX/MDXComponents';

const {Intro, MaxWidth, p: P, a: A} = MDXComponents;

export default function NotFound() {
  return (
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
    </Page>
  );
}
