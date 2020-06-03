//顺序查找
export function inArray(obj, arr) {


  for (let i = 0; i < arr.length; i++) {
    if(typeof obj == 'object' && obj.id != null && typeof obj.id!= "undefined" && typeof arr[i].id != "undefined"){
      if (obj.id == arr[i].id||obj == arr[i].id) {
        return i
      }
    }else{
      if(obj == arr[i]){
        return i
      }
    }
  }
  return -1
}

//从数组里面删除某个元素
export function delInArray(obj, arr) {
  let index = inArray(obj, arr)
  if (index >= 0) {
    arr.splice(index, 1)
  } else {
    alert("数据错误！")
  }
}


