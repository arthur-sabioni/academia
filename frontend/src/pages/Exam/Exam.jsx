import React, { useState, useContext } from 'react';
import { useHttp } from '../../hooks';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Button, TextField, CircularProgress, Checkbox, FormControlLabel } from '@mui/material';
import { requestConfigConfirmExam } from '../../Utils/requestsConfigs';
import Header from '../../components/Header/Header';
import { examDefault } from '../../Utils/constants';
import GymContext from '../../context/GymContext';

const Exam = () => {

  const theme = useTheme();

  const { register, client, title, fieldset, legend, fieldCpf, buttons, fieldWeight, fieldHeight, fieldPressure, fieldFat, fieldLeanMass, fieldIMC, button, examClass, fieldCheckbox } = useStyles(theme);

  const { loading, error, data, sendRequest } = useHttp('');

  const [exam, setExam] = useState(examDefault);
  
  const context = useContext(GymContext);
  const { token } = context;

  const examToRequest = {
    ...exam,
    weight: parseFloat(exam["weight"]),
    height: parseFloat(exam["height"]),
    fat: parseFloat(exam["fat"]),
    leanMass: parseFloat(exam["leanMass"]),
    IMC: parseFloat(exam["IMC"]),
  }

  const confirm = () => sendRequest(requestConfigConfirmExam(token, examToRequest));

  const handleChange = (event, field) =>
    setExam(currentPersonalData => ({
      ...currentPersonalData,
      [field]: field === 'birth' ? event : event.target.value,
    }));

  const handleCheckboxChange = () => {
    setExam(currentExam => ({
      ...currentExam,
      able: !currentExam["able"]
    }))
  }

  return (
    <>
      <Header />
      <div className={register}>
        {
          loading ? <CircularProgress /> :
            <>
              <div className={title}>Exame Médico</div>
              <fieldset className={fieldset}>
                <legend className={legend}>Cliente</legend>
                <div className={client}>
                  <TextField className={fieldCpf} variant="outlined" color="secondary" label="CPF" value={exam["CPF"]} onChange={event => handleChange(event, 'CPF')} />
                </div>
              </fieldset>
              <fieldset className={fieldset}>
                <legend className={legend}>Exame</legend>
                <div className={examClass}>
                  <TextField className={fieldWeight} value={exam["weight"]} variant="outlined" color="secondary" label="peso (kg)" type="number" onChange={event => handleChange(event, 'weight')}/>
                  <TextField className={fieldHeight} value={exam["height"]} variant="outlined" color="secondary" label="altura (m)" type="number" onChange={event => handleChange(event, 'height')}/>
                  <TextField className={fieldPressure} value={exam["pressure"]} variant="outlined" color="secondary" label="pressão" onChange={event => handleChange(event, 'pressure')}/>
                  <TextField className={fieldFat} value={exam["fat"]} variant="outlined" color="secondary" label="gordura (kg)" type="number" onChange={event => handleChange(event, 'fat')}/>
                  <TextField className={fieldLeanMass} value={exam["leanMass"]} variant="outlined" color="secondary" label="massa magra (kg)" type="number" onChange={event => handleChange(event, 'leanMass')}/>
                  <TextField className={fieldIMC} value={exam["IMC"]} variant="outlined" color="secondary" label="IMC" type="number" onChange={event => handleChange(event, 'IMC')}/>
                  <FormControlLabel className={fieldCheckbox} control={<Checkbox checked={exam["able"]} onChange={handleCheckboxChange}/>} label="apto a realizar atividade física" />
                </div>
              </fieldset>
              <div className={buttons}>
                <Button variant="contained" color="secondary" className={button} onClick={() => setExam(examDefault)}>Limpar</Button>
                <Button variant="contained" color="secondary" className={button} onClick={() => confirm()}>Confirmar</Button>
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
  forms: {
    display: 'grid',
    gridColumnGap: 32,
    gridRowGap: 24,
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
  examClass: {
    display: 'grid',
    gridColumnGap: 32,
    gridRowGap: 24,
    padding: 32,
    gridTemplateAreas: `
    "field-weight field-height field-pressure"
    "field-fat field-leanMass field-IMC"
    "field-checkbox field-checkbox field-checkbox"
  `,
  },
  fieldWeight: {
    gridArea: "field-weight",
  },
  fieldHeight: {
    gridArea: "field-height",
  },
  fieldPressure: {
    gridArea: "field-pressure",
  },
  fieldFat: {
    gridArea: "field-fat",
  },
  fieldLeanMass: {
    gridArea: "field-leanMass",
  },
  fieldIMC: {
    gridArea: "field-IMC",
  },
  fieldCheckbox: {
    gridArea: "field-checkbox"
  },
  fieldCpf: {
    gridArea: "field-cpf",
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  buttonsStart: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  button: {
    margin: '0 5px !important',
  }
}));

export default Exam;
