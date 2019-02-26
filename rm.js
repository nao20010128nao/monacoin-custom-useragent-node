const yaml = require("yaml");
const fs = require("fs");

const [servName, uaClient] = process.argv.slice(2);
const raw = fs.readFileSync("docker-compose.yml").toString("utf8");
const parsed = yaml.parse(raw);

if (!servName) {
  console.log("usage: node rm.js serviceName");
  process.exit(1);
}

delete parsed.services[servName];

const output = yaml.stringify(parsed);
console.log(output);
fs.writeFileSync("docker-compose.yml", output);
