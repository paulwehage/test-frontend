import { styled } from "@stitches/react";
import { Button, Box } from '@mui/material';



export const Wrapper = styled(Box, {
    width:"95%",
    display:"flex",
    justifyContent:"space-Between",
    alignItems:"center",
    marginTop:3,
    marginLeft:25,
    marginBottom:3,
    marginRight:25,
});

export const HeaderSection = styled(Box, {
    width:'33%',
});
export const DocumentationButton = styled(Button, {
    textTransform: 'none',
    padding: 0,
    color: '#fff',
    minWidth: 0,
})

export const LogoutButton = styled(Button, {
    textTransform: 'none',
    minWidth: 0,
    padding: '5px 0',
})