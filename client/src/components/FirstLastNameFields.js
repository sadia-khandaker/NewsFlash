import {Grid} from "@mui/material";
import {OneIconTextField} from "./OneIconTextField";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import React from "react";

export function FirstLastNameFields({
                                        firstName,
                                        lastName,
                                        firstNameError,
                                        lastNameError,
                                        firstNameHelperText,
                                        lastNameHelperText,
                                        firstNameOnChange,
                                        lastNameOnChange
                                    }) {
    return (<Grid container
                  spacing={2}>
        <Grid item
              xs={6}>
            <OneIconTextField
                name="first_name"
                label="First Name"
                value={firstName}
                onChange={firstNameOnChange}
                error={firstNameError}
                helperText={firstNameHelperText}
                fieldColor="#ff5f88"
                icon={<BadgeOutlinedIcon/>}
            />
        </Grid>
        <Grid item
              xs={6}>
            <OneIconTextField
                name="last_name"
                label="Last Name"
                value={lastName}
                onChange={lastNameOnChange}
                error={lastNameError}
                helperText={lastNameHelperText}
                fieldColor="#ff5f88"
                icon={<BadgeIcon/>}
            />
        </Grid>
    </Grid>);
}