import Sidebar from '../../components/Sidebar/Sidebar';
import { List, ListItem, Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {SVGpersonGo, SVGpersonPlus, SVGPeople, SVGFriendsList, SVGBirthdays} from '../../components/SVG/svg';

function SidebarFriends () {

    return (
        <Sidebar>
            <List>
                <ListItem>
                    <Link to={"#"}>
                        <SVGPeople/>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={"#"}>
                        <SVGpersonGo/>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={"#"}>
                        <SVGpersonPlus/>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={"#"}>
                        <SVGFriendsList/>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={"#"}>
                        <SVGBirthdays/>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={"#"}>
                        <SVGFriendsList/>
                    </Link>
                </ListItem>
            </List>
        </Sidebar>
    )
}
{/* <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
  </svg>
 */}
 

  /* person messages <?xml version="1.0" ?><svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C7.79086 2 6 3.79086 6 6C6 8.20914 7.79086 10 10 10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2ZM5.00873 11C3.90315 11 3 11.8869 3 13C3 14.6912 3.83281 15.9663 5.13499 16.7966C6.21303 17.484 7.60667 17.8663 9.12572 17.9705L9.49033 16.7731C9.17516 16.0794 8.99984 15.3091 8.99984 14.5C8.99984 13.1704 9.47165 11.9509 10.257 11L5.00873 11ZM19 14.5C19 16.9853 16.9853 19 14.5 19C13.7085 19 12.9647 18.7956 12.3185 18.4368L10.5294 18.9812C10.2162 19.0765 9.92358 18.7838 10.0189 18.4707L10.5635 16.6821C10.2045 16.0358 10 15.2918 10 14.5C10 12.0147 12.0147 10 14.5 10C16.9853 10 19 12.0147 19 14.5ZM12.5 13C12.2239 13 12 13.2239 12 13.5C12 13.7761 12.2239 14 12.5 14H16.5C16.7761 14 17 13.7761 17 13.5C17 13.2239 16.7761 13 16.5 13H12.5ZM12 15.5C12 15.7761 12.2239 16 12.5 16H14.5C14.7761 16 15 15.7761 15 15.5C15 15.2239 14.7761 15 14.5 15H12.5C12.2239 15 12 15.2239 12 15.5Z" fill="#212121"/></svg> */


 

export default SidebarFriends;
