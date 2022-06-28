import React, { useState } from 'react';
import { useHttp } from '../../hooks';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Button, TextField, CircularProgress, RadioGroup, FormControlLabel, Radio, ThemeProvider } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { requestConfigRegister } from '../../Utils/requestsConfigs';
import Header from '../../components/Header/Header';

const Register = () => {
  const theme = useTheme();

  const { register, title, fieldset, legend, radio, form, fieldName, fieldPhone, fieldCpf, fieldRg, fieldBirth, fieldEmail, button } = useStyles(theme);

  const { loading, error, data, sendRequest } = useHttp('');

  const [personalData, setPersonalData] = useState({
    type: 'cliente',
    name: '',
    cpf: '',
    rg: '',
    birth: null,
    email: '',
    phone: '',
  });

  const registrar = () => sendRequest(requestConfigRegister(personalData));

  const handleChange = (event, field) =>
    setPersonalData(currentPersonalData => ({
      ...currentPersonalData,
      [field]: field === 'birth' ? event : event.target.value,
    }));

  const getRadio = () => <Radio color="secondary" />;

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className={register}>
        {
          loading ? <CircularProgress /> :
            <>
              <div className={title}>Cadastro</div>
              <fieldset className={fieldset}>
                <legend className={legend}>Tipo de usuário</legend>
                <RadioGroup
                  row
                  className={radio}
                  value={personalData.type}
                  onChange={event => handleChange(event, 'type')}
                >
                  <FormControlLabel value="cliente" control={getRadio()} label="Cliente" />
                  <FormControlLabel value="secretaria" control={getRadio()} label="Secretária" />
                  <FormControlLabel value="professor" control={getRadio()} label="Professor" />
                  <FormControlLabel value="medico" control={getRadio()} label="Médico" />
                </RadioGroup >
              </fieldset>
              <fieldset className={fieldset}>
                <legend className={legend}>Dados pessoais</legend>
                <div className={form}>
                  <TextField className={fieldName} variant="outlined" color="secondary" label="Nome" onChange={event => handleChange(event, 'name')} />
                  <TextField className={fieldCpf} variant="outlined" color="secondary" label="CPF" onChange={event => handleChange(event, 'cpf')} />
                  <TextField className={fieldRg} variant="outlined" color="secondary" label="RG" onChange={event => handleChange(event, 'rg')} />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Data de Nascimento"
                      inputFormat="dd/MM/yyyy"
                      maxDate={new Date()}
                      value={personalData.birth}
                      onChange={newDate => handleChange(newDate, 'birth')}
                      renderInput={(params) => <TextField className={fieldBirth} variant="outlined" color="secondary" {...params} />}
                    />
                  </LocalizationProvider>
                  <TextField className={fieldPhone} variant="outlined" color="secondary" label="Celular" onChange={event => handleChange(event, 'phone')} />
                  <TextField className={fieldEmail} variant="outlined" color="secondary" label="E-mail" onChange={event => handleChange(event, 'email')} />
                </div>
              </fieldset>
              <div className={button}>
                <Button variant="contained" color="secondary" onClick={() => registrar()}>Cadastrar</Button>
              </div>
            </>
        }
      </div>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  register: {
    padding: '40px 64px',
    flexGrow: 1,
    flexBasis: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 48,
  },
  title: {
    fontSize: 32,
  },
  fieldset: {
    borderRadius: 8,
    border: `solid 2px ${theme.palette.secondary.dark}`,
  },
  legend: {
    padding: '0 10px',
  },
  radio: {
    padding: 32,
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 0.5fr 0.5fr',
    gridColumnGap: 32,
    gridRowGap: 24,
    padding: 32,
    gridTemplateAreas: `
      "field-name field-name field-birth"
      "field-cpf field-rg field-rg"
      "field-email field-email field-phone"
    `,
  },
  fieldName: {
    gridArea: "field-name",
  },
  fieldCpf: {
    gridArea: "field-cpf",
  },
  fieldRg: {
    gridArea: "field-rg",
  },
  fieldBirth: {
    gridArea: "field-birth",
  },
  fieldPhone: {
    gridArea: "field-phone",
  },
  fieldEmail: {
    gridArea: "field-email",
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default Register;
