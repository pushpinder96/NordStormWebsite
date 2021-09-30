import axios from 'axios';
import app from 'firebase/app';


const instant= axios.create({
    baseURL:'https://cloth-shop-7c0c4-default-rtdb.firebaseio.com/'
})

export default instant;