export default Ember.HTMLBars.template((function() {
  return {
    meta: {
      "revision": "Ember@1.13.11",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 8,
          "column": 5
        }
      },
      "moduleName": "borrowers/templates/friends/show.hbs"
    },
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("ul");
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("li");
      var el3 = dom.createTextNode("First Name: ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode(" \n");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("li");
      var el3 = dom.createTextNode("Last Name: ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode(" \n");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("li");
      var el3 = dom.createTextNode("Email: ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode(" \n");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("li");
      var el3 = dom.createTextNode("twitter: ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("button");
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("button");
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0]);
      var morphs = new Array(6);
      morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
      morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
      morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]),1,1);
      morphs[3] = dom.createMorphAt(dom.childAt(element0, [7]),1,1);
      morphs[4] = dom.createMorphAt(dom.childAt(element0, [9]),0,0);
      morphs[5] = dom.createMorphAt(dom.childAt(element0, [11]),0,0);
      return morphs;
    },
    statements: [
      ["content","model.firstName",["loc",[null,[2,16],[2,35]]]],
      ["content","model.lastName",["loc",[null,[3,15],[3,33]]]],
      ["content","model.email",["loc",[null,[4,11],[4,26]]]],
      ["content","model.twitter",["loc",[null,[5,13],[5,30]]]],
      ["inline","link-to",["Edit","friends.edit"],[],["loc",[null,[6,8],[6,41]]]],
      ["inline","link-to",["Back","friends"],[],["loc",[null,[7,8],[7,36]]]]
    ],
    locals: [],
    templates: []
  };
}()));