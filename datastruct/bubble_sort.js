var count=0;

function swap(arr, i, j) {
  const temp=arr[i];
  arr[i]=arr[j];
  arr[j]=temp;
}

// Each itertion of i sets sorts the back of arr
function bubble_sort_orig(arr) {
  if (!arr || !Array.isArray(arr))
    return;

  var i, j, temp, swapped;
  for (i=0; i<arr.length; i++, swapped=false) {
    console.log("[i="+ i + ", count="+ count +"] ", arr);
    for (j=0; j<arr.length-1-i; j++) { // -i is an optimization
      count++;
      console.log("Comparing "+ j + " and " + (1+j));
      if (arr[j] > arr[1+j]) {
        swap(arr, j, (1+j));
        swapped=true;
      }
    }
    // if no swaps were made, arr is sorted
    // this is important condition of Bubble sort
    // Best case O(n)
    if (!swapped)
      return arr;
  }

  return arr;
}

// Each iteration of i sets sorts the front of arr 
function bubble_sort_variation(arr) {
  if (!arr || !Array.isArray(arr))
    return;

  var i, j, temp, swapped;
  for (i=0; i<arr.length; i++, swapped=false) {
    console.log("[i="+ i + ", count="+ count +"] ", arr);
    for (j=i+1; j<arr.length; j++) { // -i is an optimization
      count++;
      console.log("Comparing "+ i + " and " + (j));
      if (arr[i] > arr[j]) {
        swap(arr, i, j);
        swapped=true;
      }
    }
    if (!swapped)
      return arr;
  }

  return arr;
}

//var arr=bubble_sort_orig([19, 57, 59, 33, 139, 15, 10, 236, 82]); // unsorted
//var arr=bubble_sort_orig([10, 15, 19, 33, 57, 59, 82, 139, 236]); // asc
var arr=bubble_sort_orig([236, 139, 82, 59, 57, 33, 19, 15, 10]); // desc

