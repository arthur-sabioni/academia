import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ThemeProvider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const Header = () => {
  const theme = useTheme();

  const { header, logo, buttons } = useStyles(theme);

  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;

  return (
    <ThemeProvider theme={theme}>
      <div className={header}>
        {pathname === '/' ?
          <div></div>
          :
          <div className={logo} onClick={() => navigate('/')}>
            <img alt="Logo da academia" src="/iconeacademia.png" height="32" width="32" />
            <span>Academia</span>
          </div>
        }

        {false ? //token
          <div className={buttons}>
            <Button variant="contained" onClick={() => { navigate('/') }}>Sair</Button>
          </div>
          :
          <div className={buttons}>
            <Button variant="contained" disabled={pathname === '/login'} onClick={() => { navigate('/login') }}>Login</Button>
            <Button variant="contained" disabled={pathname === '/register'} onClick={() => { navigate('/register') }}>Cadastrar</Button>
          </div>
        }
      </div>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    flexGrow: 0,
    flexBasis: 'auto',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    padding: '16px 32px',
    boxShadow: '0 6px 1em gray',
    fontWeight: 500,
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.thirdy.main,
  },
  logo: {
    display: 'flex',
    gap: 8,
    fontSize: 32,
    alignItems: 'center',
    cursor: 'pointer',
  },
  buttons: {
    display: 'flex',
    gap: 24,
  },
}));

export default Header;
