module.exports = async function requestedRGStage(
    client,
    prisma,
    user,
    message
) {
    rgTypedByUser = message.body.replace(/[^\d]+/g, "");

    if (rgTypedByUser.length != 9) {
        client.sendMessage(
            message.from,
            "RG inválido (não possui 9 dígitos), por gentileza digite novamente."
        );
    } else {
        const RGAlreadyExists = await prisma.users.findFirst({
            where: {
                rg: rgTypedByUser,
            },
        });

        if (RGAlreadyExists) {
            client.sendMessage(
                message.from,
                "Esse RG já existe em nosso sistema, por favor, tente novamente."
            );
        } else {
            await prisma.users.update({
                where: {
                    id: user.id,
                },
                data: {
                    rg: rgTypedByUser,
                },
            });

            client.sendMessage(message.from, "Digite seu *E-mail*.");

            await prisma.users.update({
                where: {
                    id: user.id,
                },
                data: {
                    stage: "requestedEmail",
                },
            });
        }
    }
};
