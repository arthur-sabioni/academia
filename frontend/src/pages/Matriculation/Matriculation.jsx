import React, { useEffect, useState } from 'react';
import { useHttp } from '../../hooks';
import { Button, TextField, CircularProgress, FormControl, Select, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { requestConfigPlans, requestConfigClasses, requestConfigMatriculation } from '../../Utils/requestsConfigs';
import Header from '../../components/Header/Header';

const Matriculation = () => {
  const theme = useTheme();

  const { login, title, form } = useStyles(theme);

  const { loading: loadingPlans, data: plans, sendRequest: sendRequestPlans } = useHttp();
  const { loading: loadingClasses, data: classes, sendRequest: sendRequestClasses } = useHttp();
  const { loading: loadingMatriculation, data: matriculation, sendRequest: sendRequestMatriculation } = useHttp();

  const loading = loadingPlans && loadingClasses;

  useEffect(() => {
    sendRequestPlans(requestConfigPlans());
    sendRequestClasses(requestConfigClasses())
  }, [])

  const plansOptions = ['Anual', 'Semestral', 'Mensal'];

  const [plansFiltered, setPlansFiltered] = useState(plans);
  const [modalities, setModalities] = useState([]);
  const [frequencies, setFrequencies] = useState([]);

  const [matriculationData, setMatriculationData] = useState({
    cpf: '',
    plan: '',
    modality: '',
    frequency: '',
  });

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
    console.log(modality, plansFiltered);
    const filterModality = plansFiltered.filter(p => p.modality.includes(modality));
    const newFrequencies = filterModality[0].paymentFrequencies[0].trainingFrequencies.map(t => t.trainingFrequency);
    setFrequencies(newFrequencies);
  };

  const matriculate = () => sendRequestMatriculation(requestConfigMatriculation(matriculationData));

  const handleChange = (event, field) => {
    setMatriculationData(currentMatriculationData => ({
      ...currentMatriculationData,
      [field]: event.target.value,
    }));

    if (field === 'plan') {
      filterModalities(event.target.value);
    } else if (field === 'modality') {
      filterFrequencies(event.target.value);
    }
  }

  return (
    <>
      <Header />
      <div className={login}>
        {loading ? <CircularProgress /> :
          <>
            <div className={title}>Matrícula</div>
            <FormControl className={form}>
              <TextField variant="outlined" color="secondary" label="CPF" onChange={event => handleChange(event, 'cpf')} />
              <Select
                id="plan"
                label="Plano"
                value={matriculationData.plan}
                onChange={event => handleChange(event, 'plan')}
              >
                <MenuItem value="">
                  <em>Selecionar</em>
                </MenuItem>
                {plansOptions.map(plan => <MenuItem value={plan}>{plan}</MenuItem>)}
              </Select>
              <Select
                id="modality"
                label="Modalidade"
                value={matriculationData.modality}
                onChange={event => handleChange(event, 'modality')}
              >
                <MenuItem value="">
                  <em>Selecionar</em>
                </MenuItem>
                {modalities.map(modality => <MenuItem value={modality}>{modality}</MenuItem>)}
              </Select>
              <Select
                id="frequency"
                label="Frequência"
                value={matriculationData.frequency}
                onChange={event => handleChange(event, 'frequency')}
              >
                <MenuItem value="">
                  <em>Selecionar</em>
                </MenuItem>
                {frequencies.map(frequency => <MenuItem value={frequency}>{`${frequency}x na semana`}</MenuItem>)}
              </Select>
              <Button variant="contained" color="secondary" onClick={() => matriculate()}>Finalizar</Button>
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

export default Matriculation;
