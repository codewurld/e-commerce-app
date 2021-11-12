import React from 'react';

import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';

import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useForm, FormProvider } from 'react-hook-form'

// fetch functions from commerceJS API
import { commerce } from '../../lib/commerce';

// note to self - gutterBottom adds margin to bottom of component

import CustomFormInput from './CustomTextField';

// pass checkoutToken prop from Addressform component in Checkout.jsx
// pass nextButton prop from Checkout component in Checkout.jsx
const AddressForm = ({ checkoutToken, nextbtn }) => {
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

    // get id, description and price for shipping option
    const options = shippingOptions.map((shippingOption) => ({
        id: shippingOption.id, label: `${shippingOption.description} - (${shippingOption.price.formatted_with_symbol})`

    }))

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
        setShippingSubDivision(Object.keys(subdivisions)[0])
    }

    // return shipping options, i.e. domestic or international
    // user must have checkoutToken id
    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

        console.log(options)

        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    // fetch shipping countries when address form renders
    useEffect(() => {
        fetchDestinationCountries(checkoutToken.id)
    }, []);

    // if user selects shipping country, call fetchSubdivisions function
    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry)
    }, [shippingCountry]);

    // if user selects shipping subdivision, call fetchShippingOptions function
    // pass as argument - id from checkoutToken prop, country and subdivision
    useEffect(() => {
        if (shippingSubDivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubDivision)
    }, [shippingSubDivision]);


    return (
        <>
            <Typography variant="h6" gutterBottom>Add shipping details</Typography>
            <FormProvider {...methods}>
                {/* methods.handleSubmit is a react hook form function */}
                {/* spread all data from all filled form property */}
                <form onSubmit={methods.handleSubmit(async (data) => await nextbtn({ ...data, shippingCountry, shippingSubDivision, shippingOption }))}>
                    <Grid container spacing={3}>
                        <CustomFormInput name="firstName" label="First Name" />
                        <CustomFormInput name="lastName" label="Surname" />
                        <CustomFormInput name="addressFirstLine" label="Address" />
                        <CustomFormInput name="email" label="Email" />
                        <CustomFormInput name="city" label="City" />
                        <CustomFormInput name="postCode" label="Postcode" />
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
                            <InputLabel>County/State</InputLabel>
                            <Select value={shippingSubDivision} fullWidth onChange={(e) => setShippingSubDivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>{option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to="/basket" variant="outlined">Go back to basket</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>

            </FormProvider>
        </>
    );
}

export default AddressForm;