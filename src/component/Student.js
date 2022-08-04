import styles from './Student.module.css';


const Student = (props) => {
  const classes = `${props.isHere ? styles.li : ''}`;

  const deleteHandler = () => {
    props.dispatchStudents({ type: 'DELETE', payload: props.id })
  }

  const attendHandler = () => {
    props.dispatchStudents({ type: 'MARK', payload: props.id })
  }

  return (
    <li>
      <span className={classes} onClick={attendHandler}>{props.name}</span>
      <button type='button' onClick={deleteHandler}>삭제</button>
    </li>
  )
};

export default Student;