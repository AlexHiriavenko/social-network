
import styled from "@emotion/styled";

export const SidebarStyled = styled('aside')(({theme})=>({
    height: 'calc(100vh - 65px)',
    boxSizing: 'content-box',
    width: '360px',
    minWidth: '360px',
    backgroundColor: theme.palette.backgroundColor.section,
    borderRight: theme.palette.border.transp,
    "&::-webkit-scrollbar": {
        width: "0",
      },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      },
}))