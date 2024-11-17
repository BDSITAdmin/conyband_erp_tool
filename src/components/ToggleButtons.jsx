import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function ToggleButtons({data, onChange }) {
  // console.log("toggle data is",data[0])
  const [alignment, setAlignment] = React.useState(data[0]);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      onChange(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleChange}
      sx={{
        display: "flex",
        gap: 2,
      }}
    >
      {data.map((item, index) => (
        <ToggleButton
          key={index}
          value={item}
          sx={{
            color: alignment === item ? "#202020" : "#808080",
            fontFamily: "Outfit, sans-serif",
            fontSize: alignment === item ? "15px" : "14px",
            fontWeight: alignment === item ? 600 : 500,
            lineHeight: alignment === item ? "20px" : "18px",
            textAlign: "left",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
            textTransform: "none",
            border: "none", 
            borderBottom: alignment === item ? "2px solid #202020" : "none",
            borderRadius: 0,
            "&:hover": {
              backgroundColor: "transparent",
            },
            padding: "8px 10px",
            backgroundColor: "transparent",
          }}
        >
          {item}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default ToggleButtons;
