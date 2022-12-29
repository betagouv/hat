# Hat

> CLI tool to retrieve WHOIS information and Fraud Scores from IPs, including anonymized ones (ending with `.XX`).

- [Example](#example)
  - [Outputs](#outputs)
- [Usage](#usage)
  - [Multiple IPs](#multiple-ips)
  - [Anonymized IPs](#anonymized-ips)

## Example

```sh
$ npm start 35.87.2.149 36.112.45.3                                               

> hat@0.0.0 start
> node ./src/index.js 35.87.2.149 36.112.45.3

――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
✔ CHECK: [35.87.2.149] Fraud Score: 100 / 100 (https://scamalytics.com/ip/35.87.2.149).
✔ LOOKUP: [35.87.2.149] Country: US, Name: AT-88-Z AMAZON-ZPDX (Amazon Technologies Inc. (AT-88-Z) Amazon.com, Inc. (AMAZO-47)).

――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
✔ CHECK: [36.112.45.3] Fraud Score: 30 / 100 (https://scamalytics.com/ip/36.112.45.3).
✔ LOOKUP: [36.112.45.3] Country: CN ZZ CN, Name: CHINANET-BJ (CHINANET Beijing province network).

――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
✔ Results written in `/home/ivan/Workspace/betagouv/hat/results.csv` and `/home/ivan/Workspace/betagouv/hat/results.json`.
```

### Outputs

**results.csv**

```csv
"ip","score","risk","checkUrl","netrange","cidr",...
"35.87.2.149","100","very high","https://scamalytics.com/ip/35.87.2.149","35.71.64.0 - 35.127.255.255 35.80.0.0 - 35.95.255.255","35.71.64.0/18, 35.72.0.0/13, 35.96.0.0/11, 35.80.0.0/12, 35.71.128.0/17 35.80.0.0/12",...
"36.112.45.3","30","medium","https://scamalytics.com/ip/36.112.45.3","","",...
```

**results.json**

```json
[
  {
    "check": {
      "ip": "35.87.2.149",
      "score": "100",
      "risk": "very high",
      "checkUrl": "https://scamalytics.com/ip/35.87.2.149"
    },
    "lookup": {
      "netrange": "35.71.64.0 - 35.127.255.255 35.80.0.0 - 35.95.255.255",
      "cidr": "35.71.64.0/18, 35.72.0.0/13, 35.96.0.0/11, 35.80.0.0/12, 35.71.128.0/17 35.80.0.0/12",
      "netname": "AT-88-Z AMAZON-ZPDX",
      // ...
    }
  },
  {
    "check": {
      "ip": "36.112.45.3",
      "score": "30",
      "risk": "medium",
      "checkUrl": "https://scamalytics.com/ip/36.112.45.3"
    },
    "lookup": {
      "inetnum": "36.112.0.0 - 36.112.255.255",
      "netname": "CHINANET-BJ",
      "country": "CN ZZ CN",
      //...
    }
  }
]
```

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
