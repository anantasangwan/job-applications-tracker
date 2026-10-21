import { useState, useEffect } from 'react';

const getQuote = async () => {
    const response = await fetch(
        "https://dummyjson.com/quotes/random"
    );

    const data = await response.json();

    console.log(data.quote);
    console.log(data.author);
    return data;
};

const Quote = () => {
    // stores the fetched quote
    const [quote, setQuote] = useState(null);

    // runs the fetch operation when the component mounts
    // --- accepts synchronous callback function only ----
    useEffect(() => {
        const fetchQuote = async () => {
            // -- handles the asynchronous operation --
            const data = await getQuote();
            // updates the state, triggering a re-render
            setQuote(data);
        };

        fetchQuote();
    }, [])


    return (
        <div className="quote bg-white space-y-1 px-5 max-sm:px-3 py-2.5 rounded-lg border-l-4 border-l-charcoalTxt shadow-md w-[97%] max-sm:w-full">
            <div className='w-[60%] max-sm:w-full font-medium italic font-playfair'>
                {quote ? quote.quote : ""}
            </div>
            <div className='text-coralpinkTxt font-semibold text-[15px]'>
                {quote ? `- ${quote.author}` : ""}
            </div>
        </div>
    )
}

export default Quote
