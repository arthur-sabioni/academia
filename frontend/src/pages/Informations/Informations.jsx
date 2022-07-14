import React, { useState, useContext, useEffect } from 'react';
import { useHttp } from '../../hooks';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Button, TextField, CircularProgress } from '@mui/material';
import { requestConfigExam, requestConfigTraining, requestConfigExercises } from '../../Utils/requestsConfigs';
import Header from '../../components/Header/Header';
import { examDefault } from '../../Utils/constants';
import GymContext from '../../context/GymContext';

const Informations = () => {

  const theme = useTheme();

  const { register, title, fieldset, legend } = useStyles(theme);

  const { loading, error, data, sendRequest } = useHttp('');

  const [clock, setClock] = useState(0);
  const [exam, setExam] = useState({});
  const [registrations, setRegistrations] = useState({});
  const [training, setTraining] = useState({});
  
  const context = useContext(GymContext);
  //const { token } = context;
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiQ1BGIjoiMDkyLjQwNy4wNDYtMzkiLCJ0eXBlIjoiY2xpZW50IiwiaWF0IjoxNjU3MzAxMTQyfQ.86y0y_nUGV8bBiRnvByzxaJV7_ENTFr0Cjm1jz-2O-g"

  console.log(exam, registrations, training)

  useEffect(() => {
    sendRequest(requestConfigExam(token));
  }, [])

  useEffect(() => {
    if(data.length) {
        if(clock === 0) {
            setExam(data)
            sendRequest(requestConfigExercises(token));
        } else if(clock === 1) {
            setRegistrations(data)
            sendRequest(requestConfigTraining(token));
        } else if(clock === 2) {
            setTraining(data)
        }
        setClock(clock + 1)
    }
  }, [data])

  return (
    <>
      <Header />
      <div className={register}>
        {
          loading ? <CircularProgress /> :
            <>
              <div className={title}>Dados do Cliente</div>
              <fieldset className={fieldset}>
                <legend className={legend}>Treino</legend>
              </fieldset>
              <fieldset className={fieldset}>
                <legend className={legend}>Exame</legend>
              </fieldset>
              <fieldset className={fieldset}>
                <legend className={legend}>Matrículas</legend>
              </fieldset>
            </>
        }
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
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
}));

export default Informations;
