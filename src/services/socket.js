import io from 'socket.io-client/dist/socket.io.js';
import { HOST } from '../ultils/constants/api';

const socket = io(HOST, { jsonp: false });

export default socket;
