/*
Created by: kathe
On: 25-Nov-21 : 9:42 PM
Project: ch15-custom-hooks
*/

/**
 * import useHttp from './hooks/DataHandler/use-http';
 *
 function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];

      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks({ url: 'https://someValidAPIUrl' }, transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
      <>
        <NewTask onAddTask={taskAddHandler} />
        <Tasks items={tasks} loading={isLoading} error={error} onFetch={fetchTasks} />
      </>
  );
 }

 export default App;
----------------------------------------------------------
 GET Example
----------------------------------------------------------
  const Tasks = (props) => {
    const { error, items, loading } = props;
    let taskList = <h2>No tasks found. Start adding some!</h2>;

    if (items.length > 0) {
      taskList = (
        <ul>
          {props.items.map((task) => (
            <TaskItem key={task.id}>{task.text}</TaskItem>
          ))}
        </ul>
      );
    }

    let content = taskList;

    if (error) {
      // eslint-disable-next-line react/button-has-type
      content = <button onClick={props.onFetch}>Try again</button>;
    }

    if (loading) {
      content = 'Loading tasks...';
    }

    return (
      <Section>
        <div className={classes.container}>{content}</div>
      </Section>
    );
  };

   export default Tasks;
----------------------------------------------------------
POST Example
----------------------------------------------------------
 import useHttp from './hooks/DataHandler/use-http';

 const NewTask = (props) => {
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name;
    const createdTask = {
      id: generatedId,
      text: taskText,
    };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    await fetchTasks(
      {
        url: 'https://someValidAPIUrl',
        method: 'POST',
        body: { text: taskText },
        headers: {
          'Content-Type': 'application/json',
        },
      },
      createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

 export default NewTask;
 */
import { useCallback, useState } from 'react';

const useFetchHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }

    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useFetchHttp;
