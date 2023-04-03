/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import {lazy, useCallback, useEffect} from 'react';
import * as React from 'react';
import {createPortal} from 'react-dom';
import {siteConfig} from 'siteConfig';
import cn from 'classnames';

export interface SearchProps {
  appId?: string;
  apiKey?: string;
  indexName?: string;
  searchParameters?: any;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function Hit({hit, children}: any) {
  return (
    <Link href={hit.url.replace()}>
      <a>{children}</a>
    </Link>
  );
}

// Copy-pasted from @docsearch/react to avoid importing the whole bundle.
// Slightly trimmed to features we use.
// (c) Algolia, Inc.
function isEditingContent(event: any) {
  var element = event.target;
  var tagName = element.tagName;
  return (
    element.isContentEditable ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA'
  );
}
function useDocSearchKeyboardEvents({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(event: any) {
      function open() {
        // We check that no other DocSearch modal is showing before opening
        // another one.
        if (!document.body.classList.contains('DocSearch--active')) {
          onOpen();
        }
      }
      if (
        (event.keyCode === 27 && isOpen) ||
        (event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
        (!isEditingContent(event) && event.key === '/' && !isOpen)
      ) {
        event.preventDefault();
        if (isOpen) {
          onClose();
        } else if (!document.body.classList.contains('DocSearch--active')) {
          open();
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return function () {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onOpen, onClose]);
}

const options = {
  appId: siteConfig.algolia.appId,
  apiKey: siteConfig.algolia.apiKey,
  indexName: siteConfig.algolia.indexName,
};

const DocSearchModal: any = lazy(() =>
  // @ts-ignore
  import('@docsearch/react/modal').then((mod) => ({
    default: mod.DocSearchModal,
  }))
);

export function Search({
  isOpen,
  onOpen,
  onClose,
  searchParameters = {
    hitsPerPage: 5,
  },
}: SearchProps) {
  useDocSearchKeyboardEvents({isOpen, onOpen, onClose});
  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href={`https://${options.appId}-dsn.algolia.net`}
        />
      </Head>
<<<<<<< HEAD:beta/src/components/Search.tsx

      <button
        aria-label="Search"
        type="button"
        className="inline-flex md:hidden items-center text-lg p-1 ml-4 lg:ml-6"
        onClick={onOpen}>
        <IconSearch className="align-middle" />
      </button>

      <button
        type="button"
        className="hidden md:flex relative pl-4 pr-0.5 py-1 h-10 bg-secondary-button dark:bg-gray-80 outline-none focus:ring focus:outline-none betterhover:hover:bg-opacity-80 pointer items-center shadow-inner text-left w-full text-gray-30 rounded-lg align-middle text-sm"
        onClick={onOpen}>
        <IconSearch className="mr-3 align-middle text-gray-30 shrink-0 group-betterhover:hover:text-gray-70" />
        Szukaj
        <span className="ml-auto hidden sm:flex item-center">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>

      {isShowing &&
=======
      {isOpen &&
>>>>>>> f37ef36b070730ce8abd68860388179ed4284638:src/components/Search.tsx
        createPortal(
          <DocSearchModal
            {...options}
            initialScrollY={window.scrollY}
            searchParameters={searchParameters}
            onClose={onClose}
            navigator={{
              navigate({itemUrl}: any) {
                Router.push(itemUrl);
              },
            }}
            transformItems={(items: any[]) => {
              return items.map((item) => {
                const url = new URL(item.url);
                return {
                  ...item,
                  url: item.url.replace(url.origin, '').replace('#__next', ''),
                };
              });
            }}
            hitComponent={Hit}
          />,
          document.body
        )}
    </>
  );
}
