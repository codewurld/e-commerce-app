import React from 'react';
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

// material ui size properties - xs = display item on small device, etc.. 12 = 1 item, 6 = 2 items....

const CustomFormInput = ({ name, label, }) => {

    const { control } = useFormContext();

    // const isError = false;

    return (

        < Grid item xs={12} sm={6} >
            {/* connect react hook form with materialUI */}
            <Controller
                as={TextField}
                default=""
                name={name}
                control={control}
                label={label}
                fullWidth
                required

            />
        </ Grid>
    );
}

export default CustomFormInput;