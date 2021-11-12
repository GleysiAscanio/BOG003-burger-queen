import { enableIndexedDbPersistence } from "firebase/firestore";
import { db } from './firebaseConfig';

//firebase Offline
enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code === 'failed-precondition') {
          alert('La Aplicación ya está funcionando en otra pestaña');
      } else if (err.code === 'unimplemented') {
          alert('Este navegador no es compatible, utiliza Firefox, Chrome ó Safari');
      }
  });