import { getTableData, addNewQuote } from '../data/database';

const getAllQuotes = async () =>{
    let data = [
        {id: 1, quote: 'The only way to do great work is to love what you do.', author: null},
        {id: 2, quote: 'Success is not final, failure is not fatal: It is the courage to continue that counts.', author: 'Winston Churchill'},
        {id: 3, quote: 'Don’t watch the clock; do what it does. Keep going.', author: 'Sam Levenson'},
        {id: 4, quote: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt'},
        {id: 5, quote: 'Believe you can and you’re halfway there.', author: null},
    ]; 

    try {
        const res = await getTableData('quote');
        if(res){
            data = res;
        }
    } catch (error) {
        console.error(`Error fetching data from quote table:`, error);
    } finally {
        return data;
    }

}

// Function to add a quote to the database
const addQuote = async (quote, author) => {
    let data = {'stt': 'error', 'msg': 'Quote Adding Failed', 'data': ''};
    try {
        const res = await addNewQuote(quote, author);
        if(res){
            data = {'stt': 'success', 'msg': 'Quote Successfully Added!', 'data': res.insertId};
        }
    } catch (error) {
        console.error(`Error fetching data from quote table:`, error);
    } finally {
        return data;
    }
};

export { getAllQuotes, addQuote }