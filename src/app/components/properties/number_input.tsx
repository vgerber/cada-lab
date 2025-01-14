import { styled } from "@mui/material";

const NumberInput = styled("input")(({ theme }) => ({
  outline: "none",
  background: "#333",
  border: "1px solid #333",
  color: theme.palette.text.primary,
  borderRadius: "5px",
  textAlign: "center",
  padding: "5px",
  width: "180px",
  ":focus": {
    background: theme.palette.primary.dark,
  },
  ":read-only": {
    background: "#222",
    borderColor: "#222",
  },
}));

export default NumberInput;
