---
id: accessibility
title: Dostępność
permalink: docs/accessibility.html
---

## Czemu dostępność? {#why-accessibility}

Pojęcie dostępności stron internetowych (określanej również [**a11y**](https://en.wiktionary.org/wiki/a11y)) zostało zaprojektowana i stworzone z myślą o internecie przystępnym dla wszystkich. Wspieranie dostępności jest niezbędne, aby umożliwić technologiom asystującym poprawną interpretację stron.

React w pełni wspiera budowanie dostępnych dla wszystkich stron internetowych, często z wykorzystaniem standardowych technik HTML.

## Standard oraz wytyczne {#standards-and-guidelines}

### WCAG {#wcag}

[Web Content Accessibility Guidelines](https://www.w3.org/WAI/intro/wcag) dostarcza zbiór wytycznych, jak tworzyć poprawne oraz dostępne dla wszystkich strony internetowe.

Poniższa lista kontrolna WCAG zawiera przegląd:

- [Lista kontrolna WCAG stworzona przez Wuhcag](https://www.wuhcag.com/wcag-checklist/)
- [Lista kontrolna WCAG stworzona przez WebAIM](https://webaim.org/standards/wcag/checklist)
- [Lista kontrolna projektu A11Y](https://a11yproject.com/checklist.html)

### WAI-ARIA {#wai-aria}

Dokument [Web Accessibility Initiative - Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria)  zawiera listę technik wyspecjalizowanych w bdowaniu w pełni dostępnych aplikacji JavaScript. 

Warto zaznaczyć, że wszystkie atrybuty HTML `aria-*` są w pełni wspierane przez JSX. Mimo, że większość tagów oraz atrybutów DOM w Reakcie zapisujemy w formacie camelCase, te związane z dostępnością, powinny być zapisane z wykorzystaniem myślników (znanych również jako kebab-case, lisp-case itp.), ponieważ są one traktowane jak czysty HTML.

```javascript{3,4}
<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/>
```

## Semantyczny HTML {#semantic-html}

Semantyczny HTML jest podstawą dostępności aplikacji webowych. Wykorzystując różne elementy HTML, które wzmacniają znaczenie informacji na naszych stronach, bardzo często, możemy stworzyć w pełni dostępną stronę bez dodatkowych nakładów pracy.

- [MDN elementy HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

Czasem łamiemy zasady semantycznego HTMl, kiedy dodajemy dodatkowy element `div` do naszego JSX, aby uruchomić aplikację, zwłaszcza, kiedy pracujemy z listami (`<ol>`, `<ul>` and `<dl>`) oraz tabelami `<table>`.
W takim przypadkach, powinniśmy wykorzystać [React Fragment](/docs/fragments.html), który pozwoli na zgrupowanie wielu elementów.

Przykład:

```javascript{1,5,8}
import React, { Fragment } from 'react';

function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
}
```

Możesz mapować kolekcje elmentów do tablicy fragmentów, zupełnie jakby to był dowolnie inny typ elementów:

```javascript{6,9}
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Fragments should also have a `key` prop when mapping collections
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

Kiedy nie chcesz przekazywać żadnych dodatkowych właściwości do Fraguemntu, wówczas możesz użyć [skróconej składni](/docs/fragments.html#short-syntax). Upewnij się, że wspomniany zapis wspiera również Twój edytor.

```javascript{3,6}
function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}
```

Więcej znajdziesz w [dokumentacji Fragmentów](/docs/fragments.html).

## Dostępne Formularze {#accessible-forms}

### Etykietowanie {#labeling}
Każdy element kontrolujący formularz, taki jak `input` oraz `textarea`, powinien być etykietowany w dostępny sposób. Powinniśmy wykorzystać etykietę, która dobrze opisuję pole tekstowe oraz jest widoczne dla czytników ekranowych.

Poniższe zasoby opisują, jak zrobić to dobrze:

- [W3C pokazuje jak etykietować elementy](https://www.w3.org/WAI/tutorials/forms/labels/)
- [WebAim pokazuje jak etykietować elementy](https://webaim.org/techniques/forms/controls)
- [Grupa Paciello wyjaśnia dostępność nazw](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

Chociaż te standardowe praktyki HTML mogą być bezpośrednio używane w Reakcie, zauważ, że atrybut `for` jest zapisany jako` htmlFor` w JSX:

```javascript{1}
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>
```

### Powiadamianie użytkownika o błędach {#notifying-the-user-of-errors}

W sytuacji zgłoszenia błędów, komunikaty muszą być zrozumiałe dla wszystkich użytkowników. Poniższe linki pokazują, jak wyświetlić błędy w sposób zrozumiały dla czytników ekranowych.

- [W3C - notyfikacja użytników](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [WebAIM - walidacja formularzy looks at form validation](https://webaim.org/techniques/formvalidation/)

## Kontrola ostości {#focus-control}

Upewnij się, że Twoja aplikacja internetowa może być w pełni obsługiwana tylko za pomocą klawiatury:

- [WebAIM - dostępność z wykorzystaniem klawiatury](https://webaim.org/techniques/keyboard/)

### Klawiatura i kontur ostrości {#keyboard-focus-and-focus-outline}

Kontur ostości klawiatury odnosi się do bieżącego elementu w DOM, który został wybrany poprzez zdarzenia wywołany przez klawiaturę. Widzimy to wszędzie, jako kontur podobny do tego na poniższym obrazku:

<img src="../images/docs/keyboard-focus.png" alt="Niebieski kontury ostrości wokół wybranego linku." />

Upewnij się, że wykorzystujesz regułę CSS, która usuwa ten kontury, na przykład ustawiając `outline: 0`, wyłącznie jeśli zastępujesz go kolejną implementacją konturu.

### Przejście do wybranej treści {#mechanisms-to-skip-to-desired-content}

Zapewnij mechanizm umożliwiający użytkownikom pominięcie poprzednich sekcji aplikacji, ponieważ ułątwia to i przyspiesza nawigację z wykorzystaniem klawiatury.

Łącza typu `Skiplink` lub `Skip Navigation Links` to ukryte linki nawigacyjne, które stają się widoczne tylko wtedy, gdy użytkownicy klawiatury wchodzą w interakcję ze stroną. Są bardzo łatwe w implementacji z wykorzystaniem wewnętrznych kotwic oraz niektórych styli:

- [WebAIM - Skip Navigation Links](https://webaim.org/techniques/skipnav/)

Używaj również elementów i punktów orientacyjnych, takich jak `<main>` i `<aside>`, aby rozgraniczyć sekcje strony, ponieważ technologie wspierające pozwalają użytkownikowi szybkie przemieszczanie między nimi.

Przeczytaj więcej o wykorzystaniu tych elementów w celu zwiększenia dostępności:

- [Dostępne punkty orientacyjne](https://www.scottohara.me/blog/2018/03/03/landmarks.html)

### Programowo zarządzaj ostrością {#programmatically-managing-focus}

Nasze aplikacje React nieustannie modyfikują HTML DOM w czasie wykonywania, co chwilami prowadzi do utraty konturu aktywnego elementu lub ustawienia go na nieoczekiwany element. W celu naprawy tego, musimy ręcznie ustawić ostrość we właściwym miejscu. Na przykład przez zresetowanie ostrości z przycisku, który otworzył okno modalne po jego zamknięciu.

Dokumentacja MDN opisuje dokłądniej, w jaki sposób możemy tworzyć [widgety JavaScript z obsługą klawiatury](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets).

Aby ustawić ostrość w Reakcie, możemy posłużyć się mechanizmem [Referencji do elementów DOM](/docs/refs-and-the-dom.html).

Korzystając z tego, najpierw tworzymy ref do elementu w JSX:

```javascript{4-5,8-9,13}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // Utwórz ref, aby zapisać wskaźnik na element DOM textInput
    this.textInput = React.createRef();
  }
  render() {
  // Użyj wywołania zwrotnego `ref`, aby zapisać odwołanie do wejścia
  // pola tekstowego DOM w polu instancji (na przykład this.textInput).
    return (
      <input
        type="text"
        ref={this.textInput}
      />
    );
  }
}
```

Wówczas, w razie potrzeby możemy przenieść ostrość gdzie indziej w naszym komponencie:

 ```javascript
 focus() {
   // Jawne przeniesienie ostrości podczas wprowadzania tekstu za pomocą surowego API DOM
   // Uwaga: uzyskujemy dostęp do "current", aby uzyskać węzeł DOM
   this.textInput.current.focus();
 }
 ```

Czasami komponent nadrzędny musi ustawić fokus na element komponentu podrzędnego. Możemy to zrobić poprzez [przesłanie referencji "w górę" do komponentu nadrzędnego](/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components). Można zrobić to np. przez specjalną właściwość komponentu podrzędnego, która przekazuje rodzicowi ref do węzła DOM wewnątrz dziecka.

```javascript{4,12,16}
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }
  render() {
    return (
      <CustomTextInput inputRef={this.inputElement} />
    );
  }
}

// Teraz, możesz ręcznie ustawić ostrość, kiedy to potrzebne.
this.inputElement.current.focus();
```

Kiedy używasz HOC do rozszerzenia komponentów, zaleca się [przekazanie ref](/docs/forwarding-refs.html) do opakowanego komponentu przy użyciu funkcji `forwardRef`, która wbudowana jest w Reacta. Jeśli strona trzecia HOC
nie implementuje przekierowania, powyższy wzorzec może być nadal używany jako rezerwowy.

Doskonałym przykładem zarządzania ostrością jest [react-aria-modal] (https://github.com/davidtheclark/react-aria-modal). Jest to stosunkowo rzadki przykład w pełni dostępnego okna modalnego. Nie tylko ustawia początkową ostrość
na przycisku zamykającym kontener modalny (uniemożliwiający użytkownikowi klawiatury przypadkowe aktywowanie akcji akceptującej) i zatrzymujący skupienie klawiatury wewnątrz modalu, a także po zamknięciu, przywracający ostrość z powrotem do elementu, który początkowo otworzył kontener modalny.


>Uwaga:
>
> Chociaż jest to bardzo ważna funkcja dostępności, jest to również technika, którą należy rozsądnie stosować. Użyj jej, aby naprawić przepływ ostrości klawiatury, gdy jest zakłócony, a nie próbować przewidzieć, jak
> użytkownicy chcą korzystać z aplikacji.

## Zdarzenia myszy oraz wskażnika {#mouse-and-pointer-events}

Upewnij się, że wszystkie funkcje udostępniane korzystając z myszy lub wskaźnika można również uzyskać za pomocą samej klawiatury. Sama różnorodność wskaźników prowadzi często do wielu przypadków gdzie
użytkownicy klawiatury nie mogą korzystać z aplikacji.

Aby to zilustrować, spójrzmy na doskonale obrazujący to przykład zepsutej dostępności spowodowanej wykorzystaniem zdarzenia kliknięcia. Jest to zewnętrzny wzorzec, w którym użytkownik może wyłączyć otwarty `popover`, klikając poza elementem.

<img src="../images/docs/outerclick-with-mouse.gif" alt=" Przycisk przełączający widoczność listy popover za pomocą wzorca kliknięcia na zewnątrz i obsługiwany za pomocą myszy, pokazujący, że zamknięcie działa." />

Zazwyczaj jest to implementowane przez dołączenie zdarzenia `click` do obiektu` window`, który zamyka popover:

```javascript{12-14,26-30}
class OuterClickExample extends React.Component {
constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen ? (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
```

Powyższy przykład działa poprawnie dla użytkowników krzystających ze wskaźników, takich jak np. mysz. Jednakże, obsługiwanie za pomocą samej klawiatury prowadzi do problemu przy przechodzeniu do następnego elementu listy. Jest tak, ponieważ obiekt `window` nigdy nie otrzymuje zdarzenia` click`. Może to prowadzić do uniemożliwienia użytkownikom korzystania z aplikacji.


<img src="../images/docs/outerclick-with-keyboard.gif" alt="Przełącznik otwierający listę popover za pomocą wzorca kliknięcia na zewnątrz i obsługiwany za pomocą klawiatury pokazującej, że popover nie jest zamykany na onBlur i zasłania inne elementy ekranu." />

Ta sama funkcjonalność może zostać osiągnięta poprzez użycie odpowiednich procedur obsługi zdarzeń, takich jak `onBlur` i` onFocus`:

```javascript{19-29,31-34,37-38,40-41}
class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  // Zamykamy popover na następnym tiku za pomocą setTimeout.
  // Jest to konieczne, ponieważ musimy najpierw sprawdzić,
  // czy inne dziecko elementu otrzymało ostrość jako, że
  // zdarzenie onBlur wywołuje się wyłącznie przed nowym 
  // zdarzeniem ustawienia ostrości.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // Jeśli dziecko otrzymuje ostrość, nie zamykaj elementu bedącego na wierzchu.
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // React wspiera nas w przesyłaniu ostrości
    // do rodzica.
    return (
      <div onBlur={this.onBlurHandler}
           onFocus={this.onFocusHandler}>
        <button onClick={this.onClickHandler}
                aria-haspopup="true"
                aria-expanded={this.state.isOpen}>
          Select an option
        </button>
        {this.state.isOpen ? (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
```

Ten kod udostępnia funkcje zarówno użytkownikom urządzeń wskaźnikowych, jak i klawiatury. Zwróć także uwagę na dodane wartości `aria- *` do obsługi użytkowników czytników ekranu. Dla uproszczenia zdarzenia klawiatury, aby włączyć interakcję klawiszy strzałek opcji popover, nie zostały zaimplementowane.

<img src="../images/docs/blur-popover-close.gif" alt="Lista poprawnie zamykająca się zarówno dla użytkowników myszy, jak i klawiatury." />

Jest to tylko jeden przykład z wielu przypadków, w których w zależności tylko od zdarzeń wskaźnika i myszy możemy napotkać na problem w poruszaniu się użytkowników klawiaturowych.
Stałe testowanie za pomocą klawiatury pozwala na szybkie reagowanie i odnotywowanie problemów, które można następnie naprawić korzystając ze zdarzeń mogących zostać wywołane nie tylko za pomocą wskaźników, ale również i innych sposobów nawigowania po aplikacji.

## Bardziej złożone widgety {#more-complex-widgets}

Bardziej złożone scenariusze użytkowania nie powinny oznaczać mniejszej przystępności. Dostępność jest najłatwiej osiągalna poprzez trzymanie się jak najbliżej wzorców znanych z natywnego HTML'a.
Nawet najbardziej złożony widżet może być przygotowany w przystępny sposób.

Wymagamy tutaj znajomości [ARIA Roles](https://www.w3.org/TR/wai-aria/#roles) oraz [stanów i właściwości ARIA](https://www.w3.org/TR/wai-aria/#states_and_properties).
Są to skrzynki narzędziowe wypełnione atrybutami HTML, które są w pełni obsługiwane w JSX i umożliwiają nam tworzenie w pełni dostępnych, wysoce funkcjonalnych komponentów React.

Każdy typ widżetu ma określone wzorce i oczekuje się, że będzie działał w określony sposób zarówno przez użytkowników, jak przeglądarki:

- [WAI-ARIA Authoring Practices - Wzorce projektowe i widżety](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
- [Heydon Pickering - ARIA Przykłady](https://heydonworks.com/practical_aria_examples/)
- [Inclusive Components](https://inclusive-components.design/)

## Inne punkty do rozważenia {#other-points-for-consideration}

### Ustawianie języka {#setting-the-language}

Jawnie wskaż ludzki język tekstów zamieszczonych na stronie, ponieważ oprogramowanie czytnika ekranu używa tego do wyboru prawidłowych ustawień głosu:
- [WebAIM - Język dokumentu](https://webaim.org/techniques/screenreader/#language)

### Ustawienie tytułu dokumentu {#setting-the-document-title}

Ustaw atrybut `<title>` dokumentu, aby poprawnie opisać bieżącą zawartość strony, ponieważ zapewnia to, że użytkownik pozostaje świadomy bieżącego kontekstu strony:

- [WCAG - Zrozumienie wymogu tytułu dokumentu](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html)

Możemy to ustawić w Reakcie używając [React Document Title Component](https://github.com/gaearon/react-document-title).

### Kontrast kolorów {#color-contrast}

Upewnij się, że wszystkie teksty na Twojej stronie mają wystarczający kontrast kolorów, aby pozostały maksymalnie czytelne dla użytkowników o słabym wzroku:

- [WCAG - Zrozumienie wymogu kontrastu kolorów](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
- [Wszystko o kontrastie kolorów i dlaczego warto to przemyśleć](https://www.smashingmagazine.com/2014/10/color-contrast-tips-and-tools-for-accessibility/)
- [A11yProject - Czym jest kontrast kolorów](https://a11yproject.com/posts/what-is-color-contrast/)

Ręczne obliczanie odpowiednich kombinacji kolorów dla wszystkich przypadków na swojej stronie internetowej może być nudne, więc zamiast tego [można prześledzić całą dostępną paletę kolorów za pomocą Colorable](https://jxnblk.com/colorable/).

Wymienione poniżej narzędzia aXe i WAVE zawierają również testy kontrastu kolorów i będą zgłaszać błędy kontrastu.

Jeśli chcesz rozszerzyć możliwości testowania kontrastu, możesz użyć następujących narzędzi:

- [WebAIM - Sprawdzanie kontrastu kolorów](https://webaim.org/resources/contrastchecker/)
- [The Paciello Group - Analizator kontrastu kolorów](https://www.paciellogroup.com/resources/contrastanalyser/)

## Narzędzia do tworzenia oraz testowania {#development-and-testing-tools}

Istnieje wiele narzędzi, których możemy użyć, aby pomóc w tworzeniu przystępnych aplikacji internetowych.

### Klawiatura {#the-keyboard}

Zdecydowanie najłatwiejszą i jedną z najważniejszych kontroli jest sprawdzenie, czy poruszanie się po całej stronie jest możliwe z wykorzystaniem wyłącznie klawiatury. Instrukcja sprawdzenia aplikacji:

1. Odłącz myszy.
1. Używając wyłącznie `Tab` i` Shift + Tab` przeglądaj stronę.
1. Używając `Enter` aktywuj elementy.
1. W razie potrzeby, używając klawiszy strzałek klawiatury do interakcji z niektórymi elementami, takimi jak menu i listy rozwijane.

### Pomoc przy tworzeniu {#development-assistance}

We can check some accessibility features directly in our JSX code. Often intellisense checks are already provided in JSX aware IDE's for the ARIA roles, states and properties. We also
have access to the following tool:
Możemy sprawdzić niektóre elementy dostępności bezpośrednio w naszym kodzie JSX. Często kontrole dostępności dla ról, stanów i właściwości ARIA są wbudowane w IDE obsługujące JSX. Dodatkowo, my także mamy dostęp do następującego narzędzi:

#### eslint-plugin-jsx-a11y {#eslint-plugin-jsx-a11y}

Wtyczka [eslint-plugin-jsx-a11y] (https://github.com/evcohen/eslint-plugin-jsx-a11y) dla ESLint zapewnia informacje zwrotne AST dotyczące problemów z dostępnością w Twoim JSX. Wiele IDE umożliwiają integrację tych notyfikacji bezpośrednio z analizą kodu i oknami kodu źródłowego.

[Create React App](https://github.com/facebookincubator/create-react-app) ma tę wtyczkę domyślnie zainstalowaną z podzbiorem dodatkowych reguł. Jeśli chcesz włączyć jeszcze więcej reguł dostępności, możesz utworzyć plik `.eslintrc` w katalogu głównym swojego projektu z tą treścią:

  ```json
  {
    "extends": ["react-app", "plugin:jsx-a11y/recommended"],
    "plugins": ["jsx-a11y"]
  }
  ```

### testowanie dostępności w przeglądarce {#testing-accessibility-in-the-browser}

Istnieje wiele narzędzi, które umożliwiają przeprowadzanie kontroli dostępności na stronach internetowych bezpośrednio w przeglądarce. Używaj ich w połączeniu z innymi narzędziami wymienionymi tutaj, aby jak najlepiej przygotować swój kod HTML.

#### aXe, aXe-core oraz react-axe {#axe-axe-core-and-react-axe}

Deque Systems oferuje [aXe-core](https://github.com/dequelabs/axe-core) do automatycznych i kompleksowych testów dostępności aplikacji. Moduł ten obejmuje integracje z Selenium.

[The Accessibility Engine](https://www.deque.com/products/axe/) lub ax, jest rozszerzeniem przeglądarki inspektora dostępności zbudowanym na bazie `ax-core`.

Możesz również użyć modułu [react-ax](https://github.com/dylanb/react-axe), aby zgłosić luki dotyczące dostępności bezpośrednio do konsoli, podczas pracy i debugowania.

#### WebAIM WAVE {#webaim-wave}

[Web Accessibility Evaluation Tool](https://wave.webaim.org/extension/) jest kolejną wtyczką pomagającą w testowaniu dostępności.

#### Accessibility inspectors and the Accessibility Tree {#accessibility-inspectors-and-the-accessibility-tree}

[The Accessibility Tree](https://www.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/) jest podzbiorem drzewa DOM, które zawiera dostępne obiekty dla każdego elementu DOM, który powinien zostać uwzględniony z myślą o technologiach wspomagających, takich jak czytniki ekranu.

W niektórych przeglądarkach możemy łatwo wyświetlić informacje o dostępności dla każdego elementu w drzewie dostępności:

- [Korzystanie z Inspektora dostępności w Firefoksie](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)
- [Korzystanie z Inspektora dostępności w Chromie](https://gist.github.com/marcysutton/0a42f815878c159517a55e6652e3b23a)
- [Korzystanie z Inspektora dostępności w OS X Safari](https://developer.apple.com/library/content/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)

### Czytniki ekranowe {#screen-readers}

Testowanie za pomocą czytnika ekranu powinno stanowić część testów dostępności.

Należy pamiętać, że kombinacje przeglądarki / czytnika ekranu mają znaczenie. Zaleca się przetestowanie aplikacji w przeglądarce najlepiej pasującej do wybranego czytnika ekranu.

### Często używane czytniki ekranu {#commonly-used-screen-readers}

#### NVDA w Firefoxie {#nvda-in-firefox}

[NonVisual Desktop Access](https://www.nvaccess.org/) lub NVDA to czytnik ekranu systemu Windows o otwartym kodzie źródłowym, który jest szeroko stosowany.

Zapoznaj się z następującymi poradnikami, jak najlepiej wykorzystać NVDA:

- [WebAIM - Korzystanie z NVDA do oceny dostępności sieci](https://webaim.org/articles/nvda/)
- [Deque - NVDA Skróty Klawiszowe](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)

#### VoiceOver w Safari {#voiceover-in-safari}

VoiceOver to zintegrowany czytnik ekranu na urządzeniach Apple.

Zapoznaj się z następującymi przewodnikami dotyczącymi aktywacji i korzystania z VoiceOver:

- [WebAIM - Korzystanie z VoiceOver do oceny dostępności stron internetowych](https://webaim.org/articles/voiceover/)
- [Deque - VoiceOver dla OS X Skróty Klawiaturowe](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)
- [Deque - VoiceOver dla iOS Skróty](https://dequeuniversity.com/screenreaders/voiceover-ios-shortcuts)

#### JAWS w Internet Explorer {#jaws-in-internet-explorer}

[Job Access With Speech](https://www.freedomscientific.com/Products/software/JAWS/)lub JAWS, jest popularnym czytnikiem ekranu w systemie Windows.

Zapoznaj się z następującymi poradnikami, jak najlepiej korzystać z JAWS:

- [WebAIM - Korzystanie z JAWS do oceny dostępności stron internetowych](https://webaim.org/articles/jaws/)
- [Deque - JAWS Skróty Klawiaturowe](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)

### Inne Czytniki Ekranowe {#other-screen-readers}

#### ChromeVox w Google Chrome {#chromevox-in-google-chrome}

[ChromeVox] (https://www.chromevox.com/) jest zintegrowanym czytnikiem ekranu na Chromebookach i jest dostępny [jako rozszerzenie] (https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl = en) dla Google Chrome.

Zapoznaj się z następującymi poradnikami, jak najlepiej korzystać z ChromeVox:

- [Google Chromebook Help - Użyj wbudowanego czytnika ekranu](https://support.google.com/chromebook/answer/7031755?hl=en)
- [ChromeVox klasyczne Skróty Klawiaturowe](https://www.chromevox.com/keyboard_shortcuts.html)
