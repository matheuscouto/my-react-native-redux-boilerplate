import { combineEpics } from 'redux-observable';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';


// ACTIONS
const actionCreator = actionCreatorFactory('APP::STATE');
export const init = actionCreator('INIT');

// STATE
export interface IState {
	initialized: boolean;
}

const INITIAL_STATE: IState = {
	initialized: false,
};

// REDUCER
export default reducerWithInitialState(INITIAL_STATE)
	.case(init, (state: IState) => ({
		...state,
		initialized: true,
	}))
	.build();

// EFFECTS
export const epics = combineEpics();