---
title: Instalacja
---

<Intro>

React został zaprojektowany z myślą o stopniowym wdrażaniu. Dzięki temu zawarte w nim rozwiązania można stosować wybiórczo w zależności od potrzeb. Nie ważne czy chcesz tylko pobawić się Reactem, dodać trochę życia swojej stronie HTML czy rozpocząć prace nad większą apką reaktową - ta sekcja jest dla ciebie.

</Intro>

<YouWillLearn isChapter={true}>

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

Możesz edytować kod bezpośrednio lub otworzyć go w nowej zakładce, klikając na przycisk "Forkuj" w prawym górnym rogu.

<<<<<<< HEAD:beta/src/pages/learn/installation.md
W całej dokumentacji natkniesz się na wiele takich sandboxów. Poza samą dokumentacją, w sieci istnieje także wiele niezależnych sandboxów, które posiadają wsparcie dla Reacta, na przykład: [CodeSandbox](https://codesandbox.io/s/new), [Stackblitz](https://stackblitz.com/fork/react) czy [CodePen](https://codepen.io/pen?&editors=0010&layout=left&prefill_data_id=3f4569d1-1b11-4bce-bd46-89090eed5ddb).
=======
Most pages in the React documentation contain sandboxes like this. Outside of the React documentation, there are many online sandboxes that support React: for example, [CodeSandbox](https://codesandbox.io/s/new), [StackBlitz](https://stackblitz.com/fork/react), or [CodePen.](https://codepen.io/pen?&editors=0010&layout=left&prefill_data_id=3f4569d1-1b11-4bce-bd46-89090eed5ddb)
>>>>>>> 841d3d1b75491ce153a53d1887ab020458090bbd:beta/src/content/learn/installation.md

### Wypróbuj Reacta lokalnie {/*try-react-locally*/}

<<<<<<< HEAD:beta/src/pages/learn/installation.md
Aby wypróbować Reacta lokalnie, na własnym komputerze, [pobierz tę stronę HTML](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html). Następnie otwórz ją w wybranym edytorze kodu i w przeglądarce.
=======
To try React locally on your computer, [download this HTML page.](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html) Open it in your editor and in your browser!
>>>>>>> 841d3d1b75491ce153a53d1887ab020458090bbd:beta/src/content/learn/installation.md

## Dodawaj Reacta do istniejącej strony {/*add-react-to-a-page*/}

Jeśli masz już stronę i chcesz ją jedynie wzbogacić o interaktywność, możesz [dodać Reacta za pomocą tagu `script`.](/learn/add-react-to-a-website)

## Stwórz nowy projekt reactowy {/*start-a-react-project*/}

Jeśli chcesz [stworzyć nowy, niezależny projekt](/learn/start-a-new-react-project) z użyciem Reacta, możesz skonfigurować minimalny zestaw narzędzi dla przyjemnej pracy z kodem. Możesz także wystartować z pomocą frameworka, w którym wiele ważnych decyzji podjęto już za ciebie.

## Kolejne kroki {/*next-steps*/}

Przejdź do rozdziału pt. [Szybki start](/learn), aby zapoznać się z najważniejszymi pojęciami używanymi w codziennej pracy.
