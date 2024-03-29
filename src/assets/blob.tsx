import React from "react";

interface BlobProps {
  color: string;
  className?: string;
}

const Blob: React.FC<BlobProps> = (props) => {
  const { color = "#fff", className } = props;

  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className} >
      <path
        fill={color}
        d="M43.9,-65.6C58.7,-58.7,73.9,-49.7,82.5,-36.1C91.1,-22.6,93.1,-4.5,88.4,11.2C83.7,26.8,72.4,39.9,61.1,53.1C49.8,66.2,38.5,79.5,23.7,86.5C8.8,93.6,-9.6,94.4,-24.4,87.9C-39.3,81.4,-50.7,67.6,-59.1,53.6C-67.5,39.6,-72.9,25.4,-74.2,11.1C-75.6,-3.2,-72.9,-17.6,-68.5,-33C-64.2,-48.4,-58.1,-64.8,-46.4,-73.2C-34.8,-81.5,-17.4,-82,-1.4,-79.7C14.5,-77.5,29,-72.6,43.9,-65.6Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

export default Blob;
