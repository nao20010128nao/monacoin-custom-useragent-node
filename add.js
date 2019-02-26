const yaml = require("yaml");
const fs = require("fs");
function createService(servName, uaClient) {
  return {
    volumes: ["./temp/" + servName + ":/root/.monacoin"],
    image: "nao20010128nao/homebrew-bitzeny-hacked:monacoin",
    entrypoint: [
      "monacoind",
      "-server=1",
      "-printtoconsole=1",
      "-disablewallet=1",
      "-prune=550",
      "-uaclient=" + uaClient
    ],
    dns: "1.1.1.1"
  };
}

const [servName, uaClient] = process.argv.slice(2);
const raw = fs.readFileSync("docker-compose.yml").toString("utf8");
const parsed = yaml.parse(raw);

if (!servName) {
  console.log("usage: node add.js serviceName uaClient");
  process.exit(1);
}

parsed.services[servName] = createService(servName, uaClient);
//console.log(parsed);

const output = yaml.stringify(parsed);
console.log(output);
fs.writeFileSync("docker-compose.yml", output);
