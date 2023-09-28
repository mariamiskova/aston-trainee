import React, { useState } from "react";

const LikeIcon = () => {
  const [hover, setHover] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setHover(() => true);
  };
  const handleMouseLeave = () => {
    setHover(() => false);
  };

  return (
    <svg
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      width="35"
      height="31"
      viewBox="0 0 35 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.4554 3.56381C30.6491 2.75101 29.6917 2.10624 28.638 1.66633C27.5842 1.22642 26.4548 1 25.3142 1C24.1736 1 23.0442 1.22642 21.9905 1.66633C20.9367 2.10624 19.9794 2.75101 19.173 3.56381L17.4996 5.24987L15.8261 3.56381C14.1974 1.92278 11.9883 1.00085 9.68495 1.00085C7.38156 1.00085 5.17251 1.92278 3.54376 3.56381C1.91502 5.20485 1 7.43057 1 9.75134C1 12.0721 1.91502 14.2978 3.54376 15.9389L5.2172 17.6249L17.4996 30L29.782 17.6249L31.4554 15.9389C32.2621 15.1265 32.902 14.1619 33.3387 13.1002C33.7753 12.0385 34 10.9005 34 9.75134C34 8.60214 33.7753 7.46419 33.3387 6.40251C32.902 5.34083 32.2621 4.37623 31.4554 3.56381Z"
        stroke={hover ? "#b50938" : "white"}
        stroke-opacity="0.8"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default LikeIcon;
