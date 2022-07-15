import React, { useContext, useState } from 'react';
import { useHttp } from '../../hooks';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Button, TextField, CircularProgress, RadioGroup, FormControlLabel, Radio, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { requestConfigRegister } from '../../Utils/requestsConfigs';
import Header from '../../components/Header/Header';
import GymContext from '../../context/GymContext';

const Register = () => {
  const theme = useTheme();

  const { register, title, fieldset, legend, radio, formPersonal, formPayment, fieldName, fieldPhone, fieldCpf, fieldRg, fieldBirth, fieldEmail, fieldCardNumber, fieldFlag, fieldOwnerName, button } = useStyles(theme);

  const context = useContext(GymContext);
  const { token } = context;

  const { loading, sendRequest } = useHttp('');

  const [personalData, setPersonalData] = useState({
    type: 'client',
    name: '',
    CPF: '',
    RG: '',
    birth: null,
    fone: '',
    email: '',
    cardNumber: '',
    flag: '',
    ownerName: '',
  });

  const flagsOptions = ['Visa', 'MasterCard', 'Elo', 'Hipercard'];

  const registrar = () => sendRequest(requestConfigRegister(token, personalData));

  const handleChange = (event, field) =>
    setPersonalData(currentPersonalData => ({
      ...currentPersonalData,
      [field]: field === 'birth' ? event : event.target.value,
    }));

  const getRadio = () => <Radio color="secondary" />;

  return (
    <>
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
                  <FormControlLabel value="client" control={getRadio()} label="Cliente" />
                  <FormControlLabel value="secretary" control={getRadio()} label="Secretária" />
                  <FormControlLabel value="teacher" control={getRadio()} label="Professor" />
                  <FormControlLabel value="doctor" control={getRadio()} label="Médico" />
                </RadioGroup >
              </fieldset>
              <fieldset className={fieldset}>
                <legend className={legend}>Dados pessoais</legend>
                <div className={formPersonal}>
                  <TextField className={fieldName} variant="outlined" color="secondary" label="Nome" onChange={event => handleChange(event, 'name')} />
                  <TextField className={fieldCpf} variant="outlined" color="secondary" label="CPF" onChange={event => handleChange(event, 'CPF')} />
                  <TextField className={fieldRg} variant="outlined" color="secondary" label="RG" onChange={event => handleChange(event, 'RG')} />
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
                  <TextField className={fieldPhone} variant="outlined" color="secondary" label="Celular" onChange={event => handleChange(event, 'fone')} />
                  <TextField className={fieldEmail} variant="outlined" color="secondary" label="E-mail" onChange={event => handleChange(event, 'email')} />
                </div>
              </fieldset>
              <fieldset className={fieldset}>
                <legend className={legend}>Dados de pagamento</legend>
                <div className={formPayment}>
                  <TextField className={fieldCardNumber} variant="outlined" color="secondary" label="Número do cartão" onChange={event => handleChange(event, 'cardNumber')} />
                  <FormControl className={fieldFlag} variant="outlined" color="secondary">
                    <InputLabel>Bandeira</InputLabel>
                    <Select
                      id="flag"
                      label="Bandeira"
                      value={personalData.flag}
                      onChange={event => handleChange(event, 'flag')}
                    >
                      {flagsOptions.map(flag => <MenuItem value={flag}>{flag}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <TextField className={fieldOwnerName} variant="outlined" color="secondary" label="Nome do titular" onChange={event => handleChange(event, 'ownerName')} />
                </div>
              </fieldset>
              <div className={button}>
                <Button variant="contained" color="secondary" onClick={() => registrar()}>Cadastrar</Button>
              </div>
            </>
        }
      </div>
    </>
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
    fontFamily: 'Quantico',
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
  formPersonal: {
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
  formPayment: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: 32,
    gridRowGap: 24,
    padding: 32,
    gridTemplateAreas: `
      "field-ownerName field-cardNumber"
      "field-flag ."
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
  fieldCardNumber: {
    gridArea: "field-cardNumber",
  },
  fieldFlag: {
    gridArea: "field-flag",
  },
  fieldOwnerName: {
    gridArea: "field-ownerName",
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default Register;
