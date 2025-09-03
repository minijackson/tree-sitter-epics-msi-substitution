/**
 * @file tree-sitter grammar for EPICS' .substitutions files
 * @author Rémi NICOLE
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "epics_msi_substitution",

  // TODO: Specifications says:
  // A comment line is any line beginning with the character #, which must be the very first character on the line.
  extras: ($) => [/\s/, $.comment, $.macro_expansion],

  rules: {
    source_file: ($) =>
      repeat(
        choice(
          $.global,
          $.regular,
          $.pattern,
          $.db_template,
        )
      ),

    comment: ($) => seq("#", /.*/),

    global: ($) => seq("global", $._regular_variables),

    regular: ($) => $._regular_variables,

    _regular_variables: ($) =>
      seq("{", repeat(seq($.definition, optional(","))), "}"),
    definition: ($) => seq(
      field("variable", $.identifier),
      "=",
      field("value", $.string)),

    pattern: ($) =>
      prec.right(seq("pattern", $.pattern_variables, repeat($._pattern_definition))),

    pattern_variables: ($) =>
      seq("{", repeat(seq($.identifier, optional(","))), "}"),

    _pattern_definition: ($) => choice($.global, $.pattern_values),
    pattern_values: ($) => seq("{", repeat(seq($.string, optional(","))), "}"),

    db_template: ($) => seq("file", field("file", $.string), $.substitutions),

    substitutions: ($) =>
      seq("{", repeat(choice($.global, $.regular, $.pattern)), "}"),

    identifier: ($) => /\w+/,

    string: ($) => choice($._bareword, $.quoted_string),

	_bareword: ($) => /[a-zA-Z0-9_\-+:./\\\[\]<>;]+/,

    quoted_string: ($) =>
      seq(
        '"',
        repeat(choice($.escape_sequence, $.quoted_string_text_fragment)),
        '"'
      ),
    quoted_string_text_fragment: ($) =>
      prec.right(
        repeat1(choice(token.immediate(/[^"\\$]+/), token.immediate("\\")))
      ),
    escape_sequence: ($) =>
      choice(token.immediate('\\"'), token.immediate("\\\\")),

    macro_expansion: ($) =>
      choice(
        seq("${", repeat1(choice(/[^}]+/, $.macro_expansion)), "}"),
        seq("$(", repeat1(choice(/[^)]+/, $.macro_expansion)), ")")
      ),
  },
});
