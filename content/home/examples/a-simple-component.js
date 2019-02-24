class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Witaj, {this.props.name}!
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Michał" />,
  document.getElementById('hello-example')
);