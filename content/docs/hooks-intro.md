---
id: hooks-intro
title: Wprowadzenie do hooków
permalink: docs/hooks-intro.html
next: hooks-overview.html
---

*Hooki* są nowym dodatkiem w Reakcie 16.8. Pozwalają one używać stanu i innych funkcjonalności Reacta, bez użycia klas.

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Zadeklaruj nową zmienną stanu, którą nazwiemy „count”
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Naciśnięto {count} razy</p>
      <button onClick={() => setCount(count + 1)}>
        Naciśnij mnie
      </button>
    </div>
  );
}
```

Funkcja `useState` jest pierwszym „hookiem”, o którym będziemy się uczyć. Przykład ten jest jednak zaledwie zwiastunem. Nie przejmuj się, jeżeli nie ma to jeszcze większego sensu!

**[W kolejnym rozdziale](/docs/hooks-overview.html) możesz rozpocząć naukę o hookach.** Tutaj wyjaśnimy, dlaczego dodaliśmy hooki do Reacta i w jaki sposób pomogą ci one w pisaniu wspaniałych aplikacji.

>Uwaga
>
>React 16.8.0 jest pierwszą wersją, która wspiera hooki. Podczas aktualizacji nie zapomnij zaktualizować wszystkich paczek, w tym React DOM. 
>React Native wspiera hooki [od wersji 0.59](https://reactnative.dev/blog/2019/03/12/releasing-react-native-059).

## Wprowadzenie wideo {#video-introduction}

Podczas konferencji „React Conf 2018” Sophie Alpert i Dan Abramov zaprezentowali po raz pierwszy hooki. Następnie Ryan Florence zademonstrował, jak przepisać swoją aplikację, by móc ich używać. Wideo z konferencji zamieściliśmy poniżej:

<br>

<iframe width="650" height="366" src="//www.youtube.com/embed/dpw9EHDh2bM" frameborder="0" allowfullscreen></iframe>

## Bez krytycznych zmian {#no-breaking-changes}

Zanim przejdziemy dalej, zauważ że hooki są:

* **Całkowicie opcjonalne.** Możesz wypróbować hooki w kilku komponentach, bez przepisywania istniejącego kodu. Jeżeli jednak nie masz ochoty, nie musisz ich jeszcze stosować ani uczyć się o nich.
* **100% kompatybilne wstecznie.** Hooki nie zawierają żadnych zmian, które mogłyby zepsuć istniejący kod.
* **Dostępne już teraz.** Hooki są dostępne od wersji 16.8.0.

**Nie ma planów na usunięcie klas z Reacta.** Możesz przeczytać o strategii stopniowego wdrażania hooków w [kolejnym podrozdziale](#gradual-adoption-strategy) tej strony.

**Hooki nie zastępują twojej wiedzy na temat Reacta.** Zamiast tego wprowadzają bardziej bezpośredni interfejs API dla mechanizmów Reacta, które już znasz: właściwości (ang. *props*), stanu, kontekstu, referencji (ang. *refs*) i cyklu życia (ang. *lifecycle*). Jak pokażemy dalej, hooki pozwalają też na łączenie ich w nowy, niezwykle skuteczny sposób.

**Jeżeli chcesz rozpocząć naukę o hookach, [przejdź od razu do kolejnego rozdziału!](/docs/hooks-overview.html)** Możesz też kontynuować lekturę tego, aby dowiedzieć się, dlaczego w ogóle dodaliśmy hooki, a także w jaki sposób będziemy je teraz stosować, bez potrzeby przepisywania naszych aplikacji.

## Motywacja {#motivation}

Hooki rozwiązują wiele, pozornie niepowiązanych ze sobą, problemów Reacta, na które natknęliśmy się podczas ponad pięciu lat pisania i utrzymywania dziesiątek tysięcy komponentów. Nie ważne, czy dopiero uczysz się Reacta, używasz go na co dzień, czy nawet preferujesz inną bibliotekę (o podobnym, komponentowym modelu działania) - możliwe, że natknąłeś się na część tych problemów.

### Współdzielenie logiki związanej ze stanem pomiędzy komponentami jest trudne {#its-hard-to-reuse-stateful-logic-between-components}

React nie oferuje sposobu na „dołączenie” powtarzalnego zachowania do komponentu (na przykład, połączenie go z magazynem (ang. *store*)). Jeżeli pracujesz z Reactem już jakiś czas, najprawdopodobniej znasz wzorce, takie jak [właściwości renderujące (ang. *render props*)](/docs/render-props.html) i [komponenty wyższego rzędu (ang. *higher-order components*)](/docs/higher-order-components.html), które próbują rozwiązać ten problem. Wzorce te wymagają jednak modyfikacji komponentów w momencie ich użycia, co może być niewygodne i powodować, że kod jest trudniejszy w odbiorze. Jeśli spojrzysz na typową aplikację napisaną w Reakcie przy pomocy narzędzia React DevTools, najprawdopodobniej ujrzysz tam „piekło” komponentów opakowujących (ang. *wrapper component*), dostawców (ang. *providers*), konsumentów (ang. *consumers*), komponentów wyższego rzędu, właściwości renderujących i innych abstrakcji. Moglibyśmy, co prawda, [filtrować je w DevToolsach](https://github.com/facebook/react-devtools/pull/503), ale to tylko wskazuje na głębszy problem: React potrzebuje lepszego podstawowego mechanizmu do współdzielenia logiki związanej ze stanem.

Korzystając z hooków, możesz wydzielić logikę związaną ze stanem z komponentu. Dzięki czemu, nie wymaga on zależności przy testowaniu i jest łatwy w ponownym wykorzystaniu. **Hooki pozwalają na ponowne użycie logiki związanej ze stanem, bez konieczności zmiany hierarchii komponentów.** Sprawia to, że dzielenie się hookami pomiędzy wieloma komponentami lub ze społecznością jest proste.

Omówimy ten temat szerzej w rozdziale pt. [„Tworzenie własnych hooków”](/docs/hooks-custom.html).

### Złożone komponenty stają się trudne do zrozumienia {#complex-components-become-hard-to-understand}

Często musieliśmy utrzymywać komponenty, które z początku proste, urosły do rangi niemożliwego do utrzymania bałaganu logiki związanej ze stanem i efektów ubocznych (ang. *side effects*). Każda metoda cyklu życia zawiera zwykle mieszankę niepowiązanej ze sobą logiki. Na przykład, komponenty mogą pobierać dane w `componentDidMount` i `componentDidUpdate`. Jednakże metoda `componentDidMount` może też zawierać logikę, która tworzy obserwatory zdarzeń (ang. *event listeners*). Następnie są one czyszczone w `componentWillUnmount`. Wzajemnie powiązany kod zostaje podzielony pomiędzy różne metody, a z kolei zupełnie niezwiązany ze sobą kod trafia do jednej. Sprzyja to niekonsekwencji i popełnianiu błędów.

Wielokrotnie zdarza się, że nie ma możliwości rozbicia tych komponentów na mniejsze części, ponieważ logika związana ze stanem jest już wszędzie. Trudno jest też je testować. Jest to jeden z powodów, dla których wielu woli połączyć Reacta z zewnętrzną biblioteką do zarządzania stanem. To jednak często wprowadza zbyt wiele abstrakcji, zmusza do skakania pomiędzy plikami i utrudnia ponowne wykorzystanie komponentów.

Aby rozwiązać ten problem, **hooki pozwalają podzielić komponent na mniejsze funkcje, bazując na powiązanych ze sobą częściach (takich jak tworzenie subskrypcji czy pobieranie danych)**, zamiast wymuszać sztuczny podział, związany z metodami cyklu życia. Ewentualnie, aby uczynić zachowanie komponentu bardziej przewidywalnym, możesz też dzięki hookom oddelegować zarządzanie lokalnym stanem komponentu do reduktora (ang. *reducer*).

Szerzej omówimy to w rozdziale [Używanie hooka efektów](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns).

### Klasy dezorientują zarówno ludzi, jak i maszyny {#classes-confuse-both-people-and-machines}

<<<<<<< HEAD
Oprócz tego, że przez klasy trudniej jest ponownie wykorzystać i organizować kod, odkryliśmy, że mogą one również stanowić dużą przeszkodę w nauce Reacta. Trzeba przecież rozumieć, jak działa `this` w JavaScripcie - a działa on tu zupełnie inaczej niż w większości języków programowania. Trzeba pamiętać o wiązaniu (ang. *bind*) funkcji obsługi zdarzeń (ang. *event handlers*). Bez, wciąż niepotwierdzonych, [propozycji składni](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/) kod jest bardzo rozwlekły. Ludzie generalnie nie mają problemu ze zrozumieniem właściwości, stanu i kierunku przepływu danych z góry do dołu, a jednak klasy wciąż stanowią pewne wyzwanie. Wybór pomiędzy funkcyjnymi a klasowymi komponentami jest często przyczyną sporów, nawet pomiędzy doświadczonymi programistami Reacta.
=======
In addition to making code reuse and code organization more difficult, we've found that classes can be a large barrier to learning React. You have to understand how `this` works in JavaScript, which is very different from how it works in most languages. You have to remember to bind the event handlers. Without [ES2022 public class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields), the code is very verbose. People can understand props, state, and top-down data flow perfectly well but still struggle with classes. The distinction between function and class components in React and when to use each one leads to disagreements even between experienced React developers.
>>>>>>> 26caa649827e8f8cadd24dfc420ea802dcbee246

Ponadto, React jest dostępny od około pięciu lat i chcielibyśmy mieć pewność, że pozostanie on tak samo istotny przez kolejne pięć. Jak pokazały biblioteki: [Svelte](https://svelte.dev/), [Angular](https://angular.io/), [Glimmer](https://glimmerjs.com/) i inne, [kompilacja komponentów z wyprzedzeniem (ang. *ahead-of-time*)](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) ma ogromny potencjał. Szczególnie jeśli nie jest ograniczona tylko do szablonów. Niedawno eksperymentowaliśmy z [wyliczaniem wartości komponentów](https://github.com/facebook/react/issues/7323) z użyciem [Prepacka](https://prepack.io/) i wstępnie zaobserwowaliśmy obiecujące rezultaty. Odkryliśmy jednak, że komponenty klasowe mogą zachęcić do nieumyślnego stosowania pewnych wzorców, które spowodują spowolnienie tych optymalizacji. Klasy już teraz stanowią problem dla naszych narzędzi programistycznych. Na przykład, nie za dobrze się minifikują i często zawodzi przez nie „gorące przeładowanie” (ang. hot reloading). Chcemy przedstawić interfejs API, który zwiększy prawdopodobieństwo tego, że kod będzie optymalizowany.

Aby rozwiązać te problemy, **Hooki pozwalają na korzystanie z większej liczby funkcjonalności Reacta, bez użycia klas.** Koncepcyjnie, komponentom reactowym zawsze bliżej było do funkcji. Hooki zapewniają dostęp do funkcji bez poświęcania praktycznej natury Reacta. Hooki zapewniają dostęp do imperatywnych „furtek” i nie wymagają nauki skomplikowanych technik programowania funkcjonalnego lub reaktywnego.

>Przykłady
>
>Rozdział pt. [„Hooki w pigułce”](/docs/hooks-overview.html) jest dobrym miejscem, by zacząć naukę o hookach

## Strategia Stopniowego Wdrażania {#gradual-adoption-strategy}

>**TLDR: Nie ma planów na usunięcie klas z Reacta.**

Zdajemy sobie sprawę, że programiści Reacta są skupieni na dostarczaniu produktów i nie mają czasu przyglądać się każdemu nowemu interfejsowi API, który jest wypuszczany. Hooki są wielką nowością i być może lepiej będzie zaczekać na więcej przykładów i poradników, zanim rozważysz ich naukę lub wdrożenie.

Rozumiemy też, że przy dodawaniu do Reacta nowego, podstawowego mechanizmu poprzeczka została postawiona niezwykle wysoko. Dla zainteresowanych przygotowaliśmy [szczegółowy RFC](https://github.com/reactjs/rfcs/pull/68), który dokładnie zgłębia nasze motywy oraz rzuca dodatkowe światło na konkretne decyzje projektowe i obecny stan techniki.

**Co najważniejsze, hooki działają równolegle z istniejącym kodem, więc możesz wdrażać je stopniowo.** Nie ma pośpiechu, aby migrować kod do hooków. Zalecamy unikanie „wielkiego przepisywania”, szczególnie dla istniejących, skomplikowanych komponentów klasowych. Potrzeba delikatnie przestawić myślenie, aby zacząć „myśleć hookami”. Z naszego doświadczenia wynika, że najlepiej poćwiczyć używanie hooków na nowych, niekrytycznych komponentach i upewnić się, że wszyscy członkowie zespołu czują się z nimi komfortowo. Po wypróbowaniu hooków, prosimy - [prześlij nam opinię](https://github.com/facebook/react/issues/new). Zarówno pozytywną, jak i negatywną.

Chcielibyśmy, żeby hooki objęły wszystkie możliwe przypadki użycia klas, ale **w możliwej do przewidzenia przyszłości, będziemy kontynuować wsparcie komponentów klasowych.** W Facebooku mamy dziesiątki tysięcy komponentów napisanych jako klasy i zdecydowanie nie planujemy ich przepisywania. Zamiast tego zaczynamy używać hooków w nowym kodzie, równolegle do klas.

## Najczęściej zadawane pytania {#frequently-asked-questions}

Przygotowaliśmy rozdział pt. [„Hooki - FAQ”](/docs/hooks-faq.html), w którym odpowiedzieliśmy na najczęściej zadawane pytania.

## Kolejne kroki {#next-steps}

Po przeczytaniu tego rozdziału powinien ukształtować ci się obraz tego, jakie problemy rozwiązują hooki, ale wiele szczegółów jest jeszcze prawdopodobnie niejasnych. Nie martw się! **Przejdźmy do [następnego rozdziału](/docs/hooks-overview.html), gdzie zaczniemy naukę o hookach na przykładach.**
