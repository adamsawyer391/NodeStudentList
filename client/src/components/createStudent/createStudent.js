import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PrimaryButton from '../buttons/PrimaryButton';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { RefreshStudents } from '../../functions/RefreshStudentList';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function CreateStudent() {

  const classes = useStyles();

  const [student, setStudent] = useState({
      regNo: 0,
      studentName: '',
      grade: '',
      section: '',
  });

  const createStudent = () => {
    console.log('method called');
    axios.post('http://localhost:5000/students', student).then( () => {
        /**
         * optional
         */
        window.location.reload(false);
    });
    /**
     * do this if you do not call reload() above
     */
    setStudent({
        regNo: 0,
        studentName: '',
        grade: '',
        section: ''
    });
  }

  return (
      <div>
        <h2>
            Create Student
        </h2>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Registration Number" variant="outlined" value={student.regNo} onChange={(event) => {
                setStudent({
                    ...student, regNo: event.target.value
                })
            }} />
            <TextField id="outlined-basic" label="Name" variant="outlined" value={student.studentName} onChange={(event) => {
                setStudent({
                    ...student, studentName: event.target.value
                })
            }} />
            <TextField id="outlined-basic" label="Grade" variant="outlined" value={student.grade} onChange={(event) => {
                setStudent({
                    ...student, grade: event.target.value
                })
            }} />
            <TextField id="outlined-basic" label="Section" variant="outlined" value={student.section} onChange={(event) => {
                setStudent({
                    ...student, section: event.target.value
                })
            }} />
        </form>
        <Button variant="contained" color="primary" onClick={createStudent} >
            Submit
        </Button>
      </div>
  );
}