
import { useEffect, useState } from 'react';
import './index.css';


function App() {


  const [studentsData, setStudentsData] = useState([]);
  const [updateId,setUpdateId]=([])
  console.log(updateId)
  useEffect(() => {
    fetch(`https://nodejstask.vercel.app/students`)
      .then(res => res.json())
      .then(data => setStudentsData(data))
  }, []);



  console.log(studentsData)
  const handleAddStudents = (event) => {
    event.preventDefault();
    const name = event.target.name.value
    const email = event.target.email.value
    const label = event.target.label.value
    const class_roll = event.target.roll.value
    const student = { name, email, label, class_roll }

    fetch('https://nodejstask.vercel.app/student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        const newStudent = [...studentsData, data];
        setStudentsData(newStudent)
      })
      .catch(error => {
        console.error('Error:', error);
      });
    event.target.reset()
  }


  const handleDelete = user => {
    const agree = window.confirm(`you want to delete${user.name}`)
    if (agree) {
      // console.log(`you want to delete${user._id}`)
      fetch(`https://nodejstask.vercel.app/users/${user._id}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          if (data.deletedCount > 0) {
            alert('User delete successfully')
            const remainingUsers = studentsData.filter(usr => usr._id !== user._id)
            setStudentsData(remainingUsers)
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  const handleEdit = (id) => {

    console.log(id)
    const updateStudent =studentsData.filter(usr => usr._id === id)
    console.log(updateStudent)

  }

  return (
    <div className='container w-11/12 mx-auto'>
      <h1 className="title text-3xl">Students Details</h1>
      <form className='my-4' onSubmit={handleAddStudents} action="">
        <input type="text" name='name' placeholder="Student Name" required />
        <input type="text" name='email' placeholder="Student Email" required />
        <input type="text" name='label' placeholder="Student Label" required />
        <input type="text" name='roll' placeholder="Student Roll" required />
        <button type="submit" id="button">submit</button>
      </form>
      <table className="students">
        <tr>

          <th>Student Name</th>
          <th>Email</th>
          <th>Label</th>
          <th>Roll</th>
          <th id='operation'>Operation</th>
        </tr>
        {studentsData.map((data, i) =>
          <tr key={data._id}>
            <td>{i + 1}. {data.name}</td>
            <td>{data.email}</td>
            <td>{data.label}</td>
            <td>{data.class_roll}</td>
            <td>
              <button onClick={() => handleDelete(data)} id="button" className='mr-3'>delete</button>
              <label htmlFor="my-modal-3" id="button"><button onClick={() => handleEdit(data._id)} >edit</button></label>
            </td>
          </tr>

        )

        }
      </table>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">update</h3>
          <h1 className="title">Students Details</h1>
          <form action="">
            <input className="input w-full max-w-xs mb-4" type="text" name='name'placeholder="Student Name" required />
            <input className="input w-full max-w-xs mb-4" type="text" name='email'  placeholder="Student Email" required />
            <input className="input w-full max-w-xs mb-4" type="text" name='label' placeholder="Student Label" required />
            <input className="input w-full max-w-xs mb-4" type="text" name='roll' placeholder="Student roll"  required />
            <button type="submit" className='btn btn-active btn-ghost mb-4'>submit</button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default App;
