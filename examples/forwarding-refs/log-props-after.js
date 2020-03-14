function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('poprzednie właściwości:', prevProps);
      console.log('nowe właściwości:', this.props);
    }

    render() {
      // highlight-next-line
      const {forwardedRef, ...rest} = this.props;

      // 2. Przypiszmy nasz atrybut "forwardedRef" jako referencję
      // highlight-next-line
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // 1. Zwróć uwagę na drugi parametr "ref" dostarczony przez React.forwardRef.
  // Możemy go przekazać dalej do LogProps jako zwyczajny atrybut, np. "forwardedRef".
  // Następnie może on zostać przypisany do komponentu wewnątrz.
  // highlight-range{1-3}
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
