---
title: Rules of Hooks
---

<<<<<<< HEAD:content/warnings/invalid-hook-call-warning.md
Jesteś tu najprawdopodobniej z powodu błędu:
=======
You are probably here because you got the following error message:
>>>>>>> 543c7a0dcaf11e0400a9deb2465190467e272171:src/content/warnings/invalid-hook-call-warning.md

<ConsoleBlock level="error">

Hooks can only be called inside the body of a function component.

</ConsoleBlock>

Zwykle pojawia się on z trzech powodów:

<<<<<<< HEAD:content/warnings/invalid-hook-call-warning.md
1. Używasz **różnych wersji** bibliotek React i React DOM.
2. **Łamiesz [Zasady korzystania z hooków](/docs/hooks-rules.html)**.
3. Masz **więcej niż jedną kopię Reacta** w danej aplikacji.
=======
1. You might be **breaking the Rules of Hooks**.
2. You might have **mismatching versions** of React and React DOM.
3. You might have **more than one copy of React** in the same app.
>>>>>>> 543c7a0dcaf11e0400a9deb2465190467e272171:src/content/warnings/invalid-hook-call-warning.md

Przyjrzyjmy się bliżej każdemu z tych przypadków.

<<<<<<< HEAD:content/warnings/invalid-hook-call-warning.md
## Niepasujące wersje Reacta i React DOM {#mismatching-versions-of-react-and-react-dom}

Być może używasz paczki `react-dom` (< 16.8.0) lub `react-native` (< 0.59), która jeszcze nie obsługuje hooków. Uruchom polecenie `npm ls react-dom` lub `npm ls react-native` w katalogu z aplikacją, aby sprawdzić numer używanej wersji. Jeśli ponadto na liście zobaczysz co najmniej dwa takie same wpisy, może to być przyczyną kolejnych problemów (o czym piszemy poniżej).

## Łamanie zasad korzystania z hooków {#breaking-the-rules-of-hooks}

Hooki można wywoływać **tylko w komponentach funkcyjnych**:

* ✅ Wywołuj je na głównym poziomie ciała komponentu funkcyjnego.
* ✅ Wywołuj je na głównym poziomie ciała [własnego hooka](/docs/hooks-custom.html).

**Więcej na ten temat dowiesz się w rozdziale pt. [Zasady korzystania z hooków](/docs/hooks-rules.html).**
=======
## Breaking Rules of Hooks {/*breaking-rules-of-hooks*/}

Functions whose names start with `use` are called [*Hooks*](/reference/react) in React.

**Don’t call Hooks inside loops, conditions, or nested functions.** Instead, always use Hooks at the top level of your React function, before any early returns. You can only call Hooks while React is rendering a function component:

* ✅ Call them at the top level in the body of a [function component](/learn/your-first-component).
* ✅ Call them at the top level in the body of a [custom Hook](/learn/reusing-logic-with-custom-hooks).
>>>>>>> 543c7a0dcaf11e0400a9deb2465190467e272171:src/content/warnings/invalid-hook-call-warning.md

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

<<<<<<< HEAD:content/warnings/invalid-hook-call-warning.md
Dla jasności, hooków **nie** można wywoływać w żaden inny sposób:

* 🔴 Nie wywołuj hooków w komponentach klasowych.
* 🔴 Nie wywołuj hooków w procedurach obsługi zdarzeń.
* 🔴 Nie wywołuj hooków w funkcjach przekazywanych do `useMemo`, `useReducer` lub `useEffect`.
=======
It’s **not** supported to call Hooks (functions starting with `use`) in any other cases, for example:

* 🔴 Do not call Hooks inside conditions or loops.
* 🔴 Do not call Hooks after a conditional `return` statement.
* 🔴 Do not call Hooks in event handlers.
* 🔴 Do not call Hooks in class components.
* 🔴 Do not call Hooks inside functions passed to `useMemo`, `useReducer`, or `useEffect`.
>>>>>>> 543c7a0dcaf11e0400a9deb2465190467e272171:src/content/warnings/invalid-hook-call-warning.md

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
<<<<<<< HEAD:content/warnings/invalid-hook-call-warning.md
    // 🔴 Źle: w komponencie klasowym
=======
    // 🔴 Bad: inside a class component (to fix, write a function component instead of a class!)
>>>>>>> 543c7a0dcaf11e0400a9deb2465190467e272171:src/content/warnings/invalid-hook-call-warning.md
    useEffect(() => {})
    // ...
  }
}
```

<<<<<<< HEAD:content/warnings/invalid-hook-call-warning.md
Z pomocą [wtyczki `eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) możesz wyłapać te błędy w trakcie pisania kodu.

>Uwaga
>
>[Własne hooki](/docs/hooks-custom.html) *mogą* wywoływać inne hooki (taki jest ich cel). Dzieje się tak dlatego, że własne hooki także mogą być wywoływane jedynie wewnątrz komponentów funkcyjnych.
=======
You can use the [`eslint-plugin-react-hooks` plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) to catch these mistakes.

<Note>
>>>>>>> 543c7a0dcaf11e0400a9deb2465190467e272171:src/content/warnings/invalid-hook-call-warning.md

[Custom Hooks](/learn/reusing-logic-with-custom-hooks) *may* call other Hooks (that's their whole purpose). This works because custom Hooks are also supposed to only be called while a function component is rendering.

<<<<<<< HEAD:content/warnings/invalid-hook-call-warning.md
## Duplikaty biblioteki React {#duplicate-react}
=======
</Note>

## Mismatching Versions of React and React DOM {/*mismatching-versions-of-react-and-react-dom*/}

You might be using a version of `react-dom` (< 16.8.0) or `react-native` (< 0.59) that doesn't yet support Hooks. You can run `npm ls react-dom` or `npm ls react-native` in your application folder to check which version you're using. If you find more than one of them, this might also create problems (more on that below).

## Duplicate React {/*duplicate-react*/}
>>>>>>> 543c7a0dcaf11e0400a9deb2465190467e272171:src/content/warnings/invalid-hook-call-warning.md

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

<<<<<<< HEAD:content/warnings/invalid-hook-call-warning.md
>Uwaga
>
>Z założenia React pozwala na używanie kilku niezależnych kopii biblioteki na jednej stronie (np. gdy korzystają z niej zarówno aplikacja, jak i zewnętrzny widget). Problem występuje tylko wtedy, gdy wywołanie `require('react')` wskazuje co innego dla komponentu, a co innego renderującej go kopii biblioteki `react-dom`.

## Inne przypadki {#other-causes}
=======
<Note>

In general, React supports using multiple independent copies on one page (for example, if an app and a third-party widget both use it). It only breaks if `require('react')` resolves differently between the component and the `react-dom` copy it was rendered with.

</Note>

## Other Causes {/*other-causes*/}
>>>>>>> 543c7a0dcaf11e0400a9deb2465190467e272171:src/content/warnings/invalid-hook-call-warning.md

Jeśli nie pomogło żadne z powyższych rozwiązań, napisz komentarz w [tym wątku](https://github.com/facebook/react/issues/13991), a spróbujemy ci pomóc. Postaraj się przygotować prosty przykład ilustrujący problem - możliwe, że znajdziesz rozwiązanie w trakcie opisywania problemu.
