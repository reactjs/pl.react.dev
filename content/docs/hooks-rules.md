---
id: hooks-rules
title: Zasady korzystania z hooków
permalink: docs/hooks-rules.html
next: hooks-custom.html
prev: hooks-effect.html
---

*Hooki* są nowym dodatkiem w Reakcie 16.8. Pozwalają one używać stanu i innych funkcjonalności Reacta, bez użycia klas.

Hooki są javascriptowymi funkcjami, ale podczas korzystania z nich musisz pamiętać o dwóch ważnych zasadach. Stworzyliśmy [wtyczkę do lintera](https://www.npmjs.com/package/eslint-plugin-react-hooks), która automatycznie wymusza stosowanie tych zasad:

### Wywołuj hooki tylko z najwyższego poziomu kodu {#only-call-hooks-at-the-top-level}

**Nie wywołuj hooków wewnątrz pętli, instrukcji warunkowych czy zagnieżdżonych funkcji.** Korzystaj z hooków tylko z najwyższego poziomu kodu twoich komponentów funkcyjnych, jeszcze przed zwróceniem wartości. Przestrzegając tej zasady, zyskujesz pewność, że hooki zostaną wywołane w tej samej kolejności, za każdym razem gdy komponent jest renderowany. To właśnie pozwala Reactowi na właściwe przechowywanie stanu pomiędzy kolejnymi wywołaniami `useState` i `useEffect` (Jeśli ciekawi cię ten temat, dogłębnie wyjaśnimy go [w kolejnym podrozdziale](#explanation).)

### Wywołuj hooki tylko w komponentach funkcyjnych {#only-call-hooks-from-react-functions}

**Nie wywołuj hooków wewnątrz zwykłych javascriptowych funkcji.** Zamiast tego możesz:

* ✅ Wywoływać hooki wewnątrz reactowych komponentów funkcyjnych.
* ✅ Wywoływać hooki wewnątrz własnych hooków (więcej na ten temat dowiemy się [w następnym rozdziale](/docs/hooks-custom.html)).

Przestrzegając tej zasady, upewniasz się, że cała logika związana ze stanem komponentu jest wyraźnie widoczna w jego kodzie źródłowym.

## Wtyczka dla ESLinta {#eslint-plugin}

Wydaliśmy wtyczkę dla ESLinta o nazwie [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks), która wymusza stosowanie tych dwóch zasad. Jeśli chcesz ją wypróbować, możesz dodać ją do swojego projektu w następujący sposób:

Wtyczka ta jest instalowana domyślnie w [Create React App](/docs/create-a-new-react-app.html#create-react-app).

```bash
npm install eslint-plugin-react-hooks --save-dev
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

**Możesz teraz przejść do następnego rozdziału, gdzie wyjaśniamy, [jak pisać własne hooki](/docs/hooks-custom.html).** W tym rozdziale postaramy się uzasadnić, dlaczego narzucamy takie zasady.

## Wyjaśnienie {#explanation}

Jak [dowiedzieliśmy się wcześniej](/docs/hooks-state.html#tip-using-multiple-state-variables), w ramach pojedynczego komponentu możemy używać wielu hooków stanu i efektów:

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

Skąd zatem React wie, jaką wartość stanu zwrócić przy kolejnych wywołaniach funkcji `useState`? Tajemnica tkwi w tym, że **React polega na kolejności, w jakiej hooki są wywoływane.** Nasz przykład zadziała, ponieważ kolejność wywoływania hooków jest taka sama przy każdym renderowaniu:

```js
// ------------
// Pierwsze renderowanie
// ------------
useState('Mary')           // 1. Zainicjalizuj zmienną stanu imienia wartością „Mary”
useEffect(persistForm)     // 2. Dodaj efekt odpowiedzialny za przechowywanie danych formularza
useState('Poppins')        // 3. Zainicjalizuj zmienną stanu nazwiska wartością „Poppins”
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

Tak długo, jak kolejność wywoływania hooków pozostaje taka sama pomiędzy kolejnymi renderowaniami, React może powiązać lokalny stan z każdym z nich. A co wydarzy się, jeśli umieścimy wywołanie hooka (na przykład efektu `persistForm`) wewnątrz instrukcji warunkowej?

```js
  // 🔴 Łamiemy pierwszą zasadę, używając hooka wewnątrz instrukcji warunkowej
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
```

Warunek `name !== ''` jest spełniony przy pierwszym renderze, więc uruchamiany jest ten hook. Jednakże przy kolejnym renderze użytkownik może wyczyścić wartości formularza, powodując, że warunek nie będzie spełniony. Teraz, w związku z tym, że pominęliśmy hook podczas renderowania, kolejność wywoływania hooków zostaje zachwiana:

```js
useState('Mary')           // 1.Odczytaj zmienną stanu przechowującą imię (argument został zignorowany)
// useEffect(persistForm)  // 🔴 Ten hook został pominięty!
useState('Poppins')        // 🔴 2 (a był 3). Nie uda się odczytać zmiennej stanu
useEffect(updateTitle)     // 🔴 3 (a był 4). Nie uda się zastąpić efektu
```

React nie wiedziałby, co zwrócić dla drugiego wywołania hooka `useState`. React spodziewał się, że drugie wywołanie hooka w tym komponencie będzie odpowiadało wywołaniu efektu `persistForm`, tak jak podczas poprzedniego renderowania. Nie jest to już jednak prawdą. Od tej chwili każde kolejne wywołanie hooka, po tym, jak jeden został pominięty, również przesunęłoby się o jeden, prowadząc do błędów.

**Dlatego właśnie hooki muszą być wywoływane z najwyższego poziomu kodu komponentów.** Jeśli chcesz, żeby efekt działał pod jakimś warunkiem, możesz umieścić ten warunek *wewnątrz* hooka:

```js
  useEffect(function persistForm() {
    // 👍 Tym razem nie łamiemy pierwszej zasady
    if (name !== '') {
      localStorage.setItem('formData', name);
    }
  });
```

**Zauważ, że nie musisz o tym pamiętać, jeśli użyjesz [dostarczonej przez nas reguły lintera](https://www.npmjs.com/package/eslint-plugin-react-hooks).** Teraz jednak wiesz także, *dlaczego* hooki działają w ten sposób i jakim problemom zapobiega stosowanie tej reguły.

## Kolejne kroki {#next-steps}

W końcu jesteśmy gotowi na to, aby nauczyć się [pisać własne hooki](/docs/hooks-custom.html)! Własne hooki pozwalają łączyć hooki dostarczone przez Reacta we własne abstrakcje i współdzielić logikę związaną ze stanem pomiędzy komponentami.
