import React from "react";
import { List, Checkbox, FormGroup, FormControlLabel } from "@material-ui/core";

export default function CheckboxList() {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Guitars" />
        <FormControlLabel control={<Checkbox />} label="Keyboards" />
        <FormControlLabel control={<Checkbox />} label="Drums" />
        <FormControlLabel control={<Checkbox />} label="Pedals" />
        <FormControlLabel control={<Checkbox />} label="Ukuleles" />
        <FormControlLabel control={<Checkbox />} label="Harmonicas" />
        <FormControlLabel control={<Checkbox />} label="Ouds" />
        <FormControlLabel control={<Checkbox />} label="Brass" />
      </FormGroup>
    </List>
  );
}
