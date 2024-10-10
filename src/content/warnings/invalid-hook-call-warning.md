---
title: Rules of Hooks
---

Jesteś tu najprawdopodobniej z powodu błędu:

<ConsoleBlock level="error">

Hooks can only be called inside the body of a function component.

</ConsoleBlock>

Zwykle pojawia się on z trzech powodów:

1. Używasz **różnych wersji** bibliotek React i React DOM.
2. **Łamiesz [Zasady korzystania z hooków](/docs/hooks-rules.html)**.
3. Masz **więcej niż jedną kopię Reacta** w danej aplikacji.

Przyjrzyjmy się bliżej każdemu z tych przypadków.

## Łamanie zasad korzystania z hooków {/*breaking-the-rules-of-hooks*/}

Hooki można wywoływać **tylko w komponentach funkcyjnych**:

* ✅ Wywołuj je na głównym poziomie ciała komponentu funkcyjnego.
* ✅ Wywołuj je na głównym poziomie ciała [własnego hooka](/docs/hooks-custom.html).

**Więcej na ten temat dowiesz się w rozdziale pt. [Zasady korzystania z hooków](/docs/hooks-rules.html).**

```js{2-3,8-9}
function Counter() {
  // ✅ Dobrze: główny poziom komponentu funkcyjnego
  const [count, setCount] = useState(0);
  // ...
}

function useWindowWidth() {
  // ✅ Dobrze: główny poziom własnego hooka
  const [width, setWidth] = useState(window.innerWidth);
  // ...
}
```

Dla jasności, hooków **nie** można wywoływać w żaden inny sposób:

* 🔴 Nie wywołuj hooków w komponentach klasowych.
* 🔴 Nie wywołuj hooków w procedurach obsługi zdarzeń.
* 🔴 Nie wywołuj hooków w funkcjach przekazywanych do `useMemo`, `useReducer` lub `useEffect`.

Jeśli złamiesz te zasady, otrzymasz powyższy błąd.

```js{3-4,11-12,20-21}
function Bad({ cond }) {
  if (cond) {
    // 🔴 Bad: inside a condition (to fix, move it outside!)
    const theme = useContext(ThemeContext);
  }
  // ...
}

function Bad() {
  for (let i = 0; i < 10; i++) {
    // 🔴 Bad: inside a loop (to fix, move it outside!)
    const theme = useContext(ThemeContext);
  }
  // ...
}

function Bad({ cond }) {
  if (cond) {
    return;
  }
  // 🔴 Bad: after a conditional return (to fix, move it before the return!)
  const theme = useContext(ThemeContext);
  // ...
}

function Bad() {
  function handleClick() {
    // 🔴 Źle: wewnątrz procedury obsługi zdarzeń (wystarczy przenieść na zewnątrz!)
    const theme = useContext(ThemeContext);
  }
  // ...
}

function Bad() {
  const style = useMemo(() => {
    // 🔴 Źle: wewnątrz useMemo (wystarczy przenieść na zewnątrz!)
    const theme = useContext(ThemeContext);
    return createStyle(theme);
  });
  // ...
}

class Bad extends React.Component {
  render() {
    // 🔴 Źle: w komponencie klasowym (to fix, write a function component instead of a class!)
    useEffect(() => {})
    // ...
  }
}
```

Z pomocą [wtyczki `eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) możesz wyłapać te błędy w trakcie pisania kodu.

<Note>

[Własne hooki](/docs/hooks-custom.html) *mogą* wywoływać inne hooki (taki jest ich cel). Dzieje się tak dlatego, że własne hooki także mogą być wywoływane jedynie wewnątrz komponentów funkcyjnych.

</Note>

## Niepasujące wersje Reacta i React DOM {/*mismatching-versions-of-react-and-react-dom*/}

Być może używasz paczki `react-dom` (< 16.8.0) lub `react-native` (< 0.59), która jeszcze nie obsługuje hooków. Uruchom polecenie `npm ls react-dom` lub `npm ls react-native` w katalogu z aplikacją, aby sprawdzić numer używanej wersji. Jeśli ponadto na liście zobaczysz co najmniej dwa takie same wpisy, może to być przyczyną kolejnych problemów (o czym piszemy poniżej).

## Duplikaty biblioteki React {/*duplicate-react*/}

Aby hooki mogły działać, paczka `react` importowana w twojej aplikacji musi wskazywać na tę samą paczkę `react` importowaną przez `react-dom`.

Jeśli te importy wskazują na dwa różne obiekty, zobaczysz powyższe ostrzeżenie. Może się to zdarzyć, gdy **przypadkiem w projekcie znajdą się dwie kopie** paczki `react`.

Jeśli używasz Node'a do zarządzania paczkami, możesz to sprawdzić, uruchamiając w folderze projektu polecenie:

<TerminalBlock>

npm ls react

</TerminalBlock>

Jeżeli na zwróconej liście zobaczysz więcej niż jednego Reacta, musisz znaleźć przyczynę i naprawić drzewo zależności projektu. Być może któraś z używanych przez ciebie paczek zamiast deklarować `react` jako "peer dependency", deklaruje ją jako "dependency". Dopóki ta paczka nie zostanie naprawiona, możesz obejść problem korzystając z [Yarn resolutions](https://yarnpkg.com/lang/en/docs/selective-version-resolutions/).

W zdiagnozowaniu problemu może pomóc dodanie paru logów do aplikacji i zrestartowanie serwera deweloperskiego:

```js
// Dodaj w node_modules/react-dom/index.js
window.React1 = require('react');

// Dodaj w pliku z komponentem
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);
```

Jeśli w konsoli pojawi się `false`, to najprawdopodobniej używasz dwóch różnych paczek Reacta i musisz dowiedzieć się, jaka jest tego przyczyna. W [tym zgłoszonym problemie](https://github.com/facebook/react/issues/13991) opisano niektóre z najczęstszych przyczyn tego problemu.

Inną przyczyną może być użycie polecenia `npm link` lub podobnego. W takim przypadku twój bundler (ang. *narzędzie pakujące*) może "widzieć" dwa Reacty - jeden w folderze aplikacji i jeden w folderze z bibliotekami. Zakładając, że foldery `myapp` i `mylib` znajdują się na tym samym poziomie, pomóc może uruchomienie polecenia `npm link ../myapp/node_modules/react` z folderu `mylib`. Powinno to zmusić bibliotekę do używania kopii Reacta należącej do aplikacji.

<Note>

Z założenia React pozwala na używanie kilku niezależnych kopii biblioteki na jednej stronie (np. gdy korzystają z niej zarówno aplikacja, jak i zewnętrzny widget). Problem występuje tylko wtedy, gdy wywołanie `require('react')` wskazuje co innego dla komponentu, a co innego renderującej go kopii biblioteki `react-dom`.

</Note>

## Inne przypadki {/*other-causes*/}

Jeśli nie pomogło żadne z powyższych rozwiązań, napisz komentarz w [tym wątku](https://github.com/facebook/react/issues/13991), a spróbujemy ci pomóc. Postaraj się przygotować prosty przykład ilustrujący problem - możliwe, że znajdziesz rozwiązanie w trakcie opisywania problemu.
