//
//  RecipeTheme.swift
//  TVMLKitchen
//
//  Created by toshi0383 on 3/19/16.
//  Copyright © 2016 toshi0383. All rights reserved.
//

import Foundation

// MARK: ThemeType
public protocol ThemeType {
    var backgroundColor: String {get}
    var color: String {get}
    var highlightBackgroundColor: String {get}
    var highlightTextColor: String {get}
    init()
}

extension ThemeType {

    public var backgroundColor: String {
        return "transparent"
    }

    public var color: String {
        return "rgb(0, 0, 0)"
    }

    public var highlightBackgroundColor: String {
        return "rgb(255, 255, 255)"
    }

    public var highlightTextColor: String {
        return "rgb(0, 0, 0)"
    }

}

public struct DefaultTheme: ThemeType {
    public init() {}
}

public struct BlackTheme: ThemeType {
    public let backgroundColor: String = "rgb(0, 0, 0)"
    public let color: String = "rgb(255, 255, 255)"
    public init() {}
}
