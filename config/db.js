const mongoose = require('mongoose');

async function connDb(uri, cb = () => {}) {
    try {
        await mongoose.connect(uri);
        console.log("Db Connection Successfully established to sparkle");
    } catch (error) {
        console.log("Uh Oh, Db connection hurdle?", error);
    }
}
module.exports = connDb;