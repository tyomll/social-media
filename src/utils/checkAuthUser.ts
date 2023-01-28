import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { setAuthUser, removeAuthUser } from "../redux/authUser/slice";
import { store } from "../redux/store";

export const checkAuthUser = () => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = {
        username: user.displayName,
        email: user.email,
        token: user.refreshToken,
        id: user.uid,
      };
      store.dispatch(setAuthUser(userData));
    } else {
      store.dispatch(removeAuthUser());
    }
  });
  return () => unsubscribe();
}
