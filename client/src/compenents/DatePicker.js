import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function BasicDatePicker({ dueDate, setDueDate }) {
  const isValidDate = React.useMemo(() => {
    return dayjs(dueDate, "YYYY-MM-DD", true).isValid();
  }, [dueDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DatePicker"]}
        sx={{
          "& .MuiStack-root": {
            paddingTop: 0, // Remove padding-top from MuiStack-root
          },
        }}
      >
        <DatePicker
          label="Due Date"
          defaultValue={isValidDate ? dueDate : null}
          minDate={dayjs()} // Disable dates before today
          onChange={(newValue) => {
            setDueDate(newValue);
          }}
          format="YYYY-MM-DD" // Specify the date format
          sx={{
            width: "90%",

            "& .MuiOutlinedInput-root": {
              border: "none", // Remove border
              outline: "none", // Remove outline
              padding: 0, // Remove padding
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // Remove the default outline border
            },
            "& .MuiInputBase-input": {
              color: "#164863", // Inherit color from parent or set to a specific color
            },
            "& .MuiFormLabel-root": {
              color: "#164863", // Inherit label color from parent or set to a specific color
              fontSize: "inherit", // Inherit font size from parent or set to a specific size
              fontFamily: "inherit", // Inherit font family from parent or set to
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#164863", // Inherit placeholder color from parent or set to a specific color
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
