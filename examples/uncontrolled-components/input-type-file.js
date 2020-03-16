class FileInput extends React.Component {
  constructor(props) {
    // highlight-range{3}
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    // highlight-range{4}
    event.preventDefault();
    alert(
      `Wybrany plik - ${this.fileInput.current.files[0].name}`
    );
  }

  render() {
    // highlight-range{5}
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Prześlij plik:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Wyślij</button>
      </form>
    );
  }
}

ReactDOM.render(
  <FileInput />,
  document.getElementById('root')
);
