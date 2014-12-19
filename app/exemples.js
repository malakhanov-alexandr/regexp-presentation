angular.module("regexp.exemples", []).constant("Exemples", {
  "/intro": {
    title: "Введение"
    // TODO: пример на экранирование спецсимволов
  },
  "/ranges": {
    title: "Диапазоны"
  },
  "/classes": {
    title: "Символьные классы"
  },
  "/anchors": {
    title: "Якоря"
  },
  "/quantors": {
    title: "Кванторы"
  },
  "/groups": {
    title: "Группы"
  },
  "/modifiers": {
    title: "Модификаторы"
  },
  "/greedy": {
    title: "Жадность и лень"
  },
  "/statements": {
    title: "Утверждения"
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