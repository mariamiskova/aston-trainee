import React, { ReactNode, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";

import { ContextInterface, Provider } from "../context";
import { defaultTheme } from "../constants";

interface ThemeProviderInterface {
  theme: Partial<ContextInterface>;
  children: ReactNode;
}

function ThemeProvider({ theme, children }: ThemeProviderInterface) {
  const [themeValue, setThemeValue] = useState(true);
  console.log(theme, typeof theme);

  const toggleTheme = useCallback(() => {
    setThemeValue((prev) => !prev);
  }, []);

  const themeColor = useMemo(
    () => (themeValue ? "#fff" : "#0000001a"),
    [themeValue]
  );

  const providerValue = useMemo(
    () => ({ themeColor, toggleTheme }),
    [themeColor, toggleTheme]
  );

  return <Provider value={providerValue}>{children}</Provider>;
}

ThemeProvider.propTypes = {
  theme: PropTypes.shape({
    themeColor: PropTypes.string,
    toggleTheme: PropTypes.func,
  }),
  children: PropTypes.node,
};

ThemeProvider.defaultProps = {
  theme: defaultTheme,
};

export { ThemeProvider };
