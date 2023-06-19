export const usernameValidator = (username) => {
  if (!username || username.length <= 0)
    return "Numele de utilizator nu poate fii gol";
};
export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  return "";
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return "Password cannot be empty.";

  return "";
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return "Name cannot be empty.";

  return "";
};

/* export const LocalStorage = {
  getItem: (key) => {
    let value;
    return AsyncStorage.getItem(key).then((val) => {
       value = val;
    });
    //console.log(value);
    // return value;
  },
  setItem: (key, value) => {
    let result;
    AsyncStorage.setItem(key, value).then((_) => (result = true));
    return result;
  },
};
 */

export const convertStatus = (status) => {
  switch (status) {
    case "VERIFYING": {
      return "Sesizare in curs de verificare";
    }
    case "IN_PROGRESS": {
      return "Sesizare in lucru";
    }
    case "DONE": {
      return "Sesizare rezolvata";
    }
  }
};
