import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../../hooks';
import { makeStyles, Button, TextField, CircularProgress, RadioGroup, Radio, FormControlLabel, FormLabel, FormControl } from '@material-ui/core';
import { gray100, primary, secondary } from '../../Utils/colors';
import { requestConfigLogin } from '../../Utils/requestsConfigs';
import GymContext from '../../context/GymContext';
import Header from '../../components/Header/Header';

const Login = () => {
  const CLIENT = 'cliente';

  const { container, containerLogin, progress, title, radio, form, field, button } = useStyles();

  const navigate = useNavigate();

  const context = useContext(GymContext);
  const { addToken } = context;

  const { loading, data, sendRequest } = useHttp({});

  const [loginInvalid, setLoginInvalid] = useState(false);
  const [loginData, setLoginData] = useState({
    type: CLIENT,
    email: '',
    password: '',
  });

  useEffect(() => {
    if (data && data.token) {
      addToken(data.token);
      navigate(`/home`);
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
    if (field === 'email')
      setLoginInvalid(loginData.email.match(/.+@.+/) === null);
  }

  const getRadio = () => <Radio color="default" />;

  return (
    <div className={container}>
      <Header loginDisabled={true} cartDisabled={true} />
      <div className={containerLogin}>
        {loading ? <CircularProgress className={progress} /> :
          <>
            <div className={title}>Login</div>
            <FormControl className={radio}>
              <FormLabel id="demo-row-radio-buttons-group-label" focused={false}>Logar como:</FormLabel>
              < RadioGroup
                row
                name="row-radio-buttons-group"
                value={CLIENT}
                onChange={event => handleChange(event, 'type')}
              >
                <FormControlLabel value="cliente" control={getRadio()} label="Cliente" />
                <FormControlLabel value="funcionario" control={getRadio()} label="Funcionário" />
              </RadioGroup >
            </FormControl >
            <div className={form}>
              <TextField className={field} id="text-field-email" variant="outlined" label="E-mail" onChange={event => handleChange(event, 'email')} />
              {loginInvalid ? <div>E-mail inválido</div> : <></>}
              <TextField type="password" className={field} id="text-field-password" variant="outlined" label="Senha" onChange={event => handleChange(event, 'password')} />
              <Button className={button} variant="contained" onClick={() => login()}>Entrar</Button>
            </div>
          </>
        }
      </div >
    </div >
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
    color: secondary,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 24,
  },
  radio: {
    width: 400,
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
