import XCTest
import SwiftTreeSitter
import TreeSitterEpicsMsiSubstitution

final class TreeSitterEpicsMsiSubstitutionTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_epics_msi_substitution())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading EpicsMsiSubstitution grammar")
    }
}
