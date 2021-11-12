const getFilter = (method = 'luminance', r, g, b) => {
  for (let i = 0; i < methods.length; i++) {
    if (methods[i].value === method) {
      return methods[i].algorithm(r, g, b);
    }
  }

  return 0.21 * r + 0.72 * g + 0.07 * b;
};

const getSymbol = (
  alphabet = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ',
  filtered
) => {
  return alphabet[Math.ceil(((alphabet.length - 1) * filtered) / 255)];
};

const getBrailleSymbol = (dots) => {
  let number = 0;
  let result = 0;

  const octets = [1, 10, 2, 20, 4, 40, 100, 200];

  dots.forEach((index, i) => {
    number += index * octets[i];
  });

  if (number === 0) {
    return String.fromCharCode(`0x2800`);
  }

  number = number.toString(10);

  for (let i = 0; i < number.length; i++) {
    result += number[i] * 8 ** (number.length - 1 - i);
  }

  return String.fromCharCode(0x2800 + parseInt(result.toString(16), 16));
};

const getPixels = (img, width = null, height = null) => {
  const canvas = document.createElement('canvas');

  canvas.width = width || img.width;
  canvas.height = height || img.height;

  const ctx = canvas.getContext('2d');

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const getBraille = (params) => {
  const { img, imgWidth, imgHeight, method, optimizeA, optimizeRGB } = params;

  let result = '';

  const { width, height, data } = getPixels(img, imgWidth, imgHeight);

  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 2) {
      let index = 0;
      const dots = [0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 2; j++) {
          const pos = ((y + i) * width + x + j) * 4;

          const a = data[pos + 3];

          if (a >= optimizeA) {
            const r = data[pos];
            const g = data[pos + 1];
            const b = data[pos + 2];

            const filtered = getFilter(method, r, g, b);

            if (filtered >= optimizeRGB) {
              dots[index] = 1;
            }
          }

          index++;
        }
      }

      result += getBrailleSymbol(dots);
    }

    result += '\n';
  }

  return result;
};

const getAscii = (params) => {
  const {
    img,
    imgWidth,
    imgHeight,
    cellSize,
    alphabet,
    method,
    optimizeA,
    optimizeRGB
  } = params;

  let result = '';

  const { width, height, data } = getPixels(img, imgWidth, imgHeight);

  for (let y = 0; y < height; y += parseInt(cellSize)) {
    for (let x = 0; x < width; x += parseInt(cellSize)) {
      const pos = (y * width + x) * 4;

      const a = data[pos + 3];

      if (a >= optimizeA) {
        const r = data[pos];
        const g = data[pos + 1];
        const b = data[pos + 2];

        if (r + g + b >= optimizeRGB) {
          const symbol = getSymbol(alphabet, getFilter(method, r, g, b));

          result += symbol;
        }
      }
    }

    result += '\n';
  }

  return result;
};

const getConversion = (params) => {
  const { mode } = params;

  for (let i = 0; i < modes.length; i++) {
    if (modes[i].value === mode) {
      return modes[i].algorithm(params);
    }
  }

  return '';
};

const methods = [
  {
    value: 'luminance',
    name: 'Яркость',
    algorithm: (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b
  },
  {
    value: 'average',
    name: 'Среднее',
    algorithm: (r, g, b) => (r + g + b) / 3
  },
  {
    value: 'max',
    name: 'Максимум',
    algorithm: (r, g, b) => Math.max(r, g, b)
  },
  {
    value: 'min',
    name: 'Минимум',
    algorithm: (r, g, b) => Math.min(r, g, b)
  }
];

const modes = [
  {
    value: 'ascii',
    name: 'ASCII',
    algorithm: getAscii
  },
  {
    value: 'braille',
    name: 'Брайль',
    algorithm: getBraille
  }
];

export { getConversion, methods, modes };
