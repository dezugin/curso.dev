import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

describe("infra/email", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
    await orchestrator.deleteAllEmails();
  });
  test("send()", async () => {
    await email.send({
      from: "HugaoNews <contato@hugaonews.com.br>",
      to: "hey@hugos.com.br",
      subject: "Test email",
      text: "This is a test email sent from the HugaoNews website.",
    });

    await email.send({
      from: "HugaoNews <contato@hugaonews.com.br>",
      to: "hey@hugos.com.br",
      subject: "Last test email",
      text: "This is the last test email sent from the HugaoNews website.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<contato@hugaonews.com.br>");
    expect(lastEmail.recipients[0]).toBe("<hey@hugos.com.br>");
    expect(lastEmail.subject).toBe("Last test email");
    expect(lastEmail.text).toBe(
      "This is the last test email sent from the HugaoNews website.\n",
    );
  });
});
