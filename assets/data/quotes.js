const getAllQuotes = async () =>{
    let data = [
        {id: 1, quote: 'The only way to do great work is to love what you do.', author: null},
        {id: 2, quote: 'Success is not final, failure is not fatal: It is the courage to continue that counts.', author: 'Winston Churchill'},
        {id: 3, quote: 'Don’t watch the clock; do what it does. Keep going.', author: 'Sam Levenson'},
        {id: 4, quote: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt'},
        {id: 5, quote: 'Believe you can and you’re halfway there.', author: null},
    ];     

    return data;
}

export { getAllQuotes }