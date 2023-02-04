const { EmbedBuilder } = require("discord.js");
const backup = require("discord-backup");
const moment = require("moment");
require("dotenv").config();

module.exports = {
    name: "info-backup",
    description: "Crear backup servidor.",
    type: 1,
    options: [
        {
            type: 3,
            name: "id-backup",
            description: "Id del backup.",
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages",
    },
    run: async (client, interaction, config) => {
        const idBackup = interaction.options.get("id-backup").value;

        if (interaction.user.id !== process.env.ID_OWNER) {
            interaction.reply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder().setDescription("⛔ No tienes permisos.").setColor("#EA3939"),
                ],
            });
            return;
        }

        const getBackup = async () => {
            let embed;
            await backup
                .fetch(idBackup)
                .then((backupInfos) => {
                    const date = new Date(backupInfos.data.createdTimestamp);
                    embed = new EmbedBuilder()
                        .setAuthor({
                            name: "Información del backup",
                            iconURL: interaction.user.displayAvatarURL(),
                        })
                        .addFields(
                            {
                                name: "Backup ID",
                                value: backupInfos.id,
                                inline: false,
                            },
                            {
                                name: "Servidor ID",
                                value: backupInfos.data.guildID,
                                inline: false,
                            },
                            {
                                name: "Tmañao",
                                value: `${backupInfos.size} kb`,
                                inline: false,
                            },
                            {
                                name: "Creado",
                                value: `${moment(date)
                                    .locale("es")
                                    .format("DD/MM/YYYY (HH:mm:ss)")}`,
                                inline: false,
                            }
                        )
                        .setColor("#FF0000");
                })

                .catch((err) => {
                    interaction.reply({
                        ephemeral: true,
                        content: "No se pudo encontrar el backup.\n" + err,
                    });
                });

            return embed;
        };

        await interaction.deferReply({ content: "Cargando...", ephemeral: true });
        const result = await getBackup();
        await interaction.editReply({ embeds: [result], ephemeral: true });
    },
};
