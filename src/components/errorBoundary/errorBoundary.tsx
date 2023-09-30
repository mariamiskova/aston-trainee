import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";

import styles from "./errorBoundary.module.scss";

interface ErrorBoundaryInterface {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryInterface, State> {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
  };

  constructor(props: ErrorBoundaryInterface) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(erro: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <h1>Something went wrong...</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
