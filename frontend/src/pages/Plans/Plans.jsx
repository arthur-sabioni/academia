import React, { useEffect } from "react";
import { useHttp } from "../../hooks";
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Grid, Paper, CircularProgress } from "@mui/material";
import Header from "../../components/Header/Header";
import { requestConfigPlans } from '../../Utils/requestsConfigs';

const Plans = () => {
  const theme = useTheme();

  const { grid, card, paper, modality, paymentFrequencies, trainingFrequencies } = useStyles(theme);

  const { loading, error, data, sendRequest } = useHttp([]);

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
              trainingFrequency: '7',
              price: '125,00',
            }
          ],
        },
        {
          paymentFrequency: 'Semestral',
          trainingFrequencies: [
            {
              trainingFrequency: '7',
              price: '112,50',
            }
          ],
        },
        {
          paymentFrequency: 'Anual',
          trainingFrequencies: [
            {
              trainingFrequency: '7',
              price: '106,25',
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
              trainingFrequency: '2',
              price: '215,00',
            },
            {
              trainingFrequency: '3',
              price: '229,00',
            }
          ],
        },
        {
          paymentFrequency: 'Semestral',
          trainingFrequencies: [
            {
              trainingFrequency: '2',
              price: '193,50',
            },
            {
              trainingFrequency: '3',
              price: '206,10',
            }
          ],
        },
        {
          paymentFrequency: 'Anual',
          trainingFrequencies: [
            {
              trainingFrequency: '2',
              price: '182,75',
            },
            {
              trainingFrequency: '3',
              price: '189,00',
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
              trainingFrequency: '3',
              price: '155,00',
            },
          ],
        },
        {
          paymentFrequency: 'Semestral',
          trainingFrequencies: [
            {
              trainingFrequency: '3',
              price: '139,00',
            },
          ],
        },
        {
          paymentFrequency: 'Anual',
          trainingFrequencies: [
            {
              trainingFrequency: '3',
              price: '130,00',
            },
          ],
        }
      ],
    },
  ];

  const getFormattedPrice = (paymentFrequency, price) => {
    let formattedPrice = `R$${price}`;
    switch (paymentFrequency) {
      case 'Anual':
        return `12 parcelas de ${formattedPrice}`;
      case 'Semestral':
        return `6 parcelas de ${formattedPrice}`;
      default:
        return `1 parcela de ${formattedPrice}`;
    }
  };

  return (
    <>
      <Header />
      <Grid className={grid} container>
        {
          loading ? <CircularProgress /> :
            plans.map(plan => (
              <Grid className={card} item xs={4}>
                <Paper className={paper} elevation={6}>
                  <div className={modality}>{plan.modality}</div>
                  {plan.paymentFrequencies.map(t => (
                    <div className={paymentFrequencies}>
                      <div>{t.paymentFrequency}</div>
                      {
                        t.trainingFrequencies.map(c => (
                          <div className={trainingFrequencies}>
                            <div>{`${c.trainingFrequency}x na semana`}</div>
                            <div>{getFormattedPrice(t.paymentFrequency, c.price)}</div>
                          </div>
                        ))
                      }
                    </div>
                  ))}
                </Paper>
              </Grid>
            ))
        }
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
    flexBasis: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: 500,
    padding: 32,
  },
  paper: {
    height: '100%',
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modality: {
    fontSize: 24,
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  paymentFrequencies: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 24,
    fontWeight: 500,
  },
  trainingFrequencies: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 2,
    marginTop: 8,
    fontWeight: 300,
  },
}));

export default Plans;