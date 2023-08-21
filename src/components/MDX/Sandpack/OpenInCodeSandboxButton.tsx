/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {UnstyledOpenInCodeSandboxButton} from '@codesandbox/sandpack-react';
import {IconNewPage} from '../../Icon/IconNewPage';

export const OpenInCodeSandboxButton = () => {
  return (
    <UnstyledOpenInCodeSandboxButton
<<<<<<< HEAD
      className="text-sm text-primary dark:text-primary-dark inline-flex items-center hover:text-link duration-100 ease-in transition mx-1 ml-2 md:ml-1"
      title="Otwórz w CodeSandbox">
=======
      className="text-sm text-primary dark:text-primary-dark inline-flex items-center hover:text-link duration-100 ease-in transition mx-1 ms-2 md:ms-1"
      title="Open in CodeSandbox">
>>>>>>> 842c24c9aefaa60b7ae9b46b002bd1b3cf4d31f3
      <IconNewPage
        className="inline mx-1 relative top-[1px]"
        width="1em"
        height="1em"
      />
      <span className="hidden md:block">Forkuj</span>
    </UnstyledOpenInCodeSandboxButton>
  );
};
