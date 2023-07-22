import Sidebar from '../../components/Sidebar/Sidebar';
import { List, Box } from "@mui/material";
import styled from "@emotion/styled";

function SidebarFriends (props) {

const { headContent, menulist } = props;

    const HeadContainer = styled(Box)({
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 12,
        marginLeft: 16,
        marginRight: 16,
    })

    return (
        <Sidebar>
            <HeadContainer>
                {headContent}
            </HeadContainer>
            <List sx={{padding: 0}}>
                {menulist}
            </List>
        </Sidebar>
    )
} 
  /* person messages <?xml version="1.0" ?><svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C7.79086 2 6 3.79086 6 6C6 8.20914 7.79086 10 10 10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2ZM5.00873 11C3.90315 11 3 11.8869 3 13C3 14.6912 3.83281 15.9663 5.13499 16.7966C6.21303 17.484 7.60667 17.8663 9.12572 17.9705L9.49033 16.7731C9.17516 16.0794 8.99984 15.3091 8.99984 14.5C8.99984 13.1704 9.47165 11.9509 10.257 11L5.00873 11ZM19 14.5C19 16.9853 16.9853 19 14.5 19C13.7085 19 12.9647 18.7956 12.3185 18.4368L10.5294 18.9812C10.2162 19.0765 9.92358 18.7838 10.0189 18.4707L10.5635 16.6821C10.2045 16.0358 10 15.2918 10 14.5C10 12.0147 12.0147 10 14.5 10C16.9853 10 19 12.0147 19 14.5ZM12.5 13C12.2239 13 12 13.2239 12 13.5C12 13.7761 12.2239 14 12.5 14H16.5C16.7761 14 17 13.7761 17 13.5C17 13.2239 16.7761 13 16.5 13H12.5ZM12 15.5C12 15.7761 12.2239 16 12.5 16H14.5C14.7761 16 15 15.7761 15 15.5C15 15.2239 14.7761 15 14.5 15H12.5C12.2239 15 12 15.2239 12 15.5Z" fill="#212121"/></svg> */
export default SidebarFriends;
