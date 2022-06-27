import React, { useEffect } from "react";
import { useHttp } from "../../hooks";
import { Grid, Paper, makeStyles, CircularProgress } from "@material-ui/core";
import Header from "../../components/Header/Header";
import { requestConfigPlans } from '../../Utils/requestsConfigs';
import { secondary } from '../../Utils/colors';

const Plans = () => {
  const { container, grid, card, paper, progress } = useStyles();

  const { loading, error, data, sendRequest } = useHttp('');

  useEffect(() => {
    sendRequest(requestConfigPlans());
  }, [])

  const plans = [
    {
      modality: 'Musculação',
      paymentFrequencies: [
        {
          paymentFrequency: 'Mensal',
          trainingFrequencies: [
            {
              trainingFrequency: '7x semana',
              price: 'R$125,00',
            }
          ],
        },
        {
          paymentFrequency: 'Semestral',
          trainingFrequencies: [
            {
              trainingFrequency: '7x semana',
              price: '6x R$112,50',
            }
          ],
        },
        {
          paymentFrequency: 'Anual',
          trainingFrequencies: [
            {
              trainingFrequency: '7x semana',
              price: '12x R$106,25',
            }
          ],
        }
      ],
    },
    {
      modality: 'Natação',
      paymentFrequencies: [
        {
          paymentFrequency: 'Mensal',
          trainingFrequencies: [
            {
              trainingFrequency: '2x semana',
              price: 'R$215,00',
            },
            {
              trainingFrequency: '3x semana',
              price: 'R$229,00',
            }
          ],
        },
        {
          paymentFrequency: 'Semestral',
          trainingFrequencies: [
            {
              trainingFrequency: '2x semana',
              price: '6x R$193,50',
            },
            {
              trainingFrequency: '3x semana',
              price: '6x R$206,10',
            }
          ],
        },
        {
          paymentFrequency: 'Anual',
          trainingFrequencies: [
            {
              trainingFrequency: '2x semana',
              price: '12x R$182,75',
            },
            {
              trainingFrequency: '3x semana',
              price: '12x R$189,00',
            }
          ],
        }
      ],
    },
    {
      modality: 'Spinning, Crossfit, Ritmos',
      paymentFrequencies: [
        {
          paymentFrequency: 'Mensal',
          trainingFrequencies: [
            {
              trainingFrequency: '3x semana',
              price: 'R$155,00',
            },
          ],
        },
        {
          paymentFrequency: 'Semestral',
          trainingFrequencies: [
            {
              trainingFrequency: '3x semana',
              price: '6x R$139,00',
            },
          ],
        },
        {
          paymentFrequency: 'Anual',
          trainingFrequencies: [
            {
              trainingFrequency: '3x semana',
              price: '12x R$130,00',
            },
          ],
        }
      ],
    },
  ];

  return (
    <div className={container}>
      <Header />
      <Grid className={grid} container>
        {
          loading ? <CircularProgress className={progress} /> :
            plans.map(plan => (
              <Grid className={card} item xs={4}>
                <Paper className={paper} elevation={6}>
                  <div>{plan.modality}</div>
                  {plan.paymentFrequencies.map(t => (
                    <>
                      <div>{t.paymentFrequency}</div>
                      {
                        t.trainingFrequencies.map(c => (
                          <>
                            <div>{c.trainingFrequency}</div>
                            <div>{c.price}</div>
                          </>
                        ))
                      }
                    </>
                  ))}
                </Paper>
              </Grid>
            ))
        }
      </Grid>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  grid: {
    flexGrow: 1,
    flexBasis: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: 400,
    padding: 32,
  },
  paper: {
    height: '100%',
    textAlign: 'center',
  },
  progress: {
    color: secondary,
  },
});

export default Plans;