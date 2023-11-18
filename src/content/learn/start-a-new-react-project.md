---
title: Zacznij nowy projekt w Reakcie
---

<Intro>

Jeśli chcesz zbudować nową aplikację lub stronę internetową wyłącznie za pomocą Reacta, zalecamy wybrać jeden z frameworków opartych na Reakcie, który jest popularny w społeczności. Frameworki te zapewniają funkcjonalności, które większość aplikacji i stron internetowych koniec końców będzie potrzebować, takie jak nawigacja, pobieranie danych i generowanie kodu HTML.

</Intro>

<Note>

**Musisz zainstalować [Node.js](https://nodejs.org/en/) do developmentu na twoim komputerze.** Możesz *również* zdecydować się na użycie Node.js na produkcji, ale nie jest to konieczne. Wiele reactowych frameworków wspiera eksport do statycznego folderu HTML/CSS/JS.

</Note>

## Dojrzałe frameworki reactowe {/*production-grade-react-frameworks*/}

### Next.js {/*nextjs*/}

**[Next.js](https://nextjs.org/) to kompleksowy (ang. *full-stack*) framework reactowy.** Jest wszechstronny i pozwala na tworzenie aplikacji reactowych o dowolnym rozmiarze - od prostej, głównie statycznej strony bloga po złożoną, dynamiczną aplikację. Aby utworzyć nowy projekt w Next.js, wywołaj poniższą komendę w terminalu:

<TerminalBlock>
npx create-next-app@latest
</TerminalBlock>

Jeśli Next.js jest dla ciebie nowością, sprawdź [samouczek Next.js](https://nextjs.org/learn/foundations/about-nextjs).

Next.js jest rozwijany przez [Vercel](https://vercel.com/). Możesz [wdrożyć aplikację Next.js](https://nextjs.org/docs/app/building-your-application/deploying) na dowolnym hostingu obsługującym Node.js lub usłudze bezserwerowej, lub nawet na własnym serwerze. Next.js obsługuje również [eksport statyczny](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports), który nie wymaga serwera.

### Remix {/*remix*/}

**[Remix](https://remix.run/) to kompleksowy framework reactowy z wbudowanym nawigacją.** Pozwala to na podzielenie aplikacji na zagnieżdżone części, które mogą ładować dane równolegle i odświeżać się w odpowiedzi na akcje użytkownika. Aby utworzyć nowy projekt w Remix, uruchom komendę:

<TerminalBlock>
npx create-remix
</TerminalBlock>

Jeśli Remix jest dla ciebie czymś nowym, sprawdź [tutorial na blogu](https://remix.run/docs/en/main/tutorials/blog) (krótki) oraz [tutorial z przykładową aplikacją](https://remix.run/docs/en/main/tutorials/jokes) (długi).

Remix jest utrzymywany przez [Shopify](https://www.shopify.com/). Kiedy tworzysz projekt z użyciem Remix, musisz [wybrać platformę docelową](https://remix.run/docs/en/main/guides/deployment). Możesz wdrożyć aplikację Remix na dowolnym hostingu obsługującym Node.js lub na usłudze bezserwerowej, korzystając z [istniejącego lub własnego adaptera](https://remix.run/docs/en/main/other-api/adapter).

### Gatsby {/*gatsby*/}

[Gatsby](https://www.gatsbyjs.com/) to framework reactowy stworzony dla szybkich stron internetowych opartych o CMS. Jego bogaty ekosystem wtyczek i warstwa danych GraphQL ułatwiają integrację treści, interfejsów API i usług. Aby utworzyć nowy projekt Gatsby, uruchom komendę:

<TerminalBlock>
npx create-gatsby
</TerminalBlock>

Jeśli Gatsby to dla ciebie nowość, sprawdź [samouczek](https://www.gatsbyjs.com/docs/tutorial/).

Gatsby jest utrzymywane przez [Netlify](https://www.netlify.com/). Możesz [wdrożyć w pełni statyczną stronę Gatsby](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting) na dowolnym hostingu statycznym. Jeśli zdecydujesz się na korzystanie z funkcji obsługiwanych tylko przez serwer, upewnij się, że twój dostawca hostingu wspiera je dla Gatsby.

### Expo (dla aplikacji natywnych) {/*expo*/}

**[Expo](https://expo.dev/) to framework reactowy, który pozwala tworzyć uniwersalne aplikacje na Androida, iOS oraz webowe z prawdziwie natywnym interfejsem użytkownika.** Dostarcza on SDK dla [React Native](https://reactnative.dev/), które ułatwia korzystanie z natywnych funkcjonalności. Aby utworzyć nowy projekt Expo, uruchom komendę:

<TerminalBlock>
npx create-expo-app
</TerminalBlock>

Jeśli Expo jest dla siebie nowy, zajrzyj do jego [samouczka](https://docs.expo.dev/tutorial/introduction/).

Expo jest utrzymywane przez [Expo (firmę)](https://expo.dev/about). Budowanie aplikacji z jego pomocą jest darmowe, a te możesz udostępniać w sklepach Google i Apple bez ograniczeń. Expo oferuje także dodatkowe płatne usługi w chmurze.

<DeepDive>

#### Czy mogę używać Reacta bez żadnego frameworka? {/*can-i-use-react-without-a-framework*/}

Oczywiście, możesz używać Reacta bez żadnego frameworka - w taki sposób [używa się go tylko dla części strony.](/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page) **Jednakże, jeśli budujesz nową aplikację lub stronę w pełni za pomocą Reacta, zalecamy korzystanie z frameworka.**

Oto dlaczego.

Nawet jeśli początkowo nie potrzebujesz nawigacji ani pobierania danych, prawdopodobnie później będziesz chcieć dodać pewne biblioteki do ich obsługi. W miarę jak twój bundle rośnie z każdą nową funkcją, możesz musieć zastanowić się, jak podzielić kod dla każdego widoku z osobna. Gdy potrzeby dotyczące pobierania danych stają się bardziej złożone, prawdopodobnie napotkasz problemy związane z kaskadami żądań sieciowych między serwerem a klientem, które sprawiają, że twoja strona działa bardzo wolno. Gdy aplikacja zaczyna obsługiwać więcej użytkowników z kiepskim połączeniem sieciowym i urządzeniami niskiej jakości, możesz potrzebować generować HTML z twoich komponentów, aby wyświetlać zawartość wcześniej - albo na serwerze, albo podczas budowania. Zmiana w celu uruchamiania części kodu na serwerze lub podczas budowania może być bardzo trudna.

**Problemy te nie są specyficzne tylko dla Reacta. Dlatego Svelte korzysta z SvelteKit, Vue z Nuxt itp.** Aby samodzielnie rozwiązać te problemy, będziesz musieć zintegrować swój bundler z bibliotekami do nawigacji i do pobierania danych. Nie jest trudno uzyskać początkową działającą konfigurację, ale istnieje wiele niuansów związanych z tworzeniem aplikacji, która ładuje się szybko nawet w miarę jej wzrostu. Będziesz chcieć przesłać minimalną ilość kodu aplikacji, ale zrób to w jednym cyklu klient-serwer, równolegle z danymi wymaganymi do wygenerowania strony. Prawdopodobnie zależy ci, aby strona była interaktywna jeszcze przed uruchomieniem kodu JavaScript, wspierając tym samym progresywne ulepszanie (ang. _progressive enhancement_). Możesz chcieć generować folder w pełni statycznych plików HTML dla swoich stron marketingowych, które można hostować w dowolnym miejscu i wciąż będą działać nawet przy wyłączonym JavaScripcie. Budowanie tych funkcji samodzielnie wymaga konkretnej pracy.

**Wymienione tu frameworki Reacta, rozwiązują te problemy, bez dodatkowej pracy z twojej strony.** Pozwalają rozpocząć od bardzo podstawowej konfiguracji, a następnie rozwijać aplikację zgodnie z twoimi potrzebami. Każdy framework Reacta ma swoją społeczność, co ułatwia znalezienie odpowiedzi na pytania i aktualizację narzędzi. Frameworki te również nadają strukturę twojemu kodowi, pomagając tobie i innym zachować kontekst i umiejętności pomiędzy różnymi projektami. Inaczej, korzystając z niestandardowego rozwiązania, łatwiej jest utknąć na niewspieranych wersjach zależności i w zasadzie skończyć tworząc swój własny framework, bez społeczności i sposobów ulepszeń (i jeśli będzie on w jakiś sposób podobny do tych, które stworzyliśmy wcześniej, będzie on bardziej chaotycznie zaprojektowany).

Jeżeli to wciąż cię nie przekonuje albo twoja aplikacja posiada nietypowe ograniczenia, które nie są dobrze obsługiwane przez te frameworki i chcesz stworzyć własne niestandardowe rozwiązanie, nie będziemy cię powstrzymywać — śmiało, działaj! Pobierz `react` i `react-dom` z npm, skonfiguruj swój własny proces kompilacji za pomocą bundlera, takiego jak [Vite](https://vitejs.dev/) lub [Parcel](https://parceljs.org/), a następnie dodawaj inne narzędzia, gdy będą ci potrzebne, np. do nawigacji, statycznego generowania lub renderowania po stronie serwera i inne.
</DeepDive>

## Nowoczesne frameworki reactowe {/*bleeding-edge-react-frameworks*/}

W trakcie eksplorowania możliwości dalszego udoskonalania Reacta zauważyliśmy, że największą szansą, aby pomóc użytkownikom Reacta w budowaniu lepszych aplikacji jest jego ścisła integracja z frameworkami, zwłaszcza pod względem nawigacji, bundlowania i technologii serwerowych. Zespół Next.js zgodził się na współpracę z nami w zakresie badania, rozwoju, integracji i testowania funkcjonalności Reacta z pogranicza frameworków, takich jak [React Server Components.](/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)

Z każdym dniem, funkcjonalności te stają się coraz bliższe użycia w wersji produkcyjnej, a my prowadzimy rozmowy z deweloperami innych bundlerów i frameworków w sprawie ich integracji. Mamy nadzieję, że za rok lub dwa, wszystkie wymienione tu frameworki będą w pełni obsługiwać te funkcjonalności. Jeśli tworzysz framework i interesuje cię współpraca z nami w celu przetestowania tych funkcji, daj nam znać!

### Next.js (App Router) {/*nextjs-app-router*/}

**[App Router z Next.js](https://nextjs.org/docs) to przeprojektowanie interfejsów API z Next.js, mające na celu zrealizowanie wizji architektury full-stack, przyświecającej zespołowi Reacta.** Pozwala on na pobieranie danych w komponentach asynchronicznych, które uruchamiają się na serwerze lub nawet podczas procesu budowy.

Next.js jest rozwijane przez [Vercel](https://vercel.com/). Możesz [wdrożyć aplikację Next.js](https://nextjs.org/docs/app/building-your-application/deploying) na dowolny hosting wspierający Node.js lub rozwiązania chmurowe (ang. _serverless_), a nawet na własny serwer. Next.js obsługuje również [eksport statyczny (ang. _static export_)](https://nextjs.org/docs/app/building-your-application/deploying/static-exports), który nie wymaga serwera.

<DeepDive>

#### Which features make up the React team’s full-stack architecture vision? {/*which-features-make-up-the-react-teams-full-stack-architecture-vision*/}

Next.js's App Router bundler fully implements the official [React Server Components specification](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md). This lets you mix build-time, server-only, and interactive components in a single React tree.

For example, you can write a server-only React component as an `async` function that reads from a database or from a file. Then you can pass data down from it to your interactive components:

```js
// This component runs *only* on the server (or during the build).
async function Talks({ confId }) {
  // 1. You're on the server, so you can talk to your data layer. API endpoint not required.
  const talks = await db.Talks.findAll({ confId });

  // 2. Add any amount of rendering logic. It won't make your JavaScript bundle larger.
  const videos = talks.map(talk => talk.video);

  // 3. Pass the data down to the components that will run in the browser.
  return <SearchableVideoList videos={videos} />;
}
```

Next.js's App Router also integrates [data fetching with Suspense](/blog/2022/03/29/react-v18#suspense-in-data-frameworks). This lets you specify a loading state (like a skeleton placeholder) for different parts of your user interface directly in your React tree:

```js
<Suspense fallback={<TalksLoading />}>
  <Talks confId={conf.id} />
</Suspense>
```

Server Components and Suspense are React features rather than Next.js features. However, adopting them at the framework level requires buy-in and non-trivial implementation work. At the moment, the Next.js App Router is the most complete implementation. The React team is working with bundler developers to make these features easier to implement in the next generation of frameworks.

</DeepDive>
