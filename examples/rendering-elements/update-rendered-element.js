function tick() {
  const element = (
    <div>
      <h1>Witaj świecie!</h1>
      <h2>
        Aktualny czas: {new Date().toLocaleTimeString()}.
      </h2>
    </div>
  );
  // highlight-next-line
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
