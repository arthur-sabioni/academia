import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../../hooks';
import { Button, TextField, CircularProgress, FormControl, Select, MenuItem, InputLabel, OutlinedInput, Checkbox, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { requestConfigPlans, requestConfigClasses, requestConfigMatriculation, requestConfigSecretaryExam } from '../../Utils/requestsConfigs';
import Header from '../../components/Header/Header';
import GymContext from '../../context/GymContext';
import { plans, classes } from "../../Utils/mocksApi";

const Matriculation = () => {
  const theme = useTheme();

  const { login, title, form, input, divisory, error } = useStyles(theme);

  const context = useContext(GymContext);
  const { token } = context;

  const { loading: loadingPlans, data: data1, sendRequest: sendRequestPlans } = useHttp();
  const { loading: loadingClasses, data: data2, sendRequest: sendRequestClasses } = useHttp();
  const { loading: loadingMatriculation, data: matriculation, sendRequest: sendRequestMatriculation } = useHttp();
  const { loading: loadingExam, error: examError, data: exam, sendRequest: sendRequestExam } = useHttp();

  const loading = loadingPlans || loadingClasses || loadingMatriculation || loadingExam;

  useEffect(() => {
    //sendRequestPlans(requestConfigPlans());
    //sendRequestClasses(requestConfigClasses(token));
  }, [])

  useEffect(() => {
    console.log(exam)
    if(exam)
      setAble(exam["able"]);
  }, [exam])

  const plansOptions = ['Anual', 'Semestral', 'Mensal'];

  const [plansFiltered, setPlansFiltered] = useState(plans);
  const [modalities, setModalities] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [times, setTimes] = useState([]);
  const [able, setAble] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const [matriculationData, setMatriculationData] = useState({
    CPF: '',
    plan: '',
    modality: '',
    frequency: '',
    schemeId: null,
    timeId: [],
  });

  const getFormattedDayTime = (day, time) => {
    let timeApart = time.split(':');
    return `${day} ${timeApart[0]}:${timeApart[1]}`;
  };

  const filterModalities = plan => {
    const newModalities = [];
    const filterPaymentFrequencies = plans.map(p => ({
      ...p,
      paymentFrequencies: p.paymentFrequencies.filter(pf => pf.paymentFrequency === plan)
    }));
    filterPaymentFrequencies.forEach(f => {
      const modalities = f.modality.split(', ');
      modalities.forEach(m => newModalities.push(m));
    });
    setPlansFiltered(filterPaymentFrequencies);
    setModalities(newModalities);
  };

  const filterFrequencies = modality => {
    const filterModality = plansFiltered.find(p => p.modality.split(', ').includes(modality));
    const newFrequencies = [...filterModality.paymentFrequencies[0].trainingFrequencies];
    setFrequencies(newFrequencies);
  };

  const filterTimes = modality => {
    const classFiltered = classes.find(c => c.modality === modality);
    setTimes([...classFiltered.days]);
  };

  const matriculate = () => { 
    sendRequestMatriculation(requestConfigMatriculation(token, matriculationData)); 
  }

  const handleChange = (event, field) => {
    setMatriculationData(currentMatriculationData => ({
      ...currentMatriculationData,
      [field]: event.target.value,
    }));

    if (field === 'plan') {
      filterModalities(event.target.value);
      setMatriculationData(currentMatriculationData => ({
        ...currentMatriculationData,
        modality: '',
        frequency: '',
        schemeId: null,
        timeId: [],
      }));
      setSelectedTimes([]);
    } else if (field === 'modality') {
      filterFrequencies(event.target.value);
      filterTimes(event.target.value);
      setMatriculationData(currentMatriculationData => ({
        ...currentMatriculationData,
        frequency: '',
        schemeId: null,
        timeId: [],
      }));
      setSelectedTimes([]);
    } else if (field === 'frequency') {
      setMatriculationData(currentMatriculationData => ({
        ...currentMatriculationData,
        schemeId: frequencies.find(f => f.trainingFrequency === currentMatriculationData.frequency).id,
        timeId: [],
      }));
      setSelectedTimes([]);
    } else if (field === "CPF") {
      setAble(false)
    }
  }

  const handleSearchExam = () => {
    const body = {
      "CPF": matriculationData["CPF"],
    };
    sendRequestExam(requestConfigSecretaryExam(token, body));
  }

  console.log(examError)

  const handleChangeTimes = event => {
    const newSelectedTimes = [...event.target.value];
    if (newSelectedTimes.length <= matriculationData.frequency) {
      setSelectedTimes(newSelectedTimes);
      setMatriculationData(currentMatriculationData => ({
        ...currentMatriculationData,
        timeId: newSelectedTimes.map(s => s.id),
      }));
    }
  }

  return (
    <>
      <Header />
      <div className={login}>
        {loading ? <CircularProgress /> :
          <>
            <div className={title}>Matrícula</div>
            <hr className={divisory}/>
            <FormControl className={form}>
              <TextField variant="outlined" color="secondary" label="CPF" value={matriculationData["CPF"]} error={examError} onChange={event => handleChange(event, 'CPF')} />
              {examError && <div className={error}>Aluno sem exame médico ou não encontrado</div>}
              <Button variant="contained" color="secondary" onClick={() => handleSearchExam()}>Buscar Exame</Button>
              <FormControl variant="outlined" color="secondary">
                <InputLabel>Plano</InputLabel>
                <Select
                  id="plan"
                  label="Plano"
                  value={matriculationData.plan}
                  onChange={event => handleChange(event, 'plan')}
                >
                  {plansOptions.map(plan => <MenuItem value={plan}>{plan}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl variant="outlined" color="secondary" disabled={matriculationData.plan === ''}>
                <InputLabel>Modalidade</InputLabel>
                <Select
                  id="modality"
                  label="Modalidade"
                  value={matriculationData.modality}
                  onChange={event => handleChange(event, 'modality')}
                >
                  {modalities.map(modality => <MenuItem value={modality}>{modality}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl variant="outlined" color="secondary" disabled={matriculationData.modality === ''}>
                <InputLabel>Frequência</InputLabel>
                <Select
                  id="frequency"
                  label="Frequência"
                  value={matriculationData.frequency}
                  onChange={event => handleChange(event, 'frequency')}
                >
                  {frequencies.map(frequency => <MenuItem value={frequency.trainingFrequency}>{`${frequency.trainingFrequency}x na semana`}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl variant="outlined" color="secondary" disabled={matriculationData.frequency === ''}>
                <InputLabel>Horários</InputLabel>
                <Select
                  id="times"
                  multiple
                  label="Horários"
                  input={<OutlinedInput label="Horários" />}
                  value={selectedTimes}
                  renderValue={selected => selected.map(s => getFormattedDayTime(s.weekDay, s.time)).join(', ')}
                  onChange={event => handleChangeTimes(event)}
                >
                  {times.map(t => {
                    const time = getFormattedDayTime(t.weekDay, t.time);
                    return (
                      <MenuItem key={time} value={t}>
                        <Checkbox checked={selectedTimes.includes(t)} variant="outlined" color="secondary" />
                        <ListItemText primary={time} />
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
              <Button variant="contained" color="secondary" onClick={() => matriculate() }  disabled={!able}>Finalizar</Button>
            </FormControl>
          </>
        }
      </div >
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
  },
  login: {
    flexGrow: 1,
    flexBasis: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 28,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Quantico',
  },
  form: {
    alignItems: 'flex-end',
    gap: 24,
  },
  input: {
    width: 400,
  },
  divisory: {
    width: 450,
    padding: 0,
    margin: 0,
  },
}))

export default Matriculation;
