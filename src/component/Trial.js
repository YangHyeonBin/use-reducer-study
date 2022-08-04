import { Fragment, useReducer, useState } from "react";

const ACTION_TYPES = {
  add: 'ADD',
  del: 'DELETE',
  attend: 'ATTEND',
  na: 'NOT ATTEND',
}

const studentsReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.add:
      return (state.concat(action.payload))
      // break; // return 때문에 break 필요 X
    case ACTION_TYPES.del:
      return (state.filter(student => student.id !== action.id))
      // break;
    case ACTION_TYPES.attend:
      // sth
      // break;
    case ACTION_TYPES.na:
      // sth
      // break;
    default:
      // sth
  }
};

const Attendance = () => {
  const [studentAmount, setStudentAmount] = useState(0);

  const [students, dispatchStudents] = useReducer(studentsReducer, [{ id: '', name: '', }, ]);

  const inputChangeHandler = e => {
    
  }

  const listClickHandler = () => {

  };

  const formSubmitHandler = e => {
    e.preventDefault();

    dispatchStudents({
      type: ACTION_TYPES.add,
      payload: {
        id: Math.random(),
        name: e.target[0].value,
      },
    })
  }

  const addStudentAmountHandler = () => {
    setStudentAmount(prevStudents => {
      return (prevStudents + 1) // 리턴 값이 단일한 변수 같은 거면 return 안 써도 되나, 지금 같은 경우는 return () 꼭 써줘야 하는 듯?!
    })
    console.log(students)
  };

  const removeStudentAmountHandler = () => {
    setStudentAmount(prevState => {
      return (prevState - 1)
    })
    console.log(students)
  };

  return (
    <Fragment>
      <h1>출석부</h1>
      <p>총 학생 수: {studentAmount}</p>
      <form onSubmit={formSubmitHandler}>
        <input type='text' onChange={inputChangeHandler} />
        <button onClick={addStudentAmountHandler}>추가</button>
        <ul>
          <li>
            <span onClick={listClickHandler}>
              {students[0].name}
            </span>
            <button type='button' onClick={removeStudentAmountHandler}>삭제</button>
          </li>
        </ul>
      </form>
    </Fragment>
  )
};

export default Attendance;