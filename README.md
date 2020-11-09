Example showing failure to run `tenderly export` in a hardhat environment.

Reproduction steps:

Install / setup:
```
yarn install
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
unable to fetch config
 Couldn't read OpenZeppelin config file
 couldn't read new OpenzeppelinConfig config file
 Trying buidler config path: buidler.config.js
 unable to fetch config
  Couldn't read Buidler config file
  couldn't read new Buidler config file
  Trying hardhat config path: %shardhat.config.js
  unable to fetch config
   Couldn't read Hardhat config file
   Trying truffle config path: truffle-config.js
   couldn't read new truffle config file: stat truffle-config.js: no such file or directory
   Trying old truffle config path: truffle-config.js
   unable to fetch config
   Couldn't read old Truffle config file
   OpenZeppelin or Truffle configuration was not detected.

Please re-run this command in a folder where at least one of the frameworks is configured.
```

Two items in the log above may be clues:
* The message `Trying hardhat config path: %shardhat.config.js` has a stray `%s`.
* The message mentions `hardhat.config.js` but not `hardhat.config.ts`.

