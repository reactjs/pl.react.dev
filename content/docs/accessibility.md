---
id: accessibility
title: Dostępność
permalink: docs/accessibility.html
---

## Czym jest dostępność? {#why-accessibility}

Pojęcie dostępności stron internetowych (określanej również [**a11y**](https://en.wiktionary.org/wiki/a11y)) zostało zaprojektowane i stworzone z myślą o internecie przystępnym dla wszystkich. Wspieranie dostępności jest niezbędne, aby umożliwić technologiom asystującym poprawną interpretację stron.

React w pełni wspiera budowanie dostępnych dla wszystkich stron internetowych, często z wykorzystaniem standardowych technik HTML.

## Standard oraz wytyczne {#standards-and-guidelines}

### WCAG {#wcag}

[Web Content Accessibility Guidelines](https://www.w3.org/WAI/intro/wcag) dostarcza zbiór wytycznych, jak tworzyć poprawne oraz dostępne dla wszystkich strony internetowe.

Poniższe listy kontrolne WCAG zawierają przegląd:

- [Lista kontrolna WCAG stworzona przez Wuhcag](https://www.wuhcag.com/wcag-checklist/)
- [Lista kontrolna WCAG stworzona przez WebAIM](https://webaim.org/standards/wcag/checklist)
- [Lista kontrolna projektu A11Y](https://a11yproject.com/checklist.html)

### WAI-ARIA {#wai-aria}

Dokument [Web Accessibility Initiative - Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria)  zawiera listę technik wyspecjalizowanych w budowaniu w pełni dostępnych aplikacji JavaScript. 

Warto zaznaczyć, że wszystkie atrybuty HTML `aria-*` są w pełni wspierane przez JSX. Mimo, że większość tagów oraz atrybutów DOM w Reakcie zapisujemy w formacie camelCase, to te związane z dostępnością, powinny być zapisane z wykorzystaniem myślników (znanych również jako kebab-case, lisp-case itp.), ponieważ są one traktowane jak czysty HTML.

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

Semantyczny HTML jest podstawą dostępności aplikacji webowych. Wykorzystując różne elementy HTML, które wzmacniają znaczenie informacji na naszych stronach, bardzo często, możemy stworzyć w pełni dostępną stronę bez dodatkowych nakładów pracy.

- [MDN - elementy HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

Czasem łamiemy zasady semantycznego HTMl, kiedy dodajemy dodatkowy element `div` do naszego JSX, aby uruchomić aplikację. Dzieje się tak, zwłaszcza, kiedy pracujemy z listami (`<ol>`, `<ul>` and `<dl>`) oraz tabelami `<table>`.
W takim przypadkach, powinniśmy wykorzystać [React Fragment](/docs/fragments.html), który pozwola na grupowanie wielu elementów.

Przykład:

```javascript{1,5,8}
import React, { Fragment } from 'react';

function Slowo({ wpis }) {
  return (
    <Fragment>
      <dt>{wpis.slowo}</dt>
      <dd>{wpis.opis}</dd>
    </Fragment>
  );
}

function Slownik(props) {
  return (
    <dl>
      {props.slowa.map(slowo => (
        <Slowo wpis={slowo} key={slowo.id} />
      ))}
    </dl>
  );
}
```

Możesz mapować kolekcje elmentów do tablicy fragmentów, zupełnie jakby to był dowolnie inny typ elementów:

```javascript{6,9}
function Slownik(props) {
  return (
    <dl>
      {props.slowa.map(wpis => (
        // Fragmenty zawsze powinny miec ustawioną wartość `key` podczas mapowania kolejkcji
        <Fragment key={wpis.id}>
          <dt>{wpis.slowo}</dt>
          <dd>{wpis.opis}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

Kiedy nie chcesz przekazywać żadnych dodatkowych właściwości do Fraguemntu, wówczas możesz użyć [skróconej składni](/docs/fragments.html#short-syntax). Upewnij się, że wspomniany zapis wspiera również Twój edytor.

```javascript{3,6}
function Lista({ wpis }) {
  return (
    <>
      <dt>{wpis.slowo}</dt>
      <dd>{wpis.opis}</dd>
    </>
  );
}
```

Więcej znajdziesz w [dokumentacji Fragmentów](/docs/fragments.html).

## Dostępne Formularze {#accessible-forms}

### Etykietowanie {#labeling}
Każdy element kontrolujący formularz, taki jak `input` oraz `textarea`, powinien być etykietowany w przystępny sposób. Powinniśmy wykorzystać etykietę, która dobrze opisuję pole tekstowe oraz jest widoczne dla czytników ekranowych.

Poniższe zasoby opisują, jak zrobić to dobrze:

- [W3C - etykietowanie elementów](https://www.w3.org/WAI/tutorials/forms/labels/)
- [WebAim - etykietowanie elementów](https://webaim.org/techniques/forms/controls)
- [Grupa Paciello wyjaśnia przystępność nazw](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

Chociaż te standardowe praktyki HTML mogą być bezpośrednio używane w Reakcie, zauważ, że atrybut `for` jest w JSX zapisany jako `htmlFor`:

```javascript{1}
<label htmlFor="imiePoleTekstowe">Name:</label>
<input id="imiePoleTekstowe" type="text" name="imie"/>
```

### Powiadamianie użytkownika o błędach {#notifying-the-user-of-errors}

W sytuacji zgłoszenia błędów, komunikaty muszą być zrozumiałe dla wszystkich użytkowników. Poniższe linki pokazują, jak wyświetlić błędy w sposób zrozumiały dla czytników ekranowych.

- [W3C - notyfikacja użytkowników](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [WebAIM - walidacja formularzy](https://webaim.org/techniques/formvalidation/)

## Kontrola ostości (ang.focus control) {#focus-control}

Upewnij się, że Twoja aplikacja internetowa może być w pełni obsługiwana tylko za pomocą klawiatury:

- [WebAIM - dostępność z wykorzystaniem klawiatury](https://webaim.org/techniques/keyboard/)

### Klawiatura i kontur ostrości {#keyboard-focus-and-focus-outline}

Kontur ostości (ang. focus outline) klawiatury odnosi się do bieżącego elementu w DOM, który został wybrany poprzez zdarzenia wywołany przez klawiaturę. Widzimy to wszędzie, jako kontur podobny do tego na poniższym obrazku:

<img src="../images/docs/keyboard-focus.png" alt="Niebieski kontury ostrości wokół wybranego linku." />

Upewnij się, że wykorzystujesz regułę CSS, która usuwa ten kontury, na przykład ustawiając `outline: 0`, wyłącznie jeśli zastępujesz go kolejną implementacją konturu.

### Przejście do wybranej treści {#mechanisms-to-skip-to-desired-content}

Zapewnij mechanizm umożliwiający użytkownikom pominięcie poprzednich sekcji aplikacji, ponieważ ułatwia to i przyspiesza nawigację z wykorzystaniem klawiatury.

Łącza typu `Skiplink` lub `Skip Navigation Links` to ukryte linki nawigacyjne, które stają się widoczne tylko wtedy, gdy użytkownicy klawiatury wchodzą w interakcję ze stroną. Są bardzo łatwe w implementacji z wykorzystaniem wewnętrznych kotwic oraz niektórych styli:

- [WebAIM - Skip Navigation Links](https://webaim.org/techniques/skipnav/)

Używaj również elementów i punktów orientacyjnych, takich jak `<main>` i `<aside>`, aby rozgraniczyć sekcje strony, ponieważ technologie wspierające pozwalają użytkownikowi na szybkie przemieszczanie się między nimi.

Przeczytaj więcej o wykorzystaniu tych elementów w celu zwiększenia dostępności:

- [Dostępne punkty orientacyjne](https://www.scottohara.me/blog/2018/03/03/landmarks.html)

### Programowo zarządzaj ostrością {#programmatically-managing-focus}

Nasze aplikacje React nieustannie modyfikują HTML DOM w czasie wykonywania, co chwilami prowadzi do utraty konturu aktywnego elementu lub ustawienia go na nieoczekiwany element. W celu naprawy tego, musimy ręcznie ustawić ostrość we właściwym miejscu. Na przykład, przez zresetowanie ostrości z przycisku, który otworzył okno modalne po jego zamknięciu.

Dokumentacja MDN opisuje dokładniej, w jaki sposób możemy tworzyć [widżety JavaScript z obsługą klawiatury](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets).

Aby ustawić ostrość w Reakcie, możemy posłużyć się mechanizmem [Referencji do elementów DOM](/docs/refs-and-the-dom.html).

Korzystając z tego, najpierw tworzymy ref do elementu w JSX:

```javascript{4-5,8-9,13}
class NiestandardowePoleTekstowe extends React.Component {
  constructor(props) {
    super(props);
    // Utwórz ref, aby zapisać wskaźnik na element DOM textInput
    this.poleTekstowe = React.createRef();
  }
  render() {
  // Użyj wywołania zwrotnego `ref`, aby zapisać odwołanie do wejścia
  // pola tekstowego DOM w polu instancji (na przykład this.poleTekstowe).
    return (
      <input
        type="text"
        ref={this.poleTekstowe}
      />
    );
  }
}
```

Wówczas, w razie potrzeby możemy przenieść ostrość na inny element naszego komponentu:

 ```javascript
 focus() {
   // Jawne przeniesienie ostrości podczas wprowadzania tekstu za pomocą surowego API DOM
   // Uwaga: uzyskujemy dostęp do "current", aby uzyskać węzeł DOM
   this.textInput.current.focus();
 }
 ```

Czasami komponent nadrzędny musi ustawić ostrość na element komponentu podrzędnego. Możemy to zrobić poprzez [przesłanie referencji "w górę" do komponentu nadrzędnego](/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components). Można to również zrobić np. przez specjalną właściwość komponentu podrzędnego, która przekazuje rodzicowi ref do węzła DOM wewnątrz dziecka.

```javascript{4,12,16}
function NiestandardowePoleTekstowe(props) {
  return (
    <div>
      <input ref={props.poleTekstowe} />
    </div>
  );
}

class Rodzic extends React.Component {
  constructor(props) {
    super(props);
    this.poleTekstowe = React.createRef();
  }
  render() {
    return (
      <NiestandardowePoleTekstowe inputRef={this.poleTekstowe} />
    );
  }
}

// Teraz, możesz ręcznie ustawić ostrość, kiedy to potrzebne.
this.poleTekstowe.current.focus();
```

Kiedy używasz HOC (ang. higher order component) do rozszerzenia komponentów, zaleca się [przekazanie ref](/docs/forwarding-refs.html) do opakowanego komponentu przy użyciu funkcji `forwardRef`, która wbudowana jest w Reacta. Jeśli strona trzecia HOC
nie implementuje przekierowania, powyższy wzorzec może być nadal używany jako rezerwowy.

Doskonałym przykładem zarządzania ostrością jest [react-aria-modal](https://github.com/davidtheclark/react-aria-modal). Jest to stosunkowo rzadki przykład w pełni dostępnego okna modalnego. Nie tylko ustawia początkową ostrość
na przycisku zamykającym kontener modalny (ang. modalbox) (uniemożliwiający użytkownikowi klawiatury przypadkowe aktywowanie akcji akceptującej) i zatrzymujący skupienie klawiatury wewnątrz modala, a także po zamknięciu, przywracający ostrość z powrotem do elementu, który początkowo otworzył kontener modalny.


>Uwaga:
>
> Chociaż jest to bardzo ważna funkcja dostępności, jest to również technika, którą należy rozsądnie stosować. Użyj jej, aby naprawić przepływ ostrości, gdy jest zakłócony, ale nie próbuj przewidzieć, jak
> użytkownicy chcą korzystać z aplikacji i nie wymuszaj własnego przeływu.

## Zdarzenia myszy oraz wskażnika (ang. mouse and pointer events) {#mouse-and-pointer-events}

Upewnij się, że wszystkie funkcje dostępne dla korzystając z myszy lub wskaźnika można również obsługiwalne wyłącznie za pomocą samej klawiatury. Różnorodność wskaźników prowadzi często do wielu przypadków, gdzie użytkownicy klawiatury nie mogą korzystać z aplikacji.

Aby to zilustrować, spójrzmy na przykład zepsutej dostępności spowodowanej wykorzystaniem zdarzenia kliknięcia (ang. click event). Jest to zewnętrzny wzorzec, w którym użytkownik może wyłączyć otwarty `popover`, klikając w miejscu poza elementem.

<img src="../images/docs/outerclick-with-mouse.gif" alt=" Przycisk przełączający widoczność listy popover za pomocą wzorca kliknięcia na zewnątrz i obsługiwany za pomocą myszy, pokazujący, że zamknięcie działa." />

Zazwyczaj jest to implementowane przez dołączenie zdarzenia `click` do obiektu` window`, który zamyka popover:

```javascript{12-14,26-30}
class PrzykladKliknieciaNaZewnatrz extends React.Component {
constructor(props) {
    super(props);

    this.state = { otwarte: false };
    this.kontener = React.createRef();

    this.uchwytKlikniecie = this.uchwytKlikniecie.bind(this);
    this.uchwytKlikniecieNaZewnatrz = this.uchwytKlikniecieNaZewnatrz.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.uchwytKlikniecieNaZewnatrz);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.uchwytKlikniecieNaZewnatrz);
  }

  uchwytKlikniecie() {
    this.setState(currentState => ({
      otwarte: !currentState.otwarte
    }));
  }

  uchwytKlikniecieNaZewnatrz(event) {
    if (this.state.otwarte && !this.kontener.current.contains(event.target)) {
      this.setState({ otwarte: false });
    }
  }

  render() {
    return (
      <div ref={this.kontener}>
        <button onClick={this.uchwytKlikniecie}>Wybierz opcje</button>
        {this.state.otwarte ? (
          <ul>
            <li>Opcja 1</li>
            <li>Opcja 2</li>
            <li>Opcja 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
```

Powyższy przykład działa poprawnie dla użytkowników krzystających ze wskaźników, takich jak np. mysz. Jednakże, obsługiwanie za pomocą samej klawiatury prowadzi do problemu przy przechodzeniu do następnego elementu listy. Jest tak, ponieważ obiekt `window` nigdy nie otrzymuje zdarzenia` click`. Może to prowadzić do uniemożliwienia użytkownikom korzystania z aplikacji.


<img src="../images/docs/outerclick-with-keyboard.gif" alt="Przełącznik otwierający listę popover za pomocą wzorca kliknięcia na zewnątrz i obsługiwany za pomocą klawiatury pokazującej, że popover nie jest zamykany na onBlur i zasłania inne elementy ekranu." />

Ta sama funkcjonalność może zostać uzyskana poprzez użycie odpowiednich procedur obsługi zdarzeń, takich jak `onBlur` i` onFocus`:

```javascript{19-29,31-34,37-38,40-41}
class PrzykladBlur extends React.Component {
  constructor(props) {
    super(props);

    this.state = { otwarte: false };
    this.timeOutId = null;

    this.uchwytKlikniecia = this.uchwytKlikniecia.bind(this);
    this.uchwytBlur = this.onBlurHandler.bind(this);
    this.uchwytFocus = this.uchwytFocus.bind(this);
  }

  uchwytKlikniecia() {
    this.setState(currentState => ({
      otwarte: !currentState.otwarte
    }));
  }

  // Zamykamy popover na następnym tiku za pomocą setTimeout.
  // Jest to konieczne, ponieważ musimy najpierw sprawdzić,
  // czy inne dziecko elementu otrzymało ostrość jako, że
  // zdarzenie onBlur wywołuje się wyłącznie przed nowym 
  // zdarzeniem ustawienia ostrości.
  uchwytBlur() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        otwarte: false
      });
    });
  }

  // Jeśli dziecko otrzymuje ostrość, nie zamykaj elementu bedącego na wierzchu.
  uchwytFocus() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // React wspiera nas w przesyłaniu ostrości
    // do rodzica.
    return (
      <div onBlur={this.uchwytBlur}
           onFocus={this.uchwytFocus}>
        <button onClick={this.uchwytKlikniecia}
                aria-haspopup="true"
                aria-expanded={this.state.otwarte}>
          Wybierz opcję
        </button>
        {this.state.otwarte ? (
          <ul>
            <li>Opcja 1</li>
            <li>Opcja 2</li>
            <li>Opcja 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
```

Ten kod udostępnia funkcje zarówno użytkownikom urządzeń wskaźnikowych, jak i klawiatury. Zwróć także uwagę na dodane wartości `aria- *` do obsługi czytników ekranu. Dla uproszczenia zdarzenia klawiaturowych (ang. keyboard events), aby włączyć interakcję klawiszy strzałek opcji popover, nie zostały zaimplementowane.

<img src="../images/docs/blur-popover-close.gif" alt="Lista poprawnie zamykająca się zarówno dla użytkowników myszy, jak i klawiatury." />

Jest to tylko jeden przykład z wielu przypadków, w których w zależności tylko od zdarzeń wskaźnika i myszy możemy napotkać na problem w poruszaniu się użytkowników klawiaturowych.
Stałe testowanie za pomocą klawiatury pozwala na szybkie reagowanie i odnotywowanie problemów, które można następnie naprawić korzystając ze zdarzeń mogących zostać wywołane nie tylko za pomocą wskaźników, ale również i innych sposobów poruszania się po aplikacji.

## Bardziej złożone widżety {#more-complex-widgets}

Bardziej złożone scenariusze użytkowania nie powinny oznaczać ograniczania przystępności. Dostępność jest najłatwiej osiągalna poprzez trzymanie się jak najbliżej wzorców znanych z natywnego HTMLa.
Nawet najbardziej złożony widżet może być przygotowany w przystępny sposób.

Wymagamy tutaj znajomości [ARIA Roles](https://www.w3.org/TR/wai-aria/#roles) oraz [stanów i właściwości ARIA](https://www.w3.org/TR/wai-aria/#states_and_properties).
Są to skrzynki narzędziowe wypełnione atrybutami HTML, które są w pełni obsługiwane przez JSX i umożliwiają nam tworzenie w pełni dostępnych, wysoce funkcjonalnych komponentów React.

Każdy typ widżetu ma określone wzorce i zarówno użytkownicy, jak i przeglądarki oczekują, że będzie działał w określny sposób.

- [WAI-ARIA Authoring Practices - Wzorce projektowe i widżety](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
- [Heydon Pickering - ARIA Przykłady](https://heydonworks.com/practical_aria_examples/)
- [Inclusive Components](https://inclusive-components.design/)

## Inne punkty do rozważenia {#other-points-for-consideration}

### Ustawianie języka {#setting-the-language}

Jawnie wskaż ludzki język tekstów zamieszczonych na stronie, ponieważ oprogramowanie czytnika ekranu używa tego do wyboru prawidłowych ustawień głosu:
- [WebAIM - Język dokumentu](https://webaim.org/techniques/screenreader/#language)

### Ustawienie tytułu dokumentu {#setting-the-document-title}

Ustaw atrybut `<title>` dokumentu, aby poprawnie opisać bieżącą zawartość strony, ponieważ ułatwia to użytkownikowi, zrozumienie bieżącego kontekstu strony.

- [WCAG - Zrozumienie wymogu tytułu dokumentu](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html)

Możemy to ustawić w Reakcie używając [React Document Title Component](https://github.com/gaearon/react-document-title).

### Kontrast kolorów {#color-contrast}

Upewnij się, że wszystkie teksty na Twojej stronie mają wystarczający kontrast kolorów, aby pozostały maksymalnie czytelne dla użytkowników o słabym wzroku:

- [WCAG - Zrozumienie wymogu kontrastu kolorów](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
- [Wszystko o kontrastie kolorów i dlaczego warto to przemyśleć](https://www.smashingmagazine.com/2014/10/color-contrast-tips-and-tools-for-accessibility/)
- [A11yProject - Czym jest kontrast kolorów](https://a11yproject.com/posts/what-is-color-contrast/)

Ręczne obliczanie odpowiednich kombinacji kolorów dla wszystkich przypadków na swojej stronie internetowej może być nudne, więc zamiast tego [możliwe jest prześledzenie całej dostępnej palety kolorów za pomocą Colorable](https://jxnblk.com/colorable/).

Wymienione poniżej narzędzia aXe i WAVE zawierają również testy kontrastu kolorów i będą zgłaszać błędy kontrastu.

Jeśli chcesz rozszerzyć możliwości testowania kontrastu, możesz użyć następujących narzędzi:

- [WebAIM - Sprawdzanie kontrastu kolorów](https://webaim.org/resources/contrastchecker/)
- [The Paciello Group - Analizator kontrastu kolorów](https://www.paciellogroup.com/resources/contrastanalyser/)

## Narzędzia do tworzenia oraz testowania {#development-and-testing-tools}

Istnieje wiele narzędzi, których możemy użyć, aby pomóc w tworzeniu przystępnych aplikacji internetowych.

### Klawiatura {#the-keyboard}

Zdecydowanie najłatwiejszą i jedną z najważniejszych kontroli jest sprawdzenie, czy poruszanie się po całej stronie jest możliwe z wykorzystaniem wyłącznie klawiatury. 
Instrukcja sprawdzenia aplikacji:

1. Odłącz myszy.
1. Używając wyłącznie `Tab` i` Shift + Tab` przeglądaj stronę.
1. Używając `Enter` aktywuj elementy.
1. W razie potrzeby, używając klawiszy strzałek klawiatury do interakcji z niektórymi elementami, takimi jak menu i listy rozwijane.

### Pomoc przy tworzeniu {#development-assistance}

Część testów dostępności możemy wykonać bezpośrednio w naszym kodzie JSX. Często kontrole dostępności dla ról, stanów i właściwości ARIA są wbudowane w IDE obsługujące JSX. Dodatkowo, mamy do dyspozycji również inne narzędzia:

#### eslint-plugin-jsx-a11y {#eslint-plugin-jsx-a11y}

Wtyczka [eslint-plugin-jsx-a11y] (https://github.com/evcohen/eslint-plugin-jsx-a11y) dla ESLint zapewnia informacje zwrotne AST dotyczące problemów z dostępnością w Twoim JSX. Wiele IDE umożliwiaja integrację notyfikacji o problemach z dostępnością, bezpośrednio z analizą kodu i oknami kodu źródłowego IDE.

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

[The Accessibility Engine](https://www.deque.com/products/axe/) lub ax, jest rozszerzeniem przeglądarkowego inspektora dostępności zbudowanym na bazie `ax-core`.

Możesz również użyć modułu [react-ax](https://github.com/dylanb/react-axe), aby zgłosić luki dotyczące dostępności bezpośrednio do konsoli, podczas pracy i debugowania.

#### WebAIM WAVE {#webaim-wave}

[Web Accessibility Evaluation Tool](https://wave.webaim.org/extension/) jest kolejną wtyczką pomagającą w testowaniu dostępności.

#### Accessibility inspectors and the Accessibility Tree {#accessibility-inspectors-and-the-accessibility-tree}

[The Accessibility Tree](https://www.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/) jest podzbiorem drzewa DOM. Zawiera wszystkie dostępne dla technologii wspomagających obiekty, odpowiadające każdemu elementowi DOMu.

W niektórych przeglądarkach możemy łatwo wyświetlić informacje o przystępności dla każdego elementu w drzewie DOM:

- [Korzystanie z Inspektora dostępności w Firefoksie](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)
- [Korzystanie z Inspektora dostępności w Chromie](https://gist.github.com/marcysutton/0a42f815878c159517a55e6652e3b23a)
- [Korzystanie z Inspektora dostępności w OS X Safari](https://developer.apple.com/library/content/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)

### Czytniki ekranowe {#screen-readers}

Testowanie za pomocą czytnika ekranu powinno stanowić część testów dostępności.
Należy pamiętać, że kombinacje przeglądarka/czytnik ekranu mają bardzo duże naczenie. Zaleca się testowanie aplikacji w przeglądarce rekomendowanej do wybranego czytnika ekranu.

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
