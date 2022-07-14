import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import GymContext from '../../context/GymContext';

const Header = () => {
  const theme = useTheme();

  const { header, logo, buttons } = useStyles(theme);

  const context = useContext(GymContext);
  const { userType, addToken, addUserType } = context;

  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;

  const logout = () => {
    addToken(null);
    addUserType(null);
    navigate('/');
  }

  const getHeader = () => {
    switch (userType) {
      case "secretary":
        return (
          <>
            <Button variant="contained" disabled={pathname === '/classes'} onClick={() => { navigate('/classes') }}>Turmas</Button>
            <Button variant="contained" disabled={pathname === '/matriculation'} onClick={() => { navigate('/matriculation') }}>Matricula</Button>
            <Button variant="contained" disabled={pathname === '/register'} onClick={() => { navigate('/register') }}>Cadastro</Button>
            <Button variant="contained" onClick={() => logout()}>Sair</Button>
          </>
        );
      case "teacher":
        return (
          <>
            <Button variant="contained" disabled={pathname === '/training'} onClick={() => { navigate('/training') }}>Cadastrar Treino</Button>
            <Button variant="contained" onClick={() => logout()}>Sair</Button>
          </>
        );
      case "doctor":
        return (
          <>
            <Button variant="contained" disabled={pathname === '/exam'} onClick={() => { navigate('/exam') }}>Cadastrar Exame</Button>
            <Button variant="contained" onClick={() => logout()}>Sair</Button>
          </>
        );
      case "client":
        return (
        <>
          <Button variant="contained" disabled={pathname === '/informations'} onClick={() => { navigate('/informations') }}>Cadastrar Exame</Button>
          <Button variant="contained" onClick={() => logout()}>Sair</Button>
        </>);
      default:
        return (
          <Button variant="contained" disabled={pathname === '/login'} onClick={() => { navigate('/login') }}>Login</Button>
        );
    }
  }

  return (
    <div className={header}>
      {pathname === '/' ?
        <div></div>
        :
        <div className={logo} onClick={() => navigate('/')}>
          <img alt="Logo da academia" src="/iconeacademia.png" height="32" width="32" />
          <span>Academia</span>
        </div>
      }
      <div className={buttons}>
        {getHeader()}
      </div>
    </div>
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
