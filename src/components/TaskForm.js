import { useState, useEffect } from "react" 
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuid } from "uuid"

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { addTask, editTask } from '../features/tasks/taskSlice'

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [id, setId] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector(state => state.tasks)

  const handleSubmit = e => {
    e.preventDefault();
    if(params.id) {
      dispatch(editTask({ id, title, description, completed }))
    } else {
      dispatch(addTask({ title, description, id: uuid() }));
    }
    navigate('/')
  }

  useEffect(() => {
    if(params.id) {
      const task = tasks.find(task => task.id === params.id)
      setTitle(task.title);
      setDescription(task.description);
      setId(task.id)
      setCompleted(task.completed)
    }
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-zinc-800 max-w-sm p-4 mb-2'
    >
      <label htmlFor="title" className="block text-xs font-bold">Task:</label>
      <input 
        name="title"
        type='text'
        placeholder='title' 
        value={title}
        onChange={e => setTitle(e.target.value)}
        className='w-full p-2 rounded-md bg-zinc-600 mb-2'
      />

      <label htmlFor="description" className="block text-xs font-bold mb-2">Description:</label>
      <textarea
        name='description'
        type='text'
        placeholder='description'  
        value={description}
        onChange={e => setDescription(e.target.value)}
        className='w-full p-2 rounded-md bg-zinc-600 mb-2'
      />

      <button type="submit" className="bg-indigo-600 px-2 py-1">Save</button>
    </form>
  )
}

export default TaskForm