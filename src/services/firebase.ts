import * as firebase from 'firebase';
import { Observable } from 'rxjs';

const config = {
	apiKey: "AIzaSyCe9XJ---EXAMPLE---SQFBe20s",
	authDomain: "PROJECT-NAME.firebaseapp.com",
	databaseURL: "https://PROJECT-NAME.firebaseio.com",
	projectId: "PROJECT-NAME",
	storageBucket: "PROJECT-NAME.appspot.com",
	messagingSenderId: "XXXXXXXXXXXX"
};

firebase.initializeApp(config);

export default firebase;

// OBSERVABLE EXAMPLE
export const authStateObservable: Observable<{ uid: string } | null> = new Observable((observer) => {
	return firebase.auth().onAuthStateChanged(
		(user) => {
			observer.next(user ? { uid: user.uid } : null);
		},
		observer.error,
		observer.complete,
	);
});

// UPDATE USER PASSWORD EXAMPLE
export const updateUserPassword = async (newPassword:string):Promise<void> => {
	const user = firebase.auth().currentUser
	if(user) { await user.updatePassword(newPassword) }
}