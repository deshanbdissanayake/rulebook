import { getTableData, addNewQuote, updateQuote } from '../data/database';

const getAllQuotes = async () =>{
    let data = []; 

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
const addQuote = async (id, quote, author) => {
    let data = { 'stt': 'error', 'msg': 'Quote Adding Failed', 'data': '' };
    try {
        if (id) {
            const res = await updateQuote(id, quote, author);
            if (res.rowsAffected > 0) { // Check if rows were affected during the update
                data = { 'stt': 'success', 'msg': 'Quote Successfully Updated!', 'data': id };
            }
        } else {
            const res = await addNewQuote(quote, author);
            if (res.insertId) { // Check if a new row was inserted
                data = { 'stt': 'success', 'msg': 'Quote Successfully Added!', 'data': res.insertId };
            }
        }
    } catch (error) {
        console.error(`Error handling quote:`, error);
    } finally {
        return data;
    }
};

export { getAllQuotes, addQuote }