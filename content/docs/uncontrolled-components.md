---
id: uncontrolled-components
title: Komponenty niekontrolowane
permalink: docs/uncontrolled-components.html
---

W większości przypadków zalecamy stosowanie [komponentów kontrolowanych](/docs/forms.html#controlled-components) do implementacji formularzy. W komponencie kontrolowanym, dane formularza są obsługiwane przez komponent reactowy. Alternatywą są komponenty niekontrolowane, w których dane formularza są obsługiwane przez sam DOM.

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

Ponieważ komponent niekontrolowany zachowuje źródło prawdy w DOM, czasami łatwiej jest zintegrować kod reactowy z kodem niereactowym, gdy używa się komponentów niekontrolowanych. Dzięki temu może pojawić się również nieco mniej kodu, jeśli chcesz podejść do tematu z grubsza. W przeciwnym razie zwykle powinieneś używać komponentów kontrolowanych.

Jeśli nadal nie jest jasne, jakiego rodzaju komponentu należy użyć w konkretnej sytuacji, pomocny może okazać się [ten artykuł o kontrolowanych i niekontrolowanych polach formularza](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/).

### Wartości domyślne {#default-values}

W reactowym cyklu życia renderowania, wartość atrybutu `value` przypisanego do elementów formularza zastąpi wartość w DOM. W przypadku komponentu niekontrolowanego często zależy nam, aby to React określił wartość początkową, ale by kolejne aktualizacje pozostały niekontrolowane. Aby obsłużyć ten przypadek, zamiast atrybutu `value` można podać atrybut `defaultValue`.

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

Podobnie, `<input type="checkbox">` i `<input type="radio">` obsługują `defaultChecked`, a `<select>` i `<textarea>` obsługują `defaultValue`.

## Znacznik `input` dla plików {#the-file-input-tag}

W HTML `<input type="file">` pozwala użytkownikowi wybrać jeden lub więcej plików z pamięci urządzenia, które mają zostać przesłane na serwer lub obsłużone przez JavaScript przez [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications).

```html
<input type="file" />
```

W Reakcie `<input type="file" />` jest zawsze komponentem niekontrolowanym, ponieważ jego wartość może ustawić tylko użytkownik - nie można jej ustawić programowo.

Do interakcji z plikami należy używać interfejsu File API. Poniższy przykład pokazuje, jak utworzyć [odwołanie do węzła DOM](/docs/refs-and-the-dom.html), aby uzyskać dostęp do plików za pomocą procedury obsługi wysłania formularza:

```javascript{5,9,18}
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Wybrany plik - ${
        this.fileInput.current.files[0].name
      }`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Prześlij plik:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Wyślij</button>
      </form>
    );
  }
}

ReactDOM.render(
  <FileInput />,
  document.getElementById('root')
);
```

[](codepen://uncontrolled-components/input-type-file)
