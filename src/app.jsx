import React, { useCallback, useState } from 'react';
import './app.css';
import Navbar from './components/navbar';
import Habits from './components/habits';

const App = () => {
	const [habits, setHabits] = useState([
		{ id: 1, name: 'Reading', count: 0},
		{ id: 2, name: 'Running', count: 0},
		{ id: 3, name: 'Coding', count: 0},
	]);

	// 방법 1
	const handleAdd = useCallback(name => {
		setHabits([ ...habits, { name, count: 0, id: Date.now() } ])
  }, [habits]);

	// 방법 2
	const handleIncrement = useCallback(habit => {
		setHabits(habits => habits.map(item => {
			if(item.id === habit.id) {
				item = { ...item, count: item.count + 1 }
			}
			return item
		}))
	}, []);

	const handleDecrement = useCallback(habit => {
		setHabits(habits => habits.map(item => {
			if(item.id === habit.id) {
				const count = item.count - 1
				item = { ...item, count:  count < 0 ? 0 : count }
			}
			return item
		}))
	}, []);

	const handleDelete = useCallback(habit => {
		setHabits(habits => habits.filter(item => item.name !== habit.name))
	}, []);

  const handleReset = useCallback(() => {
		setHabits(habits => habits.map(item => {
			if(item.count !== 0) return { ...item, count: 0 };
			else return item;
		}))
  }, []);

	return (
		<>
			<Navbar totalCount={
				habits.filter(item => item.count > 0).length
			}/>
			<Habits
				habits={habits}
				onIncrement={handleIncrement}
				onDecrement={handleDecrement}
				onDelete={handleDelete}
				onAdd={handleAdd}
				onReset={handleReset}
			/>
		</>
	);
};

export default App;

// 참고
// https://kyounghwan01.github.io/blog/React/exhaustive-deps-warning/#_2-useeffect-%E1%84%82%E1%85%A2%E1%84%87%E1%85%AE%E1%84%8B%E1%85%A6-%E1%84%92%E1%85%A1%E1%86%B7%E1%84%89%E1%85%AE%E1%84%85%E1%85%B3%E1%86%AF-%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%92%E1%85%A1%E1%86%AB-%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%AE