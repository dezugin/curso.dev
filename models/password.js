import bcryptjs from "bcryptjs";

async function hash(password) {
  const pepper = process.env.PASSWORD_PEPPER;
  const passwordWithPepper = password + pepper;
  const rounds = getNumberOfRounds();
  return await bcryptjs.hash(passwordWithPepper, rounds);
}

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

async function compare(providedPassword, storedPassword) {
  return await bcryptjs.compare(
    providedPassword + process.env.PASSWORD_PEPPER,
    storedPassword,
  );
}

const password = {
  hash,
  compare,
};

export default password;
