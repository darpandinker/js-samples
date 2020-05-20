var count=0;

function swap(arr, i, j) {
  const temp=arr[i];
  arr[i]=arr[j];
  arr[j]=temp;
}

// Need to work in O(n) where n = high-low
// Put pivot in correct place, lower numbers than pivot on its left
// higher numbers than pivot to its right
function partition(arr, low, high) {
  // Choosing number at index 'high' as pivot element 
  var pivot = arr[high];
  var i=low-1, j;

  for (j=low; j<high; j++) {
    count++;
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, (i+1), high);
  return (i+1);
}

function quickSort(arr, low, high) {
  console.log("quickSort of ", arr.slice(low, 1+high));
  if (low < high) {
    var part = partition(arr, low, high);
    // arr[part] is in its correct place

    console.log("Post partition count="+count+", part="+ arr[part] + ", arr=", arr.slice(low, 1+high));
    quickSort(arr, low, part -1);
    quickSort(arr, part+1, high);
  }

  return arr;
}

function quick_sort(arr) {
  return quickSort(arr, 0, arr.length-1);
}


var arr=quick_sort([19, 57, 59, 33, 139, 15, 10, 236, 82]); // unsorted
//var arr=quick_sort([10, 15, 19, 33, 57, 59, 82, 139, 236]); // asc
//var arr=quick_sort([236, 139, 82, 59, 57, 33, 19, 15, 10]); // desc
console.log("count="+ count);