const { Client, Interaction } = require('discord.js');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const helpMessage = `
      **Bantuan Bot:**
      - \`/purge\`: Menghapus pesan dalam channel.
      - \`/ban\`: Ban member dari server discord.
      - \`/kick\`: Kick member dari server discord.
      - \`/Mute\`: Membuat member tidak dapat mengakses pesan dari channel maana pun.
      - \`/kick\`: TimeOut member, sama seperti mute, namu tidak menggunakan role.
    `;

    await interaction.reply(helpMessage);
  },

  name: 'help',
  description: 'Menampilkan daftar perintah bot.',
};
