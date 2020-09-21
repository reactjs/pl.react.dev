---
id: web-components
title: Komponenty sieciowe
permalink: docs/web-components.html
redirect_from:
  - "docs/webcomponents.html"
---

React i [komponenty sieciowe](https://developer.mozilla.org/pl/docs/Web/Web_Components) (ang. *Web Components*) zostały stworzone do rozwiązywania różnych problemów. Komponenty sieciowe zapewniają silną enkapsulację w celu wielokrotnego użytku, a React jest deklaratywną biblioteką stworzoną do synchronizacji danych z modelem DOM. Te dwa cele się dopełniają. Jako deweloper możesz wykorzystywać Reacta w swoich komponentach sieciowych lub wykorzystywać komponenty sieciowe w Reakcie.

Większość osób korzystających z Reacta nie używa komponentów sieciowych, ale ty możesz chcieć to zrobić, zwłaszcza jeśli używasz zewnętrznych komponentów UI napisanych z wykorzystaniem komponentów sieciowych.

## Używanie komponentów sieciowych w Reakcie {#using-web-components-in-react}

```javascript
class HelloMessage extends React.Component {
  render() {
    return <div>Witaj, <x-search>{this.props.name}</x-search>!</div>;
  }
}
```

> Uwaga:
>
> Komponenty sieciowe często udostępniają imperatywne API. Na przykład: komponent sieciowy `video` może udostępniać funkcje `play()` i `pause()`. Aby skorzystać z imperatywnego API komponentu sieciowego, możesz potrzebować użyć referencji (`ref`), aby nawiązać bezpośredni kontakt z węzłem drzewa DOM. Jeśli korzystasz z komponentów sieciowych innych osób, najlepszym rozwiązaniem będzie utworzenie reactowego komponentu służącego jako nakładka dla komponentu sieciowego.
>
> Zdarzenia emitowane przez komponent sieciowy mogą niewłaściwie propagować się przez reactowe drzewo renderowania.
> Aby obsłużyć te zdarzenia w komponencie reactowym, konieczne może być ręczne dodanie procedur obsługi zdarzeń.

Często mylonym aspektem komponentów sieciowych jest to, że korzystają z atrybutu "class", a nie "className".

```javascript
function BrickFlipbox() {
  return (
    <brick-flipbox class="demo">
      <div>front</div>
      <div>back</div>
    </brick-flipbox>
  );
}
```

## Używanie Reacta w komponentach sieciowych {#using-react-in-your-web-components}

```javascript
class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const name = this.getAttribute('name');
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
  }
}
customElements.define('x-search', XSearch);
```

> Uwaga:
>
> Ten kod **nie** zadziała, jeśli dokonujesz transformacji klas używając narzędzia Babel. Zobacz [dyskusję](https://github.com/w3c/webcomponents/issues/587) na ten temat, aby dowiedzieć się więcej.
> Aby rozwiązać ten problem, użyj [custom-elements-es5-adapter](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#custom-elements-es5-adapterjs) przed załadowaniem komponentów sieciowych.
