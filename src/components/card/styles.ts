import { styled } from "@stitches/react";


export const CustonCard = styled('div', {
    position: 'relative',
    backgroundColor: 'white',
    gap: '0.5rem',
    padding: '3rem 1rem 3rem 1rem',
    borderRadius: '5px',
    border: '1px solid rgba(var(--card-border-rgb), 0)',
    width: '24vw',
    minWidth: '400px',
    boxShadow: '1px 0px 5px 5px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    'Button': {
        margin: '20px 0 1px 0',
    }
})

export const LogoContainer = styled('div', {    
    width: '60%',
    height: 'auto'
})

export const LogoImage = styled('img', {
    width: '100%',
    height: 'auto'
})
