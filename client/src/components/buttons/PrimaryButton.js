import React from 'react';
import Button from '@material-ui/core/Button';

export default function PrimaryButton() {
    return(
        <div>
            <Button variant="contained" color="primary" style={{marginBottom:"10px"}}>
                Submit
            </Button>
        </div>
    )
}