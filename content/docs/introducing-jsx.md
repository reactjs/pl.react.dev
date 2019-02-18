---
id: introducing-jsx
title: Wprowadzenie do JSX
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

Weźmy na warsztat poniższą instrukcję przypisania:

```js
const element = <h1>Hello, world!</h1>;
```

Nieco zaskakującą może się tutaj wydawać przypisywana wartość,
 która nie jest ani typowym łańcuchem znaków, ani HTMLem.

Taką składnię nazywamy JSX i jest to rozszerzenie składni JavaScriptu 
o możliwość wstawiania tagów. Zalecamy używanie jej wraz z Reactem do opisywania,
jak powinien wyglądać interfejs graficzny strony.
JSX może Ci przypominać język oparty o szablony, jednakże daje Ci on do dyspozycji
pełnię możliwości JavaScriptu.

JSX jest tłumaczony jeden do jednego na Reactowe "elementy". Poznamy sposoby ich
wyświetlania na stronie w [następnej sekcji](/docs/rendering-elements.html).
Poniżej, znajdziesz podstawy JSXa, które pozwolą Ci szybko zacząć tworzyć kod.


### Dlaczego JSX? {#why-jsx}

React godzi się z faktem, że logika związana z prezentacją danych, jest z natury 
rzeczy powiązana z innymi elementami logiki biznesowej UI: sposobami przetwarzania
zdarzeń w aplikacji, tym, jak stan aplikacji zmienia się w czasie, jak również tym,
jak dane są przygotowywane do wyświetlenia. 

Zamiast sztucznie rozdzielać *technologie*, umiejscowiając znaczniki oraz logikę 
aplikacji w osobnych plikach, React wprowadza [podział odpowiedzialności](https://pl.wikipedia.org/wiki/Zasada_jednej_odpowiedzialno%C5%9Bci) 
poprzez wprowadzenie luźno powiązanych jednostek, nazywanych "komponentami", które
zawierają zarówno znaczniki HTML jak i związaną z nimi logikę.

React [nie wymaga](/docs/react-without-jsx.html) używania JSX, jednakże większość
programistów uważa go za przydatne narzędzie unaoczniające co się dzieje w kodzie
JavaScript operującym na interfejsach graficznych. Pomaga on również Reactowi 
wyświetlać bardziej użyteczne informacje o błędach i ostrzeżenia. 

Pora sprawdzić, jak to działa - do dzieła!

### Osadzanie wyrażeń w JSX {#embedding-expressions-in-jsx}

W poniższym przykładzie, deklarujemy zmienną `imie`, a następnie używamy jej 
wewnątrz JSX, po prostu otaczając ją nawiasami klamrowymi:

```js{1,2}
const imie = 'Gracjan';
const element = <h1>Witaj, {imie}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

Zauważ, że dowolne [wyrażenie JavaScriptowe (ang.)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)
możesz osadzić w JSX poprzez otoczenie go klamrami. Przykładowo, możesz użyć 
`2 + 2`, `uzytkownik.imie` czy `pokoloruj(uzytkownik)`, jako że są to prawidłowe
wyrażenia w języku JavaScript. 

W poniższym przykładzie umiejscowiamy wynik wywołania funkcji JavaScriptowej - 
`formatuj(uzytkownik)` wewnątrz znacznika `<h1>`:


```js{12}
function formatuj(uzytkownik) {
  return uzytkownik.imie + ' ' + uzytkownik.nazwisko;
}

const uzytkownik = {
  imie: 'Gracjan',
  nazwisko: 'Brzęczyszczykiewicz',
};

const element = (
  <h1>
    Witaj, {formatuj(uzytkownik)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://introducing-jsx)

Dla czytelności, podzieliliśmy kod JSX na kilka linii. Nie jest to wprawdzie 
wymagane, ale polecamy również otaczanie go w nawiasy. Pozwoli to uniknąć pułapek
związanych z [automatycznym wstawianiem średników (ang.)](http://stackoverflow.com/q/2846283) w JavaScripcie.

### JSX również jest wyrażeniem {#jsx-is-an-expression-too}

Po kompilacji, wyrażenia JSXowe stają się zwykłymi wywołaniami funkcji w JavaScripcie,
i są one ewaluowane do obiektów JavaScriptowych.

Oznacza to, że możesz używać JSX również wewnątrz instrukcji warunkowych `if`,
pętli `for`, przypisywać go do zmiennych, oczekiwać przekazania JSX jako argumenty
do funkcji, zwracać z funkcji i w wielu innych miejscach.

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### Podawanie atrybutów w JSX {#specifying-attributes-with-jsx}

Możesz przekazać literał łańcucha znaków jako atrybut, używając poniższej składni:

```js
const element = <div tabIndex="0"></div>;
```

Możesz także przypisać wartość dowolnego wyrażenia do atrybutu, używając nawiasów
klamrowych:

```js
const element = <img src={user.avatarUrl}></img>;
```

Nie otaczaj jednak klamr cudzysłowami, gdy chcesz przekazać wartość jakiegoś 
wyrażenia do atrybutu. Zalecamy użycie albo cudzysłowów (dla statycznych ciągów 
znaków), albo klamr (dla wartości wyrażeń), ale nie obydwu naraz (dla tego samego
atrybutu). 


>**Uwaga:**
>
> Jako że JSXowi jest bliżej do JavaScriptu niż do HTMLa, React DOM używa do nazywania 
> argumentów konwencji `camelCase` zamiast nazw atrybutów HTMLowych.
>
> Przykładowo, w JSX `class` staje się [`className`](https://developer.mozilla.org/pl/docs/Web/API/Element/className),
> zaś zamiast `tabindex` używamy `tabIndex`. 
>

### Specyfikowanie elementów potomnych w JSX {#specifying-children-with-jsx}

Jeśli znacznik jest pusty, możesz zakończyć go bezpośrednio przy pomocy `/>`,
podobnie jak ma to miejsce w XMLu:

```js
const element = <img src={user.avatarUrl} />;
```

Znaczniki JSX mogą jednak również zawierać elementy potomne:

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX jest odporny na ataki przez wstrzyknięcie kodu {#jsx-prevents-injection-attacks}

Można bezpiecznie osadzać dane wprowadzone przez użytkownika w JSX:

```js
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```

Domyślnie, React DOM stosuje [znaki ucieczki](https://pl.wikipedia.org/wiki/Znak_modyfikacji)
w wartościach używanych w JSX, zanim je wyświetli. W ten sposób upewniamy się,
że nic, co nie zostało bezpośrednio napisane w kodzie Twojej aplikacji, nie zostanie
wstrzyknięte w kod strony. Wszystko, co wyświetlamy, zamieniane jest na statyczne
łańcuchy znaków. Pozwala to uniknąć ataków typu [XSS (Cross-site scripting)](https://pl.wikipedia.org/wiki/Cross-site_scripting). 


### JSX reprezentuje obiekty {#jsx-represents-objects}

Zanim Twój kod JSX będzie mógł zostać wyświetlony w przeglądarce, musi zostać 
odpowiednio przetworzony przez narzędzie takie jak _Babel_. Babel transpiluje 
znaczniki JSX do wywołań funkcji `React.createElement`. 

Poniższe dwa fragmenty kodu są sobie równoważne:

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

Funkcja `React.createElement` wykonuje kilka sprawdzeń, które ułatwiają pisanie
kodu wolnego od błędu. W swej istocie jednak, zwraca ona po prostu obiekt 
podobny do poniższego:

```js
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

Takie obiekty nazywamy "_elementami Reactowymi_". Możesz o nich myśleć jak o sposobie
opisania tego, co chcesz zobaczyć na ekranie. `ReactDOM` odczytuje te obiekty 
i używa ich do skonstruowania drzewa DOM Twojej strony, jak również do późniejszego
odświeżania go. 

Dowiesz się więcej o wyświetlaniu elementów Reactowych w następnej sekcji.

>**Wskazówka:**
>
> Polecamy używanie ["Babela" jako definicji języka (ang.)](http://babeljs.io/docs/editors)
> w Twoim ulubionym edytorze. Pozwoli to na poprawne podświetlanie składni ES6 i JSX.
> Niniejsza strona używa schematu kolorów [Oceanic Next](https://labs.voronianski.com/oceanic-next-color-scheme/),
> który jest z nią kompatybilny.
>
