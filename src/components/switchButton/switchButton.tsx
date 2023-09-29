import React from "react";

import styles from "./switchButton.module.scss";

interface ISwitchButton {
  callbackToggle: () => void;
}

const SwitchButton = ({ callbackToggle }: ISwitchButton) => {
  const handleClick = (e: any) => {
    callbackToggle();
  };

  return (
    <label className={styles.label}>
      <div className={styles.toggle}>
        <input
          className={styles.toggle_state}
          type="checkbox"
          name="check"
          value="check"
          onClick={handleClick}
        />
        <div className={styles.toggle_inner}>
          <div className={styles.indicator}></div>
        </div>
        <div className={styles.active_bg}></div>
      </div>
      <div className={styles.label_text}>Switch theme</div>
    </label>
  );
};

export default SwitchButton;
