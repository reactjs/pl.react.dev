---
id: react-without-jsx
title: React bez JSX
permalink: docs/react-without-jsx.html
---

JSX nie jest wymagany do korzystania z Reacta. Korzystanie z Reacta bez JSX jest szczególnie wygodne, gdy nie chce się konfigurować kroku kompilacji w środowisku budowania.

Każdy element JSX jest jedynie wygodniejszym odpowiednikiem wywołania metody `React.createElement(component, props, ...children)`. Wszystko więc, co da się zrobić korzystając z JSX, można również uzyskać za pomocą zwykłego JavaScriptu.

Na przykład, ten fragment kodu napisany z użyciem JSX:

```js
class Hello extends React.Component {
  render() {
    return <div>Witaj, {this.props.toWhat}</div>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Hello toWhat="Świecie" />);
```

może być skompilowany do tego kodu, który nie korzysta z JSX:

```js
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Witaj, ${this.props.toWhat}`);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Hello, {toWhat: 'Świecie'}, null));
```

Jeśli chcesz zobaczyć więcej przykładów konwersji składni JSX do kodu javascriptowego, wypróbuj [wersję online kompilatora Babel](babel://jsx-simple-example).

Komponent może być ciągiem znaków, podklasą `React.Component` albo zwykłą funkcją.

Aby uniknąć ciągłego pisania `React.createElement`, warto zastosować poniższy wzorzec:

```js
const e = React.createElement;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e('div', null, 'Witaj, Świecie'));
```

Jeśli używa się tej skróconej formy `React.createElement`, korzystanie z Reacta bez JSX może być równie wygodne.

Ewentualnie można zapoznać się z projektami społeczności, takimi jak [`react-hyperscript`](https://github.com/mlmorg/react-hyperscript) czy [`hyperscript-helpers`](https://github.com/ohanhi/hyperscript-helpers), które oferują bardziej zwięzłą składnię.
