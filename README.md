# Getting Started with Create React App

Clone of the Ethereum Block Explorer
Built with Ethers, React Router, React Bootstrap, Axios and Express.

### Using the App

After downloading this repo from github and installing the node packages with `npm i`, make sure you have Alchemy or other JSON-RPC provider URLs for Mainnet, Goerli and Rinkeby to replace the `process.env.<YOUR_KEY_HERE>` variables in server/index.js.

1. Change directory into the server folder `cd server` and run it in a window of terminal `node index`

2. In a new tab/window of terminal, run `npm start`. This should start up your browser and point to localhost:3000

3. The app is now ready for use, browse and interact with it as you would with normal Etherscan!

### Key Features

✅ Search bar distinguishes between addresses, transaction hashes and block numbers and redirects users accordingly

✅ Polls network for new blocks every 15s and displays it on the home page

✅ Click onto any transaction listed in a block to view its details

✅ Switch between Mainnet, Rinkeby and Goerli networks from dropdown menu

✅ Use the URL route to find transaction `/tx/`, account `/address/` or block `/block/` details

✅ Frontend styled with React Bootstrap

### Future Work

- Make the navbar aware of routing changes
- Determine the gas price based on how much has been spent on the latest transactions. For example, you could use the average of the last 500 transactions to determine the current expected price