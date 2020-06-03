export function changeToBase64(bytes){
  var bString = "";
  for(var i = 0, len = bytes.length; i < len; ++i){
    bString+= String.fromCharCode(bytes[i]);
  }
  return btoa(bString);
}


export function binaryToStr(str){
  var result = [];
  var list = str.split(" ");
  for(var i=0;i<list.length;i++){
    var item = list[i];
    var asciiCode = parseInt(item,2);
    var charValue = String.fromCharCode(asciiCode);
    result.push(charValue);
  }
  return result.join("");
}

export function strToBinary(str){
  var result = [];
  var list = str.split("");
  for(var i=0;i<list.length;i++){
    if(i != 0){
      result.push(" ");
    }
    var item = list[i];
    var binaryStr = item.charCodeAt().toString(2);
    result.push(binaryStr);
  }
  return result.join("");
}
