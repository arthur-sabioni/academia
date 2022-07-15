import React, { useContext, useEffect } from "react";
import { useHttp } from "../../hooks";
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Paper, CircularProgress, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Header from "../../components/Header/Header";
import { requestConfigClasses } from '../../Utils/requestsConfigs';
import GymContext from "../../context/GymContext";
import { classes } from "../../Utils/mocksApi";

const Gangs = () => {
  const theme = useTheme();

  const { title, disabled, enabled, top } = useStyles(theme);

  const context = useContext(GymContext);
  const { token } = context;

  const { loading, data, sendRequest } = useHttp([]);

  useEffect(() => {
    //sendRequest(requestConfigClasses(token));
  }, [])

  const days = ['', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const schedules = ['06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:15', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00',];

  const getFormattedTime = time => {
    let timeApart = time.split(':');
    return `${timeApart[0]}:${timeApart[1]}`;
  };

  const rows = () => {
    const rows = schedules.map(schedule => {
      const rowDay = {
        schedule,
        days: []
      };
      days.forEach(day => {
        if (day === '') return null;
        const newClasses = classes.map(gang => {
          const dateTimeFind = gang.days.find(d => d.weekDay === day && getFormattedTime(d.time) === schedule);
          if (dateTimeFind)
            return { modality: gang.modality, full: dateTimeFind.full }
          return null;
        });
        const classesFiltered = newClasses.filter(c => c !== null);
        rowDay.days.push(classesFiltered);
      });
      return rowDay;
    });
    return rows;
  };

  return (
    <>
      <Header />
      {loading ? <CircularProgress /> :
        <>
          <div className={title}>Turmas</div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {days.map(day => <TableCell>{<div className={top}>{day}</div>}</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows().map((row) => (
                  <TableRow key={row.schedule}>
                    <TableCell>
                    <div className={top}>
                      {row.schedule}
                    </div>
                    </TableCell>
                    {row.days.map(day =>
                      <TableCell>
                        {day.map(r => <div className={r.full ? disabled : enabled}>{r.modality}</div>)}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      }
    </>
  );
};

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 32,
    fontFamily: 'Quantico',
  },
  enabled: {
    color: 'green',
  },
  disabled: {
    color: 'red',
  },
  top: {
    fontWeight: 'bold',
  },
}));

export default Gangs;