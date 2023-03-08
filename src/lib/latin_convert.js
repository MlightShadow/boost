const pinyin = require("pinyin");

function convert(context, full, split_char, char_case) {
    if (!split_char) {
        split_char = '';
    }
    let res = pinyin(context, {
        style: full ? 0 : 4,
    });
    let res_string = res.join(split_char);

    if (char_case == "lower") {
        return res_string.toLowerCase();
    } else if (char_case == "upper") {
        return res_string.toUpperCase();
    }
    else {
        return res_string;
    }
}

function upper_first_letter(context) {
    return convert(context = context, full = false, char_case = 'upper');
}

function lower_first_letter(context) {
    return convert(context = context, full = false, char_case = 'lower');
}

function full_letter(context) {
    return convert(context = context, full = true, split_char = '_');
}

module.exports = {
    convert,
    upper_first_letter,
    lower_first_letter,
    full_letter,
};
