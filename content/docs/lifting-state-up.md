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

Bardzo często, grupa komponentów musi odzwierciedlać te same zmiany w danych. W takim przypadku proponujemy przeniesienie wspólnego stanu do najbliższego wspólnego przodka. Zobaczmy, jak wygląda to w praktyce.

W tej sekcji stworzymy kalkulator, który obliczy nam czy woda będzie się gotować w podanej temperaturze.

Rozpoczniemy od komponentu, który nazwiemy `BoilingVerdict`. Komponent ten przyjmie atrybut z temperaturą o nazwie `celcius`. Następnie zwróci on informację, czy temperatura jest wystarczająco wysoka.

```js{3,5}
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>Woda będzie się gotować</p>;
  }
  return <p>Woda nie będzie się gotować.</p>;
}
```

Następnie, stworzymy komponent o nazwie `Calculator`. Wyrenderuje on `<input>`, który pozwoli wpisać temperaturę oraz zachowa jego wartość w `this.state.temperature`.

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

Naszym kolejnym wymogiem jest, aby oprócz inputa do wpisywania temperatury w Celsjuszach, dostarczyć także input, który przyjmuje temperaturę w Fahrenheitach. Oba inputy powinny być ze sobą zsynchronizowane.

Rozpocznijmy od wyizolowania komponentu `TemperatureInput` z komponentu `Calculator`. Dodamy nowy atrybut `scale`, który będzie mógł przyjmować wartość `"c"` lub `"f"`:

```js{1-4,19,22}
const scaleNames = {
  c: 'Celjuszach',
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

Mamy teraz dwa inputy, jednak podając temperaturę w jednym z nich, drugi nie zostanie zaktualizowany. Jest to sprzeczne z naszymi wymogami: chcemy, by oba inputy były ze sobą zsynchronizowane.

Nie możemy też wyświetlić `BoilingVerdict` z komponentu `Calculator`. Spowodowane jest to faktem, iż `Calculator` nie ma dostępu do informacji o obecnej temperaturze, która schowana jest w `TemperatureInput`.

## Pisanie funkcji konwertujących {#writing-conversion-functions}

Na początek, napiszemy dwie funkcje do konwertowania temperatury ze stopni Celsjusza na Fahrenheita i z powrotem:

```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

Obie te funkcje konwertują numery. Napiszemy kolejną funkcję, która przyjmie ciąg znaków `temperature` oraz funkcję konwertującą jako argumenty, zwracając ciąg znaków. Użyjemy tej funkcji do wyliczenia wartości jednego inputa, w oparciu o drugi.

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

Na przykład, `tryConvert('abc', toCelcius)` zwróci pusty ciąg znaków, natomiast `tryConvert('10.22', toFahrenheit)` zwróci `'50.396'`.

## Wynoszenie stanu w góre {#lifting-state-up}

Obecnie, oba komponenty `TemperatureInput` trzymają swoją wartość niezależnie, w lokalnym stanie:

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

Nam zależy jednak, aby oba te inputy były ze sobą zsynchronizowane. Podczas aktualizacji inputa Celsjusza, input Fahrenheita powinien odzwierciedlać przekonwertowaną temperaturę i odwrotnie.

W Reakcie, współdzielenie stanu komponentu można osiągnąć poprzez utworzenie wspólnego stanu w najbliższym wspólnym przodku. Nazywa się to "wynoszeniem stanu w górę" (ang. *Lifting state up*).

Jeśli wyniesiemy stan do komponentu `Calculator`, zostanie on "źródłem prawdy" dla obecnej temperatury w obu inputach. Komponent ten może poinformować je o trzymaniu zgodnych wartości. Oba inputy będą ze sobą zawsze zsynchronizowane, ponieważ atrybuty dla komponentów `TemperatureInput` przychodzą ze wspólnego przodka - komponentu `Calculator`.

Przeanalizujmy to krok po kroku.

Najpierw, zastąpimy `this.state.temperature` używając `this.props.temperature` w komponencie `TemperatureInput`. Na tę chwilę, przyjmijmy, że `this.props.temperature` istnieje, jednakże w przyszłości, będziemy musieli go przekazać z komponentu `Calculator`:

```js{3}
  render() {
    // Wcześniej: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

Wiemy, że [atrybuty są tylko do odczytu](/docs/components-and-props.html#props-are-read-only). Kiedy `temperature` znajdowało się w lokalnym stanie, komponent `TemperatureInput` mógł po prostu wywołać `this.setState()`, by je zmienić. Jednak, ponieważ teraz `temperature` jest przekazywane jako argument od rodzica, komponent `TemperatureInput` nie ma nad tym żadnej kontroli.

W Reakcie, rozwiązujemy to na ogół poprzez ustanowienie komponentu "kontrolowanym". Tak samo, jak w DOMie, gdzie `<input>` akceptuje zarówno `value`, jak i `onChange` jako atrybuty, tak i komponent `TemperatureInput` akceptuje atrybuty `temperature` oraz `onTemperatureChange` przekazywane przez rodzica.

Teraz, za każdym razem, gdy komponent `TemperatureInput` chce zaktualizować temperaturę, wywołuje on `this.props.onTemperatureChange`:

```js{3}
  handleChange(e) {
    // Wcześniej: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```

>Wskazówka:
>
> Nazwy, których używamy w przykładach, takie jak `temperature` czy `onTemperatureChange` są nazwami zwyczajowymi i można je określić w dowolny sposób. Moglibyśmy równie dobrze nazwać je `value` i `onChange`, co jest popularną konwencją.

Argumenty `onTemperatureChange` oraz `temperatur` zostaną przekazane przez rodzica - komponent `Calculator`. Obsłuży on zmianę poprzez zmodyfikowanie swojego stanu lokalnego, zatem oba inputy zostaną ponownie wyrenderowane z nowymi wartościami. Już wkrótce przyjrzymy się nowej implementacji komponentu `Calculator`.

Zanim przyjrzymy się zmianom dokonanym komponentowi `Calculator`, podsumujmy zmiany w komponencie `TemperatureInput`. Pozbyliśmy się stanu lokalnego i zamiast korzystać z `this.state.temperature`, możemy teraz używać `this.props.temperature`. Zamiast wywoływać `this.setState()`, kiedy chcemy zrobić zmianę, możemy teraz odwołać się do `this.props.onTemperatureChange()`, które udostępnione zostanie przez komponent `Calculator`.

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

Wartości atrybutów obecnego inputa - `temperature` oraz `scale` będziemy przechowywać w stanie lokalnym. Użyjemy stanu, który "wynieśliśmy w górę" z inputów i będzie on nam służył za "źródło prawdy". Wynieśliśmy najmniejszą potrzebną ilość danych, które pozwolą nam renderować oba inputy.

Na przykład, jeśli do inputa Celcius wpiszemy `37`, stan komponentu `Calculator` będzie wyglądał następująco:

```js
{
  temperature: '37',
  scale: 'c'
}
```

Jeśli zdecydujemy się później edytować pole Fahrenheit i wpiszemy liczbę 212, stan komponentu `Calculator` będzie się przedstawiał tak:

```js
{
  temperature: '212',
  scale: 'f'
}
```

Moglibyśmy przetrzymywać wartość obu inputów, jednak jest to kompletnie niepotrzebne. Trzymanie wartości ostatnio zmienianego inputa i jego skali wystarczy do uzyskania pożądanego wyniku. Możemy teraz wyliczyć wartość drugiego inputa na podstawie obecnej wartości `temperature` oraz `scale`.

Inputy są ze sobą zsynchronizowane, ponieważ ich wartości są obliczane z tego samego stanu.

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

Nie ma teraz znaczenia, który z inputów edytujemy, w komponencie `Calculator` zarówno `this.state.temperature`, jak i `this.state.scale` są aktualizowane.

Podsumujmy teraz co dzieje się, gdy edytujemy jeden z inputów:

* React wywołuje funkcję `onChange` na elemencie DOM `<input>`. W naszym przypadku jest to metoda `handleChange` z komponentu `TemperatureInput`.
* Metoda `handleChange` w komponencie `TemperatureInput` wywołuje `this.props.onTemperatureChange()` z nową wartością. Atrybuty tego komponentu, takie jak `onTemperatureChange` pochodzą od rodzica - komponentu `Calculator`.
* Podczas poprzedniego renderu, komponent `Calculator` określił, że atrybut `onTemperatureChange` przychodzący z komponentu `TemperatureInput` z Celsjuszami, jest wywoływany metodą `handleCelciusChange`, natomiast `onTemperatureChange` z komponentu z Fahrenheitami, jest teraz wywoływany metodą `handleFahrenheitChange`. Dzięki temu, w zależności od tego, który input dostanie nową wartość, jedna z tych metod zostanie wywołana.
* Wewnątrz tych metod, komponent `Calculator` prosi Reacta o ponowne renderowanie komponentu, poprzez użycie `this.setState()` z nową wartością inputa oraz obecnie używaną skalą.
* React wywołuje metodę `render` komponentu `Calculator`, by dowiedzieć się, jak powinien wyglądać jego UI. Wartości obu inputów są ponownie obliczane, bazując na aktualnych wartościach temperatury oraz aktywnej skali. To w tym miejscu odbywa się konwersja temperatury.
* React wywołuje metodę `render` indywidualnych komponentów `TemperatureInput` z ich nowymi atrybutami, które zostały określone przez komponent `Calculator`. React dowiaduje się wtedy jak powinien wyglądać UI komponentu.
* React wywołuje metodę `render` komponentu `BoilingVerdict`, przekazując do niego temperaturę w Celsjuszach jako atrybut.
* DOM Reacta aktualizuje DOM rezultatem dopasowując się do wartości inputów. Input, który właśnie edytowaliśmy, otrzymuje swoją obecną wartość, natomiast drugi input otrzymuje temperaturę po konwersji.

Każda aktualizacja przechodzi ten sam proces, więc inputy są zawsze zsynchronizowane.

## Wnioski {#lessons-learned}

Wszelkie dane, które zmieniają się w aplikacji reactowej, powinny mieć swoje pojedyncze "źródło prawdy". Na ogół, stan dodaje się najpierw do komponentu, który potrzebuje go podczas renderowania. Następnie, jeśli inny komponent potrzebuje tych samych danych, możemy je "wynieść w górę" do najbliższego wspólnego przodka. Zamiast prób synchronizacji stanu pomiędzy różnymi komponentami, powinieneś polegać na [przepływie danych "z góry na dół"](/docs/state-and-lifecycle.html#the-data-flows-down).

Wynoszenie stanu w górę wymaga pisanie bardziej "boilerplate'owo", niż wiązanie dwukierunkowe. Pozwala to jednak na łatwiejsze znalezienie i wyizolowanie błędów. Ponieważ każdy stan "żyje" w jakimś komponencie, a komponent ten może go zmienić, ryzyko powstania błędów jest znacznie mniejsze. Dodatkowo, można utworzyć dodatkową logikę, która odrzuci lub przeniesie dane wejściowe od użytkownika.

Jeśli coś może być użyte zarówno z atrybutu, jak i stanu, prawdopodobnie nie powinno to pochodzić ze stanu. Na przykład, zamiast przetrzymywać zarówno `celciusValue` oraz `fahrenheitValue`, przechowujemy jedynie ostatnio edytowane `temperature` oraz `scale`. Wartość drugiego inputa może być przecież wyliczona podczas renderowania w metodzie `render()`. Pozwala nam to na edycję pozostałych pól, nie tracąc informacji przekazanej przez użytkownika.

Jeśli zauważysz nieprawidłowości w UI swojej aplikacji, możesz użyć [Narzędzi Deweloperskich Reacta](https://github.com/facebook/react-devtools), by zbadać atrybuty i przemieszczać się po drzewie, dopóki nie znajdziesz komponentu odpowiedzialnego za zmianę stanu. Pozwoli Ci to znaleźć źródło błędów:

<img src="../images/docs/react-devtools-state.gif" alt="Monitorowanie stanu w Narzędziach Deweloperskich Reacta" max-width="100%" height="100%">

