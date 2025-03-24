---
title: Instalacja
---

<Intro>

React został zaprojektowany z myślą o stopniowym wdrażaniu. Dzięki temu zawarte w nim rozwiązania można stosować wybiórczo w zależności od potrzeb. Nie ważne czy chcesz tylko pobawić się Reactem, dodać trochę życia swojej stronie HTML czy rozpocząć prace nad większą apką reaktową - ta sekcja jest dla ciebie.

</Intro>

<<<<<<< HEAD
<YouWillLearn isChapter={true}>

- [Jak dodać Reacta do strony HTML](/learn/add-react-to-a-website)
- [Jak wystartować nowy projekt reactowy](/learn/start-a-new-react-project)
- [Jak skonfigurować edytor kodu](/learn/editor-setup)
- [Jak zainstalować narzędzia deweloperskie dla Reacta](/learn/react-developer-tools)

</YouWillLearn>

## Wypróbuj Reacta {/*try-react*/}
=======
## Try React {/*try-react*/}
>>>>>>> f6d762cbbf958ca45bb8d1d011b31e5289e43a3d

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

W całej dokumentacji natkniesz się na wiele takich sandboxów. Poza samą dokumentacją, w sieci istnieje także wiele niezależnych sandboxów, które posiadają wsparcie dla Reacta, na przykład: [CodeSandbox](https://codesandbox.io/s/new), [Stackblitz](https://stackblitz.com/fork/react) czy [CodePen](https://codepen.io/pen?template=QWYVwWN).

<<<<<<< HEAD
### Wypróbuj Reacta lokalnie {/*try-react-locally*/}

Aby wypróbować Reacta lokalnie na własnym komputerze, [pobierz tę stronę HTML](https://gist.githubusercontent.com/gaearon/0275b1e1518599bbeafcde4722e79ed1/raw/db72dcbf3384ee1708c4a07d3be79860db04bff0/example.html). Następnie otwórz ją w wybranym edytorze kodu i w przeglądarce.

## Dodawaj Reacta do istniejącej strony {/*add-react-to-a-page*/}

Jeśli masz już stronę i chcesz ją jedynie wzbogacić o interaktywność, możesz [dodać Reacta za pomocą tagu `script`.](/learn/add-react-to-a-website)
=======
To try React locally on your computer, [download this HTML page.](https://gist.githubusercontent.com/gaearon/0275b1e1518599bbeafcde4722e79ed1/raw/db72dcbf3384ee1708c4a07d3be79860db04bff0/example.html) Open it in your editor and in your browser!

## Creating a React App {/*creating-a-react-app*/}

If you want to start a new React app, you can [create a React app](/learn/creating-a-react-app) using a recommended framework.

## Build a React App from Scratch {/*build-a-react-app-from-scratch*/}

If a framework is not a good fit for your project, you prefer to build your own framework, or you just want to learn the basics of a React app you can [build a React app from scratch](/learn/build-a-react-app-from-scratch).
>>>>>>> f6d762cbbf958ca45bb8d1d011b31e5289e43a3d

## Stwórz nowy projekt reactowy {/*start-a-react-project*/}

<<<<<<< HEAD
Jeśli chcesz [stworzyć nowy, niezależny projekt](/learn/start-a-new-react-project) z użyciem Reacta, możesz skonfigurować minimalny zestaw narzędzi dla przyjemnej pracy z kodem. Możesz także wystartować z pomocą frameworka, w którym wiele ważnych decyzji podjęto już za ciebie.
=======
If want to try using React in your existing app or a website, you can [add React to an existing project.](/learn/add-react-to-an-existing-project)


<Note>

#### Should I use Create React App? {/*should-i-use-create-react-app*/}

No. Create React App has been deprecated. For more information, see [Sunsetting Create React App](/blog/2025/02/14/sunsetting-create-react-app).

</Note>
>>>>>>> f6d762cbbf958ca45bb8d1d011b31e5289e43a3d

## Kolejne kroki {/*next-steps*/}

Przejdź do rozdziału pt. [Szybki start](/learn), aby zapoznać się z najważniejszymi pojęciami używanymi w codziennej pracy.
