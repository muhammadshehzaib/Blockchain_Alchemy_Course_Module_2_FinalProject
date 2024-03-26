const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "f5e3c85cfa5de75201f22a926445efa5a923aabc46bbcf6111eae90d0c9b10c2";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const { proof, name, root } = req.body;
  // TODO: prove that a name is in the list
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if (isInTheList) {
    res.send({
      message: "Congratulations! You are on the list. You got a toy robot!",
    });
  } else {
    res.send({
      message: "Sorry, you are not on the list. No toy robot for you :(",
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
