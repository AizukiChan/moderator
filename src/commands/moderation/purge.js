const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const amount = interaction.options.get('amount').value;

    if (amount <= 0 || amount > 100) {
      await interaction.reply('Jumlah pesan yang akan dihapus harus antara 1 hingga 100.');
      return;
    }

    await interaction.deferReply();

    try {
      await interaction.channel.bulkDelete(amount);
      await interaction.editReply(`${amount} pesan berhasil dihapus.`);
    } catch (error) {
      console.error(error);
      await interaction.editReply('Terjadi kesalahan saat mencoba menghapus pesan.');
    }
  },

  name: 'purge',
  description: 'Menghapus pesan dalam channel.',
  options: [
    {
      name: 'amount',
      description: 'Jumlah pesan yang akan dihapus',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.ManageMessages],
  botPermissions: [PermissionFlagsBits.ManageMessages],
};
