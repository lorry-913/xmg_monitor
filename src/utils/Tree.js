// 把平面数组转换成树结构
//父级元素找子级元素
export function sonsTree(obj, arr) {
  var children = new Array();
  for (var i = 0; i < arr.length; i++) {
    if (parseInt(arr[i].parent_id) == parseInt(obj.id)) {  //pid等于加入数组
      sonsTree(arr[i], arr);//递归出子元素
      children.push(arr[i]);
    }
  }
  if (children.length > 0) {
    obj.children = children;
  }
  return obj;
}

export function treeUtils(data, property) {
  let ptree = [];
  for (var i = 0; i < data.length; i++) {
    data[i].parent_id = String(data[i].parent_id)
    data[i].id = String(data[i].id)
    data[i]['label'] = eval("data[i]." + property)
    data[i]['value'] = String(data[i].id)
    if (String(data[i].parent_id) == "0") {//获取父元素
      if (String(data[i].parent_id) == "0" && String(data[i].parent_id) == String(data[i].id)) {
        ptree.push(data[i]);
      } else {
        let o = sonsTree(data[i], data);
        ptree.push(o);
      }
    }
  }
  return ptree;
}

//子级元素找所有父级元素
export function parent(obj, arr, generations) {
  if (!generations instanceof Array) {
    return
  }
  generations.push(obj.id)
  if (obj.parent_id != 0) {
    for (let i = 0; i < arr.length; i++) {
      if (obj.parent_id == arr[i].id) {
        parent(arr[i], arr, generations)
      }
    }
  }
  return generations
}


export function addTitle(arr){
  for(let i = 0 ; i < arr.length ;i++){
    arr[i]['title'] = arr[i].cname;
    if(arr[i].children){
      addTitle(arr[i].children)
    }
  }
}

//树结构转平面结构
export const flatList=[]
export function treeToList(arr) {
  if (!arr instanceof Array&&!flatList instanceof Array) {
    return
  }
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i].children !== 'undefined' && arr[i].children.length > 0) {
      treeToList(arr[i]['children']);
    }
    flatList.push(arr[i])
  }
  return flatList
}
export default flatList
