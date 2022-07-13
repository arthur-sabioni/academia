import React, { useState } from 'react';
import { useHttp } from '../../hooks';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Button, TextField, CircularProgress, ThemeProvider, Select, MenuItem } from '@mui/material';
import { requestConfigExercises, requestConfigConfirmExercises } from '../../Utils/requestsConfigs';
import Header from '../../components/Header/Header';
import { clientExercisesDefault, repetitions } from '../../Utils/constants';
import { useEffect } from 'react';

const Professor = () => {

  const theme = useTheme();

  const { register, client, title, fieldset, legend, fieldCpf, buttons, buttonsStart, button, forms, selects, exercise, repetition } = useStyles(theme);

  const { loading, error, data, sendRequest } = useHttp('');

  const [clientExercises, setClientExercises] = useState(clientExercisesDefault);
  const [allExercises, setAllExercises] = useState([]);
  const [cardSelected, setCardSelected] = useState("A");
  
  useEffect(() => {
    sendRequest(requestConfigExercises("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiQ1BGIjoiNTU4LjQ2Ni44MTYtODkiLCJ0eXBlIjoidGVhY2hlciIsImlhdCI6MTY1NzMwMjU4Nn0.aCj9pv9-0evn3iMrG0JiTcitafO1mLOQ0237cNc24uU"))
  }, [])

  useEffect(() => {
    if(!error && data.length)
      setAllExercises([...data, {id: '0', exercise: ''}])
  }, [data])

  let cardExercises = []
  let index=0;
  for(let i=0; i<clientExercises["exercicios"].length; i++){
    if(clientExercises["exercicios"][i]["card"] == cardSelected)
    {
      cardExercises[index] = {...clientExercises["exercicios"][i], index: index}
      index++
    }
  }

  const confirm = () => sendRequest(requestConfigConfirmExercises(clientExercises));

  const handleChange = (event, field) =>
    setClientExercises(currentPersonalData => ({
      ...currentPersonalData,
      [field]: field === 'birth' ? event : event.target.value,
    }));

  const handleCardChange = (card) => {
    setCardSelected(card)
  }

  const handleSelectChange = (index, fieldToChange) => (event) => {
    if(fieldToChange == "exercise")
      cardExercises = cardExercises.map(o => o["index"]==index ? {...o, id_exercicio: event.target.value} : o)
    else
      cardExercises = cardExercises.map(o => o["index"]==index ? {...o, repeticoes: event.target.value} : o)
    let indexToAlter = []
    if(cardSelected=="A") {
      indexToAlter = [0,1,2,3,4,5]
    } else if(cardSelected=="B") {
      indexToAlter = [6,7,8,9,10,11]
    } else {
      indexToAlter = [12,13,14,15,16,17]
    }
    let newClientExercises = clientExercises["exercicios"]
    for(let i=0; i<6; i++){
      newClientExercises[indexToAlter[i]] = cardExercises[i]
    }
    setClientExercises({...clientExercises, exercicios: newClientExercises})
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className={register}>
        {
          loading && allExercises.length ? <CircularProgress /> :
            <>
              <div className={title}>Treino</div>
              <fieldset className={fieldset}>
                <legend className={legend}>Cliente</legend>
                <div className={client}>
                  <TextField className={fieldCpf} variant="outlined" color="secondary" label="CPF" onChange={event => handleChange(event, 'CPF')} />
                </div>
              </fieldset>
              <fieldset className={fieldset}>
                <legend className={legend}>Exercícios</legend>
                <div className={forms}>
                  <div>Ficha: </div>
                  <div className={buttonsStart}>
                    {["A", "B", "C"].map(
                      o => 
                        <Button key={o} variant="contained" color="secondary" className={button} onClick={() => handleCardChange(o)} disabled={cardSelected==o}>
                          {o}
                        </Button>
                      )
                    }
                  </div>
                  <div className={selects}>
                    <div>Exercício</div><div>Repetições</div>
                  </div>
                  {cardExercises.map(
                    ex => 
                      <div key={ex["id"]} className={selects}>
                        <Select className={exercise} value={ex["id_exercicio"]} onChange={handleSelectChange(ex["index"], "exercise")}>
                          {allExercises.map(
                            all => 
                              <MenuItem value={all["id"]} key={all["id"]}>
                                {all["exercise"]}
                              </MenuItem>
                            )
                          }
                        </Select>
                        <Select className={repetition} value={ex["repeticoes"]} onChange={handleSelectChange(ex["index"], "repetition")}>
                          {repetitions.map(
                            rep => 
                              <MenuItem value={rep} key={rep}>
                                {rep}
                              </MenuItem>
                            )
                          }
                        </Select>
                      </div>
                    )
                  }
                </div>
              </fieldset>
              <div className={buttons}>
                <Button variant="contained" color="secondary" className={button} onClick={() => setClientExercises(clientExercisesDefault)}>Limpar</Button>
                <Button variant="contained" color="secondary" className={button} onClick={() => confirm()}>Confirmar</Button>
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
  forms: {
    display: 'grid',
    gridColumnGap: 32,
    gridRowGap: 24,
    padding: 32,
  },
  selects: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exercise: {
    flexGrow: 1,
    marginRight: '10px',
  },
  repetition: {
    width: '74px',
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

export default Professor;
