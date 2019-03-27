class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Czy dodajemy nowe pozycje do listy?
    // Przechowajmy pozycję scrolla, aby móc dostosować ją później.
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Jeśli mamy snapshot, to znaczy, że właśnie dodaliśmy nowe pozycje.
    // Dopasujmy scroll, aby te nowe pozycje nie wypchnęły starych z widoku.
    // (snapshot jest tutaj wartością zwróconą z metody getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...zawartość... */}</div>
    );
  }
}
