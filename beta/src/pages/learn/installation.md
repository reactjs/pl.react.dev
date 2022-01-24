---
title: Instalacja
---

<Intro>

React został zaprojektowany z myślą o stopniowym wdrażaniu. Dzięki temu zawarte w nim rozwiązania można stosować wybiórczo w zależności od potrzeb. Nie ważne czy chcesz tylko pobawić się Reactem, dodać trochę życia swojej stronie HTML czy rozpocząć prace nad większą apką reaktową - ta sekcja jest dla ciebie.

</Intro>

<YouWillLearn>

- [Jak dodać Reacta do strony HTML](/learn/add-react-to-a-website)
- [Jak wystartować nowy projekt reactowy](/learn/start-a-new-react-project)
- [Jak skonfigurować edytor kodu](/learn/editor-setup)
- [Jak zainstalować narzędzia deweloperskie dla Reacta](/learn/react-developer-tools)

</YouWillLearn>

## Wypróbuj Reacta {/*try-react*/}

Żeby pobawić się Reactem wcale nie trzeba niczego instalować. Możesz, na przykład, zmienić kod w poniższym sandboxie.

<Sandpack>

```js
function Greeting({name}) {
  return <h1>Witaj, {name}</h1>;
}

export default function App() {
  return <Greeting name="świecie" />;
}
```

</Sandpack>

W całej dokumentacji natkniesz się na wiele takich sandboxów. Używamy ich, aby pomóc ci zapoznać się z działaniem Reacta i zdecydować, czy jest on dla ciebie odpowiedni. Poza samą dokumentacją istnieje wiele niezależnych sandboxów, które posiadają wsparcie dla Reacta, na przykład: [CodeSandbox](https://codesandbox.io/s/new), [Stackblitz](https://stackblitz.com/fork/react) czy [CodePen](https://codepen.io/pen/?template=wvdqJJm).

### Wypróbuj Reacta lokalnie {/*try-react-locally*/}

Aby wypróbować Reacta lokalnie, na własnym komputerze, [pobierz tę stronę HTML](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html). Następnie otwórz ją w wybranym edytorze kodu i w przeglądarce.

## Dodawaj Reacta do istniejącej strony {/*add-react-to-a-page*/}

Jeśli masz już stronę i chcesz ją jedynie wzbogacić o interaktywność, możesz [dodać Reacta za pomocą tagu `script`.](/learn/add-react-to-a-website)

## Stwórz nowy projekt reactowy {/*start-a-react-project*/}

Jeśli chcesz [stworzyć nowy, niezależny projekt](/learn/start-a-new-react-project) z użyciem Reacta, możesz skonfigurować minimalny zestaw narzędzi dla przyjemnej pracy z kodem. Możesz także wystartować z pomocą frameworka, w którym wiele ważnych decyzji podjęto już za ciebie.

## Kolejne kroki {/*next-steps*/}

To, gdzie najlepiej zacząć, zależy od sposobu, w jaki lubisz się uczyć i co chcesz osiągnąć! Możesz, na przykład, przeczytać rozdział pt. [Myślenie reactowe](/learn/thinking-in-react) - nasz samouczek wprowadzający. Albo przeskoczyć od razu do rozdziału pt. [Opisywanie UI](/learn/describing-the-ui), by pobawić się wieloma przykładowymi aplikacjami i nauczyć się zagadnień krok po kroku. Każdy sposób jest dobry, by zgłębić tajniki Reacta!
