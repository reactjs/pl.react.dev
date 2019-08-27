---
id: testing-recipes
title: Przykłady i dobre praktyki
permalink: docs/testing-recipes.html
prev: testing.html
next: testing-environments.html
---

Wzorce często używane przy testowaniu komponentów reactowych.

> Uwaga:
>
> Ten rozdział zakłada, że do uruchamiania testów używasz [Jesta](https://jestjs.io/). Jeśli używasz innego narzędzia, konieczne będzie dostosowanie kodu do jego interfejsu API, jednak ogólny zarys rozwiązania powinien być taki sam. Aby dowiedzieć się więcej na temat konfiguracji środowiska testowego, przeczytaj rozdział pt. [Środowiska testowe](/docs/testing-environments.html).

W tym rozdziale będziemy głównie używać komponentów funkcyjnych. Mimo to z powodzeniem możesz zastąpić je komponentami klasowymi, ponieważ opisane tu rozwiązania nie zależą od sposobu implementacji.

- [Setup/Teardown (pol. *Ustawienie/Zniszczenie*)](#setup--teardown)
- [`act()`](#act)
- [Renderowanie](#rendering)
- [Pobieranie danych](#data-fetching)
- [Mockowanie modułów](#mocking-modules)
- [Zdarzenia](#events)
- [Timery](#timers)
- [Testowanie snapshotowe](#snapshot-testing)
- [Wiele silników renderujących](#multiple-renderers)
- [Brakuje czegoś?](#something-missing)

---

### Setup/Teardown (pol. *Ustawienie/Zniszczenie*) {#setup--teardown}

Zwykle w każdym teście chcemy wyrenderować nasze drzewo reactowe do elementu DOM umieszczonego w globalnym obiekcie `document`. Tylko wtedy nasze komponenty będą otrzymywać zdarzenia DOM. Po zakończonym teście musimy "posprzątać", odmontowując drzewo od obiektu `document`.

Popularnym sposobem na to jest użycie pary bloków `beforeEach` (pol. *przed każdym*) oraz `afterEach` (pol. *po każdym*) uruchamianych przy każdym teście, które gwarantują pełną izolację wszelkich efektów ubocznych w naszych testach:

```jsx
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  // ustaw element DOM jako miejsce renderowania
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // posprzątaj po zakończeniu
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
```

Możesz skorzystać z innego podejście. Pamiętaj jednak, że należy posprzątać _nawet jeśli test nie przejdzie pomyślnie_. W przeciwnym wypadku testy staną się "dziurawe" i będą mogły wpływać na działanie innych testów. Znacznie utrudnia to debuggowanie.

---

### `act()` {#act}

Podczas pisania testów interfejsu UI, zadania takie jak: renderowanie, obsługa zdarzeń czy pobieranie danych można traktować jako "jednostki" interakcji z interfejsem użytkownika. Biblioteka React dostarcza funkcję pomocniczą `act()`, która upewnia się, że przed wykonaniem asercji zostają przetworzone wszelkie zmiany dotyczące tych "jednostek", a drzewo DOM jest aktualne.

```js
act(() => {
  // wyrenderuj komponenty
});
// wykonaj sprawdzenia
```

Pozwala to na uruchamianie testów w sposób zbliżony do faktycznego zachowania podczas interakcji użytkownika z aplikacją. Pozostałe przykłady w tym rozdziale używają funkcji `act()`, aby to zagwarantować.

Używanie `act()` bezpośrednio może wydawać się jednak zbyt rozwlekłe. Aby uniknąć pisania w kółko tego samego kodu, możesz użyć biblioteki takiej jak [React Testing Library](https://testing-library.com/react), której to funkcje pomocnicze są "opakowane" w `act()`.

> Uwaga:
>
> Nazwa `act` pochodzi od zasady [Arrange-Act-Assert](http://wiki.c2.com/?ArrangeActAssert) (pol. *Przygotuj-Wykonaj-Sprawdź).

---

### Renderowanie {#rendering}

Komponenty zazwyczaj testuje się poprzez sprawdzenie, czy renderują się one poprawnie dla konkretnych danych wejściowych. Rozważmy następujący komponent wyświetlający wiadomość:

```jsx
// hello.js

import React from "react";

export default function Hello(props) {
  if (props.name) {
    return <h1>Witaj, {props.name}!</h1>;
  } else {
    return <span>Cześć, nieznajomy</span>;
  }
}
```

Test dla takiego komponentu może wygląda tak:

```jsx{24-27}
// hello.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Hello from "./hello";

let container = null;
beforeEach(() => {
  // ustaw element DOM jako miejsce renderowania
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // posprzątaj po zakończeniu
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  act(() => {
    render(<Hello />, container);
  });
  expect(container.textContent).toBe("Hey, stranger");

  act(() => {
    render(<Hello name="Jenny" />, container);
  });
  expect(container.textContent).toBe("Hello, Jenny!");

  act(() => {
    render(<Hello name="Margaret" />, container);
  });
  expect(container.textContent).toBe("Hello, Margaret!");
});
```

---

### Data Fetching {#data-fetching}

Instead of calling real APIs in all your tests, you can mock requests with dummy data. Mocking data fetching with "fake" data prevents flaky tests due to an unavailable backend, and makes them run faster. Note: you may still want to run a subset of tests using an ["end-to-end"](/docs/testing-environments.html#end-to-end-tests-aka-e2e-tests) framework that tells whether the whole app is working together.

```jsx
// user.js

import React, { useState, useEffect } from "react";

export default function User(props) {
  const [user, setUser] = useState(null);

  async function fetchUserData(id) {
    const response = await fetch("/" + id);
    setUser(await response.json());
  }

  useEffect(() => {
    fetchUserData(props.id);
  }, [props.id]);

  if (!user) {
    return "loading...";
  }

  return (
    <details>
      <summary>{user.name}</summary>
      <strong>{user.age}</strong> years old
      <br />
      lives in {user.address}
    </details>
  );
}
```

We can write tests for it:

```jsx{23-33,44-45}
// user.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import User from "./user";

let container = null;
beforeEach(() => {
  // ustaw element DOM jako miejsce renderowania
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // posprzątaj po zakończeniu
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("wyświetla dane użytkownika", async () => {
  const fakeUser = {
    name: "Joni Baez",
    age: "32",
    address: "123, Charming Avenue"
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser)
    })
  );

  // Użyj asynchronicznej wersji funkcji act, aby poczekać na zakończenie
  await act(async () => {
    render(<User id="123" />, container);
  });

  expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
  expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
  expect(container.textContent).toContain(fakeUser.address);

  // usuń mock, aby zapewnić izolację testu
  global.fetch.mockRestore();
});
```

---

### Mockowanie modułów {#mocking-modules}

Niektóre moduły mogą nie działać poprawnie w środowisku testowym lub mogą być nieistotne z perspektywy danego testu. Mockowanie takich modułów przy użyciu udawanych modułów może znacznie ułatwić pisanie testów do własnego kodu.

Rozważmy komponent `Contact`, który zawiera w sobie komponent `GoogleMap` z biblioteki zewnętrznej:

```jsx
// map.js

import React from "react";

import { LoadScript, GoogleMap } from "react-google-maps";
export default function Map(props) {
  return (
    <LoadScript id="script-loader" googleMapsApiKey="TWOJ_KLUCZ_API">
      <GoogleMap id="example-map" center={props.center} />
    </LoadScript>
  );
}

// contact.js

import React from "react";
import Map from "./map";

function Contact(props) {
  return (
    <div>
      <address>
        Skontaktuj się z {props.name} za pomocą{" "}
        <a data-testid="email" href={"mailto:" + props.email}>
          e-maila
        </a>
        lub <a data-testid="site" href={props.site}>
          strony internetowej
        </a>.
      </address>
      <Map center={props.center} />
    </div>
  );
}
```

Jeśli nie chcemy ładować tego komponentu w ramach naszych testów, możemy go zamockować przy użyciu udawanego komponentu:

```jsx{10-18}
// contact.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Contact from "./contact";
import MockedMap from "./map";

jest.mock("./map", () => {
  return function DummyMap(props) {
    return (
      <div data-testid="map">
        {props.center.lat}:{props.center.long}
      </div>
    );
  };
});

let container = null;
beforeEach(() => {
  // ustaw element DOM jako miejsce renderowania
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // posprzątaj po zakończeniu
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render contact information", () => {
  const center = { lat: 0, long: 0 };
  act(() => {
    render(
      <Contact
        name="Joni Baez"
        email="test@example.com"
        site="http://test.com"
        center={center}
      />,
      container
    );
  });

  expect(
    container.querySelector("[data-testid='email']").getAttribute("href")
  ).toEqual("mailto:test@example.com");

  expect(
    container.querySelector('[data-testid="site"]').getAttribute("href")
  ).toEqual("http://test.com");

  expect(container.querySelector('[data-testid="map"]').textContent).toEqual(
    "0:0"
  );
});
```

---

### Zdarzenia {#events}

Sugerujemy, aby do elementów DOM przesyłać prawdziwe zdarzenia DOM, a następnie sprawdzać ich rezultat. Rozważmy następujący komponent `Toggle`:

```jsx
// toggle.js

import React, { useState } from "react";

export default function Toggle(props) {
  const [state, setState] = useState(false);
  return (
    <button
      onClick={() => {
        setState(previousState => !previousState);
        props.onChange(!state);
      }}
      data-testid="toggle"
    >
      {state === true ? "Wyłącz" : "Włącz"}
    </button>
  );
}
```

Testy dla niego mogłyby wyglądać następująco:

```jsx{13-14,35,43}
// toggle.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Toggle from "./toggle";

let container = null;
beforeEach(() => {
  // ustaw element DOM jako miejsce renderowania
  container = document.createElement("div");
  // aby zdarzenia działały poprawnie, kontener *musi* być umieszczony w obiekcie `document`
  document.body.appendChild(container);
});

afterEach(() => {
  // posprzątaj po zakończeniu
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("zmienia wartość po kliknięciu", () => {
  const onChange = jest.fn();
  act(() => {
    render(<Toggle onChange={onChange} />, container);
  });

  // zlokalizuj przycisk i wywołaj na nim zdarzenie kliknięcia
  const button = document.querySelector("[data-testid=toggle]");
  expect(button.innerHTML).toBe("Wyłącz");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(button.innerHTML).toBe("Włącz");

  act(() => {
    for (let i = 0; i < 5; i++) {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  expect(onChange).toHaveBeenCalledTimes(6);
  expect(button.innerHTML).toBe("Włącz");
});
```

Poszczególne zdarzenia DOM wraz z ich właściwościami zostały opisane na [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent). Zwróć uwagę, że do każdego zdarzenia musisz przekazać `{ bubbles: true }`, aby mogło ono dotrzeć do Reacta, który z kolei przekaże je do dokumentu.

> Uwaga:
>
> [Funkcje pomocnicze w React Testing Library](https://testing-library.com/docs/dom-testing-library/api-events) umożliwiają przesyłanie zdarzeń w sposób bardziej zwięzły.

---

### Timery {#timers}

Twój kod może korzystać z funkcji opartych na timerach, np. `setTimeout`, w celu zaplanowania wykonania jakiejś akcji w przyszłości. W tym przykładzie stworzyliśmy panel wielokrotnego wyboru, który zmienia zaznaczenie, jeśli użytkownik nie wybierze niczego w ciągu 5 sekund:

```jsx
// card.js

import React, { useEffect } from "react";

export default function Card(props) {
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      props.onSelect(null);
    }, 5000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [props.onSelect]);

  return [1, 2, 3, 4].map(choice => (
    <button
      key={choice}
      data-testid={choice}
      onClick={() => props.onSelect(choice)}
    >
      {choice}
    </button>
  ));
}
```

W pisaniu testów do tego komponentu pomocne mogą okazać się [jestowe sztuczne timery](https://jestjs.io/docs/en/timer-mocks). Umożliwi to sprawdzenie stanu komponentu w różnych momentach.

```jsx{7,31,37,49,59}
// card.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

jest.useFakeTimers();

let container = null;
beforeEach(() => {
  // ustaw element DOM jako miejsce renderowania
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // posprzątaj po zakończeniu
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("powinien zaznaczyć null po upływie czasu", () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });

  // przesuń timer o 100ms
  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(onSelect).not.toHaveBeenCalled();

  // a teraz dodaj kolejne 5 sekund
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(onSelect).toHaveBeenCalledWith(null);
});

it("powinien posprzątać po sobie po usunięciu", () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });

  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(onSelect).not.toHaveBeenCalled();

  // odmontuj aplikację
  act(() => {
    render(null, container);
  });

  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(onSelect).not.toHaveBeenCalled();
});

it("powinien umożliwiać zaznacznie", () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });

  act(() => {
    container
      .querySelector("[data-testid=2]")
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onSelect).toHaveBeenCalledWith(2);
});
```

Możesz używać sztucznych timerów w wybranych przez siebie testach. Na powyższym przykładzie aktywowaliśmy je poprzez wywołanie `jest.useFakeTimers()`. Główną ich zaletą jest brak konieczności czekania 5 sekund na wykonanie się testu. Ponadto, nie trzeba było wprowadzać na potrzeby testu zawiłych zmian w kodzie komponentu.

---

### Testowanie snapshotowe {#snapshot-testing}

Frameworki takie jak Jest pozwalają również na zapisywanie "snapshotów" (pol. *zrzutów*) danych przy użyciu funkcji [`toMatchSnapshot` / `toMatchInlineSnapshot`](https://jestjs.io/docs/en/snapshot-testing). Z ich pomocą możemy "zapisać" wynik renderowania komponentu i zagwarantować, że dowolna jego zmiana musi być każdorazowo potwierdzana podczas generowania snapshota.

W poniższym przykładzie renderujemy komponent i formatujemy powstały w ten sposób kod HTML za pomocą paczki [`pretty`](https://www.npmjs.com/package/pretty), zanim ostatecznie wynik trafi do snapshota:

```jsx{29-31}
// ponownie hello.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import Hello from "./hello";

let container = null;
beforeEach(() => {
  // ustaw element DOM jako miejsce renderowania
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // posprzątaj po zakończeniu
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("powinien wyrenderować powitanie", () => {
  act(() => {
    render(<Hello />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... zostanie automatycznie zastąpione przez Jesta ... */

  act(() => {
    render(<Hello name="Jenny" />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... zostanie automatycznie zastąpione przez Jesta ... */

  act(() => {
    render(<Hello name="Margaret" />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... zostanie automatycznie zastąpione przez Jesta ... */
});
```

Zazwyczaj jednak, zamiast porównywać snapshoty, zaleca się wykonywać bardziej szczegółowe sprawdzenia. Tego typu testy zawierają zbyt wiele szczegółów implementacyjnych, więc łatwo się psują. Ponadto, usypiają czujność zespołu na błędy w snapshotach. Wybiórcze [mockowanie niektórych komponentów potomnych](#mocking-modules) może pomóc zredukować rozmiar snapshotów, a co za tym idzie zwiększyć ich czytelność dla osoby sprawdzającej kod.

---

### Wiele silników renderujących {#multiple-renderers}

W rzadkich przypadkach możesz natknąć się test komponentu, który korzysta z wielu silników renderujących. Na przykład, test snapshotowy może używać paczki `react-test-renderer`, która wewnętrznie korzysta z silnika `ReactDOM.render` dla komponentu potomnego w celu wyrenderowania jakiejś treści. W takim przypadku możesz opakować aktualizacje drzewa komponentów w funkcje `act()` właściwe odpowiednim silnikom renderującym.

```jsx
import { act as domAct } from "react-dom/test-utils";
import { act as testAct, create } from "react-test-renderer";
// ...
let root;
domAct(() => {
  testAct(() => {
    root = create(<App />);
  });
});
expect(root).toMatchSnapshot();
```

---

### Czegoś brakuje? {#something-missing}

Jeśli nie opisaliśmy tu jakiegoś przypadku, [daj nam o tym znać poprzez zgłoszenie](https://github.com/reactjs/reactjs.org/issues) dotyczące strony z dokumentacją.
