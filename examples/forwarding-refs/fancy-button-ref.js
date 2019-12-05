import FancyButton from './FancyButton';

// highlight-next-line
const ref = React.createRef();

// Komponent FancyButton, który zaimportowaliśmy jest tak naprawdę KWRem LogProps.
// Mimo że wyświetlony rezultat będzie taki sam,
// nasza referencja będzie wskazywała na LogProps zamiast na komponent FancyButton!
// Oznacza to, że nie możemy wywołać np. metody ref.current.focus()
// highlight-range{4}
<FancyButton
  label="Click Me"
  handleClick={handleClick}
  ref={ref}
/>;
