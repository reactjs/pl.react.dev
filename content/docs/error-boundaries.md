---
id: error-boundaries
title: Granice błędów
permalink: docs/error-boundaries.html
---

W przeszłości, błędy JavaScriptowe w komponentach psuły wewnętrzny stan Reacta i [wywoływały](https://github.com/facebook/react/issues/4026) [enigmatyczne](https://github.com/facebook/react/issues/6895) [błędy](https://github.com/facebook/react/issues/8579) w kolejnych renderach. Były one następstwem wcześniejszego błędu w kodzie aplikacji, którego React nie był w stanie obsłużyć.

## Przedstawiamy Granice Błędów {#introducing-error-boundaries}

Błąd JavaScriptu w jednej z części interfejsu użytkownika (UI) nie powinien psuć całej aplikacji. Aby rozwiązać ten problem, w React 16 wprowadziliśmy koncepcję granic błędów (ang. error boundary).

Granice błędów to komponenty Reactowe, które **wyłapują, logują i wyświetlają błędy JavaScriptu we wszystkich swoich podrzędnych komponentach, a także wyświetlają zastępcze fragmenty interfejsu** zamiast pokazywać te niepoprawnie działające. Granice błędów działają podczas renderowania, w metodach cyklu życia komponentów, a także w konstruktorach całego podrzędnego drzewa komponentów.

> Uwaga
>
> Granice błędów **nie obsługują** błędów w:
>
> * Uchwytach zdarzeń (ang. event handlers) ([więcej](#how-about-event-handlers))
> * Asynchronicznym kodzie (np. w metodach: `setTimeout` lub w callbackach `requestAnimationFrame`)
> * Komponentach renderowanych po stronie serwera
> * Błędach rzuconych w samych granicach błędów (a nie w ich podrzędnych komponentach)

Aby komponent klasowy był granicą błędu musi zdefiniować jedną lub obie metody cyklu życia: [`static getDerivedStateFromError()`](/docs/react-component.html#static-getderivedstatefromerror) lub [`componentDidCatch()`](/docs/react-component.html#componentdidcatch). Należy używać `static getDerivedStateFromError()` do wyrenderowania zastępczego UI po rzuceniu błędu, a `componentDidCatch()`, aby zalogować informacje o błędzie.

```js{7-10,12-15,18-21}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Aktualizacja stanu - w następnym renderze zostanie pokazane UI zastępcze
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // componentDidCatch pozwala zalogować błąd do zewnętrznego serwisu
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // Jeżeli wystąpił błąd wyświetlamy dowolne zastępcze komponenty
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

Granice błędów działają jak bloki `catch {}` tyle, że dla komponentów. Można je zdefiniować tylko w komponentach klasowych. W praktyce w większości przypadków wystarczające będzie zdefiniowanie pojedynczego komponentu granicy błędu i używanie go w całej aplikacji.

Należy pamiętać, że **granice błędów wyłapują błędy w komponentach-dzieciach**. Nie są one jednak w stanie obsłużyć własnych błędów. W takim przypadku, jeżeli granica błędu nie będzie w stanie wyświetlić komunikatu błędu, zostanie on przekazany do kolejnej najbliższej granicy błędu wyżej w strukturze komponentów. Jest to zachowanie podobne do tego znanego z JavaScriptowych bloków `catch {}`.

## Demo {#live-demo}

[Przykład tworzenia i używania granicy błędów](https://codepen.io/gaearon/pen/wqvxGa?editors=0010) z wykorzystaniem [Reacta 16](/blog/2017/09/26/react-v16.0.html).


## Gdzie umiejscowić granice błędów {#where-to-place-error-boundaries}

To jak bardzo szczegółowo zostanie pokryty kod za pomocą granic błędów jest kwestią preferencji. Możliwe jest na przykład opakowanie granicą błędów najwyższego poziomu komponenty odpowiedzialne za routing aplikacji, aby wyświetlić informację: "Coś poszło nie tak", tak jak ma to często miejsce w frameworkach po stronie serwera. Można również opakować pojedyncze fragmenty aplikacji, aby uchronić jej pozostałą część od błędów.

## Nowe zachowanie nieobsłużonych błędów {#new-behavior-for-uncaught-errors}

Wprowadzenie granic błędów ma ważne następstwo. **Od Reacta w wersji 16, błędy, które nie zostały obsłużone za pomocą granicy błędów, sprawią, że zostanie odmontowane całe drzewo komponentów Reactowych.**

Omawialiśmy tą zmianę i z naszego doświadczenia wynika, że lepiej jest usunąć całe drzewo komponentów niż wyświetlać zepsute fragmenty UI. Na przykład w produkcie takim jak Messenger pozostawienie wyświetlonego zepsutego kawałka UI może sprawić, że ktoś nieświadomie wyśle wiadomość do innej osoby. Również w aplikacjach finansowych wyświetlanie złego stanu konta jest gorszą sytuacją niż niewyświetlenie niczego.

Ta zmiana oznacza, że wraz z migracją do nowej wersji Reacta odkryte zostaną potencjalne błędy w aplikacjach, które do tej pory nie zostały zauważone. Dodanie granic błędów zapewni lepszy user experience gdy coś pójdzie nie tak.

Przykładowo, Facebook Messenger opakowuje w osobne granice błędów następujące fragmenty aplikacji: zawartość paska bocznego, panel z informacjami o konwersacji, listę konwersacji i pole tekstowe na wiadomość. Jeżeli jeden z tych elementów zadziała nieprawidłowo, reszta pozostanie interaktywa i działająca.

Zachęcamy również do używania (lub zbudowania własnego) narzędzia do raportowania błędów, dzięki czemu będzie możliwe poznanie nieobsłużonych błędów występujących w środowisku produkcyjnym.

## Ślad stosu komponentów {#component-stack-traces}

React 16, w trakcie developmentu, wyświetla w konsoli wszystkie błędy złapane podczas renderowania, nawet jeżeli aplikacja przypadkowo je przejmie. Oprócz wiadomości błędu i stosu JavaScriptu dostępny jest również stos komponentów. Dzięki temu widoczne jest gdzie dokładnie w drzewie komponentów wystąpił błąd:

<img src="../images/docs/error-boundaries-stack-trace.png" style="max-width:100%" alt="Błąd złapany w komponencie będącym Granicą błędów">

W drzewie komponentów widoczne są również numery linii i nazwy plików. Ten mechanizm domyślnie działa w aplikacjach stworzyonych przy użyciu [Create React App](https://github.com/facebookincubator/create-react-app):

<img src="../images/docs/error-boundaries-stack-trace-line-numbers.png" style="max-width:100%" alt="Błąd złapany w komponencie będącym Granicą błędów wraz z numerami linii">

Jeżeli nie używasz Create React App, możesz ręcznie dodać [ten plugin](https://www.npmjs.com/package/babel-plugin-transform-react-jsx-source) do swojej konfiguracji Babela. Jest on stworzony do użycia tylko podczas developmentu i **powinien zostać wyłączony w środowisku produkcyjnym**

> Uwaga
>
> Nazwy komponentów wyświetlane w śladzie stosu zależą od własności [`Function.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name). Jeżeli obsługujesz starsze przeglądarki, które nie dostarczają jej natywnie (np. IE 11), możesz dodać łatkę taką jak [`function.name-polyfill`](https://github.com/JamesMGreene/Function.name). Alternatywą jest zadeklarowanie wprost [`displayName`](/docs/react-component.html#displayname) we wszystkich komponentach.


## A co z try/catch? {#how-about-trycatch}

`try` / `catch` jest świetnym rozwiązaniem ale działa tylko dla imperatywnego kodu:

```js
try {
  showButton();
} catch (error) {
  // ...
}
```

Jednakże komponenty Reacta są deklaratywne i określają *co* powinno być wyrenderowane:

```js
<Button />
```

Granice błędów wspierają deklaratywną naturę React'a. Na przykład, jeżeli w metodzie `componentDidUpdate` wystąpi błąd podczas aktualizacji stanu, aplikacja poprawnie zpropaguje błąd do najbliższej granicy błędów.

## A co z uchwytami zdarzeń? {#how-about-event-handlers}

Granice błędów nie obsługują błędów wewnątrz uchwytów zdarzeń.

React nie potrzebuje granic błędów żeby obsłużyć błędy pochodzące z uchwytów zdarzeń. W przeciwieństwie do metod cyklu życia komponentu lub renderu, uchwyty zdarzeń nie są wywoływane w trakcie renderowania. To powoduje, że nawet w przypadku błędu React wie co wyświetlić na ekranie.

Aby obsłużyć błąd w uchwycie zdarzeń należy użyć JavaScriptowego `try` / `catch`:

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
    return <div onClick={this.handleClick}>Click Me</div>
  }
}
```

Powyższy przykład prezentuje normalne zachowanie JavaScriptu i nie używa granic błędów.

## Zmiany nazewnictwa od Reacta w wersji 15 {#naming-changes-from-react-15}

React 15 zawierał bardzo okrojoną obsługę granic błędów za pomocą metody o nazwie: `unstable_handleError`. Ta metoda nie jest już obsługiwana i należy zmienić jej nazwę na `componentDidCatch` począwszy od pierwszych beta wersji Reacta 16.

Ze względu na tą zmianę stworzyliśmy [codemod](https://github.com/reactjs/react-codemod#error-boundaries), aby automatycznie dostosować kod.
