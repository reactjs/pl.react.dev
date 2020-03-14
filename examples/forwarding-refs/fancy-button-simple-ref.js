// highlight-range{1-2}
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// Możesz teraz otrzymać bezpośrednią referencję do elementu „button”:
const ref = React.createRef();
<FancyButton ref={ref}>Kliknij mnie!</FancyButton>;
