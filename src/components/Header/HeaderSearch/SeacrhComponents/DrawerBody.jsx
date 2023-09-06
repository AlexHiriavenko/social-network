import { useTheme } from "@mui/material/styles";
import {
    ContainerDrawerBody,
    TitleDrawerBody,
} from "../../styledHeaderComponents";
import ListRecentSearches from "./ListRecentSearches";

function DrawerBody({ foundUser }) {
    const theme = useTheme();

    return (
        <ContainerDrawerBody>
            <TitleDrawerBody component="h3" variant="h6">
                Recent searches
            </TitleDrawerBody>

            <ListRecentSearches users={foundUser} />
        </ContainerDrawerBody>
    );
}

export default DrawerBody;
