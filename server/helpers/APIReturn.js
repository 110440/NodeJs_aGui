

module.exports = function (returnCode,data) {
  return {
    'msg':returnCode[1],
    'code':returnCode[0],
    'data':data
  };
}
