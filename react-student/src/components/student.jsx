import { useState } from "react";
import ReactDOM from "react-dom/client";

function Student() {
    const [students, setStudents] = useState([]);

    const handleFetchData = () => {
      fetch('http://localhost:8080/api/student')
        .then(response => response.json())
        .then(data => {
          setStudents(data);
        })
        .catch(error => console.error(error));
    };
    const [firstName, setFirstName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
  
    const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
    };
  
    const handleFamilyNameChange = (event) => {
      setFamilyName(event.target.value);
    };
  
    const handleDateOfBirthChange = (event) => {
      setDateOfBirth(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      fetch('https://api.example.com/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          familyName: familyName,
          dateOfBirth: dateOfBirth
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        First name:
        <input type="text" value={firstName} onChange={handleFirstNameChange} />
      </label>
      <label>
        Family name:
        <input type="text" value={familyName} onChange={handleFamilyNameChange} />
      </label>
      <label>
        Date of birth:
        <input type="date" value={dateOfBirth} onChange={handleDateOfBirthChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
    <button onClick={handleFetchData}>Display all students</button>
      <ul>
        {students.map(student => (
          <li key={student.id}>{student.firstName} {student.lastName}</li>
        ))}
      </ul>
    

  </div>
  );
  }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Student />);
export default Student;
/*
Click F12 and navigate to the "Console view"
to see the result when you submit the form.
*/
