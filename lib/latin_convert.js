const pinyin = require("pinyin");

function upper_first_letter(column) {
    let res = pinyin(column, {
        style: 4,
    });
    let res_string = "";
    res.forEach((i) => {
        res_string += i.join();
    });
    return res_string.toUpperCase();
}

module.exports = {
    upper_first_letter,
};
