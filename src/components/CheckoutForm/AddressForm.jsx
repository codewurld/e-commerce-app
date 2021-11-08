import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form'

// gutterBottom adds margin to bottom of component

import CustomFormInput from './CustomTextField';

const AddressForm = () => {
    // call useforms
    const methods = useForm();


    return (
        <>
            <Typography variant="h6" gutterBottom>Add shipping details</Typography>
            <FormProvider {...methods}>
                <form onSubmit={''}>
                    <Grid container spacing={3}>
                        <CustomFormInput required name="firstName" label="First Name" />
                        <CustomFormInput required name="lastName" label="Surname" />
                        <CustomFormInput required name="addressFirstLine" label="Address" />
                        <CustomFormInput required name="email" label="Email" />
                        <CustomFormInput required name="city" label="City" />
                        <CustomFormInput required name="postCode" label="Postcode" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Country Destination</InputLabel>
                            <Select value={ } fullWidth onChange>
                                <MenuItem key={ } value={ }>Select Country</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </>
    );
}

export default AddressForm;