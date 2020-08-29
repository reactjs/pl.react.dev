---
id: faq-styling
title: Style i CSS
permalink: docs/faq-styling.html
layout: docs
category: FAQ
---

### Jak mogę dodać klasy CSS do komponentów? {#how-do-i-add-css-classes-to-components}

Przekaż ciąg znaków używając atrybutu `className`:

```jsx
render() {
  return <span className="menu navigation-menu">Menu</span>
}
```

Klasy CSS mogą być zależne od właściwości i stanu komponentów:

```jsx
render() {
  let className = 'menu';
  if (this.props.isActive) {
    className += ' menu-active';
  }
  return <span className={className}>Menu</span>
}
```

> Porada:
>
> Jeśli bardzo często piszesz kod tego typu, pakiet [classnames](https://www.npmjs.com/package/classnames#usage-with-reactjs) może ci pomóc uprościć swój kod.

### Czy mogę użyć stylów wewnątrzliniowych? {#can-i-use-inline-styles}

Tak, zobacz [ten artykuł](/docs/dom-elements.html#style), aby dowiedzieć się więcej.

### Czy style wewnątrzliniowe są złe? {#are-inline-styles-bad}

Klasy CSS są generalnie bardziej wydajne niż style wewnątrzliniowe.

### Czym jest w CSS-w-JS? {#what-is-css-in-js}

Termin "CSS-w-JS" odnosi do wzorca, w którym CSS jest zapisywany razem z kodem JavaScript, a nie w osobnych plikach.

_Pamiętaj, że ta funkcjonalność nie stanowi części Reacta, tylko dostarczana jest przez biblioteki stron trzecich._ React nie ma opinii na temat sposobu definiowania stylów; jeśli masz wątpliwości, dobrym punktem wyjścia może być definiowanie stylów w osobnym pliku `*.css` i odnoszenie się do nich używając atrybutu [`className`](/docs/dom-elements.html#classname).

### Czy mogę robić animacje w Reakcie? {#can-i-do-animations-in-react}

React może być wykorzystywany do napędzania animacji. Przykłady znajdziesz na stronach [React Transition Group](https://reactcommunity.org/react-transition-group/) i [React Motion](https://github.com/chenglou/react-motion) lub [React Spring](https://github.com/react-spring/react-spring).
