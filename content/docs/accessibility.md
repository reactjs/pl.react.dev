---
id: accessibility
title: Dostępność
permalink: docs/accessibility.html
---

## Czym jest dostępność? {#why-accessibility}

Pojęcie dostępności stron internetowych (określanej również [**a11y**](https://en.wiktionary.org/wiki/a11y) od ang. *accessibility*) zostało zaprojektowane i stworzone z myślą o internecie przystępnym dla wszystkich. Wspieranie dostępności jest niezbędne, aby umożliwić technologiom asystującym poprawną interpretację stron.

React w pełni wspiera budowanie dostępnych dla wszystkich stron internetowych, często z wykorzystaniem standardowych technik HTML.

## Standard oraz wytyczne {#standards-and-guidelines}

### WCAG {#wcag}

[Web Content Accessibility Guidelines](https://www.w3.org/WAI/intro/wcag) dostarcza zbiór wytycznych, jak tworzyć poprawne oraz dostępne dla wszystkich strony internetowe.

Poniższe listy kontrolne WCAG zawierają przegląd:

- [Lista kontrolna WCAG stworzona przez Wuhcag](https://www.wuhcag.com/wcag-checklist/)
- [Lista kontrolna WCAG stworzona przez WebAIM](https://webaim.org/standards/wcag/checklist)
- [Lista kontrolna projektu A11Y](https://a11yproject.com/checklist.html)

### WAI-ARIA {#wai-aria}

Dokument [Web Accessibility Initiative - Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria)  zawiera listę technik pomagających w budowaniu w pełni dostępnych aplikacji javascriptowych. 

Warto zaznaczyć, że wszystkie atrybuty HTML `aria-*` są w pełni wspierane przez JSX. Mimo że większość tagów oraz atrybutów DOM w Reakcie zapisujemy w notacji camelCase, to te związane z dostępnością powinny być zapisywane z wykorzystaniem myślników (znanych również jako kebab-case, lisp-case itp.), ponieważ są one traktowane jak zwykłe atrybuty HTML.

```javascript{3,4}
<input
  type="text"
  aria-label={etykieta}
  aria-required="true"
  onChange={obserwatorZdarzenia}
  value={wartoscPola}
  name="imie"
/>
```

## Semantyczny HTML {#semantic-html}

Semantyczny HTML jest podstawą dostępności aplikacji webowych. Wykorzystując różne elementy HTML, które wzmacniają znaczenie informacji na naszych stronach, bardzo często możemy stworzyć w pełni dostępną stronę bez dodatkowego nakładu pracy.

- [Dokumentacja elementów HTML na MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

Czasem łamiemy zasady semantycznego HTML, kiedy dodajemy dodatkowy element `div` do naszego kodu JSX, aby uruchomić aplikację. Dzieje się tak zwłaszcza kiedy pracujemy z listami (`<ol>`, `<ul>` czy `<dl>`) oraz tabelami `<table>`.
W takim przypadkach powinniśmy korzystać z [fragmentów reactowych](/docs/fragments.html), które pozwalają na grupowanie elementów.

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

Możesz mapować kolekcje elementów do tablicy fragmentów, zupełnie jak w przypadku innych typów elementów:

```javascript{6,9}
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Fragmenty zawsze powinny mieć ustawioną wartość `key` podczas mapowania kolekcji
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

Jeśli nie chcesz przekazywać żadnych dodatkowych właściwości do Fragmentu, wówczas możesz użyć [skróconej składni](/docs/fragments.html#short-syntax). Upewnij się, że wspomniany zapis jest wspierany przez używane przez ciebie środowisko.

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

Więcej informacji znajdziesz w [dokumentacji fragmentów](/docs/fragments.html).

## Dostępne formularze {#accessible-forms}

### Nadawanie etykiet {#labeling}
Każdy element kontrolujący formularz, taki jak `input` czy `textarea`, powinien być etykietowany w przystępny sposób. Etykieta powinna dobrze opisywać pole tekstowe i być widoczna dla czytników ekranowych.

Poniższe zasoby opisują, jak robić to poprawnie:

- [W3C - etykietowanie elementów](https://www.w3.org/WAI/tutorials/forms/labels/)
- [WebAim - etykietowanie elementów](https://webaim.org/techniques/forms/controls)
- [Grupa Paciello wyjaśnia przystępność nazw](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

Chociaż tych standardowych praktyk HTML-owych można używać bezpośrednio w Reakcie, zauważ, że atrybut `for` jest w składni JSX zapisywany jako `htmlFor`:

```javascript{1}
<label htmlFor="imiePoleTekstowe">Imię:</label>
<input id="imiePoleTekstowe" type="text" name="imie"/>
```

### Powiadamianie użytkownika o błędach {#notifying-the-user-of-errors}

W sytuacji zgłoszenia błędu, komunikaty muszą być zrozumiałe dla wszystkich użytkowników. Poniższe linki pokazują, jak wyświetlić błędy w sposób zrozumiały dla czytników ekranowych.

- [W3C - notyfikowanie użytkowników](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [WebAIM - walidacja formularzy](https://webaim.org/techniques/formvalidation/)

## Kontrola fokusa {#focus-control}

Upewnij się, że twoją aplikację internetową można w pełni obsługiwać za pomocą samej klawiatury:

- [WebAIM - dostępność z wykorzystaniem klawiatury](https://webaim.org/techniques/keyboard/)

### Fokus klawiaturowy a kontur {#keyboard-focus-and-focus-outline}

Fokus klawiaturowy odnosi się do bieżącego elementu w DOM, który został wybrany poprzez zdarzenia wywołane przez klawiaturę. Zazwyczaj oznaczany jest za pomocą konturu, podobnego do tego na obrazku poniżej:

<img src="../images/docs/keyboard-focus.png" alt="Niebieski kontur fokusa wokół wybranego linku." />

Jeśli decydujesz się na usunięcie konturu, np. ustawiając właściwość CSS `outline: 0`, nie zapomnij zastąpić go inną implementacją konturu.

### Przejście do treści {#mechanisms-to-skip-to-desired-content}

Zapewnij mechanizm umożliwiający użytkownikom pominięcie sekcji nawigacji na stronie, ponieważ ułatwia on i przyspiesza nawigowanie z wykorzystaniem klawiatury.

Łącza typu "Przejdź do treści" lub "Pomiń nawigację" to specjalne, ukryte linki nawigacyjne, które stają się widoczne tylko wtedy, gdy użytkownicy klawiatury wchodzą w interakcję ze stroną. Są bardzo łatwe w implementacji z wykorzystaniem wewnętrznych kotwic oraz odrobiny stylowania:

- [WebAIM - łącza pomijające nawigację](https://webaim.org/techniques/skipnav/)

Używaj również elementów i punktów orientacyjnych, takich jak `<main>` i `<aside>`, aby rozgraniczyć sekcje strony. Dzięki nim technologie wspierające pozwalają użytkownikowi na szybkie przemieszczanie się między sekcjami.

Przeczytaj więcej o wykorzystaniu tych elementów w celu zwiększenia dostępności:

- [Dostępne punkty orientacyjne](https://www.scottohara.me/blog/2018/03/03/landmarks.html)

### Programowe zarządzanie fokusem {#programmatically-managing-focus}

Nasze aplikacje Reactowe nieustannie modyfikują HTML DOM w czasie działania, co chwilami prowadzi do utraty konturu aktywnego elementu lub ustawienia go na nieoczekiwany element. Aby to naprawić, musimy ręcznie ustawić fokus we właściwym miejscu. Przykładowo, jeśli użytkownik zamknie okno modalne, fokus mógłby zostać przeniesiony na przycisk, który to okno otworzył.

Dokumentacja MDN opisuje dokładniej, w jaki sposób możemy tworzyć [widżety javascriptowe z obsługą klawiatury](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets).

W Reakcie, aby ustawić fokus, możemy posłużyć się mechanizmem [referencji do elementu DOM](/docs/refs-and-the-dom.html).

Aby móc skorzystać z tego mechanizmu, w kodzie JSX wybranego komponentu tworzymy referencję `ref` do elementu :

```javascript{4-5,8-9,13}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // Stwórz referencję do elementu DOM
    this.textInput= React.createRef();
  }
  render() {
  // Użyj funkcji zwrotnej `ref`, aby zapisać referencję do pola tekstowego
  // we właściwości instancji komponentu (na przykład this.textInput).
    return (
      <input
        type="text"
        ref={this.textInput}
      />
    );
  }
}
```

Wówczas, w razie potrzeby, możemy przenieść fokus na inny element naszego komponentu:

 ```javascript
 focus() {
   // Jawne przeniesienie fokusa na pole tekstowe przy użyciu natywnego interfejsu DOM
   // Uwaga: korzystamy z "current", aby uzyskać dostęp do węzła DOM
   this.textInput.current.focus();
 }
 ```

Czasami komponent nadrzędny musi ustawić fokus na element komponentu podrzędnego. Możemy to zrobić poprzez [przesłanie referencji "w górę" do komponentu nadrzędnego](/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components) za pomocą specjalnej właściwości nadanej komponentowi podrzędnemu.

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

// Teraz możesz ręcznie ustawiać fokus, kiedy to potrzebne.
this.inputElement.current.focus();
```

Kiedy używasz [HOC-a](/docs/higher-order-components.html) do rozszerzenia komponentów, zaleca się [przekazanie referencji](/docs/forwarding-refs.html) do opakowanego komponentu przy użyciu funkcji `forwardRef`, która wbudowana jest w Reacta. Jeśli wybrany HOC z którejś zewnętrznej biblioteki nie implementuje takiego przekierowania, można użyć powyższego wzorca jako wyjście awaryjne.

Doskonałym przykładem zarządzania fokusem jest biblioteka [react-aria-modal](https://github.com/davidtheclark/react-aria-modal). Jest to stosunkowo rzadki przykład w pełni dostępnego okna modalnego. Nie tylko ustawia początkowy fokus
na przycisku zamykającym okno (uniemożliwiając tym samym użytkownikowi klawiatury przypadkowe aktywowanie akcji akceptującej) i zatrzymuje fokus klawiaturowy wewnątrz okna, lecz dodatkowo po zamknięciu przywraca fokus z powrotem na element, który zainicjował otwarcie okna.


>Uwaga:
>
> Chociaż jest to bardzo ważna technika zapewniająca dostępność, należy stosować jej z umiarem. Użyj jej, aby skorygować naturalną "drogę" fokusa w aplikacji, ale nie próbuj przewidzieć, jak
> użytkownicy będą chcieli korzystać z aplikacji i nie wymuszaj własnej "drogi".

## Zdarzenia myszy i wskaźnika {#mouse-and-pointer-events}

Upewnij się, że wszystkie funkcje dostępne dla korzystających z myszy lub wskaźnika są również osiągalne za pomocą samej klawiatury. Poleganie na samych urządzeniach wskazujących prowadzi często do sytuacji, w których użytkownicy klawiatury nie mogą w ogóle korzystać z aplikacji.

Aby to zilustrować, spójrzmy na przykład zepsutej dostępności spowodowanej obsługą wyłącznie zdarzenia kliknięcia. Dotyczy to sytuacji, w której użytkownik może zamknąć otwarty "dymek" poprzez kliknięcie gdzieś poza nim.

<img src="../images/docs/outerclick-with-mouse.gif" alt="Przycisk pokazujący dymek z listą, ukrywany poprzez kliknięcie poza dymkiem. Obsługiwany i skutecznie zamknięty za pomocą myszy." />

Zazwyczaj jest to implementowane poprzez nasłuchiwanie zdarzenia `click` w obiekcie `window`, które zamyka dymek:

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
        <button onClick={this.onClickHandler}>Wybierz opcję</button>
        {this.state.isOpen && (
          <ul>
            <li>Opcja 1</li>
            <li>Opcja 2</li>
            <li>Opcja 3</li>
          </ul>
        )}
      </div>
    );
  }
}
```

Powyższy przykład działa poprawnie dla użytkowników korzystających ze wskaźników, takich jak np. mysz. Jednakże, obsługiwanie za pomocą samej klawiatury prowadzi do problemu przy przechodzeniu do następnego elementu listy za pomocą tabulatora. Dzieje się tak, ponieważ obiekt `window` nigdy nie otrzymuje zdarzenia` click`. Może to doprowadzić do uniemożliwienia użytkownikom korzystania z aplikacji.

<img src="../images/docs/outerclick-with-keyboard.gif" alt="Przycisk pokazujący dymek z listą, ukrywany poprzez kliknięcie poza dymkiem. Obsługiwany za pomocą klawiatury, co skutkuje nie zamknięciem dymku po utracie fokusa, powodując trwałe przysłonięcie innych elementów interfejsu." />

Ta sama funkcjonalność może zostać uzyskana poprzez użycie odpowiednich procedur obsługi zdarzeń, takich jak `onBlur` i` onFocus`:

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

  // Zamykamy dymek w następnym cyklu za pomocą funkcji setTimeout.
  // Jest to konieczne, ponieważ musimy najpierw sprawdzić,
  // czy inny potomek elementu otrzymał fokus, jako że
  // zdarzenie onBlur wywołuje się przed ustawieniem fokusa
  // na innym elemencie.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // Jeśli potomek otrzyma fokus, nie zamykaj dymku.
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // React wspiera nas w przesyłaniu fokusa
    // do rodzica.
    return (
      <div onBlur={this.onBlurHandler}
           onFocus={this.onFocusHandler}>
        <button onClick={this.onClickHandler}
                aria-haspopup="true"
                aria-expanded={this.state.isOpen}>
          Wybierz opcję
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Opcja 1</li>
            <li>Opcja 2</li>
            <li>Opcja 3</li>
          </ul>
        )}
      </div>
    );
  }
}
```

Ten kod udostępnia funkcje użytkownikom zarówno urządzeń wskaźnikowych, jak i klawiatury. Zwróć także uwagę na właściwości `aria- *` dodane w celu obsłużenia czytników ekranu. Dla uproszczenia kodu nie zostały zaimplementowane zdarzenia klawiaturowe pozwalające na interakcję z dymkiem za pomocą klawiszy strzałek.

<img src="../images/docs/blur-popover-close.gif" alt="Lista poprawnie zamykająca się zarówno dla użytkowników myszy, jak i klawiatury." />

Jest to tylko jeden przykład z wielu przypadków, w których poleganie jedynie na zdarzeniach wskaźnika i myszy możemy uniemożliwić poruszanie się po aplikacji użytkownikom korzystającym z samej klawiatury.
Każdorazowe testowanie aplikacji za pomocą klawiatury pozwala na sprawne wyszukiwanie problemów, którym można zaradzić poprzez dodanie obsługi zdarzeń klawiaturowych.

## Bardziej złożone widżety {#more-complex-widgets}

Bardziej złożone scenariusze niekoniecznie muszą być mniej dostępne dla użytkowników. Dostępność najłatwiej osiągnąć poprzez trzymanie się jak najbliżej wzorców znanych z natywnego HTML-a.
Nawet najbardziej złożony widżet może być przyjazny dla użytkownika.

Wymagamy tutaj znajomości standardu ARIA, m.in. [ról](https://www.w3.org/TR/wai-aria/#roles) oraz [stanów i właściwości](https://www.w3.org/TR/wai-aria/#states_and_properties).
Są to "skrzynki narzędziowe" wypełnione atrybutami HTML, które są w pełni obsługiwane przez JSX i umożliwiają nam tworzenie w pełni dostępnych, wysoce funkcjonalnych komponentów reactowych.

Każdy typ widżetu ma określone wzorce i zarówno użytkownicy, jak i przeglądarki oczekują, że będzie działał w określony sposób.

<<<<<<< HEAD
- [Dobre praktyki WAI-ARIA - Wzorce projektowe i widżety](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
- [Heydon Pickering - ARIA w praktyce](https://heydonworks.com/article/practical-aria-examples/)
=======
- [ARIA Authoring Practices Guide (APG) - Design Patterns and Examples](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [Heydon Pickering - ARIA Examples](https://heydonworks.com/article/practical-aria-examples/)
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200
- [Inclusive Components](https://inclusive-components.design/)

## Inne punkty do rozważenia {#other-points-for-consideration}

### Ustawianie języka {#setting-the-language}

Jawnie wskaż ludzki język tekstów zamieszczonych na stronie, ponieważ oprogramowanie czytnika ekranu używa go do wyboru prawidłowych ustawień głosu:
- [WebAIM - Język dokumentu](https://webaim.org/techniques/screenreader/#language)

### Ustawienie tytułu dokumentu {#setting-the-document-title}

Ustaw znacznik `<title>` dokumentu tak, by poprawnie opisywał zawartość strony. Ułatwia to użytkownikowi zrozumienie bieżącego kontekstu strony.

- [WCAG - Dlaczego tytuł dokumentu jest wymagany](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html)

W Reakcie tytuł dokumentu możemy ustawić za pomocą [reactowego komponentu tytułu dokumentu](https://github.com/gaearon/react-document-title).

### Kontrast kolorów {#color-contrast}

Upewnij się, że wszystkie teksty na twojej stronie mają wystarczający kontrast kolorów, aby pozostały maksymalnie czytelne dla użytkowników o słabym wzroku:

- [WCAG - Dlaczego wymagane jest zachowanie kontrastu kolorów](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
- [Wszystko o kontraście kolorów i dlaczego warto się nad nim zastanowić](https://www.smashingmagazine.com/2014/10/color-contrast-tips-and-tools-for-accessibility/)
- [A11yProject - Czym jest kontrast kolorów](https://a11yproject.com/posts/what-is-color-contrast/)

Ręczne obliczanie odpowiednich kombinacji kolorów dla wszystkich przypadków na swojej stronie internetowej może być nudne. Zamiast tego możesz użyć [Colorable do przeliczenia całej palety kolorów dla zachowania dobrej dostępności aplikacji](https://colorable.jxnblk.com/).

Jeśli chcesz rozszerzyć możliwości testowania kontrastu, możesz użyć następujących narzędzi:

- [WebAIM - Sprawdzanie kontrastu kolorów](https://webaim.org/resources/contrastchecker/)
- [The Paciello Group - Analizator kontrastu kolorów](https://www.paciellogroup.com/resources/contrastanalyser/)

## Narzędzia do tworzenia oraz testowania {#development-and-testing-tools}

Istnieje wiele narzędzi, których możemy użyć, aby pomóc sobie przy tworzeniu przystępnych aplikacji internetowych.

### Klawiatura {#the-keyboard}

Zdecydowanie najłatwiejszą i jedną z najważniejszych kontroli jest sprawdzenie, czy poruszanie się po całej stronie jest możliwe z wykorzystaniem wyłącznie klawiatury. 
Instrukcja sprawdzenia aplikacji:

1. Odłącz mysz od komputera.
2. Używaj wyłącznie klawiszy `Tab` oraz `Shift + Tab` do przeglądania strony.
3. Używaj klawisza `Enter` do aktywowania elementów.
4. W razie potrzeby używaj klawiszy strzałek do interakcji z niektórymi elementami, takimi jak menu i listy rozwijane.

### Pomoc przy tworzeniu {#development-assistance}

Część testów dostępności możemy wykonać bezpośrednio w naszym kodzie JSX. Często kontrole dostępności dla ról, stanów i właściwości ARIA są wbudowane w środowisko IDE obsługujące JSX. Dodatkowo, mamy do dyspozycji również inne narzędzia:

#### eslint-plugin-jsx-a11y {#eslint-plugin-jsx-a11y}

Wtyczka [eslint-plugin-jsx-a11y] (https://github.com/evcohen/eslint-plugin-jsx-a11y) dla narzędzia ESLint informuje o problemach z dostępnością w twoim kodzie JSX. Wiele środowisk IDE umożliwia integrację ostrzeżeń o zgłaszanych 
 problemach z dostępnością bezpośrednio z narzędziami do analizy kodu i oknami edytorów.

[Create React App](https://github.com/facebookincubator/create-react-app) ma tę wtyczkę domyślnie zainstalowaną z aktywnymi niektórymi regułami. Jeśli chcesz włączyć dodatkowe reguły dotyczące dostępności, możesz utworzyć plik `.eslintrc` w katalogu głównym swojego projektu z następującą zawartością:

  ```json
  {
    "extends": ["react-app", "plugin:jsx-a11y/recommended"],
    "plugins": ["jsx-a11y"]
  }
  ```

### Testowanie dostępności w przeglądarce {#testing-accessibility-in-the-browser}

Istnieje wiele narzędzi, które umożliwiają przeprowadzanie kontroli dostępności na stronach internetowych bezpośrednio w przeglądarce. Używaj ich w połączeniu z innymi narzędziami wymienionymi tutaj, aby jak najlepiej przygotować swój kod HTML.

#### aXe, aXe-core oraz react-axe {#axe-axe-core-and-react-axe}

Deque Systems oferuje [aXe-core](https://github.com/dequelabs/axe-core) do automatycznych i kompleksowych testów dostępności aplikacji. Moduł ten obejmuje integracje z Selenium.

[The Accessibility Engine](https://www.deque.com/products/axe/) (lub inaczej aXe) jest rozszerzeniem przeglądarkowego inspektora dostępności, zbudowanym na bazie `aXe-core`.

Możesz również użyć modułu  [@axe-core/react](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react), aby zgłosić luki dotyczące dostępności bezpośrednio do konsoli, podczas rozwoju aplikacji i debugowania.

#### WebAIM WAVE {#webaim-wave}

[Web Accessibility Evaluation Tool](https://wave.webaim.org/extension/) jest kolejną wtyczką pomagającą w testowaniu dostępności.

#### Inspektory dostępności i Accessibility Tree {#accessibility-inspectors-and-the-accessibility-tree}

[The Accessibility Tree](https://www.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/) jest podzbiorem drzewa DOM. Zawiera wszystkie dostępne dla technologii wspomagających obiekty, odpowiadające każdemu elementowi modelu DOM.

W niektórych przeglądarkach możemy łatwo wyświetlić informacje o dostępności dla każdego elementu w drzewie DOM:

- [Korzystanie z Inspektora dostępności w Firefoksie](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)
- [Korzystanie z Inspektora dostępności w Chromie](https://developers.google.com/web/tools/chrome-devtools/accessibility/reference#pane)
- [Korzystanie z Inspektora dostępności w OS X Safari](https://developer.apple.com/library/content/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)

### Czytniki ekranowe {#screen-readers}

Testowanie za pomocą czytnika ekranu powinno stanowić część testów dostępności.
Należy pamiętać, że kombinacje przeglądarka/czytnik ekranu mają bardzo duże znaczenie. Zaleca się testowanie aplikacji w przeglądarce rekomendowanej do wybranego czytnika ekranu.

### Często używane czytniki ekranu {#commonly-used-screen-readers}

#### NVDA w Firefoxie {#nvda-in-firefox}

[NonVisual Desktop Access](https://www.nvaccess.org/) (lub NVDA) to czytnik ekranu systemu Windows o otwartym kodzie źródłowym, który jest szeroko stosowany.

Zapoznaj się z następującymi poradnikami opisującymi, jak najlepiej wykorzystać NVDA:

- [WebAIM - Korzystanie z NVDA do oceny dostępności strony](https://webaim.org/articles/nvda/)
- [Deque - NVDA: Skróty klawiszowe](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)

#### VoiceOver w Safari {#voiceover-in-safari}

VoiceOver to zintegrowany czytnik ekranu na urządzeniach Apple.

Zapoznaj się z następującymi przewodnikami dotyczącymi aktywacji i korzystania z VoiceOver:

- [WebAIM - Korzystanie z VoiceOver do oceny dostępności stron internetowych](https://webaim.org/articles/voiceover/)
- [Deque - VoiceOver dla OS X: Skróty klawiszowe](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)
- [Deque - VoiceOver dla iOS: Skróty](https://dequeuniversity.com/screenreaders/voiceover-ios-shortcuts)

#### JAWS w Internet Explorer {#jaws-in-internet-explorer}

[Job Access With Speech](https://www.freedomscientific.com/Products/software/JAWS/) (lub JAWS) jest popularnym czytnikiem ekranu w systemie Windows.

Zapoznaj się z następującymi poradnikami, jak najlepiej korzystać z JAWS:

- [WebAIM - Korzystanie z JAWS do oceny dostępności stron internetowych](https://webaim.org/articles/jaws/)
- [Deque - JAWS: Skróty klawiszowe](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)

### Inne czytniki ekranowe {#other-screen-readers}

#### ChromeVox w Google Chrome {#chromevox-in-google-chrome}

[ChromeVox] (https://www.chromevox.com/) jest zintegrowanym czytnikiem ekranu na Chromebookach i jest dostępny [jako rozszerzenie] (https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=pl) dla Google Chrome.

Zapoznaj się z następującymi poradnikami opisującymi, jak najlepiej korzystać z ChromeVox:

- [System operacyjny Chrome - Pomoc: Korzystanie z wbudowanego czytnika ekranu](https://support.google.com/chromebook/answer/7031755?hl=pl)
- [ChromeVox - klasyczne skróty klawiszowe](https://www.chromevox.com/keyboard_shortcuts.html)
