import { Typography, Button, Divider } from "@material-ui/core";
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";

import ShoppingReview from "./ShoppingReview";

const PaymentForm = ({ checkoutToken }) => {
    return (
        <>
            <ShoppingReview checkoutToken={checkoutToken} />
        </>
    );
}

export default PaymentForm;