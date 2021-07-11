---
id: lifting-state-up
title: Wynoszenie stanu w górę
permalink: docs/lifting-state-up.html
prev: forms.html
next: composition-vs-inheritance.html
redirect_from:
  - "docs/flux-overview.html"
  - "docs/flux-todo-list.html"
---

Bardzo często kilka komponentów jednocześnie musi odzwierciedlać te same zmiany w danych. W takim przypadku proponujemy przeniesienie wspólnego stanu do najbliższego wspólnego przodka. Zobaczmy, jak wygląda to w praktyce.

W tej części poradnika stworzymy kalkulator, który obliczy nam czy woda będzie się gotować w podanej temperaturze.

Rozpocznijmy od komponentu, który nazwiemy `BoilingVerdict`. Komponent ten przyjmie atrybut z temperaturą o nazwie `celsius`, a następnie zwróci informację, czy temperatura jest wystarczająco wysoka.

```js{3,5}
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>Woda będzie się gotować</p>;
  }
  return <p>Woda nie będzie się gotować.</p>;
}
```

Następnie stwórzmy komponent o nazwie `Calculator`. Wyrenderuje on element `<input>`, który pozwoli wpisać temperaturę oraz zachowa jego wartość w `this.state.temperature`.

Dodatkowo, będzie on renderował komponent `BoilingVerdict` dla obecnej wartości inputa.

```js{5,9,13,17-21}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Podaj temperaturę w Celsjuszach:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

## Dodawanie drugiego inputa {#adding-a-second-input}

Naszym kolejnym wymogiem jest, aby oprócz inputa do wpisywania temperatury w Celsjuszach, dostarczyć także drugi input, który przyjmie temperaturę w Fahrenheitach. Oba inputy powinny być ze sobą zsynchronizowane.

Zacznijmy od wyizolowania komponentu `TemperatureInput` z komponentu `Calculator`. Dodamy do niego nowy atrybut `scale`, który będzie mógł przyjmować wartość `"c"` lub `"f"`:

```js{1-4,19,22}
const scaleNames = {
  c: 'Celsjuszach',
  f: 'Fahrenheitach'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Podaj temperaturę w {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Zmieńmy komponent `Calculator` tak, by renderował dwa osobne inputy z temperaturą:

```js{5,6}
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/jGBryx?editors=0010)

Mamy teraz dwa inputy, jednak jeśli podamy temperaturę w jednym z nich, drugi nie zostanie zaktualizowany. Jest to sprzeczne z naszymi wymogami: chcemy, by oba inputy były ze sobą zsynchronizowane.

Nie możemy też wyświetlić `BoilingVerdict` z poziomu komponentu `Calculator`. Spowodowane jest to faktem, iż `Calculator` nie ma dostępu do informacji o obecnej temperaturze, która schowana jest w `TemperatureInput`.

## Pisanie funkcji konwertujących {#writing-conversion-functions}

Na początek napiszmy dwie funkcje do konwertowania temperatury ze stopni Celsjusza na Fahrenheita i odwrotnie:

```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

Obie te funkcje konwertują liczby. Napiszmy jeszcze jedną funkcję, która jako argumenty przyjmie ciąg znaków `temperature` oraz funkcję konwertującą,, a zwróci inny ciąg znaków. Użyjemy jej do wyliczenia wartości jednego inputa w oparciu o drugi.

Funkcja zwróci zaokrąglony do trzeciego miejsca po przecinku wynik lub pusty ciąg znaków, jeśli `temperature` jest nieprawidłowe.

```js
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

Na przykład, `tryConvert('abc', toCelsius)` zwróci pusty ciąg znaków, natomiast `tryConvert('10.22', toFahrenheit)` zwróci `'50.396'`.

## Wynoszenie stanu w górę {#lifting-state-up}

Obecnie obydwa komponenty `TemperatureInput` trzymają swoje wartości niezależnie, w lokalnym stanie:

```js{5,9,13}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...
```

Nam zależy jednak, aby oba te inputy były ze sobą zsynchronizowane. Podczas aktualizacji inputa z Celsjuszami, input z Fahrenheitami powinien odzwierciedlać przekonwertowaną temperaturę i odwrotnie.

W Reakcie współdzielenie stanu komponentu można osiągnąć poprzez utworzenie stanu w najbliższym wspólnym przodku. Nazywa się to "wynoszeniem stanu w górę" (ang. *lifting state up*).

Jeśli wyniesiemy stan do komponentu `Calculator`, zostanie on "źródłem prawdy" dla obecnej temperatury w obu inputach. Komponent ten może poinformować je o trzymaniu zgodnych wartości. Oba inputy będą ze sobą zawsze zsynchronizowane, ponieważ atrybuty dla komponentów `TemperatureInput` przychodzą ze wspólnego przodka - komponentu `Calculator`.

Przeanalizujmy to krok po kroku.

Najpierw zastąpimy `this.state.temperature` używając `this.props.temperature` w komponencie `TemperatureInput`. Na tę chwilę przyjmijmy, że atrybut `this.props.temperature` istnieje, jednakże w przyszłości będziemy musieli go przekazać z komponentu `Calculator`:

```js{3}
  render() {
    // Wcześniej było: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

Wiemy już, że [atrybuty są tylko do odczytu](/docs/components-and-props.html#props-are-read-only). Kiedy `temperature` znajdowało się w lokalnym stanie, komponent `TemperatureInput` mógł po prostu wywołać `this.setState()`, by je zmienić. Jednak, ponieważ teraz atrybut `temperature` jest przekazywany od rodzica, komponent `TemperatureInput` nie ma nad nim żadnej kontroli.

W Reakcie rozwiązujemy to na ogół poprzez przekształcenie komponentu w "kontrolowany". Tak samo jak w drzewie DOM, gdzie  element `<input>` akceptuje zarówno atrybut `value`, jak i `onChange` jako atrybuty, tak i komponent `TemperatureInput` może akceptować od rodzica atrybuty `temperature` oraz `onTemperatureChange`.

Teraz za każdym razem, gdy komponent `TemperatureInput` zechce zaktualizować temperaturę, wywoła funkcję `this.props.onTemperatureChange`:

```js{3}
  handleChange(e) {
    // Wcześniej było: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```

>Wskazówka:
>
> Nazwy, których używamy w tym poradniku, takie jak `temperature` czy `onTemperatureChange`, są tylko nazwami przykładowymi i można je zmienić w dowolny sposób. Jednak przyjęło się nazywać je np. `value` i `onChange`.

Atrybuty `onTemperatureChange` oraz `temperature` zostaną przekazane przez rodzica - komponent `Calculator`. Obsłuży on zmianę poprzez zmodyfikowanie swojego stanu lokalnego, zatem oba inputy zostaną ponownie wyrenderowane z nowymi wartościami. Już wkrótce przyjrzymy się nowej implementacji komponentu `Calculator`.

Zanim jednak zagłębimy się w zmiany w komponencie `Calculator`, podsumujmy co zmieniło się w `TemperatureInput`. Pozbyliśmy się stanu lokalnego i zamiast korzystać z `this.state.temperature`, możemy teraz używać `this.props.temperature`. Zamiast wywoływać `this.setState()`, kiedy chcemy dokonać zmiany, możemy teraz wywołać `this.props.onTemperatureChange()`, które udostępniane jest przez komponent `Calculator`.

```js{8,12}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Podaj temperaturę w {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Przyjrzyjmy się teraz komponentowi `Calculator`.

Wartości atrybutów obecnego inputa - `temperature` oraz `scale` będziemy przechowywać w stanie lokalnym. Użyjemy stanu, który "wynieśliśmy w górę" z inputów i będzie on nam służył za "źródło prawdy". Zarazem jest to najmniejsza ilość danych, wystarczająca do wyrenderowania obydwóch inputów.

Na przykład, jeśli do inputa z Celsjuszami wpiszemy `37`, stan komponentu `Calculator` będzie wyglądał następująco:

```js
{
  temperature: '37',
  scale: 'c'
}
```

Jeśli zdecydujemy się później edytować pole z Fahrenheitami i wpiszemy liczbę `212`, stan komponentu `Calculator` będzie się przedstawiał tak:

```js
{
  temperature: '212',
  scale: 'f'
}
```

Moglibyśmy przechowywać wartości dla obydwóch inputów, jednak jest to zupełnie zbędne. Trzymanie wartości ostatnio zmienianego inputa i jego skali wystarczy do uzyskania pożądanego wyniku. Możemy teraz wyliczyć wartość drugiego inputa na podstawie obecnej wartości `temperature` oraz `scale`.

Inputy są ze sobą zsynchronizowane, dzięki temu, że ich wartości są obliczane na podstawie tego samego stanu.

```js{6,10,14,18-21,27-28,31-32,34}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)

Nie ważne teraz, który z inputów edytujemy, w komponencie `Calculator` aktualizowane będą zarówno `this.state.temperature`, jak i `this.state.scale`.

Podsumujmy teraz, co dzieje się, gdy edytujemy jeden z inputów:

* React wywołuje funkcję `onChange` na elemencie DOM `<input>`. W naszym przypadku jest to metoda `handleChange` z komponentu `TemperatureInput`.
* Metoda `handleChange` w komponencie `TemperatureInput` wywołuje `this.props.onTemperatureChange()` z nową wartością. Atrybuty tego komponentu, takie jak `onTemperatureChange`, pochodzą od rodzica - komponentu `Calculator`.
* Podczas poprzedniego renderu, komponent `Calculator` określił, że atrybut `onTemperatureChange` przychodzący z komponentu `TemperatureInput` z Celsjuszami, jest wywoływany metodą `handleCelsiusChange`, natomiast `onTemperatureChange` z komponentu z Fahrenheitami, jest teraz wywoływany metodą `handleFahrenheitChange`. Dzięki temu, w zależności od tego, który input dostanie nową wartość, jedna z tych metod zostanie wywołana.
* Wewnątrz tych metod komponent `Calculator` prosi Reacta o ponowne wyrenderowanie komponentu poprzez użycie `this.setState()` z nową wartością inputa oraz obecnie używaną skalą.
* React wywołuje metodę `render` komponentu `Calculator`, by dowiedzieć się, jak powinien wyglądać jego UI. Wartości obu inputów są ponownie obliczane, bazując na aktualnej temperaturze i skali. To w tym miejscu odbywa się konwersja temperatury.
* React wywołuje metodę `render` poszczególnych komponentów `TemperatureInput`, która otrzymuje nowe atrybuty od komponentu `Calculator`. Dzięki temu dowiaduje się, jak powinien wyglądać komponent.
* React wywołuje metodę `render` komponentu `BoilingVerdict`, przekazując do niego temperaturę w Celsjuszach jako atrybut.
* Paczka "React DOM" aktualizuje drzewo DOM otrzymaną strukturą, dopasowując się do wartości inputów. Input, którego właśnie edytowaliśmy, otrzymuje swoją obecną wartość, natomiast drugi input otrzymuje temperaturę po konwersji.

Każda aktualizacja przechodzi ten sam proces, więc inputy są zawsze zsynchronizowane.

## Wnioski {#lessons-learned}

Wszelkie dane, które zmieniają się w aplikacji reactowej, powinny mieć swoje pojedyncze "źródło prawdy". Na ogół stan dodaje się najpierw do komponentu, który potrzebuje go podczas renderowania. Następnie, jeśli inny komponent potrzebuje tych samych danych, możemy "wynieść je w górę" do najbliższego wspólnego przodka. Zamiast próbować synchronizować stan między różnymi komponentami, lepiej polegać na [przepływie danych "z góry na dół"](/docs/state-and-lifecycle.html#the-data-flows-down).

Wynoszenie stanu w górę skutkuje powstaniem większej ilości tzw. kodu szablonowego (ang. *boilerplate code*), niż wiązanie dwukierunkowe (ang. *two-way binding*), jednak pozwala na łatwiejsze znalezienie i wyizolowanie błędów. Ponieważ każdy stan "żyje" w jakimś komponencie i tylko ten komponent może go zmienić, ryzyko powstania błędów jest znacznie mniejsze. Ponadto, można dodać własną logikę, która pozwoli odrzucić lub przekształcić dane wejściowe od użytkownika.

Jeśli jakąś wartość można wydedukować na podstawie zarówno atrybutów, jak i stanu komponentu, to prawdopodobnie nie powinna się ona znaleźć w stanie. Na przykład, zamiast przetrzymywać jednocześnie `celsiusValue` i `fahrenheitValue`, przechowujemy jedynie ostatnio edytowane `temperature` oraz `scale`. Wartość drugiego inputa może być przecież wyliczona w metodzie `render()`. Pozwala nam to na czyszczenie lub zaokrąglanie wartości w drugim polu bez utraty dokładności w danych pochodzących od użytkownika.

Jeśli zauważysz nieprawidłowości w interfejsie swojej aplikacji, możesz użyć [Narzędzi deweloperskich dla Reacta](https://github.com/facebook/react/tree/main/packages/react-devtools), aby zbadać atrybuty i przemieszczać się po drzewie, dopóki nie znajdziesz komponentu odpowiedzialnego za zmianę stanu. Pozwoli Ci to znaleźć przyczynę błędów:

<img src="../images/docs/react-devtools-state.gif" alt="Monitorowanie stanu w narzędziach deweloperskich dla Reacta" max-width="100%" height="100%">

