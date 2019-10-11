//If using a CDN, otherwise import these
const reactDOM = ReactDOM;
const {Provider, connect} = ReactRedux;
const {createStore, bindActionCreators} = Redux;

const INCR_COUNTER = 'incr_counter'; //action
const DECR_COUNTER = 'decr_counter';
const INCR_COUNTER_CUSTOM = 'INCR_COUNTER_CUSTOM';

const incrCounter = () => { // action creator
	return ({type: INCR_COUNTER})
}

const decrCounter = () => {
	return ({type: DECR_COUNTER})
}

const incrCounterCustom = (numIncr) => {
	return ({
		type: INCR_COUNTER_CUSTOM,
		payload: numIncr
	})
}

const CounterReducer = (state=0, action) => { // reducer, count is our state
	switch(action.type) {
		case INCR_COUNTER:
			return state + 1;
    case DECR_COUNTER:
			return state - 1;
    case INCR_COUNTER_CUSTOM:
			return state + action.payload
		default:
			return state;
	}
}

const store = createStore(CounterReducer); //second parameter to store is setting initial value ex. count=100;


const CounterComp = (props) => {

	const [countInput, setCountInput] = React.useState(0);

	const handleClickIncr = () => {
		props.incrCounter();
	}

	const handleClickDecr = () => {
		props.decrCounter();
	}

	const handleClickCustom = () => {
		props.incrCounterCustom(Number(countInput));
	}

	const handleCountInput = (item) => {
		setCountInput(item.target.value);
	}

	return (
		<div>
			{props.count}
			<button onClick={handleClickIncr}>Increment</button>
			<button onClick={handleClickDecr}>Decrement</button>
			<br/>
			<input type="number" value={countInput} onChange={handleCountInput}/>
			<button onClick={handleClickCustom}>Increment by Custom</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return ({count:state})
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({incrCounter, decrCounter, incrCounterCustom}, dispatch);
}

const CounterCompContainer = connect(mapStateToProps, mapDispatchToProps)(CounterComp);

const App = () => {
	return (
		<CounterCompContainer />
	)
}

reactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'))