
'use strict';



//* Creates firebase admin and gets access to firestore defined in same firebase project.
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();
