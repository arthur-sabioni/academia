import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../../hooks';
import { makeStyles, Button, TextField, CircularProgress } from '@material-ui/core';
import { gray100, primary } from '../../Utils/colors';
import { requestConfigLogin, requestConfigAddressId } from '../../Utils/requestsConfigs';
import CartContext from '../../data/cart-context';
import Header from '../../components/Header/Header';

const Login = () => {
  const { container, containerLogin, progress, title, form, field, button } = useStyles();

  const navigate = useNavigate();

  const cartCtx = useContext(CartContext);

  const { loading, data, sendRequest } = useHttp({});

  const [loginInvalid, setLoginInvalid] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (data && data.token) {
      cartCtx.addToken(data.token);
      sendRequest(requestConfigAddressId(data.token))
    }
    if (data.rows) {
      cartCtx.addAddress(`${data.rows[0].rua}, ${data.rows[0].numero} - ${data.rows[0].bairro}`);
      cartCtx.addAddressId(data.rows[0].id);
      navigate(`/${data.token}`);
    }
  }, [data]);

  const login = () => {
    if (!loginInvalid)
      sendRequest(requestConfigLogin(loginData));
  }

  const handleChange = (event, field) => {
    setLoginData(currentLoginData => ({
      ...currentLoginData,
      [field]: event.target.value,
    }));
    setLoginInvalid(loginData.email.match(/.+@.+/) === null);
  }

  return (
    <div className={container}>
      <Header loginDisabled={true} cartDisabled={true} />
      <div className={containerLogin}>
        {loading ? <CircularProgress className={progress} /> :
          <>
            <div className={title}>Login</div>
            <div className={form}>
              <TextField className={field} id="text-field-email" variant="outlined" label="E-mail" onChange={event => handleChange(event, 'email')} />
              {loginInvalid ? <div>E-mail inválido</div> : <></>}
              <TextField type="password" className={field} id="text-field-password" variant="outlined" label="Senha" onChange={event => handleChange(event, 'password')} />
              <Button className={button} variant="contained" onClick={() => login()}>Entrar</Button>
            </div>
          </>
        }
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    backgroundColor: `${gray100}`,
  },
  containerLogin: {
    padding: 32,
    flexGrow: 1,
    flexBasis: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  progress: {
    color: primary,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 24,
  },
  field: {
    width: 400,
  },
  button: {
    width: 'fit-content',
    color: gray100,
    backgroundColor: primary,
    padding: '8px 16px',
    borderRadius: 8,

    '&:hover': {
      backgroundColor: primary,
      boxShadow: '0 4px 1em gray',
    }
  },
})

export default Login;
