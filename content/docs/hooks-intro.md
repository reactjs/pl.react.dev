---
id: hooks-intro
title: Wprowadzenie do Hooków
permalink: docs/hooks-intro.html
next: hooks-overview.html
---

*Hooki* są nowym dodatkiem w Reakcie 16.8. Pozwalają one używać stanu i innych funkcjonalności Reacta, bez użycia klas.

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Zadeklaruj nową zmienną stanu, którą nazwiemy "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Funkcja `useState` jest pierwszym "Hookiem", o którym będziemy się uczyć. Przykład ten jest jednak zaledwie zwiastunem. Nie przejmuj się, jeżeli nie ma to jeszcze większego sensu!

**[W kolejnym rozdziale](/docs/hooks-overview.html) możesz rozpocząć naukę o Hookach.** Tutaj wyjaśnimy, dlaczego dodaliśmy Hooki do Reacta i w jaki sposób pomogą ci one w pisaniu wspaniałych aplikacji.

>Notka
>
>React 16.8.0 jest pierwszą wersją, która wspiera Hooki. Podczas aktualizacji nie zapomnij zaktualizować wszystkich paczek, w tym React DOM. React Native będzie wspierał Hooki w kolejnym, stabilnym wydaniu.

## Wprowadzenie wideo {#video-introduction}

Podczas React Conf 2018 Sophie Alpert i Dan Abramov zaprezentowali po raz pierwszy Hooki. Następnie Ryan Florence zademonstrował, jak przepisać swoją aplikację, by móc ich używać. Zobacz wideo tutaj:

<br>

<iframe width="650" height="366" src="//www.youtube.com/embed/dpw9EHDh2bM" frameborder="0" allowfullscreen></iframe>

## Bez krytycznych zmian {#no-breaking-changes}

Zanim przejdziemy dalej, zauważ że Hooki są:

* **Stosowane całkowicie wedle własnego uznania.** Możesz wypróbować Hooki w kilku komponentach, bez przepisywania istniejącego kodu. Jeżeli jednak nie masz ochoty, nie musisz ich jeszcze stosować, ani uczyć się o nich.
* **100% wstecznie kompatybilne.** Hooki nie zawierają żadnych zmian, które mogłyby zepsuć istniejący kod.
* **Dostępne już teraz.** Hooki są dostępne wraz z wersją v16.8.0.

**Nie ma planów na usunięcie klas z Reacta.**. Możesz przeczytać o strategii stopniowego wdrażania Hooków w [kolejnym podrozdziale](#gradual-adoption-strategy) tej strony.

**Hooki nie zastępują twojej wiedzy na temat Reacta.** Zamiast tego wprowadzają bardziej bezpośredni interfejs API dla koncepcji Reacta, które już znasz: właściwości (ang. *props*), stanu, kontekstu, refów i cyklu życia (ang. *lifecycle*). Jak pokażemy dalej, Hooki pozwalają też na łączenie ich w nowy, niezwykle skuteczny sposób.

**Jeżeli chcesz rozpocząć naukę o Hookach, [przejdź od razu do kolejnego rozdziału!](/docs/hooks-overview.html)** Możesz też kontynuować lekturę tego, aby dowiedzieć się, dlaczego w ogóle dodaliśmy Hooki. A także, w jaki sposób będziemy je teraz stosować, bez potrzeby przepisywania naszych aplikacji.

## Motywacja {#motivation}

Hooki rozwiązują wiele, pozornie niepowiązanych ze sobą problemów Reacta, na które natknęliśmy się podczas ponad pięciu lat pisania i utrzymywania dziesiątek tysięcy komponentów. Nie ważne, czy dopiero uczysz się Reacta, używasz go na co dzień, czy nawet preferujesz inną bibliotekę (o podobnym, komponentowym modelu działania), możliwe, że natknąłeś się na część tych problemów.

### Współdzielenie logiki związanej ze stanem pomiędzy komponentami jest trudne {#its-hard-to-reuse-stateful-logic-between-components}

React nie oferuje sposobu na "dołączenie" powtarzalnego zachowania do komponentu (na przykład, połączenie go z magazynem (ang. *store*)). Jeżeli pracujesz z Reactem już jakiś czas, najprawdopodobniej znasz wzorce, takie jak [właściwość render (ang. *render props*)](/docs/render-props.html) i [komponenty wyższego rzędu (ang. *higher-order components*)](/docs/higher-order-components.html), które próbują rozwiązać ten problem. Wzorce te wymagają jednak  modyfikacji komponentów, w momencie ich użycia, co może być niewygodne i powodować, że kod jest trudniejszy w odbiorze. Jeśli spojrzysz na typową aplikację napisaną w Reakcie, w React DevToolsach, najprawdopodobniej ujrzysz tam "piekło" komponentów opakowujących (ang. *wrapper component*); dostawców (ang. *providers*), konsumentów (ang. *consumers*), komponentów wyższego rzędu, właściwości render i innych abstrakcji. Moglibyśmy, co prawda, [filtrować je w DevToolsach](https://github.com/facebook/react-devtools/pull/503), ale to tylko wskazuje na głębszy problem: React potrzebuje lepszego podstawowego mechanizmu do współdzielenia logiki związanej ze stanem.

Korzystając z Hooków, możesz wydzielić logikę związaną ze stanem z komponentu. Dzięki czemu, nie wymaga on zależności przy testowaniu i jest łatwy w ponownym wykorzystaniu. **Hooki pozwalają na ponowne użycie logiki związanej ze stanem, bez konieczności zmiany hierarchii komponentów.** Sprawia to, że dzielenie się Hookami pomiędzy wieloma komponentami lub ze społecznością jest proste.

Omówimy ten temat szerzej w rozdziale [Tworzenie własnych Hooków](/docs/hooks-custom.html).

### Złożone komponenty stają się trudne do zrozumienia {#complex-components-become-hard-to-understand}

Często musieliśmy utrzymywać komponenty, które z początku proste, urosły do rangi niemożliwego do utrzymania bałaganu logiki związanej ze stanem i efektów ubocznych (ang. *side effects*). Każda metoda cyklu życia zawiera zwykle mieszankę niepowiązanej ze sobą logiki. Na przykład, komponenty mogą pobierać dane w `componentDidMount` i `componentDidUpdate`. Jednakże metoda `componentDidMount` może też zawierać logikę, która tworzy słuchaczy zdarzeń. Następnie są oni czyszczeni w `componentWillUnmount`. Wzajemnie powiązany kod zostaje podzielony pomiędzy różne metody, a z kolei zupełnie niezwiązany ze sobą kod trafia do jednej. Otwiera to zbyt wielkie pole do błędów i niekonsekwencji.

Wielokrotnie zdarza się, że nie ma możliwości rozbicia tych komponentów na mniejsze części, ponieważ logika związana ze stanem jest już wszędzie. Trudno jest też je testować. Jest to jeden z powodów, dla których wielu woli połączyć Reacta z zewnętrzną biblioteką do zarządzania stanem. To jednak często wprowadza zbyt wiele abstrakcji, zmusza do skakania pomiędzy plikami i utrudnia ponowne wykorzystanie komponentów.

Aby rozwiązać ten problem, **Hooki pozwalają podzielić komponent na mniejsze funkcje, bazując na powiązanych ze sobą częściach (takich jak tworzenie subskrypcji, czy pobieranie danych)**, zamiast wymuszać sztuczny podział, związany z metodami cyklu życia. Ewentualnie, aby uczynić to bardziej przewidywalnym, możesz też dzięki nim oddelegować zarządzanie lokalnym stanem komponentu do reduktora.

Szerzej omówimy to w rozdziale [Używanie Hooka Efektu](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns).

### Klasy dezorientują zarówno ludzi, jak i maszyny {#classes-confuse-both-people-and-machines}

Oprócz tego, że jest przez nie trudniej ponownie wykorzystać i organizować kod, odkryliśmy, że klasy mogą stanowić dużą przeszkodę w nauce Reacta. Musisz rozumieć, jak działa `this` w JavaScripcie - a działa on tu zupełnie inaczej, niż w większości języków programowania. Musisz pamiętać o wiązaniu (ang. *bind*) funkcji obsługi zdarzeń (ang. *event handlers*). Bez wciąż niepotwierdzonych [propozycji składni](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/) kod jest bardzo rozwlekły. Ludzie generalnie nie mają problemu, ze zrozumieniem właściwości, stanu i kierunku przepływu danych z góry, do dołu, a jednak klasy wciąż stanowią pewne wyzwanie. Wybór pomiędzy funkcyjnymi, a klasowymi komponentami, jest często przyczyną sporów, nawet pomiędzy doświadczonymi programistami Reacta.

Ponadto, React jest dostępny od około pięciu lat i chcielibyśmy mieć pewność, że pozostanie on tak samo istotny przez kolejne pięć. Jak pokazał [Svelte](https://svelte.technology/), [Angular](https://angular.io/), [Glimmer](https://glimmerjs.com/) i inni [kompilacja komponentów z wyprzedzeniem (ang. *ahead-of-time*)](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) ma ogromny potencjał. Szczególnie, jeśli nie jest ograniczona tylko do szablonów. Niedawno eksperymentowaliśmy z [wyliczaniem wartości komponentów](https://github.com/facebook/react/issues/7323) z użyciem [Prepacka](https://prepack.io/) i wstępnie zaobserwowaliśmy obiecujące rezultaty. Odkryliśmy jednak, że komponenty klasowe mogą zachęcić do nieumyślnego stosowania pewnych wzorców, które spowodują spowolnienie tych optymalizacji. Klasy już dzisiaj stanowią problem także dla naszych narzędzi programistycznych. Na przykład, nie za dobrze się minifikują, a gorące przeładowanie (ang. *hot reloading*) przez nie często zawodzi. Chcemy przedstawić interfejs API, który zwiększy prawdopodobieństwo tego, że kod będzie optymalizowany.

Aby rozwiązać te problemy, **Hooki pozwalają na korzystanie z większej liczby funkcjonalności Reacta, bez użycia klas.** Koncepcyjnie, komponentom reactowym zawsze bliżej było do funkcji. Hooki zapewniają dostęp do funkcji, bez poświęcania praktycznej natury Reacta. Hooki zapewniają dostęp do imperatywnych furtek i nie wymagają nauki skomplikowanych technik programowania funkcjonalnego lub reaktywnego.

>Przykłady
>
>Rozdział [Hooki w pigułce](/docs/hooks-overview.html) jest dobrym miejscem, by zacząć naukę o Hookach

## Strategia Stopniowego Wdrażania {#gradual-adoption-strategy}

>**TLDR: Nie ma planów na usunięcie klas z Reacta.**

Zdajemy sobie sprawę, że programiści Reacta są skupieni na dostarczaniu produktów i nie mają czasu przyglądać się każdemu nowemu interfejsowi API, który jest wypuszczany. Hooki są wielką nowością i być może lepiej będzie zaczekać na więcej przykładów i poradników, zanim rozważysz ich naukę lub wdrożenie.

Rozumiemy też, że przy dodawaniu do Reacta nowego, podstawowego mechanizmu, poprzeczka jest postawiona niezwykle wysoko. Dla zainteresowanych, przygotowaliśmy [szczegółowe RFC](https://github.com/reactjs/rfcs/pull/68), które szczegółowo zgłębia nasze motywy i rzuca dodatkowe światło na konkretne decyzje projektowe i obecny stan techniki.

**Co najważniejsze, Hooki działają równolegle z istniejącym kodem, więc możesz wdrażać je stopniowo.** Nie ma pośpiechu, aby migrować kod do Hooków. Zalecamy unikanie "wielkiego przepisywania", szczególnie dla istniejących, skomplikowanych komponentów klasowych. Potrzeba delikatnie przestawić myślenie, aby zacząć "myśleć w Hookach". Z naszego doświadczenia wynika, że najlepiej poćwiczyć używanie Hooków na nowych, niekrytycznych komponentach i upewnić się, że wszyscy członkowie zespołu czują się z nimi komfortowo. Po wypróbowaniu Hooków, prosimy; [prześlij nam opinię](https://github.com/facebook/react/issues/new). Zarówno pozytywną, jak i negatywną.

Chcielibyśmy żeby Hooki objęły wszystkie możliwe przypadki użycia klas, ale **w możliwej do przewidzenia przyszłości, będziemy kontynuować wsparcie komponentów klasowych.** W Facebooku mamy dziesiątki tysięcy komponentów napisanych, jako klasy i stanowczo nie planujemy ich przepisywania. Zamiast tego, zaczynamy używać Hooków w nowym kodzie, równolegle do klas.

## Najczęściej zadawane pytania {#frequently-asked-questions}

Przygotowaliśmy rozdział [Hooki - FAQ](/docs/hooks-faq.html), który odpowiada na najczęściej zadawane pytania.

## Kolejne kroki {#next-steps}

Po przeczytaniu tego rozdziału powinieneś już wiedzieć, jakie problemy rozwiązują Hooki, ale wiele szczegółów jest prawdopodobnie niejasnych. Nie martw się! **Przejdźmy do [następnego rozdziału](/docs/hooks-overview.html), gdzie zaczniemy naukę o Hookach na przykładach.**
