function logProps(Component) {
  class LogProps extends React.Component {
    // ...
  }

  function forwardRef(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }

  // Nadajmy temu komponentowi nazwę, która będzie bardziej czytelna w narzędziach deweloperskich.
  // np. "ForwardRef(logProps(MyComponent))"
  // highlight-range{1-2}
  const name = Component.displayName || Component.name;
  forwardRef.displayName = `logProps(${name})`;

  return React.forwardRef(forwardRef);
}
