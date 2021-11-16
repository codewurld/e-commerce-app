import React from 'react';

import { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'

import { commerce } from '../../../lib/commerce';
import useStyles from './styles'
import PaymentForm from '../PaymentForm';
import AddressForm from '../AddressForm';
import { Link } from 'react-router-dom'

// user steps through checkout
const steps = ['Shipping address', 'Payment details']

// props passed from Checkout component in Appjs
const Checkout = ({ cart, order, onCaptureCheckout, error }) => {

    // manage state for user steps in checkout process
    const [activeStep, setActiveStep] = useState(0)

    // manage state for check out token
    const [checkoutToken, setCheckoutToken] = useState(null);

    const [shippingData, setShippingData] = useState({})



    const classes = useStyles();

    // checkout token passed in AddressForm component
    // useEffect does not allow direct call of async function

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                setCheckoutToken(token)
            } catch (error) {
                console.log(error)
            }
        }

        generateToken();
    }, [cart]);

    // increment active step if use presses NextButton in AddressForm to direct to payment page

    const nextStep = () => (setActiveStep((prevActiveStep) => prevActiveStep + 1));

    // decrement active step if use presses backButton in AddressForm to direct back to address page from payment
    const backStep = () => (setActiveStep((prevActiveStep) => prevActiveStep - 1));

    // function passed for use in next button on AddressForm
    const nextbtn = (data) => {
        setShippingData(data);
        // console.log(data);

        nextStep();
    };

    // if order successful display message with customer name and ref no
    // else display loading spinner
    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thanks for shopping with us, {order.customer.firstname} </Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.customer.reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );

    // if error exists display error message and option to go back home
    if (error) {
        Confirmation = () => (
            <>
                <Typography variant="h5">Error: {error}
                </Typography>
                <br />
                <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
            </>
        );
    }

    // display form depending on current step user is on
    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} nextbtn={nextbtn} /> : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} />

    return (
        <>
            {/* div pushes content below navbar */}
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    {/* visual signal of progress as user moves through steps of checkout */}
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {/* if user completes last step of checkout, display confirmation */}
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>

        </>
    );
}

export default Checkout;