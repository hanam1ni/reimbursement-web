import Mailjet from "node-mailjet";

export const sendEmail = async ({
  subject,
  body,
}: {
  subject: string;
  body: string;
}) => {
  const mailjet = Mailjet.apiConnect(
    "ea791137a005fc0ecca70cfa19603c6b",
    "10579edab7a67e04ad7296d8a2e4ab37"
  );

  return mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "micky@criclabs.co",
          Name: "Criclabs Operation",
        },
        To: [
          {
            Email: "micky@criclabs.co",
            Name: "Micky",
          },
        ],
        Subject: subject,
        HTMLPart: body,
      },
    ],
  });
};
