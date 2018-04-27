const verifyKey = (req, res, next) => {
    // Get auth header/bearer value
    const apiKey = req.headers['key'];
    // Check if bearer is undefined
    if (typeof apiKey !== 'undefined') {
        // assign key to req for later checking
        req.key = apiKey;

        // go to next middleware
        next();
    } else {
        res.json({
            error: "No key found"
        })
    }
}

const keyCompareGenerator = realKey => keyToCheck => realKey === keyToCheck;

const compareKey = keyCompareGenerator(process.env.API_KEY);

const keyCheck = (req, res, next) => {
    if (compareKey(req.key)) {
        next();
    } else {
        res.json({ message: "bad key" });
    }
}

module.exports = { verifyKey, keyCheck };