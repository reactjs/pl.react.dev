---
id: events
title: SyntheticEvent
permalink: docs/events.html
layout: docs
category: Reference
---

Poniższa dokumentacja dotyczy `SyntheticEvent` (pol. *zdarzenie syntetyczne*) - klasy opakowującej zdarzenia, będącej częścią systemu obsługi zdarzeń Reacta. Samej [obsłudze zdarzeń w Reakcie](/docs/handling-events.html) poświęciliśmy osobny rozdział.

## Informacje ogólne {#overview}

Napisane przez ciebie procedury obsługi zdarzeń będą otrzymywać jako argument instancję `SyntheticEvent` - klasy opakowującej natywne zdarzenie, niezależnej od przeglądarki. Posiada ona taki sam interfejs jak natywne zdarzenia, wliczając w to metody `stopPropagation()` oraz `preventDefault()`, gwarantuje jednak identyczne działanie na wszystkich przeglądarkach.

Jeśli w którymś momencie zechcesz skorzystać z opakowanego, natywnego zdarzenia, możesz odwołać się do niego poprzez właściwość `nativeEvent`. Każdy obiekt klasy `SyntheticEvent` posiada następujące właściwości:

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
> Od wersji v0.14 wzwyż, zwracanie wartości `false` przez procedurę obsługi nie zatrzymuje propagacji zdarzenia. Zamiast tego należy ręcznie wywoływać odpowiednią metodę: `e.stopPropagation()` lub `e.preventDefault()`.

### Pula zdarzeń {#event-pooling}

Obiekty `SyntheticEvent` są przechowywane w [puli](https://pl.wikipedia.org/wiki/Pula_obiekt%C3%B3w_(wzorzec_projektowy)). Oznacza to, że są one używane wielokrotnie, a ich właściwości są czyszczone zaraz po wywołaniu procedury obsługi zdarzenia.
Ma to pozytywny wpływ na szybkość działania aplikacji.
Przez to jednak nie można odczytywać stanu zdarzenia w sposób asynchroniczny.

```javascript
function onClick(event) {
  console.log(event); // => wyczyszczony obiekt.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Nie zadziała. Obiekt this.state.clickEvent będzie zawierał same wartości null.
  this.setState({clickEvent: event});

  // Możesz jednak przekazywać poszczególne właściwości zdarzenia.
  this.setState({eventType: event.type});
}
```

> Uwaga:
>
<<<<<<< HEAD
> Jeśli chcesz odczytać właściwości zdarzenia w sposób asynchroniczny, wywołaj jego metodę `event.persist()`. Zdarzenie to zostanie wyciągnięte z puli zdarzeń, co pozwoli na zachowanie referencji do późniejszego użytku w kodzie.

## Obsługiwane zdarzenia {#supported-events}

React normalizuje zdarzenia, tak by ich właściwości były jednakowe w różnych przeglądarkach.

Przedstawione na liście poniżej procedury obsługi zdarzeń są wywoływane przez zdarzenie w fazie bąbelkowania (ang. *bubbling phase*). Aby zarejestrować procedurę obsługi w fazie przechwytywania (ang. *capturing phase*), dodaj na końcu nazwy `Capture`, np. zamiast `onClick` użyj `onClickCapture`.

- [Obsługa schowka](#clipboard-events)
- [Obsługa kompozycji](#composition-events)
- [Obsługa klawiatury](#keyboard-events)
- [Obsługa skupiania](#focus-events)
- [Obsługa formularzy](#form-events)
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
=======
> If you want to access the event properties in an asynchronous way, you should call `event.persist()` on the event, which will remove the synthetic event from the pool and allow references to the event to be retained by user code.

## Supported Events {#supported-events}

React normalizes events so that they have consistent properties across different browsers.

The event handlers below are triggered by an event in the bubbling phase. To register an event handler for the capture phase, append `Capture` to the event name; for example, instead of using `onClick`, you would use `onClickCapture` to handle the click event in the capture phase.

- [Clipboard Events](#clipboard-events)
- [Composition Events](#composition-events)
- [Keyboard Events](#keyboard-events)
- [Focus Events](#focus-events)
- [Form Events](#form-events)
- [Generic Events](#generic-events)
- [Mouse Events](#mouse-events)
- [Pointer Events](#pointer-events)
- [Selection Events](#selection-events)
- [Touch Events](#touch-events)
- [UI Events](#ui-events)
- [Wheel Events](#wheel-events)
- [Media Events](#media-events)
- [Image Events](#image-events)
- [Animation Events](#animation-events)
- [Transition Events](#transition-events)
- [Other Events](#other-events)
>>>>>>> fb382ccb13e30e0d186b88ec357bb51e91de6504

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

```javascript
DOMEventTarget relatedTarget
```

* * *

### Obsługa formularzy {#form-events}

Nazwy zdarzeń:

```
onChange onInput onInvalid onReset onSubmit 
```

Więcej informacji odnośnie zdarzenia `onChange` opisaliśmy w rozdziale pt. ["Formularze"](/docs/forms.html).

* * *

<<<<<<< HEAD
### Obsługa myszy {#mouse-events}
=======
### Generic Events {#generic-events}

Event names:

```
onError onLoad
```

* * *

### Mouse Events {#mouse-events}
>>>>>>> fb382ccb13e30e0d186b88ec357bb51e91de6504

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
