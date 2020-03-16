class App extends React.Component {
  render() {
    // highlight-range{2}
    return (
      <MyContext.Provider value={{something: 'coś tam'}}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
