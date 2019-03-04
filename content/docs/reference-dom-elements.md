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

Dla poprawy wydajności oraz kompatybilności między przeglądarkami React wprowadza niezależny od przeglądarki system DOM. To dało nam możliwość ulepszenia pewnych wad, występujących w przeglądarkowej implementacji DOM.

W Reakcie wszystkie właściwości i atrybuty DOM (włącznie z obsługą zdarzeń) powinny być zapisane camelCasem. Dla przykładu, atrybut HTML `tabindex` odpowiada atrybutowi `tabIndex` w React. Wyjątkiem są atrybuty `aria-*` oraz `data-*`, które powinny być zapisane małą literą (ang. *lowercase*). Na przykład `aria-label` pozostaje `aria-label`.

## Różnice w atrybutach {#differences-in-attributes}

Jest kilka atrybutów, które działają inaczej niż w HTML:

### checked {#checked}

Atrybut `checked` jest wspierany przez element `<input>` typu `checkbox` lub `radio`. Możesz go użyć do sprawdzenia czy element jest zaznaczony. Jest to przydatne do budowania kontrolowanych komponentów. `defaultChecked` jest niekontrolowanym odpowiednikiem, który określa, czy komponent jest zaznaczony przy pierwszym zamontowaniu.

### className {#classname}

Do przypisania klasy CSS użyj atrybutu `className`. To dotyczy wszystkich standardowych elementów DOM oraz SVG, takich jak `<div>`, `<a>` i innych.

Gdy używasz Reakta z Web Components (co jest rzadkie), użyj atrybutu `class`.

### dangerouslySetInnerHTML {#dangerouslysetinnerhtml}

`dangerouslySetInnerHTML` jest zamiennikiem Reacta dla `innerHTML` w przeglądarkowym DOM. Ogólnie używanie HTML w kodzie jest ryzykowane, ponieważ jest łatwo nieumyślnie narazić Twoich użytkowników na atak [cross-site scripting (XSS)](https://pl.wikipedia.org/wiki/Cross-site_scripting). Dlatego możesz wstawić HTML bezpośrednio w React, ale musisz to zrobić poprzez `dangerouslySetInnerHTML` i przekazać objekt z kluczem `__html`, dla przypomnienia sobie, że jest to niebezpieczne. Przykład:

```js
function createMarkup() {
  return {__html: 'Pierwszy &middot; Drugi'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

### htmlFor {#htmlfor}

Od kiedy `for` jest zarezerwowanym słowem w JavaScript, React używa `htmlFor` zamiast tego.

### onChange {#onchange}

Zdarzenie `onChange` zachowuję się tak jak powinno: gdy pole formularza się zmienia, zdarzenie jest aktywowane. Specjalnie nie używamy obecnego w przeglądarce zachowania, ponieważ `onChange` jest błędną nazwą dla jego zachowania, a React opiera się na tym zdarzeniu do obsłużenia znacznika `<input>` w czasie rzeczywistym.

### selected {#selected}

Atrybut `selected` jest wspierany przez element `<option>`. Możesz go użyć do sprawdzenia czy element jest wybrany. Jest to przydatne do budowania kontrolowanych komponentów.

### style {#style}

>Wskazówka
>
>Niektóre przykłady w dokumentacji używają `style` dla wygody, ale **używanie atrybutu `style` do podstawowego stylowania elementów nie jest rekomendowane.** W większości przypadków [`className`](#classname) powinien być używany do odnoszenia się do klas definiowanych w zewnętrznym arkuszu stylów (ang. *stylesheet*). `style` jest najczęściej używany w aplikacjach React do dodania dynamicznych styli w trakcie renderowania. Zobacz też [FAQ: Stylowanie i CSS](/docs/faq-styling.html).

Atrybut `style` akceptuje objekt JavaScript z właściwościami zapisanymi camelCasem zamiast stringu CSS. Jest to zgodne z właściwiością DOM `style` w JavaScript, bardziej wydajne i zapobiega dziurom w zabezpieczaniu XSS. Przykład:

```js
const divStyle = {
  color: 'niebieski',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Witaj Świecie!</div>;
}
```

Zauważ, że style nie mają automatycznie nadanego prefiksa. Dla wsparcia starszych przeglądarek, potrzebujesz nadać odpowiednie właściwości styli:

```js
const divStyle = {
  WebkitTransition: 'all', // zaobserwuj tutaj wielką literę 'W'
  msTransition: 'all' // 'ms' jest jedynym prefiksem dostawców zapisywanym małą literą
};

function ComponentWithTransition() {
  return <div style={divStyle}>To powinno działać między przeglądarkami</div>;
}
```

Klucze styli są zapisywane camelCasem w celu bycia zgodnym z dostępem właściwości na węzłach (ang. *nodes*) DOM z JS (np. `node.style.backgroundImage`). Prefiksy dostawców (ang. *vendor prefixes*) [inne niż `ms`](https://www.andismith.com/blogs/2012/02/modernizr-prefixed/) powinny zaczynać się wielką literą. Dlatego `WebkitTransition` zaczyna się wielką literą "W".

React automatycznie doda przyrostek "px" dla pewnych liczbowych właściwości styli. Gdy chcesz użyć innych jednostek niż "px", określ wartość jako string z pożądaną jednostką. Przykład:

```js
// Rezultat: '10px'
<div style={{ height: 10 }}>
  Witaj Świecie!
</div>

// Rezultat: '10%'
<div style={{ height: '10%' }}>
  Witaj Świecie!
</div>
```

Nie wszystkie właściwości styli są konwertowane do stringów z pikselami. Niektóre z nich pozostają bez jednostek (np. `zoom`, `order`, `flex`). Pełna lista jest dostępna [tutaj](https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSProperty.js#L15-L59).

### suppressContentEditableWarning {#suppresscontenteditablewarning}

Zwykle gdy element z dziećmi jest również oznaczony jako `contentEditable`, występuje ostrzeżenie, ponieważ to działa. Ten atrybut tłumi to ostrzeżenie. Nie używaj go, chyba, że tworzysz bibliotekę jak [Draft.js](https://facebook.github.io/draft-js/), która zarząda `contentEditable` manualnie.

### suppressHydrationWarning {#suppresshydrationwarning}

Gdy używasz renderowania po stronie serwera (ang. *server-side*), zwykle wyskakuje ostrzeżenie, gdy serwer oraz klient renderują inną zawartość (ang. *content*). Jednakże, w niektórych rzadkich przypadkach, dokładne dopasowanie jest bardzo trudne lub niemożliwe do osiągnięcia. Na przykład znaczniki czasu różnią się między serwerem i klientem.

Jeżeli ustawisz `suppressHydrationWarning` jako `true`, React nie ostrzeże Cię o niedopasowaniu atrybutów i zawartości tego elementu. To działa tylko w jednym poziomie zagłębienia i jest używany jako ucieczki od napotkania problemu. Nie nadużywaj go. Możesz poczytać więcej o nawodnieniu (ang. *hydration*) [`ReactDOM.hydrate()` documentation](/docs/react-dom.html#hydrate).

### value {#value}

Atrybut `value` jest wspierany przez elementy `<input>` oraz `<textarea>`. Możesz go użyć do umieszczenia wartości komponentu. Jest to przydatne do budowania kontrolowanych komponentów. `defaultChecked` jest niekontrolowanym odpowiednikiem, który określa, czy komponent ma wartość przy pierwszym zamontowaniu.

## Wszystkie wspierane atrybuty HTML {#all-supported-html-attributes}

Od wersji 16. Reacta każdy standardowy [albo spersonalizowany](/blog/2017/09/08/dom-attributes-in-react-16.html) atrybut DOM jest całkowicie wspierany.

React jest od zawsze opatrzony JavaScript-centrycznym API dla DOM. Od kiedy componenty Reacta często przyjmują zarówno spersonalizowane, jak i związane z DOMem propsy, React używa konwencji `camelCase` dokładnie tak jak DOM API:

```js
<div tabIndex="-1" />      // Dokładnie jak node.tabIndex w DOM API
<div className="Button" /> // Dokładnie jak node.className w DOM API
<input readOnly={true} />  // Dokładnie jak node.readOnly w DOM API
```

Te propsy działają podobnie do odpowiedników atrybutów HTML z wyjątkiem specjalnych przypadków wymienionych powyżej.

Niektóre atrybuty DOM są wspierane przez React, włączając:

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

Podobnie, wszystkie atrybuty SVG są całkowicie wspierane:

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

Możesz także używać spersonalizowanych atrybutów, jeżeli są one napisane małą literą.
