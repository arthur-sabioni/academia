import React, { useState } from 'react';
import { useHttp } from '../../hooks';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Button, TextField, CircularProgress, Select, FormControlLabel, Radio, ThemeProvider } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { requestConfigRegister } from '../../Utils/requestsConfigs';
import Header from '../../components/Header/Header';
import { clientExercisesDefault } from '../../Utils/constants';

const Professor = () => {
  const exercises = {
    'back': ['Remada fechada', 'Remada aberta', 'Puchador fechado', 'Puchador aberto', 'Voador invertido'],
    'chest': ['Supino reto livre', 'Supino reto articulado', 'Supino inclinado', 'Voador'],
    'shoulder': ['Desenvolvimento articulado', 'Desenvolvimento com halteres', 'Levantamento lateral'],
    'arms': ['Bíceps cross over', 'Tríceps cross over', 'Rosca martelo', 'Tríceps haltere'],
    'legs': ['Leg press 180', 'Agachamento livre', 'Cadeira extensora', 'Cadeira flexora'],
    'core': ['Abdominal livre', 'Abdominal supra', 'Extensão', 'Prancha']
  }

  const theme = useTheme();

  const { register, client, title, fieldset, legend, radio, form, fieldName, fieldPhone, fieldCpf, fieldRg, fieldBirth, fieldEmail, button } = useStyles(theme);

  const { loading, error, data, sendRequest } = useHttp('');

  const [clientExercises, setClientExercises] = useState(clientExercisesDefault);

  const confirm = () => sendRequest(requestConfigRegister(clientExercises));

  const handleChange = (event, field) =>
    setClientExercises(currentPersonalData => ({
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
              <div className={title}>Treino</div>
              <fieldset className={fieldset}>
                <legend className={legend}>Cliente</legend>
                <div className={client}>
                  <TextField className={fieldCpf} variant="outlined" color="secondary" label="CPF" onChange={event => handleChange(event, 'cpf')} />
                </div>
              </fieldset>
              <fieldset className={fieldset}>
                <legend className={legend}>Exercícios</legend>
                <Select       
                  labelId="1"
                  id="1"
                  value={}
                  label="Área"
                  onChange={handleChange}
                >
                  {Object.keys(exercises).map()}
                </Select>
              </fieldset>
              <div className={button}>
                <Button variant="contained" color="secondary" onClick={() => confirm()}>Confirmar</Button>
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
  client: {
    display: 'grid',
    gridColumnGap: 32,
    gridRowGap: 24,
    padding: 32,
    gridTemplateAreas: `
      "field-cpf"
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

export default Professor;
