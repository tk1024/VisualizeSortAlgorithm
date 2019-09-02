const bubbleSort = (arr) => {
  const arrs = []
  let cnt = 0
  do {
    cnt = 0
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < arr[i + 1]) {
        const tmp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = tmp
        arrs.push(Array.from(arr))
        cnt++
      }
    }
  } while (cnt > 0)
  return arrs
}

const shakerSort = (arr) => {
  const arrs = []
  let cnt = 0
  do {
    cnt = 0
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < arr[i + 1]) {
        const tmp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = tmp
        arrs.push(Array.from(arr))
        cnt++
      }
    }
    for (let i = arr.length; i >= 0; i--) {
      if (arr[i] > arr[i - 1]) {
        const tmp = arr[i]
        arr[i] = arr[i - 1]
        arr[i - 1] = tmp
        arrs.push(Array.from(arr))
        cnt++
      }
    }
  } while (cnt > 0)
  return arrs
}

const quickSort = (arr) => {
  const arrs = []

  const quick = (startID, endID) => {
    const pivot = arr[Math.floor((startID + endID) / 2)]
    let left = startID
    let right = endID

    while (1) {
      while (arr[left] > pivot) {
        left++
      }
      while (pivot > arr[right]) {
        right--
      }
      if (right <= left) {
        break
      }

      let tmp = arr[left];
      arr[left] = arr[right];
      arr[right] = tmp;
      arrs.push(Array.from(arr))
      left++
      right--
    }

    if (startID < left - 1) {
      quick(startID, left - 1)
    }
    if (right + 1 < endID) {
      quick(right + 1, endID)
    }
  }

  quick(0, arr.length - 1)

  return arrs
}

(() => {
  const canvas = {
    bubble: {
      canvas: document.getElementById("canvas-bubble"),
      ctx: document.getElementById("canvas-bubble").getContext('2d')
    },
    shaker: {
      canvas: document.getElementById("canvas-shaker"),
      ctx: document.getElementById("canvas-shaker").getContext('2d')
    },
    quick: {
      canvas: document.getElementById("canvas-quick"),
      ctx: document.getElementById("canvas-quick").getContext('2d')
    },
  }
  const scale = 6
  const cunt = 32
  let arr = (new Array(cunt)).fill(null).map(() => Math.round(255 * Math.random()));
  [
    ["バブルソート", canvas.bubble, bubbleSort],
    ["シェーカーソート", canvas.shaker, shakerSort],
    ["クイックソート", canvas.quick, quickSort],
  ].map((d) => {
    const imageData = []
    d[2](Array.from(arr)).map((a, i) => {
      imageData[i] = d[1].ctx.createImageData(1, scale*cunt)
      j = 0
      for (let x = 0; x < cunt; x++) {
        for(let y = 0;y < scale;y++) {
          imageData[i].data[j++] = a[x]
          imageData[i].data[j++] = a[x]
          imageData[i].data[j++] = a[x]
          imageData[i].data[j++] = 255
        }
      }
    })

    d[1].canvas.style.width = `${scale * imageData.length}px`
    d[1].canvas.style.height = `${scale * cunt}px`
    d[1].canvas.width = scale * imageData.length
    d[1].canvas.height = scale * cunt

    for (let k = 0; k < imageData.length; k++) {
      for(let s = 0;s < scale;s++) {
        d[1].ctx.putImageData(imageData[k], (k*scale)+s, 0)
      }
    }
  })
})()
