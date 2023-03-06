---
title: Konfiguracja edytora
---

<Intro>

<<<<<<< HEAD
Prawidłowo skonfigurowany edytor może sprawić, że kod będzie łatwiejszy w czytaniu i szybszy w pisaniu. Może także pomóc wyłapać błędy w trakcie pisania! Jeśli to twój pierwszy raz z konfiguracją edytora lub jeśli szukasz wskazówek w usprawnieniu pracy z twoim obecnym, ten rozdział jest dla ciebie.
=======
A properly configured editor can make code clearer to read and faster to write. It can even help you catch bugs as you write them! If this is your first time setting up an editor or you're looking to tune up your current editor, we have a few recommendations.
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200

</Intro>

<YouWillLearn>

* Jakie są najpopularniejsze edytory
* Jak automatycznie formatować kod

</YouWillLearn>

## Twój edytor {/*your-editor*/}

[VS Code](https://code.visualstudio.com/) jest obecnie jednym z najbardziej popularnych edytorów. Posiada ogromną bazę rozszerzeń i doskonale integruje się z popularnymi usługami, jak np. GitHub. Większość z funkcjonalności wymienionych poniżej można także dodać do VS Code w formie rozszerzeń, co sprawia, że jest bardzo dobrze konfigurowalny!

Społeczność Reacta używa także:

- [WebStorm](https://www.jetbrains.com/webstorm/) to zintegrowane środowisko deweloperskie zaprojektowane specjalnie do pracy z JavaScriptem.
- [Sublime Text](https://www.sublimetext.com/) posiada wbudowane wsparcie dla JSX oraz TypeScriptu, [podświetlanie składni](https://stackoverflow.com/a/70960574/458193) i autouzupełnianie.
- [Vim](https://www.vim.org/) to elastyczny edytor tekstu stworzony do efektywnego pisania i modyfikowania dowolnego tekstu. W większości systemów UNIX-owych oraz w Apple OS X występuje pod nazwą "vi".

## Zalecane funkcje edytora tekstu {/*recommended-text-editor-features*/}

Niektóre edytory mają te funkcje wbudowane, inne wymagają instalowania rozszerzeń. Dla pewności sprawdź, jakie wsparcie dla nich ma twój edytor!

### Linting {/*linting*/}

Lintery kodu znajdują problemy w kodzie podczas jego pisania i pomagają je zawczasu naprawić. Popularnym, open-sourcowym linterem dla JavaScriptu jest [ESLint](https://eslint.org/).

- [Zainstaluj ESLinta z konfiguracją zalecaną dla Reacta](https://www.npmjs.com/package/eslint-config-react-app) (upewnij się, że masz [zainstalowany Node!](https://nodejs.org/en/download/current/))
- [Zintegruj ESLint z VS Code za pomocą oficjalnego rozszerzenia](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

**Upewnij się, że masz włączone w projekcie wszystkie reguły z [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks).** Są one istotne, ponieważ wychwytują zawczasu większość poważnych błedów. Są one domyślnie włączone w rekomendowanym zestawie reguł [`eslint-config-react-app`](https://www.npmjs.com/package/eslint-config-react-app).

### Formatowanie {/*formatting*/}

Ostatnia rzecz, jaka powinna się wydarzyć po udostępnieniu twojego kodu współtwórcom projektu, jest dyskusja pt. [tabulatory vs spacje](https://www.google.com/search?q=tabulatory+vs+spacje)! Na szczęście jest [Prettier](https://prettier.io/), który posprząta w twoim kodzie, formatując go według ustalonych reguł. Uruchom Prettiera, a wszystkie tabulatory w kodzie zamienią się na spacje; wszelkie wcięcia, cudzysłowy i apostrofy itp. również zostaną podmienione na podstawie ustawień. Idealnie by było, gdyby Prettier był uruchamiany przy każdym zapisaniu pliku, automatycznie aplikując te reguły za ciebie.

Aby zainstalować [rozszerzenie Prettier dla VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), musisz:

1. Uruchomić VS Code
2. Użyć komendy szybkiego otwarcia (naciśnij `Ctrl/Cmd + P`)
3. Wkleić w pole `ext install esbenp.prettier-vscode`
4. Nacisnąć Enter

#### Formatowanie podczas zapisu {/*formatting-on-save*/}

Idealnie by było, gdyby kod sam się formatował przy każdym zapisie pliku. VS Code ma do tego specjalny zestaw ustawień!

1. W VS Code naciśnij `Ctrl/Cmd + Shift + P`.
2. Wpisz "settings"
3. Naciśnij Enter
4. W polu wyszukiwarki wpisz "format on save"
5. Upewnij się, że opcja "format on save" jest zaznaczona!

> Jeśli twój zestaw reguł dla ESLinta zawiera reguły dotyczące formatowania, mogą one wchodzić w konflikt z Prettierem. Zalecamy wyłączenie wszystkich reguł formatujących w ESLincie za pomocą wtyczki [eslint-prettier](https://github.com/prettier/eslint-plugin-prettier), aby wykorzystać ESLinta *tylko* do wyłapywania błędów logicznych w kodzie. Jeśli chcesz sprawdzić formatowanie plików przed zmergowaniem pull requesta, użyj komendy [`prettier --check`](https://prettier.io/docs/en/cli.html#--check) w skrypcie ciągłej integracji (ang. *continuous integration*).
