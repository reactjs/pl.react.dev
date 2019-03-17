---
id: hooks-rules
title: Zasady korzystania z hooków
permalink: docs/hooks-rules.html
next: hooks-custom.html
prev: hooks-effect.html
---

*Hooki* są nowym dodatkiem w Reakcie 16.8. Pozwalają one używać stanu i innych funkcjonalności Reacta, bez użycia klas.

Hooki są javascryptowymi funkcjami, ale musisz pamiętać o dwóch ważnych zasadach, kiedy z nich korzystasz. Stworzyliśmy [wtyczkę do lintera](https://www.npmjs.com/package/eslint-plugin-react-hooks), która automatycznie wymusza stosowanie tych zasad:

### Wywołuj hooki tylko z najwyższego poziomu kodu {#only-call-hooks-at-the-top-level}

**Nie wywołuj Hooków z wewnątrz pętli, warunków czy zagnieżdżonych funkcji.** Korzystaj z hooków tylko z najwyższego poziomu kodu twoich komponentów funkcyjnych. Przestrzegając tej zasady zyskujesz pewność, że hooki zostaną wywołane w tej samej kolejności, za każdym razem gdy komponent jest renderowany. To właśnie pozwala Reactowi na właściwe przechowywanie stanu pomiędzy kolejnymi wywołaniami `useState` i `useEffect` (Jeśli jesteś ciekawy, dogłębnie wyjaśnimy to [w kolejnym podrozdziale](#explanation).)

###  Wywołuj Hooki tylko z wewnątrz reactowych komponentów funkcyjnych {#only-call-hooks-from-react-functions}

**Nie wywołuj hooków z wewnątrz zwykłych javascriptowych funkcji.** Zamiast tego możesz:

* ✅ Wywołuj hooki z wewnątrz reactowych komponentów funkcyjnych.
* ✅ Wywołuj hooki z wewnątrz własnych hooków (więcej o nich dowiemy się [w następnym rozdziale](/docs/hooks-custom.html)).

Przestrzegając tej zasady, upewniasz się, że cała logika związana ze stanem komponentu jest wyraźnie widoczna w jego kodzie źródłowym.

## Wtyczka ESLint {#eslint-plugin}

Wydaliśmy wtyczkę do EsLint o nazwie [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks), która wymusza stosowanie tych dwóch zasad. Jeśli chcesz ją wypróbować, możesz dodać ją do swojego projektu:

```bash
npm install eslint-plugin-react-hooks
```

```js
// Twoja konfiguracja ESLint
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // Sprawdza stosowanie zasad hooków
    "react-hooks/exhaustive-deps": "warn" // Sprawdza zależności efektów
  }
}
```

W przyszłości zamierzamy dołączyć te wtyczkę do Create React App i podobnych narzędzi.

**Możesz teraz przejść do następnego rozdziału, gdzie wyjaśniamy [jak pisać własne hooki](/docs/hooks-custom.html).** W tym rozdziale postaramy się uzasadnić, dlaczego narzucamy takie zasady.

## Wyjaśnienie {#explanation}

Jak [dowiedzieliśmy się wcześniej](/docs/hooks-state.html#tip-using-multiple-state-variables) możemy używać wielu hooków stanu i efektów w jednym komponencie:

```js
function Form() {
  // 1. Użyj zmiennej stanu do przechowania imienia
  const [name, setName] = useState('Mary');

  // 2. Użyj efektu, aby zapisać dane formularza
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. Użyj zmiennej stanu do przechowania nazwiska
  const [surname, setSurname] = useState('Poppins');

  // 4. Użyj efektu, aby zaktualizować tytuł strony
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}
```

Skąd zatem React wie, jaką wartość stanu zwrócić, przy kolejnych wywołaniach funkcji `useState`? Tajemnica tkwi w tym, że **React polega na kolejności, w jakiej hooki zostały wywołane.** Nasz przykład zadziała ponieważ kolejność wywoływania hooków jest taka sama przy każdym renderze:

```js
// ------------
// Pierwsze renderowanie
// ------------
useState('Mary')           // 1. Zaincializuj zmienną stanu imienia wartością „Mary”
useEffect(persistForm)     // 2. Dodaj efekt odpowiedzialny za przechowywanie danych formularza
useState('Poppins')        // 3. Zaincializuj zmienną stanu nazwiska wartością „Poppins”
useEffect(updateTitle)     // 4. Dodaj efekt odpowiedzialny za aktualizację tytułu

// -------------
// Drugie renderowanie
// -------------
useState('Mary')           // 1. Odczytaj zmienną stanu przechowującą imię (argument został zignorowany)
useEffect(persistForm)     // 2. Zastąp efekt odpowiedzialny za przechowywanie danych
useState('Poppins')        // 3. Odczytaj zmienną stanu przechowującą nazwisko (argument został zignorowany)
useEffect(updateTitle)     // 4. Zastąp efekt odpowiedzialny za aktualizację tytułu

// ...
```

As long as the order of the Hook calls is the same between renders, React can associate some local state with each of them. But what happens if we put a Hook call (for example, the `persistForm` effect) inside a condition?

```js
  // 🔴 We're breaking the first rule by using a Hook in a condition
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
```

The `name !== ''` condition is `true` on the first render, so we run this Hook. However, on the next render the user might clear the form, making the condition `false`. Now that we skip this Hook during rendering, the order of the Hook calls becomes different:

```js
useState('Mary')           // 1. Read the name state variable (argument is ignored)
// useEffect(persistForm)  // 🔴 This Hook was skipped!
useState('Poppins')        // 🔴 2 (but was 3). Fail to read the surname state variable
useEffect(updateTitle)     // 🔴 3 (but was 4). Fail to replace the effect
```

React wouldn't know what to return for the second `useState` Hook call. React expected that the second Hook call in this component corresponds to the `persistForm` effect, just like during the previous render, but it doesn't anymore. From that point, every next Hook call after the one we skipped would also shift by one, leading to bugs.

**This is why Hooks must be called on the top level of our components.** If we want to run an effect conditionally, we can put that condition *inside* our Hook:

```js
  useEffect(function persistForm() {
    // 👍 We're not breaking the first rule anymore
    if (name !== '') {
      localStorage.setItem('formData', name);
    }
  });
```

**Note that you don't need to worry about this problem if you use the [provided lint rule](https://www.npmjs.com/package/eslint-plugin-react-hooks).** But now you also know *why* Hooks work this way, and which issues the rule is preventing.

## Next Steps {#next-steps}

Finally, we're ready to learn about [writing your own Hooks](/docs/hooks-custom.html)! Custom Hooks let you combine Hooks provided by React into your own abstractions, and reuse common stateful logic between different components.
