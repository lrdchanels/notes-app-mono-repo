export const Note = ({ content, important, toggleImportance }) => {
  const label = important
    ? 'make not important'
    : 'make important';

  return (
    <li className='note'>
      <span>{content}</span>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
