const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get('target-user').value;
    const duration = interaction.options.get('duration').value;
    const reason = interaction.options.get('reason')?.value || 'No reason provided';

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
      await interaction.editReply("That user doesn't exist in this server.");
      return;
    }

    const mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');

    if (!mutedRole) {
      await interaction.editReply("The 'Muted' role is not set up in this server. Please create the role and try again.");
      return;
    }

    if (targetUser.roles.cache.has(mutedRole.id)) {
      await interaction.editReply(`${targetUser} is already muted.`);
      return;
    }

    // Mute the targetUser
    try {
      await targetUser.roles.add(mutedRole, reason);
      await interaction.editReply(`${targetUser} was muted for ${duration}.\nReason: ${reason}`);

      // Unmute after duration
      setTimeout(async () => {
        await targetUser.roles.remove(mutedRole, 'Auto-unmuted');
      }, ms(duration));
    } catch (error) {
      console.error(`There was an error when muting: ${error}`);
      await interaction.editReply('There was an error when muting the user.');
    }
  },

  name: 'mute',
  description: 'Mute a member from sending messages in all channels.',
  options: [
    {
      name: 'target-user',
      description: 'The user you want to mute.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'duration',
      description: 'Duration of the mute (e.g., 1h, 30m, 2d).',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'reason',
      description: 'The reason for muting the user.',
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.ManageRoles],
  botPermissions: [PermissionFlagsBits.ManageRoles],
};
