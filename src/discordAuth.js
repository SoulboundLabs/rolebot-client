
// Implicit Grant Config
const PARAMS = {
  clientID: '962006920007393351',
  clientSecret: '' // If required, move into .env
};
export const DiscordAuthURL = `https://discord.com/api/oauth2/authorize?client_id=${PARAMS.clientID}&redirect_uri=https%3A%2F%2Flocalhost%3A3000&response_type=token&scope=identify`;