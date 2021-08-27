
import axios from 'axios';

export const RefreshStudents = () => {
    axios.get('http://localhost:5000/students').then( (allStudents) => {
        //   setStudentList(allStudents.data);
        return allStudents.data;
    })
}