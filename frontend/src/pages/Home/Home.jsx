import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import Header from '../../components/Header/Header';

const Home = () => {
  const theme = useTheme();

  const { home, content, title, subtitle } = useStyles(theme);

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className={home}>
        <img alt="Logo da academia" src="iconeacademia.png" height="256" width="256" />
        <div className={content}>
          <div className={title}>Academia</div>
          <div className={subtitle}>Bora ficar monstros?</div>
          <Button variant="contained" onClick={() => navigate('plans')}>Ver planos</Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  home: {
    flexGrow: 1,
    flexBasis: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: 40,
    paddingLeft: 128,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.thirdy.light,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    fontSize: 24,
  },
  title: {
    fontSize: 56,
    fontFamily: 'Quantico',
    fontStyle: 'italic',
  },
  subtitle:{
    fontFamily: 'Quantico',
    fontStyle: 'italic',
  },
}));

export default Home;
