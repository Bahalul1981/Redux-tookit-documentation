প্রথমেই, রিয়েক্ট রিডাক্স টুলকিট ইনস্টল করতে হবে।

npm বা yarn ব্যবহার করে এটি ইনস্টল করা যায়।

npm install @reduxjs/toolkit

বা

yarn add @reduxjs/toolkit

পরবর্তীতে, আপনাকে রিডাক্স টুলকিটের সাথে নতুন একটি স্লাইস তৈরি করতে হবে।

স্লাইস তৈরি করতে নিম্নলিখিত উদাহরণটি ব্যবহার করা যেতে পারেঃ

import { createSlice } from '@reduxjs/toolkit';

const mySlice = createSlice({
name: 'mySlice',
initialState: {
value: 0
},
reducers: {
increment: state => {
state.value += 1;
},
decrement: state => {
state.value -= 1;
}
}
});

এই স্লাইসে, "mySlice" হল স্লাইসের নাম এবং "value" হল স্লাইসের মূল্যের নির্দিষ্ট আদি।

সম্পর্কিত ক্লাস কম্পোনেন্টে স্লাইসের মান প্রদর্শন করতে হলে, নিম্নলিখিত কোডটি ব্যবহার করা যায়ঃ

import { useSelector } from 'react-redux';

const Counter = () => {
const count = useSelector(state => state.mySlice.value);

return (
<div>
<p>Count: {count}</p>
</div>
);
};

শেষ পর্যন্ত, আপনি রিডাক্স স্টোর তৈরি করতে হবে এবং এটি রিয়েক্ট এপ্লিকেশনে প্রবেশ করাতে হবে।


একটি রিডাক্স স্টোর তৈরি করতে নিম্নলিখিত উদাহরণটি ব্যবহার করা যায়ঃ

import { configureStore } from '@reduxjs/toolkit';
import mySlice from './mySlice';

const store = configureStore({
reducer: {
mySlice: mySlice.reducer
}
});

এখানে, "mySlice" হল আমাদের তৈরি করা স্লাইসের নাম। এছাড়াও, আমরা এটি স্টোরের রিডিউসার হিসাবে নির্দিষ্ট করেছি।

এখন আমরা আমাদের রিডাক্স স্টোর ব্যবহার করে আমাদের রিয়েক্ট অ্যাপ্লিকেশনে স্থানান্তর করতে পারি।

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>,
document.getElementById('root')
);

এখানে, আমরা স্টোর প্রদান করে আমাদের রিয়েক্ট অ্যাপ্লিকেশনের সাথে "Provider" কম্পোনেন্ট ব্যবহার করেছি।

সবশেষে, আপনি আপনার রিডাক্স স্টোরে একটি স্লাইসের মান পরিবর্তন করতে চাইলে, নিম্নলিখিত কোডটি ব্যবহার করতে পারেনঃ

import { useDispatch } from 'react-redux';
import { increment, decrement } from './mySlice';

const CounterButtons = () => {
const dispatch = useDispatch();

return (
<div>
<button onClick={() => dispatch(increment())}>+</button>
<button onClick={() => dispatch(decrement())}>-</button>
</div>
);
};


স্টুডি করার জন্য একটি পছন্দসই উদাহরণ হিসাবে, আমরা একটি টুডু অ্যাপ্লিকেশন তৈরি করব।

প্রথমে, আমরা একটি স্লাইস তৈরি করব যা সমস্ত টুডু সম্পর্কিত স্থানীয় ডেটা সংরক্ষণ করবে।

import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
name: 'todos',
initialState: [],
reducers: {
addTodo: (state, action) => {
const newTodo = {
id: Date.now(),
text: action.payload,
completed: false
};
return [...state, newTodo];
},
toggleTodo: (state, action) => {
const index = state.findIndex(todo => todo.id === action.payload);
state[index].completed = !state[index].completed;
},
deleteTodo: (state, action) => {
return state.filter(todo => todo.id !== action.payload);
}
}
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;
export default todosSlice;

এখানে, আমরা একটি "todos" নামক স্লাইস তৈরি করেছি। এটি তিনটি রিডাক্স রিডাক্সার (addTodo, toggleTodo এবং deleteTodo) সহ আমাদের টুডু সম্পর্কিত ডেটা পরিবর্তন করতে সক্ষম হয়ে থাকবে।

এবার, আমরা আমাদের রিডাক্স স্টোর তৈরি করব এবং স্থানীয়ভাবে সংরক্ষিত টুডুগুলি দেখাব।

import { configureStore } from '@reduxjs/toolkit';
import todosSlice from './todosSlice';

const store = configureStore({
reducer: {
todos: todosSlice.reducer
}
});

console.log(store.getState());

এখানে, আমরা একটি রিডাক্স স্টোর তৈরি করেছি যা আমাদের

todos নামক স্লাইসের ডেটাকে সংরক্ষণ করে। এরপর, আমরা কিছু টুডু যুক্ত করে দেখব কিভাবে স্থানীয়ভাবে ডেটা আপডেট করা হয়।

import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addTodo } from './todosSlice';

function App() {
const dispatch = useDispatch();
const [newTodo, setNewTodo] = useState('');

const handleAddTodo = () => {
if (newTodo !== '') {
dispatch(addTodo(newTodo));
setNewTodo('');
}
};

return (
<div>
<input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
<button onClick={handleAddTodo}>Add Todo</button>
</div>
);
}

export default App;

এখানে, আমরা একটি স্টেট তৈরি করেছি যার মাধ্যমে নতুন টুডু যুক্ত করা যাবে। আমরা useDispatch হুক ব্যবহার করে স্লাইসের অ্যাকশানটি ডিসপ্যাচ করে নতুন টুডু যুক্ত করছি।

এখন, আমরা টুডুগুলি একটি লিস্ট হিসাবে দেখাব।

import { useSelector } from 'react-redux';

function App() {
const todos = useSelector(state => state.todos);

return (
<div>
{todos.map(todo => (
<div key={todo.id}>
<span>{todo.text}</span>
<button onClick={() => dispatch(toggleTodo(todo.id))}>{todo.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
<button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
</div>
))}
</div>
);
}

export default App;

এখানে, আমরা useSelector হুক ব্যবহার করে টুডুগুলি লুপ করে দেখাচ্ছি। আমরা toggleTodo এবং deleteTodo অ্যাকশানগুলি ব্যবহার করে টুডু

এখন, আমরা টুডুগুলি একটি লিস্ট হিসাবে দেখাব।

import { useSelector } from 'react-redux';

function App() {
const todos = useSelector(state => state.todos);

return (
<div>
{todos.map(todo => (
<div key={todo.id}>
<span>{todo.text}</span>
<button onClick={() => dispatch(toggleTodo(todo.id))}>{todo.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
<button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
</div>
))}
</div>
);
}

export default App;

এখানে, আমরা useSelector হুক ব্যবহার করে টুডুগুলি লুপ করে দেখাচ্ছি। আমরা toggleTodo এবং deleteTodo অ্যাকশানগুলি ব্যবহার করে টুডু স্থানীয়ভাবে আপডেট করছি।

এখন, আপনি রিডাক্স টুলকিট এবং এর বিভিন্ন ফিচারগুলি ব্যবহার করে আপনার অ্যাপ্লিকেশনের জন্য একটি পূর্ণস্কার সলিউশন তৈরি করতে পারেন। রিডাক্স টুলকিট দিয়ে আপনি কম কোডে বেশি কাজ করতে পারবেন এবং কোডের পারফরমেন্সও উন্নত করতে পারবেন।

আমরা এখন কিছু কাস্টম লজিক তৈরি করব যা রিডাক্স টুলকিটের বিভিন্ন ফিচারগুলি ব্যবহার করে সহজেই কাজ করব। প্রথমত, আমরা একটি slice তৈরি করব যা আমাদের এপ্লিকেশনের টুডুগুলি স্টোর করবে।

import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
name: 'todos',
initialState: [],
reducers: {
addTodo: (state, action) => {
const { id, text } = action.payload;
state.push({ id, text, completed: false });
},
toggleTodo: (state, action) => {
const todo = state.find(todo => todo.id === action.payload);
todo.completed = !todo.completed;
},
deleteTodo: (state, action) => {
return state.filter(todo => todo.id !== action.payload);
},
},
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;

এখন, আমরা টুডুগুলি স্টোর করা হয় slice ব্যবহার করে স্টোরের সাথে সংযোগ করব।

import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';

export default configureStore({
reducer: {
todos: todosReducer,
},
});

এবার, আমরা টুডুগুলি যুক্ত করব আমাদের কম্পোনেন্টে।

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './todosSlice';

function AddTodoForm() {
const [text, setText] = useState('');
const dispatch = useDispatch();

const handleSubmit = e => {
e.preventDefault();
if (text.trim()) {
dispatch(addTodo({ id: Date.now(), text }));
setText('');
}
};

return (
<form onSubmit={handleSubmit}>
<input type="text" value={text} onChange={e => setText(e.target.value)} />
<button type="submit">Add Todo</button>
</form>
);
}

export default AddTodoForm;

এবং সবশেষে, আমরা স্টোর থেকে টুডুগুলি লোড কর

এটি একটি টুডুলিস্ট কম্পোনেন্ট যা স্টোরের টুডুগুলি প্রদর্শন করে।

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from './todosSlice';

function TodoList() {
const todos = useSelector(state => state.todos);
const dispatch = useDispatch();

const handleToggle = id => {
dispatch(toggleTodo(id));
};

const handleDelete = id => {
dispatch(deleteTodo(id));
};

return (
<ul>
{todos.map(todo => (
<li key={todo.id}>
<input
type="checkbox"
checked={todo.completed}
onChange={() => handleToggle(todo.id)}
/>
<span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
{todo.text}
</span>
<button onClick={() => handleDelete(todo.id)}>Delete</button>
</li>
))}
</ul>
);
}

export default TodoList;

এটি হল রিডাক্স টুলকিট ব্যবহার করে বানানো সাধারণ টুডু অ্যাপ্লিকেশন এবং সেটার ব্যবহার সম্পর্কিত একটি সংক্ষিপ্ত বিবরণ। আশা করি এই গাইডলাইন সাহায্য করবে রিডাক্স টুলকিট ব্যবহার করে আপনার পরবর্তী প্রকল্প তৈরি করতে।

এখন আমরা আমাদের স্টোরে প্রয়োজনীয় ডাটা সম্পর্কিত একটি ফেচিং অ্যাকশন বানাব।

একটি ফেচিং অ্যাকশন তৈরি করতে আমাদের প্রথমে একটি নতুন ফাইল বানাতে হবে এবং এটির নাম দিতে হবে todosSlice.js।

এখন আমরা ফাইলটি ওপেন করব এবং ফলোয়িং কোড লিখব।

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodos } from '../api/todosAPI';

export const fetchTodosAsync = createAsyncThunk(
'todos/fetchTodos',
async () => {
const response = await fetchTodos();
return response.todos;
}
);

export const todosSlice = createSlice({
name: 'todos',
initialState: [],
reducers: {
addTodo: (state, action) => {
const newTodo = {
id: Date.now(),
text: action.payload,
completed: false
};
state.push(newTodo);
},
toggleTodo: (state, action) => {
const todo = state.find(todo => todo.id === action.payload);
if (todo) {
todo.completed = !todo.completed;
}
},
deleteTodo: (state, action) => {
return state.filter(todo => todo.id !== action.payload);
}
},
extraReducers: builder => {
builder.addCase(fetchTodosAsync.fulfilled, (state, action) => {
return action.payload;
});
}
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;

এখানে, আমরা createAsyncThunk ব্যবহার করে সার্ভার থেকে টুডু লিস্ট লোড করব। একটি fetchTodosAsync অ্যাকশন সৃষ্টি করা হয়েছে যা অসিংক্রোনাস ডাটা লোড করবে এবং fetchTodos ফাংশন ব্যবহার করে এটি সার্ভার থেকে ডাটা লোড করবে।

createSlice ফাংশন ব্যবহার করে আমরা একটি নতুন স্লাইস তৈরি করছি যা আমাদের টুডু লিস্টের জন্য স্টেট ম্যানেজ করবে। আমরা একটি ইনিশিয়াল স্টেট সেট করেছি যা এখনো ফাঁকা হয়ে আছে কারণ আমরা সার্ভার থেকে ডাটা লোড করব।

এক্সট্রা রিডিউসার আমরা builder প্যারামিটার ব্যবহার করে লিখেছি যা createSlice ফাংশন থেকে রিটার্ন করা হয়। এই অংশটি সার্ভার থেকে ডাটা লোড হওয়ার পরে স্টেট আপডেট করবে।

শেষে, আমরা টুডু স্লাইসের বিভিন্ন রিডাকশনগুলি সেট করছি, যা টুডুগুলি সম্পর্কিত কিছু কাজ করতে পারে। আমরা নতুন টুডু যুক্ত করতে পারি, একটি টুডু টগল করতে পারি এবং একটি টুডু মুছতে পারি।

আমরা ফাইলটি সেভ করে দিতে পারি এবং আমাদের স্টোরে টুডু স্লাইস ব্যবহার করতে পারি।


আমাদের স্টোরে টুডু স্লাইস ব্যবহার করতে হলে আমাদের রিডাকশন গুলি ব্যবহার করতে হবে। উদাহরণস্বরূপ, টুডু লিস্ট একটি কালেকশন এবং নতুন টুডু যুক্ত করার সময়, একটি নতুন টুডু যুক্ত করার জন্য আমরা একটি রিডাকশন লিখতে পারি:

javascript
Copy code
const ADD_TODO = 'todos/addTodo';

const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    id: uuidv4(),
    text,
    completed: false,
  },
});

export default addTodo;
এই রিডাকশনটি নতুন টুডু যুক্ত করবে এবং uuidv4 ফাংশন ব্যবহার করে যথাক্রমে একটি ইউনিক আইডি তৈরি করে।

একইভাবে, আমরা একটি টুডু টগল করার জন্য রিডাকশনটি লিখতে পারি:

javascript
Copy code
const TOGGLE_TODO = 'todos/toggleTodo';

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export default toggleTodo;
এই রিডাকশনটি টুডু টগল করবে এবং payload আইডি হবে টগল করতে চাইমুলটি রেফারেন্স করা হবে।

আমরা একটি আরেডিউস থাকলে স্থানীয়ভাবে আমরা টুডু স্লাইস কনেক্ট করতে পারি। নিচে উদাহ

আমরা টুডু স্লাইস কনেক্ট করতে চাইলে রিডাক্স থাকলে useDispatch হুক ব্যবহার করে রিডাকশন পাঠাতে পারি। আমরা নিচে একটি উদাহরণ দেখাচ্ছি:

javascript
Copy code
import React from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './todosSlice';

const AddTodoForm = () => {
  const [text, setText] = React.useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={handleChange} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodoForm;
এখানে আমরা স্থানীয়ভাবে useDispatch হুক ব্যবহার করে টুডু স্লাইসের একটি রিডাকশন পাঠাচ্ছি। আমরা addTodo রিডাকশনটি ব্যবহার করছি যা নতুন টুডু যুক্ত করবে।

আমরা একটি টুডু লিস্ট দেখার জন্য নিচের কোডটি ব্যবহার করতে পারি:

javascript
Copy code
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, selectTodos } from './todosSlice';

const TodoList = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            {todo.text}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
এখানে আমরা useSelector হুক ব্যবহার করে টুডু স্লাইস থেকে টুড

আমরা টুডু স্লাইসে একটি ফিল্টার প্রয়োজন হলে নিচের মত একটি রিসেলার ফাংশন ব্যবহার করতে পারি:

javascript
Copy code
import { createSelector } from '@reduxjs/toolkit';

const selectTodos = (state) => state.todos;

export const selectFilteredTodos = createSelector(
  selectTodos,
  (todos) => todos.filter((todo) => !todo.completed)
);
এখানে আমরা createSelector ব্যবহার করে ফিল্টার করা টুডু লিস্ট সিলেক্ট করতে পারি। এটি ক্রিয়েটরটি একটি সিকোয়েন্স অব মিমোরি লেভেল ক্রিয়েট করে তৈরি করে।

উপরের ফিল্টার ফাংশনটি ব্যবহার করে টুডু লিস্ট দেখানোর জন্য আমরা নিচের কোডটি ব্যবহার করতে পারি:

javascript
Copy code
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, selectFilteredTodos } from './todosSlice';

const FilteredTodoList = () => {
  const todos = useSelector(selectFilteredTodos);
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            {todo.text}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default FilteredTodoList;
এখানে আমরা selectFilteredTodos সিলেক্টর ফাংশন ব্যবহার করে টুডু লিস্ট ফিল্টার করে নিচ্ছি।

উপরের কোডগুলি ব্যবহার করে আপনি রিয়েক্ট রিডাক্স টুলকিট ব্যব

আপনি রিয়েক্ট রিডাক্স টুলকিট ব্যবহার করে আরও অনেক কাজ করতে পারেন, যেমন রিডাক্স থাকলে কিভাবে আপনি একটি অ্যাপ্লিকেশন থিম চেঞ্জ করতে পারেন, কিভাবে আপনি রিডাক্স একটি অ্যাপ্লিকেশনের সাথে সামঞ্জস্যপূর্ণ অ্যাপ্লিকেশন লোড করতে পারেন এবং অন্যান্য সমস্যার সমাধান করতে পারেন।

উপরে উল্লেখিত প্রথম কয়েকটি উদাহরণটি দেখে আপনি রিয়েক্ট রিডাক্স টুলকিট ব্যবহার করে কিভাবে টুডু অ্যাপ্লিকেশন বানাতে হয় সেটা শিখে ফেলেছেন। আশা করি এখন আপনি আপনার বাংলা ডকুমেন্টেশন গাইডলাইন লিখতে পারবেন। ধন্যবাদ!
