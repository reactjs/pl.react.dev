// highlight-next-line
function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('poprzednie właściwości:', prevProps);
      console.log('nowe właściwości:', this.props);
    }

    render() {
      // highlight-next-line
      return <WrappedComponent {...this.props} />;
    }
  }

  return LogProps;
}
