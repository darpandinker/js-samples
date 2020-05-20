var count=0;

function swap(arr, i, j) {
  const temp=arr[i];
  arr[i]=arr[j];
  arr[j]=temp;
}

function merge(arr, low, part, high) {
  var a1 = arr.slice(low, part+1);
  var a2 = arr.slice(part+1, high+1);
  

  var n=0, i=0, j=0, num=(high+1)-low;
  for (n=0; n<num; n++, count++) {
    if (i >= a1.length)
      arr[low+n]=a2[j++];
    else if (j >= a2.length)
      arr[low+n]=a1[i++];
    else if (a1[i]<=a2[j])
      arr[low+n]=a1[i++];
    else
      arr[low+n]=a2[j++];
  }

  console.log("merge of "+ a1 +" and "+ a2 +" with "+ num +" elements is "+ arr.slice(low, high+1));
}

function sort(arr, low, high) {
  var part = Math.floor(low + ((high-low)/2) );

  if (low < high && (high-low)>0) {
    console.log("sort 1 START ", arr.slice(low, part+1));
    sort(arr, low, part);

    console.log("sort 2 START ", arr.slice(part+1, high+1));
    sort(arr, part+1, high);

    console.log("merge START ", arr.slice(low, part+1), " and ", arr.slice(part+1, high+1));
    merge(arr, low, part, high);
  }

  return arr;
}

function merge_sort(arr) {
  return sort(arr, 0, arr.length-1);
}

var arr=merge_sort([19, 57, 59, 33, 139, 15, 10, 236, 82]); // unsorted
//var arr=merge_sort([10, 15, 19, 33, 57, 59, 82, 139, 236]); // asc
//var arr=merge_sort([236, 139, 82, 59, 57, 33, 19, 15, 10]); // desc
console.log("count="+ count);