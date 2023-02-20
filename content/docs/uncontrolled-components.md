---
id: uncontrolled-components
title: Komponenty niekontrolowane
permalink: docs/uncontrolled-components.html
---

<<<<<<< HEAD
W większości przypadków zalecamy stosowanie [komponentów kontrolowanych](/docs/forms.html#controlled-components) do implementacji formularzy. W komponencie kontrolowanym, dane formularza są obsługiwane przez komponent reactowy. Alternatywą są komponenty niekontrolowane, w których dane formularza są obsługiwane przez sam DOM.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [`<input>`](https://beta.reactjs.org/reference/react-dom/components/input)
> - [`<select>`](https://beta.reactjs.org/reference/react-dom/components/select)
> - [`<textarea>`](https://beta.reactjs.org/reference/react-dom/components/textarea)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

In most cases, we recommend using [controlled components](/docs/forms.html#controlled-components) to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.
>>>>>>> 63c77695a95902595b6c2cc084a5c3650b15210a

Aby stworzyć komponent niekontrolowany, zamiast pisać funkcję obsługującą każdą zmianę stanu, możesz [użyć właściwości ref](/docs/refs-and-the-dom.html), aby uzyskać wartości formularza z DOM.

Na przykład, ten kod akceptuje pojedynczą nazwę w komponencie niekontrolowanym:

```javascript{5,9,18}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('Podano następujące imię: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Imię:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Wyślij" />
      </form>
    );
  }
}
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/WooRWa?editors=0010)

Ponieważ komponent niekontrolowany zachowuje źródło prawdy w DOM, czasami łatwiej jest zintegrować kod reactowy z kodem niereactowym, gdy używa się komponentów niekontrolowanych. Użycie komponentów niekontrolowanych pozwala zaimplementować formularz "na szybko" dzięki mniejszej ilości kodu. Zwykle jednak powinno używać się komponentów kontrolowanych.

Jeśli nadal nie jest jasne, jakiego rodzaju komponentu należy użyć w konkretnej sytuacji, pomocny może okazać się [ten artykuł o kontrolowanych i niekontrolowanych polach formularza](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/).

### Wartości domyślne {#default-values}

W reactowym cyklu życia renderowania, wartość atrybutu `value` przypisanego do elementów formularza zastąpi wartość w DOM. W przypadku komponentu niekontrolowanego często zależy nam, aby to React określił wartość początkową, ale by kolejne aktualizacje pozostały niekontrolowane. Aby obsłużyć ten przypadek, zamiast atrybutu `value` można podać atrybut `defaultValue`. Warto jednak pamiętać, że zmiana wartości `defaultValue` po tym, jak komponent zostanie już zamontowany, nie będzie miała wpływu na to, co trafi do DOM.

```javascript{7}
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Imię:
        <input
          defaultValue="Bob"
          type="text"
          ref={this.input} />
      </label>
      <input type="submit" value="Wyślij" />
    </form>
  );
}
```

Podobnie `<input type="checkbox">` i `<input type="radio">` obsługują atrybut `defaultChecked`, a `<select>` i `<textarea>` obsługują `defaultValue`.

## Znacznik `input` dla plików {#the-file-input-tag}

W HTML-u `<input type="file">` pozwala użytkownikowi wybrać z pamięci urządzenia jeden lub więcej plików, które mają zostać przesłane na serwer lub obsłużone przez JavaScript za pomocą [interfejsu File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications).

```html
<input type="file" />
```

W Reakcie `<input type="file" />` jest zawsze komponentem niekontrolowanym, ponieważ jego wartość może ustawić tylko użytkownik - nie można jej ustawić programowo.

Do interakcji z plikami należy używać interfejsu File API. Poniższy przykład pokazuje, jak utworzyć [odwołanie do węzła DOM](/docs/refs-and-the-dom.html), aby uzyskać dostęp do plików za pomocą procedury obsługi wysłania formularza:

`embed:uncontrolled-components/input-type-file.js`

[](codepen://uncontrolled-components/input-type-file)
