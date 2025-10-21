type TokenType =
  | "keyword"
  | "string"
  | "operator"
  | "comment"
  | "function"
  | "number"
  | "macro"
  | "attribute"
  | "type"
  | "blank"

export interface Token {
  text: string
  ty: TokenType
}

export const code: (Token | Token[])[] = [
  // { text: "use std::collections::HashMap;", ty: "keyword" },
  { text: "", ty: "blank" },
  [
    { text: "#[", ty: "operator" },
    { text: "derive", ty: "function" },
    { text: "(", ty: "operator" },
    { text: "Debug", ty: "type" },
    { text: ",", ty: "operator" },
    { text: "Clone", ty: "type" },
    { text: ")", ty: "operator" },
    { text: "]", ty: "operator" },
  ],
  [
    {
      text: "struct ",
      ty: "keyword",
    },
    { text: "Profile", ty: "type" },
    { text: " {", ty: "operator" },
  ],
  [
    {
      text: "	name: ",
      ty: "operator",
    },

    { text: "String", ty: "type" },
    { text: ",", ty: "operator" },
  ],
  [
    {
      text: "	role: ",
      ty: "operator",
    },

    { text: "String", ty: "type" },
    { text: ",", ty: "operator" },
  ],
  [
    {
      text: "	location: ",
      ty: "operator",
    },

    { text: "String", ty: "type" },
    { text: ",", ty: "operator" },
  ],
  [
    {
      text: "	available: ",
      ty: "operator",
    },

    { text: "bool", ty: "type" },
    { text: ",", ty: "operator" },
  ],
  { text: "}", ty: "operator" },
  { text: "", ty: "blank" },
  [
    {
      text: "impl ",
      ty: "keyword",
    },

    { text: "Profile", ty: "type" },
    { text: " {", ty: "operator" },
  ],
  [
    {
      text: "	fn ",
      ty: "keyword",
    },

    { text: "new", ty: "function" },
    {
      text: "(name: ",
      ty: "operator",
    },
    { text: "String, ", ty: "type" },
    {
      text: "role: ",
      ty: "operator",
    },
    { text: "String, ", ty: "type" },
    {
      text: "location: ",
      ty: "operator",
    },
    { text: "String, ", ty: "type" },
    {
      text: "available: ",
      ty: "operator",
    },
    { text: "bool", ty: "type" },
    { text: ")", ty: "operator" },
    { text: " -> ", ty: "operator" },

    { text: "Self", ty: "type" },
    { text: " {", ty: "operator" },
  ],
  [
    { text: "		Self", ty: "type" },
    { text: " {", ty: "operator" },
  ],
  {
    text: "			name,",
    ty: "operator",
  },
  {
    text: "			role,",
    ty: "operator",
  },
  {
    text: "			location,",
    ty: "operator",
  },
  {
    text: "			available,",
    ty: "operator",
  },
  { text: "	    }", ty: "operator" },
  { text: "    }", ty: "operator" },
  { text: "}", ty: "operator" },
  { text: "", ty: "blank" },
  [
    {
      text: "fn ",
      ty: "keyword",
    },

    { text: "main", ty: "function" },
    { text: "() {", ty: "operator" },
  ],
  [
    { text: "	let ", ty: "keyword" },
    {
      text: "profile = ",
      ty: "operator",
    },

    { text: "Profile", ty: "type" },
    { text: "::", ty: "operator" },
    { text: "new", ty: "function" },

    { text: "(", ty: "operator" },
  ],
  [
    { text: '	      	  	  	"Haris Raharjo Putro"', ty: "string" },
    { text: ".", ty: "operator" },
    { text: "to_owned", ty: "function" },
    { text: "(),", ty: "operator" },
  ],
  [
    { text: '	              	"Software Engineer"', ty: "string" },
    { text: ".", ty: "operator" },
    { text: "to_owned", ty: "function" },
    { text: "(),", ty: "operator" },
  ],
  [
    { text: '	              	"Jakarta, Indonesia"', ty: "string" },
    { text: ".", ty: "operator" },
    { text: "to_owned", ty: "function" },
    { text: "(),", ty: "operator" },
  ],
  [
    { text: "	              	true", ty: "type" },
    { text: ",", ty: "operator" },
  ],
  { text: "	          	  );", ty: "operator" },

  [
    { text: "	println!", ty: "macro" },
    { text: "(", ty: "operator" },
    { text: '"{:?}"', ty: "string" },
    { text: ", profile);", ty: "operator" },
  ],
  { text: "}", ty: "operator" },
  { text: "", ty: "blank" },
  { text: "// Open for opportunities - contact me!", ty: "comment" },
  {
    text: "// The data types used only to facilitate presentation",
    ty: "comment",
  },
]
