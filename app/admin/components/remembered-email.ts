const SAVED_ADMIN_EMAIL_KEY = "moto-admin-email";

function readRememberedEmail() {
  try {
    return localStorage.getItem(SAVED_ADMIN_EMAIL_KEY) ?? "";
  } catch {
    return "";
  }
}

function saveRememberedEmail(email: string, rememberDevice: boolean) {
  try {
    if (rememberDevice) {
      localStorage.setItem(SAVED_ADMIN_EMAIL_KEY, email);
      return;
    }

    localStorage.removeItem(SAVED_ADMIN_EMAIL_KEY);
  } catch {
    // Login still works if local storage is blocked.
  }
}

export const rememberedEmail = {
  read: readRememberedEmail,
  save: saveRememberedEmail,
};
