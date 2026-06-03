import email from "infra/email.js";
import database from "infra/database.js";
import webserver from "infra/webserver.js";
import { NotFoundError } from "infra/errors.js";

const EXPIRATION_IN_MILLISECONDS = 60 * 15 * 1000; // 15 minutes

async function findOneValidById(tokenId) {
  const activationTokenObject = await runSelectQuery(tokenId);
  return activationTokenObject;

  async function runSelectQuery(tokenId) {
    const result = await database.query({
      text: `
      SELECT
       *
      FROM
       user_activation_tokens
      WHERE
       id = $1 
       AND expires_at > NOW()
       AND used_at IS NULL
      LIMIT
        1
      ;`,
      values: [tokenId],
    });
    if (result.rowCount === 0) {
      throw new NotFoundError({
        message: "Activation token not found or expired",
        action: "Please register again",
      });
    }
    return result.rows[0];
  }
}

async function findOneByUserId(userId) {
  const newToken = await runInsertQuery(userId);
  return newToken;

  async function runInsertQuery(userId) {
    const result = await database.query({
      text: `
      SELECT
       *
      FROM
       user_activation_tokens
      WHERE
       user_id = $1
      LIMIT
        1
      ;`,
      values: [userId],
    });
    return result.rows[0];
  }
}

async function create(userId) {
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);

  const newToken = await runInsertQuery(userId, expiresAt);
  return newToken;

  async function runInsertQuery(userId, expiresAt) {
    const result = await database.query({
      text: `
      INSERT INTO 
        user_activation_tokens (user_id, expires_at)
       VALUES
        ($1, $2)
       RETURNING
        *
       ;`,
      values: [userId, expiresAt],
    });
    return result.rows[0];
  }
}

async function sendEmailToUser(user, activationToken) {
  await email.send({
    from: "no-reply@hugaonews.com.br",
    to: user.email,
    subject: "Activate your account",
    text: `Hello ${user.username},\n\nPlease activate your account by clicking the following link:
\n${webserver.origin}/registering/activate/${activationToken.id}\n
Thank you!`,
  });
}

const activation = {
  create,
  sendEmailToUser,
  findOneByUserId,
  findOneValidById,
};

export default activation;
