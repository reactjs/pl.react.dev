/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import {UnstyledOpenInCodeSandboxButton} from '@codesandbox/sandpack-react';
import {IconNewPage} from '../../Icon/IconNewPage';

export const OpenInCodeSandboxButton = () => {
  return (
<<<<<<< HEAD
    <a
      className={cn(
        'text-sm text-primary dark:text-primary-dark inline-flex items-center hover:text-link duration-100 ease-in transition mx-1',
        className
      )}
      href={url}
      rel="noreferrer noopener"
      target="_blank"
      title="Otwórz w CodeSandbox">
      <span className="hidden md:inline">
        <IconNewPage className="inline mb-0.5 text-base" /> Forkuj
      </span>
      <span className="inline md:hidden">
        <IconNewPage className="inline mb-0.5 text-base" /> Forkuj
      </span>
    </a>
=======
    <UnstyledOpenInCodeSandboxButton
      className="text-sm text-primary dark:text-primary-dark inline-flex items-center hover:text-link duration-100 ease-in transition mx-1 ml-3 md:ml-1"
      title="Open in CodeSandbox">
      <IconNewPage
        className="inline mb-0.5 ml-1 mr-1 relative top-px"
        width=".8em"
        height=".8em"
      />
      <span className="hidden md:block">Fork</span>
    </UnstyledOpenInCodeSandboxButton>
>>>>>>> 20f0fe280f3c122df7541256b983c46e21e33b20
  );
};
