import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../../hooks';
import { Button, TextField, CircularProgress, RadioGroup, Radio, FormControlLabel, FormLabel, FormControl } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { requestConfigLogin } from '../../Utils/requestsConfigs';
import GymContext from '../../context/GymContext';
import Header from '../../components/Header/Header';

const Login = () => {
  const theme = useTheme();

  const { login, title, form, divisory, textF} = useStyles(theme);

  const navigate = useNavigate();

  const context = useContext(GymContext);
  const { addToken, addUserType } = context;

  const { loading, data, sendRequest } = useHttp();

  const [loginData, setLoginData] = useState({
    CPF: '',
    password: '',
    type: 'client',
  });

  useEffect(() => {
    if (data && data.token) {
      addToken(data.token);
      addUserType(data.type);
      navigate(`/`);
    }
  }, [data]);

  const logar = () => sendRequest(requestConfigLogin(loginData));

  const handleChange = (event, field) =>
    setLoginData(currentLoginData => ({
      ...currentLoginData,
      [field]: event.target.value,
    }));

  const getRadio = () => <Radio color="secondary" />;

  return (
    <>
      <Header />
      <div className={login}>
        {loading ? <CircularProgress /> :
          <>
            <div className={title}>Login
            <hr className={divisory}/>
            </div>
            
            <FormControl>
              <FormLabel color='secondary' focused={true}>Logar como:</FormLabel>
              <RadioGroup
                row
                value={loginData.type}
                onChange={event => handleChange(event, 'type')}
              >
                <FormControlLabel value="client" control={getRadio()} label="Cliente" />
                <FormControlLabel value="employer" control={getRadio()} label="Funcion??rio" />
              </RadioGroup >
            </FormControl >
            <FormControl className={form}>
              <TextField variant="outlined" className={textF} color="secondary" label="CPF" onChange={event => handleChange(event, 'CPF')} />
              <TextField variant="outlined" className={textF} color="secondary" type="password" label="Senha" onChange={event => handleChange(event, 'password')} />
              <Button variant="contained" color="secondary" onClick={() => logar()}>Entrar</Button>
            </FormControl>
          </>
        }
      </div >
    </>
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
    gap: 28,
    fontFamily: 'Quantico',
  },
  title: {
    fontSize: 32,
  },
  form: {
    alignItems: 'flex-end',
    gap: 24,
  },
  divisory: {
    width: 400,
    padding: 0,
    margin: 0,
  },
  textF:{
    fontSize:40,
  }
}))

export default Login;
