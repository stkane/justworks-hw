## Justworks Takehome Assignment
### Quick Setup 
1. `npm install`
2. See passing tests with `npm test`
3. Run `npm start` to see the amount of each coin you should buy if you had $100. 
4. The "solution" function is in `determineCryptoPurchases.js`

### Summary

This was a fun assignment! Here's a bit of documentation on my thoughts and how the code is organized:

- My solution pulls live data from the coinbase API mentioned in the prompt. I added some basic error handling in an axios interceptor.
- The prompt mentioned that the function should take USD as a parameter and return the amount of BTC and ETH you would buy assuming you spent 70% of your dollars on BTC and 30% on ETH. I wanted to be true to the prompt, so I hardcoded the split in the function. If I were to extend this function and make it more flexible, I'd probably remove the hardcoded values and add the following as parameters to the function: `dollars, coinSplit, currency`. 
- There are some long decimals in these conversion rates! [Javascript isn't great at decimal math out of the box](https://nicozerpa.com/javascript-decimal-problem/), so I included the `Big` library to handle the calculations.
- The prompt mentioned that the function should take dollars as a parameter. If this needed to be in production, I'd probably advocate for the money to represented as cents rather than dollars to avoid issues with decimals (as described in the link above).

