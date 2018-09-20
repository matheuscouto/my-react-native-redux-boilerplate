import firebase from 'react-native-firebase';
import { Observable } from 'rxjs';

// OBSERVABLE EXAMPLE
export const authStateObservable: Observable<{ uid: string } | null> = new Observable((observer) => {
	return firebase.auth().onAuthStateChanged(
		(user: {uid: string } | null) => {
			observer.next(user ? { uid: user.uid } : null);
		},
	);
});

// UPDATE USER PASSWORD EXAMPLE
export const updateUserPassword = async (newPassword:string):Promise<void> => {
	const user = firebase.auth().currentUser
	if(user) { await user.updatePassword(newPassword) }
}