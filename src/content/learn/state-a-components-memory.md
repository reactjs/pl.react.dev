---
title: "Stan - Pamięć komponentu"
---

<Intro>

Komponenty często muszą zmieniać to, co jest wyświetlane na ekranie w wyniku interakcji. Wpisywanie w formularzu powinno aktualizować jego pole, kliknięcie "następny" w kolejce obrazów powinno zmieniać wyświetlany obraz, kliknięcie "kup" powinno umieścić produkt w koszyku. Komponenty muszą „pamiętać” różne rzeczy: bieżącą wartość pola, bieżący obraz, zawartość koszyka. W Reakcie tego rodzaju pamięć specyficzna dla komponentu nazywana jest *stanem* (ang. _state_).

</Intro>

<YouWillLearn>

* Jak dodać zmienną stanu za pomocą Hooka [`useState`](/reference/react/useState) 
* Jaką parę wartości zwraca Hook `useState`
* Jak dodać więcej niż jedną zmienną stanu
* Dlaczego stan nazywa się lokalnym

</YouWillLearn>

## Kiedy zwykła zmienna nie wystarcza {/*when-a-regular-variable-isnt-enough*/}

Oto komponent, który renderuje obraz rzeźby. Kliknięcie przycisku "Następny" powinno pokazać następną rzeźbę, zmieniając `index` na `1`, potem na `2` i tak dalej. Jednak **to nie zadziała** (możesz spróbować!):

<Sandpack>

```js
import { sculptureList } from './data.js';

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Następny
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        autorstwa {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} z {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}
```

```js src/data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Chociaż Colvin jest głównie znana z abstrakcyjnych tematów nawiązujących do symboli prekolumbijskich, ta gigantyczna rzeźba, hołd dla neurochirurgii, jest jednym z jej najbardziej rozpoznawalnych dzieł sztuki publicznej.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'Brązowy posąg dwóch skrzyżowanych rąk delikatnie trzymających ludzki mózg w opuszkach palców.'
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'Ten ogromny (75 stóp lub 23 m) srebrny kwiat znajduje się w Buenos Aires. Jest zaprojektowany w taki sposób, aby się poruszać, zamykając swoje płatki wieczorem lub podczas silnych wiatrów, a otwierając je rano.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'Gigantyczna metalowa rzeźba kwiatu z refleksyjnymi płatkami przypominającymi lustro i mocnymi pręcikami.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson był znany ze swojego zainteresowania równością, sprawiedliwością społeczną, a także istotnymi i duchownymi cechami ludzkości. Ta ogromna (7 stóp lub 2,13 m) rzeźba z brązu przedstawia to, co opisał jako "symboliczną czarną obecność nasyconą poczuciem uniwersalnej ludzkości".',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'Rzeźba przedstawiająca ludzką głowę wydaje się być zawsze obecna i poważna. Promieniuje spokojem i harmonią.'
}, {
  name: 'Moai',
  artist: 'nieznanego',
  description: 'Na Wyspie Wielkanocnej znajduje się 1000 moai, czyli monumentalnych posągów stworzonych przez wczesnych ludzi Rapa Nui, które niektórzy uważają za przedstawienia deifikowanych przodków.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Trzy monumentalne kamienne popiersia z głowami, które są nieproporcjonalnie duże, o smutnych twarzach.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'Nany to tryumfujące stworzenia, symbole kobiecości i macierzyństwa. Początkowo, Saint Phalle używała tkanin i znalezionych przedmiotów do tworzenia Nan, a później wprowadziła poliester, aby uzyskać bardziej żywy efekt.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'Duża mozaikowa rzeźba cudacznej, tańczącej kobiecej figury w kolorowym kostiumie, emanująca radością.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'Ta abstrakcyjna rzeźba z brązu jest częścią serii "The Family of Man" znajdującej się w Yorkshire Sculpture Park. Hepworth zdecydowała się nie tworzyć dosłownych reprezentacji świata, lecz opracowała abstrakcyjne formy inspirowane ludźmi i krajobrazami.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'Wysoka rzeźba składająca się z trzech elementów ułożonych jeden na drugim, przypominająca ludzką postać.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: 'Pochodzący z rodziny czterech pokoleń rzeźbiarzy w drewnie, prace Fakeye’a łączyły tradycyjne i współczesne motywy yoruba.',
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'Skrupulatna rzeźba w drewnie przedstawiająca wojownika z skoncentrowaną twarzą na koniu ozdobionym wzorami.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: 'Szapocznikow jest znana ze swoich rzeźb przedstawiających fragmenty ciała jako metaforę kruchości i nietrwałości młodości oraz piękna. Ta rzeźba przedstawia dwa bardzo realistyczne, duże brzuchy ułożone jeden na drugim, każdy o wysokości około pięciu stóp (1,5 m).',
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'Rzeźba przypomina kaskadę fałd, znacznie różniącą się od brzuchów w klasycznych rzeźbach.'
}, {
  name: 'Terakotowa Armia',
  artist: 'nieznanego',
  description: 'Terakotowa Armia to zbiór rzeźb z terakoty przedstawiających armię Qin Shi Huanga, pierwszego cesarza Chin. Armia składała się z ponad 8 000 żołnierzy, 130 wozów z 520 końmi oraz 150 koni kawaleryjskich.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 rzeźb z terakoty przedstawiających poważnych wojowników, każdy z unikalnym wyrazem twarzy i zbroją.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson była znana z pozyskiwania przedmiotów z odpadów Nowego Jorku, które później łączyła w monumentalne konstrukcje. W tej pracy wykorzystała różne części, takie jak noga łóżka, kij do żonglowania i fragment siedzenia, przybijając i klejąc je do pudełek, które odzwierciedlają wpływ geometrycznej abstrakcji kubizmu.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'Czarna matowa rzeźba, gdzie poszczególne elementy są początkowo nie do rozróżnienia.'
}, {
  name: 'Aureola',
  artist: 'Ranjani Shettar',
  description: 'Shettar łączy tradycję z nowoczesnością, naturę z przemysłem. Jej sztuka koncentruje się na relacji między człowiekiem a naturą. Jej prace opisywane są jako porywające zarówno w sensie abstrakcyjnym, jak i figuratywnym, nieważkie i jako „doskonała synteza nieoczywistych materiałów”.',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'Jasna rzeźba przypominająca drut, zamocowana na betonowej ścianie i opadająca na podłogę. Wydaje się lekka.'
}, {
  name: 'Hippos',
  artist: 'Ogród Zoologiczny w Taipei',
  description: 'Ogród Zoologiczny w Taipei zlecił stworzenie Placu Hipopotamów z zanurzoną w wodzie grupą bawiących się hipopotamów.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'Grupa rzeźb z brązu przedstawiająca hipopotamy wychodzące z chodnika, jakby pływały.'
}];
```

```css
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img { width: 120px; height: 120px; }
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

Procedura obsługi zdarzenia `handleClick` aktualizuje lokalną zmienną `index`. Jednak dwie rzeczy uniemożliwiają zobaczenie tej zmiany:

1. **Lokalne zmienne nie są zachowywane między renderowaniami.** Gdy React renderuje ten komponent po raz drugi, renderuje go od zera—nie uwzględnia żadnych zmian w lokalnych zmiennych.
2. **Zmiany w lokalnych zmiennych nie wywołają renderowania.** React nie zdaje sobie sprawy, że musi ponownie wyrenderować komponent z nowymi danymi.

Aby zaktualizować komponent nowymi danymi, muszą zajść dwie rzeczy:

1. **Zachować** dane między renderowaniami.
2. **Wywołać** ponowne renderowanie komponentu przez Reacta z nowymi danymi (re-rendering).

Hook [`useState`](/reference/react/useState) zapewnia te dwie rzeczy:

1. **Zmienną stanu** do zachowania danych między renderowaniami.
2. **Funkcję ustawiająca stan** do aktualizacji zmiennej i wywołania ponownego renderowania komponentu przez Reacta.

## Dodawanie zmiennej stanu {/*adding-a-state-variable*/}

Aby dodać zmienną stanu, zaimportuj `useState` z Reacta na początku pliku:

```js
import { useState } from 'react';
```

Następnie, zamień tę linię:

```js
let index = 0;
```

na

```js
const [index, setIndex] = useState(0);
```

`index` jest zmienną stanu i `setIndex` to funkcja ustawiająca stan.

> Składnia `[` i `]` nazywana jest [destrukturyzacją tablicy](https://javascript.info/destructuring-assignment) i pozwala na odczyt wartości z tablicy. Tablica zwrócona przez `useState` zawsze zawiera dokładnie dwa elementy.

Oto jak współpracują ze sobą w `handleClick`:

```js
function handleClick() {
  setIndex(index + 1);
}
```

Teraz kliknięcie przycisku "Następny" przełącza bieżącą rzeźbę:

<Sandpack>

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Następny
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        autorstwa {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} z {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}
```

```js src/data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Chociaż Colvin jest głównie znana z abstrakcyjnych tematów nawiązujących do symboli prekolumbijskich, ta gigantyczna rzeźba, hołd dla neurochirurgii, jest jednym z jej najbardziej rozpoznawalnych dzieł sztuki publicznej.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'Brązowy posąg dwóch skrzyżowanych rąk delikatnie trzymających ludzki mózg w opuszkach palców.'
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'Ten ogromny (75 stóp lub 23 m) srebrny kwiat znajduje się w Buenos Aires. Jest zaprojektowany w taki sposób, aby się poruszać, zamykając swoje płatki wieczorem lub podczas silnych wiatrów, a otwierając je rano.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'Gigantyczna metalowa rzeźba kwiatu z refleksyjnymi płatkami przypominającymi lustro i mocnymi pręcikami.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson był znany ze swojego zainteresowania równością, sprawiedliwością społeczną, a także istotnymi i duchownymi cechami ludzkości. Ta ogromna (7 stóp lub 2,13 m) rzeźba z brązu przedstawia to, co opisał jako "symboliczną czarną obecność nasyconą poczuciem uniwersalnej ludzkości".',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'Rzeźba przedstawiająca ludzką głowę wydaje się być zawsze obecna i poważna. Promieniuje spokojem i harmonią.'
}, {
  name: 'Moai',
  artist: 'nieznanego',
  description: 'Na Wyspie Wielkanocnej znajduje się 1000 moai, czyli monumentalnych posągów stworzonych przez wczesnych ludzi Rapa Nui, które niektórzy uważają za przedstawienia deifikowanych przodków.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Trzy monumentalne kamienne popiersia z głowami, które są nieproporcjonalnie duże, o smutnych twarzach.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'Nany to tryumfujące stworzenia, symbole kobiecości i macierzyństwa. Początkowo, Saint Phalle używała tkanin i znalezionych przedmiotów do tworzenia Nan, a później wprowadziła poliester, aby uzyskać bardziej żywy efekt.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'Duża mozaikowa rzeźba cudacznej, tańczącej kobiecej figury w kolorowym kostiumie, emanująca radością.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'Ta abstrakcyjna rzeźba z brązu jest częścią serii "The Family of Man" znajdującej się w Yorkshire Sculpture Park. Hepworth zdecydowała się nie tworzyć dosłownych reprezentacji świata, lecz opracowała abstrakcyjne formy inspirowane ludźmi i krajobrazami.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'Wysoka rzeźba składająca się z trzech elementów ułożonych jeden na drugim, przypominająca ludzką postać.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: 'Pochodzący z rodziny czterech pokoleń rzeźbiarzy w drewnie, prace Fakeye’a łączyły tradycyjne i współczesne motywy yoruba.',
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'Skrupulatna rzeźba w drewnie przedstawiająca wojownika z skoncentrowaną twarzą na koniu ozdobionym wzorami.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: 'Szapocznikow jest znana ze swoich rzeźb przedstawiających fragmenty ciała jako metaforę kruchości i nietrwałości młodości oraz piękna. Ta rzeźba przedstawia dwa bardzo realistyczne, duże brzuchy ułożone jeden na drugim, każdy o wysokości około pięciu stóp (1,5 m).',
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'Rzeźba przypomina kaskadę fałd, znacznie różniącą się od brzuchów w klasycznych rzeźbach.'
}, {
  name: 'Terakotowa Armia',
  artist: 'nieznanego',
  description: 'Terakotowa Armia to zbiór rzeźb z terakoty przedstawiających armię Qin Shi Huanga, pierwszego cesarza Chin. Armia składała się z ponad 8 000 żołnierzy, 130 wozów z 520 końmi oraz 150 koni kawaleryjskich.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 rzeźb z terakoty przedstawiających poważnych wojowników, każdy z unikalnym wyrazem twarzy i zbroją.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson była znana z pozyskiwania przedmiotów z odpadów Nowego Jorku, które później łączyła w monumentalne konstrukcje. W tej pracy wykorzystała różne części, takie jak noga łóżka, kij do żonglowania i fragment siedzenia, przybijając i klejąc je do pudełek, które odzwierciedlają wpływ geometrycznej abstrakcji kubizmu.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'Czarna matowa rzeźba, gdzie poszczególne elementy są początkowo nie do rozróżnienia.'
}, {
  name: 'Aureola',
  artist: 'Ranjani Shettar',
  description: 'Shettar łączy tradycję z nowoczesnością, naturę z przemysłem. Jej sztuka koncentruje się na relacji między człowiekiem a naturą. Jej prace opisywane są jako porywające zarówno w sensie abstrakcyjnym, jak i figuratywnym, nieważkie i jako „doskonała synteza nieoczywistych materiałów”.',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'Jasna rzeźba przypominająca drut, zamocowana na betonowej ścianie i opadająca na podłogę. Wydaje się lekka.'
}, {
  name: 'Hippos',
  artist: 'Ogród Zoologiczny w Taipei',
  description: 'Ogród Zoologiczny w Taipei zlecił stworzenie Placu Hipopotamów z zanurzoną w wodzie grupą bawiących się hipopotamów.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'Grupa rzeźb z brązu przedstawiająca hipopotamy wychodzące z chodnika, jakby pływały.'
}];
```

```css
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
 margin-top: 5px;
 font-weight: normal;
 font-size: 100%;
}
img { width: 120px; height: 120px; }
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

### Poznaj swój pierwszy Hook {/*meet-your-first-hook*/}

W Reakcie, `useState`, a także każda inna funkcja zaczynająca się od "`use`", nazywana jest Hookiem.

*Hooki* to specjalne funkcje, które są dostępne tylko podczas [renderowania](/learn/render-and-commit#step-1-trigger-a-render) (o czym opowiemy szczegółowo na następnej stronie). Pozwalają one na "podłączenie się" do różnych funkcji Reacta.

Stan to tylko jedna z tych funkcji, inne Hooki poznasz później.

<Pitfall>

**Hooki—funkcje rozpoczynające się od `use`—można wywoływać tylko na najwyższym poziomie komponentów lub [własnych Hooków.](/learn/reusing-logic-with-custom-hooks)** Nie możesz wywoływać Hooków wewnątrz warunków, pętli ani innych zagnieżdżonych funkcji. Hooki to funkcje, ale warto myśleć o nich jako o bezwarunkowych deklaracjach dotyczących potrzeb komponentu. "Używasz" funkcji Reacta na górze komponentu, podobnie jak "importujesz" moduły na górze pliku.

</Pitfall>

### Anatomia `useState` {/*anatomy-of-usestate*/}

Kiedy wywołujesz [`useState`](/reference/react/useState),  informujesz Reacta, że chcesz, aby ten komponent coś zapamiętał:

```js
const [index, setIndex] = useState(0);
```

W tym przypadku chcesz, aby React zapamiętał `index`.

<Note>

Konwencją jest nadawanie tej parze nazw np. `const [something, setSomething]`. Możesz nadać im dowolne nazwy, jednak konwencje sprawiają, że łatwiej jest zrozumieć kod w różnych projektach.

</Note>

Jedynym argumentem dla `useState` jest **początkowa wartość** zmiennej stanu. W tym przykładzie początkowa wartość `index` jest ustawiona na `0` za pomocą `useState(0)`. 

Za każdym razem, gdy twój komponent jest renderowany, `useState` zwraca tablicę zawierającą dwie wartości: 

1. **Zmienną stanu** (`index`) z wartością, którą przechowujesz.
2. **Funkcję ustawiającą stan** (`setIndex`), która może zaktualizować  zmienną stanu i spowodować ponowne renderowanie komponentu przez Reacta.

Oto jak to wygląda w praktyce:

```js
const [index, setIndex] = useState(0);
```

1. **Twój komponent renderuje się po raz pierwszy.** Ponieważ przekazałeś `0` do `useState` jako początkową wartość dla `index`, zwróci ono `[0, setIndex]`. React zapamiętuje, że `0` to najnowsza wartość stanu.
2. **Aktualizujesz stan.** Kiedy użytkownik kliknie przycisk, wywołuje to `setIndex(index + 1)`. `index` wynosi `0`, więc wywołane zostanie `setIndex(1)`. To informuje Reacta, że teraz `index` wynosi `1` i  wywołuje ponowny render.
3. **Drugi render twojego komponentu.** React nadal widzi `useState(0)`, ale ponieważ React *pamięta*, że ustawiłeś `index` na `1`,  zwraca zamiast tego `[1, setIndex]`.
4. I tak dalej!

## Nadawanie komponentowi wielu zmiennych stanu {/*giving-a-component-multiple-state-variables*/}

Możesz mieć dowolną liczbę zmiennych stanu różnych typów w jednym komponencie. Ten komponent ma dwie zmienne stanu, liczbę `index` oraz zmienną typu boolean `showMore`, która jest przełączana po kliknięciu „Pokaż detale":

<Sandpack>

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Następny
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        autorstwa {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} z {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Ukryj' : 'Pokaż'} detale
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
```

```js src/data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Chociaż Colvin jest głównie znana z abstrakcyjnych tematów nawiązujących do symboli prekolumbijskich, ta gigantyczna rzeźba, hołd dla neurochirurgii, jest jednym z jej najbardziej rozpoznawalnych dzieł sztuki publicznej.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'Brązowy posąg dwóch skrzyżowanych rąk delikatnie trzymających ludzki mózg w opuszkach palców.'
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'Ten ogromny (75 stóp lub 23 m) srebrny kwiat znajduje się w Buenos Aires. Jest zaprojektowany w taki sposób, aby się poruszać, zamykając swoje płatki wieczorem lub podczas silnych wiatrów, a otwierając je rano.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'Gigantyczna metalowa rzeźba kwiatu z refleksyjnymi płatkami przypominającymi lustro i mocnymi pręcikami.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson był znany ze swojego zainteresowania równością, sprawiedliwością społeczną, a także istotnymi i duchownymi cechami ludzkości. Ta ogromna (7 stóp lub 2,13 m) rzeźba z brązu przedstawia to, co opisał jako "symboliczną czarną obecność nasyconą poczuciem uniwersalnej ludzkości".',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'Rzeźba przedstawiająca ludzką głowę wydaje się być zawsze obecna i poważna. Promieniuje spokojem i harmonią.'
}, {
  name: 'Moai',
  artist: 'nieznanego',
  description: 'Na Wyspie Wielkanocnej znajduje się 1000 moai, czyli monumentalnych posągów stworzonych przez wczesnych ludzi Rapa Nui, które niektórzy uważają za przedstawienia deifikowanych przodków.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Trzy monumentalne kamienne popiersia z głowami, które są nieproporcjonalnie duże, o smutnych twarzach.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'Nany to tryumfujące stworzenia, symbole kobiecości i macierzyństwa. Początkowo, Saint Phalle używała tkanin i znalezionych przedmiotów do tworzenia Nan, a później wprowadziła poliester, aby uzyskać bardziej żywy efekt.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'Duża mozaikowa rzeźba cudacznej, tańczącej kobiecej figury w kolorowym kostiumie, emanująca radością.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'Ta abstrakcyjna rzeźba z brązu jest częścią serii "The Family of Man" znajdującej się w Yorkshire Sculpture Park. Hepworth zdecydowała się nie tworzyć dosłownych reprezentacji świata, lecz opracowała abstrakcyjne formy inspirowane ludźmi i krajobrazami.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'Wysoka rzeźba składająca się z trzech elementów ułożonych jeden na drugim, przypominająca ludzką postać.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: 'Pochodzący z rodziny czterech pokoleń rzeźbiarzy w drewnie, prace Fakeye’a łączyły tradycyjne i współczesne motywy yoruba.',
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'Skrupulatna rzeźba w drewnie przedstawiająca wojownika z skoncentrowaną twarzą na koniu ozdobionym wzorami.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: 'Szapocznikow jest znana ze swoich rzeźb przedstawiających fragmenty ciała jako metaforę kruchości i nietrwałości młodości oraz piękna. Ta rzeźba przedstawia dwa bardzo realistyczne, duże brzuchy ułożone jeden na drugim, każdy o wysokości około pięciu stóp (1,5 m).',
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'Rzeźba przypomina kaskadę fałd, znacznie różniącą się od brzuchów w klasycznych rzeźbach.'
}, {
  name: 'Terakotowa Armia',
  artist: 'nieznanego',
  description: 'Terakotowa Armia to zbiór rzeźb z terakoty przedstawiających armię Qin Shi Huanga, pierwszego cesarza Chin. Armia składała się z ponad 8 000 żołnierzy, 130 wozów z 520 końmi oraz 150 koni kawaleryjskich.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 rzeźb z terakoty przedstawiających poważnych wojowników, każdy z unikalnym wyrazem twarzy i zbroją.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson była znana z pozyskiwania przedmiotów z odpadów Nowego Jorku, które później łączyła w monumentalne konstrukcje. W tej pracy wykorzystała różne części, takie jak noga łóżka, kij do żonglowania i fragment siedzenia, przybijając i klejąc je do pudełek, które odzwierciedlają wpływ geometrycznej abstrakcji kubizmu.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'Czarna matowa rzeźba, gdzie poszczególne elementy są początkowo nie do rozróżnienia.'
}, {
  name: 'Aureola',
  artist: 'Ranjani Shettar',
  description: 'Shettar łączy tradycję z nowoczesnością, naturę z przemysłem. Jej sztuka koncentruje się na relacji między człowiekiem a naturą. Jej prace opisywane są jako porywające zarówno w sensie abstrakcyjnym, jak i figuratywnym, nieważkie i jako „doskonała synteza nieoczywistych materiałów”.',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'Jasna rzeźba przypominająca drut, zamocowana na betonowej ścianie i opadająca na podłogę. Wydaje się lekka.'
}, {
  name: 'Hippos',
  artist: 'Ogród Zoologiczny w Taipei',
  description: 'Ogród Zoologiczny w Taipei zlecił stworzenie Placu Hipopotamów z zanurzoną w wodzie grupą bawiących się hipopotamów.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'Grupa rzeźb z brązu przedstawiająca hipopotamy wychodzące z chodnika, jakby pływały.'
}];
```

```css
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
 margin-top: 5px;
 font-weight: normal;
 font-size: 100%;
}
img { width: 120px; height: 120px; }
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

Dobrym pomysłem jest posiadanie wielu zmiennych stanu, jeśli ich stan nie jest powiązany, jak w przypadku `index` i `showMore` w tym przykładzie.  Jednak jeśli zauważysz, że często zmieniasz dwie zmienne stanu razem, może być łatwiej połączyć je w jedną. Na przykład, jeśli masz formularz z wieloma polami, wygodniej jest mieć jedną zmienną stanu przechowującą obiekt niż zmienną stanu dla każdego pola. Przeczytaj [dobieranie struktury stanu](/learn/choosing-the-state-structure) po więcej wskazówek.

<DeepDive>

#### Jak React wie, który stan zwrócić? {/*how-does-react-know-which-state-to-return*/}

Być może zauważyłeś, że wywołanie `useState` nie otrzymuje żadnych informacji o tym, do *której* zmiennej stanu się odnosi. Nie ma żadnego "identyfikatora", który jest przekazywany do `useState`, więc jak React wie, którą zmienną stanu zwrócić? Czy polega to na jakiejś magii, jak analizowanie twoich funkcji? Odpowiedź brzmi nie.

Zamiast tego, aby umożliwić ich zwięzłą składnię, Hooki **opierają się na stabilnej kolejności wywołań przy każdym renderze tego samego komponentu.** Działa to dobrze w praktyce, ponieważ jeśli przestrzegasz zasady powyżej ("wywołuj Hooki tylko na najwyższym poziomie"), Hooki będą zawsze wywoływane w tej samej kolejności. Dodatkowo [plugin lintera](https://www.npmjs.com/package/eslint-plugin-react-hooks) wychwytuje większość błędów.

Wewnątrz Reacta, dla każdego komponentu przechowywana jest tablica par stanu. React utrzymuje również bieżący indeks pary, który jest ustawiony na `0` przed renderowaniem. Za każdym razem, gdy wywołujesz `useState`, React zwraca kolejną parę stanu i inkrementuje indeks. Możesz poczytać więcej o tym mechanizmie w artykule [React Hooks: Not Magic, Just Arrays.](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

Ten przykład  **nie używa Reacta**  ale da ci wyobrażenie o tym, jak `useState` działa od środka:

<Sandpack>

```js src/index.js active
let componentHooks = [];
let currentHookIndex = 0;

// Jak działa useState w Reakcie (w uproszczeniu).
function useState(initialState) {
  let pair = componentHooks[currentHookIndex];
  if (pair) {
    // To nie jest pierwszy render,
    // więc para stanu już istnieje.
    // Zwróć ją i przygotuj się na następne wywołanie Hooka.
    currentHookIndex++;
    return pair;
  }

  // To pierwszy raz, gdy renderujemy,
  // więc tworzymy parę stanu i ją przechowujemy.
  pair = [initialState, setState];

  function setState(nextState) {
    // Kiedy użytkownik zażąda zmiany stanu,
    // wstaw nową wartość do pary.
    pair[0] = nextState;
    updateDOM();
  }

  // Przechowaj parę na przyszłe rendery
  // i przygotuj się na następne wywołanie Hooka
  componentHooks[currentHookIndex] = pair;
  currentHookIndex++;
  return pair;
}

function Gallery() {
  // Każde wywołanie useState() zwróci następną parę.
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  // Ten przykład nie używa Reacta, więc
  // zwróć obiekt wynikowy zamiast JSX.
  return {
    onNextClick: handleNextClick,
    onMoreClick: handleMoreClick,
    header: `${sculpture.name} autorstwa ${sculpture.artist}`,
    counter: `${index + 1} z ${sculptureList.length}`,
    more: `${showMore ? 'Ukryj' : 'Pokaż'} detale`,
    description: showMore ? sculpture.description : null,
    imageSrc: sculpture.url,
    imageAlt: sculpture.alt
  };
}

function updateDOM() {
  // Zresetuj bieżący indeks Hooka
  // przed renderowaniem komponentu.
  currentHookIndex = 0;
  let output = Gallery();

  // Zaktualizuj DOM, aby pasował do wynikowego wyjścia.
  // To jest część, którą React wykonuje za Ciebie.
  nextButton.onclick = output.onNextClick;
  header.textContent = output.header;
  moreButton.onclick = output.onMoreClick;
  moreButton.textContent = output.more;
  image.src = output.imageSrc;
  image.alt = output.imageAlt;
  if (output.description !== null) {
    description.textContent = output.description;
    description.style.display = '';
  } else {
    description.style.display = 'none';
  }
}

let nextButton = document.getElementById('nextButton');
let header = document.getElementById('header');
let moreButton = document.getElementById('moreButton');
let description = document.getElementById('description');
let image = document.getElementById('image');
let sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Chociaż Colvin jest głównie znana z abstrakcyjnych tematów nawiązujących do symboli prekolumbijskich, ta gigantyczna rzeźba, hołd dla neurochirurgii, jest jednym z jej najbardziej rozpoznawalnych dzieł sztuki publicznej.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'Brązowy posąg dwóch skrzyżowanych rąk delikatnie trzymających ludzki mózg w opuszkach palców.'
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'Ten ogromny (75 stóp lub 23 m) srebrny kwiat znajduje się w Buenos Aires. Jest zaprojektowany w taki sposób, aby się poruszać, zamykając swoje płatki wieczorem lub podczas silnych wiatrów, a otwierając je rano.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'Gigantyczna metalowa rzeźba kwiatu z refleksyjnymi płatkami przypominającymi lustro i mocnymi pręcikami.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson był znany ze swojego zainteresowania równością, sprawiedliwością społeczną, a także istotnymi i duchownymi cechami ludzkości. Ta ogromna (7 stóp lub 2,13 m) rzeźba z brązu przedstawia to, co opisał jako "symboliczną czarną obecność nasyconą poczuciem uniwersalnej ludzkości".',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'Rzeźba przedstawiająca ludzką głowę wydaje się być zawsze obecna i poważna. Promieniuje spokojem i harmonią.'
}, {
  name: 'Moai',
  artist: 'nieznanego',
  description: 'Na Wyspie Wielkanocnej znajduje się 1000 moai, czyli monumentalnych posągów stworzonych przez wczesnych ludzi Rapa Nui, które niektórzy uważają za przedstawienia deifikowanych przodków.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Trzy monumentalne kamienne popiersia z głowami, które są nieproporcjonalnie duże, o smutnych twarzach.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'Nany to tryumfujące stworzenia, symbole kobiecości i macierzyństwa. Początkowo, Saint Phalle używała tkanin i znalezionych przedmiotów do tworzenia Nan, a później wprowadziła poliester, aby uzyskać bardziej żywy efekt.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'Duża mozaikowa rzeźba cudacznej, tańczącej kobiecej figury w kolorowym kostiumie, emanująca radością.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'Ta abstrakcyjna rzeźba z brązu jest częścią serii "The Family of Man" znajdującej się w Yorkshire Sculpture Park. Hepworth zdecydowała się nie tworzyć dosłownych reprezentacji świata, lecz opracowała abstrakcyjne formy inspirowane ludźmi i krajobrazami.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'Wysoka rzeźba składająca się z trzech elementów ułożonych jeden na drugim, przypominająca ludzką postać.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: 'Pochodzący z rodziny czterech pokoleń rzeźbiarzy w drewnie, prace Fakeye’a łączyły tradycyjne i współczesne motywy yoruba.',
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'Skrupulatna rzeźba w drewnie przedstawiająca wojownika z skoncentrowaną twarzą na koniu ozdobionym wzorami.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: 'Szapocznikow jest znana ze swoich rzeźb przedstawiających fragmenty ciała jako metaforę kruchości i nietrwałości młodości oraz piękna. Ta rzeźba przedstawia dwa bardzo realistyczne, duże brzuchy ułożone jeden na drugim, każdy o wysokości około pięciu stóp (1,5 m).',
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'Rzeźba przypomina kaskadę fałd, znacznie różniącą się od brzuchów w klasycznych rzeźbach.'
}, {
  name: 'Terakotowa Armia',
  artist: 'nieznanego',
  description: 'Terakotowa Armia to zbiór rzeźb z terakoty przedstawiających armię Qin Shi Huanga, pierwszego cesarza Chin. Armia składała się z ponad 8 000 żołnierzy, 130 wozów z 520 końmi oraz 150 koni kawaleryjskich.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 rzeźb z terakoty przedstawiających poważnych wojowników, każdy z unikalnym wyrazem twarzy i zbroją.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson była znana z pozyskiwania przedmiotów z odpadów Nowego Jorku, które później łączyła w monumentalne konstrukcje. W tej pracy wykorzystała różne części, takie jak noga łóżka, kij do żonglowania i fragment siedzenia, przybijając i klejąc je do pudełek, które odzwierciedlają wpływ geometrycznej abstrakcji kubizmu.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'Czarna matowa rzeźba, gdzie poszczególne elementy są początkowo nie do rozróżnienia.'
}, {
  name: 'Aureola',
  artist: 'Ranjani Shettar',
  description: 'Shettar łączy tradycję z nowoczesnością, naturę z przemysłem. Jej sztuka koncentruje się na relacji między człowiekiem a naturą. Jej prace opisywane są jako porywające zarówno w sensie abstrakcyjnym, jak i figuratywnym, nieważkie i jako „doskonała synteza nieoczywistych materiałów”.',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'Jasna rzeźba przypominająca drut, zamocowana na betonowej ścianie i opadająca na podłogę. Wydaje się lekka.'
}, {
  name: 'Hippos',
  artist: 'Ogród Zoologiczny w Taipei',
  description: 'Ogród Zoologiczny w Taipei zlecił stworzenie Placu Hipopotamów z zanurzoną w wodzie grupą bawiących się hipopotamów.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'Grupa rzeźb z brązu przedstawiająca hipopotamy wychodzące z chodnika, jakby pływały.'
}];

// Sprawdź, czy UI pasuje do początkowego stanu.
updateDOM();
```

```html public/index.html
<button id="nextButton">
  Następny
</button>
<h3 id="header"></h3>
<button id="moreButton"></button>
<p id="description"></p>
<img id="image">

<style>
* { box-sizing: border-box; }
body { font-family: sans-serif; margin: 20px; padding: 0; }
button { display: block; margin-bottom: 10px; }
</style>
```

```css
button { display: block; margin-bottom: 10px; }
```

</Sandpack>

Nie musisz tego rozumieć, aby używać Reacta, ale możesz uznać to za pomocny model mentalny.

</DeepDive>

## Stan jest izolowany i prywatny. {/*state-is-isolated-and-private*/}

Stan jest lokalny dla instancji komponentu na ekranie. Innymi słowy, **jeśli renderujesz ten sam komponent dwa razy, każda kopia będzie miała całkowicie wyizolowany stan!** Zmiana jednego z nich nie wpłynie na drugi.

W tym przykładzie komponent `Gallery` z wcześniejszego przykładu jest renderowany dwukrotnie, bez zmian w jego logice. Spróbuj kliknąć przyciski w każdej z galerii. Zauważ, że ich stan jest niezależny:

<Sandpack>

```js
import Gallery from './Gallery.js';

export default function Page() {
  return (
    <div className="Page">
      <Gallery />
      <Gallery />
    </div>
  );
}

```

```js src/Gallery.js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <section>
      <button onClick={handleNextClick}>
        Następny
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        autorstwa {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} z {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Ukryj' : 'Pokaż'} detale
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </section>
  );
}
```

```js src/data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Chociaż Colvin jest głównie znana z abstrakcyjnych tematów nawiązujących do symboli prekolumbijskich, ta gigantyczna rzeźba, hołd dla neurochirurgii, jest jednym z jej najbardziej rozpoznawalnych dzieł sztuki publicznej.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'Brązowy posąg dwóch skrzyżowanych rąk delikatnie trzymających ludzki mózg w opuszkach palców.'
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'Ten ogromny (75 stóp lub 23 m) srebrny kwiat znajduje się w Buenos Aires. Jest zaprojektowany w taki sposób, aby się poruszać, zamykając swoje płatki wieczorem lub podczas silnych wiatrów, a otwierając je rano.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'Gigantyczna metalowa rzeźba kwiatu z refleksyjnymi płatkami przypominającymi lustro i mocnymi pręcikami.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson był znany ze swojego zainteresowania równością, sprawiedliwością społeczną, a także istotnymi i duchownymi cechami ludzkości. Ta ogromna (7 stóp lub 2,13 m) rzeźba z brązu przedstawia to, co opisał jako "symboliczną czarną obecność nasyconą poczuciem uniwersalnej ludzkości".',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'Rzeźba przedstawiająca ludzką głowę wydaje się być zawsze obecna i poważna. Promieniuje spokojem i harmonią.'
}, {
  name: 'Moai',
  artist: 'nieznanego',
  description: 'Na Wyspie Wielkanocnej znajduje się 1000 moai, czyli monumentalnych posągów stworzonych przez wczesnych ludzi Rapa Nui, które niektórzy uważają za przedstawienia deifikowanych przodków.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Trzy monumentalne kamienne popiersia z głowami, które są nieproporcjonalnie duże, o smutnych twarzach.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'Nany to tryumfujące stworzenia, symbole kobiecości i macierzyństwa. Początkowo, Saint Phalle używała tkanin i znalezionych przedmiotów do tworzenia Nan, a później wprowadziła poliester, aby uzyskać bardziej żywy efekt.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'Duża mozaikowa rzeźba cudacznej, tańczącej kobiecej figury w kolorowym kostiumie, emanująca radością.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'Ta abstrakcyjna rzeźba z brązu jest częścią serii "The Family of Man" znajdującej się w Yorkshire Sculpture Park. Hepworth zdecydowała się nie tworzyć dosłownych reprezentacji świata, lecz opracowała abstrakcyjne formy inspirowane ludźmi i krajobrazami.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'Wysoka rzeźba składająca się z trzech elementów ułożonych jeden na drugim, przypominająca ludzką postać.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: 'Pochodzący z rodziny czterech pokoleń rzeźbiarzy w drewnie, prace Fakeye’a łączyły tradycyjne i współczesne motywy yoruba.',
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'Skrupulatna rzeźba w drewnie przedstawiająca wojownika z skoncentrowaną twarzą na koniu ozdobionym wzorami.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: 'Szapocznikow jest znana ze swoich rzeźb przedstawiających fragmenty ciała jako metaforę kruchości i nietrwałości młodości oraz piękna. Ta rzeźba przedstawia dwa bardzo realistyczne, duże brzuchy ułożone jeden na drugim, każdy o wysokości około pięciu stóp (1,5 m).',
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'Rzeźba przypomina kaskadę fałd, znacznie różniącą się od brzuchów w klasycznych rzeźbach.'
}, {
  name: 'Terakotowa Armia',
  artist: 'nieznanego',
  description: 'Terakotowa Armia to zbiór rzeźb z terakoty przedstawiających armię Qin Shi Huanga, pierwszego cesarza Chin. Armia składała się z ponad 8 000 żołnierzy, 130 wozów z 520 końmi oraz 150 koni kawaleryjskich.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 rzeźb z terakoty przedstawiających poważnych wojowników, każdy z unikalnym wyrazem twarzy i zbroją.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson była znana z pozyskiwania przedmiotów z odpadów Nowego Jorku, które później łączyła w monumentalne konstrukcje. W tej pracy wykorzystała różne części, takie jak noga łóżka, kij do żonglowania i fragment siedzenia, przybijając i klejąc je do pudełek, które odzwierciedlają wpływ geometrycznej abstrakcji kubizmu.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'Czarna matowa rzeźba, gdzie poszczególne elementy są początkowo nie do rozróżnienia.'
}, {
  name: 'Aureola',
  artist: 'Ranjani Shettar',
  description: 'Shettar łączy tradycję z nowoczesnością, naturę z przemysłem. Jej sztuka koncentruje się na relacji między człowiekiem a naturą. Jej prace opisywane są jako porywające zarówno w sensie abstrakcyjnym, jak i figuratywnym, nieważkie i jako „doskonała synteza nieoczywistych materiałów”.',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'Jasna rzeźba przypominająca drut, zamocowana na betonowej ścianie i opadająca na podłogę. Wydaje się lekka.'
}, {
  name: 'Hippos',
  artist: 'Ogród Zoologiczny w Taipei',
  description: 'Ogród Zoologiczny w Taipei zlecił stworzenie Placu Hipopotamów z zanurzoną w wodzie grupą bawiących się hipopotamów.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'Grupa rzeźb z brązu przedstawiająca hipopotamy wychodzące z chodnika, jakby pływały.'
}];
```

```css
button { display: block; margin-bottom: 10px; }
.Page > * {
  float: left;
  width: 50%;
  padding: 10px;
}
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img { width: 120px; height: 120px; }
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

To właśnie sprawia, że stan różni się od zwykłych zmiennych, które możesz zadeklarować na początku swojego modułu. Stan nie jest powiązany z konkretnym wywołaniem funkcji ani miejscem w kodzie, ale jest "lokalny" dla konkretnego miejsca na ekranie. Wyrenderowałeś dwa komponenty `<Gallery />`, więc ich stan jest przechowywany osobno.

Zwróć również uwagę, że komponent `Page` nie "wie" nic o stanie `Gallery`  ani nawet o tym, czy w ogóle go posiada. W przeciwieństwie do właściwości (ang. *props*) **stan jest całkowicie prywatny dla komponentu, który go deklaruje.** Komponent nadrzędny nie może go zmienić. Dzięki temu możesz dodać stan do dowolnego komponentu lub go usunąć, nie wpływając na resztę komponentów.

Co jeśli chciałbyś, aby obie galerie miały zsynchronizowany stan? W Reakcie właściwym sposobem na to jest *usunięcie* stanu z komponentów potomnych i dodanie go do ich najbliższego wspólnego rodzica. Kolejne strony skupią się na organizowaniu stanu pojedynczego komponentu, ale wrócimy do tego tematu w rozdziale [Współdzielenie stanu między komponentami.](/learn/sharing-state-between-components)

<Recap>

* Użyj zmiennej stanu, gdy komponent musi "zapamiętać" pewne informacje między renderami.
* Zmienne stanu deklaruje się poprzez wywołanie Hooka `useState`.
* Hooki to specjalne funkcje rozpoczynające się od `use`. Pozwalają one „podłączyć się” do funkcji Reacta, takich jak stan.
* Hooki mogą przypominać importy: muszą być wywoływane bezwarunkowo. Wywoływanie Hooków, w tym `useState`, jest poprawne tylko na najwyższym poziomie komponentu lub innego Hooka.
* Hook `useState` zwraca parę wartości: aktualny stan oraz funkcję do jego aktualizacji.
* Możesz mieć więcej niż jedną zmienną stanu. Wewnętrznie React dopasowuje je według kolejności.
* Stan jest prywatny dla komponentu. Jeśli renderujesz go w dwóch miejscach, każda kopia ma swój własny stan.

</Recap>



<Challenges>

#### Dokończ galerię {/*complete-the-gallery*/}

Kiedy naciśniesz "Następny" na ostatniej rzeźbie, kod powoduje błąd. Napraw logikę, aby uniknąć tego błędu. Możesz to zrobić, dodając dodatkową logikę do obsługi zdarzenia lub wyłączając przycisk, gdy akcja nie jest możliwa.

Po naprawieniu błędu, dodaj przycisk "Poprzedni", który wyświetli poprzednią rzeźbę. Nie powinien on powodować błędu na pierwszej rzeźbie.

<Sandpack>

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Następny
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        autorstwa {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} z {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Ukryj' : 'Pokaż'} detale
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
```

```js src/data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Chociaż Colvin jest głównie znana z abstrakcyjnych tematów nawiązujących do symboli prekolumbijskich, ta gigantyczna rzeźba, hołd dla neurochirurgii, jest jednym z jej najbardziej rozpoznawalnych dzieł sztuki publicznej.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'Brązowy posąg dwóch skrzyżowanych rąk delikatnie trzymających ludzki mózg w opuszkach palców.'
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'Ten ogromny (75 stóp lub 23 m) srebrny kwiat znajduje się w Buenos Aires. Jest zaprojektowany w taki sposób, aby się poruszać, zamykając swoje płatki wieczorem lub podczas silnych wiatrów, a otwierając je rano.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'Gigantyczna metalowa rzeźba kwiatu z refleksyjnymi płatkami przypominającymi lustro i mocnymi pręcikami.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson był znany ze swojego zainteresowania równością, sprawiedliwością społeczną, a także istotnymi i duchownymi cechami ludzkości. Ta ogromna (7 stóp lub 2,13 m) rzeźba z brązu przedstawia to, co opisał jako "symboliczną czarną obecność nasyconą poczuciem uniwersalnej ludzkości".',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'Rzeźba przedstawiająca ludzką głowę wydaje się być zawsze obecna i poważna. Promieniuje spokojem i harmonią.'
}, {
  name: 'Moai',
  artist: 'nieznanego',
  description: 'Na Wyspie Wielkanocnej znajduje się 1000 moai, czyli monumentalnych posągów stworzonych przez wczesnych ludzi Rapa Nui, które niektórzy uważają za przedstawienia deifikowanych przodków.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Trzy monumentalne kamienne popiersia z głowami, które są nieproporcjonalnie duże, o smutnych twarzach.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'Nany to tryumfujące stworzenia, symbole kobiecości i macierzyństwa. Początkowo, Saint Phalle używała tkanin i znalezionych przedmiotów do tworzenia Nan, a później wprowadziła poliester, aby uzyskać bardziej żywy efekt.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'Duża mozaikowa rzeźba cudacznej, tańczącej kobiecej figury w kolorowym kostiumie, emanująca radością.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'Ta abstrakcyjna rzeźba z brązu jest częścią serii "The Family of Man" znajdującej się w Yorkshire Sculpture Park. Hepworth zdecydowała się nie tworzyć dosłownych reprezentacji świata, lecz opracowała abstrakcyjne formy inspirowane ludźmi i krajobrazami.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'Wysoka rzeźba składająca się z trzech elementów ułożonych jeden na drugim, przypominająca ludzką postać.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: 'Pochodzący z rodziny czterech pokoleń rzeźbiarzy w drewnie, prace Fakeye’a łączyły tradycyjne i współczesne motywy yoruba.',
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'Skrupulatna rzeźba w drewnie przedstawiająca wojownika z skoncentrowaną twarzą na koniu ozdobionym wzorami.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: 'Szapocznikow jest znana ze swoich rzeźb przedstawiających fragmenty ciała jako metaforę kruchości i nietrwałości młodości oraz piękna. Ta rzeźba przedstawia dwa bardzo realistyczne, duże brzuchy ułożone jeden na drugim, każdy o wysokości około pięciu stóp (1,5 m).',
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'Rzeźba przypomina kaskadę fałd, znacznie różniącą się od brzuchów w klasycznych rzeźbach.'
}, {
  name: 'Terakotowa Armia',
  artist: 'nieznanego',
  description: 'Terakotowa Armia to zbiór rzeźb z terakoty przedstawiających armię Qin Shi Huanga, pierwszego cesarza Chin. Armia składała się z ponad 8 000 żołnierzy, 130 wozów z 520 końmi oraz 150 koni kawaleryjskich.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 rzeźb z terakoty przedstawiających poważnych wojowników, każdy z unikalnym wyrazem twarzy i zbroją.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson była znana z pozyskiwania przedmiotów z odpadów Nowego Jorku, które później łączyła w monumentalne konstrukcje. W tej pracy wykorzystała różne części, takie jak noga łóżka, kij do żonglowania i fragment siedzenia, przybijając i klejąc je do pudełek, które odzwierciedlają wpływ geometrycznej abstrakcji kubizmu.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'Czarna matowa rzeźba, gdzie poszczególne elementy są początkowo nie do rozróżnienia.'
}, {
  name: 'Aureola',
  artist: 'Ranjani Shettar',
  description: 'Shettar łączy tradycję z nowoczesnością, naturę z przemysłem. Jej sztuka koncentruje się na relacji między człowiekiem a naturą. Jej prace opisywane są jako porywające zarówno w sensie abstrakcyjnym, jak i figuratywnym, nieważkie i jako „doskonała synteza nieoczywistych materiałów”.',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'Jasna rzeźba przypominająca drut, zamocowana na betonowej ścianie i opadająca na podłogę. Wydaje się lekka.'
}, {
  name: 'Hippos',
  artist: 'Ogród Zoologiczny w Taipei',
  description: 'Ogród Zoologiczny w Taipei zlecił stworzenie Placu Hipopotamów z zanurzoną w wodzie grupą bawiących się hipopotamów.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'Grupa rzeźb z brązu przedstawiająca hipopotamy wychodzące z chodnika, jakby pływały.'
}];
```

```css
button { display: block; margin-bottom: 10px; }
.Page > * {
  float: left;
  width: 50%;
  padding: 10px;
}
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img { width: 120px; height: 120px; }
```

</Sandpack>

<Solution>

Ten kod dodaje warunek zabezpieczający w obu obsługach zdarzeń i wyłącza przyciski, gdy jest to konieczne:

<Sandpack>

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  let hasPrev = index > 0;
  let hasNext = index < sculptureList.length - 1;

  function handlePrevClick() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button
        onClick={handlePrevClick}
        disabled={!hasPrev}
      >
        Poprzedni
      </button>
      <button
        onClick={handleNextClick}
        disabled={!hasNext}
      >
        Następny
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        autorstwa {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Ukryj' : 'Pokaż'} detale
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
```

```js src/data.js hidden
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Chociaż Colvin jest głównie znana z abstrakcyjnych tematów nawiązujących do symboli prekolumbijskich, ta gigantyczna rzeźba, hołd dla neurochirurgii, jest jednym z jej najbardziej rozpoznawalnych dzieł sztuki publicznej.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'Brązowy posąg dwóch skrzyżowanych rąk delikatnie trzymających ludzki mózg w opuszkach palców.'
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'Ten ogromny (75 stóp lub 23 m) srebrny kwiat znajduje się w Buenos Aires. Jest zaprojektowany w taki sposób, aby się poruszać, zamykając swoje płatki wieczorem lub podczas silnych wiatrów, a otwierając je rano.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'Gigantyczna metalowa rzeźba kwiatu z refleksyjnymi płatkami przypominającymi lustro i mocnymi pręcikami.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson był znany ze swojego zainteresowania równością, sprawiedliwością społeczną, a także istotnymi i duchownymi cechami ludzkości. Ta ogromna (7 stóp lub 2,13 m) rzeźba z brązu przedstawia to, co opisał jako "symboliczną czarną obecność nasyconą poczuciem uniwersalnej ludzkości".',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'Rzeźba przedstawiająca ludzką głowę wydaje się być zawsze obecna i poważna. Promieniuje spokojem i harmonią.'
}, {
  name: 'Moai',
  artist: 'nieznanego',
  description: 'Na Wyspie Wielkanocnej znajduje się 1000 moai, czyli monumentalnych posągów stworzonych przez wczesnych ludzi Rapa Nui, które niektórzy uważają za przedstawienia deifikowanych przodków.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Trzy monumentalne kamienne popiersia z głowami, które są nieproporcjonalnie duże, o smutnych twarzach.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'Nany to tryumfujące stworzenia, symbole kobiecości i macierzyństwa. Początkowo, Saint Phalle używała tkanin i znalezionych przedmiotów do tworzenia Nan, a później wprowadziła poliester, aby uzyskać bardziej żywy efekt.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'Duża mozaikowa rzeźba cudacznej, tańczącej kobiecej figury w kolorowym kostiumie, emanująca radością.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'Ta abstrakcyjna rzeźba z brązu jest częścią serii "The Family of Man" znajdującej się w Yorkshire Sculpture Park. Hepworth zdecydowała się nie tworzyć dosłownych reprezentacji świata, lecz opracowała abstrakcyjne formy inspirowane ludźmi i krajobrazami.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'Wysoka rzeźba składająca się z trzech elementów ułożonych jeden na drugim, przypominająca ludzką postać.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: 'Pochodzący z rodziny czterech pokoleń rzeźbiarzy w drewnie, prace Fakeye’a łączyły tradycyjne i współczesne motywy yoruba.',
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'Skrupulatna rzeźba w drewnie przedstawiająca wojownika z skoncentrowaną twarzą na koniu ozdobionym wzorami.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: 'Szapocznikow jest znana ze swoich rzeźb przedstawiających fragmenty ciała jako metaforę kruchości i nietrwałości młodości oraz piękna. Ta rzeźba przedstawia dwa bardzo realistyczne, duże brzuchy ułożone jeden na drugim, każdy o wysokości około pięciu stóp (1,5 m).',
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'Rzeźba przypomina kaskadę fałd, znacznie różniącą się od brzuchów w klasycznych rzeźbach.'
}, {
  name: 'Terakotowa Armia',
  artist: 'nieznanego',
  description: 'Terakotowa Armia to zbiór rzeźb z terakoty przedstawiających armię Qin Shi Huanga, pierwszego cesarza Chin. Armia składała się z ponad 8 000 żołnierzy, 130 wozów z 520 końmi oraz 150 koni kawaleryjskich.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 rzeźb z terakoty przedstawiających poważnych wojowników, każdy z unikalnym wyrazem twarzy i zbroją.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson była znana z pozyskiwania przedmiotów z odpadów Nowego Jorku, które później łączyła w monumentalne konstrukcje. W tej pracy wykorzystała różne części, takie jak noga łóżka, kij do żonglowania i fragment siedzenia, przybijając i klejąc je do pudełek, które odzwierciedlają wpływ geometrycznej abstrakcji kubizmu.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'Czarna matowa rzeźba, gdzie poszczególne elementy są początkowo nie do rozróżnienia.'
}, {
  name: 'Aureola',
  artist: 'Ranjani Shettar',
  description: 'Shettar łączy tradycję z nowoczesnością, naturę z przemysłem. Jej sztuka koncentruje się na relacji między człowiekiem a naturą. Jej prace opisywane są jako porywające zarówno w sensie abstrakcyjnym, jak i figuratywnym, nieważkie i jako „doskonała synteza nieoczywistych materiałów”.',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'Jasna rzeźba przypominająca drut, zamocowana na betonowej ścianie i opadająca na podłogę. Wydaje się lekka.'
}, {
  name: 'Hippos',
  artist: 'Ogród Zoologiczny w Taipei',
  description: 'Ogród Zoologiczny w Taipei zlecił stworzenie Placu Hipopotamów z zanurzoną w wodzie grupą bawiących się hipopotamów.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'Grupa rzeźb z brązu przedstawiająca hipopotamy wychodzące z chodnika, jakby pływały.'
}];
```

```css
button { display: block; margin-bottom: 10px; }
.Page > * {
  float: left;
  width: 50%;
  padding: 10px;
}
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img { width: 120px; height: 120px; }
```

</Sandpack>

Zauważ, jak `hasPrev` i `hasNext` są używane *zarówno* w zwróconym JSX jak i w obsługach zdarzeń! Ten przydatny wzorzec działa, ponieważ funkcje obsługi zdarzeń  ["zamykają się"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) nad wszystkimi zmiennymi deklarowanymi podczas renderowania.

</Solution>

#### Napraw zablokowane pola formularza {/*fix-stuck-form-inputs*/}

Kiedy wpisujesz dane w pola formularza, nic się nie pojawia. Wygląda to tak, jakby wartości wejściowe były „zablokowane” na pustych ciągach. `Wartość` pierwszego `<input>` jest ustawiona tak, aby zawsze pasowała do zmiennej `firstName` a  `wartość` drugiego`<input>` jest ustawiona tak, aby zawsze pasowała do zmiennej `lastName`. Tak powinno być. Oba pola mają obsługiwane zdarzenie `onChange`, które próbuje zaktualizować zmienne na podstawie najnowszego wejścia użytkownika (`e.target.value`). Jednak zmienne wydają się nie "pamiętać" swoich wartości między renderami. Napraw to, używając zamiast tego zmiennych stanu.

<Sandpack>

```js
export default function Form() {
  let firstName = '';
  let lastName = '';

  function handleFirstNameChange(e) {
    firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    lastName = e.target.value;
  }

  function handleReset() {
    firstName = '';
    lastName = '';
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        placeholder="Imię"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Nazwisko"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>Witaj, {firstName} {lastName}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
```

```css 
h1 { margin-top: 10px; }
```

</Sandpack>

<Solution>

Po pierwsze, zaimportuj `useState` z Reacta. Następnie zamień `firstName` i `lastName`na zmienne stanu zadeklarowane za pomocą `useState`. Na końcu zamień każde przypisanie `firstName = ...` na `setFirstName(...)`, oraz zrób to samo dla `lastName`. Nie zapomnij także zaktualizować `handleReset`  aby przycisk resetowania mógł działać.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  function handleReset() {
    setFirstName('');
    setLastName('');
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        placeholder="Imię"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Nazwisko"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>Witaj, {firstName} {lastName}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
```

```css 
h1 { margin-top: 10px; }
```

</Sandpack>

</Solution>

#### Napraw błąd {/*fix-a-crash*/}

Oto mały formularz, który ma pozwolić użytkownikowi zostawić opinię. Kiedy opinia zostanie wysłana, ma się wyświetlić wiadomość z podziękowaniem. Jednak aplikacja wywołuje błąd z komunikatem "Rendered fewer hooks than expected". Czy potrafisz znaleźć błąd i go naprawić?

<Hint>

Czy istnieją jakieś ograniczenia dotyczące _gdzie_ można wywoływać Hooki? Does this component break any rules? Czy ten komponent łamie jakieś zasady? Sprawdź, czy w kodzie znajdują się komentarze wyłączające sprawdzanie przez lintera — to tam często ukrywają się błędy!

</Hint>

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  if (isSent) {
    return <h1>Dziękuję!</h1>;
  } else {
    // eslint-disable-next-line
    const [message, setMessage] = useState('');
    return (
      <form onSubmit={e => {
        e.preventDefault();
        alert(`Wysyłanie: "${message}"`);
        setIsSent(true);
      }}>
        <textarea
          placeholder="Wiadomość"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Wyślij</button>
      </form>
    );
  }
}
```

</Sandpack>

<Solution>

Hooki mogą być wywoływane tylko na najwyższym poziomie funkcji komponentu. Tutaj pierwsza definicja `isSent` przestrzega tej zasady, ale definicja `message` jest zagnieżdżona w warunku.

Przenieś ją poza warunek, aby naprawić problem:

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');

  if (isSent) {
    return <h1>Dziękuję!</h1>;
  } else {
    return (
      <form onSubmit={e => {
        e.preventDefault();
        alert(`Wysyłanie: "${message}"`);
        setIsSent(true);
      }}>
        <textarea
          placeholder="Wiadomość"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Wyślij</button>
      </form>
    );
  }
}
```

</Sandpack>

Pamiętaj, że Hooki muszą być wywoływane bezwarunkowo i zawsze w tej samej kolejności!

Możesz również usunąć niepotrzebną gałąź `else`, aby zredukować zagnieżdżenie. Ważne jest jednak, aby wszystkie wywołania Hooków miały miejsce *przed* pierwszym `return`.

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');

  if (isSent) {
    return <h1>Dziękuję!</h1>;
  }

  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert(`Wysyłanie: "${message}"`);
      setIsSent(true);
    }}>
      <textarea
        placeholder="Wiadomość"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <br />
      <button type="submit">Wyślij</button>
    </form>
  );
}
```

</Sandpack>

Spróbuj przenieść drugie wywołanie  `useState` po warunku `if` i zauważ, jak to znowu powoduje błąd.

Jeśli Twój linter jest [skonfigurowany pod Reacta](/learn/editor-setup#linting), powinieneś zobaczyć błąd lintera, gdy popełnisz taki błąd. Jeśli nie widzisz błędu, gdy próbujesz uruchomić błędny kod lokalnie, musisz skonfigurować lintera dla swojego projektu.

</Solution>

#### Usuń niepotrzebny stan {/*remove-unnecessary-state*/}

Kiedy przycisk jest kliknięty, ten przykład powinien zapytać o imię użytkownika, a następnie wyświetlić alert z powitaniem. Próbowałeś użyć stanu do przechowywania imienia, ale z jakiegoś powodu zawsze wyświetla się "Witaj, !".

Aby naprawić ten kod, usuń niepotrzebną zmienną stanu. (Omówimy, [dlaczego to nie zadziałało](/learn/state-as-a-snapshot), później.)

Czy możesz wyjaśnić, dlaczego ta zmienna stanu była niepotrzebna?

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [name, setName] = useState('');

  function handleClick() {
    setName(prompt('Jak masz na imię?'));
    alert(`Witaj, ${name}!`);
  }

  return (
    <button onClick={handleClick}>
      Powitanie
    </button>
  );
}
```

</Sandpack>

<Solution>

Oto poprawiona wersja, która używa zwykłej zmiennej `name` zadeklarowanej w funkcji, która jej potrzebuje:

<Sandpack>

```js
export default function FeedbackForm() {
  function handleClick() {
    const name = prompt('Jak masz na imię?');
    alert(`Witaj, ${name}!`);
  }

  return (
    <button onClick={handleClick}>
      Powitanie
    </button>
  );
}
```

</Sandpack>

Zmienna stanu jest konieczna tylko wtedy, gdy musisz zachować informacje między kolejnymi renderami komponentu. W ramach pojedynczego obsługiwania zdarzenia wystarczy zwykła zmienna. Nie wprowadzaj zmiennych stanu, gdy zwykła zmienna działa dobrze.

</Solution>

</Challenges>
