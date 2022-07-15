import React, { useState, useContext, useEffect } from 'react';
import { useHttp } from '../../hooks';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { requestConfigExam, requestConfigTraining, requestConfigRegistrations } from '../../Utils/requestsConfigs';
import Header from '../../components/Header/Header';
import GymContext from '../../context/GymContext';

const Informations = () => {

  const theme = useTheme();

  const { register, title, fieldset, legend } = useStyles(theme);

  const { loading, error, data, sendRequest } = useHttp('');

  const [clock, setClock] = useState(0);
  const [exam, setExam] = useState({});
  const [registrations, setRegistrations] = useState({});
  const [training, setTraining] = useState({});

  let trainingTranslated = []
  let groupMuscles = Object.entries(training).map(values => (
    values[1]
  ))
  for(let i=0; i<groupMuscles.length; i++) {
    let keys = Object.keys(groupMuscles[i])
    for(let j=0; j<keys.length; j++) {
      trainingTranslated.push("Exercício: " + groupMuscles[i][keys[j]]["exercise"] + ", repetições: " + groupMuscles[i][keys[j]]["repetitions"] + ", ficha: " + groupMuscles[i][keys[j]]["card"])
    }
  }

  let examTranslated = []
  if(exam) {
    examTranslated.push("Peso: " + exam["weight"] + " Kg")
    examTranslated.push("Altura: " + exam["height"] + " m")
    examTranslated.push("Pressão: " + exam["pressure"])
    examTranslated.push("Gordura: " + exam["fat"] + " Kg")
    examTranslated.push("Massa Magra: " + exam["leanMass"] + " Kg")
    examTranslated.push("Apto a treinar? " + (exam["able"] ? "Sim" : "Não"))
  }

  let registrationsTranslated = []
  if(registrations) {
    let keys = Object.keys(registrations)
    for(let i=0; i<keys.length; i++) {
      for(let j=0; j<registrations[keys[i]].length; j++) {
        registrationsTranslated.push("Modalidade: " + keys[i] + ", dia: " + registrations[keys[i]][j]["weekDay"] + ", hora: " + registrations[keys[i]][j]["time"].slice(0,5))
      }
    }
  }

  console.log(registrations)

  const context = useContext(GymContext);
  const { token } = context;

  useEffect(() => {
    sendRequest(requestConfigExam(token));
  }, [])

  useEffect(() => {
    if(data) {
        if(clock == 1) {
            setExam(data)
            sendRequest(requestConfigRegistrations(token));
        } else if(clock == 2) {
            setRegistrations(data)
            sendRequest(requestConfigTraining(token));
        } else if(clock == 3) {
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
                  {trainingTranslated.map(key => (
                    <div>
                      {key}
                    </div>
                  ))}
              </fieldset>
              <fieldset className={fieldset}>
                <legend className={legend}>Exame</legend>
                <div>
                  {examTranslated.map(key => (
                    <div>
                      {key}
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset className={fieldset}>
                <legend className={legend}>Matrículas</legend>
                <div>
                  {registrationsTranslated.map(key => (
                    <div>
                      {key}
                    </div>
                  ))}
                </div>
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
