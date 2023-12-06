import { Control, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const InputFieldDefault = ({
  name,
  control,
  label,
}: {
  name: string;
  control: Control;
  label: string;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: `${label} is required` }}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          type={"number"}
          sx={{
            "& .MuiInputBase-root": {
              padding: 0,
              borderRadius: "0.5rem",
              lineHeight: 1.5,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              padding: 0,
            },
          }}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position={"start"}>
                <IconButton
                  sx={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: "0.5rem 0 0 0.5rem",
                  }}
                  onClick={() =>
                    navigator.clipboard.writeText("button clicked")
                  }
                >
                  <ContentCopyIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position={"end"}>
                <Box
                  sx={{
                    backgroundColor: "#f8f9fa",
                    height: "2.4rem",
                    borderRadius: "0 0.5rem 0.5rem 0",
                    display: "flex",
                    alignItems: "center",
                    width: "6.5rem",
                  }}
                >
                  <Typography align={"center"} width={"100%"}>
                    {label}
                  </Typography>
                </Box>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default InputFieldDefault;
