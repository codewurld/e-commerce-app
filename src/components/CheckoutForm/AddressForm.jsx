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

    //  Object.entries returns keys and values of of object argument- since shippingCountries is not an array, mapping is impossible 
    // convert object into 2d array
    // map converted object
    // return code and name as id and label
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));

    const subdivisions = Object.entries(shippingSubDivisions).map(([code, name]) => ({ id: code, label: name }));

    // checkoutTokenId is received from when user starts order process
    const fetchDestinationCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListCountries(checkoutTokenId);

        setShippingCountries(countries);

        // return array of keys in countries object
        setShippingCountry(Object.keys(countries)[0])
    }

    // return states/counties of individual countries
    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubDivisions(subdivisions);
        // map and return selected subdivision
        setShippingSubDivisions(Object.keys(subdivisions)[0])
    }

    // fetch shipping countries when address form renders
    useEffect(() => {
        fetchDestinationCountries(checkoutToken.id)
    }, []);

    // if user selects shipping country, call fetchSubdivisions function
    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry)
    }, [shippingCountry]);


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
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {/* map through converted object of countries - line 39 and return JSX */}
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>{country.label}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubDivision} fullWidth onChange={(e) => setShippingSubDivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={''} fullWidth onChange>
                                <MenuItem key={''} value={''}>Shipping Options</MenuItem>
                            </Select>
                        </Grid>

                    </Grid>
                </form>
            </FormProvider>
        </>
    );
}

export default AddressForm;