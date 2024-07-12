// import React, { Component, useState } from 'react'
import React, { useState } from 'react'
import '../styles/App.css'

const App = () => {
	const [form, setForm] = useState({ input1: '', input2: '' })
	const [outputStatus, setOutputStatus] = useState('')

	const { input1, input2 } = form

	const handleChange = (e) => {
		const { name, value } = e.target

		setForm((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const getResult = () => {
		const mapp = new Map()
		input1
			.split('')
			.forEach((ch) => mapp.set(ch, mapp.has(ch) ? mapp.get(ch) + 1 : 1))

		const countCommonChar = input2.split('').reduce((acc, ch) => {
			if (mapp.has(ch)) {
				mapp.set(ch, mapp.get(ch) - 1)
				if (mapp.get(ch) == 0) {
					mapp.delete(ch)
				}
				return acc + 1
			} else {
				return acc
			}
		}, 0)

		const outputArr = [
			'Siblings',
			'Friends',
			'Love',
			'Affection',
			'Marriage',
			'Enemy',
		]

		const result = input1.length + input2.length - 2 * countCommonChar

		return outputArr[result % 6]
	}

	const handleClick = (e) => {
		e.preventDefault()
		if (!input1.trim() || !input2.trim()) {
			setOutputStatus('Please Enter valid input')
			return
		}

		const output = getResult()
		setOutputStatus(output)
	}

	const handleReset = () => {
        setForm({ input1: '', input2: '' })
        setOutputStatus('')
	}

	return (
		<div id='main'>
			{/* Do not remove the main div */}
			<input
				name='input1'
				value={input1}
				onChange={handleChange}
				type='text'
				data-testid='input1'
				placeholder='Enter first name'
			/>
			<input
				name='input2'
				value={input2}
				onChange={handleChange}
				type='text'
				data-testid='input2'
				placeholder='Enter second name'
			/>
			<button onClick={handleClick} data-testid='calculate_relationship'>
				Calculate Relationship Future
			</button>
			<button data-testid='clear' onClick={handleReset}>
				Clear
			</button>
			<h3 data-testid='answer'>{outputStatus}</h3>
		</div>
	)
}

export default App

// class App extends Component {
//     render() {

//         return(
//             <div id="main">
//                 {/* Do not remove the main div */}
//                 <input type="text" data-testid="input1" placeholder="Enter first name"/>
//                 <input type="text" data-testid="input2" placeholder="Enter second name" />
//                 <button data-testid="calculate_relationship">Calculate Relationship Future</button>
//                 <button data-testid="clear">Clear</button>
//                 <h3 data-testid="answer"></h3>
//             </div>
//         )
//     }
// }

// export default App;
