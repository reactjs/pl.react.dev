---
id: faq-structure
title: Struktura plików
permalink: docs/faq-structure.html
layout: docs
category: FAQ
---

### Czy istnieje zalecany sposób na strukturyzację projektów w React? {#is-there-a-recommended-way-to-structure-react-projects}

React nie sugeruje, w jaki sposób należy umieścić pliki w folderach. Istnieje jednak kilka popularnych podejść rozpowszechnionych w ekosystemie, które warto rozważyć.

#### Grupowanie plików według funkcjonalności lub ścieżek {#grouping-by-features-or-routes}

Jednym z powszechnych sposobów strukturyzacji projektów jest umieszczenie plików CSS, JS i testów razem w folderach pogrupowanych według funkcjonalności lub ścieżki.

```
common/
  Avatar.js
  Avatar.css
  APIUtils.js
  APIUtils.test.js
feed/
  index.js
  Feed.js
  Feed.css
  FeedStory.js
  FeedStory.test.js
  FeedAPI.js
profile/
  index.js
  Profile.js
  ProfileHeader.js
  ProfileHeader.css
  ProfileAPI.js
```

Definicja „funkcjonalności” nie jest jednoznaczna i od ciebie zależy, jak szczegółowo określisz strukturę. Jeśli nie masz pomysłu na foldery najwyższego poziomu, możesz zapytać użytkowników, z jakich głównych części składa się produkt, aby potem użyć ich modelu mentalnego jako schematu.

#### Grupowanie plików według ich typu {#grouping-by-file-type}

Innym popularnym sposobem strukturyzacji projektów jest grupowanie podobnych plików, na przykład:

```
api/
  APIUtils.js
  APIUtils.test.js
  ProfileAPI.js
  UserAPI.js
components/
  Avatar.js
  Avatar.css
  Feed.js
  Feed.css
  FeedStory.js
  FeedStory.test.js
  Profile.js
  ProfileHeader.js
  ProfileHeader.css
```

Niektórzy idą o krok dalej i w zależności od roli komponentów w aplikacji, umieszczają je w różnych folderach. Na przykład [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) to metodologia projektowania oparta na tej zasadzie. Pamiętaj, że często bardziej produktywne jest traktowanie takich metodologii jako pomocnych przykładów, a nie ścisłych zasad, których należy przestrzegać.

#### Unikaj zbytniego zagnieżdżania {#avoid-too-much-nesting}

Istnieje wiele problemów związanych z głębokim zagnieżdżaniem katalogów w projektach javascriptowych. Trudniej jest zapisać między nimi import względny lub zaktualizować ten import po przeniesieniu plików. O ile nie masz bardzo ważnego powodu do korzystania z głębokiej struktury folderów, rozważ ograniczenie się do maksymalnie trzech lub czterech zagnieżdżeń folderów w jednym projekcie. Oczywiście jest to tylko zalecenie i może nie być odpowiednie dla twojego projektu.

#### Nie myśl nad tym za dużo {#dont-overthink-it}

Jeśli dopiero rozpoczynasz projekt, [nie poświęcaj więcej niż pięć minut](https://en.wikipedia.org/wiki/Analysis_paralysis) na wybór sposobu struktury plików. Wybierz dowolne z powyższych podejść (lub wymyśl własne) i zacznij pisać kod! Prawdopodobnie w trakcie pisania prawdziwego kodu zmienisz podejście jeszcze co najmniej kilka razy.

Jeśli jednak utkniesz, zacznij od przeniesienia wszystkich plików do jednego folderu. W końcu stanie się on na tyle duży, że zechcesz oddzielić niektóre pliki od reszty. Do tego czasu będziesz mieć wystarczającą wiedzę, aby stwierdzić, które pliki najczęściej edytujesz razem. Ogólnie rzecz biorąc, dobrym pomysłem jest trzymanie blisko siebie plików, które często się zmieniają. Zasada ta nazywa się „kolokacją”.

W miarę jak projekty stają się większe, w praktyce często wykorzystują połączenie obu powyższych podejść. Dlatego, zwłaszcza na początku, wybór „właściwego podejścia” nie ma większego znaczenia.
