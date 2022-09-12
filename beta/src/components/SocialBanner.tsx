/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 */

import React from 'react';
import cn from 'classnames';
import {ExternalLink} from './ExternalLink';

<<<<<<< HEAD
// TODO: Unify with the old site settings.
// Turning this off also requires changing the Page top value to pull up the sidebar.
const bannerText = 'Wesprzyj Ukrainę 🇺🇦';
const bannerLink = 'https://opensource.fb.com/support-ukraine';
const bannerLinkText = 'Wesprzyj pomoc humanitarną dla Ukrainy.';
=======
const bannerText = 'Support Ukraine 🇺🇦';
const bannerLink = 'https://opensource.fb.com/support-ukraine';
const bannerLinkText = 'Help Provide Humanitarian Aid to Ukraine';
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

export default function SocialBanner() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    function patchedScrollTo(x: number, y: number) {
      if (y === 0) {
        // We're trying to reset scroll.
        // If we already scrolled past the banner, consider it as y = 0.
        const bannerHeight = ref.current!.offsetHeight; // Could be zero (e.g. mobile)
        y = Math.min(window.scrollY, bannerHeight);
      }
      return realScrollTo(x, y);
    }
    const realScrollTo = window.scrollTo;
    (window as any).scrollTo = patchedScrollTo;
    return () => {
      (window as any).scrollTo = realScrollTo;
    };
  }, []);
  return (
    <div
      ref={ref}
      className={cn(
        `h-[40px] hidden lg:flex w-full bg-gray-100 dark:bg-gray-700 text-base md:text-lg py-2 sm:py-0 items-center justify-center flex-col sm:flex-row z-[100]`
      )}>
      <div className="hidden sm:block">{bannerText}</div>
      <ExternalLink
        className="ml-0 sm:ml-1 text-link dark:text-link-dark hover:underline"
        href={bannerLink}>
        <div className="inline sm:hidden">🇺🇦 </div>
        {bannerLinkText}
        <span className="hidden sm:inline">.</span>
      </ExternalLink>
    </div>
  );
}
