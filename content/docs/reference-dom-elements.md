---
id: dom-elements
title: Elementy DOM
layout: docs
category: Reference
permalink: docs/dom-elements.html
redirect_from:
  - "docs/tags-and-attributes.html"
  - "docs/dom-differences.html"
  - "docs/special-non-dom-attributes.html"
  - "docs/class-name-manipulation.html"
  - "tips/inline-styles.html"
  - "tips/style-props-value-px.html"
  - "tips/dangerously-set-inner-html.html"
---

Dla poprawy wydajności oraz kompatybilności między przeglądarkami, React wprowadza niezależny od przeglądarki system DOM. Dało to nam możliwość naprawienia pewnych usterek występujących w przeglądarkowych implementacjach DOM.

W Reakcie wszystkie właściwości i atrybuty DOM (włącznie z obsługą zdarzeń) powinny być zapisywane w notacji camelCase. Dla przykładu, atrybut HTML `tabindex` w Reakcie zapisujemy jako `tabIndex`. Wyjątkiem są atrybuty `aria-*` oraz `data-*`, które powinny być zapisywane małą literą, na przykład, `aria-label` pozostaje `aria-label`.

## Różnice w atrybutach {#differences-in-attributes}

W Reakcie kilka atrybutów działa inaczej niż w HTML-u:

### checked {#checked}

Atrybut `checked` jest wspierany przez element `<input>` typu `checkbox` lub `radio`.  Za jego pomocą można dany element ustawić jako odznaczony. Jest to przydatne podczas budowania kontrolowanych komponentów. W przypadku komponentów niekontrolowanych należy używać `defaultChecked`, który określa, czy komponent ma być odznaczony przy pierwszym zamontowaniu.

### className {#classname}

Aby przypisać klasę CSS, należy użyć atrybutu `className`. Dotyczy to wszystkich standardowych elementów DOM oraz SVG, takich jak `<div>`, `<a>` i innych.

Gdy używasz Reacta z Web Components (co jest rzadkie), stosuj atrybut `class`.

### dangerouslySetInnerHTML {#dangerouslysetinnerhtml}

`dangerouslySetInnerHTML` jest reactowym odpowiednikiem dla `innerHTML` z przeglądarkowego DOM. Ogólnie rzecz biorąc, używanie HTML w kodzie jest ryzykowne, ponieważ łatwo jest nieumyślnie narazić użytkowników na atak [cross-site scripting (XSS)](https://pl.wikipedia.org/wiki/Cross-site_scripting). Z tego powodu jedynym sposobem na wstawienie HTML bezpośrednio w Reakcie jest użycie właściwości `dangerouslySetInnerHTML` i przekazanie obiektu z kluczem `__html` -- wszystko po to, żeby pamiętać, iż jest to niebezpieczne. Przykład:

```js
function createMarkup() {
  return {__html: 'Pierwszy &middot; Drugi'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

### htmlFor {#htmlfor}

Jako że `for` jest zarezerwowanym słowem w JavaScripcie, React używa zamiast niego `htmlFor`.

### onChange {#onchange}

Zdarzenie `onChange` przebiega zgodnie z oczekiwaniami: jest aktywowane za każdym razem, gdy zmienia się wartość w polu formularza. Specjalnie nie używamy implementacji przeglądarkowej, ponieważ `onChange` ma nazwę nieadekwatną do zachowania. React natomiast używa tego zdarzenia do obsłużenia w czasie rzeczywistym zmian w danych wejściowych kontrolki formularza.

### selected {#selected}

Jeśli chcesz zaznaczyć którąś z opcji `<option>`, przekaż jej wartość jako właściwość `value` elementu `<select>`.
Aby dowiedzieć się więcej na ten temat, zajrzyj do sekcji ["Znacznik select"](/docs/forms.html#the-select-tag).

### style {#style}

>Wskazówka
>
>Niektóre przykłady w dokumentacji używają `style` dla wygody, ale ogólnie rzecz biorąc, **używanie atrybutu `style` do stylowania elementów nie jest zalecane.** W większości przypadków należy korzystać z atrybutu [`className`](#classname), odnosząc się do klas definiowanych w zewnętrznym arkuszu stylów (ang. *stylesheet*). `style` jest najczęściej używany w aplikacjach reactowych do dodawania stylów dynamicznych, zmieniających się przy kolejnych renderowaniach. Zobacz też [FAQ: Stylowanie i CSS](/docs/faq-styling.html).

Atrybut `style` zamiast zwykłego ciągu znaków przyjmuje javascriptowy obiekt z właściwościami CSS zapisanymi w notacji camelCase (nie ciąg znaków jak w CSS). Jest to zgodne z właściwością DOM `style` w JavaScripcie, poprawia wydajność i zapobiega dziurom w zabezpieczeniach przed XSS. Przykład:

```js
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Witaj, świecie</div>;
}
```

Zauważ, że style nie mają automatycznie nadawanego prefiksu. Aby zapewnić kompatybilność ze starszymi przeglądarkami, musisz nadać im odpowiednie właściwości:

```js
const divStyle = {
  WebkitTransition: 'all', // zwróć uwagę na wielką literę 'W'
  msTransition: 'all' // 'ms' jest jedynym prefiksem zapisywanym małą literą
};

function ComponentWithTransition() {
  return <div style={divStyle}>To powinno działać na wielu przeglądarkach</div>;
}
```

Nazwy kluczy obiektu stylów zapisujemy w notacji camelCase, aby były zgodne z właściwościami węzłów DOM w JS (np. `node.style.backgroundImage`). Prefiksy dostawców (ang. *vendor prefixes*) [inne niż `ms`](https://www.andismith.com/blogs/2012/02/modernizr-prefixed/) powinny zaczynać się od wielkiej litery. Dlatego `WebkitTransition` zaczyna się od wielkiej litery "W".

React automatycznie doda przyrostek "px" (piksele) dla pewnych liczbowych właściwości stylów. Jeśli chcesz użyć innych jednostek niż "px", określ wartość jako ciąg znaków z pożądaną jednostką. Przykład:

```js
// Rezultat: '10px'
<div style={{ height: 10 }}>
  Witaj, świecie!
</div>

// Rezultat: '10%'
<div style={{ height: '10%' }}>
  Witaj, świecie!
</div>
```

Nie wszystkie właściwości stylów są konwertowane do ciągów znaków z przyrostkiem 'px'. Niektóre z nich pozostają bez jednostek (np. `zoom`, `order`, `flex`). Pełna lista wyjątków jest dostępna [tutaj](https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSProperty.js#L15-L59).

### suppressContentEditableWarning {#suppresscontenteditablewarning}

Zwykle gdy element posiadający potomka jest oznaczony jako `contentEditable`, pojawia się ostrzeżenie, ponieważ mechanizm ten nie zadziała prawidłowo. Ten atrybut wyłącza to ostrzeżenie. Nie używaj go, chyba że tworzysz bibliotekę ręcznie zarządzającą właściwością `contentEditable`, jak np. [Draft.js](https://facebook.github.io/draft-js/).

### suppressHydrationWarning {#suppresshydrationwarning}

Gdy używasz renderowania po stronie serwera (ang. *server-side*), zwykle pojawia się ostrzeżenie, gdy serwer i klient renderują inną zawartość. Jednakże, w niektórych rzadkich przypadkach, dokładne dopasowanie jest bardzo trudne lub niemożliwe do osiągnięcia. Na przykład, znaczniki czasu zwykle różnią się między serwerem i klientem.

Jeżeli ustawisz właściwość `suppressHydrationWarning` na `true`, React nie ostrzeże cię o niedopasowaniu atrybutów i zawartości tego elementu. Działa to tylko na jednym poziomie zagłębienia i jest używane jako "wyjście awaryjne" z problemu. Nie nadużywaj go. Możesz poczytać więcej o hydratacji (ang. *hydration*) w [dokumentacji funkcji `ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot).

### value {#value}

Atrybut `value` jest wspierany przez elementy `<input>`, `<select>` oraz `<textarea>`. Możesz go użyć do ustawienia wartości komponentu. Jest to przydatne do budowania kontrolowanych komponentów. `defaultValue` jest niekontrolowanym odpowiednikiem tego atrybutu, który określa, jaką wartość powinien mieć komponent przy pierwszym montowaniu.

## Wszystkie wspierane atrybuty HTML {#all-supported-html-attributes}

Poczynając od wersji 16-stej React wspiera wszystkie standardowe i [niestandardowe](/blog/2017/09/08/dom-attributes-in-react-16.html) atrybuty DOM.

React od zawsze udostępniał interfejs API jak najbardziej podobny do javascriptowego interfejsu DOM. Z racji tego, że komponenty reactowe często przyjmują zarówno właściwości niestandardowe, jak i te związane z modelem DOM, React używa notacji `camelCase`, zupełnie jak interfejs DOM:

```js
<div tabIndex={-1} />      // Dokładnie jak node.tabIndex w DOM API
<div className="Button" /> // Dokładnie jak node.className w DOM API
<input readOnly={true} />  // Dokładnie jak node.readOnly w DOM API
```

Powyższe właściwości działają podobnie jak odpowiadajce im atrybuty HTML, z wyjątkiem specjalnych przypadków wymienionych powyżej.

Niektóre atrybuty DOM wspierane przez Reacta to:

```
accept acceptCharset accessKey action allowFullScreen alt async autoComplete
autoFocus autoPlay capture cellPadding cellSpacing challenge charSet checked
cite classID className colSpan cols content contentEditable contextMenu controls
controlsList coords crossOrigin data dateTime default defer dir disabled
download draggable encType form formAction formEncType formMethod formNoValidate
formTarget frameBorder headers height hidden high href hrefLang htmlFor
httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list
loop low manifest marginHeight marginWidth max maxLength media mediaGroup method
min minLength multiple muted name noValidate nonce open optimum pattern
placeholder poster preload profile radioGroup readOnly rel required reversed
role rowSpan rows sandbox scope scoped scrolling seamless selected shape size
sizes span spellCheck src srcDoc srcLang srcSet start step style summary
tabIndex target title type useMap value width wmode wrap
```

Podobnie, wspierane są wszystkie atrybuty SVG:

```
accentHeight accumulate additive alignmentBaseline allowReorder alphabetic
amplitude arabicForm ascent attributeName attributeType autoReverse azimuth
baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight
clip clipPath clipPathUnits clipRule colorInterpolation
colorInterpolationFilters colorProfile colorRendering contentScriptType
contentStyleType cursor cx cy d decelerate descent diffuseConstant direction
display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground
end exponent externalResourcesRequired fill fillOpacity fillRule filter
filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize
fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy
g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef
gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic
imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength
kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor
limitingConeAngle local markerEnd markerHeight markerMid markerStart
markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode
numOctaves offset opacity operator order orient orientation origin overflow
overlinePosition overlineThickness paintOrder panose1 pathLength
patternContentUnits patternTransform patternUnits pointerEvents points
pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits
r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions
requiredFeatures restart result rotate rx ry scale seed shapeRendering slope
spacing specularConstant specularExponent speed spreadMethod startOffset
stdDeviation stemh stemv stitchTiles stopColor stopOpacity
strikethroughPosition strikethroughThickness string stroke strokeDasharray
strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity
strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor
textDecoration textLength textRendering to transform u1 u2 underlinePosition
underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic
vHanging vIdeographic vMathematical values vectorEffect version vertAdvY
vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing
writingMode x x1 x2 xChannelSelector xHeight xlinkActuate xlinkArcrole
xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlns xmlnsXlink xmlBase
xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan
```

Możesz także używać niestandardowych atrybutów, pod warunkiem, że są one napisane małymi literami.
