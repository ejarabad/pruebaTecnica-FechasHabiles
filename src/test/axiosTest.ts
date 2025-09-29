import axios from "axios";

const testAxios = async () => {
    const url = 'https://content.capta.co/Recruitment/WorkingDays.json';
    const response = await axios.get(url);
    console.log(response.data);
}

testAxios();