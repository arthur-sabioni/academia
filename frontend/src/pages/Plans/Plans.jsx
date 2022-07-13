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

  const { loading, data, sendRequest } = useHttp([]);

  useEffect(() => {
    sendRequest(requestConfigPlans());
  }, [])

  const getFormattedPrice = (paymentFrequency, price) => {
    let formattedPrice = `R$${price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    switch (paymentFrequency) {
      case 'Anual':
        return `12 parcelas de ${formattedPrice} `;
      case 'Semestral':
        return `6 parcelas de ${formattedPrice} `;
      default:
        return `1 parcela de ${formattedPrice} `;
    }
  };

  return (
    <>
      <Header />
      <Grid className={grid} container>
        {
          loading ? <CircularProgress /> :
            data.map(plan => (
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