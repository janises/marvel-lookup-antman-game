import axios from 'axios';
import md5 from 'md5';


export default function getCharacterInfo() {
    
const ts = Date.now(),
      hash = md5(ts+this.state.privateKey+this.state.publicKey);
     return axios.get(`${this.state.charactersURL}?apikey=${this.state.publicKey}&hash=${hash}&ts=${ts}`)
}