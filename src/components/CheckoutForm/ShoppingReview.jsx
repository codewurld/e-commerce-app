import { Typography, List, ListItem, ListItemText } from "@material-ui/core";


// get checkoutToken from PaymentForm component in Checkout.jsx
const ShoppingReview = ({ checkoutToken }) => {
    return (

        <>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map((product) => (
                    <ListItem style={{ padding: '10px 0' }} key={product.name}>
                        <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
                        {/* price */}
                        <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{ padding: '10px 0' }}>
                    <ListItemText primary="Total" />
                    {/* total price */}
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>{checkoutToken.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
            </List>
        </>
    );
}

export default ShoppingReview;