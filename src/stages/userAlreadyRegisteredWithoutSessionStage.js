const sendServiceOptions = require("../lib/sendServiceOptions");
const sleep = require("../utils/sleep");

module.exports = async function userAlreadyRegisteredWithoutSessionStage(
    client,
    prisma,
    user,
    message,
    chat
) {
    chat.sendStateTyping();

    await sleep(1500);

    client.sendMessage(
        message.from,
        `Olá Dr(a) ${
            user.name.split(" ")[0]
        }, eu sou a assistente virtual da Liber, pronta para agilizar seu atendimento e torná-lo ainda mais eficiente. Como posso ajudá-lo(a) hoje? 🩺✅👩🏻‍💻`
    );

    await sleep(1000);

    chat.sendStateTyping();

    await sleep(1500);

    await sendServiceOptions(client, message, chat);

    await prisma.users.update({
        where: {
            id: user.id,
        },
        data: {
            stage: "requestedServiceNumber",
        },
    });
};
