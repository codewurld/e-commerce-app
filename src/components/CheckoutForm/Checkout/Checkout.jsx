import { useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import useStyles from './styles'

// user steps through checkout
const steps = ['Shipping address', 'Payment details']

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0)
    const classes = useStyles()

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
                        {steps.map((step) => {
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        })}
                    </Stepper>
                </Paper>
            </main>

        </>
    );
}

export default Checkout;