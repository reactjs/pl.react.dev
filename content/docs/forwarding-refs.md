---
id: forwarding-refs
title: Przekazywanie referencji
permalink: docs/forwarding-refs.html
---

<div class="scary">

> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)
> - [`forwardRef`](https://react.dev/reference/react/forwardRef)

</div>

Przekazywanie referencji (ang. *ref forwarding*) to technika, w której [referencję](/docs/refs-and-the-dom.html)
do komponentu "podajemy dalej" do jego dziecka. Dla większości komponentów w aplikacji nie jest to potrzebne,
jednak może okazać się przydatne w niektórych przypadkach, zwłaszcza w bibliotekach udostępniających uniwersalne komponenty. 
Najczęstsze scenariusze opisujemy poniżej.

## Przekazywanie referencji do komponentów DOM {#forwarding-refs-to-dom-components}

Rozważmy komponent `FancyButton`, który renderuje natywny element DOM - przycisk:
`embed:forwarding-refs/fancy-button-simple.js`

Komponenty reactowe ukrywają szczegóły swojej implementacji, w tym także wyrenderowany HTML.
Inne komponenty używające `FancyButton` **z reguły nie potrzebują** [mieć dostępu do referencji](/docs/refs-and-the-dom.html) do wewnętrznego elementu `button`.
Jest to korzystne, gdyż zapobiega sytuacji, w której komponenty są za bardzo uzależnione od struktury drzewa DOM innych komponentów. 

Taka enkapsulacja jest pożądana na poziomie aplikacji, w komponentach takich jak `FeedStory` czy `Comment`. Natomiast może się okazać to niewygodne w przypadku komponentów wielokrotnego użytku, będących "liśćmi" drzewa. Np. `FancyButton` albo `MyTextInput`. Takie komponenty często używane są w wielu miejscach aplikacji, w podobny sposób jak zwyczajne elementy DOM typu `button` i `input`. W związku z tym, bezpośredni dostęp do ich DOM może okazać się konieczy, aby obsłużyć np. fokus, zaznaczenie czy animacje. 

**Przekazywanie referencji jest opcjonalną funkcjonalnością, która pozwala komponentom wziąć przekazaną do nich referencję i "podać ją dalej" do swojego dziecka.**

W poniższym przykładzie `FancyButton` używa `React.forwardRef`, by przejąć przekazaną do niego referencję i przekazać ją dalej do elementu `button`, który renderuje:

`embed:forwarding-refs/fancy-button-simple-ref.js`

Tym sposobem komponenty używające `FancyButton` mają referencję do elementu `button` znajdującego się wewnątrz. Mogą więc, w razie potrzeby, operować na komponencie tak, jakby operowały bezpośrednio na natywnym elemencie DOM.

Oto wyjaśnienie krok po kroku, opisujące, co wydarzyło się w przykładzie powyżej:

1. Tworzymy [referencję reactową](/docs/refs-and-the-dom.html) wywołując `React.createRef` i przypisujemy ją do stałej `ref`.
1. Przekazujemy `ref` do `<FancyButton ref={ref}>` przypisując ją do atrybutu JSX.
1. Wewnątrz `forwardRef` React przekazuje `ref` do funkcji `(props, ref) => ...` jako drugi argument.
1. Podajemy argument `ref` dalej do `<button ref={ref}>` przypisując go do atrybutu JSX.
1. Gdy referencja zostanie zamontowana, `ref.current` będzie wskazywać na element DOM `<button>`.

>Uwaga
>
>Drugi argument `ref` istnieje tylko, gdy definiujesz komponent przy pomocy wywołania `React.forwardRef`. Zwyczajna funkcja lub klasa nie dostanie argumentu `ref`, nawet jako jednej z właściwości (`props`).
>
>Przekazywanie referencji nie jest ograniczone do elementów drzewa DOM. Możesz także przekazywać referencje do instancji komponentów klasowych.

## Uwaga dla autorów bibliotek komponentów {#note-for-component-library-maintainers}

**Kiedy zaczniesz używać `forwardRef` w swojej bibliotece komponentów, potraktuj to jako zmianę krytyczną (ang. *breaking change*). W efekcie biblioteka powinna zostać wydana w nowej "wersji głównej" (ang. *major version*, *major release*).** Należy tak postąpić, ponieważ najprawdopodobniej twoja biblioteka zauważalnie zmieniła zachowanie (np. inaczej przypinając referencje i eksportując inne typy). Może to popsuć działanie aplikacji, które są zależne od dawnego zachowania.

Stosowanie `React.forwardRef` warunkowo, gdy ono istnieje, także nie jest zalecane z tego samego powodu: zmienia to zachowanie biblioteki i może zepsuć działanie aplikacji użytkowników, gdy zmienią wersję Reacta.  

## Przekazywanie referencji w komponentach wyższego rzędu {#forwarding-refs-in-higher-order-components}

Omawiana technika może okazać się wyjątkowo przydatna w [komponentach wyższego rzędu](/docs/higher-order-components.html) (KWR; ang. *Higher-Order Components* lub *HOC*). Zacznijmy od przykładu KWR-a, który wypisuje w konsoli wszystkie właściwości komponentu:

`embed:forwarding-refs/log-props-before.js`

KWR `logProps` przekazuje wszystkie atrybuty do komponentu, który opakowuje, więc wyrenderowany wynik będzie taki sam. Na przykład, możemy użyć tego KWRa do logowania atrybutów, które zostaną przekazane do naszego komponentu `FancyButton`:
`embed:forwarding-refs/fancy-button.js`

Powyższe rozwiązanie ma jeden minus: referencje nie zostaną przekazane do komponentu. Dzieje się tak, ponieważ `ref` nie jest atrybutem. Tak jak `key`, jest on obsługiwany przez Reacta w inny sposób. Referencja będzie w tym wypadku odnosiła się do najbardziej zewnętrznego kontenera, a nie do opakowanego komponentu. 

Oznacza to, że referencje przeznaczone dla naszego komponentu `FancyButton` będą w praktyce wskazywać na komponent `LogProps`.  
`embed:forwarding-refs/fancy-button-ref.js`

Na szczęście możemy jawnie przekazać referencję do wewnętrznego komponentu `FancyButton` używając API `React.forwardRef`. `React.forwardRef` przyjmuje funkcję renderującą, która otrzymuje parametry `props` oraz `ref`, a zwraca element reactowy. Na przykład:
`embed:forwarding-refs/log-props-after.js`

## Wyświetlanie własnej nazwy w narzędziach deweloperskich {#displaying-a-custom-name-in-devtools}

`React.forwardRef` przyjmuje funkcję renderującą. Narzędzia deweloperskie Reacta (ang. *React DevTools*) używają tej funkcji do określenia, jak wyświetlać komponent, który przekazuje referencję.

Przykładowo, następujący komponent w narzędziach deweloperskich wyświetli się jako "*ForwardRef*":

`embed:forwarding-refs/wrapped-component.js`

Jeśli nazwiesz funkcję renderującą, narzędzia deweloperskie uwzględnią tę nazwę (np. "*ForwardRef(myFunction)*"):

`embed:forwarding-refs/wrapped-component-with-function-name.js`

Możesz nawet ustawić właściwość `displayName` funkcji tak, aby uwzględniała nazwę opakowanego komponentu:

`embed:forwarding-refs/customized-display-name.js`
