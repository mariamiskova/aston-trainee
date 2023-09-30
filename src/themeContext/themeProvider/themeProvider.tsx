import React, { ReactNode, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";

import { ContextInterface, Provider } from "../context";
import { defaultTheme, themes } from "../constants";

interface ThemeProviderInterface {
  theme: Partial<ContextInterface>;
  children: ReactNode;
}

function ThemeProvider({ theme, children }: ThemeProviderInterface) {
  const [themeValue, setThemeValue] = useState(true);

  const toggleTheme = useCallback(() => {
    setThemeValue((prev) => !prev);
  }, []);

  const themeColor = useMemo(
    () => (themeValue ? "#fff" : "#0000001a"),
    [themeValue]
  );

  return <Provider value={{ themeColor, toggleTheme }}>{children}</Provider>;
}

ThemeProvider.propTypes = {
  theme: PropTypes.oneOf(themes),
  children: PropTypes.node,
};

ThemeProvider.defaultProps = {
  theme: defaultTheme,
};

export { ThemeProvider };
