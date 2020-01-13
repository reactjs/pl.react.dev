---
id: react-without-jsx
title: React Without JSX
permalink: docs/react-without-jsx.html
---

JSX nie jest wymagany, aby móc używać Reacta. Korzystanie z Reacta bez JSX jest szczególnie wygodne, gdy nie chce się konfigurować kroku kompilacji w środowisku budowania.

Każdy element JSX jest jedynie wygodniejszym odpowiednikiem wywołania metody `React.createElement(component, props, ...children)`. Wszystko więc, co da się zrobić, korzystając z JSX, można również uzyskać za pomocą zwykłego JavaScriptu.

Na przykład, ten fragment kodu napisany z użyciem JSX:

```js
class Hello extends React.Component {
  render() {
    return <div>Witaj {this.props.toWhat}</div>;
  }
}

ReactDOM.render(
  <Hello toWhat="Świecie" />,
  document.getElementById('root')
);
```

może być skompilowany do tego kodu, który nie korzysta z JSX:

```js
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Witaj ${this.props.toWhat}`);
  }
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'Świecie'}, null),
  document.getElementById('root')
);
```

Jeśli jesteś ciekaw, w jaki sposób JSX jest konwertowany do JavaScriptu, możesz wypróbować [wersję online kompilatora Babel](babel://jsx-simple-example).

Komponent może być dostarczony jako ciąg znaków lub jako podklasa `React.Component` albo zwykła funkcja aby stworzyć komponent bezstanowy.

Aby nie musieć bez przerwy pisać `React.createElement`, warto zastosować poniższy wzorzec:

```js
const e = React.createElement;

ReactDOM.render(
  e('div', null, 'Witaj Świecie'),
  document.getElementById('root')
);
```

Jeśli używa się tej skróconej formy `React.createElement`, korzystanie z Reacta bez JSX może być równie wygodne.

Ewentualnie, można zapoznać się z projektami społeczności, takimi jak [`react-hyperscript`](https://github.com/mlmorg/react-hyperscript) i [`hyperscript-helpers`](https://github.com/ohanhi/hyperscript-helpers), które oferują bardziej zwięzłą składnię.

