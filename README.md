# NodeStudentList

IMPORTANT NOTE:
MongoDB passwords, project names and usernames have been removed. If you follow this step by step you will notice they are missing. Don't delete them as you go through this. 
Just remember that I have deleted them here so they are not public.



1. setup folder mernstack
2. setup two sub-folders, 'client' and 'server'
3. inisde 'client', run npx create-react-app ./
4. inside 'server' run npm init and accept defaults
5. inside 'server' run npm install express body-parser cors mongoose nodemon
6. inside 'server' create index.js file
7. in index.js:
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

8. open package.json from 'server' and add:
FROM:
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mongoose": "^6.0.1",
    "nodemon": "^2.0.12"
  }
}
______________________________________________
TO:
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "nodemon index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mongoose": "^6.0.1",
    "nodemon": "^2.0.12"
  }
}

9. in 'client' run npm install axios moment react-file-base64 redux redux-thunk

10. Delete unneeded files and do code cleanup:
--client>src>
.App.test.js
.logo.svg
.reportWebVitals.js
.setupTests.js

11. In client, App.js, replace all with <h1>Hello World</h1>

12. in 'client', run npm start

13. In 'server', index.js:
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ lmit: "20mb", extended: true }));

app.use(cors());

14. Create MongoDB Atlas database

15. Add MongoDB url to your application. In 'server' and in index.js:
mongodb+srv://<username>:<password>@cluster0.bzv7b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
----------------------------------------------------------------------------------
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://<username>:<password>@cluster0.bzv7b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
------------------------------------------------------------------------------------------



import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ lmit: "20mb", extended: true }));

app.use(cors());

const MONGO_CONNECTION = 'mongodb+srv://<username>:<password>@cluster0.bzv7b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log('Connection established with MongoDB at port number : ', PORT))).catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);

_____________________________________________________________________________

--->USE THIS:
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ lmit: "20mb", extended: true }));

app.use(cors());

// const MONGO_CONNECTION = 'mongodb+srv://<username>:<password>@cluster0.bzv7b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGO_CONNECTION = 'mongodb+srv://<username>:<password>@cluster0.bzv7b.mongodb.net/<project-name>?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then(() => app.listen(PORT, () => console.log('Connection established with MongoDB at port number : ', PORT))).catch((err) => console.log(err.message));

// mongoose.set('useFindAndModify', false);

16. Run the server with npm start

17. In 'server', create new folder called 'routes'

18. in 'routes' folder, create new file called 'student.js

19. In 'student.js':
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Router is working');
});

export default router;

20. in 'server' -> index.js:
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import studentRoute from './routes/student.js';


/**
 * EXPRESS APP----------------
 */
const app = express();
app.use('/students', studentRoute);
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ lmit: "20mb", extended: true }));
app.use(cors());




21. Open up new tab in browser and type in localhost:5000/students
It should return essentially a <p></p> tag with 'Router is working'

22. in 'server', create a new folder called 'controllers'

23. in 'controllers' create a new file called 'student.js'

24. in 'student.js' (controller), write:
export const getStudents = (req, res) => {
    res.send('Router is working');
}

25. in 'student.js (routes), modify:
import express from 'express';
import { getStudents } from '../controllers/student.js';

const router = express.Router();

router.get('/', getStudents);

export default router;

26. in 'server' create a new folder called 'models'

27. in 'models' create a file called 'studentModel.js'

28. in 'studentModel.js':
import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    registrationNumber: Number,
    name: String,
    grade: String,
    section: {
        type: String,
        default: 'A'
    },
    subjects: [String]
});

const student = mongoose.model('student', studentSchema);

export default student;

29. in 'controllers>student.js':
import student from "../models/studentModel.js";


export const getStudents = async (req, res) => {
    try{
        const allStudents = await student.find();
        res.status(200).json(allStudents);
    }catch(err){
        console.log(err);
        res.status(404).json({ message: err.message });
    }
}

export const createStudent = async (req, res) => {
    const student = req.body;
    const newStudent = new student(student);
    try{
        await newStudent.save();
        res.status(201).json(newStudent);
    }catch(error){
        console.log(error);
        res.status(409).json({ message: error.message })
    }
}

// import StudentModel from "../models/studentModel";


// export const getStudents = async (req, res) => {
//     try{
//         const allStudents = await StudentModel.find();
//         res.status(200).json(allStudents);
//     }catch(err){
//         console.log(err);
//         res.status(404).json({ message: err.message });
//     }
// }

// export const createStudent = (req, res) => {
//     const student = req.body;
//     const newStudent = new StudentModel(student);
//     try{
//         await newStudent.save()
//     }catch(error){

//     }
// }


30. in 'routes>student.js':
import express from 'express';
import { getStudents, createStudent } from '../controllers/student.js';
import student from '../models/studentModel.js';

const router = express.Router();

router.get('/', getStudents);
router.post('/', createStudent)

export default router;

31. Install npm install @material-ui/core and /icons in 'client'

32. in 'client' create a new folder in 'src' called 'components'

33. create folder in 'components' called 'showStudent' and 'createStudent'

34. in 'createStudent' create new file called 'createStudent.js'

35. in 'showStudent' folder create new file called 'showStudent.js'

36. create a new folder in 'client' 'src' called 'styles'

37. in 'styles' folder create a file called 'styles.js'

38. in styles.js:
import { makeStyles } from '@material-ui/core/styles';

export const navbarStyles = makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

39. In App.js:

import './App.css';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { navbarStyles } from './styles/styles'

function App() {

  const classes = navbarStyles();

  return (
    <div className="App">
      <Container maxWidth="lg">
          <AppBar className={classes.appBar} position="static" color="inherit">
              <Typography className={classes.heading} variant="h2" align="center">
                Students Create and Show
              </Typography>
          </AppBar>
      </Container>
    </div>
  );
}

export default App;

40. Modify App.js


import './App.css';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { navbarStyles } from './styles/styles'

import Student from './components/showStudent/showStudent';
import CreateStudent from './components/createStudent/createStudent';

function App() {

  const classes = navbarStyles();

  return (
    <div className="App">
      <Container maxWidth="lg">
          <AppBar className={classes.appBar} position="static" color="inherit">
              <Typography className={classes.heading} variant="h2" align="center">
                Students Create and Show
              </Typography>
          </AppBar>
          <Grow in>
            <Container>
              <Grid container justify="space-between" alignItems="stretch">
                <Grid item xs={12} sm={7}>
                  <AppBar className={classes.appBar} position="static" color="inherit">
                    <Student />
                  </AppBar>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <AppBar className={classes.appBar} position="static" color="inherit">
                    <CreateStudent />
                  </AppBar>
                </Grid>
              </Grid>
            </Container>
          </Grow>
      </Container>
    </div>
  );
}

export default App;


41. Open showStudent.js in components>showStudents

Add this as a placeholder:



import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

We will be modifying this at a later point, for now it is to be a placeholder for where the student data will go


42. open createStudent.js in src>components>createStudent and add:
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PrimaryButton from '../buttons/PrimaryButton';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
      <div>
        <h2>
            Create Student
        </h2>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </form>
        <PrimaryButton />
      </div>
  );
}

43. Create a new folder in components called 'buttons'

44. Create a new file in the 'buttons' folder called 'PrimaryButton.js'

45. Add to 'PrimaryButton.js':
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function PrimaryButton() {
    return(
        <div>
            <Button variant="contained" color="primary" style={{marginBottom:"10px"}}>
                Submit
            </Button>
        </div>
    )
}

46. Modify createStudent.js

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PrimaryButton from '../buttons/PrimaryButton';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
      <div>
        <h2>
            Create Student
        </h2>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Registration Number" variant="outlined" />
            <TextField id="outlined-basic" label="Name" variant="outlined" />
            <TextField id="outlined-basic" label="Grade" variant="outlined" />
            <TextField id="outlined-basic" label="Section" variant="outlined" />
        </form>
        <PrimaryButton />
      </div>
  );
}


THis matches our studentModel.js mongoose schema


47. Modify 'showStudent.js'




import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <div>
        <h2>
            All Students
        </h2>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell align="right">Registration Number</TableCell>
                    <TableCell align="right">Grade</TableCell>
                    <TableCell align="right">Section</TableCell>
                    <TableCell align="right">Subjects</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
}


48.Modify createStudent.js

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PrimaryButton from '../buttons/PrimaryButton';
import { Button } from '@material-ui/core';

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
        <PrimaryButton onClick />
      </div>
  );
}


49. in 'client' folder, run: npm install axios --save

50. Modify 'createStudent':
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PrimaryButton from '../buttons/PrimaryButton';
import { Button } from '@material-ui/core';
import axios from 'axios';

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
    axios.post('http://localhost:5000/students', student)
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
        <PrimaryButton onClick />
      </div>
  );
}

51. Modify 'studentModel.js'

import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    regNo: Number,
    studentName: String,
    grade: String,
    section: {
        type: String,
        default: 'A'
    },
});

const student = mongoose.model('student', studentSchema);

export default student;

52. Start the client : npm start

53. Submit a student in the form

54. go to localhost:5000/students

55. Modify 'student' in 'controllers' in 'server'
import StudentData from "../models/studentModel.js";



export const getStudents = async (req, res) => {
    try{
        const allStudents = await StudentData.find();
        res.status(200).json(allStudents);
    }catch(err){
        console.log(err);
        res.status(404).json({ message: err.message });
    }
}

export const createStudent = async (req, res) => {
    const student = req.body;
    const newStudent = new StudentData(student);
    try{
        await newStudent.save();
        res.status(201).json(newStudent);
    }catch(error){
        console.log(error);
        res.status(409).json({ message: error.message })
    }
}
 
56. CRITICAL CHANGES TO INDEX.JS
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import studentRoute from './routes/student.js';


/**
 * EXPRESS APP----------------
 */
const app = express();
const corsOptions = {
    origin : 'http://localhost:3000',
    credentials: true,
    "allowedHeaders": ["sessionId", "Content-Type"],
    "exposedHeaders": ["sessionId"],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true
}
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ lmit: "20mb", extended: true }));
app.use('/students', studentRoute);



/**
 * MONGO DB----------------
 */

const PORT = process.env.PORT || 5000;
mongoose.connect(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => app.listen(PORT, () => console.log('Connection established with MongoDB at port number : ', PORT))).catch((err) => console.log(err.message));

57. modify showStudent.js



import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ShowStudents() {
  const classes = useStyles();

  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:5000/students').then( (allStudents) => {
          setStudentList(allStudents.data);
      })
  }, []);


  return (
    <div>
        <h2>
            All Students
        </h2>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Student Name</TableCell>
                        <TableCell align="right">Registration Number</TableCell>
                        <TableCell align="right">Grade</TableCell>
                        <TableCell align="right">Section</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {studentList.map((student, key) => (
                        <TableRow key={key}>
                        <TableCell component="th" scope="row">
                            {student.studentName}
                        </TableCell>
                        <TableCell align="right">{student.regNo}</TableCell>
                        <TableCell align="right">{student.grade}</TableCell>
                        <TableCell align="right">{student.section}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
}
