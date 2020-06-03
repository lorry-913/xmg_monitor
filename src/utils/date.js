export function dateToString(date){
    var year = date.getFullYear();
    var month =(date.getMonth() + 1).toString();
    var day = (date.getDate()).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    var dateTime = year  + month  + day;
    return dateTime;
  }


  export function dateToString2(date){
    var year = date.getFullYear();
    var month =(date.getMonth() + 1).toString();
    var day = (date.getDate()).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    var dateTime = year +"-" + month +"-" + day;
    return dateTime;
  }

  export function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}


export function specialDate(date) {
  if(date==null||date==""){
    return ""
  }
  let d = new Date(date);
  let year=d.getFullYear()
  let month=d.getMonth() + 1
  if(month<10){
    month="0"+month.toString()
  }
  let day= d.getDate()
  let  resDate = year + '-' + month + '-' + day;
  return resDate;
}
