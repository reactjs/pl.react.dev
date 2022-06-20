/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import {IconRestart} from '../../Icon/IconRestart';
export interface ResetButtonProps {
  onReset: () => void;
}

export const ResetButton: React.FC<ResetButtonProps> = ({onReset}) => {
  return (
    <button
      className="text-sm text-primary dark:text-primary-dark inline-flex items-center hover:text-link duration-100 ease-in transition mx-1"
      onClick={onReset}
      title="Resetuj sandbox"
      type="button">
<<<<<<< HEAD
      <IconRestart className="inline mb-0.5 ml-1 mr-1 relative top-0.5" />{' '}
      Resetuj
=======
      <IconRestart className="inline ml-1 mr-1 relative" /> Reset
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6
    </button>
  );
};
