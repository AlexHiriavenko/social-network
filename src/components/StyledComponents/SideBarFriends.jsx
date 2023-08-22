
import styled from "@emotion/styled";

export const SidebarStyled = styled('aside')(({theme})=>({
    height: 'calc(100vh - 64px)',
    boxSizing: 'content-box',
    overflowY: 'scroll',
    overflowX: 'hidden',
    width: '360px',
    minWidth: '360px',
    backgroundColor: theme.palette.backgroundColor.section,
    borderRight: theme.palette.border.transp,
    "&::-webkit-scrollbar": {
        width: "0",
      },
}))