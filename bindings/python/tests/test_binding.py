from unittest import TestCase

from tree_sitter import Language, Parser
import tree_sitter_epics_msi_substitution


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        try:
            Parser(Language(tree_sitter_epics_msi_substitution.language()))
        except Exception:
            self.fail("Error loading EpicsMsiSubstitution grammar")
