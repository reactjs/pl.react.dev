class HelloMessage extends React.Component {
  render() {
    return <div>Witaj, {this.props.name}</div>;
  }
}

root.render(<HelloMessage name="Michał" />);
