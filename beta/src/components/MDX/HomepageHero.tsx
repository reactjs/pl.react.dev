/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {Logo} from 'components/Logo';
import YouWillLearnCard from 'components/MDX/YouWillLearnCard';

function HomepageHero() {
  return (
    <>
      <div className="mt-8 lg:mt-10 mb-0 sm:mt-8 sm:mb-8 lg:mb-6 flex-col sm:flex-row flex grow items-start sm:items-center justify-start mx-auto max-w-4xl">
        <Logo className="text-link dark:text-link-dark w-20 sm:w-28 mr-4 mb-4 sm:mb-0 h-auto" />
        <div className="flex flex-wrap">
          <h1 className="text-5xl mr-4 -mt-1 flex wrap font-bold leading-tight text-primary dark:text-primary-dark">
            React Docs
          </h1>
          <div className="inline-flex self-center px-2 mt-1 bg-highlight dark:bg-highlight-dark w-auto rounded text-link dark:text-link-dark uppercase font-bold tracking-wide text-base whitespace-nowrap">
            Beta
          </div>
        </div>
      </div>
      <section className="my-8 sm:my-10 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
        <div className="flex flex-col justify-center">
<<<<<<< HEAD
          <YouWillLearnCard title="Nauka Reacta" path="/learn">
=======
          <YouWillLearnCard title="Quick Start" path="/learn">
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b
            <p>
              Naucz się, jak myśleć reactowo przy pomocy instrukcji krok po
              kroku i interaktywnych przykładów.
            </p>
          </YouWillLearnCard>
        </div>
        <div className="flex flex-col justify-center">
<<<<<<< HEAD
          <YouWillLearnCard title="Dokumentacja API" path="/apis/react">
=======
          <YouWillLearnCard title="API Reference" path="/reference/react">
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b
            <p>
              Przejrzyj API dla reactowych hooków i zapoznaj się z jego
              kształtem dzięki kolorowym oznaczeniom.
            </p>
          </YouWillLearnCard>
        </div>
      </section>
    </>
  );
}

export default HomepageHero;
