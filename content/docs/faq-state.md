---
id: faq-state
title: Stan komponentu
permalink: docs/faq-state.html
layout: docs
category: FAQ
---

### Co robi `setState`? {#what-does-setstate-do}

`setState()` tworzy plan aktualizacji obiektu `state` w komponencie. Gdy stan ulega zmianie, komponent reaguje poprzez ponowne renderowanie.

### Jaka jest różnica między `state` a `props`? {#what-is-the-difference-between-state-and-props}

Właściwości [`props`](/docs/components-and-props.html) (skrót od *properties*) i stan [`state`](/docs/state-and-lifecycle.html) są zwykłymi obiektami javascriptowymi. Przechowują informacje, które wpływają na wynik renderowania komponentu, jednak jest między nimi istotna różnica: właściwości `props` są przekazywane *do* komponentu (podobnie jak argumenty do funkcji), podczas gdy stan `state` jest zarządzany *wewnątrz* komponentu (podobnie jak zmienna w ciele funkcji).

Oto kilka sprawdzonych źródeł, z których dowiesz się więcej o tym, kiedy używać właściwości `props`, a kiedy stanu `state`:
* [Właściwości kontra stan](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)
* [ReactJS: Właściwości kontra stan](https://lucybain.com/blog/2016/react-state-vs-pros/)

### Dlaczego `setState` błędnie ustawia wartość? {#why-is-setstate-giving-me-the-wrong-value}

W Reakcie zarówno `this.props`, jak i `this.state` reprezentują *wyrenderowane* wartości, tzn. te, które aktualnie widzimy na ekranie.

Wywołania funkcji `setState` są asynchroniczne - nie spodziewaj się, że `this.state` będzie odzwierciedlać aktualny stan natychmiast po wywołaniu `setState`. Jeśli chcesz obliczyć nowe wartości na podstawie starych, zamiast obiektu przekaż funkcję aktualizującą (więcej o tym poniżej).

Przykład kodu, który *nie* zachowa się tak, jak byśmy się spodziewali:

```jsx
incrementCount() {
  // Uwaga: To *nie* zadziała tak, jak myślisz.
  this.setState({count: this.state.count + 1});
}

handleSomething() {
  // Załóżmy, że `this.state.count` startuje z wartością 0.
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();
  // Kiedy React ponownie wyrenderuje ten komponent, wartość `this.state.count` będzie 1, a nie 3.

  // Dzieje się tak dlatego, że powyższa funkcja `incrementCount()` odczytuje wartość z `this.state.count`,
  // jednak React nie aktualizuje wartości `this.state.count`, dopóki nie nastąpi ponowne wyrenderowanie.
  // Dlatego `incrementCount()` za każdym razem odczyta `this.state.count` jako 0, a następnie zaplanuje zmianę na 1.

  // Jak sobie z tym poradzić? Czytaj dalej!
}
```

Poniżej znajduje się rozwiązanie tego problemu.

### Jak aktualizować stan wartościami, które zależą od aktualnego stanu? {#how-do-i-update-state-with-values-that-depend-on-the-current-state}

Do `setState` zamiast obiektu przekaż funkcję, aby upewnić się, że do obliczeń użyta zostanie najbardziej aktualna wersja stanu (patrz niżej). 

### Czym różni się przekazanie do `setState` obiektu od przekazania funkcji? {#what-is-the-difference-between-passing-an-object-or-a-function-in-setstate}

Przekazana funkcja aktualizująca ma dostęp do aktualnej wersji stanu. Jako że wywołania `setState` są grupowane, ten sposób pozwoli ci na stworzenie sekwencji aktualizacji, która zamiast powodować konflikty, będzie operowała na kolejnych aktualnych wersjach stanu:

```jsx
incrementCount() {
  this.setState((state) => {
    // Ważne: zamiast z `this.state` odczytuj wartość z argumentu `state`.
    return {count: state.count + 1}
  });
}

handleSomething() {
  // Załóżmy, że `this.state.count` startuje z wartością 0.
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();

  // Jeśli sprawdzisz teraz wartość `this.state.count`, nadal będzie równa 0.
  // Jednak gdy React ponownie wyrenderuje komponent, zmieni się ona na 3.
}
```

[Dowiedz się więcej na temat funkcji `setState`.](/docs/react-component.html#setstate)

### Kiedy `setState` działa asynchronicznie? {#when-is-setstate-asynchronous}

Obecnie `setState` działa asynchronicznie wewnątrz procedur obsługi zdarzeń.

Dzięki temu, na przykład, jeśli zarówno komponent-rodzic, jak i komponent-dziecko wywołają `setState` podczas zdarzenia kliknięcia, komponent-dziecko nie zostanie ponownie wyrenderowany dwukrotnie. Zamiast tego React uruchomi wszystkie te aktualizacje stanu na koniec przeglądarkowego zdarzenia. W większych aplikacjach korzystnie wpływa to na wydajność.

Jest to szczegół implementacyjny i staraj się nie polegać na nim bezpośrednio. W przyszłych wersjach React będzie domyślnie grupował aktualizacje w większej liczbie przypadków.

### Dlaczego React nie aktualizuje `this.state` synchronicznie? {#why-doesnt-react-update-thisstate-synchronously}

Jak wyjaśniliśmy w poprzedniej sekcji, React celowo "czeka", aż wszystkie komponenty wywołają `setState()` w swoich procedurach obsługi zdarzeń, zanim zacznie ponownie renderować drzewo komponentów. Dzięki temu unikamy niepotrzebnych ponownych renderowań, co korzystnie wpływa na wydajność aplikacji.

Mimo wszystko może dziwić cię, dlaczego React tak po prostu nie aktualizuje `this.state` natychmiastowo, bez ponownego renderowania.

Są ku temu dwa powody:

* Skutkowałoby to przerwaniem spójności między właściwościami a stanem, powodując bardzo trudne w zlokalizowaniu błędy.
* Uniemożliwiłoby to nam zaimplementowanie opracowywanych przez nas nowych funkcjonalności.

Ten [komentarz na GitHubie](https://github.com/facebook/react/issues/11527#issuecomment-360199710) dużo bardziej zagłębia się w konkretne przykłady.

### Czy powinno się używać bibliotek zarządzających stanem, jak Redux czy MobX? {#should-i-use-a-state-management-library-like-redux-or-mobx}

[Być może.](https://redux.js.org/faq/general#when-should-i-use-redux)

Dobrze jest jednak najpierw dobrze poznać Reacta, zanim zacznie się dodawać kolejne biblioteki do zestawu. W samym tylko Reakcie można napisać dość złożone aplikacje.
