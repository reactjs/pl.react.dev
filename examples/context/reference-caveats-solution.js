class App extends React.Component {
  constructor(props) {
    super(props);
    // highlight-range{2}
    this.state = {
      value: {something: 'coś tam'},
    };
  }

  render() {
    // highlight-range{2}
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
