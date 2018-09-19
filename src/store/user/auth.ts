import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import actionCreatorFactory from 'typescript-fsa';
import { filter, mergeMap, map } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import {
	authStateObservable,
} from '../../services/firebase';

import { Epic, Selector } from '..';
import { init } from '../app/state';

type AuthStateStatus = 'pristine' | 'unauthenticated' | 'authenticated' | 'authorized';

// ACTIONS 

const actionCreator = actionCreatorFactory('AUTH::USER');

export interface IPayloadFetchAuthState {
	authState: AuthStateStatus,
	uid?: string,
}
export const fetchAuthState = actionCreator<IPayloadFetchAuthState>('REQUEST_USER_AUTH_STATE');

// STATE

export interface IState {
	authState: AuthStateStatus,
	uid?: string;
}

const INITIAL_STATE: IState = {
	authState: 'pristine',
};

// SELECTORS

export const selectAuthStateStatus: Selector<AuthStateStatus> = ({ userAuth }) => userAuth.authState;

// REDUCER

export default reducerWithInitialState(INITIAL_STATE)
	.case(fetchAuthState, (state: IState, authState) => ({
		...state,
		...authState,
	}))
	.build();

// EFFECTS

const authStateObservableEpic: Epic = (action$) => action$.pipe(
	filter(init.match),
	mergeMap(() => authStateObservable.pipe(
		map((user) => {
			if(!user) return fetchAuthState({ authState: 'unauthenticated' })
			return fetchAuthState({ authState: 'authenticated', uid: user.uid })
		}),
	)),
);

export const epics = combineEpics(
	authStateObservableEpic,
);
