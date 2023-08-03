import { Box } from "@mui/material";
import styled from "@emotion/styled";

function SideBarHeader(props) {

    const HeadContainer = styled(Box)({
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 12,
        marginLeft: 16,
        marginRight: 16,
        flexDirection: 'column',
    })

    return (
            <HeadContainer>
                {props.children}
            </HeadContainer>
    )
}

export default SideBarHeader;