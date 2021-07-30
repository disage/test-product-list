import firebase from 'firebase'
const config = {
	apiKey: 'AIzaSyCUwlC1znr6UEG46NISLAArI1HtlwQBGzU',
	authDomain: 'testproductlist.firebaseapp.com',
	projectId: 'testproductlist',
	storageBucket: 'testproductlist.appspot.com',
	messagingSenderId: '101816601637',
	appId: '1:101816601637:web:13f77890d6c331a366c3cc'
}
firebase.initializeApp(config)

export default firebase
