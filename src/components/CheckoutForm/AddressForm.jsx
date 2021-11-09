import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';

import { useState, useEffect } from 'react';

import { useForm, FormProvider } from 'react-hook-form'

// fetch functions from commerceJS API
import { commerce } from '../../lib/commerce';

// note to self - gutterBottom adds margin to bottom of component

import CustomFormInput from './CustomTextField';

// pass checkoutToken prop from Addressform component in Checkout.jsx
const AddressForm = ({ checkoutToken }) => {
    const [shippingCountries, setShippingCountries] = useState([]);

    // user selection
    const [shippingCountry, setShippingCountry] = useState('')

    // international options
    const [shippingSubDivisions, setShippingSubDivisions] = useState([])

    // user selection
    const [shippingSubDivision, setShippingSubDivision] = useState('')

    const [shippingOptions, setShippingOptions] = useState([])

    // user selection
    const [shippingOption, setShippingOption] = useState('')

    // call useforms
    const methods = useForm();

    // checkoutTokenId is received from when user starts order process
    const fetchDestinationCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        console.log(countries);
        setShippingCountries(countries);
    }

    // fetch shipping countries when address form renders
    useEffect(() => {
        fetchDestinationCountries(checkoutToken.id)
    }, []);

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
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Country Destination</InputLabel>
                            <Select value={ } fullWidth onChange>
                                <MenuItem key={ } value={ }>Select Country</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={ } fullWidth onChange>
                                <MenuItem key={ } value={ }>Select Country</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={ } fullWidth onChange>
                                <MenuItem key={ } value={ }>Shipping Options</MenuItem>
                            </Select>
                        </Grid> */}

                    </Grid>
                </form>
            </FormProvider>
        </>
    );
}

export default AddressForm;