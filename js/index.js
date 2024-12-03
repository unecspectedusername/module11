// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
// const minWeightInput = document.querySelector('.minweight__input'); // инпут минимального веса
// const maxWeightInput = document.querySelector('.maxweight__input'); // инпут максимального веса
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

//список фруктов в JSON формате
let fruitsJSON = `[
    {
        "kind": "Тамаринд",
        "color": {
            "colorName": "Светло-коричневый",
            "colorCode": "#9D7148"
        },
        "weight": 22
    },    
    {
        "kind": "Мангустин",
        "color": {
                "colorName": "Фиолетовый",
                "colorCode": "#9F2DE1"
            },
        "weight": 13
    },
    {
        "kind": "Дуриан",
        "color": {
            "colorName": "Зеленый",
            "colorCode": "#70B60C"
        },
        "weight": 35
    },
    {
        "kind": "Личи",
        "color": {
            "colorName": "Темно-розовый",
            "colorCode": "#CC0B4B"
        },
        "weight": 17
    },
    {
        "kind": "Карамбола",
        "color": {
            "colorName": "Желтый",
            "colorCode": "#FFE71F"
        },
        "weight": 28
    }
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = (arr) => {
  // сделано
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = null;

  // сделано
  // TODO: формируем новый элемент <li> при помощи document.createElement,
  // и добавляем в конец списка fruitsList при помощи document.appendChild
  arr.forEach((fruit, i) => {
    // создаем новый элемент списка
    let item = document.createElement('li');
    // добавляем класс для CSS
    item.className = 'fruit__item';
    item.style.backgroundColor = fruit.color.colorCode;
    // добавляем вложенный div
    let fruitInfo = document.createElement('div');
    // добавляем класс
    fruitInfo.className = 'fruit__info';
    // создаем вложенные дивы с информацией о фрукте
    let index = document.createElement('div');
    index.textContent = `index: ${i}`;
    let kind = document.createElement('div');
    kind.textContent = `kind: ${fruit.kind}`;
    let color = document.createElement('div');
    color.textContent = `color: ${fruit.color.colorName}`;
    let weight = document.createElement('div');
    weight.textContent = `weight (кг): ${fruit.weight}`;
    // собираем конструкцию вместе
    [index, kind, color, weight].forEach(element => {
      fruitInfo.appendChild(element);
    });
    item.appendChild(fruitInfo);
    fruitsList.appendChild(item);
  });
};

// первая отрисовка карточек
display(fruits);

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  // создаем пустой массив для результата перемешивания
  let result = [];
  // создаем глубокую копию массива fruits
  // она нужна для того, чтобы массив fruits остался нетронутым
  // чтобы потом мы могли сравнить его с result
  let fruitsCopy = structuredClone(fruits);

  while (fruitsCopy.length > 0) {
    // сделано
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)

    const index = getRandomInt(0, fruitsCopy.length - 1);
    result.push(fruitsCopy[index]);
    fruitsCopy.splice(index, 1);
  }

  // в задании указано, что нужно выводить Alert в случае, если массивы после
  // перемешивания получатся одинаковыми
  // поэтому добавим функцию сравнения массивов

  // Изначально в задании массив fruits содержит набор объектов,
  // в каждом из которых 3 ключа со значениями.
  // Для вывода цветов в селекторе я добавил в fruits вложенный объект,
  // поэтому придется проверять и его.
  // Можно было бы сравнивать массивы после JSON.stringify(),
  // но умные люди в интернете пишут, что так неправильно,
  // поэтому буду сравнивать по значениям.

  function compare(array1, array2) {

    let similar = true;
  
    for (let i = 0; i < array1.length; i++) {
      // каждый элемент массива fruits является объектом,
      // поэтому сравниваю значение каждого ключа элемента
      for (let key in array1[i]) {
        // проверяем не является ли значение ключа объектом (вложенный объект)
        if (typeof (array1[i][key]) == 'object') {
          // если является, то я знаю, что это объект с перечислением свойств цвета
          // поэтому сравниваю по заранее известным мне ключам
          if (array1[i][key].colorName != array2[i][key].colorName || array1[i][key].colorCode != array2[i][key].colorCode) {
            similar = false;
            break;
          }
        } else if (array1[i][key] != array2[i][key]) {
          // если это не вложенный объект, тогда просто сравниваю
          // значение ключей
          // если они не совпадают, прерываю цикл
          similar = false;
          break;
        }
      }
    }

    return similar;
  
  }

  // теперь сравним массивы после перемешивания

  if (compare(fruits, result)) {
    // если массивы одинаковые, выводим Alert
    alert('Перемешивание не дало результата, перемешайте получше');
  } else {
    // если нет, перезаписываем массив fruits
    fruits = result;
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display(fruits);
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  // получаем данные из инпутов
  // заменяем запятую на точку, чтобы корректно сработал parseFloat
  const minWeight = parseFloat(document.querySelector('.minweight__input').value.replace(',', '.'));
  const maxWeight = parseFloat(document.querySelector('.maxweight__input').value.replace(',', '.'));

  // Проверяем данные, введенные в инпуты
  // если NaN
  if (isNaN(minWeight) || isNaN(maxWeight)) {
    alert('Пожалуйста, введите число для фильтра по весу');
  // если дробное
  } else if (minWeight % 1 != 0 || minWeight % 1 != 0) {
    alert('Пожалуйста, введите целое число для фильтрации по весу');
  // если отрицательное
  } else if (minWeight < 0 || maxWeight < 0) {
    alert('Пожалуйста, введите положительное число');
  // если maxWeight меньше или равно minWeight
  } else if (minWeight >= maxWeight) {
    alert('Максимальный вес должен быть больше минимального');
  // если все проверки пройдены, фильтруем массив с фруктами
  } else {
    fruits = fruits.filter((fruit) => {
      return fruit.weight >= minWeight && fruit.weight <= maxWeight;
    });
  }
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display(fruits);
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

// Я решил выполнять сортировку по цвету на основе массива priority,
// который будет сформирован на основе данных, полученных из файла colors.json
// Массив будет сформирован, когда будет получен ответ на промис,
// поэтому здесь я просто объявляю массив, а данные в него будут записаны
// после выполнения fetch, который расположен в конце кода.
// Я вынес объявление массива из comparationColor, чтобы массив
// не формировался заново каждый раз при запуске функции comparationColor

// массив, в котором будет задан порядок сортировки цветов
let priority = [];

// сравнение цветов
const comparationColor = (a, b) => {
  const priority1 = priority.indexOf(a.color.colorCode);
  const priority2 = priority.indexOf(b.color.colorCode);
  return priority1 > priority2;
};

const sortAPI = {

  bubbleSort(arr, comparation) {

    let temp = arr;

    // переменная, в которой отмечается была ли выполнена сортировка
    let sorted;
    // используем do while, чтобы цикл проверил массив хотя бы один раз
    do {
      // по умолчанию отмечаем, что сортировки не произошло
      sorted = false;
      for (let i = 0; i < temp.length - 1; i++) {
        // если один из элементов массива больше следующего за ним,
        // меняем их местами
        // и отмечаем, что сортировка производилась,
        // чтобы запустить цикл на следующий круг
        if (comparation(temp[i], temp[i + 1])) {
          [temp[i], temp[i + 1]] = [temp[i + 1], temp[i]];
          sorted = true;
        }
      }
    // если sorted не получило значение true, завершаем цикл
    } while (sorted);
    return temp;
  },

quickSort(arr, comparation) {
    // если в массиве остается 1 элемент, выходим из рекурсии
    if (arr.length <= 1) {
      return arr;
    }
    // назначаем опорным значением индекс кода цвета первого элемента массива
    const pivot = arr[0];
    // создаем пустые массивы, в который будут помещаться значения меньше
    // опорного (левый) и больше (правый)
    const left = [];
    const right = [];
    for (let i = 1; i < arr.length; i++) {
      // сравниваем элементы массива с опорным значением
      // если значение меньше опорного, перемещаем в левый массив
      // если больше, в правый
      if (comparation(pivot, arr[i])) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    // используем рекурсию для обработки всех подмассивов
    return [...sortAPI.quickSort(left, comparation), pivot, ...sortAPI.quickSort(right, comparation)];
},
    

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation, callback) {
    const start = new Date().getTime();
    arr = sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
    callback(arr);
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // сделано
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKind == 'bubbleSort') {
    sortKind = 'quickSort';
    sortKindLabel.textContent = sortKind;
  } else {
    sortKind = 'bubbleSort';
    sortKindLabel.textContent = sortKind;
  }
});

sortActionButton.addEventListener('click', () => {
  // сделано
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor, display);
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // сделано
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  
  // Проверяем правильность заполнения инпутов
  if (kindInput.value == '') {
    alert('Пожалуйста, введите название фрукта');
  } else if (selectedColor == undefined) {
    alert('Пожалуйста, выберите цвет фрукта');
  } else if (isNaN(parseFloat(weightInput.value))) {
    alert('Пожалуйста, введите верное значение веса')
  } else {
    // создаем объект
    const makeFruit = (kind, colorName, colorCode, weight) => {
      return {
        kind: kind,
        color: {
          colorName: colorName,
          colorCode: colorCode
        },
        weight: weight
      };
    };
    // подставляем в объект данные, указанные пользователем
    const newFruit = makeFruit(kindInput.value, selectorButton.textContent, selectedColor, parseFloat(weightInput.value));
    // добавляем новый фрукт в массив
    fruits.push(newFruit);
    // выводим обновленный массив на странице
    display(fruits);
  }

});

/*** Настраиваем работу селектора с выбором цвета ***/

const selectorButton = document.querySelector('#select-button'), // кнопка выбора цвета
  dropdown = document.querySelector('#dropdown'), // окно выпадающего списка
  colorList = document.querySelector('#dropdown>ul'), // выпадающий список
  dropdownArrow = document.querySelector('#dropdown-arrow>g'); // иконка-стрелка
let selectedColor; // сюда запишем цвет, который выбрал пользователь

// добавляем eventListener на нажатие кнопки выбора цвета
selectorButton.addEventListener('click', function () {

  // если выпадающий список уже показан, прячем его, если нет - показываем
  // переворачиваем иконку-стрелку
  if (dropdown.style.visibility == 'visible') {
    dropdown.style.visibility = 'hidden';
    dropdownArrow.setAttribute('transform', 'rotate(0)');
  } else {
    dropdown.style.visibility = 'visible';
    dropdownArrow.setAttribute('transform', 'rotate(180)');
  }
});

// функция по заполнению выпадающего списка с цветами
function addColorsDropdown(array) {

  // из базы получаем массив со списком цветов и обрабатываем его
  array.forEach(element => {
    // создаем новый элемент списка
    let item = document.createElement('li');
    // берем имя цвета из объекта
    item.textContent = element.colorName;
    // берем код цвета из объекта и задаем цвет фона на его основе
    item.style.backgroundColor = element.colorCode;
    // сохраняем данные о коде цвета в аттрибут data-hex-color
    item.dataset.hexColor = element.colorCode;
    // получаем данные о плотности цвета из объекта
    // если цвет не плотный, делаем черный шрифт
    if (element.colorDense == true) {
      item.style.color = 'white';
    } else {
      item.style.color = 'black';
    }
    // вешаем eventListener с функцией сохранения выбранного цвета
    item.addEventListener('click', function () {
      selectColor(item);
    });
    // помещаем в выпадающий список
    colorList.appendChild(item);
  });
}

// функция по сохранению цвета, выбранного пользователем
// срабатывает по нажатию на элемент выпадающего списка
function selectColor (element) {
  // меняем вид кнопки в соответствии с цветом, который выбрал пользователь
  selectorButton.textContent = element.textContent;
  selectorButton.style.color = element.style.color;
  selectorButton.style.backgroundColor = element.style.backgroundColor;
  // записываем код выбранного цвета из dataset аттрибута в переменную
  selectedColor = element.dataset.hexColor;
  // прячем выпадающий список
  dropdown.style.visibility = 'hidden';
}

// получаем данные о цветах из базы
let colorsArray;
fetch('./JSON/colors.json', {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
  },
})
  .then(response => response.json())
  .then(function(response) {
    // сохраняем полученные данные в переменную
    colorsArray = response;
    // записываем данные в массив с приоритетом цветов для сортировки
    colorsArray.forEach(element => {
      priority.push(element.colorCode);
    });
    // запускаем функцию по заполнению выпадающего списка
    // в качестве аргумента передаем массив, полученный из JSON
    addColorsDropdown(response);
  });
