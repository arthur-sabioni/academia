import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../../hooks';
import { Button, TextField, CircularProgress, RadioGroup, Radio, FormControlLabel, FormLabel, FormControl, ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { requestConfigLogin } from '../../Utils/requestsConfigs';
import GymContext from '../../context/GymContext';
import Header from '../../components/Header/Header';

const Login = () => {
  const theme = useTheme();

  const { login, title, form } = useStyles(theme);

  const navigate = useNavigate();

  const context = useContext(GymContext);
  const { addToken } = context;

  const { loading, data, sendRequest } = useHttp();

  const [loginInvalid, setLoginInvalid] = useState(false);
  const [loginData, setLoginData] = useState({
    type: 'cliente',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (data && data.token) {
      addToken(data.token);
      navigate(`/home`);
    }
  }, [data]);

  const logar = () => {
    if (!loginInvalid)
      sendRequest(requestConfigLogin(loginData));
  }

  const handleChange = (event, field) => {
    setLoginData(currentLoginData => ({
      ...currentLoginData,
      [field]: event.target.value,
    }));
    if (field === 'email')
      setLoginInvalid(loginData.email.match(/.+@.+/) === null);
  }

  const getRadio = () => <Radio color="secondary" />;

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className={login}>
        {loading ? <CircularProgress /> :
          <>
            <div className={title}>Login</div>
            <FormControl>
              <FormLabel color="secondary" focused={true}>Logar como:</FormLabel>
              <RadioGroup
                row
                value={loginData.type}
                onChange={event => handleChange(event, 'type')}
              >
                <FormControlLabel value="cliente" control={getRadio()} label="Cliente" />
                <FormControlLabel value="funcionario" control={getRadio()} label="Funcionário" />
              </RadioGroup >
            </FormControl >
            <FormControl className={form}>
              <TextField variant="outlined" color="secondary" label="E-mail" onChange={event => handleChange(event, 'email')} />
              {loginInvalid ? <div>E-mail inválido</div> : <></>}
              <TextField variant="outlined" color="secondary" type="password" label="Senha" onChange={event => handleChange(event, 'password')} />
              <Button variant="contained" color="secondary" onClick={() => logar()}>Entrar</Button>
            </FormControl>
          </>
        }
      </div >
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  login: {
    flexGrow: 1,
    flexBasis: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 24,
  },
  title: {
    fontSize: 32,
  },
  form: {
    alignItems: 'flex-end',
    gap: 24,
  },
}))

export default Login;
