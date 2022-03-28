---
id: conditional-rendering
title: Renderowanie warunkowe
permalink: docs/conditional-rendering.html
prev: handling-events.html
next: lists-and-keys.html
redirect_from:
  - "tips/false-in-jsx.html"
---

React umożliwia tworzenie odrębnych komponentów, które hermetyzują (ang. *encapsulate*) pożądane przez ciebie metody. Wybrane komponenty mogą być renderowane bądź nie, w zależności od stanu twojej aplikacji.

Renderowanie warunkowe działa w Reakcie tak samo, jak instrukcje warunkowe w javascripcie. Aby stworzyć elementy odzwierciedlające aktualny stan aplikacji, należy użyć instrukcji [if](https://developer.mozilla.org/pl/docs/Learn/Getting_started_with_the_web/JavaScript_basics#Warunki) lub [operatora warunkowego](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Operatory/Operator_warunkowy) oraz pozwolić Reactowi je dopasować poprzez aktualizację interfejsu użytkownika.

Rozważmy następujące dwa komponenty:

```js
function UserGreeting(props) {
  return <h1>Witamy ponownie!</h1>;
}

function GuestGreeting(props) {
  return <h1>Proszę się zarejestrować.</h1>;
}
```

Stworzymy komponent `Greeting` (pol. *Powitanie*), który wyświetlał będzie pierwszy lub drugi z powyższych komponentów w zależności od tego czy użytkownik jest zalogowany.

```javascript{3-7,11,12}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Spróbuj zmienić na isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

Powitanie renderowane przez kod w powyższym przykładzie zależy od wartości właściwości `isLoggedIn`.

### Zmienne elementowe {#element-variables}

Elementy mogą być przechowywane w zmiennych. Pozwala to na warunkowe renderowanie określonej części komponentu, podczas gdy pozostałe dane wyjściowe nie ulegają zmianie.

Przyjrzyjmy się dwóm nowym komponentom tworzącym przyciski logowania "Zaloguj się" (ang. *Login*) oraz "Wyloguj się" (ang. *Logout*):

```js
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Zaloguj się
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Wyloguj się
    </button>
  );
}
```

W przykładzie poniżej zbudujemy [komponent ze stanem](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) o nazwie `LoginControl` (pol. *kontrola logowania*)

W zależności od aktualnego stanu, będzie on renderował przycisk logowania (`<LoginButton />`) lub wylogowania `<LogoutButton />` . Będzie on również renderował komponent `<Greeting />` z poprzedniego przykładu:

```javascript{20-25,29,30}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)

Deklarowanie zmiennej oraz stosowanie instrukcji `if` to dobry sposób na warunkowe renderowanie komponentu. Czasem jednak przydaje się nieco krótsza składnia. JSX umożliwia kilka różnych opcji warunków wewnątrzliniowych. Przedstawiamy je poniżej.

### Wewnątrzliniowy warunek `if` z użyciem logicznego operatora `&&` {#inline-if-with-logical--operator}

JSX pozwala [umieszczać w nawiasach klamrowych wyrażenia](/docs/introducing-jsx.html#embedding-expressions-in-jsx), łącznie z javascriptowym operatorem logicznym `&&`. Jest to przydatne, gdy chcemy jakiś element dołączyć warunkowo.

```js{6-10}
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Cześć!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          Masz {unreadMessages.length} nieprzeczytanych wiadomości.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

Powyższy kod działa, ponieważ w JavaScripcie `true && *wyrażenie*` zawsze jest ewaluowane jako `wyrażenie`, natomiast `false && wyrażenie` jako `false`.

Zatem jeśli warunek zwraca `true`, element następujący bezpośrednio po operatorze `&&` zostanie uwzględniony w danych wyjściowych. Natomiast jeśli warunek zwróci `false`, React zignoruje go i pominie przy renderowaniu.

Wstawienie wyrażenia fałszywego (ang. *falsy expression*) również spowoduje pominięcie elementu umieszczonego za operatorem `&&`, jednak zwróci to wyrażenie. W poniższym przykładzie metoda renderująca zwróci `<div>0</div>`.

```javascript{2,5}
render() {
  const count = 0;
  return (
    <div>
<<<<<<< HEAD
      { count && <h1>Wiadomości: {count}</h1>}
=======
      {count && <h1>Messages: {count}</h1>}
>>>>>>> 5e9d673c6bc1530c901548c0b51af3ad3f91d594
    </div>
  );
}
```



### Skrócona forma `if-else` z operatorem warunkowym {#inline-if-else-with-conditional-operator}

Kolejną metodą renderowania warunkowego wewnątrz wyrażenia jest stosowanie javascriptowego operatora warunkowego [`warunek ? true : false`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Operatory/Operator_warunkowy).

W przykładzie poniżej używamy go, aby warunkowo wyrenderować niewielki blok tekstu.

```javascript{5}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      Użytkownik jest teraz <b>{isLoggedIn ? 'zalogowany' : 'niezalogowany'}</b>.
    </div>
  );
}
```

Rozwiązanie to może być stosowane również w przypadku dłuższych wyrażeń:

```js{5,7,9}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```

Czytelność takich wyrażeń jest oczywiście nieco mniejsza. Podobnie jak w JavaScripcie, wybór odpowiedniego stylu zależy od preferencji twoich i twojego zespołu. Jednocześnie należy pamiętać, że kiedy warunki stają się nazbyt złożone, dobrze jest rozważyć możliwość [wydzielenia osobnego komponentu](/docs/components-and-props.html#extracting-components)

### Zapobieganie renderowaniu komponentu {#preventing-component-from-rendering}

W sporadycznych przypadkach może zachodzić potrzeba ukrycia się komponentu, mimo iż został on już wyrenderowany przez inny komponent. Aby to umożliwić, należy zwrócić zamiast niego wartość `null`.

W przykładzie poniżej, renderowanie baneru ostrzegawczego `<WarningBanner />` jest uzależnione od wartości właściwości o nazwie `warn` (pol. *ostrzeż*). Jeśli jest ona równa `false`, wówczas komponent ten nie jest renderowany.

```javascript{2-4,29}
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Ostrzeżenie!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Ukryj' : 'Pokaż'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

Zwrócenie wartości `null` w metodzie `render` danego komponentu nie ma wpływu na wywoływanie metod cyklu życia tego komponentu. To znaczy, że np. metoda `componentDidUpdate` w dalszym ciągu zostanie wywołana.