import user from "models/user.js";
import password from "models/password.js";
import { NotFoundError, UnauthorizedError } from "infra/errors.js";

async function getAuthenticatedUser(providedEmail, providedPassword) {
  try {
    const storedUser = await findUserByEmail(providedEmail);
    await validatePassword(providedPassword, storedUser.password);
    return storedUser;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw new UnauthorizedError({
        message: "Authorization data does not check out",
        action: "Please check if the input data is correct",
      });
    }
    throw error;
  }
  async function findUserByEmail(providedEmail) {
    let storedUser;
    try {
      storedUser = await user.findOneByEmail(providedEmail);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new UnauthorizedError({
          message: "Email does not check out",
          action: "Please check if the input data is correct",
        });
      }
      throw error;
    }
    return storedUser;
  }
  async function validatePassword(providedpPassword, storedPassword) {
    const correctPasswordMatch = await password.compare(
      providedPassword,
      storedPassword,
    );
    if (!correctPasswordMatch) {
      throw new UnauthorizedError({
        message: "Password does not check out",
        action: "Please check if the input data is correct",
      });
    }
  }
}

const authentication = {
  getAuthenticatedUser,
};

export default authentication;
