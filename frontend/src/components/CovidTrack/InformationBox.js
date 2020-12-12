import React from 'react';
import "./InformationBox.css";
import {
    Card,
    CardContent,
    Typography
} from "@material-ui/core"
function InformationBox({title, cases, total, ...props }) {
    return (
        <Card onClick={props.onClick} className={"informationBox"}>
            <CardContent>
                <Typography className="InformationBox-selected "color="textSecondary" gutterBottom>
                {title}
                </Typography>
                <h2 className={`informationBox_cases`}>
                {cases}
                </h2>

                <Typography className="informationBox_total" color="textSecondary">
                Total: {total}
                </Typography>
            </CardContent>
        </Card>
            
    )
}

export default InformationBox