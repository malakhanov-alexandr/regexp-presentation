
angular.module("regexp.exemples", []).constant("Exemples", {
  "/intro": {
    title: "Ch0",
    text: "adasdadfadfqawefqaf"
  },
  "/exp1": {
    title: "Ch1",
    text: "acvaevqwefwef",
    components: [
      {
        type: "match", 
        title: "adsasd", 
        regexp: "/qw\\w/", 
        input: "qwe",
        tests: [
          {input: "qwe", expected: true},
          {input: "qwD", expected: true},
          {input: "Dwe", expected: false},
          {input: "asd", expected: false}
        ]
      },
      {type: "replace", regexp: "//g", replace: "$1", input: "12345678901"},
      {type: "match", regexp: "/123/", input: "321"},
    ]
  }
}).config(function(Exemples) {
  for(var i in Exemples) {
    for(var j in Exemples[i].components) {
      var component = Exemples[i].components[j];
//      if(angular.isUndefined(component.multiline)) {
//        component.multiline = true;
//      }
    }
  }
});