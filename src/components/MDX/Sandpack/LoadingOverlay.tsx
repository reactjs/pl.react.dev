import {useState} from 'react';

import {
  LoadingOverlayState,
  OpenInCodeSandboxButton,
  useSandpack,
} from '@codesandbox/sandpack-react/unstyled';
import {useEffect} from 'react';

const FADE_ANIMATION_DURATION = 200;

export const LoadingOverlay = ({
  clientId,
  dependenciesLoading,
  forceLoading,
}: {
  clientId: string;
  dependenciesLoading: boolean;
  forceLoading: boolean;
} & React.HTMLAttributes<HTMLDivElement>): React.ReactNode | null => {
  const loadingOverlayState = useLoadingOverlayState(
    clientId,
    dependenciesLoading,
    forceLoading
  );

  if (loadingOverlayState === 'HIDDEN') {
    return null;
  }

  if (loadingOverlayState === 'TIMEOUT') {
    return (
      <div className="sp-overlay sp-error">
        <div className="sp-error-message">
          Nie można nawiązać połączenia z bundlerem sandpacka. Upewnij się, że
          jesteś online lub spróbuj ponownie później. Jeśli problem będzie się
          powtarzał, prosimy o zgłoszenie tego faktu poprzez{' '}
          <a
            className="sp-error-message"
            href="mailto:hello@codesandbox.io?subject=Sandpack Timeout Error">
            mail
          </a>{' '}
          lub wątek na{' '}
          <a
            className="sp-error-message"
            href="https://github.com/codesandbox/sandpack/issues"
            rel="noreferrer noopener"
            target="_blank">
            GitHubie.
          </a>
        </div>
      </div>
    );
  }

  const stillLoading =
    loadingOverlayState === 'LOADING' || loadingOverlayState === 'PRE_FADING';

  return (
    <div
      className="sp-overlay sp-loading"
      style={{
        opacity: stillLoading ? 1 : 0,
        transition: `opacity ${FADE_ANIMATION_DURATION}ms ease-out`,
      }}>
      <div className="sp-cube-wrapper" title="Otwórz w CodeSandbox">
        {/* @ts-ignore: the OpenInCodeSandboxButton type from '@codesandbox/sandpack-react/unstyled' is incompatible with JSX in React 19 */}
        <OpenInCodeSandboxButton />
        <div className="sp-cube">
          <div className="sp-sides">
            <div className="top" />
            <div className="right" />
            <div className="bottom" />
            <div className="left" />
            <div className="front" />
            <div className="back" />
          </div>
        </div>
      </div>
    </div>
  );
};

const useLoadingOverlayState = (
  clientId: string,
  dependenciesLoading: boolean,
  forceLoading: boolean
): LoadingOverlayState => {
  const {sandpack, listen} = useSandpack();
  const [state, setState] = useState<LoadingOverlayState>('HIDDEN');

  if (state !== 'LOADING' && forceLoading) {
    setState('LOADING');
  }

  /**
   * Sandpack listener
   */
  const sandpackIdle = sandpack.status === 'idle';
  useEffect(() => {
    const unsubscribe = listen((message) => {
      if (message.type === 'done') {
        setState((prev) => {
          return prev === 'LOADING' ? 'PRE_FADING' : 'HIDDEN';
        });
      }
    }, clientId);

    return () => {
      unsubscribe();
    };
  }, [listen, clientId, sandpackIdle]);

  /**
   * Fading transient state
   */
  useEffect(() => {
    let fadeTimeout: ReturnType<typeof setTimeout>;

    if (state === 'PRE_FADING' && !dependenciesLoading) {
      setState('FADING');
    } else if (state === 'FADING') {
      fadeTimeout = setTimeout(
        () => setState('HIDDEN'),
        FADE_ANIMATION_DURATION
      );
    }

    return () => {
      clearTimeout(fadeTimeout);
    };
  }, [state, dependenciesLoading]);

  if (sandpack.status === 'timeout') {
    return 'TIMEOUT';
  }

  if (sandpack.status !== 'running') {
    return 'HIDDEN';
  }

  return state;
};
