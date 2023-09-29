import React from "react";
import PropTypes from "prop-types";
import { defaultTo } from "lodash";

import { Consumer } from "../context";
import { defaultTheme, themes } from "../constants";

function ThemeConsumer(props: {
  children: (
    arg0: any
  ) => React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<unknown>
  >;
  defaultTheme: string;
}) {
  return (
    <Consumer>
      {(theme) => props.children(defaultTo(theme, props.defaultTheme))}
    </Consumer>
  );
}

ThemeConsumer.propTypes = {
  defaultTheme: PropTypes.oneOf(themes),
  children: PropTypes.func.isRequired,
};

ThemeConsumer.defaultProps = {
  defaultTheme,
};

export { ThemeConsumer };
