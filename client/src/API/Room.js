import server from '../axios';

export const getRoom = async roomID => {
  const response = await server.get(`/rooms/${roomID}`).catch(error => error.response.data);
  if (!response.data.ok) {
    window.location.href.replace('/joined-rooms');
    return;
  }
  return response.data.data;
};
