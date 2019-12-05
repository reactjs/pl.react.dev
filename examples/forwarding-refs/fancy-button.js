class FancyButton extends React.Component {
  focus() {
    // ...
  }

  // ...
}

// Zamiast FancyButton, exportujemy LogProps.
// Jednak wyrenderowany zostanie FancyButton.
// highlight-next-line
export default logProps(FancyButton);
