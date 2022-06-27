import React from 'react';
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import { secondary, gray100 } from '../../Utils/colors';

const Header = ({ loginDisabled, registerDisabled, cartDisabled }) => {
  const { containerHeader, logo, title, buttons, button } = useStyles();

  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;

  return (
    <div className={containerHeader}>
      {pathname === '/' ?
        <div></div>
        :
        <div className={logo} onClick={() => navigate('/')}>
          <img alt="Logo da pizzaria" src="/iconeacademia.png" height="32" width="32" />
          <div className={title}>Academia</div>
        </div>
      }

      {false ? //token
        <div className={buttons}>
          <Button className={button} variant="contained" onClick={() => { navigate('/') }}>Sair</Button>
        </div>
        :
        <>
          <div className={buttons}>
            <Button className={button} variant="contained" disabled={loginDisabled} onClick={() => { navigate('/login') }}>Login</Button>
            {/* <Button className={button} variant="contained" disabled={registerDisabled} onClick={() => { navigate('/register') }}>Cadastrar</Button> */}
          </div>
        </>
      }
    </div>
  );
};

Header.defaultProps = {
  loginDisabled: false,
  registerDisabled: false,
  cartDisabled: false,
  homeConfig: false,
};

Header.propTypes = {
  loginDisabled: PropTypes.bool,
  registerDisabled: PropTypes.bool,
  cartDisabled: PropTypes.bool,
};

const useStyles = makeStyles({
  containerHeader: {
    flexGrow: 0,
    flexBasis: 'auto',
    display: 'grid',
    gridColumn: 3,
    gridTemplateColumns: '4fr 1fr',
    padding: 24,
    backgroundColor: secondary,
    color: gray100,
    boxShadow: '0 6px 1em gray',
    fontWeight: 500,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginLeft: 24,
    cursor: 'pointer',
  },
  title: {
    fontSize: 32,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
    gap: 24,
  },
  button: {
    backgroundColor: `${gray100} !important`,
    padding: '8px 16px',
    borderRadius: 8,
  }
})

export default Header;
