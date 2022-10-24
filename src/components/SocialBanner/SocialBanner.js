/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * @emails react-core
 * @flow
 */

// $FlowFixMe Update Flow
import React from 'react';
import {colors, media} from 'theme';

const linkProps = {
  href: 'https://beta.reactjs.org',
  target: '_blank',
  rel: 'noopener',
};

<<<<<<< HEAD
const bannerText = 'Wesprzyj Ukrainę 🇺🇦 ';
const bannerLink = 'Wesprzyj pomoc humanitarną dla Ukrainy.';
=======
const bannerText = 'Try out a preview of the new React Docs!';
const bannerLink = '👉 beta.reactjs.org';
>>>>>>> d483aebbac6d3c8f059b52abf21240bc91d0b96e

export default function SocialBanner() {
  return (
    <div
      css={{
        display: 'var(--social-banner-display)',
        height: 'var(--social-banner-height-normal)',
        fontSize: 18,
        fontWeight: 'bold',
        [media.lessThan('large')]: {
          fontSize: 16,
        },
        [media.lessThan('small')]: {
          height: 'var(--social-banner-height-small)',
          fontSize: 14,
        },
      }}>
      <div
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <span
          css={{
            display: 'flex',
            [media.lessThan('small')]: {
              flexDirection: 'column',
              lineHeight: 1.5,
              textAlign: 'center',
            },
          }}>
          <span
            css={{
              marginRight: '0.5rem',
            }}>
            {bannerText}
          </span>

          <a
            css={{
              color: colors.brand,
            }}
            {...linkProps}
            target="_blank"
            rel="noopener">
            <span css={{color: colors.brand}}>{bannerLink}</span>
          </a>
        </span>
      </div>
    </div>
  );
}
