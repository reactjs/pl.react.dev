---
title: Narzędzia deweloperskie dla Reacta
---

<Intro>

Użyj narzędzi deweloperskich dla Reacta, aby zbadać [komponenty reactowe](/learn/your-first-component), zmienić ich [właściwości (_ang._ props)](/learn/passing-props-to-a-component) oraz [stan (_ang._ state)](/learn/state-a-components-memory), a także zidentyfikować problemy wydajnościowe w aplikacji.

</Intro>

<YouWillLearn>

* Jak zainstalować narzędzia deweloperskie dla Reacta

</YouWillLearn>

## Rozszerzenie dla przeglądarki {/*browser-extension*/}

Najprostszym sposobem na debugowanie stron internetowych stworzonych w Reakcie jest zainstalowanie rozszerzenia dla przeglądarki o nazwie React Developer Tools (_pol._ narzędzia deweloperskie dla Reacta). Jest ono dostępne dla kilku popularnych przeglądarek:

- [Zainstaluj rozszerzenie dla **Chrome'a**](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [Zainstaluj rozszerzenie dla **Firefoksa**](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
- [Zainstaluj rozszerzenie dla **Edge'a**](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil)

Teraz, gdy wejdziesz na stronę **zbudowaną w Reakcie**, zobaczysz dodatkowe zakładki o nazwie _Components_ oraz _Profiler_.

![Narzędzia deweloperskie dla Reacta w przeglądarce](/images/docs/react-devtools-extension.png)

### Safari i inne przeglądarki {/*safari-and-other-browsers*/}

Jeśli używasz innej przeglądarki (na przykład Safari), zainstaluj pakiet npm-owy o nazwie [`react-devtools`](https://www.npmjs.com/package/react-devtools):

```bash
# Yarn
yarn global add react-devtools

# Npm
npm install -g react-devtools
```

Następnie otwórz narzędzia deweloperskie w terminalu:

```bash
react-devtools
```

Później podłącz się do swojej strony internetowej dodając poniższy tag `<script>` na początku sekcji `<head>`:

```html {3}
<html>
  <head>
    <script src="http://localhost:8097"></script>
  </head>
</html>
```

Na koniec odśwież stronę w przeglądarce, aby podejrzeć ją w narzędziach deweloperskich.

![Narzędzia deweloperskie dla Reacta - wersja samodzielna](/images/docs/react-devtools-standalone.png)

<<<<<<< HEAD
## Aplikacje mobilne (React Native) {/*mobile-react-native*/}

Narzędzi deweloperskich dla Reacta można z powodzeniem używać również do podglądania aplikacji napisanych w [React Native](https://reactnative.dev/).

Najprościej jest zainstalować je globalnie:

```bash
# Yarn
yarn global add react-devtools
=======
## Mobile (React Native) {/*mobile-react-native*/}

To inspect apps built with [React Native](https://reactnative.dev/), you can use [React Native DevTools](https://reactnative.dev/docs/debugging/react-native-devtools), the built-in debugger that deeply integrates React Developer Tools. All features work identically to the browser extension, including native element highlighting and selection.
>>>>>>> 3b02f828ff2a4f9d2846f077e442b8a405e2eb04

[Learn more about debugging in React Native.](https://reactnative.dev/docs/debugging)

<<<<<<< HEAD
Teraz uruchom narzędzia deweloperskie z terminala.

```bash
react-devtools
```

Powinno nastąpić połączenie do lokalnie działającej aplikacji.

> Jeśli połączenie nie nastąpi w ciągu następnych kilku sekund, spróbuj załadować aplikację ponownie.

[Dowiedz się więcej o debuggowaniu w React Native.](https://reactnative.dev/docs/debugging)
=======
> For versions of React Native earlier than 0.76, please use the standalone build of React DevTools by following the [Safari and other browsers](#safari-and-other-browsers) guide above.
>>>>>>> 3b02f828ff2a4f9d2846f077e442b8a405e2eb04
