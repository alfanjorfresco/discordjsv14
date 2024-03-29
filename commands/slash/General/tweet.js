const { EmbedBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
    name: "tweet",
    description: "Crear Tweet.",
    type: 1,
    options: [
        {
            type: 6,
            name: "usuario",
            description: "Usuario del Tweet.",
            required: true
        },
        {
            type: 3,
            name: "texto",
            description: "Texto del Tweet.",
            required: true
        }
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config) => {
        const user = interaction.options.getUser("usuario");
        const text = interaction.options.get("texto").value;
        const avatarUrl = user.avatarURL({ extension: "jpg" });

        await interaction.deferReply({ content: "Cargando..." });

        let image = `https://some-random-api.com/canvas/tweet?avatar=${avatarUrl}&displayname=${
            user.username
        }&username=${user.username}&comment=${encodeURIComponent(text)}`;

        const embed = new EmbedBuilder()
            .setImage(image)
            .setColor("#AA70F8")
            .setTimestamp()
            .setFooter({
                text: process.env.NAME_BOT,
                iconURL: client.user.displayAvatarURL()
            });

        await interaction.editReply({ embeds: [embed] });
    }
};
