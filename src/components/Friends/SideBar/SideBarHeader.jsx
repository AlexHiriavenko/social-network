import React, {memo} from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

function SideBarHeader(props) {

    const HeadContainer = styled(Box)({
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 12,
        flexDirection: 'column',
    })

    return (
            <HeadContainer>
                {props.children}
            </HeadContainer>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(SideBarHeader);