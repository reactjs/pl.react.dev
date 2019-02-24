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

**Możesz rozpocząć naukę o Hookach [na następnej stronie](/docs/hooks-overview.html).** Tutaj wyjaśnimy dlaczego dodaliśmy Hooki do Reacta i w jaki sposób pomogą ci one w pisaniu wspaniałych aplikacji.

>Notka
>
>React 16.8.0 jest pierwszą wersją, która wspiera Hooki. Podczas akutalizacji nie zapomnij zaktualizować wszystkich paczek, w tym React DOM. React Native będzie wspierał Hooki w kolenyjm, stabilnym wydaniu.

## Wprowadzenie wideo {#video-introduction}

Podczas React Conf 2018 Sophie Alpert i Dan Abramov zaprezentowali Hooki. Następnie Ryan Florence zademenstrował, jak przepisać (@todo refactor?) aplikację, by móc ich używać. Zobacz wideo tutaj:

<br>

<iframe width="650" height="366" src="//www.youtube.com/embed/dpw9EHDh2bM" frameborder="0" allowfullscreen></iframe>

## No Breaking Changes {#no-breaking-changes} (@todo)

Zanim zaczniemy, zauważ że Hooki są:

* **Stosowane całkowicie wedle własnego uznania (@todo opt-in?).** Możesz zacząć używać Hooków w kilku komponentach, bez przepisywania istniejącego kodu. Jeżeli jednak nie masz ochoty, nie musisz ich jeszcze stosować, ani uczyć się o nich. 
* **100% wstecznie kompatybilne.** Hooki nie zawierają żadnych zmian, które mogłyby zepsuć istniejący kod.
* **Dostępne już teraz.** Hooki są dostępne wraz z wersją v16.8.0.

**Nie ma planów, na usunięcie klas z Reacta.**. Możesz przeczytać o strategii stopniowego wdrażania Hooków w [kolejnym podrozdziale](#gradual-adoption-strategy) tej strony.

**Hooki nie zastępują twojej wiedzy na temat Reacta.** Zamiast tego wprowadzają bardziej bezpośredni interfejs API dla konceptów Reacta, które już znasz: atrybutów, stanu, kontekstu, refów (@todo refs?) i cyklu życia (ang. lifecycle). Jak pokażemy dalej, Hooki pozwalają też na łączenie ich w nowy, niezwykle skuteczny sposób.

**Jeżeli chcesz rozpocząć naukę o Hookach, [przejdź od razu do następnej strony!](/docs/hooks-overview.html)** Możesz też kontyunować lekturę tej strony, aby dowiedzieć się, dlaczego dodaliśmy Hooki, a także, jak będziemy ich używać, bez potrzeby przepisywania naszych aplikacji.

## Motywacja {#motivation}

Hooki rozwiązują wiele pozornie niepowiązanych ze sobą problemów Reacta, na które natknęliśmy się podczas ponad pięciu lat pisania i utrzymywania dziesiątek tysięcy komponentów. Nie ważne, czy dopiero uczysz się Reacta, używasz go na co dzień, czy nawet preferujesz inną bibliotekę (o podobnym, komponentowym modelu działania), możliwe, że natknąłeś się na część tych problemów.

### Ponowne użycie stanowej logiki pomiędzy komponentami jest trudne {#its-hard-to-reuse-stateful-logic-between-components} (@todo)

React nie oferuje sposobu na "dołączenie" powtarzalnego zachowania do komponentu (na przykład, połączenie go z magazynem (ang. *store*)). Jeżeli pracujesz z Reactem już jakiś czas, najprawdopodobniej znasz wzorce, takie jak [właściwość render (ang. *render props*)](/docs/render-props.html) i [komponenty wyższego rzędu (ang. *higher-order components*)](/docs/higher-order-components.html), które próbują rozwiązać ten problem. Wzorce te wymagają jednak  modyfikacji komponentów, w momencie ich użycia, co może być niewygodne i powodować, że kod jest trudniejszy w odbiorze. Jeśli spojrzysz na typową aplikację napisaną w Reakcie, w React DevToolsach, najprawdopodobniej ujrzysz tam "piekło" komponentów opakowujących (ang. *wrapper component*), otoczonych warstwami dostawców (ang. *providers*), konsumentów (ang. *consumers*), komponentów wyższego rzędu, właściwości render i innych abstrakcji. Moglibyśmy, co prawda, [filtrować je w DevToolsach](https://github.com/facebook/react-devtools/pull/503), ale to tylko wskazuje na głębszy problem: React potrzebuje lepszego mechanizmu do współdzielenia stanowej logiki.

Dzięki Hookom, możesz wydzielić stanową logikę z kompnentu, dzięki czemu może być on niezależnie testowany, a także wieloktrotnie używany. **Hooki pozwalają na ponowne użycie stanowej logiki, bez konieczności zmiany hierarchi komponentów.** Sprawia to, że dzielenie się Hookami pomiędzy wieloma komponentami lub ze społecznością jest proste.

Omówimy ten temat szerzej w rozdziale [Tworzenie własnych Hooków](/docs/hooks-custom.html).

### Złożone komponenty stają się trudne do zrozumienia {#complex-components-become-hard-to-understand}

Często musieliśmy utrzymywać kompoonenty, które z początku proste, urosły do rangi nieutrzymywalnego bałaganu stanowej logiki i efektów ubocznych (ang. *side effects*).

Każda metoda cyklu życia zawiera zwykle mieszankę niepowiązanej ze sobą logiki. Na przykład, komponenty mogą pobierać dane w `componentDidMount` i `componentDidUpdate`. Jednakże metoda `componentDidMount` może także zawierać logikę, która tworzy słuchaczy zdarzeń, a następnie są oni czyszczeni w `componentWillUnmount`. Wzajemnie powiązany kod, który zmienia się razem zostaje podzielony, a zupełnie niepowiązany kod trafia do jednej metody. Otwiera to zbyt wielkie możliwości, na wprowadzenie błędów i niekonsekwencji.

Wielokrotnie zdarza się, że nie ma możliwości rozbicia tych kompoonentów na mniejsze części, ponieważ stanowa logika jest już wszędzie. Trudno jest też je testować. Jest to jeden z powodów, dla któych wielu woli połączyć Reacta z zewnętrzną biblioteką do zarządzania stanem. To jednak często wprowadza zbyt wiele abstrakcji, co zmusza do skakania pomiędzy plikami i utrudnia ponowne użycie komponentów.

Aby rozwiązać ten problem, **Hooki pozwalają podzielić komponent na mniejsze funkcje, bazując na powiązanych ze sobą częściach (takich jak tworzenie subskrypcji lub pobieranie danych)**, zamiast wymuszać podział związany z metodami cyklu życia. Opcjonalnie, możesz też oddelgować zarządzanie lokalnym stanem komponentu do reduktora, aby uczynić to bardziej przewidywalnym.

Omówimy to szerzej w rozdziale [Używanie Hooka Efektu](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns).

### Klasy dezorientują zarówno ludzi, jak i maszyny {#classes-confuse-both-people-and-machines}

Oprócz tego, że jest przez nie trudniej pownownie użyć i organizować kod, odkryliśmy, że klasy mogą stanowić dużą przeszkod w nauce Reacta. Musisz rozumieć, jak działa `this` w JavaScrypcie, a działa on tu zupełnie inaczej, niż w większości języków programowania. Musisz pamiętać o wiązaniu (ang. *bind*) funkcji obsługi zdarzeń (ang. *event handlers*). Bez nieostatecznych [propozycji składni](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/) kod jest bardzo rozwklekły. Ludzie mogą doskonale rozumieć właściwości (ang. *props*), stan i kierunek przepływu danych z góry, do dołu, a jednak klasy wciąż mogą sprawiać im problem. Rozróżnienie pomiędzy funkcyjnymi, a klasowymi komponentami, a także kiedy używać których, jest często przyczyną sporów, nawet pomiędzy doświadczonymi programistami Reacta.

Ponadto, React jest dostępny od około pięciu lat i chcemy mieć pewność, że pozostanie on istotny przez kolejne pięć. Jak pokazał [Svelte](https://svelte.technology/), [Angular](https://angular.io/), [Glimmer](https://glimmerjs.com/) i inni [kompilacja komponentów z wyprzedzeniem (ang. *ahead-of-time*)](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) ma ogromny potencjał.
Szczególnie jeśli nie jest ograniczona tylko do szablonów. Niedawno eksperymentowaliśmy z [wyliczaniem wartości komponentów](https://github.com/facebook/react/issues/7323) z użyciem [Prepacka](https://prepack.io/) i zaobserwowaliśmy wstępnie obiecujące rezultaty. Odkryliśmy jednak, że komponenty klasowe mogą zachęcić do nieumyślnego stosowania pewnych wzorców, które spowodują spowolnienie tych optymalizacji. Klasy stanowią problem także dla naszych narzędzi, także dzisiaj. Na przykład, nie za dobrze się minifikują, a gorące przeładowanie (ang. *hot reloading*) jest niewiarygodne i często zrywane. Chcemy przedstawić interfejs API, który zwiększy prawdopodobieństwo tego, że kod będzie optymalizowany.

Aby rozwiązać te problemy, **Hooki pozwalają na korzystanie z większej liczby funkcjonalności Reacta, bez użycia klas.** Koncepcyjnie, komponentom Reactowym zawsze bliżej było do funkcji. Hooki zapewniają dostęp do funkcji, bez poświęcania praktycznej natury Reacta. Hooki zapewniają dostęp do imperatywnych furtek i nie wymagają nauki skomplikowanych technik programowania funkcjonalnego lub reaktywnego.

>Przykłady
>
>Rozdział [Hooki w pigułce](/docs/hooks-overview.html) jest dobrym miejscem, by zacząć naukę o Hookach

## Strategia Stopniowego Wdrażania {#gradual-adoption-strategy}

>**TLDR: Nie planów na usunięcie klas z Reacta.**

Zdajemy sobie sprawę, że programiści Reacta są skupieni na dostarczaniu produktów i nie mają czasu przyglądać się każdemu nowemu interfejsowi API, który jest wypuszczany. Hooki są wielką nowością i być może lepiej będzie zaczekać na więcej przykładów i poradników, zanim rozważysz ich naukę lub wdrożenie.

Rozumiemy też, że przy dodawaniu do Reacta nowego, podstawowego mechanizmu, poprzeczka jest postawiona niezwykle wysoko. Dla zainteresowanych, przygotowaliśmy [szczegółowe RFC](https://github.com/reactjs/rfcs/pull/68), które bardziej szczegółówo zgłębia nasze motywy i rzuca dodatkowe światło na konkretne decyzje projektowe i pokrewny stan techniki.

**Co najważniejsze, Hooki działają równolegle z istniejącym kodem, więc możesz wdrażać je stopniowo.** Nie ma pośpiechu, aby migrować kod do Hooków. Zalecamy unikanie "wielkiego przepisywania", szczególnie dla istniejących, skomplikowanych komponentów klasowych. Potrzeba delikatnie przestroić sposób rozumowania, żeby zacząć "myśleć w Hookach". Z naszego doświadczenia wynika, że najlepiej poćwiczyć używanie Hooków na nowych, niekrytycznych komponentach i upewnić się, że wszyscy członkowie zespołu czują się z nimi komfortowo. Po wypróbowaniu Hooków, prosimy; [prześlij nam opinię](https://github.com/facebook/react/issues/new). Zarówno pozytywną, jak i negatywną.

Chcielibyśmy żeby Hooki objęły wszystkie możliwe przypadki użycia klas, ale **w możliwej do przewidzenia przyszłości, będziemy kontynuować wsparcie komponentów klasowych.** W Facebooku mamy dziesiątki tysięcy komponentów napisanych, jako klasy i stanowczo nie planujemy ich przepisywania. Zamiast tego, zaczynamy używać Hooków w nowym kodzie, równolegle do klas.

## Najczęściej zadawane pytania {#frequently-asked-questions}

Przygotowaliśmy rozdział [Hooki - FAQ](/docs/hooks-faq.html), który odpowiada na najczęściej zadawane pytania.

## Kolejne kroki {#next-steps}

Po przeczytaniu tego rodziału powinieneś już wiedzieć, jakie problemy rozwiązują Hooki, ale wiele szczegółów jest prawdpodobnie niejasnych. Nie martw się! **Przejdźmy do [następnego rozdziału](/docs/hooks-overview.html), gdzie zaczniemy naukę o Hookach na przykładach.**
