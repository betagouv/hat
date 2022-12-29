# Hat

> CLI tool to retrieve WHOIS information and Fraud Scores from IPs, including anonymized ones.

## Usage

You need [Node.js v16+](https://nodejs.org) to run this program.

```sh
git clone https://github.com/betagouv/hat.git
cd hat
npm i
npm start IP # i.e.: `npm start 103.21.244.0`
```

Once it's done, the results will be automatically written in both local `results.csv` and `results.json` files.

### Multiple IPs

You can analyze multiple IPs:

```sh
npm start IP_1 IP_2 IP_3
```

### Anonymized IPs

If your IP is missing its last part because it was anonymized (i.e.: `103.21.244.XX`),
you can also parse it like that (and you can also add multiple anonymized IPs):

```sh
npm start 103.21.244
```

The analysis will automatically check all the IPs ranging from `103.21.244.0` to `103.21.244.255`.
