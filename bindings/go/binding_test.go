package tree_sitter_epics_msi_substitution_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_epics_msi_substitution "github.com/minijackson/tree-sitter-epics_msi_substitution/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_epics_msi_substitution.Language())
	if language == nil {
		t.Errorf("Error loading EpicsMsiSubstitution grammar")
	}
}
