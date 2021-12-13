<<<<<<< HEAD
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

## Wypróbuj Reacta {/_try-react_/}

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

### Wypróbuj Reacta lokalnie {/_try-react-locally_/}

Aby wypróbować Reacta lokalnie, na własnym komputerze, [pobierz tę stronę HTML](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html). Następnie otwórz ją w wybranym edytorze kodu i w przeglądarce.

## Dodawaj Reacta do istniejącej strony {/_add-react-to-a-page_/}

Jeśli masz już stronę i chcesz ją jedynie wzbogacić o interaktywność, możesz [dodać Reacta za pomocą tagu `script`.](/learn/add-react-to-a-website)

## Stwórz nowy projekt reactowy {/_start-a-react-project_/}

Jeśli chcesz [stworzyć nowy, niezależny projekt](/learn/start-a-new-react-project) z użyciem Reacta, możesz skonfigurować minimalny zestaw narzędzi dla przyjemnej pracy z kodem. Możesz także wystartować z pomocą frameworka, w którym wiele ważnych decyzji podjęto już za ciebie.

## Kolejne kroki {/_next-steps_/}

To, gdzie najlepiej zacząć, zależy od sposobu, w jaki lubisz się uczyć i co chcesz osiągnąć! Możesz, na przykład, przeczytać rozdział pt. [Myślenie reactowe](/learn/thinking-in-react) - nasz samouczek wprowadzający. Albo przeskoczyć od razu do rozdziału pt. [Opisywanie UI](/learn/describing-the-ui), by pobawić się wieloma przykładowymi aplikacjami i nauczyć się zagadnień krok po kroku. Każdy sposób jest dobry, by zgłębić tajniki Reacta!
=======
---
title: Installation
---

<Intro>

React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you want to get a taste of React, add some interactivity to an HTML page, or start a complex React-powered app, this section will help you get started.

</Intro>

<YouWillLearn>

* [How to add React to an HTML page](/learn/add-react-to-a-website)
* [How to start a standalone React project](/learn/start-a-new-react-project)
* [How to set up your editor](/learn/editor-setup)
* [How to install React Developer Tools](/learn/react-developer-tools)

</YouWillLearn>

## Try React {/*try-react*/}

You don't need to install anything to play with React. Try editing this sandbox!

<Sandpack>

```js
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

export default function App() {
  return <Greeting name="world" />
}
```

</Sandpack>

We use sandboxes throughout these docs as teaching aids. Sandboxes can help familiarize you with how React works and help you decide if React is right for you. Outside of the React documentation, there are many online sandboxes that support React: for example, [CodeSandbox](https://codesandbox.io/s/new), [Stackblitz](https://stackblitz.com/fork/react), or [CodePen](
https://codepen.io/pen/?template=wvdqJJm).

### Try React locally {/*try-react-locally*/}

To try React locally on your computer, [download this HTML page](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html). Open it in your editor and in your browser!

## Add React to a page {/*add-react-to-a-page*/}

If you're working with an existing site and just need to add a little bit of React, you can [add React with a script tag.](/learn/add-react-to-a-website)

## Start a React project {/*start-a-react-project*/}

If you're ready to [start a standalone project](/learn/start-a-new-react-project) with React, you can set up a minimal toolchain for a pleasant developer experience. You can also start with a framework that makes a lot of decisions for you out of the box.

## Next steps {/*next-steps*/}

Where you start depends on how you like to learn, what you need to accomplish, and where you want to go next! Why not read [Thinking in React](/learn/thinking-in-react)--our introductory tutorial? Or you can jump to [Describing the UI](/learn/describing-the-ui) to play with more examples and learn each topic step by step. There is no wrong way to learn React!
>>>>>>> 014f4890dc30a3946c63f83b06883241ddc9bc75
