//
//  AlertRecipeTests.swift
//  TVMLKitchen
//
//  Created by toshi0383 on 3/21/16.
//  Copyright © 2016 toshi0383. All rights reserved.
//

import XCTest
@testable import TVMLKitchen

class AlertRecipeTests: XCTestCase {
    func testAlertRecipe() {
        let alert = AlertRecipe(title: "TVMLKitchen", description: "bra bra bra")
        testTemplateRecipe(alert, expectedFileName: "ExpectedAlertRecipe")
    }
}
