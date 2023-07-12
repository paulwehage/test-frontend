import { styled } from "@stitches/react";
import { Box, Button, Chip, Typography } from "@mui/material";

export const TitleStyled = styled(Typography, {
  fontSize: "24px",
  marginBottom: "16px",
  color: "Black",
  textAlign: "center"
});

export const ButtonStyled = styled(Button, {
  backgroundColor: "Blue",
  color: "White",
  borderRadius: "9999px",
  fontSize: "12px",
  padding: "8px",
});

export const Wrapper = styled('div',{  
  position: 'relative',
  width: "95vw",
  overflow: 'hidden',  
  background: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
  borderRadius: "0.3rem",
  padding: "30px 50px 32px",
  display: 'flex',
  flexDirection: 'column',
  flex: 1
})

export const Header = styled('div',{
  marginTop: '1rem',
  display: 'flex'
})

export const BoxStyled = styled(Box, {
  width: '100%',
  cursor: 'pointer',
  borderRadius: '3px',
})

export const ChipStyled = styled(Chip, {
  display: 'flex',
  transition: "0.9s ease-in",  
  width: '70px',
  cursor: 'pointer !important',  
})

export const WrapperTable = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflow: 'auto'
})