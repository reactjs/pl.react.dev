---
title: Konfiguracja edytora
---

<Intro>

Prawidłowo skonfigurowany edytor może sprawić, że kod będzie łatwiejszy w czytaniu i szybszy w pisaniu. Może także pomóc wyłapać błędy w trakcie pisania! Jeśli to twój pierwszy raz z konfiguracją edytora lub jeśli szukasz wskazówek w usprawnieniu pracy z twoim obecnym, ten rozdział jest dla ciebie.

</Intro>

## Twój edytor {/*your-editor*/}

[VS Code](https://code.visualstudio.com/) jest obecnie jednym z najbardziej popularnych edytorów. Posiada ogromną bazę rozszerzeń i doskonale integruje się z popularnymi usługami, jak np. GitHub. Większość z funkcjonalności wymienionych poniżej można także dodać do VS Code w formie rozszerzeń, co sprawia, że jest bardzo dobrze konfigurowalny!

Społeczność Reacta używa także:

- [WebStorm](https://www.jetbrains.com/webstorm/) — zintegrowane środowisko deweloperskie zaprojektowane specjalnie do pracy z JavaScriptem.
- [Sublime Text](https://www.sublimetext.com/) — posiada wbudowane wsparcie dla JSX oraz TypeScriptu, [podświetlanie składni](https://stackoverflow.com/a/70960574/458193) i autouzupełnianie.
- [Vim](https://www.vim.org/) — elastyczny edytor tekstu stworzony do efektywnego pisania i modyfikowania dowolnego tekstu. W większości systemów UNIX-owych oraz w Apple OS X występuje pod nazwą "vi".

## Zalecane funkcje edytora tekstu {/*recommended-text-editor-features*/}

Niektóre edytory mają te funkcje wbudowane, inne wymagają instalowania rozszerzeń. Dla pewności sprawdź, jakie wsparcie dla nich ma twój edytor!

### Linting {/*linting*/}

Lintery kodu znajdują problemy w kodzie podczas jego pisania i pomagają je zawczasu naprawić. Popularnym, open-sourcowym linterem dla JavaScriptu jest [ESLint](https://eslint.org/).

- [Zainstaluj ESLinta z konfiguracją zalecaną dla Reacta](https://www.npmjs.com/package/eslint-config-react-app) (upewnij się, że masz [zainstalowany Node!](https://nodejs.org/en/download/current/))
- [Zintegruj ESLint z VS Code za pomocą oficjalnego rozszerzenia](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Formatowanie {/*formatting*/}

Ostatnia rzecz, jaka powinna się wydarzyć po udostępnieniu twojego kodu współtwórcom projektu, jest dyskusja pt. [tabulatory vs spacje](https://www.google.com/search?q=tabulatory+vs+spacje)! Na szczęście jest [Prettier](https://prettier.io/), który posprząta w twoim kodzie, formatując go według ustalonych reguł. Uruchom Prettiera, a wszystkie tabulatory w kodzie zamienią się na spacje; wszelkie wcięcia, cudzysłowy i apostrofy itp. również zostaną podmienione na podstawie ustawień. Idealnie by było, gdyby Prettier był uruchamiany przy każdym zapisaniu pliku, automatycznie aplikując te reguły za ciebie.

Aby zainstalować [rozszerzenie Prettier dla VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), musisz:

1. Uruchomić VS Code
2. Użyć komendy szybkiego otwarcia (naciśnij `CTRL/CMD + P`)
3. Wkleić w pole `ext install esbenp.prettier-vscode`
4. Nacisnąć Enter

#### Formatowanie podczas zapisu {/*formatting-on-save*/}

Idealnie by było, gdyby kod sam się formatował przy każdym zapisie pliku. VS Code ma do tego specjalny zestaw ustawień!

1. W VS Code naciśnij `CTRL/CMD + SHIFT + P`.
2. Wpisz "settings"
3. Naciśnij Enter
4. W polu wyszukiwarki wpisz "format on save"
5. Upewnij się, że opcja "format on save" jest zaznaczona!

> Prettier może czasem wejść w konflikt z innymi linterami, jednak zwykle da się je ze sobą pogodzić. Na przykład, jeśli używasz Prettiera z ESLintem, możesz zainstalować wtyczkę [eslint-prettier](https://github.com/prettier/eslint-plugin-prettier), aby uruchamiać Prettiera jako regułę ESLinta.
