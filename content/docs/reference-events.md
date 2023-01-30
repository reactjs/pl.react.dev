---
id: events
title: SyntheticEvent
permalink: docs/events.html
layout: docs
category: Reference
---

<<<<<<< HEAD
Poniższa dokumentacja dotyczy `SyntheticEvent` (pol. *zdarzenie syntetyczne*) - klasy opakowującej zdarzenia, będącej częścią systemu obsługi zdarzeń Reacta. Samej [obsłudze zdarzeń w Reakcie](/docs/handling-events.html) poświęciliśmy osobny rozdział.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Common components (e.g. `<div>`)](https://beta.reactjs.org/reference/react-dom/components/common)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

This reference guide documents the `SyntheticEvent` wrapper that forms part of React's Event System. See the [Handling Events](/docs/handling-events.html) guide to learn more.
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

## Informacje ogólne {#overview}

Napisane przez ciebie procedury obsługi zdarzeń będą otrzymywać jako argument instancję `SyntheticEvent` - klasy opakowującej natywne zdarzenie, niezależnej od przeglądarki. Posiada ona taki sam interfejs jak natywne zdarzenia, wliczając w to metody `stopPropagation()` oraz `preventDefault()`, gwarantuje jednak identyczne działanie na wszystkich przeglądarkach.

Jeśli w którymś momencie zechcesz skorzystać z opakowanego, natywnego zdarzenia, możesz odwołać się do niego poprzez właściwość `nativeEvent`. Syntetyczne zdarzenia różnią się od natywnych zdarzeń przeglądarki i można ich stosować wymiennie. Na przykład, w zdarzeniu `onMouseLeave` wartość `event.nativeEvent` będzie wskazywać na zdarzenie `mouseout`. Specyfikacja mapowania nie jest dostępna publicznie i może ulec zmianie w dowolnym momencie. Każdy obiekt klasy `SyntheticEvent` posiada następujące właściwości:

```javascript
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
void persist()
DOMEventTarget target
number timeStamp
string type
```

> Uwaga:
>
> Od wersji 17, wywołanie metody `e.persist()` nie robi nic, ponieważ `SyntheticEvent` nie jest już współdzielony w [puli](/docs/legacy-event-pooling.html).

> Uwaga:
>
> Od wersji v0.14 wzwyż, zwracanie wartości `false` przez procedurę obsługi nie zatrzymuje propagacji zdarzenia. Zamiast tego należy ręcznie wywoływać odpowiednią metodę: `e.stopPropagation()` lub `e.preventDefault()`.

## Obsługiwane zdarzenia {#supported-events}

React normalizuje zdarzenia, tak by ich właściwości były jednakowe w różnych przeglądarkach.

Przedstawione na liście poniżej procedury obsługi zdarzeń są wywoływane przez zdarzenie w fazie bąbelkowania (ang. *bubbling phase*). Aby zarejestrować procedurę obsługi w fazie przechwytywania (ang. *capturing phase*), dodaj na końcu nazwy `Capture`, np. zamiast `onClick` użyj `onClickCapture`.

- [Obsługa schowka](#clipboard-events)
- [Obsługa kompozycji](#composition-events)
- [Obsługa klawiatury](#keyboard-events)
- [Obsługa skupiania](#focus-events)
- [Obsługa formularzy](#form-events)
- [Obsługa zdarzeń generycznych](#generic-events)
- [Obsługa myszy](#mouse-events)
- [Obsługa wskaźnika](#pointer-events)
- [Obsługa zaznaczania](#selection-events)
- [Obsługa dotyku](#touch-events)
- [Obsługa interfejsu użytkownika](#ui-events)
- [Obsługa pokrętła myszy](#wheel-events)
- [Obsługa mediów](#media-events)
- [Obsługa obrazów](#image-events)
- [Obsługa animacji](#animation-events)
- [Obsługa tranzycji](#transition-events)
- [Inne zdarzenia](#other-events)

* * *

## Dokumentacja {#reference}

### Obsługa schowka {#clipboard-events}

Nazwy zdarzeń:

```
onCopy onCut onPaste
```

Właściwości:

```javascript
DOMDataTransfer clipboardData
```

* * *

### Obsługa kompozycji {#composition-events}

Nazwy zdarzeń:

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

Właściwości:

```javascript
string data

```

* * *

### Obsługa klawiatury {#keyboard-events}

Nazwy zdarzeń:

```
onKeyDown onKeyPress onKeyUp
```

Właściwości:

```javascript
boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
```

Właściwość `key` przyjmuje dowolną z wartości wymienionych w [specyfikacji Zdarzeń DOM 3. Poziomu](https://www.w3.org/TR/uievents-key/#named-key-attribute-values).

* * *

### Obsługa skupiania {#focus-events}

Nazwy zdarzeń:

```
onFocus onBlur
```

Powyższe zdarzenia działają na wszystkich elementach w React DOM, nie tylko na kontrolkach formularza.

Właściwości:

```js
DOMEventTarget relatedTarget
```

#### onFocus {#onfocus}

Zdarzenie `onFocus` jest wywoływane, gdy element (lub któryś z zagnieżdżonych elementów) otrzymuje fokus. Przykładowo, zostanie ono wywołane, gdy użytkownik kliknie na polu tekstowym.

```javascript
function Example() {
  return (
    <input
      onFocus={(e) => {
        console.log('Fokus jest na polu tekstowym');
      }}
      placeholder="onFocus zostanie wywołane po kliknięciu na tym polu."
    />
  )
}
```

#### onBlur {#onblur}

Zdarzenie `onBlur` jest wywołane, gdy element (lub któryś z zagnieżdżonych elementów) stracił fokus. Przykładowo, zostanie ono wywołane, gdy użytkownik kliknie gdzieś poza polem tekstowym.

```javascript
function Example() {
  return (
    <input
      onBlur={(e) => {
        console.log('Wywołano, bo pole straciło fokus');
      }}
      placeholder="onBlur zostanie wywołane, gdy klikniesz na tym polu, a następnie klikniesz poza nim."
    />
  )
}
```

#### Wykrywanie fokusa i jego utraty {#detecting-focus-entering-and-leaving}

Aby rozróżnić, czy zdarzenia dotyczące fokusa pochodzą _spoza_ rodzica, możesz sprawdzić wartości pól `currentTarget` i `relatedTarget`. Poniżej znajdziesz kod, który pokazuje, jak wykryć fokus na elemencie potomnym, jak na samym elemencie, a jak wykryć taki, który dotyczy całego poddrzewa elementów.

```javascript
function Example() {
  return (
    <div
      tabIndex={1}
      onFocus={(e) => {
        if (e.currentTarget === e.target) {
          console.log('fokus na sobie');
        } else {
          console.log('fokus na elemencie potomnym', e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus aktywny poza poddrzewem');
        }
      }}
      onBlur={(e) => {
        if (e.currentTarget === e.target) {
          console.log('fokus utracony na sobie');
        } else {
          console.log('fokus utracony na elemencie potomnym', e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('fokus poza poddrzewem');
        }
      }}
    >
      <input id="1" />
      <input id="2" />
    </div>
  );
}
```

* * *

### Obsługa formularzy {#form-events}

Nazwy zdarzeń:

```
onChange onInput onInvalid onReset onSubmit 
```

Więcej informacji odnośnie zdarzenia `onChange` opisaliśmy w rozdziale pt. ["Formularze"](/docs/forms.html).

* * *

### Obsługa zdarzeń generycznych {#generic-events}

Nazwy zdarzeń:

```
onError onLoad
```

* * *

### Obsługa myszy {#mouse-events}

Nazwy zdarzeń:

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

Zdarzenia `onMouseEnter` oraz `onMouseLeave`, zamiast zwykłego bąbelkowania, propagowane są z elementu opuszczanego do elementu wskazywanego, a ponadto nie mają fazy przechwytywania (ang. *capture phase*).

Właściwości:

```javascript
boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
number pageX
number pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey
```

* * *

### Obsługa wskaźnika {#pointer-events}

Nazwy zdarzeń:

```
onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
```

Zdarzenia `onPointerEnter` oraz `onPointerLeave`, zamiast zwykłego bąbelkowania, propagowane są z elementu opuszczanego do elementu wskazywanego, a ponadto nie mają fazy przechwytywania (ang. *capture phase*).

Właściwości:

Zgodnie ze [specyfikacją W3](https://www.w3.org/TR/pointerevents/), zdarzenia wskaźnika rozszerzają [zdarzenia obsługi myszy](#mouse-events) o następujące właściwości:

```javascript
number pointerId
number width
number height
number pressure
number tangentialPressure
number tiltX
number tiltY
number twist
string pointerType
boolean isPrimary
```

Informacja o kompatybilności z przeglądarkami:

Zdarzenia wskaźnika nie są jeszcze obsługiwane przez wszystkie przeglądarki (w chwili pisania tego artykułu wspierają je: Chrome, Firefox, Edge i Internet Explorer). React celowo nie dostarcza łatki (ang. *polyfill*) dla pozostałych przeglądarek, ponieważ łatka zgodna ze standardem znacząco zwiększyłaby rozmiar paczki `react-dom`.

Jeśli twoja aplikacja wymaga obsługi wskaźników, zalecamy dołączenie odpowiedniej paczki zewnętrznej.

* * *

### Obsługa zaznaczania {#selection-events}

Nazwy zdarzeń:

```
onSelect
```

* * *

### Obsługa dotyku {#touch-events}

Nazwy zdarzeń:

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

Właściwości:

```javascript
boolean altKey
DOMTouchList changedTouches
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey
DOMTouchList targetTouches
DOMTouchList touches
```

* * *

### Obsługa interfejsu użytkownika {#ui-events}

Nazwy zdarzeń:

```
onScroll
```

> Uwaga:
>
>Podcząwszy od Reacta 17, zdarzenie `onScroll` **nie jest propagowane w górę**. Odpowiada to zachowaniu przeglądarki i pozwala uniknąć niejasności, gdy to zagnieżdżony element z suwakiem generował zdarzenia na odległych rodzicach.

Właściwości:

```javascript
number detail
DOMAbstractView view
```

* * *

### Obsługa pokrętła myszy {#wheel-events}

Nazwy zdarzeń:

```
onWheel
```

Właściwości:

```javascript
number deltaMode
number deltaX
number deltaY
number deltaZ
```

* * *

### Obsługa mediów {#media-events}

Nazwy zdarzeń:

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```

* * *

### Obsługa obrazów {#image-events}

Nazwy zdarzeń:

```
onLoad onError
```

* * *

### Obsługa animacji {#animation-events}

Nazwy zdarzeń:

```
onAnimationStart onAnimationEnd onAnimationIteration
```

Właściwości:

```javascript
string animationName
string pseudoElement
float elapsedTime
```

* * *

### Obsługa tranzycji {#transition-events}

Nazwy zdarzeń:

```
onTransitionEnd
```

Właściwości:

```javascript
string propertyName
string pseudoElement
float elapsedTime
```

* * *

### Inne zdarzenia {#other-events}

Nazwy zdarzeń:

```
onToggle
```
