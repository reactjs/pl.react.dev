---
title: Unknown Prop Warning
---
<<<<<<< HEAD:content/warnings/unknown-prop.md
Ostrzeżenie o nieznanej właściwości (ang. *unknown prop*) pojawi się, gdy spróbujesz wyrenderować element DOM z właściwością, której React nie rozpoznaje jako poprawną dla DOM. Upewnij się, że twoje komponenty nie przekazują do elementów DOM żadnych własnych atrybutów.
=======

The unknown-prop warning will fire if you attempt to render a DOM element with a prop that is not recognized by React as a legal DOM attribute/property. You should ensure that your DOM elements do not have spurious props floating around.
>>>>>>> cdc9917863111daeddf9c3552f9adf49c245e425:src/content/warnings/unknown-prop.md

Istnieje kilka prawdopodobnych powodów pojawienia się tego ostrzeżenia:

<<<<<<< HEAD:content/warnings/unknown-prop.md
1. Używasz składni `{...this.props}` lub `cloneElement(element, this.props)`? Twój komponent przekazuje w ten sposób wszystkie swoje właściwości (ang. *props*) do elementu potomnego ([przykład](/docs/transferring-props.html)). Przy przekazywaniu właściwości w dół musisz upewnić się, że przez pomyłkę nie uwzględniasz właściwości, które miały trafić tylko do komponentu nadrzędnego.
=======
1. Are you using `{...props}` or `cloneElement(element, props)`? When copying props to a child component, you should ensure that you are not accidentally forwarding props that were intended only for the parent component. See common fixes for this problem below.
>>>>>>> cdc9917863111daeddf9c3552f9adf49c245e425:src/content/warnings/unknown-prop.md

2. Używasz niestandardowego atrybutu DOM na natywnym węźle drzewa DOM, na przykład, aby przekazać mu jakieś dane. Jeśli chcesz zapisać w elemencie DOM dane, użyj odpowiedniego atrybutu, jak opisano [na MDN](https://developer.mozilla.org/pl/docs/Learn/HTML/Howto/Use_data_attributes).

<<<<<<< HEAD:content/warnings/unknown-prop.md
3. React jeszcze nie rozpoznaje podanego przez ciebie atrybutu. Istnieje szansa, że zostanie to naprawione w przyszłych wersjach. Obecnie React usuwa wszystkie nieznane atrybuty, wobec czego nie zostaną one przekazane do renderowanego elementu DOM.

4. Używasz komponentu reactowego, pisząc jego nazwę małymi literami. React interpretuje taki zapis jako znacznik DOM, ponieważ [transformacja składni JSX w Reakcie rozpoznaje własne komponenty po wielkich literach](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

---

Aby to naprawić, złożone komponenty powinny "konsumować" wszelkie właściwości przeznaczone dla nich, a nie przeznaczone dla komponentów potomnych. Na przykład:
=======
3. React does not yet recognize the attribute you specified. This will likely be fixed in a future version of React. React will allow you to pass it without a warning if you write the attribute name lowercase.

4. You are using a React component without an upper case, for example `<myButton />`. React interprets it as a DOM tag because React JSX transform uses the upper vs. lower case convention to distinguish between user-defined components and DOM tags. For your own React components, use PascalCase. For example, write `<MyButton />` instead of `<myButton />`.

---

If you get this warning because you pass props like `{...props}`, your parent component needs to "consume" any prop that is intended for the parent component and not intended for the child component. Example:
>>>>>>> cdc9917863111daeddf9c3552f9adf49c245e425:src/content/warnings/unknown-prop.md

**Źle:** Do elementu `div` przekazywana jest nieznana właściwość `layout`.

```js{4,7}
function MyDiv(props) {
  if (props.layout === 'horizontal') {
    // ŹLE! Wiadomo, że właściwość "layout" nie jest obsługiwana przez <div>.
    return <div {...props} style={getHorizontalStyle()} />
  } else {
    // ŹLE! Wiadomo, że właściwość "layout" nie jest obsługiwana przez <div>.
    return <div {...props} style={getVerticalStyle()} />
  }
}
```

**Dobrze:** Za pomocą operatora rozszczepienia (ang. *spread operator*) możesz wyciągnąć z obiektu interesujące wartości, a resztę spakować do osobnej zmiennej.

```js{2}
function MyDiv(props) {
  const { layout, ...rest } = props
  if (layout === 'horizontal') {
    return <div {...rest} style={getHorizontalStyle()} />
  } else {
    return <div {...rest} style={getVerticalStyle()} />
  }
}
```

**Dobrze:** Możesz również przypisać właściwości do nowego obiektu i usunąć z niego użyte wartości. Pamiętaj jednak, aby nie usuwać niczego z pierwotnego obiektu `this.props` - jest on z założenia niezmienny (ang. *immutable*).

```js{3,4}
function MyDiv(props) {
  const divProps = Object.assign({}, props);
  delete divProps.layout;

  if (props.layout === 'horizontal') {
    return <div {...divProps} style={getHorizontalStyle()} />
  } else {
    return <div {...divProps} style={getVerticalStyle()} />
  }
}
```
