---
title: Unknown Prop Warning
---

Ostrzeżenie o nieznanej właściwości (ang. *unknown prop*) pojawi się, gdy spróbujesz wyrenderować element DOM z właściwością, której React nie rozpoznaje jako poprawną dla DOM. Upewnij się, że twoje komponenty nie przekazują do elementów DOM żadnych własnych atrybutów.

Istnieje kilka prawdopodobnych powodów pojawienia się tego ostrzeżenia:

1. Używasz składni `{...this.props}` lub `cloneElement(element, props)`? Twój komponent przekazuje w ten sposób wszystkie swoje właściwości (ang. *props*) do elementu potomnego ([przykład](/docs/transferring-props.html)). Przy przekazywaniu właściwości w dół musisz upewnić się, że przez pomyłkę nie uwzględniasz właściwości, które miały trafić tylko do komponentu nadrzędnego.

2. Używasz niestandardowego atrybutu DOM na natywnym węźle drzewa DOM, na przykład, aby przekazać mu jakieś dane. Jeśli chcesz zapisać w elemencie DOM dane, użyj odpowiedniego atrybutu, jak opisano [na MDN](https://developer.mozilla.org/pl/docs/Learn/HTML/Howto/Use_data_attributes).

3. React jeszcze nie rozpoznaje podanego przez ciebie atrybutu. Istnieje szansa, że zostanie to naprawione w przyszłych wersjach. Obecnie React usuwa wszystkie nieznane atrybuty, wobec czego nie zostaną one przekazane do renderowanego elementu DOM.

4. Używasz komponentu reactowego, pisząc jego nazwę małymi literami. React interpretuje taki zapis jako znacznik DOM, ponieważ [transformacja składni JSX w Reakcie rozpoznaje własne komponenty po wielkich literach](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

---

Aby to naprawić, złożone komponenty powinny "konsumować" wszelkie właściwości przeznaczone dla nich, a nie przeznaczone dla komponentów potomnych. Na przykład:

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
