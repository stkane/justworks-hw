## Justworks Takehome Assignment: Stephen Kane
### Quick Setup 
1. `npm install`
2. See passing tests with `npm test`
3. Run `npm start` to see the amount of each coin you should buy if you had $100. 
4. The "solution" function is in `determineCryptoPurchases.js`

### Summary

This was a fun assignment! Here's some context on my thoughts and how the code is organized:

- My solution pulls live data from the coinbase API mentioned in the prompt. I added some basic error handling in an axios interceptor. See the `apis/coinbase-api` folder if you're curious about how it's structured.
- The prompt mentioned that the function should take USD as a parameter and return the amount of BTC and ETH you would buy assuming you spent 70% of your dollars on BTC and 30% on ETH. I wanted to be true to the prompt, so I hardcoded the percentages in the function. If I were to extend this function and make it more flexible, I'd probably remove the hardcoded values and add the following as parameters to the function: `dollars, coinSplit, currency`. 
- There are some long decimals in these conversion rates! See the section below on Floating Point Numbers for why I used the Big library to handle these long decimals.
- The prompt mentioned that the function should take dollars as a parameter. If this needed to be in production, I'd probably advocate for the money to represented as cents rather than dollars to avoid issues with decimals (as described in the link above).

Thanks so much for taking a look at this assignment -- looking forward to discussing!

### Floating Point Numbers

Because crypto currencies allow us to buy the tiniest fractions of a coin, we need to be able to handle extremely small numbers in decimal form. Javascript, however, doesn't handle decimals very well. Try the following simple math in your node shell:

```
> 0.1 + 0.2
0.30000000000000004
```

The crux of the problem is that JS uses a base-2 standard (zeros and ones) for floating point arithmetic, which can lead to infinitely repeating patterns of zeros and ones to represent a decimal number (not unlike how `1/3 = 0.3333...`, which occurs in base 10). Plain JS can't handle repeating numbers, so it'll naively truncate them -- essentially doing the equivalent of saying that `1/3 + 1/3 + 1/3 = 0.999...` rather than `1`. The `big.js` library seemed to provide the most precision for decimals while still being a relatively small package. 

-- Stephen