
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ContextProvider from './context/ContextProvider';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Plans from './pages/Plans/Plans';
import Classes from './pages/Classes/Classes';
import Matriculation from './pages/Matriculation/Matriculation';
import Exam from './pages/Exam/Exam';
import Training from './pages/Training/Training';
import Informations from './pages/Informations/Informations';
import { background, primary, secondary, thirdy } from './Utils/colors';
import './App.css';

const theme = createTheme({
  palette: {
    background: {
      default: background.main,
    },
    primary: {
      main: primary.main,
      light: primary.light,
      dark: primary.dark,
      contrastText: secondary.dark,
    },
    secondary: {
      main: secondary.main,
      light: secondary.light,
      dark: secondary.dark,
      contrastText: background.main,
    },
    thirdy: {
      main: thirdy.main,
      light: thirdy.light,
      dark: thirdy.dark,
    },
  },
  components: {
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          margin: 'auto',
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            width: 'fit-content',
            padding: '8px 16px',
            borderRadius: 8,
            fontFamily: 'Segoe UI'
          },
        },
      ],
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          minWidth: 400,
        },
      },
    },
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          color: secondary.dark,
          backgroundColor: background.light,
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: secondary.dark,
          backgroundColor: background.light,

          '&.Mui-selected': {
            backgroundColor: thirdy.light,
          },
          '&.Mui-hover': {
            backgroundColor: thirdy.light,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: secondary.dark,
          backgroundColor: background.light,
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.background.default,
  },
}));

function AppContent() {
  const { root } = useStyles();
  return <div className={root}>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/plans' element={<Plans />} />
          <Route path='/classes' element={<Classes />} />
          <Route path='/matriculation' element={<Matriculation />} />
          <Route path='/exam' element={<Exam />} />
          <Route path='/training' element={<Training />} />
          <Route path='/informations' element={<Informations />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  </div>;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
