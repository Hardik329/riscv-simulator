import express from "express";
import fs from "fs";
import { spawn } from "child_process";
import cors from "cors";

let register = [];
let memory = new Map();

let policy = 1;
let ways = 4;

let cache_size = 4;
let cache_block_size = 4;
let mapping = 1;
let filename = "input.mc";

let child;

const input = () => {
  let inputText =
    filename +
    "\n" +
    cache_size.toString() +
    "\n" +
    cache_block_size.toString() +
    "\n" +
    mapping.toString() +
    "\n";
  if (mapping === "2")
    inputText += ways.toString() + "\n" + policy.toString() + "\n";
  else if (mapping === "3") {
    inputText += policy.toString() + "\n";
  }
  try {
    child.stdin.write(inputText);
  } catch (error) {
    console.log(error);
  }
};

const spawnProcess = () => {
  try {
    child = spawn("myRISCVSim.exe");
  } catch (err) {
    console.log(err);
  }
};

const run = async () => {
  child.stdin.write("1\n");
  child.stdin.end();

  child.on("close", (code) => {
    if (code === 0) {
      // Child process exited successfully
      read_data();
    } else {
      console.error(`Child process exited with code ${code}`);
    }
  });
};

const step = async () => {
  child.stdin.write("0\n");
  await new Promise((res) => setTimeout(res, 100));
  read_data();
};

const read_data = () => {
  const filePath = "./Register_file.mc";
  const fileData = fs.readFileSync(filePath, { encoding: "utf8" });
  const lines = fileData.split("\n");
  const mem = fs.readFileSync("data_out.mc", {
    encoding: "utf8",
  });
  let i = 0;

  // Reading register values
  for (const line of lines) {
    const t = line.split(" ");
    if (t[2]) {
      register[i] = t[2];
      i++;
    }
  }

  // Reading memory
  const data = mem.split("\n");
  for (const line of data) {
    const t = line.split(" ");
    if (t[0][0] == "0" && t[0][1] == "x") memory.set(t[0], t[1]);
  }
};

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});

app.get("/", (req, res) => {
  console.log("Server pinged successully");
  res.status(200).send("Server running...");
});

app.get("/data", (req, res) => {
  res.status(200).json({ register, memory: Object.fromEntries(memory) });
});

app.post("/config", (req, res) => {
  cache_size = req.body.cache;
  cache_block_size = req.body.block;
  mapping = req.body.mapping;
  ways = req.body.ways;
  policy = req.body.policy;

  res.status(200).send("Configured successfully");
});

app.post("/code", (req, res) => {
  fs.writeFileSync("input.mc", req.body.code);
  res.status(200).send("Written to file successfully");
});

app.get("/run", async (req, res) => {
  await new Promise((resolve, reject) => {
    run();
    resolve();
  });
  res.status(200).send("Executed run");
});

app.get("/step", (req, res) => {
  step();
  res.status(200).send("Executed step");
});

app.get("/spawn", (req, res) => {
  spawnProcess();
  res.status(200).send("Executed spawn");
});

app.get("/input", (req, res) => {
  input();
  res.status(200).send("Executed input");
});

const test = async () => {
  spawnProcess();
  input();
  run();
};

test();
