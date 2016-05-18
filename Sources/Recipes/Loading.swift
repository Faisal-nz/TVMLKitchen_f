//
//  Loading.swift
//  TVMLKitchen
//
//  Created by toshi0383 on 3/26/16.
//  Copyright © 2016 toshi0383. All rights reserved.
//

import Foundation

public class LoadingRecipe: TemplateRecipeType {

    public typealias Theme = EmptyTheme
    public var theme: Theme = EmptyTheme()

    let message: String

    public init(message: String = "Loading...") {
        self.message = message
    }

    public var replacementDictionary: [String : String] {
        return ["LOADING": message]
    }
}
