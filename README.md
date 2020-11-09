Example showing failure to run `tenderly export` in a hardhat environment.

Reproduction steps:

Install / setup:
```
yarn install
npx oz init
curl https://raw.githubusercontent.com/Tenderly/tenderly-cli/master/scripts/install-linux.sh | sudo sh
tenderly login
tenderly export init
```

Create `keystore/secrets.json` containing your credentials:
```
{
  "alchemy": {
    "apiKey": "xxxxxx"
  },
  "tenderly": {
    "username": "xxxxxx",
    "project": "xxxxxx"
  }
}
```

Start a local hardhat node forked from mainnet:
```
npx hardhat --verbose --show-stack-traces node --no-deploy
```

Run a test case, which sends a transaction to the hardhat node:
```
npx hardhat --network localhost test
```

Note the txid in the hardhat node console. Attempt to export that transaction:
```
tenderly export --debug 0x......
```

Results observed:
```
Trying OpenZeppelin config path: networks.js
Collecting network information...

Collecting transaction information...

Unable to get transaction rerunning information: error processing transaction: user error: unable to apply message: insufficient balance to pay for gas, message: Transaction applying error with hash vJf}''m`,Wb+_.
Transaction processing failed. To see more info about this error, please run this command with the --debug flag.
```

Meanwhile, the hardhat node console showed:
```
parity_versionInfo - Method not supported
net_version
eth_getTransactionByHash (2)
eth_getTransactionReceipt
eth_getBlockByNumber
eth_getBlockByHash
eth_getTransactionReceipt
eth_getCode
eth_getTransactionCount
eth_getBalance
```
