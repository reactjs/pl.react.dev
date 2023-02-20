---
id: reconciliation
title: Rekoncyliacja
permalink: docs/reconciliation.html
---

<<<<<<< HEAD
Deklaratywność API Reacta sprawia, że nie musisz się martwić, co dokładnie zmienia się przy każdej aktualizacji, dzięki czemu pisanie aplikacji staje się dużo prostsze. Dokładna implementacja nie jest jednak tak oczywista. W tym artykule wyjaśniamy decyzje, które podjęliśmy przy projektowaniu algorytmu różnicującego w Reakcie, mając na celu zapewnienie przewidywalności aktualizacji komponentów przy zachowaniu wysokiej wydajności.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Preserving and Resetting State](https://beta.reactjs.org/learn/preserving-and-resetting-state)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

React provides a declarative API so that you don't have to worry about exactly what changes on every update. This makes writing applications a lot easier, but it might not be obvious how this is implemented within React. This article explains the choices we made in React's "diffing" algorithm so that component updates are predictable while being fast enough for high-performance apps.
>>>>>>> 63c77695a95902595b6c2cc084a5c3650b15210a

## Motywacja {#motivation}

Podczas korzystania z Reacta, w danym momencie możesz potraktować funkcję `render()` jako tworzącą drzewo elementów Reacta. Podczas następnej zmiany stanu bądź aktualizacji właściwości funkcja `render()` zwróci inne drzewo elementów. Zadaniem Reacta jest wtedy opracować wydajny sposób na aktualizację UI, tak by dopasować je do najświeższego drzewa elementów.

Istnieją ogólne rozwiązania algorytmicznego problemu generowania najmniejszej liczby operacji wymaganych do przekształcenia drzew elementów. Jednakże nawet [najlepsze znane algorytmy](https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf) mają złożoność rzędu O(n<sup>3</sup>), gdzie n jest liczbą elementów w drzewie.

Gdybyśmy wykorzystali ten algorytm w Reakcie, wyświetlenie 1000 elementów wymagałoby miliarda porównań. Byłoby to stanowczo zbyt kosztowne. Zamiast tego, React implementuje heurystyczny algorytm o złożoności O(n), bazujący na dwóch założeniach:

1. Dwa elementy różnych typów produkują różne drzewa.
2. Programista może wskazać, które elementy drzewa mogą być stabilne pomiędzy kolejnymi renderowaniami, używając właściwości `key`.

W praktyce te założenia sprawdzają się w prawie wszystkich zastosowaniach.

## Algorytm różnicujący {#the-diffing-algorithm}

Podczas różnicowania dwóch drzew React najpierw porównuje elementy nadrzędne. Dalsze kroki zależą od typów elementów nadrzędnych. 

### Elementy różnych typów {#elements-of-different-types}

Zawsze, gdy elementy nadrzędne różnią się typem, React pozbywa się starego drzewa i buduje nowe od podstaw. Zamiana `<a>` na `<img>`, czy `<Article>` na `<Comment>` lub `<Button>` na `<div>` - każda z tych zmian spowoduje całkowite przebudowanie drzewa.

Gdy React pozbywa się starego drzewa, wszystkie przypisane do niego węzły DOM są niszczone. W instancjach komponentów wywoływane jest `componentWillUnmount()`. Podczas budowania nowego drzewa do DOM-u dodawane są nowe węzły. W instancjach komponentów wywoływane jest `UNSAFE_componentWillMount()`, a następnie `componentDidMount()`. Jakikolwiek stan przypisany do starego drzewa jest bezpowrotnie tracony.

Jakiekolwiek komponenty poniżej elementu nadrzędnego również zostają odmontowane, a ich stan zniszczony. Na przykład, przy zmianie:

```xml
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```
Stary `Counter` zostanie zniszczony i zamontowany zostanie nowy.

>Uwaga:
>
>Ta metoda jest przestarzała i powinno się jej [unikać](/blog/2018/03/27/update-on-async-rendering.html) w nowym kodzie.
>
>- `UNSAFE_componentWillMount()`

### Elementy DOM tego samego typu {#dom-elements-of-the-same-type}

Przy porównywaniu dwóch elementów tego samego typu React patrzy na atrybuty obu elementów, zachowuje stary węzeł i aktualizuje jedynie atrybuty, które tego wymagają.
Na przykład:

```xml
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```

Porównując te dwa elementy, React wie, że należy zmienić jedynie `className` na istniejącym węźle DOM-u.

Aktualizując `style`, React wie również, by aktualizować jedynie te właściwości, które uległy zmianie. Na przykład:

```xml
<div style={{color: 'red', fontWeight: 'bold'}} />

<div style={{color: 'green', fontWeight: 'bold'}} />
```

Przy aktualizacji tych elementów React wie, by zmodyfikować jedynie `color`, a nie również `fontWeight`.

Po obsłużeniu danego węzła DOM-u React rekursywnie wywołuje algorytm na kolejnych potomkach w drzewie.

### Komponenty tego samego typu {#component-elements-of-the-same-type}

Gdy komponent jest aktualizowany, jego instancja pozostaje bez zmian, dzięki czemu stan jest zachowany pomiędzy kolejnymi renderowaniami. React aktualizuje właściwości instancji zgodnie z nowym elementem i wywołuje na niej `UNSAFE_componentWillReceiveProps()`, `UNSAFE_componentWillUpdate()` oraz `componentDidUpdate()`.

Następnie wywołana zostaje metoda `render()`, a algorytm różnicujący sięga dalej w głąb drzewa.

>Uwaga:
>
>Te metody są przestarzałe i powinno się ich [unikać](/blog/2018/03/27/update-on-async-rendering.html) w nowym kodzie.
>
>- `UNSAFE_componentWillUpdate()`
>- `UNSAFE_componentWillReceiveProps()`

### Rekurencja po potomkach {#recursing-on-children}

Podczas rekurencji przez potomstwo (ang. *children*) węzła DOM-u React iteruje po obu drzewach jednocześnie (starym i nowym), generując zmiany, gdy napotka na różnicę.

Na przykład, gdy dodamy element na koniec potomstwa, przejście pomiędzy tymi drzewami działa poprawnie:

```xml
<ul>
  <li>pierwszy</li>
  <li>drugi</li>
</ul>

<ul>
  <li>pierwszy</li>
  <li>drugi</li>
  <li>trzeci</li>
</ul>
```
React dopasuje do siebie drzewa `<li>pierwszy</li>`, dopasuje drzewa `<li>drugi</li>`, następnie napotkawszy różnicę doda drzewo `<li>trzeci</li>`.

Przy naiwnej implementacji algorytmu dodanie elementu na początek będzie miało gorszą wydajność. Na przykład, przejście pomiędzy tymi dwoma drzewami jest mało wydajne:

```xml
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

React dokona zmian przy każdym potomku, gdyż nie jest świadomy, że `<li>Duke</li>` oraz `<li>Villanova</li>` nie uległy zmianie, a jedynie przesunięciu. Może się to okazać problematyczne.

### Klucze {#keys}

W celu rozwiązania powyższego problemu React wprowadził atrybut `key`. Gdy potomstwo posiada klucz (ang. *key*), React używa go przy porównaniu poprzedniego drzewa z nowym.
Na przykład, dodając `key` do poprzedniego przykładu pozbędziemy się problemu z wydajnością: 

```xml
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```
Teraz React wie, że element z kluczem `'2014'` jest nowy, a elementy o kluczach `'2015'` oraz `'2016'` jedynie zmieniły pozycję.

Dobranie stosownego klucza zazwyczaj nie przysparza trudności. Element, który wyświetlamy, może już posiadać unikalny ID, więc klucz może pochodzić bezpośrednio od twoich danych:

```js
<li key={item.id}>{item.name}</li>
```

W przeciwnym wypadku można dodać nowe ID do modelu danych bądź wykorzystać funkcję skrótu (ang. *hash function*) do wygenerowania klucza. Klucz musi być unikalny jedynie względem swego rodzeństwa.

W ostateczności jako klucza można użyć indeksu elementu w tablicy. Rozwiązanie to sprawdzi się, jeśli kolejność elementów w tablicy jest stała; w przypadku zmiennej kolejności różnicowanie będzie mniej wydajne.

W przypadku użycia indeksu jako klucza, zmiany w kolejności elementów tablicy mogą również powodować problemy ze stanem komponentów. Instancje komponentów są aktualizowane bądź nie na podstawie klucza. Jeśli klucz jest indeksem, każda zmiana pozycji elementu w tablicy powoduje zmianę klucza. W rezultacie stan komponentów może zostać zaktualizowany w nieprzewidywalny sposób i powodować trudne do zidentyfikowania błędy.

Na podanym CodePenie można zapoznać się z [przykładowym problemem, jaki stwarza stosowanie indeksów jako kluczy](codepen://reconciliation/index-used-as-key), a z kolei tutaj pokazany jest [sposób, w jaki unikanie indeksów w kluczu rozwiązuje problemy z wstawianiem, sortowaniem oraz zmianą pozycji elementów](codepen://reconciliation/no-index-used-as-key). 

## Kompromisy {#tradeoffs}

Należy pamiętać, że algorytm rekoncyliacji to szczegół implementacyjny. React mógłby ponownie renderować całą aplikację przy każdej akcji; rezultat byłby ten sam.
Dla jasności: przez ponowne renderowanie w tym kontekście rozumiemy wywołanie `render` dla wszystkich komponentów; nie oznacza to, że zostaną one odmontowane i zamontowane ponownie.
Oznacza jedynie zaaplikowanie zmian według reguł, które dotychczas przedstawiliśmy.

Regularnie usprawniamy algorytm heurystyczny, by zoptymalizować wydajność w najczęstszych przypadkach. W aktualnej implementacji możemy wyrazić fakt, iż poddrzewo zmieniło pozycję względem rodzeństwa, nie jesteśmy jednak w stanie wskazać, że zostało bez zmian przeniesione gdzie indziej. Algorytm wymusi ponowne renderowanie całego poddrzewa.

Ponieważ React opiera się na heurystyce, tracimy na wydajności zawsze wtedy, gdy nie spełniamy jej założeń.

1. Algorytm nie będzie dopasowywał poddrzew komponentów różnych typów. Jeśli naprzemiennie używasz komponentów różnego typu, a zwracających bardzo podobny wynik - sugerujemy ujednolicić typ. W praktyce nie przysporzyło nam to nigdy problemów.

2. Klucze powinny być stabilne, przewidywalne i unikalne. Niestabilne klucze (na przykład generowane przez `Math.random()`) będą skutkować niepotrzebną przebudową wielu instancji komponentów i węzłów DOM-u, powodując spadek wydajności i utratę stanu w komponentach potomnych.
