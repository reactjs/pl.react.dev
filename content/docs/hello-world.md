---
id: hello-world
title: Witaj świecie!
permalink: docs/hello-world.html
prev: cdn-links.html
next: introducing-jsx.html
---

Poniżej znajdziesz przykład najprostszej aplikacji Reactowej:

```js
ReactDOM.render(
  <h1>Witaj świecie!</h1>,
  document.getElementById('root')
);
```

Wyświetli ona na stronie nagłówek "Witaj świecie".

**[Spróbuj w CodePen](codepen://hello-world)**

Kliknij w powyższy link, aby otworzyć edytor kodu w przeglądarce.
Możesz śmiało dokonywać w nim zmian, zobaczysz też jak wpływają one na to,
co jest wyświetlane na stronie. Większość stron w tym kursie udostępnia Ci 
przykłady, które możesz modyfikować.


## Jak używać tego przewodnika {#how-to-read-this-guide}

W niniejszym kursie zapoznamy się z podstawowymi elementami aplikacji Reactowej:
z elementami i komponentami. Korzystając z nich, możesz tworzyć rozbudowane
aplikacje w oparciu o mniejsze części, dające się wielokrotnie wykorzystywać.  

>Wskazówka
>
> Kurs ten skierowany jest do osób, które wolą się uczyć
> nowych koncepcji **krok po kroku**. Jeśli jednak wolisz zdobywać wiedzę poprzez
> ćwiczenia, możesz skorzystać z [kursu praktycznego](/tutorial/tutorial.html).
> Obydwa kursy świetnie się uzupełniają.
 
Masz przed sobą pierwszy rozdział kursu teoretycznego dotyczącego głównych koncepcji Reacta.
Lista dostępnych rozdziałów znajduje się w bocznym pasku nawigacji. Jeśli czytasz ten kurs
na urządzeniu mobilnym, możesz przemieszczać się po stronie wciskając przycisk w prawym dolnym
rogu ekranu.

Każdy rozdział w tym kursie nadbudowuje wiedzę w oparciu o poprzednie rozdziały.
**Wielu przypadków użycia Reacta możesz się nauczyć czytając rozdziały
w sekcji "Główne idee", czytając je w kolejności, w jakiej pojawiają się w pasku 
nawigacji**. Przykładowo, [“Wprowadzenie do JSX”](/docs/introducing-jsx.html) jest
kolejnym po tym rozdziałem.


## Wymagania początkowe {#knowledge-level-assumptions}

React jest biblioteką JavaScriptową, stąd też zakładamy, że czytelnik dysponuje 
pewną podstawową wiedzą o tym języku. **Jeśli czujesz się niezbyt pewnie, polecamy 
zapoznanie się z kursem ["Ponowne wprowadzenie do JavaScriptu"](https://developer.mozilla.org/pl/docs/Web/JavaScript/Ponowne_wprowadzenie_do_JavaScript),
który pozwoli Ci ocenić swoją wiedzę** oraz będzie stanowić bazę do sprawnego 
poruszania się po kursie Reacta. Choć zapoznanie się z tamtym kursem może zająć
Ci około 30-60 minut, to nie będziesz mieć poczucia, że uczysz się jednocześnie
JavaScriptu i Reacta.

> Zauważ, że...
> 
> W przykładach pojawiających się w naszym poradniku, mogą sporadycznie pojawiać się
> przykłady oparte o nowszą składnię JavaScriptu. Jeśli od dłuższego czasu nie śledzisz
> rozwoju języka [te trzy punkty (ang)](https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c)
> mogą okazać się pomocne. 



## Zaczynajmy! {#lets-get-started}

Kontynuuj przewijanie strony, aby dotrzeć do linku do [następnego rozdziału](/docs/introducing-jsx.html).
Znajduje się on tuż przed stopką strony.
