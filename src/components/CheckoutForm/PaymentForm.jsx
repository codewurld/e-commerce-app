import { Typography, Button, Divider } from "@material-ui/core";
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";

import ShoppingReview from "./ShoppingReview";

// call Stripe API
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


const PaymentForm = ({ checkoutToken, backStep }) => {

    // finalise user order on form submit
    // event, elements and stripe as arguments
    const handleSubmit = (e, elements, stripe) => {
        // prevent refresh of page
        e.preventDefault();

        // if no element or stripe, return
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        // fetch error or successful payment from Stripe API
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

        // if error, console log error
        // else return object of customer information
        if (error) {
            console.log(error);
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
                shipping: {
                    name: 'Primary',
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry
                }
            }
        }

        return (
            <>
                <ShoppingReview checkoutToken={checkoutToken} />
                <Divider />
                <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>Payment method</Typography>
                <Elements stripe={stripePromise}>
                    {/* pass elements and stripe from Stripe API as arg */}
                    <ElementsConsumer>
                        {({ elements, stripe }) => (
                            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                                {/* Stripe card details component */}
                                <CardElement />
                                <br /> <br />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button variant="outlined" onClick={backStep}>Go back</Button>
                                    {/* if no access to stripe instance, disable button */}
                                    <Button type="submit" variant="contained" disabled={!stripe} color="primary">Pay {checkoutToken.live.subtotal.formatted_with_symbol}</Button>
                                </div>
                            </form>
                        )}
                    </ElementsConsumer>
                </Elements>
            </>
        );
    }

    export default PaymentForm;