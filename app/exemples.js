
angular.module("regexp.exemples", []).constant("Exemples", {
  "/intro": {
    title: "Введение"
    // TODO: пример на экранирование спецсимволов
  },
  "/ranges": {
    title: "Диапазоны",
    components: [
      {type: "match", title: "Сопоставление диапазону символов", input: "a", regexp: "/[abc]/"},
      {type: "match", title: "Символ <code>-</code> в данном случае входит в диапазон", input: "-", regexp: "/[abc-]/"},
      {type: "match", title: "А в этом примере <code>-</code> используется как спецсимвол", input: "-", regexp: "/[a-c]/"},
      {type: "match", title: "Поиск \"не латинского символа\"", input: "g", regexp: "/[^a-z]/"},
      {type: "match", title: "Бесполезно, но и так можно", input: "g", regexp: "/[a-z^0-9]/"}
    ]
  },
  "/classes": {
    title: "Символьные классы",
    components: [
      {type: "match", input: " ", regexp: "/\\s/"},
      {type: "match", input: "s", regexp: "/\\s/"},
      {type: "match", input: "3", regexp: "/\\d/"}
    ]
  },
  "/anchors": {
    title: "Якоря",
    components: [
      {type: "match", title: "Поиск с опором на конец строки", input: "123, 456", regexp: "/\\d+$/"},
      {type: "match", title: "Сопоставление строки целиком", input: "123, 456", regexp: "/^\\d+$/"},
    ]
  },
  "/quantors": {
    title: "Кванторы",
    components: [
      {type: "match", title: "Сопоставлеине с числом из <b>5-ти</b> цифр", input: "12354", regexp: "/^\\d{5}$/"},
      {type: "match", title: "Сопоставлеине с числом из <b>4-х</b> цифр", input: "12354", regexp: "/^\\d{4}$/"},
      {type: "match", title: "Сопоставлеине с числом от <b>2-х до 4-х</b> цифр", input: "123", regexp: "/^\\d{2,4}$/"},
      {type: "match", title: "Поиск <b>0 или более</b> символов \"a\"", input: "aaaa", regexp: "/\\a*/"},
      {type: "match", title: "Поиск <b>1 или более</b> символов \"a\"", input: "", regexp: "/a+/"}
    ]
  },
  "/groups": {
    title: "Группы",
    components: [
      {type: "match", title: "Так, например, можно получить два первых слова", input: "Hello, world", regexp: "/(\\w+)\\W*(\\w+)/"},
      {type: "replace", title: "В случае замены группы можно выводить в результат в виде <code>$номер_группы</code>", input: "Hello, world", regexp: "/(\\w+)\\W*(\\w+)/", replace: "Greetings to $2"},
      {type: "match", title: "Важной возможностью, которую дают группы является альтернативы <code>(..|..|..)</code>", input: "hello", regexp: "/(hello|[a-c]{3}|\\d+)/"},
      {type: "match", title: "Значения, захваченные в группы также можно использовать в самом регулярном вырежении как <code>\\номер_группы</code>", input: "#333", regexp: "/#([0-9a-f])\\1\\1/"},
    ]
  },
  "/modifiers": {
    title: "Модификаторы",
    components: [
      {type: "match", title: "Глобальный поиск - модификатор <code>g</code>", input: "Hello, world", regexp: "/[a-zA-Z]+/g"},
      {type: "match", title: "Поиск без учета регистра - модификатор <code>i</code>", input: "Hello, world", regexp: "/([a-z]+), ([WORLD]+)/i"},
      {type: "match", title: "Многострочный поиск - модификатор <code>m</code>", input: "Hello, world.\nПривет, мир.", regexp: "/^(\\w+), (\\w+)\\.$/m", multiline: true},
    ]
  },
  "/greedy": {
    title: "Жадность и лень",
    components: [
      {type: "match", title: "Поиск greedy-оператором <code>*</code>", input: "a = 1; b = 2;", regexp: "/.*;/g"},
      {type: "match", title: "Поиск lazy-оператором <code>*?</code>", input: "a = 1; b = 2;", regexp: "/.*?;/g"},
    ]
  },
  "/statements": {
    title: "Утверждения",
    components: [
      {type: "match", title: "Поиск \"пассивной группой\" смещает указатель, за счет чего после проверки первой части проверяется вторая. Но при этом захвата в группу не происходит.", input: "a = 1; b = 2;", regexp: "/(?:\\w = \\d; ?)*/"},
      {type: "match", title: "Поиск \"просмотром вперед\" <u>не</u> смещает указатель, за счет чего после проверки первой части производится проверка первой повторно. Захвата в группу не происходит.", input: "a = 1; b = 2;", regexp: "/(?=\\w = \\d; ?)*/"},
      {type: "match", title: "Поиск \"просмотром вперед\" <u>не</u> смещает указатель, за счет чего после проверки первой части производится проверка первой повторно. Захвата в группу не происходит.", input: "<div><b></b><i></i></div>", regexp: "/<\\/?(?!div).+?>/g", multiline: true},
    ]
  }
  
//  "/classes1": {
//    title: "Символьные классы",
//    components: [
//      {
//        title: "Например, есть класс «произвольная цифра», обозначается \d. Пример ниже ищет любую цифру в строке:",
//        type: "replace", regexp: "//g", replace: "$1", input: "12345678901"},
//      {
//        type: "match",
//        title: "adsasd",
//        regexp: "/qw\\w/",
//        input: "qwe",
//        tests: [
//          {input: "qwe", expected: true},
//          {input: "qwD", expected: true},
//          {input: "Dwe", expected: false},
//          {input: "asd", expected: false}
//        ]
//      },
//      {type: "match", regexp: "/123/", input: "321"},
//    ]
//  }
}).config(function (Exemples) {
  for (var i in Exemples) {
    for (var j in Exemples[i].components) {
      var component = Exemples[i].components[j];
//      if(angular.isUndefined(component.multiline)) {
//        component.multiline = true;
//      }
    }
  }
});