---
id: error-boundaries
title: Granice błędów
permalink: docs/error-boundaries.html
---

W przeszłości błędy javascriptowe wewnątrz komponentów uszkadzały wewnętrzny stan Reacta i [wywoływały](https://github.com/facebook/react/issues/4026) [tajemnicze](https://github.com/facebook/react/issues/6895) [błędy](https://github.com/facebook/react/issues/8579) w kolejnych renderowaniach. Były one następstwem wcześniejszego błędu w kodzie aplikacji, jednakże React nie dostarczał żadnego rozwiązania pozwalającego na właściwe ich obsłużenie wewnątrz komponentów oraz nie potrafił odtworzyć aplikacji po ich wystąpieniu.

## Przedstawiamy granice błędów {#introducing-error-boundaries}

Błąd w kodzie JavaScript, występujący w jednej z części interfejsu użytkownika (UI), nie powinien psuć całej aplikacji. Aby rozwiązać ten problem, w Reakcie 16 wprowadziliśmy koncepcję granic błędów (ang. *error boundary*).

Granice błędów to komponenty reactowe, które **przechwytują błędy javascriptowe występujące gdziekolwiek wewnątrz drzewa komponentów ich potomków, a następnie logują je i wyświetlają zastępczy interfejs UI**, zamiast pokazywać ten niepoprawnie działający. Granice błędów przechwytują błędy występujące podczas renderowania, w metodach cyklu życia komponentów, a także w konstruktorach całego podrzędnego im drzewa komponentów.

> Uwaga
>
> Granice błędów **nie obsługują** błędów w:
>
> * Procedurach obsługi zdarzeń (ang. event handlers) ([informacje](#how-about-event-handlers))
> * Asynchronicznym kodzie (np. w metodach: `setTimeout` lub w funkcjach zwrotnych `requestAnimationFrame`)
> * Komponentach renderowanych po stronie serwera
> * Błędach rzuconych w samych granicach błędów (a nie w ich podrzędnych komponentach)

Aby komponent klasowy stał się granicą błędu, musi definiować jedną lub obie metody cyklu życia: [`static getDerivedStateFromError()`](/docs/react-component.html#static-getderivedstatefromerror) i/lub [`componentDidCatch()`](/docs/react-component.html#componentdidcatch). Należy używać `static getDerivedStateFromError()` do wyrenderowania zastępczego UI po rzuceniu błędu, a `componentDidCatch()`, aby zalogować informacje o błędzie.

```js{7-10,12-15,18-21}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Zaktualizuj stan, aby następny render pokazał zastępcze UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Możesz także zalogować błąd do zewnętrznego serwisu raportowania błędów
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Możesz wyrenderować dowolny interfejs zastępczy.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```

Po zdefiniowaniu, granicy błędu można używać jak normalnego komponentu:

```js
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

Granice błędów działają jak bloki `catch {}` w JavaScript, tyle że dla komponentów. Można je zdefiniować tylko w komponentach klasowych. W praktyce, w większości przypadków wystarczy zdefiniować jeden komponent granicy błędu i używać go w całej aplikacji.

Należy pamiętać, że **granice błędów wyłapują błędy w komponentach potomnych**. Nie są one jednak w stanie obsłużyć własnych błędów. W takim przypadku, jeżeli granica błędu nie będzie w stanie wyświetlić zastępczego UI, błąd zostanie przekazany do kolejnej najbliższej granicy błędu powyżej w strukturze komponentów. Jest to zachowanie podobne do tego znanego z javascriptowych bloków `catch {}`.

## Demo {#live-demo}

[Przykład tworzenia i użycia granicy błędów](https://codepen.io/gaearon/pen/wqvxGa?editors=0010) z wykorzystaniem [Reacta 16](/blog/2017/09/26/react-v16.0.html).

<<<<<<< HEAD
=======
The granularity of error boundaries is up to you. You may wrap top-level route components to display a “Something went wrong” message to the user, just like how server-side frameworks often handle crashes. You may also wrap individual widgets in an error boundary to protect them from crashing the rest of the application.
>>>>>>> 968f09159512b59afd5246a928789ae52592c923

## Gdzie umiejscowić granice błędów {#where-to-place-error-boundaries}

To, jak bardzo szczegółowo zostanie pokryty kod za pomocą granic błędów, jest kwestią preferencji. Możliwe jest, na przykład, opakowanie granicą błędów komponentu najwyższego poziomu odpowiedzialnego za routing aplikacji, aby wyświetlić informację: "Coś poszło nie tak" - tak jak ma to często miejsce w frameworkach po stronie serwera. Można również opakować pojedyncze fragmenty aplikacji, aby uchronić jej pozostałe części przed błędami.

## Nowe zachowanie nieobsłużonych błędów {#new-behavior-for-uncaught-errors}

Wprowadzenie granic błędów ma ważne następstwo. **Od Reacta w wersji 16, błędy, które nie zostały obsłużone za pomocą granicy błędów, spowodują odmontowanie całego drzewa komponentów.**

Przedyskutowaliśmy tę zmianę i z naszego doświadczenia wynika, że lepiej jest usunąć całe drzewo komponentów niż wyświetlać zepsute fragmenty UI. Na przykład, w produkcie takim jak Messenger pozostawienie wyświetlonego zepsutego kawałka UI może sprawić, że ktoś nieświadomie wyśle wiadomość do innej osoby. Również w aplikacjach finansowych wyświetlanie złego stanu konta jest gorszą sytuacją niż nie wyświetlenie niczego.

Ta zmiana oznacza, że wraz z migracją do nowej wersji Reacta odkryte zostaną błędy w aplikacjach, które do tej pory nie zostały zauważone. Dodanie granic błędów zapewni lepsze doświadczenie dla użytkownika, gdy coś pójdzie nie tak.

Przykładowo, Facebook Messenger opakowuje w osobne granice błędów następujące fragmenty aplikacji: zawartość paska bocznego, panel z informacjami o konwersacji, listę konwersacji i pole tekstowe na wiadomość. Jeżeli jeden z tych elementów zadziała nieprawidłowo, reszta pozostanie interaktywa i działająca.

Zachęcamy również do używania (lub zbudowania własnego) narzędzia do raportowania błędów, dzięki czemu będzie możliwe poznanie nieobsłużonych błędów występujących w środowisku produkcyjnym.

## Ślad stosu komponentów {#component-stack-traces}

React 16, w środowisku deweloperskim, wyświetla w konsoli wszystkie błędy złapane podczas renderowania, nawet jeżeli aplikacja przypadkowo je przejmie. Oprócz wiadomości błędu i javascriptowego stosu, dostępny jest również stos komponentów. Dzięki temu wiadomo, gdzie dokładnie w drzewie komponentów wystąpił błąd:

<img src="../images/docs/error-boundaries-stack-trace.png" style="max-width:100%" alt="Błąd złapany w komponencie będącym granicą błędów">

W drzewie komponentów widoczne są również numery linii i nazwy plików. Ten mechanizm domyślnie działa w aplikacjach stworzonych przy użyciu [Create React App](https://github.com/facebookincubator/create-react-app):

<img src="../images/docs/error-boundaries-stack-trace-line-numbers.png" style="max-width:100%" alt="Błąd złapany w komponencie będącym granicą błędów wraz z numerami linii">

Jeżeli nie używasz Create React App, możesz ręcznie dodać [ten plugin](https://www.npmjs.com/package/@babel/plugin-transform-react-jsx-source) do swojej konfiguracji Babela. Został on stworzony do używania tylko podczas fazy deweloperskiej i **powinien zostać wyłączony w środowisku produkcyjnym**

> Uwaga
>
> Nazwy komponentów wyświetlane w śladzie stosu zależą od własności [`Function.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name). Jeżeli obsługujesz starsze przeglądarki, które nie dostarczają jej natywnie (np. IE 11), możesz dodać łatkę taką jak [`function.name-polyfill`](https://github.com/JamesMGreene/Function.name). Alternatywą jest zadeklarowanie wprost [`displayName`](/docs/react-component.html#displayname) we wszystkich komponentach.


## A co z try/catch? {#how-about-trycatch}

`try` / `catch` jest świetnym rozwiązaniem, ale działa tylko dla imperatywnego kodu:

```js
try {
  showButton();
} catch (error) {
  // ...
}
```

Natomiast komponenty reactowe są deklaratywne i określają, *co* powinno zostać wyrenderowane:

```js
<Button />
```

Granice błędów zachowują deklaratywną naturę Reacta. Na przykład, jeżeli w metodzie `componentDidUpdate` wystąpi błąd podczas aktualizacji stanu, aplikacja poprawnie przekaże błąd do najbliższej granicy błędów.

## A co z procedurami obsługi zdarzeń? {#how-about-event-handlers}

Granice błędów nie obsługują błędów z procedur obsługi zdarzeń.

React nie potrzebuje granic błędów do przywrócenia aplikacji po błędzie powstałych w procedurze obsługi zdarzeń.  W przeciwieństwie do metod cyklu życia komponentu lub metody renderującej, procedury obsługi zdarzeń nie są wywoływane w trakcie renderowania. Dzięki temu nawet w przypadku błędu React wie, co wyświetlić na ekranie.

<<<<<<< HEAD
Aby obsłużyć błąd w procedurze obsługi zdarzenia, należy użyć javascriptowego `try` / `catch`:
=======
If you need to catch an error inside an event handler, use the regular JavaScript `try` / `catch` statement:
>>>>>>> 968f09159512b59afd5246a928789ae52592c923

```js{9-13,17-20}
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    try {
      // Kod, który rzuci wyjątek
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Caught an error.</h1>
    }
    return <button onClick={this.handleClick}>Click Me</button>
  }
}
```

Powyższy przykład prezentuje normalne zachowanie JavaScriptu i nie używa granic błędów.

## Zmiany nazewnictwa od Reacta w wersji 15 {#naming-changes-from-react-15}

React 15 zawierał bardzo okrojoną obsługę granic błędów za pomocą metody o nazwie `unstable_handleError`. Ta metoda nie jest już obsługiwana i należy zmienić jej nazwę na `componentDidCatch` począwszy od pierwszych beta wersji Reacta 16.

Ze względu na tę zmianę stworzyliśmy [codemod](https://github.com/reactjs/react-codemod#error-boundaries), który automatycznie przekształci twój kod.