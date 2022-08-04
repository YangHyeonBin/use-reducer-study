import { Fragment, useState, useReducer } from 'react';
import Student from './Student';

const studentsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const name = action.payload.name;
      return ({
        count: state.count + 1,
        students: state.students.concat({
          id: Date.now(),
          name,
          isHere: false,
        })
      })
    case 'DELETE':
      const id = action.payload;
      return ({
        count: state.count - 1,
        students: state.students.filter(student => student.id !== id)
      })
    case 'MARK':
      return ({
        count: state.count,
        students: state.students.map(student => {
          if (student.id === action.payload) {
            return {...student, isHere: !student.isHere} // student의 다른 값들은 동일하게 가져가고, isHere만 바꿔준다.
          } else {
            return student;
          }
        })
      })
    default:
      return state;
  }
};

const studentsInitailState = {
  count: 0,
  students: [],
};

const Attendance = () => {
  const [name, setName] = useState('');

  const [studentList, dispatchStudents] = useReducer(studentsReducer, studentsInitailState);

  const inputChangeHandler = (e) => {
    setName(e.target.value);
  };

  const addHandler = (e) => {
    e.preventDefault();

    dispatchStudents({ type: 'ADD', payload: {name} })
    setName('');
  };

  return (
    <Fragment>
      <h1>출석부</h1>
      <p>총 학생 수: {studentList.count}</p>
      <form onSubmit={addHandler}>
        <input
          type="text"
          placeholder="이름을 입력하세요."
          value={name}
          onChange={inputChangeHandler}
        />
        <button type="button" onClick={addHandler}>추가</button>
      </form>
      <ul>
        {studentList.students.map((student) => (
          <Student key={student.id} name={student.name} id={student.id} dispatchStudents={dispatchStudents} isHere={student.isHere} />
        ))}
      </ul>
    </Fragment>
  );
};

export default Attendance;
