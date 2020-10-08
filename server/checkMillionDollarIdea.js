const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;    // this is called destructuring! Not importing module
    // it means we don't have to do this: const numWeeks = req.body.numWeeks, const weeklyRevenue = ...
    const totalMoney = Number(numWeeks) * Number(weeklyRevenue);
    if (!numWeeks || !weeklyRevenue || isNaN(totalMoney) || totalMoney < 1000000) {
        res.status(400).send();
    } else {
        next();
    }
}

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
